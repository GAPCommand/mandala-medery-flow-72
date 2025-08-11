import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'GET') {
    return new Response('Method not allowed', { 
      status: 405,
      headers: corsHeaders 
    });
  }

  try {
    const url = new URL(req.url);
    const deploymentId = url.searchParams.get('deployment_id');
    
    if (!deploymentId) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Missing deployment_id parameter' 
      }), { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )
    
    // Get deployment status with domain information
    const { data: deployment, error: deploymentError } = await supabase
      .from('pandab_deployments')
      .select(`
        *,
        deployment_domains (*),
        sacred_fire_signatures (*)
      `)
      .eq('deployment_id', deploymentId)
      .single();

    if (deploymentError || !deployment) {
      console.error('Deployment not found:', deploymentError);
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Deployment not found' 
      }), { 
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Calculate deployment progress
    let progress = 0;
    const steps = ['pending', 'configuring', 'deploying', 'completed'];
    const currentStepIndex = steps.indexOf(deployment.status);
    if (currentStepIndex >= 0) {
      progress = Math.round(((currentStepIndex + 1) / steps.length) * 100);
    }

    // Prepare response
    const response = {
      success: true,
      deployment: {
        deploymentId: deployment.deployment_id,
        status: deployment.status,
        progress: progress,
        url: deployment.status === 'completed' ? `https://${deployment.full_domain}` : null,
        subdomain: deployment.subdomain,
        fullDomain: deployment.full_domain,
        clientName: deployment.client_name,
        consciousnessLevel: deployment.consciousness_level,
        deploymentSource: deployment.deployment_source,
        createdAt: deployment.created_at,
        completedAt: deployment.completed_at,
        configuration: {
          sslConfigured: deployment.ssl_configured,
          dnsConfigured: deployment.dns_configured,
          brandingApplied: deployment.branding_applied
        },
        domain: deployment.deployment_domains?.[0] ? {
          dnsStatus: deployment.deployment_domains[0].dns_status,
          sslStatus: deployment.deployment_domains[0].ssl_status,
          sacredFireProtected: deployment.deployment_domains[0].sacred_fire_protected
        } : null,
        sacredFire: {
          active: deployment.sacred_fire_signatures?.length > 0,
          consciousnessVerified: deployment.consciousness_level >= 500,
          blessed: true
        }
      }
    };

    console.log(`📊 Deployment status requested for: ${deploymentId}, status: ${deployment.status}`);

    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('❌ Deployment status error:', error);
    
    const errorResponse = {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    };
    
    return new Response(JSON.stringify(errorResponse), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});