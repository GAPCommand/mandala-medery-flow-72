import { TemplateConfig } from '@/config/template.config';

interface TemplateEnvironment {
  companyName: string;
  companyTagline: string;
  companyDescription: string;
  companyDomain: string;
  companyEmail: string;
  companyPhone: string;
  logoUrl: string;
  logoWidth: string;
  logoHeight: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  foregroundColor: string;
  currency: string;
  taxRate: number;
  freeShippingThreshold: number;
  minOrderQuantity: number;
  productSingular: string;
  productPlural: string;
  productCategory: string;
  industryPreset?: string;
  tenantId: string;
  templateMode: string;
}

export class TemplateConfigService {
  private static instance: TemplateConfigService;
  private templateVars: TemplateEnvironment;
  private isTemplateMode: boolean;

  private constructor() {
    this.isTemplateMode = import.meta.env.VITE_TEMPLATE_MODE === 'template';
    this.templateVars = this.loadTemplateEnvironment();
    this.injectTemplateVariables();
  }

  public static getInstance(): TemplateConfigService {
    if (!TemplateConfigService.instance) {
      TemplateConfigService.instance = new TemplateConfigService();
    }
    return TemplateConfigService.instance;
  }

  private loadTemplateEnvironment(): TemplateEnvironment {
    return {
      companyName: import.meta.env.VITE_TEMPLATE_COMPANY_NAME || '{{COMPANY_NAME}}',
      companyTagline: import.meta.env.VITE_TEMPLATE_COMPANY_TAGLINE || '{{COMPANY_TAGLINE}}',
      companyDescription: import.meta.env.VITE_TEMPLATE_COMPANY_DESCRIPTION || '{{COMPANY_DESCRIPTION}}',
      companyDomain: import.meta.env.VITE_TEMPLATE_COMPANY_DOMAIN || '{{COMPANY_DOMAIN}}',
      companyEmail: import.meta.env.VITE_TEMPLATE_COMPANY_EMAIL || '{{COMPANY_EMAIL}}',
      companyPhone: import.meta.env.VITE_TEMPLATE_COMPANY_PHONE || '{{COMPANY_PHONE}}',
      logoUrl: import.meta.env.VITE_TEMPLATE_LOGO_URL || '{{LOGO_URL}}',
      logoWidth: import.meta.env.VITE_TEMPLATE_LOGO_WIDTH || '{{LOGO_WIDTH}}',
      logoHeight: import.meta.env.VITE_TEMPLATE_LOGO_HEIGHT || '{{LOGO_HEIGHT}}',
      primaryColor: import.meta.env.VITE_TEMPLATE_PRIMARY_COLOR || '{{PRIMARY_COLOR}}',
      secondaryColor: import.meta.env.VITE_TEMPLATE_SECONDARY_COLOR || '{{SECONDARY_COLOR}}',
      accentColor: import.meta.env.VITE_TEMPLATE_ACCENT_COLOR || '{{ACCENT_COLOR}}',
      backgroundColor: import.meta.env.VITE_TEMPLATE_BACKGROUND_COLOR || '{{BACKGROUND_COLOR}}',
      foregroundColor: import.meta.env.VITE_TEMPLATE_FOREGROUND_COLOR || '{{FOREGROUND_COLOR}}',
      currency: import.meta.env.VITE_TEMPLATE_CURRENCY || '{{CURRENCY}}',
      taxRate: parseFloat(import.meta.env.VITE_TEMPLATE_TAX_RATE || '0') || 0,
      freeShippingThreshold: parseFloat(import.meta.env.VITE_TEMPLATE_FREE_SHIPPING_THRESHOLD || '0') || 0,
      minOrderQuantity: parseInt(import.meta.env.VITE_TEMPLATE_MIN_ORDER_QUANTITY || '1') || 1,
      productSingular: import.meta.env.VITE_TEMPLATE_PRODUCT_SINGULAR || '{{PRODUCT_SINGULAR}}',
      productPlural: import.meta.env.VITE_TEMPLATE_PRODUCT_PLURAL || '{{PRODUCT_PLURAL}}',
      productCategory: import.meta.env.VITE_TEMPLATE_PRODUCT_CATEGORY || '{{PRODUCT_CATEGORY}}',
      industryPreset: import.meta.env.VITE_TEMPLATE_INDUSTRY_PRESET,
      tenantId: import.meta.env.VITE_TEMPLATE_TENANT_ID || 'default-tenant',
      templateMode: import.meta.env.VITE_TEMPLATE_MODE || 'production'
    };
  }

