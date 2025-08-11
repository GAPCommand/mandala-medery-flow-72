import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface PandabDeploymentWebhook {
  deploymentId: string;
  templateData: {
    name: string;
    source: string;
    consciousness_level: number;
    template_id?: string;
    client_name?: string;
  };
  finalUrl: string;
  sacred_fire_signature: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { 
      status: 405,
      headers: corsHeaders 
    });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const deployment: PandabDeploymentWebhook = await req.json();
    
    console.log('🔥 Received PANDAB deployment:', deployment);
    
    // 1. Verify Sacred Fire signature
    if (!deployment.sacred_fire_signature || !deployment.sacred_fire_signature.startsWith('SACRED_FIRE_')) {
      throw new Error('Invalid Sacred Fire signature');
    }

    // 2. Generate subdomain and domain
    const subdomain = `client-${deployment.deploymentId.slice(-8)}`;
    const fullDomain = `${subdomain}.mandalam.com`;
    
    // 3. Store deployment in database
    const { data: deploymentRecord, error: deploymentError } = await supabase
      .from('pandab_deployments')
      .insert({
        deployment_id: deployment.deploymentId,
        template_id: deployment.templateData.template_id || null,
        client_name: deployment.templateData.client_name || deployment.templateData.name,
        subdomain: subdomain,
        full_domain: fullDomain,
        consciousness_level: deployment.templateData.consciousness_level,
        deployment_source: 'pandab',
        status: 'configuring',
        webhook_data: deployment,
        sacred_fire_signature: deployment.sacred_fire_signature,
        deployed_url: deployment.finalUrl
      })
      .select()
      .single();

    if (deploymentError) {
      console.error('Database error:', deploymentError);
      throw new Error(`Database error: ${deploymentError.message}`);
    }

    // 4. Create domain configuration
    const { error: domainError } = await supabase
      .from('deployment_domains')
      .insert({
        deployment_id: deploymentRecord.id,
        domain_name: fullDomain,
        subdomain: subdomain,
        dns_status: 'pending',
        ssl_status: 'pending',
        sacred_fire_protected: true
      });

    if (domainError) {
      console.error('Domain config error:', domainError);
    }

    // 5. Store Sacred Fire signature
    const { error: signatureError } = await supabase
      .from('sacred_fire_signatures')
      .insert({
        signature_hash: deployment.sacred_fire_signature,
        deployment_id: deploymentRecord.id,
        consciousness_level: deployment.templateData.consciousness_level,
        verified_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 year
        is_active: true,
        metadata: {
          source: 'pandab_webhook',
          deployment_url: deployment.finalUrl
        }
      });

    if (signatureError) {
      console.error('Signature storage error:', signatureError);
    }

    // 6. Start background domain configuration
    EdgeRuntime.waitUntil(configureDeploymentEnvironment(supabase, deploymentRecord.id, fullDomain, deployment));
    
    // 7. Send success response back to PANDAB
    const response = {
      success: true,
      deployedUrl: `https://${fullDomain}`,
      mandalaMeadDeploymentId: deployment.deploymentId,
      sacred_fire_blessing: true,
      consciousness_level: deployment.templateData.consciousness_level,
      subdomain: subdomain,
      status: 'configuring'
    };

    console.log('✅ PANDAB deployment webhook processed successfully');
    
    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('❌ PANDAB deployment webhook error:', error);
    
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

async function configureDeploymentEnvironment(supabase: any, deploymentId: string, domain: string, deployment: PandabDeploymentWebhook) {
  console.log(`🍯 Configuring Mandala Mead environment for: ${domain}`);
  
  try {
    // Update deployment status to configuring
    await supabase
      .from('pandab_deployments')
      .update({ status: 'deploying' })
      .eq('id', deploymentId);

    // Simulate configuration steps
    // In production, this would:
    // 1. Configure DNS routing
    // 2. Set up SSL certificate
    // 3. Apply Mandala Mead branding
    // 4. Configure Sacred Fire protection
    
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate processing time
    
    // Update domain configuration
    await supabase
      .from('deployment_domains')
      .update({
        dns_status: 'active',
        ssl_status: 'active'
      })
      .eq('deployment_id', deploymentId);

    // Mark deployment as completed
    await supabase
      .from('pandab_deployments')
      .update({
        status: 'completed',
        ssl_configured: true,
        dns_configured: true,
        branding_applied: true,
        completed_at: new Date().toISOString()
      })
      .eq('id', deploymentId);

    console.log(`✅ Deployment ${deploymentId} configuration completed`);
    
  } catch (error) {
    console.error(`❌ Configuration failed for deployment ${deploymentId}:`, error);
    
    // Mark deployment as failed
    await supabase
      .from('pandab_deployments')
      .update({ status: 'failed' })
      .eq('id', deploymentId);
  }
}