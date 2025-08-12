import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, TestTube } from 'lucide-react';
import { APIKeyManager } from './APIKeyManager';

export const CanisterBridgeTest = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState('');

  const testCanisterCall = async (canister: 'gapcommand' | 'pandab', method: string) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log(`🔥 Testing ${canister}.${method} through bridge...`);
      
      const headers: Record<string, string> = {
        'Content-Type': 'application/json'
      };
      
      // Add API key if provided
      if (apiKey.trim()) {
        headers['x-api-key'] = apiKey.trim();
      }
      
      const { data, error } = await supabase.functions.invoke('universal-integration-gateway', {
        body: {
          action: 'invoke_engine',
          sourceApp: 'mandalamead-test',
          data: {
            canister,
            method,
            parameters: {}
          }
        },
        headers
      });

      if (error) throw error;
      
      console.log(`✅ Bridge response:`, data);
      setResults(data);
    } catch (err: any) {
      console.error(`❌ Bridge test failed:`, err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const testHealthCheck = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.functions.invoke('universal-integration-gateway', {
        body: {
          action: 'health_check',
          sourceApp: 'mandalamead-test'
        }
      });

      if (error) throw error;
      setResults(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <APIKeyManager />
      
      <Card className="p-6 space-y-4">
        <div className="flex items-center gap-2">
          <TestTube className="h-5 w-5" />
          <h3 className="text-lg font-semibold">🔥 ICP Canister Bridge Test</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="apiKey">API Key (required for canister calls)</Label>
            <Input
              id="apiKey"
              type="password"
              placeholder="gap_..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
          </div>
      
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">GAPCommand Tests</h4>
              <Button 
                onClick={() => testCanisterCall('gapcommand', 'getSystemStats')}
                disabled={loading}
                variant="outline"
                size="sm"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Test System Stats'}
              </Button>
              <Button 
                onClick={() => testCanisterCall('gapcommand', 'invokeVioletFlame')}
                disabled={loading}
                variant="outline"
                size="sm"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Test Violet Flame'}
              </Button>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">PANDAB Tests</h4>
              <Button 
                onClick={() => testCanisterCall('pandab', 'getMarketplaceStats')}
                disabled={loading}
                variant="outline"
                size="sm"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Test Marketplace Stats'}
              </Button>
            </div>
          </div>

          <Button 
            onClick={testHealthCheck}
            disabled={loading}
            variant="default"
            className="w-full"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Test Health Check'}
          </Button>

          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {results && (
            <div className="p-3 bg-muted rounded-md">
              <h4 className="font-medium mb-2">Results:</h4>
              <pre className="text-xs overflow-auto">{JSON.stringify(results, null, 2)}</pre>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};