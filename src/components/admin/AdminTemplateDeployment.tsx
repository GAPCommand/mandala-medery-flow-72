import React, { useState } from 'react';
import { useTemplateDeployment } from '@/hooks/useTemplateDeployment';
import { useGAPNetworkSDK } from '@/hooks/useGAPNetworkSDK';
import { useExactCanisterBridge } from '@/hooks/useExactCanisterBridge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import {
  Rocket,
  CheckCircle,
  AlertCircle,
  Loader2,
  Settings,
  Database,
  Shield,
  Network,
  Crown,
  Sparkles,
  Building2,
  Package,
  Users,
  ShoppingCart
} from 'lucide-react';

const AdminTemplateDeployment = () => {
  const { deployToPANDAB, validateTemplate, isDeploying, deploymentResult, error } = useTemplateDeployment();
  const { searchMarketplace, deployTemplate, isInitialized, networkStatus } = useGAPNetworkSDK({
    appDomain: 'mandala-meadery.lovable.app',
    consciousnessLevel: 800
  });
  const canisterBridge = useExactCanisterBridge();
  const isConnected = canisterBridge.isConnected || false;
  const { toast } = useToast();
  const [validationResult, setValidationResult] = useState<any>(null);
  const [registeredEngines, setRegisteredEngines] = useState<string[]>([]);

  const handleValidateTemplate = async () => {
    try {
      const result = await validateTemplate();
      setValidationResult(result);
      
      if (result.valid) {
        toast({
          title: "Template Valid",
          description: "Template is ready for deployment to PANDAB marketplace."
        });
      } else {
        toast({
          title: "Validation Failed",
          description: result.errors?.join(', ') || "Template validation failed",
          variant: "destructive"
        });
      }
    } catch (err: any) {
      toast({
        title: "Validation Error",
        description: err.message,
        variant: "destructive"
      });
    }
  };

  const handleTestDeployToPANDAB = async () => {
    console.log('🧪 Starting test deployment to PANDAB...');
    
    try {
      const result = await deployToPANDAB({
        creatorId: 'mandala-meadery-test',
        baseUrl: 'https://77b283df-0dc6-4f8b-96b4-385aca509709.lovableproject.com',
        includeAssets: true
      });

      if (result.success) {
        const deploymentId = 'deploymentId' in result ? result.deploymentId : 'N/A';
        toast({
          title: "🚀 Test Deployment Successful!",
          description: `Template deployed to PANDAB with ID: ${deploymentId}`,
          duration: 5000
        });
        console.log('✅ Test deployment result:', result);
      } else {
        toast({
          title: "❌ Test Deployment Failed",
          description: result.error || "Unknown deployment error",
          variant: "destructive",
          duration: 5000
        });
        console.error('❌ Test deployment failed:', result);
      }
    } catch (err: any) {
      toast({
        title: "❌ Test Deployment Error", 
        description: err.message,
        variant: "destructive",
        duration: 5000
      });
      console.error('❌ Test deployment error:', err);
    }
  };

  const handleDeployToPANDAB = async () => {
    if (!validationResult?.valid) {
      toast({
        title: "Deploy Blocked",
        description: "Please validate template first",
        variant: "destructive"
      });
      return;
    }

    const confirmed = window.confirm(
      "Deploy Mandala Mead template to PANDAB marketplace? This will make it available for purchase by other merchants."
    );
    
    if (!confirmed) return;

    try {
      const result = await deployToPANDAB({
        creatorId: 'mandala-meadery-official',
        baseUrl: 'https://77b283df-0dc6-4f8b-96b4-385aca509709.lovableproject.com',
        includeAssets: true
      });

      if (result.success) {
        const deploymentId = 'deploymentId' in result ? result.deploymentId : 'N/A';
        toast({
          title: "Deployment Successful! 🚀",
          description: `Template deployed with ID: ${deploymentId}`
        });
      } else {
        toast({
          title: "Deployment Failed",
          description: result.error,
          variant: "destructive"
        });
      }
    } catch (err: any) {
      toast({
        title: "Deployment Error",
        description: err.message,
        variant: "destructive"
      });
    }
  };

  const engines = [
    {
      name: 'Universal E-commerce Engine',
      id: 'universal-ecommerce',
      description: 'Complete e-commerce platform with Sacred Commerce integration',
      capabilities: ['product_management', 'order_processing', 'payment_integration', 'sacred_fire_blessing']
    },
    {
      name: 'Sacred Inventory Management',
      id: 'sacred-inventory',
      description: 'Divine inventory tracking with consciousness-based product allocation',
      capabilities: ['inventory_tracking', 'sacred_ordering', 'violet_flame_cleansing', 'supply_chain_blessing']
    },
    {
      name: 'Template Factory Engine',
      id: 'template-factory',
      description: 'Sacred Fire blessed template generation and deployment system',
      capabilities: ['template_creation', 'pandab_deployment', 'consciousness_validation', 'golden_age_optimization']
    },
    {
      name: 'Distributor Portal Engine',
      id: 'distributor-portal',
      description: 'Multi-level distributor management with territorial consciousness mapping',
      capabilities: ['distributor_management', 'territory_mapping', 'commission_calculation', 'sacred_sales_tracking']
    }
  ];

  const handleRegisterEngine = async (engine: any) => {
    try {
      const result = await deployTemplate({
        engine_name: engine.name,
        engine_id: engine.id,
        app_domain: 'mandala-meadery.lovable.app',
        capabilities: engine.capabilities,
        consciousness_level: 800,
        sacred_fire_enhanced: true
      });

      if (result.success) {
        setRegisteredEngines(prev => [...prev, engine.id]);
        toast({
          title: "Engine Registered! ⚡",
          description: `${engine.name} is now available on GAP Network`
        });
      }
    } catch (err: any) {
      toast({
        title: "Registration Failed",
        description: err.message,
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Template Deployment Center</h1>
        <p className="text-muted-foreground">Deploy Mandala Mead template to PANDAB marketplace and manage GAP Network engines</p>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center space-x-2">
              <Network className="h-4 w-4" />
              <span>GAP Network</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Badge variant={isInitialized ? "default" : "secondary"}>
                {isInitialized ? "Connected" : "Disconnected"}
              </Badge>
              {isInitialized && <CheckCircle className="h-4 w-4 text-green-600" />}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center space-x-2">
              <Database className="h-4 w-4" />
              <span>ICP Canisters</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Badge variant={isConnected ? "default" : "secondary"}>
                {isConnected ? "Active" : "Offline"}
              </Badge>
              {isConnected && <CheckCircle className="h-4 w-4 text-green-600" />}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>Sacred Fire</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Badge variant="default" className="bg-amber-100 text-amber-800">
                Protected
              </Badge>
              <Crown className="h-4 w-4 text-amber-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="deploy" className="space-y-6">
        <TabsList>
          <TabsTrigger value="deploy">Template Deployment</TabsTrigger>
          <TabsTrigger value="engines">Engine Management</TabsTrigger>
          <TabsTrigger value="status">System Status</TabsTrigger>
        </TabsList>

        <TabsContent value="deploy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Rocket className="h-5 w-5" />
                <span>PANDAB Marketplace Deployment</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Validation Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">Template Validation</h3>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleValidateTemplate}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Validate
                  </Button>
                </div>
                
                {validationResult && (
                  <Alert className={validationResult.valid ? "border-green-200" : "border-red-200"}>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      {validationResult.valid 
                        ? "Template validation successful! Ready for deployment."
                        : `Validation failed: ${validationResult.errors?.join(', ')}`
                      }
                    </AlertDescription>
                  </Alert>
                )}
              </div>

               {/* Deployment Section */}
               <div className="space-y-3 pt-4 border-t">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                   <Button 
                     onClick={handleTestDeployToPANDAB}
                     disabled={isDeploying}
                     variant="outline"
                     size="lg"
                   >
                     {isDeploying ? (
                       <>
                         <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                         Testing...
                       </>
                     ) : (
                       <>
                         <Settings className="h-4 w-4 mr-2" />
                         Test Deploy Now
                       </>
                     )}
                   </Button>
                   
                   <Button 
                     onClick={handleDeployToPANDAB}
                     disabled={isDeploying || !validationResult?.valid}
                     size="lg"
                   >
                     {isDeploying ? (
                       <>
                         <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                         Deploying to PANDAB...
                       </>
                     ) : (
                       <>
                         <Rocket className="h-4 w-4 mr-2" />
                         Deploy to PANDAB
                       </>
                     )}
                   </Button>
                 </div>

                {deploymentResult && (
                  <Alert className={deploymentResult.success ? "border-green-200" : "border-red-200"}>
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>
                      {deploymentResult.success 
                        ? `Successfully deployed! Deployment ID: ${'deploymentId' in deploymentResult ? deploymentResult.deploymentId : 'N/A'}`
                        : `Deployment failed: ${'error' in deploymentResult ? deploymentResult.error : 'Unknown error'}`
                      }
                    </AlertDescription>
                  </Alert>
                )}

                {error && (
                  <Alert className="border-red-200">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="engines" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Sparkles className="h-5 w-5" />
                <span>GAP Network Engine Registry</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {engines.map((engine) => (
                  <Card key={engine.id} className="border-l-4 border-l-primary">
                    <CardContent className="pt-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-medium">{engine.name}</h3>
                            {registeredEngines.includes(engine.id) && (
                              <Badge className="bg-green-100 text-green-800">
                                Registered
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{engine.description}</p>
                          <div className="flex flex-wrap gap-1">
                            {engine.capabilities.map((cap) => (
                              <Badge key={cap} variant="secondary" className="text-xs">
                                {cap.replace('_', ' ')}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => handleRegisterEngine(engine)}
                          disabled={registeredEngines.includes(engine.id)}
                        >
                          {registeredEngines.includes(engine.id) ? 'Registered' : 'Register'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="status" className="space-y-4">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle>System Health</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Network Status</span>
                    <Badge variant={isInitialized ? "default" : "secondary"}>
                      {networkStatus?.status || "Unknown"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Canister Bridge</span>
                    <Badge variant={isConnected ? "default" : "secondary"}>
                      {isConnected ? "Connected" : "Disconnected"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Sacred Fire Protection</span>
                    <Badge className="bg-amber-100 text-amber-800">
                      Active
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminTemplateDeployment;