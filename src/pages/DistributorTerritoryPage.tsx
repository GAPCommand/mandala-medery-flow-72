
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, TrendingUp, Users, DollarSign } from 'lucide-react';

const DistributorTerritoryPage = () => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-4">
          My Sacred Territory
        </h1>
        <p className="text-xl text-amber-700">Your distribution domain performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-amber-800">Territory Size</CardTitle>
            <MapPin className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-700">15 Cities</div>
            <p className="text-xs text-amber-600">Northern California</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-amber-800">Active Customers</CardTitle>
            <Users className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-700">247</div>
            <p className="text-xs text-amber-600">+12% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-amber-800">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-700">$24,500</div>
            <p className="text-xs text-amber-600">+8% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-amber-800">Growth Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-700">+15%</div>
            <p className="text-xs text-amber-600">Year over year</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-to-br from-white to-amber-50 border-amber-200">
        <CardHeader>
          <CardTitle className="text-amber-800">Territory Map</CardTitle>
          <CardDescription>Your sacred distribution region</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg flex items-center justify-center border border-amber-200">
            <p className="text-amber-700">Interactive territory map coming soon...</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DistributorTerritoryPage;
