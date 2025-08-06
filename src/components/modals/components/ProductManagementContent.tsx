
import React from 'react';
import ProductManagementTabs from './ProductManagementTabs';
import ProductsHeader from './ProductsHeader';
import ProductsGrid from './ProductsGrid';
import InventoryBatchManager from '@/components/forms/InventoryBatchManager';

interface ProductManagementContentProps {
  activeTab: 'products' | 'inventory';
  onTabChange: (tab: 'products' | 'inventory') => void;
  filteredProducts: any[];
  products: any[];
  inventoryBatches: any[];
  filterCategory: string;
  onFilterChange: (category: string) => void;
  onAddProduct: () => void;
  onEditProduct: (product: any) => void;
  onBatchUpdated: () => void;
}

const ProductManagementContent = ({
  activeTab,
  onTabChange,
  filteredProducts,
  products,
  inventoryBatches,
  filterCategory,
  onFilterChange,
  onAddProduct,
  onEditProduct,
  onBatchUpdated
}: ProductManagementContentProps) => {
  const getUniqueCategories = () => {
    const categories = products.map(p => p.category).filter(Boolean);
    return ['all', ...Array.from(new Set(categories))];
  };

  return (
    <div className="space-y-6">
      <ProductManagementTabs 
        activeTab={activeTab} 
        onTabChange={onTabChange} 
      />

      {activeTab === 'products' && (
        <div className="space-y-4">
          <ProductsHeader
            filteredProductsCount={filteredProducts.length}
            filterCategory={filterCategory}
            categories={getUniqueCategories()}
            onAddProduct={onAddProduct}
            onFilterChange={onFilterChange}
          />

          <ProductsGrid 
            products={filteredProducts}
            onEditProduct={onEditProduct}
          />
        </div>
      )}

      {activeTab === 'inventory' && (
        <InventoryBatchManager 
          products={products}
          inventoryBatches={inventoryBatches}
          onBatchUpdated={onBatchUpdated}
        />
      )}
    </div>
  );
};

export default ProductManagementContent;
