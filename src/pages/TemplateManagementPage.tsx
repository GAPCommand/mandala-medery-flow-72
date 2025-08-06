import React, { useState } from 'react';
import { useTemplate } from '@/contexts/TemplateContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TemplateSetupWizard } from '@/components/template/TemplateSetupWizard';
import { TemplateExportPanel } from '@/components/template/TemplateExportPanel';
import { 
  Settings, 
  Download, 
  RefreshCw, 
  Sparkles, 
  Building2,
  Palette,
  FileText,
  DollarSign,
  Package
} from 'lucide-react';

const TemplateManagementPage = () => {
  const { config, isCustomized, resetToDefault } = useTemplate();
  const [showWizard, setShowWizard] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const handleResetTemplate = () => {
    if (confirm('Are you sure you want to reset to default template? This will lose all customizations.')) {
      resetToDefault();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Template Management Center</h1>
          <p className="text-gray-600">Configure, export, and manage your Universal E-Commerce Temple</p>
        </div>

        {/* Current Template Status */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Package className="h-5 w-5" />
                <span>Current Template Configuration</span>
              </CardTitle>
              <Badge className={isCustomized ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                {isCustomized ? 'Customized' : 'Default'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                <Building2 className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-blue-900">{config.brand.name}</h3>
                <p className="text-sm text-blue-700">{config.brand.industry}</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                <Palette className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-green-900">Brand Identity</h3>
                <p className="text-sm text-green-700">{config.brand.tagline}</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg">
                <FileText className="h-8 w-8 text-amber-600 mx-auto mb-2" />
                <h3 className="font-semibold text-amber-900">Products</h3>
                <p className="text-sm text-amber-700">{config.content.productTerminology.plural}</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                <DollarSign className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-semibold text-purple-900">Currency</h3>
                <p className="text-sm text-purple-700">{config.business.pricing.currency}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Management Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="configure">Configure</TabsTrigger>
            <TabsTrigger value="export">Export</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Template Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span>Complete E-Commerce System</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span>Multi-Role User Management</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span>Distributor & Restaurant Portals</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span>Advanced Analytics Dashboard</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span>Sacred Commerce Integration</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    onClick={() => setShowWizard(true)}
                    className="w-full"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Open Configuration Wizard
                  </Button>
                  <Button 
                    onClick={handleResetTemplate}
                    variant="outline" 
                    className="w-full"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Reset to Default
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="configure">
            <div className="flex justify-center">
              <Button 
                onClick={() => setShowWizard(true)}
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-pink-500"
              >
                <Settings className="h-5 w-5 mr-2" />
                Launch Configuration Wizard
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="export">
            <div className="flex justify-center">
              <TemplateExportPanel />
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Template Setup Wizard */}
      <TemplateSetupWizard 
        isOpen={showWizard}
        onComplete={() => setShowWizard(false)}
      />
    </div>
  );
};

export default TemplateManagementPage;