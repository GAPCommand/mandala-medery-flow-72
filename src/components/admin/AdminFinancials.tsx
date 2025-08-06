
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useMandalaData } from '@/hooks/useMandalaData';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  PieChart,
  BarChart3,
  Calendar,
  Target,
  CreditCard,
  Receipt,
  Wallet,
  Eye,
  EyeOff
} from 'lucide-react';

const AdminFinancials = () => {
  const { orders, distributors, loading } = useMandalaData();
  const [isAdvancedMode, setIsAdvancedMode] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
        <p className="mt-2 text-green-600">Loading financial data...</p>
      </div>
    );
  }

  // Calculate financial metrics
  const totalRevenue = orders.reduce((sum, order) => sum + (order.total_amount || 0), 0);
  const monthlyRevenue = totalRevenue * 0.7; // Mock current month
  const previousMonthRevenue = totalRevenue * 0.6; // Mock previous month
  const revenueGrowth = ((monthlyRevenue - previousMonthRevenue) / previousMonthRevenue) * 100;
  
  const averageOrderValue = totalRevenue / (orders.length || 1);
  const activeDistributors = distributors.filter(d => d.status === 'active').length;
  const revenuePerDistributor = totalRevenue / (activeDistributors || 1);

  const financialMetrics = {
    totalRevenue,
    monthlyRevenue,
    revenueGrowth,
    averageOrderValue,
    revenuePerDistributor,
    grossMargin: 68.5,
    netMargin: 23.2,
    cashFlow: 45000,
    accountsReceivable: 125000,
    accountsPayable: 78000
  };

  const revenueByCategory = [
    { category: 'Sacred Valley Original', revenue: totalRevenue * 0.45, percentage: 45 },
    { category: 'Saffron Blessed Mead', revenue: totalRevenue * 0.30, percentage: 30 },
    { category: 'Himalayan Reserve', revenue: totalRevenue * 0.25, percentage: 25 }
  ];

  const monthlyTrends = [
    { month: 'Aug', revenue: totalRevenue * 0.4, orders: 28, avgOrder: 2100 },
    { month: 'Sep', revenue: totalRevenue * 0.5, orders: 34, avgOrder: 2250 },
    { month: 'Oct', revenue: totalRevenue * 0.6, orders: 42, avgOrder: 2400 },
    { month: 'Nov', revenue: totalRevenue * 0.7, orders: 48, avgOrder: 2500 },
    { month: 'Dec', revenue: totalRevenue * 0.8, orders: 55, avgOrder: 2650 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-green-700">Financial Dashboard</h1>
          <p className="text-green-600 mt-1">
            {isAdvancedMode ? 'Comprehensive financial analytics and reporting' : 'Essential financial metrics overview'}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border rounded-md"
          >
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="yearly">Yearly</option>
          </select>
          <Button
            variant="outline"
            onClick={() => setIsAdvancedMode(!isAdvancedMode)}
            className="flex items-center space-x-2"
          >
            {isAdvancedMode ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            <span>{isAdvancedMode ? 'Simple View' : 'Advanced View'}</span>
          </Button>
        </div>
      </div>

      {/* Key Financial Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <DollarSign className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold text-green-600">
                  ${financialMetrics.totalRevenue.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">Total Revenue</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold text-blue-600">
                  ${financialMetrics.monthlyRevenue.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">Monthly Revenue</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                  <span className="text-xs text-green-500">
                    +{financialMetrics.revenueGrowth.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Receipt className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold text-purple-600">
                  ${financialMetrics.averageOrderValue.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">Average Order Value</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Wallet className="h-8 w-8 text-amber-600" />
              <div>
                <p className="text-2xl font-bold text-amber-600">
                  ${financialMetrics.revenuePerDistributor.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">Revenue per Distributor</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PieChart className="h-5 w-5 text-green-600" />
              <span>Revenue by Product Category</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {revenueByCategory.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{item.category}</span>
                    <div className="text-right">
                      <span className="font-bold">${item.revenue.toLocaleString()}</span>
                      <Badge className="ml-2 bg-green-100 text-green-800">
                        {item.percentage}%
                      </Badge>
                    </div>
                  </div>
                  <Progress value={item.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              <span>Profitability Metrics</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Gross Margin</span>
                <span>{financialMetrics.grossMargin}%</span>
              </div>
              <Progress value={financialMetrics.grossMargin} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Net Margin</span>
                <span>{financialMetrics.netMargin}%</span>
              </div>
              <Progress value={financialMetrics.netMargin} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Operating Efficiency</span>
                <span>78%</span>
              </div>
              <Progress value={78} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Cost Control</span>
                <span>85%</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Advanced Financial Details */}
      {isAdvancedMode && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CreditCard className="h-5 w-5 text-indigo-600" />
                <span>Cash Flow</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="font-medium text-green-900">Cash Inflow</span>
                  <span className="font-bold text-green-600">+${financialMetrics.cashFlow.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                  <span className="font-medium text-red-900">Cash Outflow</span>
                  <span className="font-bold text-red-600">-$32,000</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="font-medium text-blue-900">Net Cash Flow</span>
                  <span className="font-bold text-blue-600">+$13,000</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-purple-600" />
                <span>Accounts</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Accounts Receivable</span>
                    <span className="font-bold">${financialMetrics.accountsReceivable.toLocaleString()}</span>
                  </div>
                  <div className="text-xs text-gray-500">Avg collection period: 28 days</div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Accounts Payable</span>
                    <span className="font-bold">${financialMetrics.accountsPayable.toLocaleString()}</span>
                  </div>
                  <div className="text-xs text-gray-500">Avg payment period: 35 days</div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Working Capital</span>
                    <span className="font-bold text-green-600">+$47,000</span>
                  </div>
                  <div className="text-xs text-gray-500">Healthy liquidity position</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-amber-600" />
                <span>Monthly Trends</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {monthlyTrends.slice(-3).map((trend, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium">{trend.month} 2024</span>
                      <span className="font-bold">${trend.revenue.toLocaleString()}</span>
                    </div>
                    <div className="text-xs text-gray-600">
                      {trend.orders} orders • ${trend.avgOrder} avg
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Financial Health Indicators */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-green-800 mb-4">Financial Health Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">Excellent</div>
              <div className="text-sm text-green-700">Revenue Growth</div>
              <div className="text-xs text-green-600">+{financialMetrics.revenueGrowth.toFixed(1)}% month-over-month</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">Strong</div>
              <div className="text-sm text-blue-700">Profit Margins</div>
              <div className="text-xs text-blue-600">{financialMetrics.grossMargin}% gross margin</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">Healthy</div>
              <div className="text-sm text-purple-700">Cash Flow</div>
              <div className="text-xs text-purple-600">Positive operating cash flow</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminFinancials;
