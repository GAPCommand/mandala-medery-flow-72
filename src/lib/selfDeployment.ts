interface DeploymentConfig {
  zapierWebhook?: string;
  customizations: any;
  domain?: string;
  customerInfo?: any;
  templateId?: string;
}

interface DeploymentResult {
  success: boolean;
  deploymentUrl?: string;
  deployment_id?: string;
  error?: string;
  status?: string;
  next_steps?: string[];
}

export const triggerSelfDeployment = async (config: DeploymentConfig): Promise<DeploymentResult> => {
  const { zapierWebhook, customizations, domain, customerInfo, templateId = 'mandala-mead' } = config;

  console.log('🔥 Triggering self-deployment for Mandala Mead template');

  try {
    // Call the template bridge for deployment
    const response = await fetch('https://xfwvisutdbfoanhqpafx.supabase.co/functions/v1/template-bridge', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'deploy',
        template_id: templateId,
        config: {
          zapierWebhook,
          customizations,
          domain,
          customerInfo
        }
      })
    });

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || 'Deployment failed');
    }

    // Handle successful deployment
    if (zapierWebhook && result.data.status === 'webhook_triggered') {
      return {
        success: true,
        deploymentUrl: result.data.deployment_url || `https://${domain}`,
        deployment_id: result.data.deployment_id,
        status: 'deploying',
        next_steps: result.data.next_steps || [
          'Your template is being deployed via Zapier',
          'Monitor your Zap for progress updates',
          'Your site will be live within 10-15 minutes'
        ]
      };
    }

    // Handle manual deployment case
    if (result.data.status === 'manual_deployment_required') {
      return {
        success: true,
        deployment_id: result.data.deployment_id,
        status: 'manual_deployment',
        next_steps: result.data.manual_deployment_steps || [
          'Manual deployment steps have been provided',
          'Follow the instructions to complete setup',
          'Contact support if you need assistance'
        ]
      };
    }

    return {
      success: true,
      deployment_id: result.data.deployment_id,
      status: result.data.status,
      next_steps: ['Deployment initiated successfully']
    };

  } catch (error: any) {
    console.error('Self-deployment failed:', error);
    
    // Fallback: Direct Zapier webhook trigger if template bridge fails
    if (zapierWebhook) {
      console.log('🔥 Attempting direct Zapier webhook as fallback...');
      
      try {
        await fetch(zapierWebhook, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          mode: 'no-cors', // Handle CORS for external webhooks
          body: JSON.stringify({
            template_name: 'Mandala Mead',
            template_url: window.location.origin,
            customizations,
            deployment_config: {
              domain,
              timestamp: new Date().toISOString(),
              fallback_deployment: true,
              source: 'mandala_mead_template',
              consciousness_level: customizations.consciousness_level || 500,
              sacred_fire_blessing: true
            },
            instructions: {
              step1: 'Create new Lovable project from Mandala Mead template',
              step2: 'Apply brand customizations provided in deployment_config',
              step3: 'Configure GAP Network connection',
              step4: 'Set up domain and launch'
            },
            customer_info: customerInfo
          })
        });

        return {
          success: true,
          status: 'fallback_webhook_triggered',
          next_steps: [
            'Fallback deployment webhook triggered',
            'Your Zap should receive the deployment request',
            'Template will be deployed with your customizations',
            'Check your Zapier dashboard for progress'
          ]
        };

      } catch (webhookError: any) {
        console.error('Direct webhook fallback failed:', webhookError);
        
        return {
          success: false,
          error: `Deployment failed: ${error.message}. Webhook fallback also failed: ${webhookError.message}`,
          next_steps: [
            'Both primary and fallback deployment methods failed',
            'Please contact support@sacredfire.industries',
            'Provide your customization details for manual setup'
          ]
        };
      }
    }

    return {
      success: false,
      error: `Deployment failed: ${error.message}`,
      next_steps: [
        'Automatic deployment failed',
        'You can manually deploy using the Mandala Mead template',
        'Contact support for assistance: support@sacredfire.industries'
      ]
    };
  }
};

export const generatePreviewUrl = async (customizations: any, templateId: string = 'mandala-mead'): Promise<string> => {
  console.log('🔥 Generating preview URL for customizations');

  try {
    const response = await fetch('https://xfwvisutdbfoanhqpafx.supabase.co/functions/v1/template-bridge', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'preview',
        template_id: templateId,
        customizations
      })
    });

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || 'Preview generation failed');
    }

    return result.data.previewUrl;

  } catch (error: any) {
    console.error('Preview generation failed:', error);
    
    // Fallback: Return current URL with preview parameters
    const previewParams = new URLSearchParams({
      preview: 'true',
      brand_name: customizations.brand_name || 'Preview',
      primary_color: customizations.brand_colors?.primary || '#8B5CF6'
    });

    return `${window.location.origin}?${previewParams.toString()}`;
  }
};

export const getCurrentCustomizations = (): any => {
  // Get current template customizations from local storage or default values
  const stored = localStorage.getItem('mandala_customizations');
  
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (error) {
      console.error('Failed to parse stored customizations:', error);
    }
  }

  // Return default Mandala Mead customizations
  return {
    template_id: 'mandala-mead',
    brand_name: 'Mandala Mead',
    brand_tagline: 'Sacred Honey for Conscious Beings',
    brand_colors: {
      primary: '#8B5CF6',
      secondary: '#F59E0B', 
      accent: '#10B981'
    },
    logo_url: '/placeholder.svg',
    domain: '',
    features: [
      'product-management',
      'inventory-control',
      'order-processing',
      'distributor-network',
      'analytics-engine',
      'sacred-protection'
    ],
    consciousness_level: 500,
    sacred_fire_blessing: true
  };
};

export const updateTemplateCustomizations = async (customizations: any): Promise<void> => {
  console.log('🔥 Updating template customizations');

  try {
    // Store locally
    localStorage.setItem('mandala_customizations', JSON.stringify(customizations));

    // Update via template bridge
    const response = await fetch('https://xfwvisutdbfoanhqpafx.supabase.co/functions/v1/template-bridge', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'update_customization',
        template_id: 'mandala-mead',
        customizations
      })
    });

    const result = await response.json();

    if (!result.success) {
      console.warn('Template bridge update failed:', result.error);
      // Don't throw - local storage update still worked
    }

  } catch (error: any) {
    console.error('Customization update failed:', error);
    // Don't throw - this is not critical for template functionality
  }
};

// Utility function to check deployment status
export const checkDeploymentStatus = async (deploymentId: string): Promise<any> => {
  try {
    const response = await fetch('https://xfwvisutdbfoanhqpafx.supabase.co/functions/v1/template-bridge', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'get_deployment_status',
        deployment_id: deploymentId
      })
    });

    return await response.json();

  } catch (error: any) {
    console.error('Deployment status check failed:', error);
    return {
      success: false,
      error: error.message
    };
  }
};