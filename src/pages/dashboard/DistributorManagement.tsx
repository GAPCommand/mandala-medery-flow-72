
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useMandalaData } from '@/hooks/useMandalaData';
import {
  Users,
  Plus,
  Search,
  Filter,
  Edit,
  Eye,
  MapPin,
  Phone,
  Mail,
  Building,
  TrendingUp,
  Calendar,
  DollarSign
} from 'lucide-react';

const DistributorManagement = () => {
  const { distributors, orders, loading } = useMandalaData();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-2 text-blue-600">Loading distributors...</p>
      </div>
    );
  }

  const getDistributorRevenue = (distributorId: string) => {
    return orders
      .filter(order => order.distributor_id === distributorId)
      .reduce((sum, order) => sum + (order.total_amount || 0), 0);
  };

  const getDistributorOrderCount = (distributorId: string) => {
    return orders.filter(order => order.distributor_id === distributorId).length;
  };

  const filteredDistributors = distributors.filter(distributor => {
    const matchesSearch = (distributor.company_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (distributor.email || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || distributor.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const activeCount = distributors.filter(d => d.status === 'active').length;
  const pendingCount = distributors.filter(d => d.status === 'pending').length;
  const totalRevenue = distributors.reduce((sum, d) => sum + getDistributorRevenue(d.id), 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-blue-700">Distributor Management</h1>
          <p className="text-blue-600 mt-1">Manage your distribution network</p>
        </div>
        <Button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add Distributor</span>
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
                <p className="text-2xl font-bold text-green-600">{activeCount}</p>
                <p className="text-sm text-gray-600">Active Partners</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Calendar className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
                <p className="text-sm text-gray-600">Pending Approval</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <DollarSign className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">${totalRevenue.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Total Revenue</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-md">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search distributors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="inactive">Inactive</option>
            </select>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Distributors List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredDistributors.map((distributor) => {
          const revenue = getDistributorRevenue(distributor.id);
          const orderCount = getDistributorOrderCount(distributor.id);
          const displayName = distributor.company_name || 'Unknown Company';

          return (
            <Card key={distributor.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                      {displayName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{displayName}</CardTitle>
                      <Badge className={getStatusColor(distributor.status)}>
                        {distributor.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-3 w-3" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-3 w-3 text-gray-400" />
                      <span className="truncate">{distributor.email || 'No email'}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-3 w-3 text-gray-400" />
                      <span>{distributor.contact_name || 'No contact'}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-3 w-3 text-gray-400" />
                      <span className="truncate">{distributor.territory || 'No territory'}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Building className="h-3 w-3 text-gray-400" />
                      <span>{distributor.distributor_tier || 'Standard'}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">${revenue.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">Total Revenue</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">{orderCount}</p>
                      <p className="text-sm text-gray-600">Orders Placed</p>
                    </div>
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      View Orders
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      View Territory
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Performance Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {distributors
              .sort((a, b) => getDistributorRevenue(b.id) - getDistributorRevenue(a.id))
              .slice(0, 5)
              .map((distributor, index) => (
                <div key={distributor.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{distributor.company_name || 'Unknown Company'}</p>
                    <p className="text-sm text-gray-600">{getDistributorOrderCount(distributor.id)} orders</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">${getDistributorRevenue(distributor.id).toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Revenue</p>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DistributorManagement;
