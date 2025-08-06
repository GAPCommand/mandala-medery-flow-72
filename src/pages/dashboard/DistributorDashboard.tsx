
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, ShoppingCart, Users, TrendingUp } from 'lucide-react';
import { useMandalaData } from '@/hooks/useMandalaData';
import LoadingState from '@/components/ui/loading-state';

const DistributorDashboard = () => {
  const { orders, products, inventoryBatches, loading } = useMandalaData();

  if (loading) {
    return <LoadingState message="Loading dashboard..." />;
  }

  const totalOrders = orders?.length || 0;
  const totalProducts = products?.length || 0;
  const totalRevenue = orders?.reduce((sum, order) => sum + (order.total_amount || 0), 0) || 0;

  // Calculate stock levels from inventory batches
  const getProductStockLevel = (productId: string) => {
    const productBatches = inventoryBatches.filter(batch => 
      batch.product_id === productId && batch.status === 'active'
    );
    return productBatches.reduce((sum, batch) => sum + (batch.quantity_available || 0), 0);
  };

  const stats = [
    {
      title: 'Total Orders',
      value: totalOrders,
      icon: ShoppingCart,
      color: 'text-blue-600'
    },
    {
      title: 'Products Available',
      value: totalProducts,
      icon: Package,
      color: 'text-green-600'
    },
    {
      title: 'Total Revenue',
      value: `$${totalRevenue.toFixed(2)}`,
      icon: TrendingUp,
      color: 'text-amber-600'
    },
    {
      title: 'Active Distributors',
      value: '1',
      icon: Users,
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Distributor Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            {orders && orders.length > 0 ? (
              <div className="space-y-2">
                {orders.slice(0, 5).map((order) => (
                  <div key={order.id} className="flex justify-between items-center">
                    <span className="text-sm">{order.order_number}</span>
                    <span className="text-sm font-medium">${order.total_amount?.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No orders yet</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
          </CardHeader>
          <CardContent>
            {products && products.length > 0 ? (
              <div className="space-y-2">
                {products.slice(0, 5).map((product) => (
                  <div key={product.id} className="flex justify-between items-center">
                    <span className="text-sm">{product.name}</span>
                    <span className="text-sm font-medium">${(product.wholesale_price || product.retail_msrp || 0).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No products available</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DistributorDashboard;
