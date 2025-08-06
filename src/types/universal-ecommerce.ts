
export interface UniversalProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  retail_price: number;
  category: string;
  tags: string[];
  metadata: any;
  inventory_count: number;
  status: 'active' | 'inactive';
  source: 'pandab' | 'universal' | 'mandala';
}

export interface UniversalOrder {
  id: string;
  order_number: string;
  customer_id: string;
  status: string;
  total_amount: number;
  order_date: string;
  items: UniversalOrderItem[];
  source: 'pandab' | 'universal' | 'mandala';
}

export interface UniversalOrderItem {
  product_id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
  line_total: number;
}

export interface UniversalEcommerceContextType {
  products: UniversalProduct[];
  orders: UniversalOrder[];
  loading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  fetchOrders: () => Promise<void>;
  createOrder: (orderData: any) => Promise<{ orderNumber: string; orderId: string }>;
  refetch: () => Promise<void>;
}
