
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, UserPlus, Phone, Mail, MapPin, TrendingUp } from 'lucide-react';

const DistributorCustomersPage = () => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-4">
          Customer Success Center
        </h1>
        <p className="text-xl text-amber-700">Nurture your sacred customer relationships</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-amber-800">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-700">247</div>
            <p className="text-xs text-amber-600">+12 this month</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-amber-800">Active Customers</CardTitle>
            <TrendingUp className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-700">189</div>
            <p className="text-xs text-amber-600">76% retention rate</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-amber-800">New This Month</CardTitle>
            <UserPlus className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-700">12</div>
            <p className="text-xs text-amber-600">+8% growth</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-amber-800">Avg Order Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-700">$89</div>
            <p className="text-xs text-amber-600">+15% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-white to-amber-50 border-amber-200">
          <CardHeader>
            <CardTitle className="text-amber-800">Recent Customers</CardTitle>
            <CardDescription>Your newest sacred mead enthusiasts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Wellness Cafe', location: 'San Francisco', joined: '2 days ago' },
                { name: 'Sacred Spirits Bar', location: 'Berkeley', joined: '5 days ago' },
                { name: 'Mountain View Market', location: 'Palo Alto', joined: '1 week ago' }
              ].map((customer) => (
                <div key={customer.name} className="flex justify-between items-center p-3 bg-white rounded-lg border border-amber-200">
                  <div>
                    <p className="font-medium text-amber-800">{customer.name}</p>
                    <p className="text-sm text-amber-600 flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {customer.location}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-amber-600">{customer.joined}</p>
                    <div className="flex space-x-1 mt-1">
                      <Button size="sm" variant="outline" className="h-6 w-6 p-0">
                        <Phone className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline" className="h-6 w-6 p-0">
                        <Mail className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-amber-50 border-amber-200">
          <CardHeader>
            <CardTitle className="text-amber-800">Customer Support Tools</CardTitle>
            <CardDescription>Resources to help your customers succeed</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
              <Users className="mr-2 h-4 w-4" />
              Customer Training Materials
            </Button>
            <Button className="w-full justify-start bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
              <Mail className="mr-2 h-4 w-4" />
              Email Templates
            </Button>
            <Button className="w-full justify-start bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
              <Phone className="mr-2 h-4 w-4" />
              Customer Support Hotline
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DistributorCustomersPage;
