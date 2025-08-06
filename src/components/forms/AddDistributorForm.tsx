
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface Territory {
  id: string;
  territory_name: string;
  territory_code: string;
}

interface AddDistributorFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

const AddDistributorForm = ({ onSuccess, onCancel }: AddDistributorFormProps) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [territories, setTerritories] = useState<Territory[]>([]);
  const [formData, setFormData] = useState({
    company_name: '',
    contact_name: '',
    email: '',
    territory: '',
    distributor_tier: 'bronze',
    status: 'pending' as const
  });

  useEffect(() => {
    fetchTerritories();
  }, []);

  const fetchTerritories = async () => {
    try {
      const { data, error } = await supabase
        .from('mandala_sales_territories')
        .select('id, territory_name, territory_code')
        .eq('is_active', true);

      if (error) throw error;
      setTerritories(data || []);
    } catch (error) {
      console.error('Error fetching territories:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('mandala_distributors')
        .insert({
          company_name: formData.company_name,
          contact_name: formData.contact_name,
          email: formData.email,
          territory: formData.territory,
          distributor_tier: formData.distributor_tier,
          status: formData.status,
          address: {}
        });

      if (error) throw error;

      toast.success('Distributor added successfully!');
      onSuccess?.();
    } catch (error) {
      console.error('Error creating distributor:', error);
      toast.error('Failed to add distributor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-amber-700">Add New Distributor</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="company_name">Company Name</Label>
              <Input
                id="company_name"
                value={formData.company_name}
                onChange={(e) => setFormData(prev => ({ ...prev, company_name: e.target.value }))}
                placeholder="Sacred Beverages LLC"
                required
              />
            </div>
            <div>
              <Label htmlFor="contact_name">Contact Name</Label>
              <Input
                id="contact_name"
                value={formData.contact_name}
                onChange={(e) => setFormData(prev => ({ ...prev, contact_name: e.target.value }))}
                placeholder="John Smith"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="john@sacredbeverages.com"
                required
              />
            </div>
            <div>
              <Label htmlFor="territory">Territory</Label>
              <Select value={formData.territory} onValueChange={(value) => setFormData(prev => ({ ...prev, territory: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select territory" />
                </SelectTrigger>
                <SelectContent>
                  {territories.map((territory) => (
                    <SelectItem key={territory.id} value={territory.territory_name}>
                      {territory.territory_name} ({territory.territory_code})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="distributor_tier">Distributor Tier</Label>
            <Select value={formData.distributor_tier} onValueChange={(value) => setFormData(prev => ({ ...prev, distributor_tier: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bronze">Bronze</SelectItem>
                <SelectItem value="silver">Silver</SelectItem>
                <SelectItem value="gold">Gold</SelectItem>
                <SelectItem value="platinum">Platinum</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Adding...' : 'Add Distributor'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddDistributorForm;
