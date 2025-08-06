
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, DollarSign, Package, Users, Calendar, BarChart3, Target, Crown } from "lucide-react";

const SalesAnalytics = () => {
  const [timeRange, setTimeRange] = useState('30d');

  // Mock analytics data
  const analyticsData = {
    revenue: {
      current: 24750,
      previous: 18900,
      growth: 31
    },
    orders: {
      current: 47,
      previous: 38,
      growth: 24
    },
    bottles: {
      current: 1240,
      previous: 980,
      growth: 27
    },
    customers: {
      current: 23,
      previous: 19,
      growth: 21
    }
  };

  const productPerformance = [
    { name: 'Sacred Valley Original', sales: 580, revenue: 8700, growth: 15, consciousness: 8 },
    { name: 'Saffron Blessed Mead', sales: 420, revenue: 10920, growth: 45, consciousness: 9 },
    { name: 'Himalayan Reserve', sales: 240, revenue: 5130, growth: -8, consciousness: 10 }
  ];

  const monthlyTrend = [
    { month: 'Aug', revenue: 18500, bottles: 890 },
    { month: 'Sep', revenue: 21200, bottles: 1050 },
    { month: 'Oct', revenue: 19800, bottles: 945 },
    { month: 'Nov', revenue: 23100, bottles: 1180 },
    { month: 'Dec', revenue: 24750, bottles: 1240 }
  ];

  const sacredCalendarEvents = [
    { date: 'Dec 21', event: 'Winter Solstice', impact: '+35% sales boost expected' },
    { date: 'Jan 1', event: 'New Year Consciousness Reset', impact: '+28% typical increase' },
    { date: 'Feb 14', event: 'Sacred Union Day', impact: '+22% romantic pairing sales' }
  ];

  const commissionData = {
    currentMonth: 2475,
    projected: 3200,
    yearToDate: 18900,
    tier: 'Premium Partner',
    rate: '10%',
    bonusEligible: true
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-2">
            Sacred Sales Analytics
          </h1>
          <p className="text-xl text-amber-700">Divine insights into your territory performance</p>
        </div>
        <div className="flex space-x-2">
          {['7d', '30d', '90d', '1y'].map((range) => (
            <Button
              key={range}
              variant={timeRange === range ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeRange(range)}
              className={timeRange === range ? 'bg-amber-600 hover:bg-amber-700' : ''}
            >
              {range}
            </Button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200">
          <div className="flex items-center justify-between mb-3">
            <DollarSign className="h-8 w-8 text-emerald-600" />
            <Badge className="bg-emerald-100 text-emerald-800">+{analyticsData.revenue.growth}%</Badge>
          </div>
          <h3 className="text-2xl font-bold text-emerald-800">${analyticsData.revenue.current.toLocaleString()}</h3>
          <p className="text-sm text-emerald-600">Revenue (30 days)</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <div className="flex items-center justify-between mb-3">
            <Package className="h-8 w-8 text-blue-600" />
            <Badge className="bg-blue-100 text-blue-800">+{analyticsData.orders.growth}%</Badge>
          </div>
          <h3 className="text-2xl font-bold text-blue-800">{analyticsData.orders.current}</h3>
          <p className="text-sm text-blue-600">Orders Fulfilled</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
          <div className="flex items-center justify-between mb-3">
            <BarChart3 className="h-8 w-8 text-purple-600" />
            <Badge className="bg-purple-100 text-purple-800">+{analyticsData.bottles.growth}%</Badge>
          </div>
          <h3 className="text-2xl font-bold text-purple-800">{analyticsData.bottles.current}</h3>
          <p className="text-sm text-purple-600">Bottles Sold</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
          <div className="flex items-center justify-between mb-3">
            <Users className="h-8 w-8 text-amber-600" />
            <Badge className="bg-amber-100 text-amber-800">+{analyticsData.customers.growth}%</Badge>
          </div>
          <h3 className="text-2xl font-bold text-amber-800">{analyticsData.customers.current}</h3>
          <p className="text-sm text-amber-600">Active Customers</p>
        </Card>
      </div>

      {/* Revenue Trend & Commission Tracking */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6">
          <h2 className="text-2xl font-bold text-amber-800 mb-4 flex items-center">
            <TrendingUp className="h-6 w-6 mr-2" />
            Revenue Trend
          </h2>
          <div className="space-y-4">
            {monthlyTrend.map((month, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-amber-50 rounded-lg">
                <div>
                  <p className="font-medium text-amber-800">{month.month}</p>
                  <p className="text-sm text-gray-600">{month.bottles} bottles</p>
                </div>
                <p className="text-lg font-bold text-amber-700">${month.revenue.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200">
          <h2 className="text-2xl font-bold text-emerald-800 mb-4 flex items-center">
            <Crown className="h-6 w-6 mr-2" />
            Commission Tracking
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-emerald-700">${commissionData.currentMonth}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Projected</p>
                <p className="text-2xl font-bold text-emerald-600">${commissionData.projected}</p>
              </div>
            </div>
            
            <div className="border-t border-emerald-200 pt-4">
              <div className="flex justify-between text-sm mb-2">
                <span>Year to Date:</span>
                <span className="font-bold">${commissionData.yearToDate.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span>Commission Rate:</span>
                <span className="font-bold text-emerald-700">{commissionData.rate} ({commissionData.tier})</span>
              </div>
              {commissionData.bonusEligible && (
                <Badge className="w-full justify-center bg-emerald-100 text-emerald-800">
                  ✨ Bonus Eligible This Quarter
                </Badge>
              )}
            </div>
          </div>
        </Card>
      </div>

      {/* Product Performance */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold text-amber-800 mb-4 flex items-center">
          <Package className="h-6 w-6 mr-2" />
          Product Performance by Consciousness Level
        </h2>
        <div className="space-y-3">
          {productPerformance.map((product, index) => (
            <div key={index} className="flex justify-between items-center p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200">
              <div className="flex items-center space-x-4">
                <Badge className="bg-purple-100 text-purple-800">
                  Level {product.consciousness}
                </Badge>
                <div>
                  <p className="font-medium text-amber-800">{product.name}</p>
                  <p className="text-sm text-gray-600">{product.sales} bottles sold</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-amber-700">${product.revenue.toLocaleString()}</p>
                <div className="flex items-center space-x-2">
                  <span className={`text-sm font-medium ${product.growth >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                    {product.growth >= 0 ? '+' : ''}{product.growth}%
                  </span>
                  <TrendingUp className={`h-4 w-4 ${product.growth >= 0 ? 'text-emerald-600' : 'text-red-600 rotate-180'}`} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Sacred Calendar Insights */}
      <Card className="p-6 bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
        <h2 className="text-2xl font-bold text-purple-800 mb-4 flex items-center">
          <Calendar className="h-6 w-6 mr-2" />
          Sacred Calendar Sales Insights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {sacredCalendarEvents.map((event, index) => (
            <div key={index} className="bg-white p-4 rounded-lg border border-purple-200">
              <div className="flex justify-between items-start mb-2">
                <p className="font-bold text-purple-800">{event.date}</p>
                <Badge className="bg-purple-100 text-purple-800 text-xs">Sacred</Badge>
              </div>
              <p className="text-sm font-medium text-purple-700 mb-1">{event.event}</p>
              <p className="text-xs text-purple-600">{event.impact}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default SalesAnalytics;
