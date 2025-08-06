
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash2, Loader2 } from "lucide-react";

interface CartItem {
  productId: string;
  quantity: number;
  price: number;
}

interface Product {
  id: string;
  name: string;
  wholesale_price: number;
}

interface CartSummaryProps {
  cart: CartItem[];
  products: Product[];
  isProcessingOrder: boolean;
  canSubmitOrder: boolean;
  onRemoveFromCart: (productId: string) => void;
  onProcessOrder: () => void;
}

const CartSummary = ({ 
  cart, 
  products, 
  isProcessingOrder, 
  canSubmitOrder, 
  onRemoveFromCart, 
  onProcessOrder 
}: CartSummaryProps) => {
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-amber-800">Order Summary</h2>
      <Card className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200">
        {cart.length === 0 ? (
          <div className="text-center py-8">
            <ShoppingCart className="h-12 w-12 mx-auto text-gray-400 mb-3" />
            <p className="text-gray-500">Your cart is empty</p>
          </div>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => {
              const product = products.find(p => p.id === item.productId);
              if (!product) return null;

              return (
                <div key={item.productId} className="flex justify-between items-center border-b border-emerald-200 pb-2">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{product.name}</p>
                    <p className="text-xs text-gray-600">{item.quantity} × ${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onRemoveFromCart(item.productId)}
                      className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              );
            })}

            <div className="border-t border-emerald-300 pt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold">Total Items:</span>
                <span className="font-bold">{cartItemCount}</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-bold">Total:</span>
                <span className="text-2xl font-bold text-emerald-700">${cartTotal.toFixed(2)}</span>
              </div>
              
              <Button
                onClick={onProcessOrder}
                disabled={isProcessingOrder || !canSubmitOrder}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
              >
                {isProcessingOrder ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Submit Order
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default CartSummary;
