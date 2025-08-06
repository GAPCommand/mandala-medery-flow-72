
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit } from 'lucide-react';

interface ProductCardProps {
  product: any;
  onEdit: (product: any) => void;
}

const ProductCard = ({ product, onEdit }: ProductCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow border-amber-200">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg text-amber-900">{product.name}</CardTitle>
            <Badge className="mt-1">{product.category}</Badge>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(product)}
          >
            <Edit className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Wholesale:</span>
            <span className="font-semibold">${product.wholesale_price}</span>
          </div>
          <div className="flex justify-between">
            <span>Retail MSRP:</span>
            <span className="text-gray-600">${product.retail_msrp}</span>
          </div>
          <div className="flex justify-between">
            <span>Consciousness:</span>
            <Badge className="bg-purple-100 text-purple-800 text-xs">
              Level {product.consciousness_level}
            </Badge>
          </div>
          <div className="flex justify-between">
            <span>ABV:</span>
            <span>{product.abv_percentage}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
