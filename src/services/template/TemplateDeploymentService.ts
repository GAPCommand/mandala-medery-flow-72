import { MandalaTemplateExport } from '@/components/templates/MandalaTemplate';
import { exactPANDABService } from '@/services/icp/ExactPANDABService';
import { DomainManagementService } from '@/services/DomainManagementService';
import { supabase } from '@/integrations/supabase/client';

interface TemplateDeploymentOptions {
  creatorId?: string;
  baseUrl?: string;
  includeAssets?: boolean;
}

export class TemplateDeploymentService {
  
  static async convertToTemplateData(options: TemplateDeploymentOptions = {}) {
    const template = MandalaTemplateExport;
    const timestamp = new Date().toISOString();
    
    // Convert MandalaTemplateExport to PANDAB TemplateData format
    const templateData = {
      id: 'mandala-sacred-commerce-v1',
      template_name: template.templateInfo.name,
      template_category: template.templateInfo.category,
      
      creator_id: options.creatorId || 'mandala-meadery-dev',
      
      asset_urls: options.includeAssets ? [
        `${options.baseUrl || 'https://mandala-meadery.lovable.app'}/preview.png`,
        `${options.baseUrl || 'https://mandala-meadery.lovable.app'}/demo.json`
      ] : [],
      
      deployment_instructions: JSON.stringify({
        prerequisites: [
          'Supabase project setup',
          'Stripe payment configuration',
          'Domain and SSL certificate',
          'SMTP email service'
        ],
        steps: [
          { step: 1, title: 'Database Setup', duration: '15 min' },
          { step: 2, title: 'Environment Config', duration: '10 min' },
          { step: 3, title: 'Payment Integration', duration: '20 min' },
          { step: 4, title: 'Product Catalog', duration: '30 min' },
          { step: 5, title: 'Branding', duration: '45 min' },
          { step: 6, title: 'Testing & Launch', duration: '60 min' }
        ],
        totalTime: '3 hours',
        metadata: {
          templateInfo: template.templateInfo,
          coreFeatures: template.coreFeatures,
          databaseSchema: template.databaseSchema,
          businessLogic: template.businessLogic,
          customizationOptions: template.customizationOptions,
          differentiators: template.differentiators,
          setupRequirements: template.setupRequirements
        }
      }),
      
      consciousness_requirement: BigInt(template.templateInfo.consciousness_level),
      sacred_fire_enhanced: template.templateInfo.sacred_fire_blessed
    };
    
    return templateData;
  }
  
  static async deployToPANDAB(options: TemplateDeploymentOptions = {}) {
    try {
      console.log('🚀 Converting Mandala Template for PANDAB deployment...');
      
      // Convert to PANDAB format
      const templateData = await this.convertToTemplateData(options);
      
      console.log('📦 Template converted:', {
        id: templateData.id,
        name: templateData.template_name,
        consciousness: Number(templateData.consciousness_requirement)
      });
      
      // Deploy to PANDAB canister
      console.log('🌐 Deploying to PANDAB marketplace...');
      const deploymentId = await exactPANDABService.deployTemplate(templateData);
      
      if (deploymentId) {
        console.log('✅ Template successfully deployed to PANDAB!');
        console.log('📋 Deployment ID:', deploymentId);
        
        // Register webhook URL for deployment notifications
        const webhookUrl = DomainManagementService.getWebhookUrl();
        console.log('🔗 Webhook registered:', webhookUrl);
        
        return {
          success: true,
          deploymentId,
          templateId: templateData.id,
          marketplace: 'PANDAB',
          webhookUrl,
          timestamp: new Date().toISOString()
        };
      } else {
        throw new Error('Deployment failed - no deployment ID returned');
      }
      
    } catch (error: any) {
      console.error('❌ Template deployment failed:', error);
      
      return {
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }

  /**
   * Get deployment status from webhook system
   */
  static async getDeploymentStatus(deploymentId: string) {
    try {
      const status = await DomainManagementService.getDeploymentStatus(deploymentId);
      return {
        success: true,
        status,
        timestamp: new Date().toISOString()
      };
    } catch (error: any) {
      console.error('Failed to get deployment status:', error);
      return {
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }

  /**
   * List all deployments for current user
   */
  static async listDeployments() {
    try {
      const deployments = await DomainManagementService.listDeployments();
      return {
        success: true,
        deployments,
        timestamp: new Date().toISOString()
      };
    } catch (error: any) {
      console.error('Failed to list deployments:', error);
      return {
        success: false,
        error: error.message,
        deployments: [],
        timestamp: new Date().toISOString()
      };
    }
  }
  
  static async validateTemplateData(options: TemplateDeploymentOptions = {}) {
    try {
      const templateData = await this.convertToTemplateData(options);
      
      // Basic validation
      const required = ['id', 'template_name', 'template_category', 'creator_id'];
      const missing = required.filter(field => !templateData[field as keyof typeof templateData]);
      
      if (missing.length > 0) {
        return { valid: false, errors: [`Missing required fields: ${missing.join(', ')}`] };
      }
      
      if (Number(templateData.consciousness_requirement) < 600) {
        return { valid: false, errors: ['Consciousness level must be 600 or higher for Sacred Fire blessing'] };
      }
      
      return { 
        valid: true, 
        templateData,
        summary: {
          id: templateData.id,
          consciousness: Number(templateData.consciousness_requirement),
          blessed: templateData.sacred_fire_enhanced
        }
      };
      
    } catch (error: any) {
      return { valid: false, errors: [error.message] };
    }
  }
}

export const templateDeploymentService = new TemplateDeploymentService();