
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface AddUserFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

const availableRoles = [
  { id: 'admin', name: 'Administrator', description: 'Full system access' },
  { id: 'sales_rep', name: 'Sales Representative', description: 'Sales and distributor management' },
  { id: 'distributor', name: 'Distributor', description: 'Order placement and territory management' },
  { id: 'viewer', name: 'Viewer', description: 'Read-only access to reports' }
];

const AddUserForm = ({ onSuccess, onCancel }: AddUserFormProps) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    email: '',
    personal_message: ''
  });

  const handleRoleChange = (roleId: string, checked: boolean) => {
    if (checked) {
      setSelectedRoles(prev => [...prev, roleId]);
    } else {
      setSelectedRoles(prev => prev.filter(id => id !== roleId));
    }
  };

  const generateInvitationToken = () => {
    return Array.from(crypto.getRandomValues(new Uint8Array(32)))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || selectedRoles.length === 0) {
      toast.error('Please select at least one role');
      return;
    }

    setLoading(true);
    try {
      const token = generateInvitationToken();
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7); // 7 days from now

      const { error } = await supabase
        .from('user_invitations')
        .insert({
          email: formData.email,
          role_assignments: selectedRoles,
          invited_by: user.id,
          invitation_token: token,
          expires_at: expiresAt.toISOString(),
          personal_message: formData.personal_message
        });

      if (error) throw error;

      toast.success(`Invitation sent to ${formData.email}!`);
      onSuccess?.();
    } catch (error) {
      console.error('Error creating user invitation:', error);
      toast.error('Failed to send invitation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-amber-700">Invite New User</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="user@example.com"
              required
            />
          </div>

          <div>
            <Label>Assign Roles</Label>
            <div className="space-y-3 mt-2">
              {availableRoles.map((role) => (
                <div key={role.id} className="flex items-start space-x-3 p-3 border rounded">
                  <Checkbox
                    id={role.id}
                    checked={selectedRoles.includes(role.id)}
                    onCheckedChange={(checked) => handleRoleChange(role.id, checked as boolean)}
                  />
                  <div className="flex-1">
                    <label htmlFor={role.id} className="font-medium cursor-pointer">
                      {role.name}
                    </label>
                    <p className="text-sm text-gray-600">{role.description}</p>
                  </div>
                </div>
              ))}
            </div>
            {selectedRoles.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {selectedRoles.map(roleId => {
                  const role = availableRoles.find(r => r.id === roleId);
                  return (
                    <Badge key={roleId} variant="secondary">
                      {role?.name}
                    </Badge>
                  );
                })}
              </div>
            )}
          </div>

          <div>
            <Label htmlFor="personal_message">Personal Message (Optional)</Label>
            <Textarea
              id="personal_message"
              value={formData.personal_message}
              onChange={(e) => setFormData(prev => ({ ...prev, personal_message: e.target.value }))}
              placeholder="Welcome to the Mandala Mead team! We're excited to have you join us..."
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading || selectedRoles.length === 0}>
              {loading ? 'Sending...' : 'Send Invitation'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddUserForm;
