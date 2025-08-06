
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useMandalaData } from '@/hooks/useMandalaData';
import { useAuth } from '@/hooks/useAuth';
import {
  TrendingUp,
  Users,
  Package,
  ShoppingCart,
  DollarSign,
  AlertTriangle,
  Crown,
  Target,
  BarChart3,
  Calendar,
  MapPin,
  Activity
} from 'lucide-react';
import { Link } from 'react-router-dom';

const DashboardOverview = () => {
  const { products, distributors, orders, inventoryBatches, loading } = useMandalaData();
  const { userProfile, userRoles } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-2 text-amber-600">Loading sacred insights...</p>
        </div>
      </div>
    );
  }

  const totalRevenue = orders.reduce((sum, order) => sum + (order.total_amount || 0), 0);
  const activeDistributors = distributors.filter(d => d.status === 'active').length;
  const pendingOrders = orders.filter(o => o.order_status === 'pending').length;
  const lowStockProducts = products.filter(product => {
    const productBatches = inventoryBatches.filter(batch => 
      batch.product_id === product.id && batch.status === 'active'
    );
    const totalStock = productBatches.reduce((sum, batch) => sum + (batch.quantity_available || 0), 0);
    return totalStock < 50;
  }).length;

  const isAdmin = userRoles.includes('admin') || userRoles.includes('super_admin');

  const quickActions = [
    { title: 'Add Product', href: '/dashboard/catalog', icon: Package },
    { title: 'New Order', href: '/dashboard/orders', icon: ShoppingCart },
    { title: 'Add Distributor', href: '/dashboard/distributors', icon: Users },
    { title: 'View Analytics', href: '/dashboard/analytics', icon: BarChart3 },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {userProfile?.first_name || 'Administrator'}!
            </h1>
            <p className="text-amber-100">
              Sacred operations overview for {new Date().toLocaleDateString()}
            </p>
          </div>
          <Crown className="h-12 w-12 text-amber-200" />
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12.5% from last month</p>
            <Progress value={75} className="mt-3 h-2" />
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Distributors</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{activeDistributors}</div>
            <p className="text-xs text-muted-foreground">{distributors.length} total partners</p>
            <Progress value={85} className="mt-3 h-2" />
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{orders.length}</div>
            <p className="text-xs text-muted-foreground">{pendingOrders} pending</p>
            <Progress value={60} className="mt-3 h-2" />
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <Package className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{products.length}</div>
            <p className="text-xs text-muted-foreground">{lowStockProducts} low stock</p>
            <Progress value={90} className="mt-3 h-2" />
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions & Alerts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-blue-600" />
              <span>Quick Actions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <Button key={index} variant="outline" asChild className="h-20 flex-col">
                  <Link to={action.href}>
                    <action.icon className="h-6 w-6 mb-2" />
                    <span className="text-sm">{action.title}</span>
                  </Link>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
              <span>System Alerts</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {lowStockProducts > 0 && (
              <div className="flex items-start space-x-3 p-3 bg-amber-50 rounded-lg border-l-4 border-amber-400">
                <Package className="h-5 w-5 text-amber-500 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-amber-800">Low Stock Alert</p>
                  <p className="text-sm text-amber-700">{lowStockProducts} products need restocking</p>
                </div>
                <Button size="sm" variant="outline" asChild>
                  <Link to="/dashboard/catalog">Review</Link>
                </Button>
              </div>
            )}
            
            {pendingOrders > 0 && (
              <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                <ShoppingCart className="h-5 w-5 text-blue-500 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-blue-800">Pending Orders</p>
                  <p className="text-sm text-blue-700">{pendingOrders} orders await processing</p>
                </div>
                <Button size="sm" variant="outline" asChild>
                  <Link to="/dashboard/orders">Process</Link>
                </Button>
              </div>
            )}
            
            <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
              <Target className="h-5 w-5 text-green-500 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-green-800">System Status</p>
                <p className="text-sm text-green-700">All systems operational</p>
              </div>
              <Badge className="bg-green-100 text-green-800">Healthy</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-600 font-medium">Territory Coverage</p>
                <p className="text-2xl font-bold text-emerald-800">94%</p>
                <p className="text-sm text-emerald-600">West Coast expansion</p>
              </div>
              <MapPin className="h-8 w-8 text-emerald-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 font-medium">Monthly Growth</p>
                <p className="text-2xl font-bold text-blue-800">+23%</p>
                <p className="text-sm text-blue-600">Revenue increase</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 font-medium">Customer Satisfaction</p>
                <p className="text-2xl font-bold text-purple-800">98.5%</p>
                <p className="text-sm text-purple-600">Sacred quality rating</p>
              </div>
              <Crown className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-gray-600" />
            <span>Recent Activity</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="font-medium">New order #2024-001 received</p>
                <p className="text-sm text-gray-600">Sacred Valley Original - 48 bottles</p>
              </div>
              <span className="text-sm text-gray-500">2 minutes ago</span>
            </div>
            <div className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="font-medium">Distributor verified</p>
                <p className="text-sm text-gray-600">Sacred Spirits Collective approved</p>
              </div>
              <span className="text-sm text-gray-500">15 minutes ago</span>
            </div>
            <div className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
              <div className="flex-1">
                <p className="font-medium">Inventory batch created</p>
                <p className="text-sm text-gray-600">Batch SF-2024-012 - 200 units</p>
              </div>
              <span className="text-sm text-gray-500">1 hour ago</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardOverview;
