
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useMandalaData } from '@/hooks/useMandalaData';
import {
  Users,
  UserPlus,
  Shield,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Crown
} from 'lucide-react';

const AdminUsersManagement = () => {
  const { distributors, loading } = useMandalaData();
  const [isAdvancedMode, setIsAdvancedMode] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState('all');

  // Mock user data - in real app this would come from your user management system
  const users = [
    {
      id: 1,
      name: 'Jennifer Chen',
      email: 'j.chen@sacredspirits.com',
      phone: '(415) 555-0123',
      role: 'distributor',
      status: 'active',
      location: 'San Francisco, CA',
      joinDate: '2024-03-15',
      lastLogin: '2024-12-16',
      distributorInfo: {
        company: 'Sacred Spirits Co.',
        territory: 'North Bay',
        revenue: 45000
      }
    },
    {
      id: 2,
      name: 'Michael Rodriguez',
      email: 'm.rodriguez@admin.com',
      phone: '(510) 555-0456',
      role: 'admin',
      status: 'active',
      location: 'Oakland, CA',
      joinDate: '2024-01-10',
      lastLogin: '2024-12-16',
      adminInfo: {
        department: 'Operations',
        clearanceLevel: 'High'
      }
    },
    {
      id: 3,
      name: 'Sarah Thompson',
      email: 's.thompson@staff.com',
      phone: '(650) 555-0789',
      role: 'staff',
      status: 'active',
      location: 'Palo Alto, CA',
      joinDate: '2024-02-20',
      lastLogin: '2024-12-15',
      staffInfo: {
        department: 'Customer Success',
        specialization: 'Distributor Relations'
      }
    },
    {
      id: 4,
      name: 'David Kim',
      email: 'd.kim@divine.com',
      phone: '(408) 555-0321',
      role: 'distributor',
      status: 'pending',
      location: 'San Jose, CA',
      joinDate: '2024-12-10',
      lastLogin: '2024-12-14',
      distributorInfo: {
        company: 'Divine Beverages',
        territory: 'South Bay',
        revenue: 0
      }
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-2 text-blue-600">Loading users...</p>
      </div>
    );
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
      case 'super_admin':
        return <Crown className="h-4 w-4" />;
      case 'staff':
        return <Shield className="h-4 w-4" />;
      case 'distributor':
        return <Users className="h-4 w-4" />;
      default:
        return <Users className="h-4 w-4" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
      case 'super_admin':
        return 'bg-purple-100 text-purple-800';
      case 'staff':
        return 'bg-blue-100 text-blue-800';
      case 'distributor':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredUsers = selectedUserType === 'all' 
    ? users 
    : users.filter(user => user.role === selectedUserType);

  const activeUsers = users.filter(u => u.status === 'active').length;
  const pendingUsers = users.filter(u => u.status === 'pending').length;
  const totalDistributors = users.filter(u => u.role === 'distributor').length;
  const totalAdmins = users.filter(u => u.role === 'admin' || u.role === 'super_admin').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-blue-700">User Management</h1>
          <p className="text-blue-600 mt-1">
            {isAdvancedMode ? 'Advanced user administration and role management' : 'Essential user overview and management'}
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
          <Button className="flex items-center space-x-2">
            <UserPlus className="h-4 w-4" />
            <span>Add User</span>
          </Button>
        </div>
      </div>

      {/* User Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
                <p className="text-2xl font-bold text-green-600">{activeUsers}</p>
                <p className="text-sm text-gray-600">Active Users</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Calendar className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold text-yellow-600">{pendingUsers}</p>
                <p className="text-sm text-gray-600">Pending Approval</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Crown className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold text-purple-600">{totalAdmins}</p>
                <p className="text-sm text-gray-600">Administrators</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  className="pl-10 pr-4 py-2 border rounded-md w-64"
                />
              </div>
              <select
                value={selectedUserType}
                onChange={(e) => setSelectedUserType(e.target.value)}
                className="px-3 py-2 border rounded-md"
              >
                <option value="all">All Roles</option>
                <option value="admin">Administrators</option>
                <option value="staff">Staff</option>
                <option value="distributor">Distributors</option>
              </select>
            </div>
            <Button variant="outline" size="sm" className="flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <span>Advanced Filters</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Users List */}
      <Card>
        <CardHeader>
          <CardTitle>User Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <div key={user.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-lg">{user.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Mail className="h-3 w-3" />
                          <span>{user.email}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Phone className="h-3 w-3" />
                          <span>{user.phone}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3" />
                          <span>{user.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getRoleColor(user.role)}>
                      <div className="flex items-center space-x-1">
                        {getRoleIcon(user.role)}
                        <span>{user.role}</span>
                      </div>
                    </Badge>
                    <Badge className={getStatusColor(user.status)}>
                      {user.status}
                    </Badge>
                  </div>
                </div>

                {/* Role-specific Information */}
                {user.role === 'distributor' && user.distributorInfo && (
                  <div className="p-3 bg-green-50 rounded-lg mb-3">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-green-800">Company:</span>
                        <p className="text-green-700">{user.distributorInfo.company}</p>
                      </div>
                      <div>
                        <span className="font-medium text-green-800">Territory:</span>
                        <p className="text-green-700">{user.distributorInfo.territory}</p>
                      </div>
                      <div>
                        <span className="font-medium text-green-800">Revenue:</span>
                        <p className="text-green-700">${user.distributorInfo.revenue.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                )}

                {(user.role === 'admin' || user.role === 'staff') && (user.adminInfo || user.staffInfo) && (
                  <div className="p-3 bg-blue-50 rounded-lg mb-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-blue-800">Department:</span>
                        <p className="text-blue-700">
                          {user.adminInfo?.department || user.staffInfo?.department}
                        </p>
                      </div>
                      <div>
                        <span className="font-medium text-blue-800">
                          {user.adminInfo ? 'Clearance Level:' : 'Specialization:'}
                        </span>
                        <p className="text-blue-700">
                          {user.adminInfo?.clearanceLevel || user.staffInfo?.specialization}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    Joined: {user.joinDate} • Last login: {user.lastLogin}
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    {isAdvancedMode && (
                      <>
                        <Button variant="outline" size="sm">
                          <Shield className="h-3 w-3 mr-1" />
                          Permissions
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-3 w-3 mr-1" />
                          Deactivate
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* User Activity Overview (Advanced Mode) */}
      {isAdvancedMode && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent User Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    JC
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-green-900">Jennifer Chen logged in</p>
                    <p className="text-sm text-green-700">2 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    MR
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-blue-900">Michael Rodriguez updated permissions</p>
                    <p className="text-sm text-blue-700">15 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    ST
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-purple-900">Sarah Thompson created new content</p>
                    <p className="text-sm text-purple-700">1 hour ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Daily Active Users</p>
                    <p className="text-sm text-gray-600">Last 24 hours</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-blue-600">{activeUsers}</p>
                    <p className="text-xs text-green-500">+12% from yesterday</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">User Growth Rate</p>
                    <p className="text-sm text-gray-600">Monthly growth</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">+8.3%</p>
                    <p className="text-xs text-green-500">Above target</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Session Duration</p>
                    <p className="text-sm text-gray-600">Average time</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-purple-600">23m 45s</p>
                    <p className="text-xs text-green-500">High engagement</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AdminUsersManagement;
