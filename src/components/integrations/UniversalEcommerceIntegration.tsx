
import React from 'react';

// Re-export types for backward compatibility
export type {
  UniversalProduct,
  UniversalOrder,
  UniversalOrderItem,
  UniversalEcommerceContextType
} from '@/types/universal-ecommerce';

// Re-export context and hook
export { useUniversalEcommerce } from '@/contexts/UniversalEcommerceContext';

// Re-export provider as both named and default export
export { UniversalEcommerceProvider } from './UniversalEcommerceProvider';
export { UniversalEcommerceProvider as default } from './UniversalEcommerceProvider';
