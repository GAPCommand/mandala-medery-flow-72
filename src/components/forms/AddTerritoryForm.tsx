
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface AddTerritoryFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

const AddTerritoryForm = ({ onSuccess, onCancel }: AddTerritoryFormProps) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    territory_name: '',
    territory_code: '',
    target_revenue: '',
    geographic_bounds: {
      states: [],
      cities: [],
      zip_codes: []
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      // Create territory with all required fields from mandala_sales_territories schema
      const { error } = await supabase
        .from('mandala_sales_territories')
        .insert({
          territory_name: formData.territory_name,
          territory_code: formData.territory_code,
          target_revenue: parseFloat(formData.target_revenue) || 0,
          geographic_bounds: formData.geographic_bounds,
          assigned_rep_id: user.id,
          is_active: true,
          commission_structure: {
            base_rate: 0.05,
            tier_structure: [
              { min_amount: 0, max_amount: 50000, rate: 3 },
              { min_amount: 50000, max_amount: 100000, rate: 4 },
              { min_amount: 100000, max_amount: null, rate: 5 }
            ]
          }
        });

      if (error) throw error;

      toast.success('Territory created successfully!');
      onSuccess?.();
    } catch (error) {
      console.error('Error creating territory:', error);
      toast.error('Failed to create territory');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-amber-700">Add New Territory</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="territory_name">Territory Name</Label>
              <Input
                id="territory_name"
                value={formData.territory_name}
                onChange={(e) => setFormData(prev => ({ ...prev, territory_name: e.target.value }))}
                placeholder="Northern California"
                required
              />
            </div>
            <div>
              <Label htmlFor="territory_code">Territory Code</Label>
              <Input
                id="territory_code"
                value={formData.territory_code}
                onChange={(e) => setFormData(prev => ({ ...prev, territory_code: e.target.value }))}
                placeholder="NCA"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="target_revenue">Target Revenue ($)</Label>
            <Input
              id="target_revenue"
              type="number"
              value={formData.target_revenue}
              onChange={(e) => setFormData(prev => ({ ...prev, target_revenue: e.target.value }))}
              placeholder="100000"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create Territory'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddTerritoryForm;
