
import React from 'react';
import ProductCard from './ProductCard';

interface ProductsGridProps {
  products: any[];
  onEditProduct: (product: any) => void;
}

const ProductsGrid = ({ products, onEditProduct }: ProductsGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
      {products.map(product => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onEdit={onEditProduct}
        />
      ))}
    </div>
  );
};

export default ProductsGrid;
