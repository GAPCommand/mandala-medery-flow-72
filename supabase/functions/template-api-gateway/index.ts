import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseKey);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-api-key, x-template-instance',
};

interface APIKeyValidation {
  valid: boolean;
  tenant_id?: string;
  usage_count: number;
  rate_limit: number;
  error?: string;
}

async function validateAPIKey(apiKey: string): Promise<APIKeyValidation> {
  try {
    if (!apiKey || !apiKey.startsWith('mandala_')) {
      return { valid: false, error: 'Invalid API key format', usage_count: 0, rate_limit: 0 };
    }

    // Check API key in database
    const { data: keyData, error } = await supabase
      .from('template_api_keys')
      .select('*')
      .eq('api_key', apiKey)
      .eq('is_active', true)
      .single();

    if (error || !keyData) {
      return { valid: false, error: 'API key not found', usage_count: 0, rate_limit: 0 };
    }

    // Check usage limits
    const { data: usageData } = await supabase
      .from('api_usage_logs')
      .select('count(*)')
      .eq('api_key_id', keyData.id)
      .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());

    const currentUsage = usageData?.[0]?.count || 0;

    if (currentUsage >= keyData.daily_limit) {
      return { 
        valid: false, 
        error: 'Daily usage limit exceeded', 
        usage_count: currentUsage,
        rate_limit: keyData.daily_limit 
      };
    }

    return {
      valid: true,
      tenant_id: keyData.tenant_id,
      usage_count: currentUsage,
      rate_limit: keyData.daily_limit
    };
  } catch (error) {
    console.error('API key validation error:', error);
    return { valid: false, error: 'Validation failed', usage_count: 0, rate_limit: 0 };
  }
}

async function logAPIUsage(apiKey: string, endpoint: string, method: string, success: boolean) {
  try {
    const { data: keyData } = await supabase
      .from('template_api_keys')
      .select('id')
      .eq('api_key', apiKey)
      .single();

    if (keyData) {
      await supabase
        .from('api_usage_logs')
        .insert({
          api_key_id: keyData.id,
          endpoint,
          method,
          success,
          timestamp: new Date().toISOString()
        });
    }
  } catch (error) {
    console.error('Failed to log API usage:', error);
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const path = url.pathname;
    const apiKey = req.headers.get('x-api-key') || '';
    const templateInstance = req.headers.get('x-template-instance') || '';

    // Validate API key for protected endpoints
    if (path.startsWith('/api/')) {
      const validation = await validateAPIKey(apiKey);
      
      if (!validation.valid) {
        await logAPIUsage(apiKey, path, req.method, false);
        return new Response(
          JSON.stringify({ error: validation.error }),
          { 
            status: 401, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }

      // Add usage info to response headers
      const responseHeaders = {
        ...corsHeaders,
        'Content-Type': 'application/json',
        'X-Usage-Count': validation.usage_count.toString(),
        'X-Rate-Limit': validation.rate_limit.toString(),
      };

      // Route to appropriate engine
      if (path.startsWith('/api/products')) {
        const result = await routeToMandalaEngine('MandalaProductEngine', req, validation.tenant_id!);
        await logAPIUsage(apiKey, path, req.method, result.success);
        return new Response(JSON.stringify(result), { headers: responseHeaders });
      }
      
      if (path.startsWith('/api/inventory')) {
        const result = await routeToMandalaEngine('MandalaInventoryEngine', req, validation.tenant_id!);
        await logAPIUsage(apiKey, path, req.method, result.success);
        return new Response(JSON.stringify(result), { headers: responseHeaders });
      }
      
      if (path.startsWith('/api/orders')) {
        const result = await routeToMandalaEngine('MandalaOrderEngine', req, validation.tenant_id!);
        await logAPIUsage(apiKey, path, req.method, result.success);
        return new Response(JSON.stringify(result), { headers: responseHeaders });
      }
    }

    // Health check endpoint (public)
    if (path === '/health') {
      return new Response(
        JSON.stringify({ 
          status: 'healthy', 
          mode: 'master',
          timestamp: new Date().toISOString() 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Endpoint not found' }),
      { 
        status: 404, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Template API Gateway error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});

async function routeToMandalaEngine(engine: string, req: Request, tenantId: string) {
  try {
    const url = new URL(req.url);
    const method = extractMethodFromPath(url.pathname);
    const body = req.method !== 'GET' ? await req.json() : {};

    // Call the mandala-engine-bridge
    const response = await fetch(`${supabaseUrl}/functions/v1/mandala-engine-bridge`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseKey}`,
        'x-gap-source': 'template-api-gateway'
      },
      body: JSON.stringify({
        engine,
        method,
        parameters: body,
        tenant_id: tenantId,
        consciousness_level: 500
      })
    });

    if (!response.ok) {
      throw new Error(`Engine call failed: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error routing to ${engine}:`, error);
    return {
      success: false,
      error: error.message
    };
  }
}

function extractMethodFromPath(path: string): string {
  // Convert REST paths to engine methods
  const pathMethods: Record<string, string> = {
    '/api/products': 'getProducts',
    '/api/products/create': 'createProduct',
    '/api/inventory': 'getBatchLevels',
    '/api/inventory/update': 'updateInventoryLevels',
    '/api/orders': 'getOrders',
    '/api/orders/create': 'createOrder',
    '/api/orders/update': 'updateOrderStatus'
  };

  return pathMethods[path] || 'getAll';
}