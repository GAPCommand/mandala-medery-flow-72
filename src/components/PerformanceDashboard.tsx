
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Award, Target, Users, Eye, EyeOff, DollarSign } from 'lucide-react';
import { useMandalaData } from '@/hooks/useMandalaData';

const PerformanceDashboard = () => {
  const [isAdvancedMode, setIsAdvancedMode] = useState(false);
  const { distributors, orders } = useMandalaData();

  const topPerformers = [
    { name: 'Sarah Chen', region: 'Northern CA', sales: 156000, growth: '+23%' },
    { name: 'Mike Rodriguez', region: 'Pacific NW', sales: 142000, growth: '+18%' },
    { name: 'Lisa Thompson', region: 'Southwest', sales: 138000, growth: '+15%' },
  ];

  return (
    <div className="space-y-6">
      {/* Header with Mode Toggle */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-amber-700">Performance Dashboard</h1>
          <p className="text-amber-600 mt-1">
            {isAdvancedMode ? 'Advanced performance analytics and insights' : 'Simple view of your key performance metrics'}
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => setIsAdvancedMode(!isAdvancedMode)}
          className="flex items-center space-x-2"
        >
          {isAdvancedMode ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          <span>{isAdvancedMode ? 'Simple View' : 'Advanced View'}</span>
        </Button>
      </div>

      {/* Beginner Mode: Essential KPIs */}
      {!isAdvancedMode && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center space-x-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <span>Monthly Sales</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">$436,000</div>
                <p className="text-sm text-gray-600 mt-1">+18% from last month</p>
                <Progress value={72} className="mt-3" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  <span>Active Distributors</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">{distributors.length}</div>
                <p className="text-sm text-gray-600 mt-1">2 new this month</p>
                <Progress value={85} className="mt-3" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Target className="h-5 w-5 text-purple-600" />
                  <span>Goal Progress</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600">87%</div>
                <p className="text-sm text-gray-600 mt-1">Monthly target</p>
                <Progress value={87} className="mt-3" />
              </CardContent>
            </Card>
          </div>

          {/* Top Performers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-amber-500" />
                <span>Top Performers This Month</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPerformers.map((performer, index) => (
                  <div key={performer.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{performer.name}</p>
                        <p className="text-sm text-gray-600">{performer.region}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">${performer.sales.toLocaleString()}</p>
                      <Badge variant="secondary" className="text-green-600">
                        {performer.growth}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Advanced Mode: Detailed Analytics */}
      {isAdvancedMode && (
        <div className="space-y-6">
          {/* Enhanced Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Revenue</p>
                    <p className="text-2xl font-bold">$436K</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
                <div className="mt-2">
                  <Progress value={72} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">72% of monthly goal</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Conversion Rate</p>
                    <p className="text-2xl font-bold">24.5%</p>
                  </div>
                  <Target className="h-8 w-8 text-blue-600" />
                </div>
                <div className="mt-2">
                  <Progress value={85} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">+2.3% from last month</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Avg Order Value</p>
                    <p className="text-2xl font-bold">$142</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-purple-600" />
                </div>
                <div className="mt-2">
                  <Progress value={90} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">+5.2% increase</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Sacred Alignment</p>
                    <p className="text-2xl font-bold">94%</p>
                  </div>
                  <Award className="h-8 w-8 text-amber-600" />
                </div>
                <div className="mt-2">
                  <Progress value={94} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">Consciousness metric</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Performance Table */}
          <Card>
            <CardHeader>
              <CardTitle>Distributor Performance Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">Name</th>
                      <th className="text-left p-3">Region</th>
                      <th className="text-left p-3">Sales</th>
                      <th className="text-left p-3">Orders</th>
                      <th className="text-left p-3">Conversion</th>
                      <th className="text-left p-3">Growth</th>
                      <th className="text-left p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topPerformers.map((performer) => (
                      <tr key={performer.name} className="border-b hover:bg-gray-50">
                        <td className="p-3 font-medium">{performer.name}</td>
                        <td className="p-3">{performer.region}</td>
                        <td className="p-3">${performer.sales.toLocaleString()}</td>
                        <td className="p-3">234</td>
                        <td className="p-3">28.5%</td>
                        <td className="p-3">
                          <Badge variant="secondary" className="text-green-600">
                            {performer.growth}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <Badge>Excellent</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Progressive Learning Tip */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs font-bold">📈</span>
            </div>
            <div>
              <h4 className="font-medium text-blue-800">Performance Insight</h4>
              <p className="text-blue-700 text-sm mt-1">
                {isAdvancedMode 
                  ? "Use these detailed metrics to identify opportunities and optimize your distribution network."
                  : "Focus on the key metrics first. Switch to Advanced View for deeper performance analysis."}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceDashboard;
