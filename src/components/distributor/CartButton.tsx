
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

interface CartButtonProps {
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
}

const CartButton: React.FC<CartButtonProps> = ({ 
  className = '', 
  variant = 'outline',
  size = 'default'
}) => {
  const { cartItemCount } = useCart();

  const handleCartClick = () => {
    window.location.href = '/distributor/cart';
  };

  return (
    <Button
      onClick={handleCartClick}
      variant={variant}
      size={size}
      className={`relative ${className}`}
    >
      <ShoppingCart className="h-4 w-4 mr-2" />
      Cart
      {cartItemCount > 0 && (
        <Badge 
          variant="destructive" 
          className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs"
        >
          {cartItemCount > 99 ? '99+' : cartItemCount}
        </Badge>
      )}
    </Button>
  );
};

export default CartButton;
