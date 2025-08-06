
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTemplate } from '@/contexts/TemplateContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Palette, Building2, FileText, Settings, Sparkles } from 'lucide-react';
import IndustrySelection from './wizard/IndustrySelection';
import BrandConfiguration from './wizard/BrandConfiguration';
import ContentConfiguration from './wizard/ContentConfiguration';
import BusinessConfiguration from './wizard/BusinessConfiguration';

interface TemplateSetupWizardProps {
  onComplete?: () => void;
  isOpen?: boolean;
}

export const TemplateSetupWizard: React.FC<TemplateSetupWizardProps> = ({ 
  onComplete,
  isOpen = true 
}) => {
  const { config, updateConfig, applyPreset } = useTemplate();
  const [activeTab, setActiveTab] = useState('industry');
  const [selectedIndustry, setSelectedIndustry] = useState('');

  const handleIndustrySelect = (industry: string) => {
    setSelectedIndustry(industry);
    applyPreset(industry);
  };

  const handleBrandUpdate = (field: string, value: any) => {
    updateConfig({
      brand: {
        ...config.brand,
        [field]: value
      }
    });
  };

  const handleContentUpdate = (section: string, field: string, value: string) => {
    updateConfig({
      content: {
        ...config.content,
        [section]: {
          ...config.content[section as keyof typeof config.content],
          [field]: value
        }
      }
    });
  };

  const handleComplete = () => {
    localStorage.setItem('template-setup-completed', 'true');
    onComplete?.();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-auto">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Universal E-Commerce Temple Setup</CardTitle>
          <p className="text-gray-600">Configure your template for instant deployment</p>
        </CardHeader>
        
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 w-full mb-6">
              <TabsTrigger value="industry" className="flex items-center space-x-2">
                <Building2 className="h-4 w-4" />
                <span>Industry</span>
              </TabsTrigger>
              <TabsTrigger value="brand" className="flex items-center space-x-2">
                <Palette className="h-4 w-4" />
                <span>Brand</span>
              </TabsTrigger>
              <TabsTrigger value="content" className="flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <span>Content</span>
              </TabsTrigger>
              <TabsTrigger value="business" className="flex items-center space-x-2">
                <Settings className="h-4 w-4" />
                <span>Business</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="industry" className="space-y-6">
              <IndustrySelection
                selectedIndustry={selectedIndustry}
                onIndustrySelect={handleIndustrySelect}
              />
            </TabsContent>

            <TabsContent value="brand" className="space-y-6">
              <BrandConfiguration
                config={config}
                onBrandUpdate={handleBrandUpdate}
              />
            </TabsContent>

            <TabsContent value="content" className="space-y-6">
              <ContentConfiguration
                config={config}
                onContentUpdate={handleContentUpdate}
              />
            </TabsContent>

            <TabsContent value="business" className="space-y-6">
              <BusinessConfiguration
                config={config}
                onConfigUpdate={updateConfig}
              />
            </TabsContent>
          </Tabs>

          <div className="flex justify-between mt-8">
            <Button 
              variant="outline" 
              onClick={() => {
                const tabs = ['industry', 'brand', 'content', 'business'];
                const currentIndex = tabs.indexOf(activeTab);
                if (currentIndex > 0) {
                  setActiveTab(tabs[currentIndex - 1]);
                }
              }}
              disabled={activeTab === 'industry'}
            >
              Previous
            </Button>
            
            {activeTab === 'business' ? (
              <Button onClick={handleComplete} className="bg-gradient-to-r from-purple-500 to-pink-500">
                Complete Setup
              </Button>
            ) : (
              <Button 
                onClick={() => {
                  const tabs = ['industry', 'brand', 'content', 'business'];
                  const currentIndex = tabs.indexOf(activeTab);
                  if (currentIndex < tabs.length - 1) {
                    setActiveTab(tabs[currentIndex + 1]);
                  }
                }}
              >
                Next
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
