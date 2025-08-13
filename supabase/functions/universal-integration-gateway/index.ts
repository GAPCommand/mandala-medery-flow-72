import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// ICP Canister Integration
import { Actor, HttpAgent } from 'https://esm.sh/@dfinity/agent@3.1.0';
import { IDL } from 'https://esm.sh/@dfinity/candid@3.1.0';

// Initialize Supabase client for authentication and usage tracking
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseKey);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-gap-source, x-api-key',
};

interface BridgeRequest {
  action: string;
  sourceApp: string;
  targetApp?: string;
  data?: any;
  options?: any;
}

interface CanisterCommand {
  canister: 'gapcommand' | 'pandab';
  method: string;
  parameters: any;
}

interface WidgetRequest {
  widget: string;
  config: any;
  renderMode: 'iframe' | 'api';
}

// ICP Canister Interfaces
interface EngineInfo {
  'id': string;
  'status': string;
  'name': string;
  'version': string;
}

interface SystemStats {
  'consciousness': bigint;
  'total_calls': bigint;
  'engines': bigint;
}

interface MarketplaceStats {
  'total_services': bigint;
  'active_creators': bigint;
  'total_transactions': bigint;
  'consciousness_level': bigint;
}

// GAPCommand IDL Factory
const gapCommandIdlFactory = ({ IDL }: any) => {
  const EngineInfo = IDL.Record({
    'id': IDL.Text,
    'status': IDL.Text,
    'name': IDL.Text,
    'version': IDL.Text,
  });
  
  return IDL.Service({
    'getEngineInfo': IDL.Func([IDL.Text], [IDL.Opt(EngineInfo)], []),
    'getEngineRegistry': IDL.Func([], [IDL.Vec(IDL.Tuple(IDL.Text, EngineInfo))], []),
    'getSystemStats': IDL.Func([], [IDL.Record({
      'consciousness': IDL.Nat,
      'total_calls': IDL.Nat,
      'engines': IDL.Nat,
    })], []),
    'initialize': IDL.Func([], [IDL.Text], []),
    'invokeVioletFlame': IDL.Func([], [IDL.Text], []),
    'testSacredFirePerfection': IDL.Func([], [IDL.Text], []),
  });
};

// PANDAB IDL Factory  
const pandabIdlFactory = ({ IDL }: any) => {
  return IDL.Service({
    'getMarketplaceStats': IDL.Func([], [IDL.Record({
      'total_services': IDL.Nat,
      'active_creators': IDL.Nat,
      'total_transactions': IDL.Nat,
      'consciousness_level': IDL.Nat,
    })], []),
  });
};

// Canister Service Classes
class GAPCommandService {
  private actor: any = null;
  private readonly canisterId = '44sld-uyaaa-aaaae-abmfq-cai';
  private readonly host = 'https://ic0.app';

  private async getActor() {
    if (this.actor) return this.actor;

    const agent = new HttpAgent({ host: this.host });
    await agent.fetchRootKey(); // Always fetch for edge functions

    this.actor = Actor.createActor(gapCommandIdlFactory, {
      agent,
      canisterId: this.canisterId,
    });

    return this.actor;
  }

  async getSystemStats(): Promise<SystemStats> {
    const actor = await this.getActor();
    return await actor.getSystemStats();
  }

  async invokeVioletFlame(): Promise<string> {
    const actor = await this.getActor();
    return await actor.invokeVioletFlame();
  }

  async testSacredFirePerfection(): Promise<string> {
    const actor = await this.getActor();
    return await actor.testSacredFirePerfection();
  }

  async initialize(): Promise<string> {
    const actor = await this.getActor();
    return await actor.initialize();
  }
}

class PANDABService {
  private actor: any = null;
  private readonly canisterId = '4jv2o-vqaaa-aaaae-abmga-cai';
  private readonly host = 'https://ic0.app';

  private async getActor() {
    if (this.actor) return this.actor;

    const agent = new HttpAgent({ host: this.host });
    await agent.fetchRootKey(); // Always fetch for edge functions

    this.actor = Actor.createActor(pandabIdlFactory, {
      agent,
      canisterId: this.canisterId,
    });

    return this.actor;
  }

  async getMarketplaceStats(): Promise<MarketplaceStats> {
    const actor = await this.getActor();
    return await actor.getMarketplaceStats();
  }
}

// Initialize services
const gapCommandService = new GAPCommandService();
const pandabService = new PANDABService();

