import { TEMPLATE_SYSTEM_CONFIG } from '@/config/template.config';

export interface CleanTemplateConfig {
  templateId: string;
  customerName: string;
  customerEmail: string;
  brandCustomization: {
    name: string;
    tagline: string;
    domain: string;
    primaryColor: string;
    secondaryColor: string;
    logo?: string;
  };
  masterEngineUrl: string;
  apiKey: string;
  enabledFeatures: string[];
}

export interface TemplateGenerationResult {
  success: boolean;
  templateId: string;
  downloadUrl?: string;
  deploymentInstructions?: string;
  error?: string;
}

export class TemplateGenerator {
  async generateCleanTemplate(config: CleanTemplateConfig): Promise<TemplateGenerationResult> {
    try {
      console.log('🔥 Generating clean template for:', config.customerName);

      // 1. Create template package
      const templatePackage = await this.createTemplatePackage(config);
      
      // 2. Generate configuration files
      const configFiles = this.generateConfigFiles(config);
      
      // 3. Create deployment package
      const deploymentPackage = {
        ...templatePackage,
        config: configFiles,
        deploymentInstructions: this.generateDeploymentInstructions(config)
      };

      // 4. Store in Supabase for download
      const downloadUrl = await this.storeTemplatePackage(deploymentPackage, config.templateId);

      return {
        success: true,
        templateId: config.templateId,
        downloadUrl,
        deploymentInstructions: deploymentPackage.deploymentInstructions
      };

    } catch (error: any) {
      console.error('Template generation failed:', error);
      return {
        success: false,
        templateId: config.templateId,
        error: error.message
      };
    }
  }

  private async createTemplatePackage(config: CleanTemplateConfig) {
    return {
      metadata: {
        templateId: config.templateId,
        generatedAt: new Date().toISOString(),
        customerName: config.customerName,
        customerEmail: config.customerEmail,
        version: '1.0.0',
        type: 'clean_template'
      },
      branding: config.brandCustomization,
      architecture: {
        mode: 'TEMPLATE',
        masterEngineUrl: config.masterEngineUrl,
        requiresApiKey: true,
        engines: [
          'MandalaProductEngine',
          'MandalaInventoryEngine', 
          'MandalaOrderEngine',
          'MandalaDistributorEngine',
          'MandalaAnalyticsEngine'
        ]
      },
      files: this.getCleanTemplateFiles(config),
      deployment: {
        platform: 'vercel',
        envVariables: this.generateEnvVariables(config),
        buildCommand: 'npm run build',
        outputDirectory: 'dist'
      }
    };
  }

  private generateConfigFiles(config: CleanTemplateConfig) {
    return {
      'src/config/template.config.ts': this.generateTemplateConfig(config),
      'src/config/brand.config.ts': this.generateBrandConfig(config),
      '.env.example': this.generateEnvExample(config),
      'README.md': this.generateReadme(config)
    };
  }

  private generateTemplateConfig(config: CleanTemplateConfig): string {
    return `import { TemplateSystemConfig } from './types';

export const TEMPLATE_SYSTEM_CONFIG: TemplateSystemConfig = {
  mode: 'TEMPLATE',
  masterEngineUrl: '${config.masterEngineUrl}',
  apiKey: process.env.MANDALA_API_KEY || '',
  tenantId: '${config.templateId}',
  enableEngineRouting: true,
  mockDataEnabled: process.env.NODE_ENV === 'development'
};

export const TEMPLATE_INFO = {
  templateId: '${config.templateId}',
  customerName: '${config.customerName}',
  customerEmail: '${config.customerEmail}',
  generatedAt: '${new Date().toISOString()}'
};`;
  }

  private generateBrandConfig(config: CleanTemplateConfig): string {
    return `export const BRAND_CONFIG = {
  name: '${config.brandCustomization.name}',
  tagline: '${config.brandCustomization.tagline}',
  domain: '${config.brandCustomization.domain}',
  colors: {
    primary: '${config.brandCustomization.primaryColor}',
    secondary: '${config.brandCustomization.secondaryColor}'
  },
  logo: '${config.brandCustomization.logo || ''}'
};`;
  }

