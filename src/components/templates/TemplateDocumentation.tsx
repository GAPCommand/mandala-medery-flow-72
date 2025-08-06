
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Book, 
  Database, 
  Settings, 
  Palette, 
  Workflow,
  Target,
  Lightbulb,
  CheckCircle
} from 'lucide-react';

export const TemplateDocumentation: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-amber-800 mb-2">
          Sacred Commerce Template Documentation
        </h1>
        <p className="text-lg text-amber-600">
          Complete setup and customization guide for food manufacturers
        </p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="database">Database</TabsTrigger>
          <TabsTrigger value="setup">Setup</TabsTrigger>
          <TabsTrigger value="customization">Customize</TabsTrigger>
          <TabsTrigger value="deployment">Deploy</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5" />
                <span>Target Market & Use Cases</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Primary Target Market</h3>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Artisanal food & beverage manufacturers</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Craft breweries and distilleries</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Specialty beverage companies (mead, kombucha, etc.)</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Organic and natural product manufacturers</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Wellness and spiritual product companies</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Key Differentiators</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-medium text-purple-800">Sacred Commerce System</h4>
                    <p className="text-sm text-purple-600 mt-1">
                      Integrated consciousness tracking, spiritual branding, and sacred product attributes
                    </p>
                  </div>
                  <div className="p-4 bg-amber-50 rounded-lg">
                    <h4 className="font-medium text-amber-800">Batch Traceability</h4>
                    <p className="text-sm text-amber-600 mt-1">
                      Complete source-to-customer tracking with honey source lineage and blessing ceremonies
                    </p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-800">Distributor Network</h4>
                    <p className="text-sm text-blue-600 mt-1">
                      Multi-tier distributor management with territory assignment and commission automation
                    </p>
                  </div>
                  <div className="p-4 bg-emerald-50 rounded-lg">
                    <h4 className="font-medium text-emerald-800">Real-time Sync</h4>
                    <p className="text-sm text-emerald-600 mt-1">
                      Universal e-commerce integration with PANDAB and Mandala Mead platforms
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Core Business Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>Distributor Management System</span>
                  <Badge className="bg-green-100 text-green-800">Complete</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Product Catalog & Inventory</span>
                  <Badge className="bg-green-100 text-green-800">Complete</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Order Processing & Fulfillment</span>
                  <Badge className="bg-green-100 text-green-800">Complete</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Commission Management</span>
                  <Badge className="bg-green-100 text-green-800">Complete</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Territory Management</span>
                  <Badge className="bg-green-100 text-green-800">Complete</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Analytics & Reporting</span>
                  <Badge className="bg-green-100 text-green-800">Complete</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sacred & Spiritual Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>Consciousness Level Tracking</span>
                  <Badge className="bg-purple-100 text-purple-800">Unique</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Chakra Alignment System</span>
                  <Badge className="bg-purple-100 text-purple-800">Unique</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Sacred Geometry Integration</span>
                  <Badge className="bg-purple-100 text-purple-800">Unique</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Blessing Ceremony Tracking</span>
                  <Badge className="bg-purple-100 text-purple-800">Unique</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Divine Signature System</span>
                  <Badge className="bg-purple-100 text-purple-800">Unique</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Spiritual Journey Documentation</span>
                  <Badge className="bg-purple-100 text-purple-800">Unique</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="database" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="h-5 w-5" />
                <span>Database Schema Overview</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3 text-blue-800">Core Commerce Tables</h3>
                  <ul className="space-y-1 text-sm">
                    <li>• mandala_products</li>
                    <li>• mandala_distributors</li>
                    <li>• mandala_orders</li>
                    <li>• mandala_order_items</li>
                    <li>• mandala_inventory_batches</li>
                    <li>• mandala_territories</li>
                    <li>• mandala_commissions</li>
                    <li>• cart_items</li>
                    <li>• collection_products</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg mb-3 text-purple-800">Spiritual Tables</h3>
                  <ul className="space-y-1 text-sm">
                    <li>• consciousness_evolution_tracking</li>
                    <li>• consciousness_alignment_history</li>
                    <li>• chakra_alignments</li>
                    <li>• blessing_evolution_events</li>
                    <li>• consciousness_anomaly_detection</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg mb-3 text-emerald-800">System Tables</h3>
                  <ul className="space-y-1 text-sm">
                    <li>• mandala_user_roles</li>
                    <li>• mandala_user_permissions</li>
                    <li>• affiliate_programs</li>
                    <li>• commission_calculations</li>
                    <li>• commission_distributions</li>
                    <li>• api_keys</li>
                    <li>• admin_logs</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="setup" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>Setup Requirements & Configuration</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-3">Technical Prerequisites</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Database Setup</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Supabase project with RLS policies</li>
                      <li>• Database migrations executed</li>
                      <li>• Row-level security configured</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Payment Integration</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Stripe account setup</li>
                      <li>• Webhook endpoints configured</li>
                      <li>• Payment method verification</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Domain & Hosting</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Custom domain configuration</li>
                      <li>• SSL certificate installation</li>
                      <li>• DNS records setup</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Email & Notifications</h4>
                    <ul className="text-sm space-y-1">
                      <li>• SMTP service integration</li>
                      <li>• Email templates configuration</li>
                      <li>• Notification workflows</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3">Business Configuration</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-amber-50 rounded-lg">
                    <h4 className="font-medium text-amber-800 mb-2">Product Catalog Setup</h4>
                    <p className="text-sm text-amber-700">
                      Import your product catalog, configure consciousness levels, set wholesale/retail pricing, 
                      and establish inventory batch tracking parameters.
                    </p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">Distributor Network Planning</h4>
                    <p className="text-sm text-blue-700">
                      Define territory boundaries, establish distributor tiers, set commission structures, 
                      and create onboarding workflows.
                    </p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-medium text-purple-800 mb-2">Sacred Branding Configuration</h4>
                    <p className="text-sm text-purple-700">
                      Customize consciousness level definitions, configure sacred symbols, 
                      set blessing ceremony parameters, and establish spiritual journey tracking.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customization" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Palette className="h-5 w-5" />
                <span>Customization Options</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-3">Industry Adaptations</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-3 border rounded-lg text-center">
                    <h4 className="font-medium">Craft Breweries</h4>
                    <p className="text-xs text-gray-600 mt-1">Beer, ale, specialty brews</p>
                  </div>
                  <div className="p-3 border rounded-lg text-center">
                    <h4 className="font-medium">Distilleries</h4>
                    <p className="text-xs text-gray-600 mt-1">Whiskey, vodka, artisan spirits</p>
                  </div>
                  <div className="p-3 border rounded-lg text-center">
                    <h4 className="font-medium">Specialty Beverages</h4>
                    <p className="text-xs text-gray-600 mt-1">Kombucha, kefir, functional drinks</p>
                  </div>
                  <div className="p-3 border rounded-lg text-center">
                    <h4 className="font-medium">Organic Foods</h4>
                    <p className="text-xs text-gray-600 mt-1">Natural, organic products</p>
                  </div>
                  <div className="p-3 border rounded-lg text-center">
                    <h4 className="font-medium">Wellness Products</h4>
                    <p className="text-xs text-gray-600 mt-1">Supplements, health foods</p>
                  </div>
                  <div className="p-3 border rounded-lg text-center">
                    <h4 className="font-medium">Artisanal Foods</h4>
                    <p className="text-xs text-gray-600 mt-1">Specialty, handcrafted items</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3">Branding Customization</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span>Logo and Color Scheme</span>
                    <Badge>Fully Customizable</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span>Product Photography Integration</span>
                    <Badge>Template System</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span>Sacred Symbol Personalization</span>
                    <Badge>Spiritual Themes</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span>Consciousness Level Definitions</span>
                    <Badge>Custom Scales</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deployment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Workflow className="h-5 w-5" />
                <span>Deployment & Launch</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-3">Deployment Checklist</h3>
                <div className="space-y-3">
                  {[
                    "Database migrations applied and verified",
                    "Environment variables configured",
                    "Payment integration tested",
                    "Email notifications working",
                    "Domain and SSL certificate active",
                    "Product catalog imported and verified",
                    "Distributor network configured",
                    "Commission structures tested",
                    "Order processing workflow verified",
                    "Analytics and reporting functional"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3">Post-Launch Support</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-800">Monitoring & Analytics</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      Comprehensive dashboard monitoring, performance tracking, and business intelligence reporting.
                    </p>
                  </div>
                  <div className="p-4 bg-emerald-50 rounded-lg">
                    <h4 className="font-medium text-emerald-800">Maintenance & Updates</h4>
                    <p className="text-sm text-emerald-700 mt-1">
                      Regular security updates, feature enhancements, and system optimizations.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TemplateDocumentation;
