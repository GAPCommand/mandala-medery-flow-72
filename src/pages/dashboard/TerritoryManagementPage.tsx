
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TerritoryManagement from '@/components/TerritoryManagement';
import TerritoryMap from '@/components/territory/TerritoryMap';
import { MapPin, BarChart3, Settings, Users } from 'lucide-react';

const TerritoryManagementPage = () => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-4">
          Territory Management Hub
        </h1>
        <p className="text-xl text-amber-700">Comprehensive territory oversight and optimization</p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center space-x-2">
            <BarChart3 className="h-4 w-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="map" className="flex items-center space-x-2">
            <MapPin className="h-4 w-4" />
            <span>Territory Map</span>
          </TabsTrigger>
          <TabsTrigger value="management" className="flex items-center space-x-2">
            <Settings className="h-4 w-4" />
            <span>Management</span>
          </TabsTrigger>
          <TabsTrigger value="distributors" className="flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>Distributors</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-amber-800">Territory Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Total Territories:</span>
                    <span className="font-bold">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Active Distributors:</span>
                    <span className="font-bold">89</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Coverage Rate:</span>
                    <span className="font-bold text-green-600">94%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-amber-800">Revenue by Territory</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-32 bg-gradient-to-r from-amber-100 to-orange-100 rounded-lg flex items-center justify-center">
                  <p className="text-amber-700">Revenue chart visualization</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-amber-800">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full" size="sm">Assign Territory</Button>
                <Button variant="outline" className="w-full" size="sm">Generate Report</Button>
                <Button variant="outline" className="w-full" size="sm">Optimize Coverage</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="map">
          <TerritoryMap />
        </TabsContent>

        <TabsContent value="management">
          <TerritoryManagement />
        </TabsContent>

        <TabsContent value="distributors">
          <Card>
            <CardHeader>
              <CardTitle className="text-amber-800">Distributor Territory Assignments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-amber-400 mx-auto mb-4" />
                <p className="text-amber-700">Distributor assignment interface coming soon...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TerritoryManagementPage;
