
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Package, Truck, Calendar, Download, ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';

interface OrderDetails {
  id: string;
  order_number: string;
  total_amount: number;
  order_status: string;
  estimated_delivery: string;
  destination_address: any;
  metadata: any;
  order_items: Array<{
    product_name: string;
    quantity: number;
    unit_price: number;
    line_total: number;
  }>;
}

const PaymentSuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);

  const orderNumber = location.state?.orderNumber;
  const orderId = location.state?.orderId;

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!orderId) {
        setLoading(false);
        return;
      }

      try {
        // Fetch order details
        const { data: order, error: orderError } = await supabase
          .from('mandala_orders')
          .select('*')
          .eq('id', orderId)
          .single();

        if (orderError) {
          console.error('Error fetching order:', orderError);
          setLoading(false);
          return;
        }

        // Fetch order items with product names using a join
        const { data: items, error: itemsError } = await supabase
          .from('mandala_order_items')
          .select(`
            quantity,
            unit_price,
            line_total,
            mandala_products!inner(
              name
            )
          `)
          .eq('order_id', orderId);

        if (itemsError) {
          console.error('Error fetching order items:', itemsError);
        }

        // Transform the joined data to match our interface
        const transformedItems = items?.map(item => ({
          product_name: item.mandala_products.name,
          quantity: item.quantity,
          unit_price: item.unit_price,
          line_total: item.line_total
        })) || [];

        setOrderDetails({
          ...order,
          order_items: transformedItems
        });

      } catch (error) {
        console.error('Error fetching order details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-amber-700">Loading order details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-amber-800 mb-2">Sacred Order Confirmed! ✨</h1>
          <p className="text-lg text-amber-700">
            Your conscious investment in sacred mead has been received
          </p>
          {orderNumber && (
            <div className="mt-4">
              <Badge className="bg-green-100 text-green-800 text-lg px-4 py-2">
                Order #{orderNumber}
              </Badge>
            </div>
          )}
        </div>

        {/* Order Details */}
        {orderDetails && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            
            {/* Order Summary */}
            <Card className="border-amber-200">
              <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50">
                <CardTitle className="flex items-center text-amber-800">
                  <Package className="mr-2 h-5 w-5" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {orderDetails.order_items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-amber-100 last:border-b-0">
                      <div>
                        <p className="font-medium text-amber-800">{item.product_name}</p>
                        <p className="text-sm text-amber-600">Quantity: {item.quantity}</p>
                      </div>
                      <p className="font-bold text-amber-700">${item.line_total.toFixed(2)}</p>
                    </div>
                  ))}
                  
                  <div className="pt-4 border-t border-amber-200">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-amber-800">Total Investment:</span>
                      <span className="text-xl font-bold text-amber-700">${orderDetails.total_amount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Information */}
            <Card className="border-amber-200">
              <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50">
                <CardTitle className="flex items-center text-amber-800">
                  <Truck className="mr-2 h-5 w-5" />
                  Delivery Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <p className="font-medium text-amber-800 mb-2">Shipping Address:</p>
                    <div className="text-amber-700">
                      <p>{orderDetails.destination_address?.street}</p>
                      <p>{orderDetails.destination_address?.city}, {orderDetails.destination_address?.state} {orderDetails.destination_address?.zipCode}</p>
                      <p>{orderDetails.destination_address?.country}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-amber-700">
                    <Calendar className="h-4 w-4" />
                    <span>Estimated Delivery: {new Date(orderDetails.estimated_delivery).toLocaleDateString()}</span>
                  </div>
                  
                  <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                    <p className="text-green-800 font-medium">Status: {orderDetails.order_status}</p>
                    <p className="text-green-700 text-sm mt-1">Your sacred mead is being prepared with conscious intention</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={() => navigate('/distributor')}
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Dashboard
          </Button>
          
          <Button
            onClick={() => navigate('/distributor/catalog')}
            variant="outline"
            className="border-amber-300 text-amber-700 hover:bg-amber-50"
          >
            <Package className="mr-2 h-4 w-4" />
            Continue Shopping
          </Button>
          
          {orderDetails && (
            <Button
              variant="outline"
              className="border-amber-300 text-amber-700 hover:bg-amber-50"
              onClick={() => window.print()}
            >
              <Download className="mr-2 h-4 w-4" />
              Print Order
            </Button>
          )}
        </div>

        {/* Sacred Message */}
        <Card className="mt-8 border-purple-200 bg-gradient-to-br from-purple-50 to-indigo-50">
          <CardContent className="p-6 text-center">
            <h3 className="font-bold text-purple-800 mb-2">Sacred Gratitude 🙏</h3>
            <p className="text-purple-700">
              Thank you for choosing our sacred mead. Your order supports conscious commerce 
              and the elevation of human consciousness through ancient wisdom and modern integrity.
            </p>
            <p className="text-purple-600 text-sm mt-2">
              You will receive email updates as your order progresses through our sacred fulfillment process.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
