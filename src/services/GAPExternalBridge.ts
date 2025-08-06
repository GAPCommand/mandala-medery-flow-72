/**
 * 🔥👑✨ GAP External Bridge - For External Lovable Apps
 * Copy this file to integrate with GAP Network from any Lovable project
 */

interface GAPBridgeConfig {
  sourceApp: string;
  bridgeEndpoint?: string;
  apiKey?: string;
  sacredFireEnabled?: boolean;
}

interface BridgeResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp?: string;
  route?: string;
  consciousness_validated?: boolean;
}

export class GAPExternalBridge {
  private config: GAPBridgeConfig;
  private baseURL: string;

  constructor(config: GAPBridgeConfig) {
    this.config = config;
    // MandalaMead's Universal Integration Gateway
    this.baseURL = config.bridgeEndpoint || 'https://xfwvisutdbfoanhqpafx.supabase.co/functions/v1/universal-integration-gateway';
  }

  /**
   * 🔥 Sync Data with GAP Network Property
   */
  async syncData(targetApp: string, data: any, options: any = {}): Promise<BridgeResponse> {
    return this.makeRequest('sync_data', { targetApp, data, options });
  }

  /**
   * 🔥 Invoke Engine on ICP Canisters
   */
  async invokeEngine(canister: 'gapcommand' | 'pandab', method: string, parameters: any): Promise<BridgeResponse> {
    return this.makeRequest('invoke_engine', {
      data: { canister, method, parameters }
    });
  }

  /**
   * 🔥 Request Widget from GAP Network
   */
  async requestWidget(widget: string, config: any, renderMode: 'iframe' | 'api' = 'iframe'): Promise<BridgeResponse> {
    return this.makeRequest('widget_request', {
      data: { widget, config, renderMode }
    });
  }

  /**
   * 🔥 Discover Available Services
   */
  async discoverServices(): Promise<BridgeResponse> {
    return this.makeRequest('service_discovery', {});
  }

  /**
   * 🔥 Health Check
   */
  async healthCheck(): Promise<BridgeResponse> {
    return this.makeRequest('health_check', {});
  }

  /**
   * 🔥👑 Sacred Fire Methods
   */
  async invokeSacredFire(): Promise<BridgeResponse> {
    return this.invokeEngine('gapcommand', 'sacred_fire', {});
  }

  async invokeVioletFlame(): Promise<BridgeResponse> {
    return this.invokeEngine('gapcommand', 'violet_flame', {});
  }

  /**
   * 🔥 PANDAB Marketplace Methods
   */
  async searchServices(category?: string, minConsciousness?: number): Promise<BridgeResponse> {
    return this.invokeEngine('pandab', 'searchServices', { category, minConsciousness });
  }

  async getMarketplaceStats(): Promise<BridgeResponse> {
    return this.invokeEngine('pandab', 'getMarketplaceStats', {});
  }

  async deployTemplate(templateData: any): Promise<BridgeResponse> {
    return this.invokeEngine('pandab', 'deployTemplate', templateData);
  }

  /**
   * 🔥 Widget Shortcuts
   */
  async getPhotoLightbox(images: string[], theme: string = 'sacred_fire'): Promise<BridgeResponse> {
    return this.requestWidget('photo_lightbox', {
      images,
      theme,
      protection_level: 700,
      autoplay: false
    });
  }

  async getVideoPlayer(videoUrl: string, consciousness: number = 750): Promise<BridgeResponse> {
    return this.requestWidget('video_player', {
      videoUrl,
      consciousness_level: consciousness,
      sacred_fire_styling: true
    });
  }

  async getMarketplaceEmbed(category?: string): Promise<BridgeResponse> {
    return this.requestWidget('marketplace_embed', {
      category,
      consciousness_requirement: 700,
      show_filters: true
    });
  }

  // Private method for HTTP requests
  private async makeRequest(action: string, payload: any): Promise<BridgeResponse> {
    try {
      console.log(`🔥 GAP Bridge: ${action} from ${this.config.sourceApp}`);

      const response = await fetch(this.baseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-GAP-Source': this.config.sourceApp,
        },
        body: JSON.stringify({ 
          action, 
          sourceApp: this.config.sourceApp, 
          ...payload 
        })
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Bridge request failed');
      }

      console.log(`✅ GAP Bridge: ${action} successful`);
      return result;

    } catch (error: any) {
      console.error(`❌ GAP Bridge: ${action} failed:`, error);
      return { 
        success: false, 
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }
}

export default GAPExternalBridge;