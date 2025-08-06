
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SalesAnalytics from '@/components/analytics/SalesAnalytics';
import AdvancedInventoryManager from '@/components/admin/AdvancedInventoryManager';
import { BarChart3, Package, TrendingUp, Users } from 'lucide-react';

const AdvancedAnalyticsPage = () => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-4">
          Advanced Analytics Hub
        </h1>
        <p className="text-xl text-amber-700">Deep insights and intelligent forecasting for sacred commerce</p>
      </div>

      <Tabs defaultValue="sales" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="sales" className="flex items-center space-x-2">
            <BarChart3 className="h-4 w-4" />
            <span>Sales Analytics</span>
          </TabsTrigger>
          <TabsTrigger value="inventory" className="flex items-center space-x-2">
            <Package className="h-4 w-4" />
            <span>Inventory Intelligence</span>
          </TabsTrigger>
          <TabsTrigger value="forecasting" className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4" />
            <span>Demand Forecasting</span>
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>Performance Metrics</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sales">
          <SalesAnalytics />
        </TabsContent>

        <TabsContent value="inventory">
          <AdvancedInventoryManager />
        </TabsContent>

        <TabsContent value="forecasting">
          <div className="text-center py-12">
            <TrendingUp className="h-16 w-16 text-amber-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-amber-800 mb-2">AI-Powered Demand Forecasting</h3>
            <p className="text-amber-600 mb-6">Advanced predictive analytics for sacred mead distribution</p>
            <p className="text-amber-500 text-sm">Coming soon in Phase 3...</p>
          </div>
        </TabsContent>

        <TabsContent value="performance">
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-amber-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-amber-800 mb-2">Performance Analytics</h3>
            <p className="text-amber-600 mb-6">Comprehensive distributor and territory performance tracking</p>
            <p className="text-amber-500 text-sm">Coming soon in Phase 3...</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedAnalyticsPage;
