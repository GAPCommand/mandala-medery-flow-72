
import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useMandalaData } from "@/hooks/useMandalaData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Tooltip, Legend } from 'recharts';
import { TrendingUp, MapPin, Star, Award, Loader2, Target, Sparkles, Crown } from "lucide-react";

const AnalyticsDashboard = () => {
  const { salesTerritories, performanceMetrics, products, distributors, loading } = useMandalaData();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
      </div>
    );
  }

  // Mock analytics data for demonstration
  const territoryPerformance = [
    { name: 'North Bay Sacred Circle', revenue: 142000, target: 150000, consciousness: 750 },
    { name: 'East Bay Consciousness Hub', revenue: 185000, target: 200000, consciousness: 820 },
    { name: 'Peninsula Divine Network', revenue: 168000, target: 180000, consciousness: 780 }
  ];

  const productDemand = [
    { name: 'Sacred Valley Original', demand: 420, trend: '+12%', consciousness: 650 },
    { name: 'Saffron Blessed Mead', demand: 180, trend: '+8%', consciousness: 850 },
    { name: 'Himalayan Reserve', demand: 75, trend: '+25%', consciousness: 950 }
  ];

  const monthlyTrends = [
    { month: 'Oct', revenue: 125000, consciousness: 680, orders: 28 },
    { month: 'Nov', revenue: 156000, consciousness: 720, orders: 34 },
    { month: 'Dec', revenue: 198000, consciousness: 780, orders: 42 }
  ];

  const distributorTiers = [
    { name: 'Premium Partners', value: 65, color: '#8B5CF6' },
    { name: 'Standard Partners', value: 35, color: '#06B6D4' }
  ];

  const COLORS = ['#8B5CF6', '#06B6D4', '#10B981', '#F59E0B'];

  return (
    <section className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
          Divine Analytics & Sacred Insights
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Harnessing cosmic wisdom to guide Kashmir mead distribution across consciousness-aligned territories
        </p>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-purple-800 mb-2">$495K</h3>
              <p className="text-purple-600">Total Sacred Revenue</p>
              <p className="text-xs text-purple-500 mt-1">+18% this quarter</p>
            </div>
            <Crown className="h-8 w-8 text-purple-500" />
          </div>
        </Card>
        
        <Card className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-emerald-800 mb-2">675</h3>
              <p className="text-emerald-600">Bottles in Journey</p>
              <p className="text-xs text-emerald-500 mt-1">Kashmir → Oakland</p>
            </div>
            <Target className="h-8 w-8 text-emerald-500" />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-amber-800 mb-2">780</h3>
              <p className="text-amber-600">Avg Consciousness</p>
              <p className="text-xs text-amber-500 mt-1">Sacred Fire Level</p>
            </div>
            <Sparkles className="h-8 w-8 text-amber-500" />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-indigo-50 to-blue-50 border-indigo-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-indigo-800 mb-2">94%</h3>
              <p className="text-indigo-600">Divine Satisfaction</p>
              <p className="text-xs text-indigo-500 mt-1">Distributor harmony</p>
            </div>
            <Award className="h-8 w-8 text-indigo-500" />
          </div>
        </Card>
      </div>

      {/* Territory Performance & Revenue Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <MapPin className="h-5 w-5 mr-2 text-purple-600" />
            Sacred Territory Performance
          </h3>
          <div className="space-y-4">
            {territoryPerformance.map((territory, index) => (
              <div key={index} className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border border-purple-200">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-purple-900">{territory.name}</h4>
                  <Badge className="bg-purple-100 text-purple-800">
                    ⚡ {territory.consciousness}
                  </Badge>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">
                    ${territory.revenue.toLocaleString()} / ${territory.target.toLocaleString()}
                  </span>
                  <span className="text-sm font-medium text-purple-600">
                    {Math.round((territory.revenue / territory.target) * 100)}%
                  </span>
                </div>
                <Progress 
                  value={(territory.revenue / territory.target) * 100} 
                  className="h-2"
                />
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-emerald-600" />
            Sacred Revenue Trends
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthlyTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value, name) => [
                name === 'revenue' ? `$${value.toLocaleString()}` : value,
                name === 'revenue' ? 'Revenue' : name === 'consciousness' ? 'Consciousness' : 'Orders'
              ]} />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#8B5CF6" strokeWidth={3} name="Revenue" />
              <Line type="monotone" dataKey="consciousness" stroke="#10B981" strokeWidth={2} name="Consciousness" />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Product Demand Analysis & Distributor Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Star className="h-5 w-5 mr-2 text-amber-600" />
            Sacred Product Demand
          </h3>
          <div className="space-y-4">
            {productDemand.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200">
                <div className="flex-1">
                  <h4 className="font-medium text-amber-900">{product.name}</h4>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-sm text-gray-600">{product.demand} bottles</span>
                    <Badge className="bg-emerald-100 text-emerald-800 text-xs">
                      {product.trend}
                    </Badge>
                    <Badge className="bg-purple-100 text-purple-800 text-xs">
                      ⚡ {product.consciousness}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="w-16 h-2 bg-gray-200 rounded-full">
                    <div 
                      className="h-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                      style={{ width: `${(product.demand / 420) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Sacred Partner Distribution</h3>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={distributorTiers}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {distributorTiers.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Distribution']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {distributorTiers.map((tier, index) => (
              <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                <div 
                  className="w-4 h-4 rounded-full mx-auto mb-2"
                  style={{ backgroundColor: tier.color }}
                ></div>
                <p className="font-medium text-sm">{tier.name}</p>
                <p className="text-xl font-bold" style={{ color: tier.color }}>{tier.value}%</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Divine Insights & Recommendations */}
      <Card className="p-6 bg-gradient-to-r from-purple-50 via-indigo-50 to-blue-50 border-purple-200">
        <h3 className="text-lg font-semibold mb-4 flex items-center text-purple-900">
          <Sparkles className="h-5 w-5 mr-2" />
          Divine Insights & Cosmic Guidance
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-white/70 rounded-lg border border-purple-200">
            <h4 className="font-medium text-purple-800 mb-2">Territory Optimization</h4>
            <p className="text-sm text-gray-700">
              North Bay Sacred Circle shows 94% target achievement. Consider expanding distributor network 
              to capture remaining consciousness-aligned markets.
            </p>
          </div>
          <div className="p-4 bg-white/70 rounded-lg border border-indigo-200">
            <h4 className="font-medium text-indigo-800 mb-2">Sacred Inventory Flow</h4>
            <p className="text-sm text-gray-700">
              Himalayan Reserve showing 25% demand increase. Recommend increasing production batch 
              size for next Kashmir harvest cycle.
            </p>
          </div>
          <div className="p-4 bg-white/70 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-800 mb-2">Consciousness Alignment</h4>
            <p className="text-sm text-gray-700">
              Average territory consciousness at 780 indicates strong spiritual resonance. 
              Premium tier distributors driving enhanced sacred energy.
            </p>
          </div>
        </div>
      </Card>
    </section>
  );
};

export default AnalyticsDashboard;
