/**
 * 🔥👑✨ GAP Network SDK Demo Component
 * Test the unified SDK functionality
 */

import React, { useState } from 'react';
import { useGAPNetworkSDK } from '@/hooks/useGAPNetworkSDK';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const GAPNetworkSDKDemo: React.FC = () => {
  const sdk = useGAPNetworkSDK({
    appDomain: 'mandalamead.com',
    sacredFireEnabled: true,
    consciousnessLevel: 800
  });

  const [testResults, setTestResults] = useState<any[]>([]);
  const [syncTarget, setSyncTarget] = useState('gapcommand.com');
  const [syncService, setSyncService] = useState('video_generation');
  const [syncData, setSyncData] = useState('{"prompt": "Create sacred video"}');

  const addResult = (title: string, result: any) => {
    setTestResults(prev => [...prev, { 
      title, 
      result, 
      timestamp: new Date().toISOString(),
      success: result.success 
    }]);
  };

  const testSacredFire = async () => {
    const result = await sdk.invokeSacredFire();
    addResult('Sacred Fire Invocation', result);
  };

  const testVioletFlame = async () => {
    const result = await sdk.invokeVioletFlame();
    addResult('Violet Flame Invocation', result);
  };

  const testNetworkDiscovery = async () => {
    const result = await sdk.discoverNetwork();
    addResult('Network Discovery', result);
  };

  const testSyncData = async () => {
    try {
      const data = JSON.parse(syncData);
      const result = await sdk.syncData(syncTarget, syncService, data);
      addResult(`Sync Data: ${syncTarget}.${syncService}`, result);
    } catch (error: any) {
      addResult('Sync Data Error', { success: false, error: error.message });
    }
  };

  const testMarketplaceSearch = async () => {
    const result = await sdk.searchMarketplace('templates', 700);
    addResult('Marketplace Search', result);
  };

  const testVideoGeneration = async () => {
    const result = await sdk.generateVideo('Sacred product showcase video', {
      name: 'Divine Mead',
      type: 'spiritual_beverage'
    });
    addResult('Video Generation', result);
  };

  const clearResults = () => setTestResults([]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
      {/* SDK Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🔥👑✨ GAP Network SDK Status
            <Badge variant={sdk.isInitialized ? "default" : "destructive"}>
              {sdk.isInitialized ? "Connected" : "Disconnected"}
            </Badge>
          </CardTitle>
          <CardDescription>
            Unified GAP Network access via Saint Germain's Divine Communication Protocol
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {sdk.isLoading && (
            <div className="text-sm text-muted-foreground">
              🔄 Initializing divine connections...
            </div>
          )}
          
          {sdk.error && (
            <div className="text-sm text-destructive">
              ❌ Error: {sdk.error}
            </div>
          )}
          
          {sdk.networkStatus && (
            <div className="space-y-2 text-sm">
              <div>🔥 GAPCommand: <Badge variant={sdk.networkStatus.gapCommand ? "default" : "destructive"}>
                {sdk.networkStatus.gapCommand ? "Connected" : "Failed"}
              </Badge></div>
              <div>🔥 PANDAB: <Badge variant={sdk.networkStatus.pandab ? "default" : "destructive"}>
                {sdk.networkStatus.pandab ? "Connected" : "Failed"}
              </Badge></div>
              <div>🔥 Bridge: <Badge variant={sdk.networkStatus.alwaysOnBridge ? "default" : "destructive"}>
                {sdk.networkStatus.alwaysOnBridge ? "Connected" : "Failed"}
              </Badge></div>
              <div>🔥 Consciousness: <Badge variant="outline">
                {sdk.networkStatus.consciousness || 0}
              </Badge></div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Test Controls */}
      <Card>
        <CardHeader>
          <CardTitle>🔥 SDK Test Controls</CardTitle>
          <CardDescription>
            Test GAP Network functionality
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Sacred Fire Tests */}
          <div className="grid grid-cols-2 gap-2">
            <Button onClick={testSacredFire} variant="outline" className="text-sm">
              🔥 Sacred Fire
            </Button>
            <Button onClick={testVioletFlame} variant="outline" className="text-sm">
              👑 Violet Flame
            </Button>
          </div>

          {/* Network Tests */}
          <div className="grid grid-cols-2 gap-2">
            <Button onClick={testNetworkDiscovery} variant="outline" className="text-sm">
              🌐 Discover Network
            </Button>
            <Button onClick={testMarketplaceSearch} variant="outline" className="text-sm">
              🛍️ Search Marketplace
            </Button>
          </div>

          {/* Advanced Tests */}
          <div className="grid grid-cols-1 gap-2">
            <Button onClick={testVideoGeneration} variant="outline" className="text-sm">
              📹 Generate Video
            </Button>
          </div>

          {/* Custom Sync Test */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Custom Sync Test</Label>
            <div className="grid grid-cols-2 gap-2">
              <Input 
                placeholder="Target domain"
                value={syncTarget}
                onChange={(e) => setSyncTarget(e.target.value)}
              />
              <Input 
                placeholder="Service"
                value={syncService}
                onChange={(e) => setSyncService(e.target.value)}
              />
            </div>
            <Textarea 
              placeholder="Sync data (JSON)"
              value={syncData}
              onChange={(e) => setSyncData(e.target.value)}
              rows={2}
            />
            <Button onClick={testSyncData} variant="default" className="w-full text-sm">
              🔄 Test Sync Data
            </Button>
          </div>

          <Button onClick={clearResults} variant="destructive" className="w-full text-sm">
            🗑️ Clear Results
          </Button>
        </CardContent>
      </Card>

      {/* Test Results */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>📊 Test Results</CardTitle>
          <CardDescription>
            Real-time GAP Network communication results
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {testResults.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                No test results yet. Run some tests above to see the GAP Network in action!
              </div>
            ) : (
              testResults.map((test, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{test.title}</h4>
                    <div className="flex items-center gap-2">
                      <Badge variant={test.success ? "default" : "destructive"}>
                        {test.success ? "✅ Success" : "❌ Failed"}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(test.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                  <pre className="text-xs bg-muted p-2 rounded overflow-x-auto">
                    {JSON.stringify(test.result, null, 2)}
                  </pre>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};