import React, { createContext, useContext, ReactNode, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useGAPCommand } from './GAPCommandSSO';
import { usePANDABPricing } from './PANDABPricingEngine';
import { supabase } from '@/integrations/supabase/client';

interface CheckoutItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  source: 'mandala' | 'pandab' | 'universal';
  metadata?: any;
}

interface PaymentMethod {
  type: 'stripe' | 'crypto' | 'ach' | 'gapcommand_credits';
  provider_id?: string;
  metadata?: any;
}

interface OneStreamCheckoutOptions {
  payment_methods: PaymentMethod[];
  allow_partial_payment: boolean;
  enable_consciousness_pricing: boolean;
  gapcommand_integration: boolean;
  success_redirect_url?: string;
  metadata?: any;
}

interface CheckoutSession {
  id: string;
  items: CheckoutItem[];
  total_amount: number;
  consciousness_discount?: number;
  gapcommand_credits_applied?: number;
  payment_method: PaymentMethod;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  created_at: string;
}

interface OneStreamCheckoutContextType {
  currentSession: CheckoutSession | null;
  loading: boolean;
  error: string | null;
  createCheckoutSession: (items: CheckoutItem[], options: OneStreamCheckoutOptions) => Promise<CheckoutSession>;
  processPayment: (sessionId: string, paymentMethod: PaymentMethod) => Promise<{ success: boolean; redirect_url?: string }>;
  applyConsciousnessDiscount: (sessionId: string) => Promise<void>;
  applyGAPCommandCredits: (sessionId: string, amount: number) => Promise<void>;
}

const OneStreamCheckoutContext = createContext<OneStreamCheckoutContextType | undefined>(undefined);

export const useOneStreamCheckout = () => {
  const context = useContext(OneStreamCheckoutContext);
  if (!context) {
    throw new Error('useOneStreamCheckout must be used within OneStreamCheckoutProvider');
  }
  return context;
};

interface OneStreamCheckoutProviderProps {
  children: ReactNode;
}

export const OneStreamCheckoutProvider: React.FC<OneStreamCheckoutProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const { profile: gapCommandProfile } = useGAPCommand();
  const { calculateOptimalPrice } = usePANDABPricing();
  const [currentSession, setCurrentSession] = useState<CheckoutSession | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createCheckoutSession = async (
    items: CheckoutItem[], 
    options: OneStreamCheckoutOptions
  ): Promise<CheckoutSession> => {
    setLoading(true);
    setError(null);

    try {
      console.log('OneStream: Creating checkout session...');

      // Calculate consciousness-enhanced pricing
      let totalAmount = 0;
      const enhancedItems = await Promise.all(
        items.map(async (item) => {
          let finalPrice = item.price;
          
          if (options.enable_consciousness_pricing) {
            finalPrice = await calculateOptimalPrice(item.id, item.price, {
              consciousness_level: gapCommandProfile?.consciousness_level || 500,
              user_tier: gapCommandProfile?.permissions?.includes('premium') ? 'premium' : 'standard'
            });
          }

          totalAmount += finalPrice * item.quantity;
          return { ...item, price: finalPrice };
        })
      );

      // Apply consciousness discount if applicable
      let consciousnessDiscount = 0;
      if (gapCommandProfile?.consciousness_level && gapCommandProfile.consciousness_level > 700) {
        consciousnessDiscount = totalAmount * 0.08; // 8% consciousness discount
        totalAmount -= consciousnessDiscount;
      }

      // Create session record
      const session: CheckoutSession = {
        id: `ons-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        items: enhancedItems,
        total_amount: totalAmount,
        consciousness_discount: consciousnessDiscount,
        payment_method: options.payment_methods[0], // Default to first available
        status: 'pending',
        created_at: new Date().toISOString()
      };

      // Store session in memory for now (could be persisted to localStorage)
      console.log('OneStream session created:', session.id);

      setCurrentSession(session);
      return session;

    } catch (error) {
      console.error('OneStream checkout error:', error);
      setError('Failed to create checkout session');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const processPayment = async (
    sessionId: string, 
    paymentMethod: PaymentMethod
  ): Promise<{ success: boolean; redirect_url?: string }> => {
    setLoading(true);
    setError(null);

    try {
      console.log('OneStream: Processing payment...');

      // Update session with payment method
      if (currentSession && currentSession.id === sessionId) {
        const updatedSession = {
          ...currentSession,
          payment_method: paymentMethod,
          status: 'processing' as const
        };
        setCurrentSession(updatedSession);
      }

      // Process based on payment method type
      switch (paymentMethod.type) {
        case 'stripe':
          // Call Stripe checkout function
          const stripeResponse = await supabase.functions.invoke('create-checkout', {
            body: {
              cartItems: currentSession?.items,
              paymentMethod: 'stripe',
              sessionId,
              gapcommand_integration: true
            }
          });

          if (stripeResponse.error) {
            throw new Error(stripeResponse.error.message);
          }

          return {
            success: true,
            redirect_url: stripeResponse.data.url
          };

        case 'gapcommand_credits':
          // Process GAPCommand credits payment
          console.log('Processing GAPCommand credits payment...');
          
          // Update session status
          if (currentSession) {
            const updatedSession = {
              ...currentSession,
              status: 'completed' as const
            };
            setCurrentSession(updatedSession);
          }

          return { success: true };

        default:
          throw new Error(`Unsupported payment method: ${paymentMethod.type}`);
      }

    } catch (error) {
      console.error('OneStream payment error:', error);
      setError('Payment processing failed');
      
      // Update session status to failed
      if (currentSession) {
        const updatedSession = {
          ...currentSession,
          status: 'failed' as const
        };
        setCurrentSession(updatedSession);
      }

      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const applyConsciousnessDiscount = async (sessionId: string) => {
    if (!currentSession || !gapCommandProfile) return;

    const consciousnessLevel = gapCommandProfile.consciousness_level;
    if (consciousnessLevel < 600) return;

    const discountPercentage = Math.min((consciousnessLevel - 500) / 1000 * 0.15, 0.15); // Max 15% discount
    const discountAmount = currentSession.total_amount * discountPercentage;

    const updatedSession = {
      ...currentSession,
      consciousness_discount: discountAmount,
      total_amount: currentSession.total_amount - discountAmount
    };

    setCurrentSession(updatedSession);
  };

  const applyGAPCommandCredits = async (sessionId: string, amount: number) => {
    if (!currentSession) return;

    const creditsApplied = Math.min(amount, currentSession.total_amount);
    
    const updatedSession = {
      ...currentSession,
      gapcommand_credits_applied: creditsApplied,
      total_amount: currentSession.total_amount - creditsApplied
    };

    setCurrentSession(updatedSession);
  };

  const value: OneStreamCheckoutContextType = {
    currentSession,
    loading,
    error,
    createCheckoutSession,
    processPayment,
    applyConsciousnessDiscount,
    applyGAPCommandCredits
  };

  return (
    <OneStreamCheckoutContext.Provider value={value}>
      {children}
    </OneStreamCheckoutContext.Provider>
  );
};

export default OneStreamCheckoutProvider;