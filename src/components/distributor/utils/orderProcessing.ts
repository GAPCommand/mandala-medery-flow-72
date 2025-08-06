
import { supabase } from '@/integrations/supabase/client';

interface CartItem {
  productId: string;
  quantity: number;
  price: number;
  name: string;
}

interface UniversalDistributor {
  id: string;
  email: string;
  full_name: string;
  gapcommand_user_id: string;
}

export const processOrder = async (
  cart: CartItem[],
  userId: string,
  distributor: UniversalDistributor,
  totalAmount: number,
  totalItems: number
) => {
  try {
    console.log('Processing order through Universal Integration for user:', userId);
    
    // Generate universal order number
    const orderNumber = `UNI-${Date.now().toString().slice(-6)}-${Math.random().toString(36).substring(2, 5).toUpperCase()}`;
    
    // Create the order record with required fields for mandala_orders
    const orderData = {
      order_number: orderNumber,
      distributor_id: distributor.gapcommand_user_id,
      total_amount: totalAmount,
      order_status: 'pending',
      destination_address: {
        type: 'distributor_default',
        distributor_id: distributor.gapcommand_user_id,
        distributor_email: distributor.email,
        distributor_name: distributor.full_name
      },
      metadata: {
        distributor_info: {
          email: distributor.email,
          name: distributor.full_name,
          type: 'distributor',
          gapcommand_user_id: distributor.gapcommand_user_id
        },
        order_summary: {
          total_items: totalItems,
          placed_through: 'universal_distributor_portal',
          integration_source: 'mandala_mead_distributor',
          processing_system: 'universal_ecommerce'
        },
        cart_items: cart.map(item => ({
          product_id: item.productId,
          product_name: item.name,
          quantity: item.quantity,
          unit_price: item.price,
          line_total: item.price * item.quantity
        }))
      },
      order_date: new Date().toISOString()
    };

    console.log('Creating universal order with data:', orderData);

    const { data: orderRecord, error: orderError } = await supabase
      .from('mandala_orders')
      .insert(orderData)
      .select()
      .single();

    if (orderError) {
      console.error('Universal order creation error:', orderError);
      throw orderError;
    }

    console.log('Universal order created successfully:', orderRecord);

    // Create individual order items
    const orderItems = cart.map(item => ({
      order_id: orderRecord.id,
      product_id: item.productId,
      product_name: item.name,
      quantity: item.quantity,
      unit_price: item.price,
      line_total: item.price * item.quantity
    }));

    const { error: itemsError } = await supabase
      .from('mandala_order_items')
      .insert(orderItems);

    if (itemsError) {
      console.error('Error creating order items:', itemsError);
      // Don't throw here, the main order was created successfully
      console.log('Order created but items may need manual verification');
    }

    return { orderNumber, orderId: orderRecord.id };

  } catch (error) {
    console.error('Error processing universal order:', error);
    throw error;
  }
};