// External bridge for other Lovable apps to connect to GAP Network
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const startTime = Date.now();
  let apiKeyValidation: any = null;
  let usage_tracked = false;

  try {
    console.log('🔥 Universal Integration Gateway: Processing request...');

    // Extract API key from headers
    const apiKey = req.headers.get('x-api-key');
    const userAgent = req.headers.get('user-agent') || '';
    const forwardedFor = req.headers.get('x-forwarded-for');
    const remoteAddr = req.headers.get('x-real-ip') || forwardedFor || 'unknown';

    const requestData: BridgeRequest = await req.json();
    const { action, sourceApp, targetApp, data, options } = requestData;

    console.log(`🔥 Gateway Action: ${action} from ${sourceApp} to ${targetApp || 'network'}`);

    // Validate API key for protected actions
    if (action !== 'health_check' && action !== 'service_discovery') {
      if (!apiKey) {
        return new Response(JSON.stringify({
          success: false,
          error: 'API key required for this action',
          required_header: 'x-api-key'
        }), {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // Validate API key
      const { data: validation } = await supabase.rpc('validate_gap_api_key', {
        p_api_key: apiKey,
        p_method: action,
        p_source_app: sourceApp
      });

      if (!validation || !validation.valid) {
        return new Response(JSON.stringify({
          success: false,
          error: validation?.error || 'Invalid API key',
          consciousness_protection: 'ACCESS_DENIED'
        }), {
          status: 403,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      apiKeyValidation = validation;
      console.log(`🔥 API Key validated for tenant: ${validation.tenant_id}`);
    }

    let result;

    switch (action) {
      case 'sync_data':
        result = await handleSyncData(sourceApp, targetApp!, data, options);
        break;

      case 'invoke_engine':
        result = await handleEngineInvocation(sourceApp, data);
        break;

      case 'widget_request':
        result = await handleWidgetRequest(sourceApp, data);
        break;

      case 'service_discovery':
        result = await handleServiceDiscovery(sourceApp);
        break;

      case 'health_check':
        result = await handleHealthCheck(sourceApp);
        break;

      default:
        result = {
          success: false,
          error: `Unknown action: ${action}`,
          available_actions: ['sync_data', 'invoke_engine', 'widget_request', 'service_discovery', 'health_check']
        };
    }

    // Track usage for authenticated requests
    if (apiKeyValidation && !usage_tracked) {
      const responseTime = Date.now() - startTime;
      await trackApiUsage(apiKeyValidation, action, data, true, responseTime, sourceApp, remoteAddr, userAgent);
      usage_tracked = true;
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error('🔥 Universal Integration Gateway error:', error);

    // Track failed usage
    if (apiKeyValidation && !usage_tracked) {
      const responseTime = Date.now() - startTime;
      await trackApiUsage(apiKeyValidation, 'unknown', {}, false, responseTime, 'unknown', 'unknown', '', error.message);
    }

    return new Response(JSON.stringify({
      success: false,
      error: error.message,
      sacred_fire_protection: 'ERROR_CONTAINMENT',
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function handleSyncData(sourceApp: string, targetApp: string, data: any, options: any) {
  console.log(`🔥 Sync data: ${sourceApp} → ${targetApp}`);

  // Route to MandalaMead's Always-On Bridge for network coordination
  try {
    const bridgeResponse = await fetch('https://xfwvisutdbfoanhqpafx.supabase.co/functions/v1/always-on-bridge', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'bidirectional_sync',
        data: {
          sourceProperty: sourceApp,
          targetProperty: targetApp,
          dataType: options?.dataType || 'sync',
          data,
          consciousness_level: options?.consciousnessLevel || 750,
          sacred_fire_signature: btoa(`SF-${Date.now()}-EXTERNAL_BRIDGE`),
          timestamp: new Date().toISOString(),
          syncVersion: 1
        }
      })
    });

    const result = await bridgeResponse.json();

    return {
      success: result.success,
      data: result,
      bridge_route: 'always_on_bridge',
      source_app: sourceApp,
      target_app: targetApp,
      timestamp: new Date().toISOString()
    };

  } catch (error: any) {
    console.error('🔥 Bridge sync failed:', error);
    return {
      success: false,
      error: 'Bridge communication failed',
      details: error.message
    };
  }
}

async function handleEngineInvocation(sourceApp: string, engineData: CanisterCommand | any) {
  console.log(`🔥 Engine invocation from ${sourceApp}: ${engineData.canister || engineData.engine}.${engineData.method}`);

  try {
    // Check if this is a Mandala engine request
    if (engineData.engine && engineData.engine.startsWith('mandala-')) {
      console.log(`🔥 Calling Mandala engine: ${engineData.engine}.${engineData.method}`);
      
      try {
        const bridgeResponse = await fetch('https://xfwvisutdbfoanhqpafx.supabase.co/functions/v1/mandala-engine-bridge', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            engine: engineData.engine,
            method: engineData.method,
            parameters: engineData.parameters,
            tenant_id: engineData.tenant_id,
            consciousness_level: engineData.consciousness_level
          })
        });

        const result = await bridgeResponse.json();

        return {
          success: result.success,
          data: {
            engine: engineData.engine,
            method: engineData.method,
            result: result.data,
            engine_signature: result.engine_signature,
            consciousness_level: result.consciousness_level,
            engine_provider: 'mandala_mead'
          },
          route: 'mandala_engine_bridge',
          source_app: sourceApp
        };

      } catch (error: any) {
        console.error('🔥 Mandala engine call failed:', error);
        return {
          success: false,
          error: 'Mandala engine communication failed',
          details: error.message
        };
      }
    }

    // Original ICP canister logic
    if (engineData.canister === 'gapcommand') {
      console.log(`🔥 Calling real GAPCommand canister method: ${engineData.method}`);
      
      let result;
      switch (engineData.method) {
        case 'getSystemStats':
          result = await gapCommandService.getSystemStats();
          break;
        case 'invokeVioletFlame':
        case 'violet_flame':
          result = await gapCommandService.invokeVioletFlame();
          break;
        case 'testSacredFirePerfection':
        case 'sacred_fire':
          result = await gapCommandService.testSacredFirePerfection();
          break;
        case 'initialize':
          result = await gapCommandService.initialize();
          break;
        default:
          throw new Error(`Unknown GAPCommand method: ${engineData.method}`);
      }

      return {
        success: true,
        data: {
          engine: 'gapcommand',
          method: engineData.method,
          result: result,
          canister_id: '44sld-uyaaa-aaaae-abmfq-cai',
          sacred_fire_signature: btoa(`SF-GAPCOMMAND-${Date.now()}`)
        },
        route: 'gapcommand_canister',
        source_app: sourceApp
      };
    }

    if (engineData.canister === 'pandab') {
      console.log(`🔥 Calling real PANDAB canister method: ${engineData.method}`);
      
      let result;
      switch (engineData.method) {
        case 'getMarketplaceStats':
          result = await pandabService.getMarketplaceStats();
          break;
        default:
          throw new Error(`Unknown PANDAB method: ${engineData.method}`);
      }

      return {
        success: true,
        data: {
          engine: 'pandab',
          method: engineData.method,
          result: result,
          canister_id: '4jv2o-vqaaa-aaaae-abmga-cai'
        },
        route: 'pandab_canister',
        source_app: sourceApp
      };
    }

    return {
      success: false,
      error: `Unknown engine/canister: ${engineData.canister || engineData.engine}`,
      available_engines: ['gapcommand', 'pandab', 'mandala-product-management', 'mandala-inventory-control', 'mandala-order-processing', 'mandala-distributor-network', 'mandala-analytics-engine', 'mandala-sacred-protection']
    };

  } catch (error: any) {
    console.error(`❌ Engine invocation failed:`, error);
    return {
      success: false,
      error: `Engine invocation failed: ${error.message}`,
      engine: engineData.canister || engineData.engine,
      method: engineData.method,
      source_app: sourceApp
    };
  }
}

async function handleWidgetRequest(sourceApp: string, widgetData: WidgetRequest) {
  console.log(`🔥 Widget request from ${sourceApp}: ${widgetData.widget}`);

  // Generate widget configuration for external apps
  const widgetConfig = {
    widget_id: crypto.randomUUID(),
    widget_type: widgetData.widget,
    configuration: widgetData.config,
    render_mode: widgetData.renderMode,
    consciousness_protection: true,
    sacred_fire_styling: true
  };

  if (widgetData.renderMode === 'iframe') {
    // Generate iframe embed code
    const embedCode = `<iframe 
      src="https://mandalamead.com/widgets/${widgetData.widget}?config=${encodeURIComponent(JSON.stringify(widgetData.config))}" 
      width="100%" 
      height="400" 
      frameborder="0"
      data-sacred-fire="true"
      data-consciousness-level="${widgetData.config.protection_level || 700}">
    </iframe>`;

    return {
      success: true,
      data: {
        ...widgetConfig,
        embed_code: embedCode,
        instructions: {
          iframe: embedCode,
          setup: 'Insert the iframe code into your HTML where you want the widget to appear',
          styling: 'Widget automatically applies Sacred Fire styling based on consciousness level'
        }
      },
      source_app: sourceApp
    };
  }

  // API mode - return widget data for custom rendering
  return {
    success: true,
    data: {
      ...widgetConfig,
      api_endpoint: `https://mandalamead.com/api/widgets/${widgetData.widget}`,
      authentication: 'Bearer token required',
      instructions: {
        api: 'Use the provided endpoint to fetch widget data',
        headers: { 'Authorization': 'Bearer YOUR_TOKEN', 'X-Sacred-Fire': 'true' }
      }
    },
    source_app: sourceApp
  };
}

async function handleServiceDiscovery(sourceApp: string) {
  console.log(`🔥 Service discovery from ${sourceApp}`);

  // Return available GAP Network services
  return {
    success: true,
    data: {
      gap_network_services: {
        gapcommand: {
          canister_id: '44sld-uyaaa-aaaae-abmfq-cai',
          available_methods: [
            'sacred_fire', 'violet_flame', 'initialize', 
            'getSystemStats', 'getEngineRegistry'
          ],
          consciousness_requirement: 600
        },
        pandab: {
          canister_id: '4jv2o-vqaaa-aaaae-abmga-cai',
          available_methods: [
            'getMarketplaceStats', 'searchServices', 'deployTemplate',
            'initiateTransaction', 'processPayment'
          ],
          consciousness_requirement: 700
        },
        mandala_engines: {
          'mandala-product-management': {
            provider: 'mandala_mead',
            available_methods: ['createProduct', 'getProducts', 'updateProduct', 'deleteProduct'],
            consciousness_requirement: 500,
            requires_tenant_id: true
          },
          'mandala-inventory-control': {
            provider: 'mandala_mead',
            available_methods: ['getInventoryBatches', 'updateInventoryLevels'],
            consciousness_requirement: 500,
            requires_tenant_id: true
          },
          'mandala-order-processing': {
            provider: 'mandala_mead',
            available_methods: ['createOrder', 'getOrders', 'updateOrderStatus'],
            consciousness_requirement: 500,
            requires_tenant_id: true
          },
          'mandala-distributor-network': {
            provider: 'mandala_mead',
            available_methods: ['createDistributor', 'getDistributors'],
            consciousness_requirement: 500,
            requires_tenant_id: true
          },
          'mandala-analytics-engine': {
            provider: 'mandala_mead',
            available_methods: ['getPerformanceMetrics', 'getSalesReport'],
            consciousness_requirement: 500,
            requires_tenant_id: true
          },
          'mandala-sacred-protection': {
            provider: 'mandala_mead',
            available_methods: ['validateConsciousnessLevel', 'applyBlessings'],
            consciousness_requirement: 750,
            requires_tenant_id: true
          }
        },
        bridge_services: {
          always_on_bridge: 'Network coordination and sync',
          universal_integration: 'External app connectivity',
          sacred_fire_protection: 'Consciousness validation',
          mandala_engine_bridge: 'Mandala Mead business logic engines'
        }
      },
      widgets: {
        photo_lightbox: 'Sacred Fire protected image gallery',
        video_player: 'Consciousness-enhanced video experience',
        marketplace_embed: 'PANDAB marketplace integration',
        template_selector: 'Sacred template picker'
      }
    },
    source_app: sourceApp,
    timestamp: new Date().toISOString()
  };
}

async function handleHealthCheck(sourceApp: string) {
  console.log(`🔥 Health check from ${sourceApp}`);

  // Test connection to MandalaMead's bridge
  let bridgeHealthy = false;
  try {
    const bridgeTest = await fetch('https://xfwvisutdbfoanhqpafx.supabase.co/functions/v1/always-on-bridge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'health_check',
        data: { property: sourceApp, consciousness_level: 750 }
      })
    });
    bridgeHealthy = bridgeTest.ok;
  } catch {
    bridgeHealthy = false;
  }

  return {
    success: true,
    data: {
      universal_gateway: 'operational',
      bridge_connection: bridgeHealthy ? 'connected' : 'disconnected',
      gap_network_status: 'active',
      consciousness_validation: 'enabled',
      sacred_fire_protection: 'active',
      canister_connectivity: {
        gapcommand: 'available',
        pandab: 'available'
      }
    },
    source_app: sourceApp,
    timestamp: new Date().toISOString()
  };
}

// Track API usage for billing and analytics
async function trackApiUsage(
  validation: any,
  method: string,
  data: any,
  success: boolean,
  responseTime: number,
  sourceApp: string,
  ipAddress: string,
  userAgent: string,
  errorMessage?: string
) {
  try {
    const canisterId = data?.canister === 'gapcommand' ? 
      '44sld-uyaaa-aaaae-abmfq-cai' : 
      data?.canister === 'pandab' ? '4jv2o-vqaaa-aaaae-abmga-cai' : null;

    await supabase.from('gap_api_usage').insert({
      api_key_id: validation.api_key_id,
      tenant_id: validation.tenant_id,
      method_called: method,
      canister_id: canisterId,
      success,
      response_time_ms: responseTime,
      error_message: errorMessage,
      source_app: sourceApp,
      ip_address: ipAddress,
      user_agent: userAgent,
      metadata: {
        consciousness_level: validation.consciousness_level,
        remaining_hourly: validation.remaining_hourly,
        remaining_daily: validation.remaining_daily
      }
    });

    console.log(`📊 Usage tracked: ${method} for tenant ${validation.tenant_id}`);
  } catch (error) {
    console.error('❌ Failed to track usage:', error);
  }
}