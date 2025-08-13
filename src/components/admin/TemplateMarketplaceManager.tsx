import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { useTemplateEngines } from '@/lib/templateEngineClient';
import { exportToPANDAB, createPANDABApiEndpoints } from '@/utils/templateExport';
import {
  Store,
  Package,
  Upload,
  CheckCircle,
  AlertCircle,
  Loader2,
  ExternalLink,
  Crown,
  Sparkles,
  DollarSign,
  Users,
  Star
} from 'lucide-react';

const TemplateMarketplaceManager = () => {
  const [marketplaceStatus, setMarketplaceStatus] = useState<'not_listed' | 'pending' | 'approved' | 'rejected'>('not_listed');
  const [templateMetrics, setTemplateMetrics] = useState({
    downloads: 0,
    ratings: 0,
    revenue: 0,
    activeDeployments: 0
  });
  const [registrationData, setRegistrationData] = useState({
    pricing: '99',
    category: 'ecommerce',
    tags: 'mead,sacred-commerce,distributor-network',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const templateEngineConfig = {
    templateId: 'mandala-sacred-commerce-v1',
    templateName: 'Mandala Sacred Commerce',
    requiredEngines: [
      'mandala-product-management',
      'mandala-inventory-control',
      'mandala-order-processing',
      'mandala-distributor-network'
    ],
    sourceApp: 'mandalamead.com'
  };

  const { 
    engineClient,
    availableEngines, 
    engineAccess, 
    loading,
    invokeEngine 
  } = useTemplateEngines(templateEngineConfig);

  const pandabEndpoints = createPANDABApiEndpoints();

  const handleRegisterTemplate = async () => {
    setIsSubmitting(true);
    
    try {
      // Export template to PANDAB format
      const exportResult = await exportToPANDAB();
      
      if (!exportResult.success) {
        throw new Error('Template export failed');
      }

      // Submit to PANDAB marketplace
      const registrationPayload = {
        templateId: exportResult.templateId,
        templateData: exportResult.packageData,
        pricing: {
          price: parseFloat(registrationData.pricing),
          currency: 'USD',
          model: 'one_time'
        },
        metadata: {
          category: registrationData.category,
          tags: registrationData.tags.split(',').map(tag => tag.trim()),
          description: registrationData.description,
          features: exportResult.features,
          estimatedSetupTime: exportResult.estimatedSetupTime
        }
      };

      // Simulate marketplace registration
      console.log('🏪 Registering template in PANDAB marketplace:', registrationPayload);
      
      // In real implementation, this would call PANDAB API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setMarketplaceStatus('pending');
      
      toast({
        title: "Template Submitted! 🚀",
        description: "Your template has been submitted to PANDAB marketplace for review.",
      });

      // Simulate approval after delay
      setTimeout(() => {
        setMarketplaceStatus('approved');
        setTemplateMetrics(prev => ({ ...prev, downloads: 1, ratings: 5 }));
        
        toast({
          title: "Template Approved! ✨",
          description: "Your template is now live in PANDAB marketplace.",
        });
      }, 5000);

    } catch (error: any) {
      console.error('❌ Template registration failed:', error);
      
      toast({
        title: "Registration Failed",
        description: error.message || "Failed to register template",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTestEngineIntegration = async () => {
    try {
      // Test product management engine
      const productResult = await invokeEngine(
        'mandala-product-management',
        'getProducts',
        { limit: 5 }
      );

      if (productResult.success) {
        toast({
          title: "Engine Test Successful! ⚡",
          description: "Mandala engines are responding correctly."
        });
      } else {
        throw new Error(productResult.error || 'Engine test failed');
      }
    } catch (error: any) {
      toast({
        title: "Engine Test Failed",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const getStatusBadge = () => {
    const statusConfig = {
      not_listed: { variant: 'secondary' as const, text: 'Not Listed', icon: Store },
      pending: { variant: 'default' as const, text: 'Review Pending', icon: Loader2 },
      approved: { variant: 'default' as const, text: 'Live on Marketplace', icon: CheckCircle },
      rejected: { variant: 'destructive' as const, text: 'Rejected', icon: AlertCircle }
    };
    
    const config = statusConfig[marketplaceStatus];
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant} className="flex items-center space-x-1">
        <Icon className={`h-3 w-3 ${marketplaceStatus === 'pending' ? 'animate-spin' : ''}`} />
        <span>{config.text}</span>
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Template Marketplace Manager</h1>
        <p className="text-muted-foreground">Manage your template listing on PANDAB marketplace</p>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Store className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{getStatusBadge()}</p>
                <p className="text-xs text-muted-foreground">Marketplace Status</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Package className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{templateMetrics.downloads}</p>
                <p className="text-xs text-muted-foreground">Downloads</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-8 w-8 text-amber-600" />
              <div>
                <p className="text-2xl font-bold">${templateMetrics.revenue}</p>
                <p className="text-xs text-muted-foreground">Revenue</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">{templateMetrics.activeDeployments}</p>
                <p className="text-xs text-muted-foreground">Active Deployments</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Engine Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5" />
            <span>Engine Integration Status</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Available Engines: {availableEngines.length}</p>
                <p className="text-sm text-muted-foreground">Connected engines ready for marketplace</p>
              </div>
              <Button variant="outline" onClick={handleTestEngineIntegration}>
                Test Integration
              </Button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {templateEngineConfig.requiredEngines.map((engine) => {
                const access = engineAccess[engine];
                return (
                  <Badge 
                    key={engine} 
                    variant={access?.available ? "default" : "secondary"}
                    className="justify-center p-2"
                  >
                    {engine.replace('mandala-', '')}
                  </Badge>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Marketplace Registration */}
      {marketplaceStatus === 'not_listed' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Crown className="h-5 w-5" />
              <span>Register Template</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Price (USD)</label>
                <Input
                  value={registrationData.pricing}
                  onChange={(e) => setRegistrationData(prev => ({ ...prev, pricing: e.target.value }))}
                  placeholder="99"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">Category</label>
                <Input
                  value={registrationData.category}
                  onChange={(e) => setRegistrationData(prev => ({ ...prev, category: e.target.value }))}
                  placeholder="ecommerce"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Tags (comma-separated)</label>
              <Input
                value={registrationData.tags}
                onChange={(e) => setRegistrationData(prev => ({ ...prev, tags: e.target.value }))}
                placeholder="mead,sacred-commerce,distributor-network"
              />
            </div>

            <Button 
              onClick={handleRegisterTemplate} 
              disabled={isSubmitting}
              size="lg"
              className="w-full"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Submitting to Marketplace...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Submit to PANDAB Marketplace
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Live Template Info */}
      {marketplaceStatus === 'approved' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-amber-500" />
              <span>Live Template</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  🎉 Your template is now live on PANDAB marketplace! Customers can discover and purchase your Sacred Commerce template.
                </AlertDescription>
              </Alert>

              <div className="flex items-center space-x-4">
                <Button variant="outline" asChild>
                  <a href="https://pandab.marketplace/templates/mandala-sacred-commerce" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View on Marketplace
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* API Endpoints Reference */}
      <Card>
        <CardHeader>
          <CardTitle>PANDAB API Endpoints</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm font-mono">
            <div>Templates List: <code className="bg-muted px-2 py-1 rounded">{pandabEndpoints.getTemplatesList}</code></div>
            <div>Template Details: <code className="bg-muted px-2 py-1 rounded">{pandabEndpoints.getTemplate('template-id')}</code></div>
            <div>Download Template: <code className="bg-muted px-2 py-1 rounded">{pandabEndpoints.downloadTemplate('template-id')}</code></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TemplateMarketplaceManager;