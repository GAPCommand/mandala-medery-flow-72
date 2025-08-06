
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useUniversalIntegration } from '@/hooks/useUniversalIntegration';
import { useLoadingState } from '@/hooks/useLoadingState';
import { LoadingSpinner, LoadingCard } from '@/components/ui/loading-spinner';
import { ShoppingCart, Plus, Minus, Package, Sparkles } from 'lucide-react';

interface CartItem {
  productId: string;
  quantity: number;
  price: number;
  name: string;
}

const QuickOrder = () => {
  const { products, profile, createOrder, loading: dataLoading } = useUniversalIntegration();
  const { toast } = useToast();
  const { isLoading: orderLoading, withLoading } = useLoadingState();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const updateQuantity = (productId: string, quantity: number) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(0, quantity)
    }));
  };

  const addToCart = (productId: string) => {
    const product = products.find(p => p.id === productId);
    const quantity = quantities[productId] || 1;
    
    if (!product || quantity <= 0) return;

    setCart(prev => {
      const existingItem = prev.find(item => item.productId === productId);
      if (existingItem) {
        return prev.map(item =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, {
        productId,
        quantity,
        price: product.price,
        name: product.name
      }];
    });

    setQuantities(prev => ({ ...prev, [productId]: 1 }));
    
    toast({
      title: "Added to Cart",
      description: `${quantity} x ${product.name} added to your order`,
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.productId !== productId));
  };

  const updateCartQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prev =>
      prev.map(item =>
        item.productId === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleSubmitOrder = async () => {
    if (!profile || cart.length === 0) {
      toast({
        title: "Cannot Submit Order",
        description: "Please add items to your cart and ensure you're logged in.",
        variant: "destructive",
      });
      return;
    }

    const result = await withLoading(async () => {
      return await createOrder({
        cart,
        userId: profile.gapcommand_user_id,
        distributor: profile,
        totalAmount: cartTotal,
        totalItems: cartItemCount
      });
    });

    if (result) {
      toast({
        title: "Order Submitted Successfully! ✨",
        description: `Order ${result.orderNumber} has been created through Universal Integration.`,
      });
      setCart([]);
      setQuantities({});
    } else {
      toast({
        title: "Order Failed",
        description: "There was an error submitting your order. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (dataLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <LoadingSpinner />
          <h1 className="text-3xl font-bold text-amber-800">Loading Universal Products...</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <LoadingCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-amber-800 flex items-center">
            <Sparkles className="mr-2 h-8 w-8 text-amber-600" />
            Universal Product Catalog
          </h1>
          <p className="text-amber-600 mt-2">
            Integrated products from Universal Platform, PANDAB, and Mandala Mead
          </p>
        </div>
        
        {cart.length > 0 && (
          <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <ShoppingCart className="h-6 w-6 text-amber-600" />
                <div>
                  <p className="font-semibold text-amber-800">
                    {cartItemCount} items • ${cartTotal.toFixed(2)}
                  </p>
                  <Button 
                    onClick={handleSubmitOrder} 
                    disabled={orderLoading}
                    className="mt-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                  >
                    {orderLoading ? (
                      <>
                        <LoadingSpinner size="sm" className="mr-2" />
                        Processing Order...
                      </>
                    ) : (
                      'Submit Order'
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="bg-gradient-to-br from-white to-amber-50 border-amber-200 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-amber-800">{product.name}</CardTitle>
                  <div className="flex flex-wrap gap-1 mt-2">
                    <Badge variant="outline" className="bg-blue-100 text-blue-800 text-xs">
                      {product.source.toUpperCase()}
                    </Badge>
                    {product.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-amber-100 text-amber-800">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="text-right">
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
              <CardDescription className="text-gray-600">
                {product.description}
              </CardDescription>
              
              <div className="flex items-center space-x-2 text-sm text-amber-700">
                <Package className="h-4 w-4" />
                <span>Stock: {product.inventory_count}</span>
                <Sparkles className="h-4 w-4 ml-2" />
                <span>{product.category}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  min="1"
                  value={quantities[product.id] || 1}
                  onChange={(e) => updateQuantity(product.id, parseInt(e.target.value) || 1)}
                  className="w-20 border-amber-200 focus:border-amber-400"
                />
                <Button 
                  onClick={() => addToCart(product.id)}
                  className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                  disabled={product.inventory_count === 0}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {cart.length > 0 && (
        <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
          <CardHeader>
            <CardTitle className="text-amber-800 flex items-center">
              <ShoppingCart className="mr-2 h-6 w-6" />
              Current Order
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {cart.map((item) => (
                <div key={item.productId} className="flex justify-between items-center p-3 bg-white rounded-lg border border-amber-200">
                  <div>
                    <p className="font-semibold text-amber-800">{item.name}</p>
                    <p className="text-sm text-gray-600">${item.price} each</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateCartQuantity(item.productId, item.quantity - 1)}
                      className="border-amber-300 text-amber-600 hover:bg-amber-50"
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="mx-2 font-semibold">{item.quantity}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateCartQuantity(item.productId, item.quantity + 1)}
                      className="border-amber-300 text-amber-600 hover:bg-amber-50"
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                    <p className="ml-4 font-bold text-amber-700">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
              
              <div className="border-t border-amber-200 pt-3 flex justify-between items-center">
                <p className="text-xl font-bold text-amber-800">
                  Total: ${cartTotal.toFixed(2)}
                </p>
                <Button 
                  onClick={handleSubmitOrder} 
                  disabled={orderLoading}
                  size="lg"
                  className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                >
                  {orderLoading ? (
                    <>
                      <LoadingSpinner size="sm" className="mr-2" />
                      Processing Universal Order...
                    </>
                  ) : (
                    'Submit Universal Order ✨'
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default QuickOrder;
