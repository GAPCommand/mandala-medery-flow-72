import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Copy, Key, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface APIKey {
  id: string;
  name: string;
  api_key: string;
  consciousness_level: number;
  rate_limit_per_hour: number;
  daily_quota: number;
  allowed_methods: string[];
  is_active: boolean;
  created_at: string;
  expires_at?: string;
}

export const APIKeyManager = () => {
  const { user } = useAuth();
  const [apiKeys, setApiKeys] = useState<APIKey[]>([]);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');

  useEffect(() => {
    if (user) {
      fetchAPIKeys();
    }
  }, [user]);

  const fetchAPIKeys = async () => {
    try {
      const { data, error } = await supabase
        .from('gap_api_keys')
        .select('*')
        .eq('tenant_id', 'mandalamead.com')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApiKeys(data || []);
    } catch (error: any) {
      toast.error('Failed to fetch API keys: ' + error.message);
    }
  };

  const createAPIKey = async () => {
    if (!newKeyName.trim()) {
      toast.error('Please enter a name for the API key');
      return;
    }

    setCreating(true);
    try {
      // Generate new API key
      const { data: keyData } = await supabase.rpc('generate_gap_api_key');
      
      const { error } = await supabase.from('gap_api_keys').insert({
        tenant_id: 'mandalamead.com',
        api_key: keyData,
        name: newKeyName.trim(),
        consciousness_level: 500,
        rate_limit_per_hour: 1000,
        daily_quota: 10000,
        allowed_methods: ['health_check', 'service_discovery', 'invoke_engine', 'sync_data', 'widget_request']
      });

      if (error) throw error;

      toast.success('API key created successfully');
      setNewKeyName('');
      fetchAPIKeys();
    } catch (error: any) {
      toast.error('Failed to create API key: ' + error.message);
    } finally {
      setCreating(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('API key copied to clipboard');
  };

  const deleteAPIKey = async (id: string) => {
    try {
      const { error } = await supabase
        .from('gap_api_keys')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast.success('API key deleted');
      fetchAPIKeys();
    } catch (error: any) {
      toast.error('Failed to delete API key: ' + error.message);
    }
  };

  if (!user) {
    return (
      <Card className="p-6">
        <p className="text-muted-foreground">Please sign in to manage API keys</p>
      </Card>
    );
  }

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center gap-2">
        <Key className="h-5 w-5" />
        <h3 className="text-lg font-semibold">🔥 GAP Network API Keys</h3>
      </div>

      <div className="space-y-4">
        <div className="flex gap-2">
          <div className="flex-1">
            <Label htmlFor="keyName">API Key Name</Label>
            <Input
              id="keyName"
              placeholder="e.g., External App Integration"
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
            />
          </div>
          <div className="flex items-end">
            <Button 
              onClick={createAPIKey} 
              disabled={creating || !newKeyName.trim()}
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Key
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          {apiKeys.map((key) => (
            <div key={key.id} className="border rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{key.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    Consciousness Level: {key.consciousness_level} | 
                    Rate Limit: {key.rate_limit_per_hour}/hour | 
                    Daily Quota: {key.daily_quota}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(key.api_key)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteAPIKey(key.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="bg-muted p-2 rounded font-mono text-xs break-all">
                {key.api_key}
              </div>
              
              <div className="text-xs text-muted-foreground">
                Methods: {key.allowed_methods.join(', ')}
              </div>
            </div>
          ))}

          {apiKeys.length === 0 && (
            <p className="text-muted-foreground text-center py-4">
              No API keys created yet. Create one above to test the bridge.
            </p>
          )}
        </div>
      </div>
    </Card>
  );
};