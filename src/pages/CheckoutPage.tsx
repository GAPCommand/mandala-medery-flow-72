
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Loader2, CreditCard, Truck, MapPin, ShieldCheck, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { processOrder, OrderFormData } from '@/utils/orderProcessing';
import { usePANDABPricing } from '@/components/integrations/PANDABPricingEngine';
import { useGAPCommand } from '@/components/integrations/GAPCommandSSO';
import ConsciousnessPricingDisplay from '@/components/checkout/ConsciousnessPricingDisplay';

const CheckoutPage = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const { profile: gapCommandProfile } = useGAPCommand();
  const { calculateOptimalPrice } = usePANDABPricing();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [consciousnessPricing, setConsciousnessPricing] = useState<{
    [itemId: string]: {
      basePrice: number;
      consciousnessPrice: number;
      discountAmount: number;
    }
  }>({});
  const [formData, setFormData] = useState<OrderFormData>({
    shippingAddress: {
      street: '',
      city: '',
      state: 'CA',
      zipCode: '',
      country: 'US'
    },
    notes: ''
  });

  useEffect(() => {
    calculateConsciousnessPricing();
  }, [cart, gapCommandProfile]);

  const calculateConsciousnessPricing = async () => {
    if (!cart.length || !gapCommandProfile) return;

    const pricingData: typeof consciousnessPricing = {};
    
    for (const item of cart) {
      const consciousnessPrice = await calculateOptimalPrice(
        item.id,
        item.price,
        {
          consciousness_level: gapCommandProfile.consciousness_level || 500,
          user_tier: gapCommandProfile.permissions?.includes('premium') ? 'premium' : 'standard'
        }
      );

      // Calculate consciousness discount for high-level users
      let discountAmount = 0;
      if (gapCommandProfile.consciousness_level && gapCommandProfile.consciousness_level > 700) {
        discountAmount = consciousnessPrice * 0.08; // 8% consciousness discount
      }

      pricingData[item.id] = {
        basePrice: item.price,
        consciousnessPrice,
        discountAmount
      };
    }

    setConsciousnessPricing(pricingData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('shipping.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        shippingAddress: {
          ...prev.shippingAddress,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleProcessOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please sign in to complete your order');
      navigate('/login');
      return;
    }

    if (cart.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    if (!formData.shippingAddress.street || !formData.shippingAddress.city || !formData.shippingAddress.zipCode) {
      toast.error('Please fill in all shipping address fields');
      return;
    }

    setIsProcessing(true);

    try {
      const result = await processOrder(cart, formData, user.email!, user.id);
      
      if (result.success) {
        clearCart();
        toast.success(`Order ${result.orderNumber} created successfully!`);
        navigate('/payment-success', { 
          state: { 
            orderNumber: result.orderNumber, 
            orderId: result.orderId 
          } 
        });
      } else {
        throw new Error(result.error || 'Failed to process order');
      }

    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Failed to process order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const subtotal = cart.reduce((sum, item) => {
    const itemPricing = consciousnessPricing[item.id];
    if (itemPricing) {
      const finalItemPrice = itemPricing.consciousnessPrice - itemPricing.discountAmount;
      return sum + (finalItemPrice * item.quantity);
    }
    return sum + (item.price * item.quantity);
  }, 0);
  
  const taxRate = 0.0875; // 8.75% CA tax
  const taxAmount = subtotal * taxRate;
  const shippingAmount = subtotal > 500 ? 0 : 25; // Free shipping over $500
  const totalAmount = subtotal + taxAmount + shippingAmount;

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto text-center">
          <CardContent className="p-6">
            <Sparkles className="mx-auto h-12 w-12 text-amber-500 mb-4" />
            <h2 className="text-xl font-semibold text-amber-800 mb-4">Cart is Empty</h2>
            <p className="text-amber-600 mb-4">Add some sacred mead to your cart before checking out.</p>
            <Button 
              onClick={() => navigate('/distributor/catalog')}
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
            >
              Browse Sacred Catalog
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-2">
            Sacred Checkout
          </h1>
          <p className="text-amber-700">Complete your order with consciousness and intention</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Form */}
          <div className="space-y-6">
            <Card className="border-amber-200">
              <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50">
                <CardTitle className="flex items-center text-amber-800">
                  <MapPin className="mr-2 h-5 w-5" />
                  Sacred Delivery Address
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                <form onSubmit={handleProcessOrder}>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="shipping.street" className="text-amber-800">Street Address *</Label>
                      <Input
                        id="shipping.street"
                        name="shipping.street"
                        value={formData.shippingAddress.street}
                        onChange={handleInputChange}
                        placeholder="123 Sacred Grove Lane"
                        required
                        className="border-amber-200 focus:border-amber-400 focus:ring-amber-400"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="shipping.city" className="text-amber-800">City *</Label>
                        <Input
                          id="shipping.city"
                          name="shipping.city"
                          value={formData.shippingAddress.city}
                          onChange={handleInputChange}
                          placeholder="Oakland"
                          required
                          className="border-amber-200 focus:border-amber-400 focus:ring-amber-400"
                        />
                      </div>
                      <div>
                        <Label htmlFor="shipping.state" className="text-amber-800">State *</Label>
                        <Input
                          id="shipping.state"
                          name="shipping.state"
                          value={formData.shippingAddress.state}
                          onChange={handleInputChange}
                          placeholder="CA"
                          required
                          className="border-amber-200 focus:border-amber-400 focus:ring-amber-400"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="shipping.zipCode" className="text-amber-800">ZIP Code *</Label>
                      <Input
                        id="shipping.zipCode"
                        name="shipping.zipCode"
                        value={formData.shippingAddress.zipCode}
                        onChange={handleInputChange}
                        placeholder="94612"
                        required
                        className="border-amber-200 focus:border-amber-400 focus:ring-amber-400"
                      />
                    </div>

                    <div>
                      <Label htmlFor="notes" className="text-amber-800">Sacred Instructions</Label>
                      <textarea
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                        placeholder="Special delivery instructions or sacred intentions..."
                        className="w-full p-3 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                        rows={3}
                      />
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Trust Indicators */}
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3 text-green-800">
                  <ShieldCheck className="h-5 w-5" />
                  <span className="font-medium">Secure Order Processing</span>
                </div>
                <p className="text-sm text-green-700 mt-2">
                  Your order information is encrypted and secure. Orders are processed through our sacred commerce system.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card className="border-amber-200">
              <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50">
                <CardTitle className="text-amber-800">Sacred Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                {cart.map((item) => {
                  const itemPricing = consciousnessPricing[item.id];
                  const finalPrice = itemPricing 
                    ? itemPricing.consciousnessPrice - itemPricing.discountAmount
                    : item.price;
                  
                  return (
                    <div key={item.id} className="py-3 border-b border-amber-100 last:border-b-0">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h4 className="font-medium text-amber-800">{item.name}</h4>
                          <p className="text-sm text-amber-600">Sacred Quantity: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-amber-800">${(finalPrice * item.quantity).toFixed(2)}</p>
                          {itemPricing && itemPricing.basePrice !== finalPrice && (
                            <p className="text-xs text-muted-foreground line-through">
                              ${(itemPricing.basePrice * item.quantity).toFixed(2)}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      {itemPricing && gapCommandProfile && (
                        <ConsciousnessPricingDisplay
                          basePrice={itemPricing.basePrice}
                          consciousnessPrice={itemPricing.consciousnessPrice}
                          consciousnessLevel={gapCommandProfile.consciousness_level || 500}
                          sacredMultiplier={1.35}
                          discountAmount={itemPricing.discountAmount}
                        />
                      )}
                    </div>
                  );
                })}
                
                <Separator className="bg-amber-200" />
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sacred Tax (8.75%):</span>
                    <span>${taxAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="flex items-center">
                      <Truck className="mr-1 h-4 w-4" />
                      Conscious Shipping:
                    </span>
                    <span>${shippingAmount.toFixed(2)}</span>
                  </div>
                  {shippingAmount === 0 && (
                    <p className="text-sm text-green-600 text-center">
                      ✨ Free shipping on orders over $500! ✨
                    </p>
                  )}
                  
                  <Separator className="bg-amber-200" />
                  
                  <div className="flex justify-between text-lg font-bold text-amber-800">
                    <span>Total Investment:</span>
                    <span>${totalAmount.toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  onClick={handleProcessOrder}
                  disabled={isProcessing}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transform transition hover:scale-105"
                  size="lg"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Creating Sacred Order...
                    </>
                  ) : (
                    <>
                      <CreditCard className="mr-2 h-5 w-5" />
                      Complete Sacred Purchase
                    </>
                  )}
                </Button>

                <div className="text-center space-y-2">
                  <p className="text-xs text-amber-600">
                    Sacred commerce processing system
                  </p>
                  <p className="text-xs text-amber-700">
                    By placing this order, you join our sacred community of mead distributors.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Sacred Promise */}
            <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-indigo-50">
              <CardContent className="p-6 text-center">
                <Sparkles className="mx-auto h-8 w-8 text-purple-600 mb-3" />
                <h3 className="font-bold text-purple-800 mb-2">Our Sacred Promise</h3>
                <p className="text-sm text-purple-700">
                  Each bottle is crafted with ancient wisdom, blessed with intention, 
                  and delivered with the highest consciousness for your spiritual journey.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
