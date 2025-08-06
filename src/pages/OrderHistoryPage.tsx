
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2, Package, Calendar, DollarSign, Truck, Eye } from 'lucide-react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

interface Order {
  id: string;
  customer_email: string;
  total_amount: number;
  created_at: string;
  customer_info: any;
  notes?: string;
  metadata?: any;
}

const OrderHistoryPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('customer_email', user.email)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching orders:', error);
        return;
      }

      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-amber-600" />
          <span className="ml-2 text-amber-700">Loading your orders...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            Order History
          </h1>
          <Button
            onClick={() => navigate('/distributor/catalog')}
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
          >
            <Package className="mr-2 h-4 w-4" />
            Place New Order
          </Button>
        </div>

        {orders.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Package className="mx-auto h-16 w-16 text-amber-400 mb-4" />
              <h3 className="text-xl font-semibold text-amber-800 mb-2">No Orders Yet</h3>
              <p className="text-amber-600 mb-6">Start your sacred mead distribution journey!</p>
              <Button
                onClick={() => navigate('/distributor/catalog')}
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
              >
                Browse Catalog
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg text-amber-800">
                      Order #{order.metadata?.order_number || order.id.slice(0, 8)}
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-blue-100 text-blue-800">
                        <Package className="h-4 w-4 mr-1" />
                        <span className="ml-1 capitalize">Processing</span>
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-amber-600">
                        <Calendar className="mr-2 h-4 w-4" />
                        Order Date
                      </div>
                      <p className="font-medium">
                        {format(new Date(order.created_at), 'MMM dd, yyyy')}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-amber-600">
                        <DollarSign className="mr-2 h-4 w-4" />
                        Total Amount
                      </div>
                      <p className="font-medium text-lg">
                        ${order.total_amount.toFixed(2)}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-amber-600">
                        <Truck className="mr-2 h-4 w-4" />
                        Delivery Address
                      </div>
                      <p className="font-medium text-sm">
                        {order.customer_info?.shippingAddress ? (
                          <>
                            {order.customer_info.shippingAddress.city}, {order.customer_info.shippingAddress.state} {order.customer_info.shippingAddress.zipCode}
                          </>
                        ) : (
                          'Address not available'
                        )}
                      </p>
                    </div>
                  </div>

                  {order.notes && (
                    <div className="mt-4 pt-4 border-t border-amber-100">
                      <p className="text-sm text-amber-600 mb-1">Order Notes:</p>
                      <p className="text-sm">{order.notes}</p>
                    </div>
                  )}

                  <div className="flex justify-end mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/distributor/orders/${order.id}`)}
                      className="border-amber-200 text-amber-700 hover:bg-amber-50"
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistoryPage;
