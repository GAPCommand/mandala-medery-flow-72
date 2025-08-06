
import { supabase } from '@/integrations/supabase/client';
import { UniversalOrder } from '@/types/universal-ecommerce';

export const fetchAllOrders = async (userId: string | undefined): Promise<UniversalOrder[]> => {
  console.log('Fetching orders from Universal Integration...');
  
  if (!userId) return [];

  // Fetch from existing order tables with related items and products
  const { data: mandalaOrders, error } = await supabase
    .from('mandala_orders')
    .select(`
      *,
      distributor:mandala_distributors(*),
      mandala_order_items(
        *,
        product:mandala_products(name)
      )
    `)
    .order('order_date', { ascending: false });

  if (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }

  const allOrders: UniversalOrder[] = [];

  // Process Mandala orders
  if (mandalaOrders) {
    const converted = mandalaOrders.map(order => ({
      id: order.id,
      order_number: order.order_number,
      customer_id: order.distributor_id,
      status: order.order_status,
      total_amount: order.total_amount,
      order_date: order.order_date,
      items: (order.mandala_order_items || []).map(item => ({
        product_id: item.product_id,
        product_name: item.product?.name || 'Unknown Product',
        quantity: item.quantity,
        unit_price: item.unit_price,
        line_total: item.line_total
      })),
      source: 'mandala' as const
    }));
    allOrders.push(...converted);
  }

  console.log('Universal orders loaded:', allOrders.length);
  return allOrders;
};
