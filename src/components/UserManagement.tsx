
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Shield, Plus, Eye, EyeOff, Mail, Settings } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import AddEntityModal from '@/components/modals/AddEntityModal';

const UserManagement = () => {
  const [isAdvancedMode, setIsAdvancedMode] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const { userRoles } = useAuth();

  const users = [
    { id: 1, name: 'Sarah Chen', email: 'sarah@mandalamead.com', role: 'admin', status: 'active', lastLogin: '2 hours ago' },
    { id: 2, name: 'Mike Rodriguez', email: 'mike@mandalamead.com', role: 'sales_rep', status: 'active', lastLogin: '1 day ago' },
    { id: 3, name: 'Lisa Thompson', email: 'lisa@mandalamead.com', role: 'distributor', status: 'active', lastLogin: '3 hours ago' },
    { id: 4, name: 'John Doe', email: 'john@mandalamead.com', role: 'distributor', status: 'pending', lastLogin: 'Never' },
  ];

  const isAdmin = userRoles.includes('admin') || userRoles.includes('super_admin');

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'super_admin': return 'bg-red-500';
      case 'admin': return 'bg-blue-500';
      case 'sales_rep': return 'bg-green-500';
      case 'distributor': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Mode Toggle */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-amber-700">User Management</h1>
          <p className="text-amber-600 mt-1">
            {isAdvancedMode ? 'Advanced user controls and permission management' : 'Simple overview of your team members'}
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
          {isAdmin && (
            <Button 
              className="flex items-center space-x-2"
              onClick={() => setShowAddModal(true)}
            >
              <Plus className="h-4 w-4" />
              <span>Invite User</span>
            </Button>
          )}
        </div>
      </div>

      {/* Beginner Mode: Simple User Cards */}
      {!isAdvancedMode && (
        <div className="space-y-6">
          {/* User Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Users className="h-8 w-8 text-blue-600" />
                  <div>
                    <p className="text-2xl font-bold">{users.length}</p>
                    <p className="text-sm text-gray-600">Total Users</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Shield className="h-8 w-8 text-green-600" />
                  <div>
                    <p className="text-2xl font-bold">{users.filter(u => u.status === 'active').length}</p>
                    <p className="text-sm text-gray-600">Active Users</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-8 w-8 text-amber-600" />
                  <div>
                    <p className="text-2xl font-bold">{users.filter(u => u.status === 'pending').length}</p>
                    <p className="text-sm text-gray-600">Pending Invites</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Settings className="h-8 w-8 text-purple-600" />
                  <div>
                    <p className="text-2xl font-bold">{users.filter(u => u.role === 'admin').length}</p>
                    <p className="text-sm text-gray-600">Administrators</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* User Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => (
              <Card key={user.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{user.name}</CardTitle>
                    <Badge 
                      variant={user.status === 'active' ? 'default' : 'secondary'}
                      className={user.status === 'active' ? getRoleColor(user.role) : ''}
                    >
                      {user.role.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-gray-600">{user.email}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span>Last login:</span>
                    <span className="text-gray-600">{user.lastLogin}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                      {user.status}
                    </Badge>
                    {isAdmin && (
                      <Button size="sm" variant="outline">Manage</Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Advanced Mode: Detailed Table */}
      {isAdvancedMode && (
        <div className="space-y-6">
          {/* Enhanced Stats */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{users.length}</p>
                  <p className="text-sm text-gray-600">Total Users</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{users.filter(u => u.status === 'active').length}</p>
                  <p className="text-sm text-gray-600">Active</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-red-600">{users.filter(u => u.role === 'admin').length}</p>
                  <p className="text-sm text-gray-600">Admins</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">{users.filter(u => u.role === 'distributor').length}</p>
                  <p className="text-sm text-gray-600">Distributors</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-amber-600">{users.filter(u => u.status === 'pending').length}</p>
                  <p className="text-sm text-gray-600">Pending</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed User Table */}
          <Card>
            <CardHeader>
              <CardTitle>User Directory</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">User</th>
                      <th className="text-left p-3">Email</th>
                      <th className="text-left p-3">Role</th>
                      <th className="text-left p-3">Status</th>
                      <th className="text-left p-3">Last Login</th>
                      <th className="text-left p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b hover:bg-gray-50">
                        <td className="p-3">
                          <div className="flex items-center space-x-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${getRoleColor(user.role)}`}>
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <span className="font-medium">{user.name}</span>
                          </div>
                        </td>
                        <td className="p-3 text-gray-600">{user.email}</td>
                        <td className="p-3">
                          <Badge className={getRoleColor(user.role)}>
                            {user.role.replace('_', ' ').toUpperCase()}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                            {user.status}
                          </Badge>
                        </td>
                        <td className="p-3 text-gray-600">{user.lastLogin}</td>
                        <td className="p-3">
                          {isAdmin && (
                            <div className="flex space-x-2">
                              <Button variant="ghost" size="sm">Edit</Button>
                              <Button variant="ghost" size="sm" className="text-red-600">Disable</Button>
                            </div>
                          )}
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
      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs font-bold">👥</span>
            </div>
            <div>
              <h4 className="font-medium text-green-800">Team Management Tip</h4>
              <p className="text-green-700 text-sm mt-1">
                {isAdvancedMode 
                  ? "Use role-based permissions to maintain sacred security while empowering your team."
                  : "Start with simple user invites and role assignments. Advanced permissions available when needed."}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <AddEntityModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        entityType="user"
        onSuccess={() => {
          // Refresh data or show success message
          console.log('User invitation sent successfully');
        }}
      />
    </div>
  );
};

export default UserManagement;
