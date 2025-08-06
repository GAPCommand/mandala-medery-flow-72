
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Filter } from 'lucide-react';

interface ProductsHeaderProps {
  filteredProductsCount: number;
  filterCategory: string;
  categories: string[];
  onAddProduct: () => void;
  onFilterChange: (category: string) => void;
}

const ProductsHeader = ({ 
  filteredProductsCount, 
  filterCategory, 
  categories, 
  onAddProduct, 
  onFilterChange 
}: ProductsHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <Button 
          onClick={onAddProduct}
          className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Sacred New Product
        </Button>
        
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <select
            value={filterCategory}
            onChange={(e) => onFilterChange(e.target.value)}
            className="px-3 py-1 border rounded-md text-sm"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <Badge className="bg-purple-100 text-purple-800">
        {filteredProductsCount} Sacred Products
      </Badge>
    </div>
  );
};

export default ProductsHeader;
