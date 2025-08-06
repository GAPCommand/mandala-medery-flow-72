import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTemplate } from '@/contexts/TemplateContext';
import { exportToPANDAB, exportToJSON, exportTemplateMetadata } from '@/utils/templateExport';
import { Download, Package, Sparkles, Clock, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

export const TemplateExportPanel: React.FC = () => {
  const { config, isCustomized } = useTemplate();
  const [isExporting, setIsExporting] = useState(false);

  const handleExportToPANDAB = async () => {
    setIsExporting(true);
    try {
      const result = await exportToPANDAB();
      
      if (result.success) {
        // Create downloadable JSON file
        const blob = new Blob([JSON.stringify(result, null, 2)], {
          type: 'application/json'
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${config.brand.name.replace(/\s+/g, '-').toLowerCase()}-template-package.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        toast.success('Template exported successfully! Ready for PANDAB deployment.');
      }
    } catch (error) {
      toast.error('Export failed. Please try again.');
      console.error('Export error:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportJSON = () => {
    const jsonData = exportToJSON();
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${config.brand.name.replace(/\s+/g, '-').toLowerCase()}-complete-export.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('Complete template data exported!');
  };

  const handleExportMetadata = () => {
    const metadata = exportTemplateMetadata();
    const blob = new Blob([metadata], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${config.brand.name.replace(/\s+/g, '-').toLowerCase()}-metadata.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('Template metadata exported!');
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <Package className="h-6 w-6 text-white" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold">Template Export Center</CardTitle>
        <p className="text-gray-600">Export your configured template for deployment</p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Template Status */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
          <div className="flex items-center space-x-3">
            <Sparkles className="h-5 w-5 text-purple-600" />
            <div>
              <h3 className="font-semibold text-purple-900">{config.brand.name}</h3>
              <p className="text-sm text-purple-700">{config.brand.industry}</p>
            </div>
          </div>
          <Badge className={isCustomized ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
            {isCustomized ? (
              <>
                <CheckCircle className="h-3 w-3 mr-1" />
                Configured
              </>
            ) : (
              <>
                <Clock className="h-3 w-3 mr-1" />
                Default
              </>
            )}
          </Badge>
        </div>

        {/* Export Options */}
        <div className="space-y-4">
          <div className="p-4 border border-purple-200 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-purple-900">PANDAB Template Package</h4>
              <Badge className="bg-purple-100 text-purple-800">Recommended</Badge>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Complete template package ready for instant deployment in PANDAB CRM system. 
              Includes all configurations, database schema, and deployment instructions.
            </p>
            <Button 
              onClick={handleExportToPANDAB}
              disabled={isExporting}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500"
            >
              {isExporting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Export to PANDAB
                </>
              )}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-semibold mb-2">Complete Template Data</h4>
              <p className="text-sm text-gray-600 mb-4">
                Full template configuration including all components, settings, and metadata.
              </p>
              <Button 
                onClick={handleExportJSON}
                variant="outline"
                className="w-full"
              >
                <Download className="h-4 w-4 mr-2" />
                Export JSON
              </Button>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-semibold mb-2">Template Metadata</h4>
              <p className="text-sm text-gray-600 mb-4">
                Template preview information and feature summary for integration purposes.
              </p>
              <Button 
                onClick={handleExportMetadata}
                variant="outline"
                className="w-full"
              >
                <Download className="h-4 w-4 mr-2" />
                Export Metadata
              </Button>
            </div>
          </div>
        </div>

        {/* Setup Time Estimate */}
        <div className="text-center p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
          <Clock className="h-5 w-5 text-green-600 mx-auto mb-2" />
          <p className="text-sm font-medium text-green-800">
            Estimated Setup Time: 30 minutes
          </p>
          <p className="text-xs text-green-600 mt-1">
            From export to fully functional e-commerce site
          </p>
        </div>
      </CardContent>
    </Card>
  );
};