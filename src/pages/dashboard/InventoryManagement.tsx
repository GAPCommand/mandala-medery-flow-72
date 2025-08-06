
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Package, AlertTriangle, TrendingUp } from 'lucide-react';
import { useMandalaData } from '@/hooks/useMandalaData';
import LoadingState from '@/components/ui/loading-state';

const InventoryManagement = () => {
  const { products, inventoryBatches, loading } = useMandalaData();

  if (loading) {
    return <LoadingState message="Loading inventory..." />;
  }

  // Calculate stock levels from inventory batches
  const getProductStockLevel = (productId: string) => {
    const productBatches = inventoryBatches.filter(batch => 
      batch.product_id === productId && batch.status === 'active'
    );
    return productBatches.reduce((sum, batch) => sum + (batch.quantity_available || 0), 0);
  };

  const getStockStatus = (stockLevel: number) => {
    if (stockLevel === 0) return { label: 'Out of Stock', color: 'destructive' as const };
    if (stockLevel < 10) return { label: 'Low Stock', color: 'secondary' as const };
    return { label: 'In Stock', color: 'default' as const };
  };

  const lowStockProducts = products?.filter(product => getProductStockLevel(product.id) < 10) || [];
  const totalInventoryValue = products?.reduce((sum, p) => {
    const stockLevel = getProductStockLevel(p.id);
    const price = p.wholesale_price || p.retail_msrp || 0;
    return sum + (stockLevel * price);
  }, 0) || 0;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
        <Button>
          <Package className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products?.length || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lowStockProducts.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalInventoryValue.toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {products && products.length > 0 ? (
              products.map((product) => {
                const stockLevel = getProductStockLevel(product.id);
                const stockStatus = getStockStatus(stockLevel);
                const price = product.wholesale_price || product.retail_msrp || 0;
                
                return (
                  <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                        <Package className="h-6 w-6 text-gray-500" />
                      </div>
                      <div>
                        <h3 className="font-medium">{product.name}</h3>
                        <p className="text-sm text-gray-500">{product.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="font-medium">${price.toFixed(2)}</p>
                        <p className="text-sm text-gray-500">Stock: {stockLevel}</p>
                      </div>
                      <Badge variant={stockStatus.color}>
                        {stockStatus.label}
                      </Badge>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-center text-gray-500 py-8">No products found</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InventoryManagement;
