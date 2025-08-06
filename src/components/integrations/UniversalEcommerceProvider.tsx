
import React, { ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { UniversalEcommerceContext } from '@/contexts/UniversalEcommerceContext';
import { UniversalEcommerceContextType, UniversalProduct, UniversalOrder } from '@/types/universal-ecommerce';
import { fetchAllProducts } from '@/utils/universal-ecommerce/product-fetcher';
import { fetchAllOrders } from '@/utils/universal-ecommerce/order-fetcher';
import { createUniversalOrder } from '@/utils/universal-ecommerce/order-creator';

interface UniversalEcommerceProviderProps {
  children: ReactNode;
}

export const UniversalEcommerceProvider: React.FC<UniversalEcommerceProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const [products, setProducts] = React.useState<UniversalProduct[]>([]);
  const [orders, setOrders] = React.useState<UniversalOrder[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      const allProducts = await fetchAllProducts();
      setProducts(allProducts);
    } catch (error) {
      console.error('Error fetching universal products:', error);
      setError('Failed to load products');
    }
  };

  const fetchOrders = async () => {
    try {
      const allOrders = await fetchAllOrders(user?.id);
      setOrders(allOrders);
    } catch (error) {
      console.error('Error fetching universal orders:', error);
      setError('Failed to load orders');
    }
  };

  const createOrder = async (orderData: any): Promise<{ orderNumber: string; orderId: string }> => {
    try {
      const result = await createUniversalOrder(orderData);
      
      // Refresh orders
      await fetchOrders();
      
      return result;
    } catch (error) {
      console.error('Error creating universal order:', error);
      throw error;
    }
  };

  const refetch = async () => {
    setLoading(true);
    setError(null);
    try {
      await Promise.all([fetchProducts(), fetchOrders()]);
    } catch (error) {
      console.error('Error refetching data:', error);
      setError('Failed to refresh data');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    refetch();
  }, [user]);

  const value: UniversalEcommerceContextType = {
    products,
    orders,
    loading,
    error,
    fetchProducts,
    fetchOrders,
    createOrder,
    refetch
  };

  return (
    <UniversalEcommerceContext.Provider value={value}>
      {children}
    </UniversalEcommerceContext.Provider>
  );
};
