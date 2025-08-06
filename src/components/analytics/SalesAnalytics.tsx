
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, DollarSign, Package, Users, Calendar, BarChart3, PieChart } from 'lucide-react';

interface SalesMetric {
  label: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  icon: React.ComponentType<any>;
}

interface ChartData {
  month: string;
  revenue: number;
  orders: number;
  customers: number;
}

const SalesAnalytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  const salesMetrics: SalesMetric[] = [
    {
      label: 'Total Revenue',
      value: '$847,230',
      change: 12.5,
      trend: 'up',
      icon: DollarSign
    },
    {
      label: 'Orders Processed',
      value: 1247,
      change: 8.3,
      trend: 'up',
      icon: Package
    },
    {
      label: 'Active Distributors',
      value: 89,
      change: -2.1,
      trend: 'down',
      icon: Users
    },
    {
      label: 'Avg Order Value',
      value: '$679',
      change: 15.7,
      trend: 'up',
      icon: TrendingUp
    }
  ];

  const chartData: ChartData[] = [
    { month: 'Jan', revenue: 65000, orders: 156, customers: 23 },
    { month: 'Feb', revenue: 72000, orders: 182, customers: 28 },
    { month: 'Mar', revenue: 68000, orders: 164, customers: 25 },
    { month: 'Apr', revenue: 85000, orders: 210, customers: 32 },
    { month: 'May', revenue: 92000, orders: 234, customers: 38 },
    { month: 'Jun', revenue: 105000, orders: 267, customers: 45 }
  ];

  const topProducts = [
    { name: 'Sacred Valley Original', sales: 234, revenue: 156780, growth: 12.5 },
    { name: 'Himalayan Elixir', sales: 187, revenue: 124530, growth: 8.3 },
    { name: 'Divine Nectar Premium', sales: 156, revenue: 98400, growth: 15.2 },
    { name: 'Saffron Blessed Mead', sales: 143, revenue: 89650, growth: -2.1 },
    { name: 'Monastery Blend', sales: 98, revenue: 67340, growth: 6.7 }
  ];

  const topTerritories = [
    { name: 'Northern California', revenue: 245000, orders: 456, growth: 18.5 },
    { name: 'Southwest Region', revenue: 320000, orders: 523, growth: 12.3 },
    { name: 'Pacific Northwest', revenue: 180000, orders: 298, growth: 9.7 }
  ];

  return (
    <div className="space-y-6">
      {/* Analytics Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-amber-800">Sales Analytics</h2>
          <p className="text-amber-600">Sacred commerce insights and performance metrics</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-amber-200 rounded-md"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Custom Range
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {salesMetrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.label} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-amber-600 mb-1">{metric.label}</p>
                    <p className="text-2xl font-bold text-amber-800">{metric.value}</p>
                    <div className="flex items-center mt-2">
                      {metric.trend === 'up' ? (
                        <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                      ) : metric.trend === 'down' ? (
                        <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                      ) : null}
                      <span className={`text-sm ${
                        metric.trend === 'up' ? 'text-green-600' : 
                        metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        {metric.change > 0 ? '+' : ''}{metric.change}%
                      </span>
                    </div>
                  </div>
                  <Icon className="h-8 w-8 text-amber-600" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend Chart */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-amber-800">Revenue Trend</CardTitle>
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-4 w-4 text-amber-600" />
                <select
                  value={selectedMetric}
                  onChange={(e) => setSelectedMetric(e.target.value)}
                  className="text-sm border border-amber-200 rounded px-2 py-1"
                >
                  <option value="revenue">Revenue</option>
                  <option value="orders">Orders</option>
                  <option value="customers">Customers</option>
                </select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg border border-amber-200 flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="h-8 w-8 text-amber-600 mx-auto mb-2" />
                <p className="text-amber-700">Interactive chart visualization</p>
                <p className="text-amber-600 text-sm">6-month trend analysis</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Distribution Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="text-amber-800 flex items-center">
              <PieChart className="h-5 w-5 mr-2" />
              Sales Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg border border-amber-200 flex items-center justify-center">
              <div className="text-center">
                <PieChart className="h-8 w-8 text-amber-600 mx-auto mb-2" />
                <p className="text-amber-700">Territory & Product breakdown</p>
                <p className="text-amber-600 text-sm">Real-time distribution data</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle className="text-amber-800">Top Performing Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center justify-between p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-amber-800">{product.name}</p>
                      <p className="text-sm text-amber-600">{product.sales} sales</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-amber-700">${product.revenue.toLocaleString()}</p>
                    <div className="flex items-center">
                      {product.growth > 0 ? (
                        <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-red-600 mr-1" />
                      )}
                      <span className={`text-xs ${product.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {product.growth > 0 ? '+' : ''}{product.growth}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Territories */}
        <Card>
          <CardHeader>
            <CardTitle className="text-amber-800">Top Performing Territories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topTerritories.map((territory, index) => (
                <div key={territory.name} className="flex items-center justify-between p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-amber-800">{territory.name}</p>
                      <p className="text-sm text-amber-600">{territory.orders} orders</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-amber-700">${territory.revenue.toLocaleString()}</p>
                    <div className="flex items-center">
                      <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                      <span className="text-xs text-green-600">+{territory.growth}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SalesAnalytics;
