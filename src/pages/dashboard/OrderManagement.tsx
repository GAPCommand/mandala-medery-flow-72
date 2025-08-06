
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useMandalaData } from '@/hooks/useMandalaData';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import {
  ShoppingCart,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
  DollarSign,
  Calendar
} from 'lucide-react';

const OrderManagement = () => {
  const { orders, distributors, products, loading, refetch } = useMandalaData();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
        <p className="mt-2 text-purple-600">Loading orders...</p>
      </div>
    );
  }

  const getDistributorName = (distributorId: string) => {
    const distributor = distributors.find(d => d.id === distributorId);
    return distributor?.company_name || 'Unknown Distributor';
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    setUpdatingOrderId(orderId);
    try {
      const { error } = await supabase
        .from('mandala_orders')
        .update({ 
          order_status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', orderId);

      if (error) {
        toast.error(`Failed to update order status: ${error.message}`);
        return;
      }

      toast.success(`Order status updated to ${newStatus}`);
      await refetch.orders();
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Failed to update order status');
    } finally {
      setUpdatingOrderId(null);
    }
  };

  const filteredOrders = orders.filter(order => {
    const distributorName = getDistributorName(order.distributor_id || '');
    const matchesSearch = distributorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.order_status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'processing': return <Package className="h-4 w-4" />;
      case 'shipped': return <Truck className="h-4 w-4" />;
      case 'delivered': return <CheckCircle className="h-4 w-4" />;
      case 'cancelled': return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getNextStatus = (currentStatus: string): string | null => {
    switch (currentStatus) {
      case 'pending': return 'processing';
      case 'processing': return 'shipped';
      case 'shipped': return 'delivered';
      default: return null;
    }
  };

  const pendingOrders = orders.filter(o => o.order_status === 'pending').length;
  const processingOrders = orders.filter(o => o.order_status === 'processing').length;
  const shippedOrders = orders.filter(o => o.order_status === 'shipped').length;
  const totalRevenue = orders.reduce((sum, order) => sum + (order.total_amount || 0), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-purple-700">Order Management</h1>
          <p className="text-purple-600 mt-1">Track and manage all orders</p>
        </div>
        <Button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>New Order</span>
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <ShoppingCart className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">{orders.length}</p>
                <p className="text-sm text-gray-600">Total Orders</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Clock className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold text-yellow-600">{pendingOrders}</p>
                <p className="text-sm text-gray-600">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Package className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold text-blue-600">{processingOrders}</p>
                <p className="text-sm text-gray-600">Processing</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <DollarSign className="h-8 w-8 text-green-600" />
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
                placeholder="Search orders..."
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
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Orders List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredOrders.map((order) => {
              const nextStatus = getNextStatus(order.order_status);
              const isUpdating = updatingOrderId === order.id;
              
              return (
                <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                      #{order.order_number?.slice(-4).toUpperCase() || order.id.slice(-4).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium">{getDistributorName(order.distributor_id || '')}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(order.order_date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Package className="h-3 w-3" />
                          <span>Multiple items</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-bold text-green-600">${order.total_amount?.toLocaleString() || '0'}</p>
                      <Badge className={getStatusColor(order.order_status)}>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(order.order_status)}
                          <span>{order.order_status}</span>
                        </div>
                      </Badge>
                    </div>

                    <div className="flex space-x-2">
                      {nextStatus && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => updateOrderStatus(order.id, nextStatus)}
                          disabled={isUpdating}
                        >
                          {isUpdating ? (
                            <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-gray-900" />
                          ) : (
                            `→ ${nextStatus}`
                          )}
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
          <CardContent className="p-6 text-center">
            <Clock className="h-12 w-12 mx-auto text-yellow-600 mb-4" />
            <h3 className="font-bold text-yellow-800 mb-2">Process Pending Orders</h3>
            <p className="text-sm text-yellow-700 mb-4">{pendingOrders} orders waiting for processing</p>
            <Button 
              className="bg-yellow-600 hover:bg-yellow-700"
              onClick={() => {
                const pendingOrderIds = orders.filter(o => o.order_status === 'pending').map(o => o.id);
                Promise.all(pendingOrderIds.map(id => updateOrderStatus(id, 'processing')));
              }}
            >
              Process All Pending
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-6 text-center">
            <Truck className="h-12 w-12 mx-auto text-blue-600 mb-4" />
            <h3 className="font-bold text-blue-800 mb-2">Ship Ready Orders</h3>
            <p className="text-sm text-blue-700 mb-4">{processingOrders} orders ready to ship</p>
            <Button className="bg-blue-600 hover:bg-blue-700">Create Shipments</Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-6 text-center">
            <CheckCircle className="h-12 w-12 mx-auto text-green-600 mb-4" />
            <h3 className="font-bold text-green-800 mb-2">Track Deliveries</h3>
            <p className="text-sm text-green-700 mb-4">{shippedOrders} orders in transit</p>
            <Button className="bg-green-600 hover:bg-green-700">View Tracking</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrderManagement;
