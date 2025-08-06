
import { useUniversalEcommerce } from '@/components/integrations/UniversalEcommerceIntegration';
import { useGAPCommand } from '@/components/integrations/GAPCommandSSO';

export const useUniversalIntegration = () => {
  const ecommerce = useUniversalEcommerce();
  const gapCommand = useGAPCommand();

  return {
    // E-commerce functionality
    products: ecommerce.products,
    orders: ecommerce.orders,
    createOrder: ecommerce.createOrder,
    
    // GAPCommand functionality
    profile: gapCommand.profile,
    hasPermission: gapCommand.hasPermission,
    
    // Combined state
    loading: ecommerce.loading || gapCommand.loading,
    error: ecommerce.error || gapCommand.error,
    
    // Refresh functionality
    refetch: async () => {
      await Promise.all([
        ecommerce.refetch(),
        gapCommand.syncWithGAPCommand()
      ]);
    }
  };
};
