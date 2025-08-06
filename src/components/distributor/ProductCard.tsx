
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package, Sparkles, Plus, Minus } from "lucide-react";

interface CartItem {
  productId: string;
  quantity: number;
  price: number;
}

interface Product {
  id: string;
  name: string;
  wholesale_price: number;
  abv_percentage: number;
  consciousness_level: number;
}

interface InventoryBatch {
  product_id: string;
  quantity_available: number;
  status: string;
  production_date: string;
}

interface ProductCardProps {
  product: Product;
  latestBatch: InventoryBatch | undefined;
  cartItem: CartItem | undefined;
  onAddToCart: (productId: string, quantity: number) => void;
  onUpdateQuantity: (productId: string, newQuantity: number) => void;
}

const ProductCard = ({ 
  product, 
  latestBatch, 
  cartItem, 
  onAddToCart, 
  onUpdateQuantity 
}: ProductCardProps) => {
  return (
    <Card className="p-4 hover:shadow-lg transition-all bg-gradient-to-br from-white to-amber-50 border-amber-200">
      <div className="flex items-center space-x-4 mb-3">
        <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg flex items-center justify-center">
          <Package className="h-8 w-8 text-amber-600" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-amber-900">{product.name}</h3>
          <div className="flex items-center space-x-2">
            <Badge className="bg-amber-100 text-amber-800 text-xs">
              {product.abv_percentage}% ABV
            </Badge>
            {product.consciousness_level >= 9 && (
              <Badge className="bg-purple-100 text-purple-800 text-xs">
                <Sparkles className="h-3 w-3 mr-1" />
                Level {product.consciousness_level}
              </Badge>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span>Base Price:</span>
          <span className="font-bold text-green-700">${product.wholesale_price}</span>
        </div>
        
        {latestBatch && (
          <div className="text-xs text-gray-600">
            Available: {latestBatch.quantity_available} bottles
          </div>
        )}

        <div className="flex space-x-2">
          <Button
            onClick={() => onAddToCart(product.id, 6)}
            size="sm"
            className="flex-1 bg-amber-500 hover:bg-amber-600"
            disabled={!latestBatch || latestBatch.quantity_available < 6}
          >
            +6
          </Button>
          <Button
            onClick={() => onAddToCart(product.id, 12)}
            size="sm"
            className="flex-1 bg-amber-600 hover:bg-amber-700"
            disabled={!latestBatch || latestBatch.quantity_available < 12}
          >
            +12
          </Button>
          <Button
            onClick={() => onAddToCart(product.id, 24)}
            size="sm"
            className="flex-1 bg-orange-600 hover:bg-orange-700"
            disabled={!latestBatch || latestBatch.quantity_available < 24}
          >
            +24
          </Button>
        </div>

        {cartItem && (
          <div className="bg-emerald-50 p-2 rounded border border-emerald-200">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">In Cart: {cartItem.quantity}</span>
              <div className="flex items-center space-x-1">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onUpdateQuantity(product.id, cartItem.quantity - 1)}
                  className="h-6 w-6 p-0"
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="text-sm w-8 text-center">{cartItem.quantity}</span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onUpdateQuantity(product.id, cartItem.quantity + 1)}
                  className="h-6 w-6 p-0"
                  disabled={latestBatch && cartItem.quantity >= latestBatch.quantity_available}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ProductCard;
