
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, Trash2, ShoppingCart, CreditCard } from 'lucide-react';

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
    } else {
      updateQuantity(itemId, newQuantity);
    }
  };

  const proceedToCheckout = () => {
    navigate('/checkout');
  };

  if (cart.length === 0) {
    return (
      <div className="h-full flex flex-col">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-8">
          Sacred Cart
        </h1>
        
        <div className="flex-1 flex items-center justify-center">
          <Card className="text-center py-12 w-full max-w-md">
            <CardContent>
              <ShoppingCart className="mx-auto h-16 w-16 text-amber-400 mb-4" />
              <h3 className="text-xl font-semibold text-amber-800 mb-2">Your cart is empty</h3>
              <p className="text-amber-600 mb-6">Discover our sacred mead collection and start your distribution journey!</p>
              <Button
                onClick={() => navigate('/distributor/catalog')}
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
              >
                Browse Sacred Catalog
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const taxRate = 0.0875; // 8.75% CA tax
  const taxAmount = subtotal * taxRate;
  const shippingAmount = subtotal > 500 ? 0 : 25; // Free shipping over $500
  const totalAmount = subtotal + taxAmount + shippingAmount;

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
          Sacred Cart
        </h1>
        <Button
          variant="outline"
          onClick={clearCart}
          className="border-red-200 text-red-600 hover:bg-red-50"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Clear Cart
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <Card key={item.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg flex items-center justify-center border border-amber-200">
                    <span className="text-2xl">🍯</span>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-amber-800 text-lg">{item.name}</h3>
                    <p className="text-amber-600 text-sm">{item.category}</p>
                    <p className="text-lg font-bold text-amber-700 mt-1">
                      ${item.price.toFixed(2)} each
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      className="h-8 w-8 p-0 border-amber-200 hover:bg-amber-50"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    
                    <span className="w-12 text-center font-medium">{item.quantity}</span>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      className="h-8 w-8 p-0 border-amber-200 hover:bg-amber-50"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-lg text-amber-700">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 mt-1"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle className="text-amber-800">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Items ({cart.reduce((sum, item) => sum + item.quantity, 0)}):</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-sm text-amber-600">
                  <span>Est. Tax (8.75%):</span>
                  <span>${taxAmount.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-sm text-amber-600">
                  <span>Shipping:</span>
                  <span>{shippingAmount === 0 ? 'FREE' : `$${shippingAmount.toFixed(2)}`}</span>
                </div>
                
                {subtotal > 500 && (
                  <p className="text-sm text-green-600">🎉 Free shipping unlocked!</p>
                )}
                
                <Separator />
                
                <div className="flex justify-between text-lg font-bold">
                  <span>Estimated Total:</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
              </div>

              <Button
                onClick={proceedToCheckout}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                size="lg"
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Proceed to Checkout
              </Button>

              <Button
                variant="outline"
                onClick={() => navigate('/distributor/catalog')}
                className="w-full border-amber-200 text-amber-700 hover:bg-amber-50"
              >
                Continue Shopping
              </Button>

              <div className="text-xs text-amber-600 space-y-1">
                <p>• Secure checkout with order confirmation</p>
                <p>• Free shipping on orders over $500</p>
                <p>• Sacred quality guaranteed</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
