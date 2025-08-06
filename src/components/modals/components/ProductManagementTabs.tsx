
import React from 'react';

interface ProductManagementTabsProps {
  activeTab: 'products' | 'inventory';
  onTabChange: (tab: 'products' | 'inventory') => void;
}

const ProductManagementTabs = ({ activeTab, onTabChange }: ProductManagementTabsProps) => {
  return (
    <div className="flex space-x-1 bg-amber-50 p-1 rounded-lg">
      <button
        onClick={() => onTabChange('products')}
        className={`flex-1 px-4 py-2 rounded-md transition-all ${
          activeTab === 'products' 
            ? 'bg-white shadow-sm text-amber-700 font-medium' 
            : 'text-gray-600 hover:text-amber-700'
        }`}
      >
        Products
      </button>
      <button
        onClick={() => onTabChange('inventory')}
        className={`flex-1 px-4 py-2 rounded-md transition-all ${
          activeTab === 'inventory' 
            ? 'bg-white shadow-sm text-amber-700 font-medium' 
            : 'text-gray-600 hover:text-amber-700'
        }`}
      >
        Inventory Batches
      </button>
    </div>
  );
};

export default ProductManagementTabs;
