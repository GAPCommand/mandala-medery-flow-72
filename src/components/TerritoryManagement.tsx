
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Users, TrendingUp, Plus, Settings, Eye, EyeOff } from 'lucide-react';
import { useMandalaData } from '@/hooks/useMandalaData';
import { useAuth } from '@/hooks/useAuth';
import AddEntityModal from '@/components/modals/AddEntityModal';

const TerritoryManagement = () => {
  const [isAdvancedMode, setIsAdvancedMode] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const { distributors } = useMandalaData();
  const { userRoles } = useAuth();

  const territories = [
    { id: 1, name: 'Northern California', distributors: 12, status: 'active', manager: 'Sarah Chen' },
    { id: 2, name: 'Pacific Northwest', distributors: 8, status: 'active', manager: 'Mike Rodriguez' },
    { id: 3, name: 'Southwest Region', distributors: 15, status: 'expanding', manager: 'Lisa Thompson' },
  ];

  const isManager = userRoles.includes('admin') || userRoles.includes('super_admin');

  return (
    <div className="space-y-6">
      {/* Header with Mode Toggle */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-amber-700">Territory Management</h1>
          <p className="text-amber-600 mt-1">
            {isAdvancedMode ? 'Advanced territory controls and analytics' : 'Simple overview of your sacred territories'}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            onClick={() => setIsAdvancedMode(!isAdvancedMode)}
            className="flex items-center space-x-2"
          >
            {isAdvancedMode ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            <span>{isAdvancedMode ? 'Simple View' : 'Advanced View'}</span>
          </Button>
          {isManager && (
            <Button 
              className="flex items-center space-x-2"
              onClick={() => setShowAddModal(true)}
            >
              <Plus className="h-4 w-4" />
              <span>Add Territory</span>
            </Button>
          )}
        </div>
      </div>

      {/* Beginner Mode: Simple Territory Overview */}
      {!isAdvancedMode && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {territories.map((territory) => (
            <Card key={territory.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{territory.name}</CardTitle>
                  <Badge variant={territory.status === 'active' ? 'default' : 'secondary'}>
                    {territory.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-amber-600" />
                  <span className="text-sm">{territory.distributors} Distributors</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Manager: {territory.manager}</span>
                </div>
                <Button size="sm" className="w-full">View Details</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Advanced Mode: Detailed Analytics */}
      {isAdvancedMode && (
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-8 w-8 text-amber-600" />
                  <div>
                    <p className="text-2xl font-bold">{territories.length}</p>
                    <p className="text-sm text-gray-600">Active Territories</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Users className="h-8 w-8 text-blue-600" />
                  <div>
                    <p className="text-2xl font-bold">{distributors.length}</p>
                    <p className="text-sm text-gray-600">Total Distributors</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                  <div>
                    <p className="text-2xl font-bold">94%</p>
                    <p className="text-sm text-gray-600">Coverage Rate</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Settings className="h-8 w-8 text-purple-600" />
                  <div>
                    <p className="text-2xl font-bold">3</p>
                    <p className="text-sm text-gray-600">Pending Assignments</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Territory Table */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Territory Details</CardTitle>
                {isManager && (
                  <Button className="flex items-center space-x-2">
                    <Plus className="h-4 w-4" />
                    <span>Add Territory</span>
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">Territory</th>
                      <th className="text-left p-3">Manager</th>
                      <th className="text-left p-3">Distributors</th>
                      <th className="text-left p-3">Revenue</th>
                      <th className="text-left p-3">Status</th>
                      <th className="text-left p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {territories.map((territory) => (
                      <tr key={territory.id} className="border-b hover:bg-gray-50">
                        <td className="p-3 font-medium">{territory.name}</td>
                        <td className="p-3">{territory.manager}</td>
                        <td className="p-3">{territory.distributors}</td>
                        <td className="p-3">$42,500</td>
                        <td className="p-3">
                          <Badge variant={territory.status === 'active' ? 'default' : 'secondary'}>
                            {territory.status}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <Button variant="ghost" size="sm">Edit</Button>
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
      <Card className="bg-amber-50 border-amber-200">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs font-bold">💡</span>
            </div>
            <div>
              <h4 className="font-medium text-amber-800">Sacred Wisdom</h4>
              <p className="text-amber-700 text-sm mt-1">
                {isAdvancedMode 
                  ? "You're now viewing advanced territory controls. Use these tools to optimize your sacred distribution network."
                  : "Toggle to Advanced View when you're ready to dive deeper into territory management and analytics."}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <AddEntityModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        entityType="territory"
        onSuccess={() => {
          // Refresh data or show success message
          console.log('Territory added successfully');
        }}
      />
    </div>
  );
};

export default TerritoryManagement;
