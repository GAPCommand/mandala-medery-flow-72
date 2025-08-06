import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Users, 
  DollarSign, 
  Package,
  Calendar,
  Star,
  Target,
  Download,
  Filter
} from 'lucide-react';

const RestaurantAnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [metric, setMetric] = useState('revenue');

  const analyticsData = {
    revenue: {
      current: 12450,
      previous: 10230,
      change: 21.7,
      trend: 'up'
    },
    customers: {
      current: 156,
      previous: 142,
      change: 9.9,
      trend: 'up'
    },
    orders: {
      current: 89,
      previous: 76,
      change: 17.1,
      trend: 'up'
    },
    satisfaction: {
      current: 4.8,
      previous: 4.6,
      change: 4.3,
      trend: 'up'
    }
  };

  const topProducts = [
    { name: 'Sacred Valley Original', orders: 34, revenue: 2040, growth: 15 },
    { name: 'Himalayan Reserve', orders: 28, revenue: 1960, growth: 8 },
    { name: 'Blessed Botanicals', orders: 22, revenue: 1540, growth: 23 },
    { name: 'Gateway Blend', orders: 18, revenue: 1080, growth: -5 }
  ];

  const eventPerformance = [
    { name: 'Full Moon Ceremony', guests: 24, revenue: 1920, satisfaction: 4.9 },
    { name: 'Seasonal Tasting', guests: 16, revenue: 1280, satisfaction: 4.7 },
    { name: 'Business Lunch', guests: 32, revenue: 1600, satisfaction: 4.5 }
  ];

  const customerInsights = {
    demographics: [
      { age: '25-34', percentage: 35 },
      { age: '35-44', percentage: 28 },
      { age: '45-54', percentage: 22 },
      { age: '55+', percentage: 15 }
    ],
    visitFrequency: {
      new: 45,
      returning: 55,
      loyal: 23
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatChange = (change: number, isPositive: boolean) => {
    const color = isPositive ? 'text-green-600' : 'text-red-600';
    const icon = isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />;
    return (
      <div className={`flex items-center space-x-1 ${color}`}>
        {icon}
        <span className="text-xs">{Math.abs(change)}%</span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-amber-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
            <p className="text-purple-100 mt-2">
              CRMGAP analytics pipeline with sases.pro graphics integration
            </p>
          </div>
          <div className="flex space-x-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32 bg-white/20 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">7 Days</SelectItem>
                <SelectItem value="30d">30 Days</SelectItem>
                <SelectItem value="90d">90 Days</SelectItem>
                <SelectItem value="1y">1 Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="bg-white/20 border-white/20 text-white hover:bg-white/30">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              {formatChange(analyticsData.revenue.change, analyticsData.revenue.trend === 'up')}
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">Revenue</p>
              <p className="text-2xl font-bold">{formatCurrency(analyticsData.revenue.current)}</p>
              <p className="text-xs text-gray-500">vs {formatCurrency(analyticsData.revenue.previous)} last period</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Users className="h-5 w-5 text-blue-600" />
              {formatChange(analyticsData.customers.change, analyticsData.customers.trend === 'up')}
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">Customers</p>
              <p className="text-2xl font-bold">{analyticsData.customers.current}</p>
              <p className="text-xs text-gray-500">vs {analyticsData.customers.previous} last period</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Package className="h-5 w-5 text-purple-600" />
              {formatChange(analyticsData.orders.change, analyticsData.orders.trend === 'up')}
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">Orders</p>
              <p className="text-2xl font-bold">{analyticsData.orders.current}</p>
              <p className="text-xs text-gray-500">vs {analyticsData.orders.previous} last period</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Star className="h-5 w-5 text-amber-600" />
              {formatChange(analyticsData.satisfaction.change, analyticsData.satisfaction.trend === 'up')}
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">Satisfaction</p>
              <p className="text-2xl font-bold">{analyticsData.satisfaction.current}</p>
              <p className="text-xs text-gray-500">vs {analyticsData.satisfaction.previous} last period</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-purple-600" />
              <span>Top Performing Products</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{product.name}</h4>
                    <p className="text-sm text-gray-600">{product.orders} orders</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatCurrency(product.revenue)}</p>
                    {formatChange(product.growth, product.growth > 0)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Event Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-amber-600" />
              <span>Event Performance</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {eventPerformance.map((event, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">{event.name}</h4>
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 text-yellow-500 fill-current" />
                      <span className="text-xs">{event.satisfaction}</span>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{event.guests} guests</span>
                    <span>{formatCurrency(event.revenue)}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customer Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-600" />
              <span>Customer Demographics</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {customerInsights.demographics.map((demo, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm">{demo.age}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${demo.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm w-8">{demo.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-green-600" />
              <span>Customer Loyalty</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">New Customers</span>
                <Badge variant="outline">{customerInsights.visitFrequency.new}%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Returning Customers</span>
                <Badge variant="outline">{customerInsights.visitFrequency.returning}%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Loyal Customers</span>
                <Badge className="bg-green-100 text-green-800">{customerInsights.visitFrequency.loyal}%</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Integration Notes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <BarChart3 className="h-6 w-6 text-purple-600" />
              <div>
                <h3 className="font-medium text-purple-900">CRMGAP Analytics Pipeline</h3>
                <p className="text-sm text-purple-700 mt-1">
                  Real-time data integration from CRMGAP customer tracking and PANDAB inventory sync.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Target className="h-6 w-6 text-amber-600" />
              <div>
                <h3 className="font-medium text-amber-900">sases.pro Graphics Integration</h3>
                <p className="text-sm text-amber-700 mt-1">
                  Advanced visualization powered by sases.pro database program for enhanced insights.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RestaurantAnalyticsPage;