  private generateEnvVariables(config: CleanTemplateConfig) {
    return {
      MANDALA_API_KEY: config.apiKey,
      MANDALA_MASTER_URL: config.masterEngineUrl,
      TEMPLATE_ID: config.templateId,
      NEXT_PUBLIC_BRAND_NAME: config.brandCustomization.name,
      NEXT_PUBLIC_BRAND_DOMAIN: config.brandCustomization.domain
    };
  }

  private generateEnvExample(config: CleanTemplateConfig): string {
    return `# Mandala Template Configuration
MANDALA_API_KEY=your_api_key_here
MANDALA_MASTER_URL=${config.masterEngineUrl}
TEMPLATE_ID=${config.templateId}

# Brand Customization
NEXT_PUBLIC_BRAND_NAME="${config.brandCustomization.name}"
NEXT_PUBLIC_BRAND_DOMAIN="${config.brandCustomization.domain}"

# Optional: Enable mock data for development
NODE_ENV=development`;
  }

  private generateReadme(config: CleanTemplateConfig): string {
    return `# ${config.brandCustomization.name} - Mandala Sacred Commerce Template

Generated template for ${config.customerName} (${config.customerEmail})

## Features
- Sacred Commerce UI Components
- Real-time inventory management
- Order processing system
- Distributor portal
- Analytics dashboard

## Setup Instructions

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Configure environment variables:
\`\`\`bash
cp .env.example .env.local
# Edit .env.local with your API key
\`\`\`

3. Start development server:
\`\`\`bash
npm run dev
\`\`\`

## Deployment

This template is configured for Vercel deployment:

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

## Engine Access

This template connects to Mandala Master Engines at: ${config.masterEngineUrl}

Your API key provides access to:
- Product Management Engine
- Inventory Tracking Engine  
- Order Processing Engine
- Analytics Engine

## Support

For technical support, contact: ${config.customerEmail}
Template ID: ${config.templateId}`;
  }

  private getCleanTemplateFiles(config: CleanTemplateConfig) {
    return {
      components: [
        'src/components/ui/*',
        'src/components/layout/*',
        'src/components/distributor/*',
        'src/components/admin/*',
        'src/components/product/*'
      ],
      hooks: [
        'src/hooks/useEngineRouter.ts',
        'src/hooks/useMobile.tsx',
        'src/hooks/useAuth.tsx'
      ],
      utils: [
        'src/lib/utils.ts',
        'src/lib/engineRouter.ts',
        'src/lib/templateEngineClient.ts'
      ],
      styles: [
        'src/index.css',
        'tailwind.config.ts'
      ],
      config: [
        'vite.config.ts',
        'package.json',
        'tsconfig.json'
      ]
    };
  }

  private generateDeploymentInstructions(config: CleanTemplateConfig): string {
    return `# Deployment Instructions for ${config.brandCustomization.name}

## Quick Deploy to Vercel

1. Download and extract the template files
2. Push to your GitHub repository
3. Connect to Vercel and deploy
4. Add environment variables in Vercel dashboard

## Environment Variables Required:

- MANDALA_API_KEY: ${config.apiKey}
- MANDALA_MASTER_URL: ${config.masterEngineUrl}
- TEMPLATE_ID: ${config.templateId}

## Post-Deployment Steps:

1. Test API connectivity
2. Customize branding in admin panel
3. Configure domain settings
4. Set up analytics tracking

Your template will be live at: https://your-domain.vercel.app`;
  }

  private async storeTemplatePackage(deploymentPackage: any, templateId: string): Promise<string> {
    // In a real implementation, this would upload to cloud storage
    // For now, return a mock download URL
    return `https://templates.mandalamead.com/download/${templateId}.zip`;
  }
}

export const templateGenerator = new TemplateGenerator();