import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings, User, Bell, Shield, Sparkles } from 'lucide-react';

const RestaurantSettingsPage = () => {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-600 to-amber-600 rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold">Settings & Profile</h1>
        <p className="text-purple-100 mt-2">Enhanced GAPCommand business profile management for restaurants</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card><CardHeader><CardTitle className="flex items-center space-x-2">
          <User className="h-5 w-5" /><span>Restaurant Profile</span>
        </CardTitle></CardHeader><CardContent>
          <p className="text-gray-600 mb-4">Manage your restaurant information and preferences</p>
          <Button>Edit Profile</Button>
        </CardContent></Card>

        <Card><CardHeader><CardTitle className="flex items-center space-x-2">
          <Bell className="h-5 w-5" /><span>Notifications</span>
        </CardTitle></CardHeader><CardContent>
          <p className="text-gray-600 mb-4">Configure notification preferences</p>
          <Button variant="outline">Manage Notifications</Button>
        </CardContent></Card>

        <Card><CardHeader><CardTitle className="flex items-center space-x-2">
          <Shield className="h-5 w-5" /><span>Security</span>
        </CardTitle></CardHeader><CardContent>
          <p className="text-gray-600 mb-4">Account security and access management</p>
          <Button variant="outline">Security Settings</Button>
        </CardContent></Card>

        <Card><CardHeader><CardTitle className="flex items-center space-x-2">
          <Settings className="h-5 w-5" /><span>Integration Settings</span>
        </CardTitle></CardHeader><CardContent>
          <p className="text-gray-600 mb-4">Configure system integrations</p>
          <Button variant="outline">Manage Integrations</Button>
        </CardContent></Card>
      </div>

      <Card className="bg-gradient-to-r from-purple-50 to-amber-50 border-purple-200">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3">
            <Sparkles className="h-6 w-6 text-purple-600" />
            <div>
              <h3 className="font-medium text-purple-900">GAPCommand Profile System</h3>
              <p className="text-sm text-purple-700 mt-1">Enhanced business profile management through the GAPCommand sub-profile system.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RestaurantSettingsPage;