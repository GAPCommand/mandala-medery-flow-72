import React, { useState } from 'react';
import { useMandalaData } from "@/hooks/useMandalaData";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";
import ProductManagementModal from '@/components/modals/ProductManagementModal';
import { ProductCard } from '@/components/product/ProductCard';
import { ProductCatalogHeader } from '@/components/product/ProductCatalogHeader';

const ProductCatalog = () => {
  const { products, inventoryBatches, loading } = useMandalaData();
  const { userRoles = [] } = useAuth(); // Add default empty array
  const [showManagement, setShowManagement] = useState(false);

  // Check if user can manage products - add safety check
  const canManageProducts = Array.isArray(userRoles) && (
    userRoles.includes('admin') || 
    userRoles.includes('inventory_manager') || 
    userRoles.includes('product_manager') ||
    userRoles.includes('super_admin')
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-amber-600" />
      </div>
    );
  }

  const getLatestBatch = (productId: string) => {
    return inventoryBatches
      .filter(batch => batch.product_id === productId && batch.status === 'active')
      .sort((a, b) => new Date(b.production_date).getTime() - new Date(a.production_date).getTime())[0];
  };

  return (
    <section className="space-y-8">
      <ProductCatalogHeader 
        canManageProducts={canManageProducts}
        onManageProducts={() => setShowManagement(true)}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => {
          const latestBatch = getLatestBatch(product.id);
          
          return (
            <ProductCard
              key={product.id}
              product={product}
              latestBatch={latestBatch}
              onAddToOrder={(productId) => {
                // Handle add to order logic
                console.log('Adding product to order:', productId);
              }}
            />
          );
        })}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products available at this time.</p>
        </div>
      )}

      <ProductManagementModal 
        isOpen={showManagement}
        onClose={() => setShowManagement(false)}
      />
    </section>
  );
};

export default ProductCatalog;
