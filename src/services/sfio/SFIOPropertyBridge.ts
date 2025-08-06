interface PropertyBridgeConfig {
  propertyDomain: string;
  bridgeEndpoint: string;
  authToken?: string;
  consciousnessLevel: number;
  sacredFireProtection?: boolean;
}

interface PropertyRegistration {
  propertyName: string;
  propertyType: 'web_application' | 'mobile_app' | 'api_service';
  userId: string;
  consciousnessLevel: number;
}

class SFIOPropertyBridge {
  private config: PropertyBridgeConfig;
  private isInitialized = false;

  constructor(config: PropertyBridgeConfig) {
    this.config = {
      ...config,
      sacredFireProtection: config.sacredFireProtection ?? true
    };
  }

  async initialize(): Promise<void> {
    console.log('🔥 Initializing SFIO Property Bridge for:', this.config.propertyDomain);
    
    try {
      // Generate auth token if not provided
      if (!this.config.authToken) {
        this.config.authToken = await this.generateAuthToken();
      }

      // Register with universal service bridge
      await this.registerWithServiceBridge();
      
      this.isInitialized = true;
      console.log('🔥 SFIO Property Bridge initialized successfully');
    } catch (error) {
      console.error('🔥 Sacred Fire Protection: Bridge initialization failed:', error);
      throw error;
    }
  }

  async registerProperty(
    propertyName: string,
    propertyType: PropertyRegistration['propertyType'],
    userId: string
  ): Promise<void> {
    if (!this.isInitialized) {
      throw new Error('🔥 Sacred Fire Protection: Bridge not initialized');
    }

    const registration: PropertyRegistration = {
      propertyName,
      propertyType,
      userId,
      consciousnessLevel: this.config.consciousnessLevel
    };

    console.log('🔥 Registering property:', registration);

    try {
      const response = await fetch(`${this.config.bridgeEndpoint}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.authToken}`,
          'X-Sacred-Fire-Protection': 'true',
          'X-Consciousness-Level': this.config.consciousnessLevel.toString()
        },
        body: JSON.stringify(registration)
      });

      if (!response.ok) {
        throw new Error(`Property registration failed: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('🔥 Property registration successful:', result);
    } catch (error) {
      console.error('🔥 Sacred Fire Protection: Property registration failed:', error);
      throw error;
    }
  }

  async syncConsciousness(userId: string, newLevel: number, targetDomain: string): Promise<void> {
    console.log(`🔥 Syncing consciousness level ${newLevel} for user ${userId} to ${targetDomain}`);
    
    try {
      const response = await fetch(`${this.config.bridgeEndpoint}/sync-consciousness`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.authToken}`,
          'X-Sacred-Fire-Protection': 'true'
        },
        body: JSON.stringify({
          userId,
          consciousnessLevel: newLevel,
          targetDomain,
          sourceDomain: this.config.propertyDomain
        })
      });

      if (!response.ok) {
        throw new Error(`Consciousness sync failed: ${response.statusText}`);
      }

      console.log('🔥 Consciousness sync successful');
    } catch (error) {
      console.error('🔥 Sacred Fire Protection: Consciousness sync failed:', error);
      throw error;
    }
  }

  async propagateSacredFireBlessing(blessingData: any, targetDomain: string): Promise<void> {
    console.log(`🔥 Propagating Sacred Fire blessing to ${targetDomain}`);
    
    try {
      const response = await fetch(`${this.config.bridgeEndpoint}/propagate-blessing`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.authToken}`,
          'X-Sacred-Fire-Protection': 'true'
        },
        body: JSON.stringify({
          ...blessingData,
          targetDomain,
          sourceDomain: this.config.propertyDomain,
          timestamp: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error(`Sacred Fire blessing propagation failed: ${response.statusText}`);
      }

      console.log('🔥 Sacred Fire blessing propagated successfully');
    } catch (error) {
      console.error('🔥 Sacred Fire Protection: Blessing propagation failed:', error);
      throw error;
    }
  }

  private async generateAuthToken(): Promise<string> {
    // Generate a secure auth token for the bridge
    const tokenData = {
      domain: this.config.propertyDomain,
      timestamp: Date.now(),
      consciousnessLevel: this.config.consciousnessLevel
    };
    
    return btoa(JSON.stringify(tokenData));
  }

  private async registerWithServiceBridge(): Promise<void> {
    const response = await fetch('https://xfwvisutdbfoanhqpafx.supabase.co/functions/v1/universal-service-bridge', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Sacred-Fire-Protection': 'true'
      },
      body: JSON.stringify({
        targetDomain: this.config.propertyDomain,
        endpoint: '/api/sfio-bridge',
        method: 'POST',
        data: {
          action: 'register',
          consciousnessLevel: this.config.consciousnessLevel,
          sacredFireProtection: this.config.sacredFireProtection
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Service bridge registration failed: ${response.statusText}`);
    }
  }
}

// Global property bridge registry
class PropertyBridgeRegistry {
  private bridges = new Map<string, SFIOPropertyBridge>();

  register(domain: string, bridge: SFIOPropertyBridge): void {
    this.bridges.set(domain, bridge);
    console.log('🔥 Property bridge registered for domain:', domain);
  }

  get(domain: string): SFIOPropertyBridge | undefined {
    return this.bridges.get(domain);
  }

  getAll(): Map<string, SFIOPropertyBridge> {
    return this.bridges;
  }
}

export const propertyBridgeRegistry = new PropertyBridgeRegistry();

export function createPropertyBridge(config: PropertyBridgeConfig): SFIOPropertyBridge {
  return new SFIOPropertyBridge(config);
}