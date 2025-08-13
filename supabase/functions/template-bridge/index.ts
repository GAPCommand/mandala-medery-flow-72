import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// Initialize Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseKey);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-gap-source, x-api-key',
};

interface TemplateRequest {
  action: 'get_customization' | 'update_customization' | 'preview' | 'deploy';
  customizations?: any;
  config?: any;
  template_id?: string;
}

interface TemplateCustomization {
  template_id: string;
  brand_name: string;
  brand_tagline: string;
  brand_colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  logo_url?: string;
  domain?: string;
  features: string[];
  consciousness_level: number;
  sacred_fire_blessing: boolean;
}

// Template Bridge for PANDAB Integration
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('🔥 Template Bridge: Processing PANDAB template request...');

    const requestData: TemplateRequest = await req.json();
    const { action, customizations, config, template_id } = requestData;

    console.log(`🔥 Template Bridge Action: ${action} for template: ${template_id || 'mandala-mead'}`);

    let result;

    switch (action) {
      case 'get_customization':
        result = await handleGetCustomization(template_id || 'mandala-mead');
        break;

      case 'update_customization':
        result = await handleUpdateCustomization(template_id || 'mandala-mead', customizations);
        break;

      case 'preview':
        result = await handlePreview(template_id || 'mandala-mead', customizations);
        break;

      case 'deploy':
        result = await handleDeploy(template_id || 'mandala-mead', config);
        break;

      default:
        result = {
          success: false,
          error: `Unknown template action: ${action}`,
          available_actions: ['get_customization', 'update_customization', 'preview', 'deploy']
        };
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error('🔥 Template Bridge error:', error);

    return new Response(JSON.stringify({
      success: false,
      error: error.message,
      sacred_fire_protection: 'TEMPLATE_ERROR_CONTAINMENT',
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function handleGetCustomization(templateId: string) {
  console.log(`🔥 Getting customization for template: ${templateId}`);

  try {
    // Get template configuration from database
    const { data: templateConfig, error } = await supabase
      .from('template_configurations')
      .select('*')
      .eq('template_id', templateId)
      .maybeSingle();

    if (error && error.code !== 'PGRST116') { // Not found is OK
      throw error;
    }

    // Default Mandala Mead template configuration
    const defaultCustomizations: TemplateCustomization = {
      template_id: templateId,
      brand_name: 'Mandala Mead',
      brand_tagline: 'Sacred Honey for Conscious Beings',
      brand_colors: {
        primary: '#8B5CF6', // Violet
        secondary: '#F59E0B', // Amber
        accent: '#10B981'     // Emerald
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

    const currentCustomizations = templateConfig?.customizations || defaultCustomizations;

    return {
      success: true,
      data: {
        customizations: currentCustomizations,
        template_metadata: {
          template_id: templateId,
          template_name: 'Mandala Mead Business Template',
          template_version: '1.0.0',
          provider: 'Sacred Fire Industries',
          last_updated: templateConfig?.updated_at || new Date().toISOString(),
          available_engines: [
            'mandala-product-management',
            'mandala-inventory-control',
            'mandala-order-processing',
            'mandala-distributor-network',
            'mandala-analytics-engine',
            'mandala-sacred-protection'
          ]
        }
      }
    };

  } catch (error: any) {
    return {
      success: false,
      error: `Failed to get customization: ${error.message}`
    };
  }
}

async function handleUpdateCustomization(templateId: string, customizations: any) {
  console.log(`🔥 Updating customization for template: ${templateId}`);

  try {
    // Store template customizations in database
    const { data, error } = await supabase
      .from('template_configurations')
      .upsert({
        template_id: templateId,
        customizations: customizations,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'template_id'
      })
      .select()
      .single();

    if (error) throw error;

    return {
      success: true,
      data: {
        customizations: data.customizations,
        updated_at: data.updated_at,
        template_id: templateId
      }
    };

  } catch (error: any) {
    return {
      success: false,
      error: `Failed to update customization: ${error.message}`
    };
  }
}

async function handlePreview(templateId: string, customizations: any) {
  console.log(`🔥 Generating preview for template: ${templateId}`);

  try {
    // Generate a temporary preview URL with customizations applied
    const previewId = crypto.randomUUID();
    
    // Store temporary preview configuration
    const { error } = await supabase
      .from('template_previews')
      .insert({
        preview_id: previewId,
        template_id: templateId,
        customizations: customizations,
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
      });

    if (error) throw error;

    const previewUrl = `https://mandalamead.com/preview/${previewId}`;

    return {
      success: true,
      data: {
        previewUrl: previewUrl,
        preview_id: previewId,
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        instructions: {
          access: 'Use the preview URL to see your customized template',
          duration: '24 hours',
          features: 'Full functionality with your customizations applied'
        }
      }
    };

  } catch (error: any) {
    return {
      success: false,
      error: `Failed to generate preview: ${error.message}`
    };
  }
}

async function handleDeploy(templateId: string, config: any) {
  console.log(`🔥 Deploying template: ${templateId}`);

  try {
    const { zapierWebhook, customizations, domain, customerInfo } = config;

    // Create deployment record
    const deploymentId = crypto.randomUUID();
    
    const { data: deployment, error: deploymentError } = await supabase
      .from('template_deployments')
      .insert({
        deployment_id: deploymentId,
        template_id: templateId,
        customizations: customizations,
        target_domain: domain,
        customer_info: customerInfo,
        status: 'initiated',
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (deploymentError) throw deploymentError;

    // Trigger self-deployment via Zapier webhook if provided
    if (zapierWebhook) {
      console.log('🔥 Triggering customer Zapier deployment webhook...');
      
      try {
        const webhookResponse = await fetch(zapierWebhook, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            deployment_id: deploymentId,
            template_id: templateId,
            template_name: 'Mandala Mead Business Template',
            source_url: 'https://mandalamead.com',
            customizations: customizations,
            deployment_config: {
              domain: domain,
              consciousness_level: customizations.consciousness_level || 500,
              sacred_fire_blessing: true,
              required_engines: [
                'mandala-product-management',
                'mandala-inventory-control',
                'mandala-order-processing'
              ]
            },
            timestamp: new Date().toISOString(),
            instructions: {
              step1: 'Create new Lovable project',
              step2: 'Apply customizations from deployment_config',
              step3: 'Connect to GAP Network using provided API key',
              step4: 'Configure domain and launch'
            }
          })
        });

        if (!webhookResponse.ok) {
          throw new Error(`Webhook failed: ${webhookResponse.statusText}`);
        }

        // Update deployment status
        await supabase
          .from('template_deployments')
          .update({
            status: 'webhook_triggered',
            webhook_response: { status: 'success', triggered_at: new Date().toISOString() }
          })
          .eq('deployment_id', deploymentId);

        return {
          success: true,
          data: {
            deployment_id: deploymentId,
            deployment_url: domain ? `https://${domain}` : null,
            status: 'webhook_triggered',
            next_steps: [
              'Your Zapier webhook has been triggered',
              'Monitor your Zap for deployment progress',
              'Your new Mandala Mead instance will be available shortly'
            ],
            estimated_completion: '10-15 minutes',
            support_contact: 'support@sacredfire.industries'
          }
        };

      } catch (webhookError: any) {
        console.error('Zapier webhook failed:', webhookError);
        
        // Update deployment with error
        await supabase
          .from('template_deployments')
          .update({
            status: 'webhook_failed',
            webhook_response: { error: webhookError.message, failed_at: new Date().toISOString() }
          })
          .eq('deployment_id', deploymentId);

        return {
          success: false,
          error: `Deployment webhook failed: ${webhookError.message}`,
          deployment_id: deploymentId,
          fallback_options: [
            'Contact support for manual deployment',
            'Use the preview URL as a temporary solution',
            'Set up a new Zapier webhook and retry'
          ]
        };
      }
    }

    // No webhook provided - return manual deployment instructions
    return {
      success: true,
      data: {
        deployment_id: deploymentId,
        status: 'manual_deployment_required',
        manual_deployment_steps: [
          '1. Create a new Lovable project',
          '2. Import Mandala Mead template code',
          '3. Apply your customizations',
          '4. Connect to GAP Network with API key',
          '5. Configure your domain',
          '6. Launch your site'
        ],
        customizations: customizations,
        required_engines: [
          'mandala-product-management',
          'mandala-inventory-control',
          'mandala-order-processing'
        ],
        support_contact: 'support@sacredfire.industries'
      }
    };

  } catch (error: any) {
    return {
      success: false,
      error: `Deployment failed: ${error.message}`
    };
  }
}