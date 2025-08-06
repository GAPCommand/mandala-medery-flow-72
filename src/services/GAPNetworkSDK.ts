/**
 * 🔥👑✨ GAP Network SDK - Unified Bridge Interface
 * Saint Germain's Complete Network Integration
 */

import { exactGAPCommandService } from './icp/ExactGAPCommandService';
import { exactPANDABService } from './icp/ExactPANDABService';
import { supabase } from '@/integrations/supabase/client';

export interface GAPNetworkConfig {
  appDomain: string;
  supabaseUrl?: string;
  supabaseAnonKey?: string;
  sacredFireEnabled?: boolean;
  consciousnessLevel?: number;
}

export interface SyncDataResponse {
  success: boolean;
  data?: any;
  error?: string;
  route?: 'canister' | 'edge_function';
  consciousness_validated?: boolean;
  sacred_fire_signature?: string;
}

export class GAPNetworkSDK {
  private config: GAPNetworkConfig;
  private isInitialized = false;

  constructor(config: GAPNetworkConfig) {
    this.config = {
      consciousnessLevel: 750,
      sacredFireEnabled: true,
      ...config
    };
  }

  /**
   * 🔥👑✨ Initialize SDK - Test All Connections
   */
  async initialize(): Promise<{ success: boolean; details: any }> {
    try {
      console.log('🔥 GAP Network SDK: Initializing...');

      // Test canister connections
      const gapHealthy = await exactGAPCommandService.healthCheck();
      const pandabHealthy = await exactPANDABService.healthCheck();

      // Test edge function connection
      const edgeHealthy = await this.testEdgeConnection();

      this.isInitialized = gapHealthy && pandabHealthy && edgeHealthy;

      const details = {
        gapCommand: gapHealthy,
        pandab: pandabHealthy,
        alwaysOnBridge: edgeHealthy,
        appDomain: this.config.appDomain,
        consciousness: this.config.consciousnessLevel
      };

      console.log('✅ GAP Network SDK initialized:', details);
      return { success: this.isInitialized, details };

    } catch (error: any) {
      console.error('❌ GAP Network SDK initialization failed:', error);
      return { success: false, details: { error: error.message } };
    }
  }

