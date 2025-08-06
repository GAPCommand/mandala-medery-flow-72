
import { DEFAULT_TEMPLATE_CONFIG } from './template/default-config';
import { INDUSTRY_PRESETS } from './template/industry-presets';

export { DEFAULT_TEMPLATE_CONFIG, INDUSTRY_PRESETS };

export interface TemplateConfig {
  brand: {
    name: string;
    tagline: string;
    description: string;
    industry: string;
    domain: string;
    contact: {
      email: string;
      phone: string;
      address?: string;
    };
  };
  content: {
    heroSection: {
      title: string;
      subtitle: string;
      description: string;
      primaryCTA?: string;
      secondaryCTA?: string;
    };
    productTerminology: {
      singular: string;
      plural: string;
      category: string;
    };
    copyTemplates?: any;
    businessTerms?: any;
    qualityMetrics?: any;
  };
  business: {
    pricing: {
      currency: string;
      taxRate: number;
      freeShippingThreshold: number;
    };
    orderFlow: {
      minimumOrderQuantity: number;
    };
  };
  theme?: any;
  features?: any;
}
