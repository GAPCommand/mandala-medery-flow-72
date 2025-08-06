
import { createContext, useContext } from 'react';
import { UniversalEcommerceContextType } from '@/types/universal-ecommerce';

export const UniversalEcommerceContext = createContext<UniversalEcommerceContextType | undefined>(undefined);

export const useUniversalEcommerce = () => {
  const context = useContext(UniversalEcommerceContext);
  if (!context) {
    throw new Error('useUniversalEcommerce must be used within UniversalEcommerceProvider');
  }
  return context;
};