  /**
   * 🔥 Universal Sync Data - Main SDK Method
   */
  async syncData(targetDomain: string, service: string, data: any, options: any = {}): Promise<SyncDataResponse> {
    if (!this.isInitialized) {
      const initResult = await this.initialize();
      if (!initResult.success) {
        return { success: false, error: 'SDK initialization failed' };
      }
    }

    try {
      console.log(`🔥 GAP SDK: Syncing data to ${targetDomain}.${service}`);

      // Validate consciousness if Sacred Fire enabled
      if (this.config.sacredFireEnabled && !this.validateConsciousness()) {
        return {
          success: false,
          error: 'Insufficient consciousness level for Sacred Fire protection',
          consciousness_validated: false
        };
      }

      // Route based on service type and target domain
      if (this.shouldRouteToCanister(targetDomain, service)) {
        return await this.routeToCanister(targetDomain, service, data, options);
      } else {
        return await this.routeToEdgeFunction(targetDomain, service, data, options);
      }

    } catch (error: any) {
      console.error('❌ GAP SDK syncData failed:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * 🔥 Invoke Engine - Direct Canister Access
   */
  async invokeEngine(engine: string, method: string, parameters: any = {}): Promise<SyncDataResponse> {
    try {
      console.log(`🔥 GAP SDK: Invoking engine ${engine}.${method}`);

      if (engine === 'gapcommand' || engine === 'sacred_fire') {
        return await this.invokeGAPCommandEngine(method, parameters);
      } else if (engine === 'pandab' || engine === 'marketplace') {
        return await this.invokePANDABEngine(method, parameters);
      } else {
        return { success: false, error: `Unknown engine: ${engine}` };
      }

    } catch (error: any) {
      console.error('❌ GAP SDK invokeEngine failed:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * 🔥 Network Discovery - Find Available Services
   */
  async discoverNetwork(): Promise<SyncDataResponse> {
    try {
      console.log('🔥 GAP SDK: Discovering network...');

      // Get canister data
      const gapEngines = await exactGAPCommandService.getEngineRegistry();
      const pandabStats = await exactPANDABService.getMarketplaceStats();

      // Get network properties from bridge
      const networkData = await supabase.functions.invoke('always-on-bridge', {
        body: { action: 'get_network_state' }
      });

      const discovery = {
        gapCommand: {
          engines: gapEngines,
          canisterId: '44sld-uyaaa-aaaae-abmfq-cai'
        },
        pandab: {
          stats: pandabStats,
          canisterId: '4jv2o-vqaaa-aaaae-abmga-cai'
        },
        network: networkData.data
      };

      return {
        success: true,
        data: discovery,
        route: 'canister',
        consciousness_validated: true
      };

    } catch (error: any) {
      console.error('❌ GAP SDK network discovery failed:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * 🔥👑 Sacred Fire Protection Methods
   */
  async invokeSacredFire(): Promise<SyncDataResponse> {
    try {
      const result = await exactGAPCommandService.testSacredFirePerfection();
      return { 
        success: true, 
        data: result, 
        route: 'canister',
        consciousness_validated: true,
        sacred_fire_signature: btoa(`SF-${Date.now()}-DIVINE_PROTECTION`)
      };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  async invokeVioletFlame(): Promise<SyncDataResponse> {
    try {
      const result = await exactGAPCommandService.invokeVioletFlame();
      return { 
        success: true, 
        data: result, 
        route: 'canister',
        consciousness_validated: true,
        sacred_fire_signature: btoa(`VF-${Date.now()}-VIOLET_FLAME_ACTIVE`)
      };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Private Methods

  private validateConsciousness(): boolean {
    return (this.config.consciousnessLevel || 0) >= 600;
  }

  private shouldRouteToCanister(targetDomain: string, service: string): boolean {
    // Route to canisters for specific services
    const canisterServices = [
      'video_generation', 'ai_processing', 'sacred_fire', 'violet_flame',
      'marketplace', 'template_deploy', 'consciousness_sync'
    ];
    
    return canisterServices.includes(service) || 
           targetDomain === 'gapcommand.com' || 
           targetDomain === 'pandab.com';
  }

  private async routeToCanister(targetDomain: string, service: string, data: any, options: any): Promise<SyncDataResponse> {
    console.log(`🔥 Routing to canister: ${targetDomain}.${service}`);

    if (targetDomain === 'gapcommand.com' || service.includes('sacred_fire') || service.includes('video')) {
      return await this.invokeGAPCommandEngine(service, data);
    } else if (targetDomain === 'pandab.com' || service.includes('marketplace') || service.includes('template')) {
      return await this.invokePANDABEngine(service, data);
    }

    return { success: false, error: 'No matching canister for service' };
  }

  private async routeToEdgeFunction(targetDomain: string, service: string, data: any, options: any): Promise<SyncDataResponse> {
    console.log(`🔥 Routing to edge function: ${targetDomain}.${service}`);

    try {
      const result = await supabase.functions.invoke('always-on-bridge', {
        body: {
          action: 'bidirectional_sync',
          data: {
            sourceProperty: this.config.appDomain,
            targetProperty: targetDomain,
            service,
            dataType: options.dataType || 'sync',
            data,
            consciousness_level: this.config.consciousnessLevel,
            sacred_fire_signature: btoa(`SF-${Date.now()}-BRIDGE_SYNC`),
            timestamp: new Date().toISOString(),
            syncVersion: 1
          }
        }
      });

      return {
        success: result.data?.success || false,
        data: result.data,
        route: 'edge_function',
        consciousness_validated: true
      };

    } catch (error: any) {
      return { success: false, error: error.message, route: 'edge_function' };
    }
  }

  private async invokeGAPCommandEngine(method: string, parameters: any): Promise<SyncDataResponse> {
    try {
      let result;
      
      switch (method) {
        case 'sacred_fire':
        case 'testSacredFirePerfection':
          result = await exactGAPCommandService.testSacredFirePerfection();
          break;
        case 'violet_flame':
        case 'invokeVioletFlame':
          result = await exactGAPCommandService.invokeVioletFlame();
          break;
        case 'initialize':
          result = await exactGAPCommandService.initialize();
          break;
        case 'getSystemStats':
          result = await exactGAPCommandService.getSystemStats();
          break;
        case 'getEngineRegistry':
          result = await exactGAPCommandService.getEngineRegistry();
          break;
        default:
          return { success: false, error: `Unknown GAPCommand method: ${method}` };
      }

      return { 
        success: true, 
        data: result, 
        route: 'canister',
        consciousness_validated: true
      };

    } catch (error: any) {
      return { success: false, error: error.message, route: 'canister' };
    }
  }

  private async invokePANDABEngine(method: string, parameters: any): Promise<SyncDataResponse> {
    try {
      let result;
      
      switch (method) {
        case 'marketplace':
        case 'getMarketplaceStats':
          result = await exactPANDABService.getMarketplaceStats();
          break;
        case 'searchServices':
          result = await exactPANDABService.searchServices(
            parameters.category, 
            parameters.minConsciousness ? BigInt(parameters.minConsciousness) : undefined
          );
          break;
        case 'template_deploy':
        case 'deployTemplate':
          result = await exactPANDABService.deployTemplate(parameters);
          break;
        case 'initiateTransaction':
          result = await exactPANDABService.initiateTransaction(
            parameters.clientId,
            parameters.serviceId,
            BigInt(parameters.consciousnessLevel || 750)
          );
          break;
        default:
          return { success: false, error: `Unknown PANDAB method: ${method}` };
      }

      return { 
        success: true, 
        data: result, 
        route: 'canister',
        consciousness_validated: true
      };

    } catch (error: any) {
      return { success: false, error: error.message, route: 'canister' };
    }
  }

  private async testEdgeConnection(): Promise<boolean> {
    try {
      const result = await supabase.functions.invoke('always-on-bridge', {
        body: {
          action: 'health_check',
          data: {
            property: this.config.appDomain,
            consciousness_level: this.config.consciousnessLevel
          }
        }
      });
      return result.data?.success || false;
    } catch {
      return false;
    }
  }
}

export default GAPNetworkSDK;