import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Heart, MessageSquare, Star, TrendingUp, Target } from 'lucide-react';

const RestaurantCustomerExperiencePage = () => {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-600 to-amber-600 rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold">Customer Experience</h1>
        <p className="text-purple-100 mt-2">CRMGAP customer journey optimization tools</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card><CardContent className="p-4 text-center">
          <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
          <h3 className="font-medium">Active Customers</h3>
          <p className="text-2xl font-bold">248</p>
        </CardContent></Card>
        <Card><CardContent className="p-4 text-center">
          <Heart className="h-8 w-8 text-red-600 mx-auto mb-2" />
          <h3 className="font-medium">Satisfaction</h3>
          <p className="text-2xl font-bold">4.8</p>
        </CardContent></Card>
        <Card><CardContent className="p-4 text-center">
          <MessageSquare className="h-8 w-8 text-green-600 mx-auto mb-2" />
          <h3 className="font-medium">Feedback</h3>
          <p className="text-2xl font-bold">156</p>
        </CardContent></Card>
        <Card><CardContent className="p-4 text-center">
          <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
          <h3 className="font-medium">Retention</h3>
          <p className="text-2xl font-bold">78%</p>
        </CardContent></Card>
      </div>

      <Card className="bg-gradient-to-r from-purple-50 to-amber-50 border-purple-200">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3">
            <Target className="h-6 w-6 text-purple-600" />
            <div>
              <h3 className="font-medium text-purple-900">CRMGAP Journey Optimization</h3>
              <p className="text-sm text-purple-700 mt-1">Customer experience tools powered by CRMGAP customer tracking and journey analytics.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RestaurantCustomerExperiencePage;