  private injectTemplateVariables(): void {
    if (!this.isTemplateMode) return;

    const root = document.documentElement;
    
    // Inject brand colors
    if (this.templateVars.primaryColor && !this.templateVars.primaryColor.includes('{{')) {
      root.style.setProperty('--template-brand-primary', this.templateVars.primaryColor);
    }
    if (this.templateVars.secondaryColor && !this.templateVars.secondaryColor.includes('{{')) {
      root.style.setProperty('--template-brand-secondary', this.templateVars.secondaryColor);
    }
    if (this.templateVars.accentColor && !this.templateVars.accentColor.includes('{{')) {
      root.style.setProperty('--template-brand-accent', this.templateVars.accentColor);
    }
    if (this.templateVars.backgroundColor && !this.templateVars.backgroundColor.includes('{{')) {
      root.style.setProperty('--template-brand-background', this.templateVars.backgroundColor);
    }
    if (this.templateVars.foregroundColor && !this.templateVars.foregroundColor.includes('{{')) {
      root.style.setProperty('--template-brand-foreground', this.templateVars.foregroundColor);
    }
    
    // Inject logo properties
    if (this.templateVars.logoUrl && !this.templateVars.logoUrl.includes('{{')) {
      root.style.setProperty('--template-logo-url', `url('${this.templateVars.logoUrl}')`);
    }
    if (this.templateVars.logoWidth && !this.templateVars.logoWidth.includes('{{')) {
      root.style.setProperty('--template-logo-width', this.templateVars.logoWidth);
    }
    if (this.templateVars.logoHeight && !this.templateVars.logoHeight.includes('{{')) {
      root.style.setProperty('--template-logo-height', this.templateVars.logoHeight);
    }

    // Mark document as template theme injected
    document.body.classList.add('template-theme-injected');
  }

  public getTemplateVariable(key: keyof TemplateEnvironment): any {
    return this.templateVars[key];
  }

  public isInTemplateMode(): boolean {
    return this.isTemplateMode;
  }

  public getTenantId(): string {
    return this.templateVars.tenantId;
  }

  public processTemplateString(template: string): string {
    let processed = template;
    
    // Replace template variables
    Object.entries(this.templateVars).forEach(([key, value]) => {
      const placeholder = `{{${key.toUpperCase().replace(/([A-Z])/g, '_$1').slice(1)}}}`;
      processed = processed.replace(new RegExp(placeholder, 'g'), String(value));
    });
    
    return processed;
  }

  public generateTemplateConfig(): TemplateConfig {
    return {
      brand: {
        name: this.templateVars.companyName,
        tagline: this.templateVars.companyTagline,
        description: this.templateVars.companyDescription,
        industry: this.templateVars.industryPreset || 'General',
        domain: this.templateVars.companyDomain,
        contact: {
          email: this.templateVars.companyEmail,
          phone: this.templateVars.companyPhone
        }
      },
      content: {
        heroSection: {
          title: `Welcome to ${this.templateVars.companyName}`,
          subtitle: this.templateVars.companyTagline,
          description: this.templateVars.companyDescription
        },
        productTerminology: {
          singular: this.templateVars.productSingular,
          plural: this.templateVars.productPlural,
          category: this.templateVars.productCategory
        }
      },
      business: {
        pricing: {
          currency: this.templateVars.currency,
          taxRate: this.templateVars.taxRate,
          freeShippingThreshold: this.templateVars.freeShippingThreshold
        },
        orderFlow: {
          minimumOrderQuantity: this.templateVars.minOrderQuantity
        }
      }
    };
  }
}