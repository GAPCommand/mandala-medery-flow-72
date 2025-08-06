
import { supabase } from '@/integrations/supabase/client';
import { CartItem } from '@/contexts/CartContext';

export interface OrderFormData {
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  notes?: string;
}

export interface OrderProcessingResult {
  success: boolean;
  orderNumber?: string;
  orderId?: string;
  error?: string;
}

export const generateOrderNumber = (): string => {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `MM-${timestamp}-${random}`;
};

export const calculateOrderTotals = (cartItems: CartItem[]) => {
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const taxRate = 0.0875; // 8.75% CA tax
  const taxAmount = subtotal * taxRate;
  const shippingAmount = subtotal > 500 ? 0 : 25; // Free shipping over $500
  const totalAmount = subtotal + taxAmount + shippingAmount;

  return {
    subtotal,
    taxAmount,
    shippingAmount,
    totalAmount
  };
};

export const processOrder = async (
  cartItems: CartItem[],
  formData: OrderFormData,
  userEmail: string,
  userId: string
): Promise<OrderProcessingResult> => {
  try {
    if (cartItems.length === 0) {
      return { success: false, error: 'Cart is empty' };
    }

    const { subtotal, taxAmount, shippingAmount, totalAmount } = calculateOrderTotals(cartItems);
    const orderNumber = generateOrderNumber();

    // Check inventory availability before creating order
    for (const item of cartItems) {
      const { data: batches, error } = await supabase
        .from('mandala_inventory_batches')
        .select('quantity_available')
        .eq('product_id', item.id)
        .eq('status', 'active')
        .gt('quantity_available', 0);

      if (error) {
        console.error('Error checking inventory:', error);
        return { success: false, error: `Failed to verify inventory for ${item.name}` };
      }

      const totalAvailable = batches?.reduce((sum, batch) => sum + batch.quantity_available, 0) || 0;
      
      if (totalAvailable < item.quantity) {
        return { 
          success: false, 
          error: `Insufficient inventory for ${item.name}. Available: ${totalAvailable}, Requested: ${item.quantity}` 
        };
      }
    }

    // Create the main order record in mandala_orders
    const orderData = {
      order_number: orderNumber,
      distributor_id: userId,
      total_amount: totalAmount,
      order_status: 'confirmed',
      order_date: new Date().toISOString(),
      estimated_delivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
      destination_address: {
        type: 'shipping',
        ...formData.shippingAddress
      },
      metadata: {
        source: 'distributor_portal',
        subtotal,
        tax_amount: taxAmount,
        shipping_amount: shippingAmount,
        notes: formData.notes || '',
        processed_at: new Date().toISOString()
      }
    };

    const { data: order, error: orderError } = await supabase
      .from('mandala_orders')
      .insert(orderData)
      .select()
      .single();

    if (orderError) {
      console.error('Order creation error:', orderError);
      return { success: false, error: 'Failed to create order' };
    }

    // Create order items
    const orderItems = cartItems.map(item => ({
      order_id: order.id,
      product_id: item.id,
      product_name: item.name,
      quantity: item.quantity,
      unit_price: item.price,
      line_total: item.price * item.quantity
    }));

    const { error: itemsError } = await supabase
      .from('mandala_order_items')
      .insert(orderItems);

    if (itemsError) {
      console.error('Order items creation error:', itemsError);
      // Try to clean up the order if items failed
      await supabase.from('mandala_orders').delete().eq('id', order.id);
      return { success: false, error: 'Failed to create order items' };
    }

    // Update inventory levels using FIFO (First In, First Out)
    for (const item of cartItems) {
      const updateResult = await updateInventoryAfterOrder(item.id, item.quantity);
      if (!updateResult.success) {
        console.warn(`Inventory update warning for ${item.name}: ${updateResult.error}`);
        // Continue processing but log the issue
      }
    }

    return {
      success: true,
      orderNumber,
      orderId: order.id
    };

  } catch (error) {
    console.error('Order processing error:', error);
    return { success: false, error: 'Unexpected error during order processing' };
  }
};

const updateInventoryAfterOrder = async (productId: string, quantityOrdered: number) => {
  try {
    // Get available inventory batches for this product (FIFO - oldest first)
    const { data: batches, error } = await supabase
      .from('mandala_inventory_batches')
      .select('*')
      .eq('product_id', productId)
      .eq('status', 'active')
      .gt('quantity_available', 0)
      .order('production_date', { ascending: true });

    if (error || !batches) {
      console.error('Error fetching inventory batches:', error);
      return { success: false, error: 'Could not fetch inventory batches' };
    }

    let remainingQuantity = quantityOrdered;

    // Allocate inventory from batches using FIFO
    for (const batch of batches) {
      if (remainingQuantity <= 0) break;

      const deductQuantity = Math.min(remainingQuantity, batch.quantity_available);
      const newAvailable = batch.quantity_available - deductQuantity;

      const { error: updateError } = await supabase
        .from('mandala_inventory_batches')
        .update({ 
          quantity_available: newAvailable,
          status: newAvailable === 0 ? 'depleted' : 'active'
        })
        .eq('id', batch.id);

      if (updateError) {
        console.error('Error updating batch inventory:', updateError);
        return { success: false, error: `Failed to update batch ${batch.batch_number}` };
      }

      remainingQuantity -= deductQuantity;
      
      console.log(`Updated batch ${batch.batch_number}: deducted ${deductQuantity}, remaining ${newAvailable}`);
    }

    if (remainingQuantity > 0) {
      return { 
        success: false, 
        error: `Insufficient inventory. Could not allocate ${remainingQuantity} units.` 
      };
    }

    return { success: true };

  } catch (error) {
    console.error('Error updating inventory:', error);
    return { success: false, error: 'Unexpected error updating inventory' };
  }
};
