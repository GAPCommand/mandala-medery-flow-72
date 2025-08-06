
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, TrendingUp, Package, DollarSign } from 'lucide-react';

const DistributorAnalyticsPage = () => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-4">
          Sacred Analytics
        </h1>
        <p className="text-xl text-amber-700">Divine insights into your distribution success</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-amber-800">Total Sales</CardTitle>
            <DollarSign className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-700">$127,540</div>
            <p className="text-xs text-amber-600">+20.1% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-amber-800">Units Sold</CardTitle>
            <Package className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-700">1,247</div>
            <p className="text-xs text-amber-600">+12% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-amber-800">Growth Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-700">+18.5%</div>
            <p className="text-xs text-amber-600">Quarterly growth</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-white to-amber-50 border-amber-200">
          <CardHeader>
            <CardTitle className="text-amber-800 flex items-center">
              <BarChart3 className="mr-2 h-5 w-5" />
              Sales Trend
            </CardTitle>
            <CardDescription>Monthly performance over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg flex items-center justify-center border border-amber-200">
              <p className="text-amber-700">Sales chart coming soon...</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-amber-50 border-amber-200">
          <CardHeader>
            <CardTitle className="text-amber-800">Top Products</CardTitle>
            <CardDescription>Best performing sacred meads</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {['Sacred Honey Mead', 'Himalayan Elixir', 'Divine Nectar'].map((product, index) => (
                <div key={product} className="flex justify-between items-center p-3 bg-white rounded-lg border border-amber-200">
                  <span className="font-medium text-amber-800">#{index + 1} {product}</span>
                  <span className="text-amber-600">${(150 - index * 20).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DistributorAnalyticsPage;
