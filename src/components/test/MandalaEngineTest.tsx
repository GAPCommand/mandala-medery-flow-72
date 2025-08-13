import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useTemplateEngines, createMandalaEngineClient } from '@/lib/templateEngineClient';
import { useTenant } from '@/contexts/TenantContext';

const MandalaEngineTest: React.FC = () => {
  const { currentTenant } = useTenant();
  const [apiKey, setApiKey] = useState('');
  const [testResults, setTestResults] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);

  const templateEngineConfig = {
    templateId: 'mandala-mead',
    templateName: 'Mandala Mead Template',
    requiredEngines: [
      'mandala-product-management',
      'mandala-inventory-control',
      'mandala-order-processing',
      'mandala-distributor-network',
      'mandala-analytics-engine',
      'mandala-sacred-protection'
    ],
    sourceApp: 'mandala-mead-template-test',
    apiKey: apiKey
  };

  const { engineAccess, availableEngines, invokeEngine, checkEngineAccess, loading: enginesLoading } = useTemplateEngines(templateEngineConfig);

  const testEngineMethod = async (engine: string, method: string, testParams: any = {}) => {
    setLoading(true);
    const testKey = `${engine}_${method}`;
    
    try {
      console.log(`🔥 Testing Mandala Engine: ${engine}.${method}`);
      
      const result = await invokeEngine(engine, method, testParams, {
        tenant_id: currentTenant?.id || 'test-tenant',
        consciousness_level: 500
      });

      setTestResults(prev => ({
        ...prev,
        [testKey]: result
      }));

      console.log(`✅ ${engine}.${method} result:`, result);
      
    } catch (error: any) {
      console.error(`❌ ${engine}.${method} failed:`, error);
      setTestResults(prev => ({
        ...prev,
        [testKey]: { success: false, error: error.message }
      }));
    } finally {
      setLoading(false);
    }
  };

  const testAllEngines = async () => {
    setLoading(true);
    console.log('🔥 Testing all Mandala engines...');

    const testSuite = [
      { engine: 'mandala-product-management', method: 'getProducts', params: { is_active: true } },
      { engine: 'mandala-inventory-control', method: 'getInventoryBatches', params: {} },
      { engine: 'mandala-order-processing', method: 'getOrders', params: {} },
      { engine: 'mandala-distributor-network', method: 'getDistributors', params: {} },
      { engine: 'mandala-analytics-engine', method: 'getPerformanceMetrics', params: {} },
      { engine: 'mandala-sacred-protection', method: 'validateConsciousnessLevel', params: { requiredLevel: 500, userLevel: 750 } }
    ];

    for (const test of testSuite) {
      await testEngineMethod(test.engine, test.method, test.params);
      // Small delay between tests
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    setLoading(false);
  };

  const createTestProduct = async () => {
    await testEngineMethod('mandala-product-management', 'createProduct', {
      name: 'Test Sacred Honey Blend',
      description: 'A test product for engine validation',
      wholesale_price: 35.00,
      retail_msrp: 70.00,
      category: 'sacred_honey',
      consciousness_level: 500,
      tags: ['test', 'sacred', 'honey'],
      abv_percentage: 0,
      volume_ml: 750,
      sacred_attributes: {
        blessing_level: 'high',
        source_location: 'Sacred Mountains',
        harvest_date: new Date().toISOString()
      }
    });
  };

  const getEngineStatusColor = (engine: string) => {
    const access = engineAccess[engine];
    if (!access) return 'secondary';
    return access.available ? 'default' : 'destructive';
  };

  const getEngineStatusText = (engine: string) => {
    const access = engineAccess[engine];
    if (!access) return 'Unknown';
    return access.available ? 'Available' : 'Unavailable';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🍯 Mandala Engine Test Suite
            <Badge variant="outline">Template Integration</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="api-key">GAP Network API Key</Label>
            <Input
              id="api-key"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your API key to test engines"
            />
          </div>

          {currentTenant && (
            <Alert>
              <AlertDescription>
                Testing with tenant: {currentTenant.subdomain} (ID: {currentTenant.id})
              </AlertDescription>
            </Alert>
          )}

          <div className="flex gap-2">
            <Button 
              onClick={testAllEngines} 
              disabled={loading || !apiKey}
              className="flex-1"
            >
              {loading ? 'Testing...' : 'Test All Engines'}
            </Button>
            <Button 
              onClick={createTestProduct} 
              disabled={loading || !apiKey}
              variant="outline"
            >
              Create Test Product
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Engine Access Status</CardTitle>
        </CardHeader>
        <CardContent>
          {enginesLoading ? (
            <div>Checking engine access...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {templateEngineConfig.requiredEngines.map((engine) => {
                const access = engineAccess[engine];
                return (
                  <div key={engine} className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <div className="font-medium text-sm">{engine.replace('mandala-', '').replace('-', ' ')}</div>
                      <div className="text-xs text-muted-foreground">
                        {access?.methods.length || 0} methods
                      </div>
                    </div>
                    <Badge variant={getEngineStatusColor(engine)}>
                      {getEngineStatusText(engine)}
                    </Badge>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Test Results</CardTitle>
        </CardHeader>
        <CardContent>
          {Object.keys(testResults).length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              No tests run yet. Click "Test All Engines" to begin.
            </div>
          ) : (
            <div className="space-y-4">
              {Object.entries(testResults).map(([testKey, result]) => {
                const [engine, method] = testKey.split('_');
                const isSuccess = result?.success;
                
                return (
                  <div key={testKey} className="border rounded p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">
                        {engine}.{method}
                      </div>
                      <Badge variant={isSuccess ? 'default' : 'destructive'}>
                        {isSuccess ? 'Success' : 'Failed'}
                      </Badge>
                    </div>
                    
                    <div className="text-sm">
                      {isSuccess ? (
                        <div>
                          <div className="text-green-600 mb-2">✅ Engine call successful</div>
                          {result.data && (
                            <details className="text-xs">
                              <summary className="cursor-pointer">View Response Data</summary>
                              <pre className="mt-2 p-2 bg-muted rounded overflow-auto">
                                {JSON.stringify(result.data, null, 2)}
                              </pre>
                            </details>
                          )}
                        </div>
                      ) : (
                        <div className="text-red-600">
                          ❌ {result?.error || 'Unknown error'}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Available Network Engines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm">
            <div className="font-medium mb-2">Discovered Engines:</div>
            <div className="flex flex-wrap gap-2">
              {availableEngines.map((engine) => (
                <Badge key={engine} variant="outline">
                  {engine}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MandalaEngineTest;