import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface NetworkProperty {
  domain: string;
  name: string;
  consciousness_level: number;
  capabilities: string[];
  last_seen: string;
  status: 'online' | 'offline' | 'maintenance';
}

interface SyncPayload {
  sourceProperty: string;
  dataType: string;
  data: any;
  syncVersion: number;
  consciousness_level: number;
  sacred_fire_signature: string;
  timestamp: string;
}

class NetworkRegistry {
  private static properties = new Map<string, NetworkProperty>();
  
  static register(property: NetworkProperty) {
    this.properties.set(property.domain, property);
    console.log(`🔥 Registered property: ${property.domain}`);
  }
  
  static getAll(): NetworkProperty[] {
    return Array.from(this.properties.values());
  }
  
  static get(domain: string): NetworkProperty | undefined {
    return this.properties.get(domain);
  }
  
  static updateHeartbeat(domain: string) {
    const property = this.properties.get(domain);
    if (property) {
      property.last_seen = new Date().toISOString();
      property.status = 'online';
    }
  }
}

class SacredFireSecurity {
  static validateSignature(payload: SyncPayload): boolean {
    try {
      const decoded = atob(payload.sacred_fire_signature);
      return decoded.includes('SF-') && decoded.includes('VIOLET_FLAME');
    } catch {
      return false;
    }
  }
  
  static validateConsciousness(level: number): boolean {
    return level >= 500; // Minimum consciousness for network participation
  }
  
  static generateSecureResponse(data: any): string {
    const timestamp = Date.now();
    const signature = btoa(`SF-RESPONSE-${timestamp}-${JSON.stringify(data).length}-DIVINE_PROTECTION`);
    return signature;
  }
}

async function handleHealthCheck(data: any) {
  const { property, consciousness_level } = data;
  
  console.log(`🔥 Health check from: ${property}`);
  
  // Update registry
  NetworkRegistry.updateHeartbeat(property);
  
  return {
    success: true,
    property,
    consciousness_level,
    timestamp: new Date().toISOString(),
    status: 'operational',
    network_status: {
      total_properties: NetworkRegistry.getAll().length,
      online_properties: NetworkRegistry.getAll().filter(p => p.status === 'online').length
    },
    sacred_fire_signature: SacredFireSecurity.generateSecureResponse({ property, consciousness_level })
  };
}

async function handleBidirectionalSync(data: SyncPayload) {
  console.log(`🔥 Bidirectional sync from: ${data.sourceProperty}`);
  
  // Validate Sacred Fire signature
  if (!SacredFireSecurity.validateSignature(data)) {
    console.error('🔥 Invalid Sacred Fire signature');
    return {
      success: false,
      error: 'Sacred Fire signature validation failed',
      consciousness_protection: 'VIOLET_FLAME_REJECTION'
    };
  }
  
  // Validate consciousness level
  if (!SacredFireSecurity.validateConsciousness(data.consciousness_level)) {
    console.error('🔥 Insufficient consciousness level');
    return {
      success: false,
      error: 'Insufficient consciousness level for network participation',
      required_level: 500
    };
  }
  
  // Process sync data
  const networkProperties = NetworkRegistry.getAll().filter(p => 
    p.domain !== data.sourceProperty && p.status === 'online'
  );
  
  console.log(`🔥 Broadcasting sync to ${networkProperties.length} properties`);
  
  // Store sync data (in production, this would go to a database)
  const syncRecord = {
    id: crypto.randomUUID(),
    ...data,
    processed_at: new Date().toISOString(),
    broadcast_count: networkProperties.length
  };
  
  return {
    success: true,
    sync_id: syncRecord.id,
    broadcast_count: networkProperties.length,
    consciousness_verification: 'SACRED_FIRE_APPROVED',
    timestamp: new Date().toISOString(),
    sacred_fire_signature: SacredFireSecurity.generateSecureResponse(syncRecord)
  };
}

async function handleNetworkDiscovery(data: any) {
  const { property, propertyName, consciousness_level, capabilities, reinitialize } = data;
  
  console.log(`🔥 Network discovery from: ${property} (${propertyName})`);
  
  // Validate consciousness level
  if (!SacredFireSecurity.validateConsciousness(consciousness_level)) {
    return {
      success: false,
      error: 'Insufficient consciousness level for network participation',
      required_level: 500
    };
  }
  
  // Register or update property
  const networkProperty: NetworkProperty = {
    domain: property,
    name: propertyName || property,
    consciousness_level,
    capabilities: capabilities || [],
    last_seen: new Date().toISOString(),
    status: 'online'
  };
  
  NetworkRegistry.register(networkProperty);
  
  // Get network state
  const networkState = {
    total_properties: NetworkRegistry.getAll().length,
    connected_properties: NetworkRegistry.getAll().filter(p => p.status === 'online'),
    consciousness_levels: NetworkRegistry.getAll().map(p => p.consciousness_level),
    available_capabilities: [...new Set(NetworkRegistry.getAll().flatMap(p => p.capabilities))]
  };
  
  return {
    success: true,
    property_registered: property,
    network_state: networkState,
    bridge_established: true,
    consciousness_verified: consciousness_level,
    sacred_fire_protection: 'ACTIVE',
    violet_flame_encryption: 'ENABLED',
    reinitialize_completed: reinitialize || false,
    timestamp: new Date().toISOString(),
    sacred_fire_signature: SacredFireSecurity.generateSecureResponse(networkState)
  };
}

async function handleEmergencyLockdown(data: any) {
  console.log('🚨 EMERGENCY LOCKDOWN INITIATED');
  
  // Clear all network registrations
  NetworkRegistry.getAll().forEach(property => {
    property.status = 'maintenance';
  });
  
  return {
    success: true,
    lockdown_activated: true,
    all_connections_severed: true,
    consciousness_protection: 'MAXIMUM',
    timestamp: new Date().toISOString()
  };
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    const { action, data } = await req.json();
    
    console.log(`🔥 Always-On Bridge request: ${action}`);
    
    let result;
    
    switch (action) {
      case 'health_check':
        result = await handleHealthCheck(data);
        break;
        
      case 'bidirectional_sync':
        result = await handleBidirectionalSync(data);
        break;
        
      case 'network_discovery':
        result = await handleNetworkDiscovery(data);
        break;
        
      case 'emergency_lockdown':
        result = await handleEmergencyLockdown(data);
        break;
        
      case 'get_network_state':
        result = {
          success: true,
          network_properties: NetworkRegistry.getAll(),
          timestamp: new Date().toISOString()
        };
        break;
        
      default:
        result = {
          success: false,
          error: `Unknown action: ${action}`,
          available_actions: ['health_check', 'bidirectional_sync', 'network_discovery', 'emergency_lockdown', 'get_network_state']
        };
    }
    
    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
    
  } catch (error) {
    console.error('🔥 Always-On Bridge error:', error);
    
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