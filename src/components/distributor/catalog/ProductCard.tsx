
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Package, Star } from 'lucide-react';
import ProductAddToCart from '../ProductAddToCart';
import { getSourceIcon, getSourceColor } from './sourceUtils';
import { UniversalProduct } from '@/types/universal-ecommerce';

interface ProductCardProps {
  product: UniversalProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Card className="bg-gradient-to-br from-white to-amber-50 border-amber-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-amber-800 text-xl">{product.name}</CardTitle>
            <div className="flex flex-wrap gap-1 mt-2">
              <Badge className={getSourceColor(product.source)}>
                <div className="flex items-center space-x-1">
                  {getSourceIcon(product.source)}
                  <span>{product.source.toUpperCase()}</span>
                </div>
              </Badge>
              {product.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-amber-100 text-amber-800 text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          <div className="text-right ml-4">
            <p className="text-2xl font-bold text-amber-600">
              ${product.price}
            </p>
            <p className="text-sm text-gray-500">
              MSRP: ${product.retail_price}
            </p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <CardDescription className="text-gray-600 leading-relaxed">
          {product.description}
        </CardDescription>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2 text-amber-700">
            <Package className="h-4 w-4" />
            <span>Stock: {product.inventory_count}</span>
          </div>
          <div className="flex items-center space-x-2 text-amber-700">
            <Star className="h-4 w-4" />
            <span>{product.category}</span>
          </div>
          <div className="flex items-center space-x-2 text-amber-700">
            <span className="text-xs">Status: {product.status}</span>
          </div>
        </div>

        {/* Metadata Display */}
        {product.metadata && Object.keys(product.metadata).length > 0 && (
          <div className="bg-gradient-to-r from-amber-100 to-orange-100 p-3 rounded-lg border border-amber-200">
            <p className="text-xs font-semibold text-amber-800 mb-1">Product Details:</p>
            <div className="flex flex-wrap gap-1">
              {Object.entries(product.metadata).slice(0, 3).map(([key, value]) => (
                <span key={key} className="text-xs bg-white px-2 py-1 rounded border border-amber-200 text-amber-700">
                  {key.replace(/_/g, ' ')}: {typeof value === 'boolean' ? (value ? '✓' : '○') : String(value)}
                </span>
              ))}
            </div>
          </div>
        )}
        
        <div className="pt-2">
          <ProductAddToCart 
            product={{
              id: product.id,
              name: product.name,
              wholesale_price: product.price,
              retail_msrp: product.retail_price,
              category: product.category,
              inventory_count: product.inventory_count
            }}
            className="w-full"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
