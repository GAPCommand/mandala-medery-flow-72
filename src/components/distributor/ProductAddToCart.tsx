
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: string;
  name: string;
  wholesale_price?: number;
  retail_msrp?: number;
  category?: string;
  inventory_count?: number;
}

interface ProductAddToCartProps {
  product: Product;
  quantity?: number;
  onQuantityChange?: (quantity: number) => void;
  className?: string;
}

const ProductAddToCart: React.FC<ProductAddToCartProps> = ({ 
  product, 
  quantity = 1, 
  onQuantityChange,
  className = ''
}) => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [localQuantity, setLocalQuantity] = useState(quantity);

  const productPrice = product.wholesale_price || product.retail_msrp || 0;
  const availableStock = product.inventory_count || 0;

  const handleAddToCart = () => {
    if (availableStock === 0) {
      toast({
        title: "Out of Stock",
        description: `${product.name} is currently out of stock.`,
        variant: "destructive",
      });
      return;
    }

    if (localQuantity > availableStock) {
      toast({
        title: "Insufficient Stock",
        description: `Only ${availableStock} units available for ${product.name}.`,
        variant: "destructive",
      });
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      price: productPrice,
      category: product.category || 'general',
      quantity: localQuantity
    });

    console.log('Added to cart:', {
      product: product.name,
      quantity: localQuantity,
      price: productPrice,
      availableStock
    });
  };

  const handleQuantityChange = (newQuantity: number) => {
    const validQuantity = Math.max(1, Math.min(newQuantity, availableStock));
    setLocalQuantity(validQuantity);
    if (onQuantityChange) {
      onQuantityChange(validQuantity);
    }
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {onQuantityChange && (
        <Input
          type="number"
          min="1"
          max={availableStock}
          value={localQuantity}
          onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
          className="w-20 border-amber-200 focus:border-amber-400"
        />
      )}
      <Button 
        onClick={handleAddToCart}
        disabled={availableStock === 0}
        className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Plus className="mr-2 h-4 w-4" />
        {availableStock === 0 ? 'Out of Stock' : 'Add to Cart'}
      </Button>
    </div>
  );
};

export default ProductAddToCart;
