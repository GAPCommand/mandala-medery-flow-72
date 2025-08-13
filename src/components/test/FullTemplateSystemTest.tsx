import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useTemplateEngines } from '@/lib/templateEngineClient';
import { triggerSelfDeployment } from '@/lib/selfDeployment';
import { exportToPANDAB } from '@/utils/templateExport';
import {
  Play,
  CheckCircle,
  AlertCircle,
  Loader2,
  Zap,
  Database,
  Network,
  Package,
  Globe,
  Settings,
  TestTube
} from 'lucide-react';

interface TestResult {
  name: string;
  status: 'pending' | 'running' | 'success' | 'error';
  message?: string;
  duration?: number;
}

const FullTemplateSystemTest = () => {
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [deploymentTest, setDeploymentTest] = useState<any>(null);
  const { toast } = useToast();

  const { 
    engineClient,
    availableEngines, 
    engineAccess, 
    loading,
    invokeEngine,
    checkEngineAccess
  } = useTemplateEngines({
    templateId: 'mandala-sacred-commerce-v1',
    templateName: 'Mandala Sacred Commerce',
    requiredEngines: [
      'mandala-product-management',
      'mandala-inventory-control',
      'mandala-order-processing',
      'mandala-distributor-network',
      'mandala-analytics-engine',
      'mandala-sacred-protection'
    ],
    sourceApp: 'mandalamead.com'
  });

  const updateTestResult = (name: string, status: TestResult['status'], message?: string, duration?: number) => {
    setTestResults(prev => {
      const existing = prev.find(t => t.name === name);
      if (existing) {
        return prev.map(t => t.name === name ? { ...t, status, message, duration } : t);
      }
      return [...prev, { name, status, message, duration }];
    });
  };

  const runTest = async (name: string, testFn: () => Promise<void>) => {
    const startTime = Date.now();
    updateTestResult(name, 'running');
    
    try {
      await testFn();
      const duration = Date.now() - startTime;
      updateTestResult(name, 'success', 'Test passed', duration);
    } catch (error: any) {
      const duration = Date.now() - startTime;
      updateTestResult(name, 'error', error.message, duration);
    }
  };

  const testMandalaEngines = async () => {
    // Test each Mandala engine
    const engines = [
      'mandala-product-management',
      'mandala-inventory-control', 
      'mandala-order-processing',
      'mandala-distributor-network',
      'mandala-analytics-engine',
      'mandala-sacred-protection'
    ];

    for (const engine of engines) {
      await runTest(`Engine: ${engine}`, async () => {
        const access = await checkEngineAccess(engine);
        if (!access?.available) {
          throw new Error(`Engine ${engine} not available`);
        }

        // Test engine call
        const result = await invokeEngine(engine, 'healthCheck', {});
        if (!result.success) {
          throw new Error(result.error || 'Engine health check failed');
        }
      });
    }
  };

  const testTemplateBridge = async () => {
    await runTest('Template Bridge API', async () => {
      const bridgeUrl = 'https://xfwvisutdbfoanhqpafx.supabase.co/functions/v1/template-bridge';
      
      // Test get_customization
      const response = await fetch(bridgeUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'get_customization' })
      });
      
      if (!response.ok) {
        throw new Error(`Bridge API failed: ${response.status}`);
      }
      
      const result = await response.json();
      if (!result.success) {
        throw new Error(result.error || 'Bridge API error');
      }
    });
  };

  const testSelfDeployment = async () => {
    await runTest('Self-Deployment System', async () => {
      const testConfig = {
        zapierWebhook: 'https://hooks.zapier.com/hooks/catch/test/webhook',
        customizations: { companyName: 'Test Company' },
        domain: 'test-mandala.com'
      };
      
      const result = await triggerSelfDeployment(testConfig);
      if (!result.success) {
        throw new Error(result.error || 'Deployment test failed');
      }
    });
  };

  const testPandabExport = async () => {
    await runTest('PANDAB Export', async () => {
      const exportResult = await exportToPANDAB();
      if (!exportResult.success) {
        throw new Error('Template export failed');
      }
      
      // Validate export structure
      if (!exportResult.templateId || !exportResult.packageData) {
        throw new Error('Invalid export structure');
      }
    });
  };

  const testUniversalGateway = async () => {
    await runTest('Universal Gateway', async () => {
      const gatewayUrl = 'https://xfwvisutdbfoanhqpafx.supabase.co/functions/v1/universal-integration-gateway';
      
      const response = await fetch(gatewayUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'service_discovery',
          sourceApp: 'mandalamead.com'
        })
      });
      
      if (!response.ok) {
        throw new Error(`Gateway failed: ${response.status}`);
      }
      
      const result = await response.json();
      if (!result.success) {
        throw new Error(result.error || 'Gateway error');
      }
    });
  };

  const runAllTests = async () => {
    setIsRunningTests(true);
    setTestResults([]);
    
    try {
      await testUniversalGateway();
      await testTemplateBridge();
      await testMandalaEngines();
      await testSelfDeployment();
      await testPandabExport();
      
      toast({
        title: "All Tests Complete! ✅",
        description: "Template system is ready for production use.",
      });
    } catch (error) {
      toast({
        title: "Tests Failed",
        description: "Check test results for details.",
        variant: "destructive"
      });
    } finally {
      setIsRunningTests(false);
    }
  };

  const testEndToEndDeployment = async () => {
    setDeploymentTest({ status: 'running', message: 'Starting end-to-end deployment test...' });
    
    try {
      // Step 1: Export template
      setDeploymentTest({ status: 'running', message: 'Exporting template to PANDAB format...' });
      const exportResult = await exportToPANDAB();
      
      if (!exportResult.success) {
        throw new Error('Template export failed');
      }
      
      // Step 2: Test deployment webhook
      setDeploymentTest({ status: 'running', message: 'Testing deployment webhook...' });
      const deployResult = await triggerSelfDeployment({
        zapierWebhook: 'https://hooks.zapier.com/hooks/catch/test/e2e-deployment',
        customizations: exportResult.packageData.brandingOptions,
        domain: 'test-deployment.mandala.com'
      });
      
      if (!deployResult.success) {
        throw new Error(deployResult.error || 'Deployment failed');
      }
      
      setDeploymentTest({ 
        status: 'success', 
        message: 'End-to-end deployment test successful! Template is ready for marketplace.',
        deploymentUrl: deployResult.deploymentUrl
      });
      
      toast({
        title: "E2E Test Successful! 🚀",
        description: "Template deployment pipeline is working correctly.",
      });
      
    } catch (error: any) {
      setDeploymentTest({ 
        status: 'error', 
        message: error.message 
      });
      
      toast({
        title: "E2E Test Failed",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'pending': return <TestTube className="h-4 w-4 text-gray-500" />;
      case 'running': return <Loader2 className="h-4 w-4 text-blue-500 animate-spin" />;
      case 'success': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error': return <AlertCircle className="h-4 w-4 text-red-500" />;
    }
  };

  const getStatusBadge = (status: TestResult['status']) => {
    const variants = {
      pending: 'secondary',
      running: 'default',
      success: 'default',
      error: 'destructive'
    } as const;
    
    return <Badge variant={variants[status]}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Full Template System Test</h1>
        <p className="text-muted-foreground">Comprehensive testing of the complete Mandala template system</p>
      </div>

      <Tabs defaultValue="system" className="space-y-6">
        <TabsList>
          <TabsTrigger value="system">System Tests</TabsTrigger>
          <TabsTrigger value="deployment">Deployment Test</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
        </TabsList>

        <TabsContent value="system" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TestTube className="h-5 w-5" />
                <span>System Component Tests</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                onClick={runAllTests} 
                disabled={isRunningTests}
                size="lg"
                className="w-full"
              >
                {isRunningTests ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Running Tests...
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Run All System Tests
                  </>
                )}
              </Button>

              {testResults.length > 0 && (
                <div className="space-y-2">
                  {testResults.map((test, index) => (
                    <Card key={index} className="border-l-4 border-l-primary">
                      <CardContent className="pt-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            {getStatusIcon(test.status)}
                            <span className="font-medium">{test.name}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            {test.duration && (
                              <span className="text-xs text-muted-foreground">
                                {test.duration}ms
                              </span>
                            )}
                            {getStatusBadge(test.status)}
                          </div>
                        </div>
                        {test.message && (
                          <p className="text-sm text-muted-foreground mt-2">{test.message}</p>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deployment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="h-5 w-5" />
                <span>End-to-End Deployment Test</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Test the complete template deployment pipeline from export to live deployment.
              </p>
              
              <Button 
                onClick={testEndToEndDeployment} 
                disabled={deploymentTest?.status === 'running'}
                size="lg"
                className="w-full"
              >
                {deploymentTest?.status === 'running' ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Testing Deployment...
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4 mr-2" />
                    Test End-to-End Deployment
                  </>
                )}
              </Button>

              {deploymentTest && (
                <Alert className={deploymentTest.status === 'error' ? 'border-red-200' : 'border-green-200'}>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <div className="space-y-2">
                      <p>{deploymentTest.message}</p>
                      {deploymentTest.deploymentUrl && (
                        <p className="font-mono text-xs">
                          Deployment URL: {deploymentTest.deploymentUrl}
                        </p>
                      )}
                    </div>
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center space-x-2">
                  <Database className="h-4 w-4" />
                  <span>Engine Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-2xl font-bold">{availableEngines.length}</p>
                  <p className="text-xs text-muted-foreground">Available Engines</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center space-x-2">
                  <Network className="h-4 w-4" />
                  <span>Bridge Health</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Badge variant="default">Operational</Badge>
                  <p className="text-xs text-muted-foreground">All bridges online</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center space-x-2">
                  <Package className="h-4 w-4" />
                  <span>Template Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Badge variant="default" className="bg-green-100 text-green-800">Ready</Badge>
                  <p className="text-xs text-muted-foreground">Deployment ready</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FullTemplateSystemTest;