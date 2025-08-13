import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Download, Package, Settings, Zap } from 'lucide-react';
import { templateGenerator, CleanTemplateConfig, TemplateGenerationResult } from '@/lib/templateGenerator';
import { useToast } from '@/hooks/use-toast';

export const TemplateGenerationPanel: React.FC = () => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationResult, setGenerationResult] = useState<TemplateGenerationResult | null>(null);
  const [config, setConfig] = useState<CleanTemplateConfig>({
    templateId: '',
    customerName: '',
    customerEmail: '',
    brandCustomization: {
      name: '',
      tagline: '',
      domain: '',
      primaryColor: '#8B5CF6',
      secondaryColor: '#F59E0B'
    },
    masterEngineUrl: 'https://xfwvisutdbfoanhqpafx.supabase.co/functions/v1',
    apiKey: '',
    enabledFeatures: ['products', 'inventory', 'orders', 'analytics']
  });

  const handleGenerateTemplate = async () => {
    if (!config.customerName || !config.customerEmail || !config.brandCustomization.name) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      // Generate template ID if not provided
      if (!config.templateId) {
        const timestamp = Date.now();
        const cleanName = config.brandCustomization.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
        config.templateId = `${cleanName}-${timestamp}`;
      }

      // Generate API key if not provided
      if (!config.apiKey) {
        config.apiKey = `mandala_${Math.random().toString(36).substring(2)}${Date.now().toString(36)}`;
      }

      const result = await templateGenerator.generateCleanTemplate(config);
      setGenerationResult(result);

      if (result.success) {
        toast({
          title: "🔥 Template Generated Successfully!",
          description: `Clean template created for ${config.customerName}`,
        });
      } else {
        toast({
          title: "Generation Failed",
          description: result.error,
          variant: "destructive"
        });
      }
    } catch (error: any) {
      toast({
        title: "Generation Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const updateBrandConfig = (field: string, value: string) => {
    setConfig(prev => ({
      ...prev,
      brandCustomization: {
        ...prev.brandCustomization,
        [field]: value
      }
    }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Clean Template Generator
          </CardTitle>
          <CardDescription>
            Generate UI-only templates that connect to Mandala Master Engines
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Customer Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Customer Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="customerName">Customer Name *</Label>
                <Input
                  id="customerName"
                  value={config.customerName}
                  onChange={(e) => setConfig(prev => ({ ...prev, customerName: e.target.value }))}
                  placeholder="Jane Smith"
                />
              </div>
              <div>
                <Label htmlFor="customerEmail">Customer Email *</Label>
                <Input
                  id="customerEmail"
                  type="email"
                  value={config.customerEmail}
                  onChange={(e) => setConfig(prev => ({ ...prev, customerEmail: e.target.value }))}
                  placeholder="jane@example.com"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Brand Customization */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Brand Customization</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="brandName">Brand Name *</Label>
                <Input
                  id="brandName"
                  value={config.brandCustomization.name}
                  onChange={(e) => updateBrandConfig('name', e.target.value)}
                  placeholder="Sacred Valley Elixirs"
                />
              </div>
              <div>
                <Label htmlFor="brandDomain">Domain</Label>
                <Input
                  id="brandDomain"
                  value={config.brandCustomization.domain}
                  onChange={(e) => updateBrandConfig('domain', e.target.value)}
                  placeholder="sacredvalley.com"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="brandTagline">Tagline</Label>
                <Input
                  id="brandTagline"
                  value={config.brandCustomization.tagline}
                  onChange={(e) => updateBrandConfig('tagline', e.target.value)}
                  placeholder="Sacred Elixirs for Conscious Living"
                />
              </div>
              <div>
                <Label htmlFor="primaryColor">Primary Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="primaryColor"
                    value={config.brandCustomization.primaryColor}
                    onChange={(e) => updateBrandConfig('primaryColor', e.target.value)}
                    className="flex-1"
                  />
                  <div 
                    className="w-12 h-10 rounded border"
                    style={{ backgroundColor: config.brandCustomization.primaryColor }}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="secondaryColor">Secondary Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="secondaryColor"
                    value={config.brandCustomization.secondaryColor}
                    onChange={(e) => updateBrandConfig('secondaryColor', e.target.value)}
                    className="flex-1"
                  />
                  <div 
                    className="w-12 h-10 rounded border"
                    style={{ backgroundColor: config.brandCustomization.secondaryColor }}
                  />
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Engine Configuration */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Engine Configuration</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="templateId">Template ID</Label>
                <Input
                  id="templateId"
                  value={config.templateId}
                  onChange={(e) => setConfig(prev => ({ ...prev, templateId: e.target.value }))}
                  placeholder="Auto-generated if empty"
                />
              </div>
              <div>
                <Label htmlFor="apiKey">API Key</Label>
                <Input
                  id="apiKey"
                  value={config.apiKey}
                  onChange={(e) => setConfig(prev => ({ ...prev, apiKey: e.target.value }))}
                  placeholder="Auto-generated if empty"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="masterUrl">Master Engine URL</Label>
              <Input
                id="masterUrl"
                value={config.masterEngineUrl}
                onChange={(e) => setConfig(prev => ({ ...prev, masterEngineUrl: e.target.value }))}
                placeholder="https://your-master-engine.com/functions/v1"
              />
            </div>
          </div>

          <Separator />

          {/* Enabled Features */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Enabled Features</h3>
            <div className="flex flex-wrap gap-2">
              {['products', 'inventory', 'orders', 'distributors', 'analytics', 'territories'].map(feature => (
                <Badge 
                  key={feature}
                  variant={config.enabledFeatures.includes(feature) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => {
                    const isEnabled = config.enabledFeatures.includes(feature);
                    setConfig(prev => ({
                      ...prev,
                      enabledFeatures: isEnabled 
                        ? prev.enabledFeatures.filter(f => f !== feature)
                        : [...prev.enabledFeatures, feature]
                    }));
                  }}
                >
                  {feature}
                </Badge>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <Button 
            onClick={handleGenerateTemplate}
            disabled={isGenerating}
            className="w-full"
            size="lg"
          >
            {isGenerating ? (
              <>
                <Settings className="mr-2 h-4 w-4 animate-spin" />
                Generating Template...
              </>
            ) : (
              <>
                <Zap className="mr-2 h-4 w-4" />
                Generate Clean Template
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Generation Result */}
      {generationResult && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {generationResult.success ? (
                <>
                  <Download className="h-5 w-5 text-green-600" />
                  Template Generated Successfully
                </>
              ) : (
                <>
                  <Settings className="h-5 w-5 text-red-600" />
                  Generation Failed
                </>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {generationResult.success ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Template ID</Label>
                    <div className="font-mono text-sm bg-muted p-2 rounded">
                      {generationResult.templateId}
                    </div>
                  </div>
                  <div>
                    <Label>Download URL</Label>
                    <div className="font-mono text-sm bg-muted p-2 rounded truncate">
                      {generationResult.downloadUrl}
                    </div>
                  </div>
                </div>
                
                {generationResult.deploymentInstructions && (
                  <div>
                    <Label>Deployment Instructions</Label>
                    <Textarea 
                      value={generationResult.deploymentInstructions}
                      readOnly
                      className="font-mono text-sm h-32"
                    />
                  </div>
                )}

                <Button asChild className="w-full">
                  <a href={generationResult.downloadUrl} target="_blank" rel="noopener noreferrer">
                    <Download className="mr-2 h-4 w-4" />
                    Download Template Package
                  </a>
                </Button>
              </>
            ) : (
              <div className="text-red-600">
                <p>Error: {generationResult.error}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};