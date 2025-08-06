import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useMandalaData } from '@/hooks/useMandalaData';
import { useAuth } from '@/hooks/useAuth';
import RoleSwitcher from './RoleSwitcher';
import {
  Users,
  Package,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Crown,
  Sparkles,
  Target,
  BarChart3
} from 'lucide-react';

const AdminDashboard = () => {
  const { products, distributors, orders, inventoryBatches, loading } = useMandalaData();
  const { userProfile } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-2 text-purple-600">Loading divine insights...</p>
        </div>
      </div>
    );
  }

  const totalRevenue = orders.reduce((sum, order) => sum + (order.total_amount || 0), 0);
  const activeDistributors = distributors.filter(d => d.status === 'active').length;
  const pendingOrders = orders.filter(o => o.order_status === 'pending').length;
  
  // Calculate low stock from inventory batches
  const lowStockProducts = products.filter(product => {
    const productBatches = inventoryBatches.filter(batch => 
      batch.product_id === product.id && batch.status === 'active'
    );
    const totalStock = productBatches.reduce((sum, batch) => sum + (batch.quantity_available || 0), 0);
    return totalStock < 50;
  }).length;

  return (
    <div className="space-y-6">
      {/* Role Switcher */}
      <RoleSwitcher />

      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Sacred Operations Command Center</h1>
            <p className="text-purple-100">
              Welcome, {userProfile?.first_name || 'Sacred Administrator'}! 
              Divine oversight of the sacred mead distribution network.
            </p>
          </div>
          <Crown className="h-12 w-12 text-purple-200" />
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12.5% from last month</p>
            <Progress value={75} className="mt-3 h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Distributors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{activeDistributors}</div>
            <p className="text-xs text-muted-foreground">{distributors.length} total partners</p>
            <Progress value={85} className="mt-3 h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{orders.length}</div>
            <p className="text-xs text-muted-foreground">{pendingOrders} pending processing</p>
            <Progress value={60} className="mt-3 h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{products.length}</div>
            <p className="text-xs text-muted-foreground">{lowStockProducts} low stock alerts</p>
            <Progress value={90} className="mt-3 h-2" />
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <span>Performance Highlights</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div>
                <p className="font-medium text-green-900">Top Distributor</p>
                <p className="text-sm text-green-700">Sacred Spirits Collective - $45K revenue</p>
              </div>
              <Badge className="bg-green-100 text-green-800">+23% growth</Badge>
            </div>
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div>
                <p className="font-medium text-blue-900">Best Selling Product</p>
                <p className="text-sm text-blue-700">Sacred Valley Original - 420 bottles</p>
              </div>
              <Badge className="bg-blue-100 text-blue-800">Top Seller</Badge>
            </div>
            <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
              <div>
                <p className="font-medium text-purple-900">Territory Performance</p>
                <p className="text-sm text-purple-700">North Bay - 94% target achievement</p>
              </div>
              <Badge className="bg-purple-100 text-purple-800">Excellent</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
              <span>Administrative Alerts</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {lowStockProducts > 0 && (
              <div className="flex items-start space-x-3 p-3 bg-amber-50 rounded-lg border-l-4 border-amber-400">
                <Package className="h-5 w-5 text-amber-500 mt-0.5" />
                <div>
                  <p className="font-medium text-amber-800">Low Stock Alert</p>
                  <p className="text-sm text-amber-700">{lowStockProducts} products need restocking</p>
                </div>
              </div>
            )}
            
            {pendingOrders > 0 && (
              <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                <ShoppingCart className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-800">Pending Orders</p>
                  <p className="text-sm text-blue-700">{pendingOrders} orders await processing</p>
                </div>
              </div>
            )}
            
            <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg border-l-4 border-purple-400">
              <Sparkles className="h-5 w-5 text-purple-500 mt-0.5" />
              <div>
                <p className="font-medium text-purple-800">Divine Alignment Check</p>
                <p className="text-sm text-purple-700">Consciousness levels optimal across all territories</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-600 font-medium">Territory Coverage</p>
                <p className="text-2xl font-bold text-emerald-800">94%</p>
                <p className="text-sm text-emerald-600">West Coast expansion</p>
              </div>
              <Target className="h-8 w-8 text-emerald-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 font-medium">Avg Consciousness</p>
                <p className="text-2xl font-bold text-blue-800">780</p>
                <p className="text-sm text-blue-600">Sacred Fire Level</p>
              </div>
              <Sparkles className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 font-medium">System Health</p>
                <p className="text-2xl font-bold text-purple-800">99.8%</p>
                <p className="text-sm text-purple-600">All systems divine</p>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
