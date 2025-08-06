
import { supabase } from '@/integrations/supabase/client';

export const createUniversalOrder = async (orderData: any): Promise<{ orderNumber: string; orderId: string }> => {
  console.log('Creating order through Universal Integration...');
  
  // Generate universal order number
  const orderNumber = `UNI-${Date.now().toString().slice(-6)}-${Math.random().toString(36).substring(2, 5).toUpperCase()}`;
  
  // Create through existing mandala orders system with proper schema
  const universalOrderData = {
    order_number: orderNumber,
    distributor_id: orderData.userId,
    total_amount: orderData.totalAmount,
    order_status: 'pending',
    destination_address: {
      type: 'distributor_default',
      distributor_id: orderData.userId,
      distributor_info: orderData.distributor
    },
    metadata: {
      source: 'distributor_portal',
      distributor_info: orderData.distributor,
      placed_through: 'universal_integration',
      cart_items: orderData.cart
    },
    order_date: new Date().toISOString()
  };

  const { data, error } = await supabase
    .from('mandala_orders')
    .insert(universalOrderData)
    .select()
    .single();

  if (error) {
    console.error('Universal order creation error:', error);
    throw error;
  }

  // Create order items if data includes cart
  if (orderData.cart && orderData.cart.length > 0) {
    const orderItems = orderData.cart.map((item: any) => ({
      order_id: data.id,
      product_id: item.productId || item.id,
      quantity: item.quantity,
      unit_price: item.price,
      line_total: item.price * item.quantity
    }));

    const { error: itemsError } = await supabase
      .from('mandala_order_items')
      .insert(orderItems);

    if (itemsError) {
      console.error('Error creating order items:', itemsError);
    }
  }

  console.log('Universal order created successfully:', data);
  
  return { orderNumber, orderId: data.id };
};
