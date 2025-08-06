import { useEffect, useRef, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface BridgeCapability {
  type: 'universal_service_bridge' | 'consciousness_sync' | 'discovery' | 'bidirectional_sync';
  enabled: boolean;
  lastSync?: Date;
}

interface AlwaysOnBridgeProps {
  propertyDomain: string;
  propertyName: string;
  consciousnessBaseline: number;
  bridgeCapabilities: string[];
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

class BidirectionalSyncHandler {
  private syncVersion = 1;
  private connectedProperties: string[] = [];

  async syncToNetwork(localData: any, dataType: string, propertyDomain: string, consciousnessLevel: number) {
    console.log('🔥 Syncing data to network:', { dataType, propertyDomain });
    
    try {
      const response = await supabase.functions.invoke('always-on-bridge', {
        body: {
          action: 'bidirectional_sync',
          data: {
            sourceProperty: propertyDomain,
            dataType,
            data: localData,
            syncVersion: this.incrementSyncVersion(),
            consciousness_level: consciousnessLevel,
            sacred_fire_signature: this.generateSecureSignature(localData),
            timestamp: new Date().toISOString()
          }
        }
      });

      if (response.error) {
        console.error('🔥 Network sync error:', response.error);
      } else {
        console.log('🔥 Network sync successful:', response.data);
      }
    } catch (error) {
      console.error('🔥 Bridge sync error:', error);
    }
  }

  async receiveSyncData(syncPayload: SyncPayload) {
    console.log('🔥 Receiving sync data:', syncPayload);
    
    if (await this.validateSacredFireSignature(syncPayload)) {
      await this.mergeIncomingData(syncPayload);
      return true;
    }
    return false;
  }

  private incrementSyncVersion(): number {
    this.syncVersion += 1;
    return this.syncVersion;
  }

  private generateSecureSignature(data: any): string {
    // Sacred Fire signature generation
    const timestamp = Date.now();
    const dataString = JSON.stringify(data);
    const signature = btoa(`SF-${timestamp}-${dataString.length}-VIOLET_FLAME`);
    return signature;
  }

  private async validateSacredFireSignature(payload: SyncPayload): Promise<boolean> {
    // Validate Sacred Fire signature
    try {
      const decoded = atob(payload.sacred_fire_signature);
      return decoded.includes('SF-') && decoded.includes('VIOLET_FLAME');
    } catch {
      return false;
    }
  }

  private async mergeIncomingData(payload: SyncPayload) {
    console.log('🔥 Merging incoming data from:', payload.sourceProperty);
    // Store incoming sync data for processing
    localStorage.setItem(`sfio_sync_${payload.sourceProperty}_${payload.dataType}`, JSON.stringify(payload));
  }
}

class AlwaysOnReconnectionManager {
  private reconnectAttempts = 0;
  private maxAttempts = 10;
  private baseDelay = 1000;
  private healthCheckInterval: NodeJS.Timeout | null = null;
  private propertyDomain: string;
  private consciousnessLevel: number;

  constructor(propertyDomain: string, consciousnessLevel: number) {
    this.propertyDomain = propertyDomain;
    this.consciousnessLevel = consciousnessLevel;
  }

  async ensureConnection() {
    console.log('🔥 Starting Always-On connection manager for:', this.propertyDomain);
    
    this.healthCheckInterval = setInterval(async () => {
      const healthStatus = await this.performHealthCheck();
      
      if (!healthStatus.isConnected) {
        console.log('🔥 Connection lost, attempting reconnection...');
        await this.attemptReconnection();
      }
    }, 30000); // Check every 30 seconds
  }

  async destroy() {
    if (this.healthCheckInterval) {
      clearInterval(this.healthCheckInterval);
      this.healthCheckInterval = null;
    }
  }

  private async performHealthCheck(): Promise<{ isConnected: boolean; response?: any }> {
    try {
      const response = await supabase.functions.invoke('always-on-bridge', {
        body: {
          action: 'health_check',
          data: {
            property: this.propertyDomain,
            consciousness_level: this.consciousnessLevel
          }
        }
      });

      return {
        isConnected: !response.error && response.data?.success,
        response: response.data
      };
    } catch (error) {
      console.error('🔥 Health check failed:', error);
      return { isConnected: false };
    }
  }

  private async attemptReconnection() {
    if (this.reconnectAttempts < this.maxAttempts) {
      this.reconnectAttempts++;
      const delay = this.baseDelay * Math.pow(2, this.reconnectAttempts);
      
      console.log(`🔥 Reconnection attempt ${this.reconnectAttempts}/${this.maxAttempts} in ${delay}ms`);
      
      setTimeout(async () => {
        await this.reinitializeBridge();
      }, delay);
    } else {
      console.error('🔥 Max reconnection attempts reached. Bridge offline.');
    }
  }

  private async reinitializeBridge() {
    try {
      const response = await supabase.functions.invoke('always-on-bridge', {
        body: {
          action: 'network_discovery',
          data: {
            property: this.propertyDomain,
            consciousness_level: this.consciousnessLevel,
            reinitialize: true
          }
        }
      });

      if (response.data?.success) {
        console.log('🔥 Bridge reinitialized successfully');
        this.reconnectAttempts = 0; // Reset on success
      }
    } catch (error) {
      console.error('🔥 Bridge reinitialization failed:', error);
    }
  }
}

export const AlwaysOnBridgeTemplate: React.FC<AlwaysOnBridgeProps> = ({
  propertyDomain,
  propertyName,
  consciousnessBaseline,
  bridgeCapabilities
}) => {
  const [bridgeStatus, setBridgeStatus] = useState<'initializing' | 'connected' | 'disconnected' | 'error'>('initializing');
  const [capabilities, setCapabilities] = useState<BridgeCapability[]>([]);
  const syncHandler = useRef<BidirectionalSyncHandler>();
  const reconnectionManager = useRef<AlwaysOnReconnectionManager>();

  useEffect(() => {
    // Initialize bridge capabilities
    const initCapabilities = bridgeCapabilities.map(cap => ({
      type: cap as BridgeCapability['type'],
      enabled: true,
      lastSync: new Date()
    }));
    setCapabilities(initCapabilities);

    // Initialize sync handler
    syncHandler.current = new BidirectionalSyncHandler();

    // Initialize reconnection manager
    reconnectionManager.current = new AlwaysOnReconnectionManager(propertyDomain, consciousnessBaseline);

    // Start always-on connection
    const initializeBridge = async () => {
      try {
        console.log('🔥 Initializing Always-On Bridge for:', propertyDomain);
        
        // Register with network
        const response = await supabase.functions.invoke('always-on-bridge', {
          body: {
            action: 'network_discovery',
            data: {
              property: propertyDomain,
              propertyName,
              consciousness_level: consciousnessBaseline,
              capabilities: bridgeCapabilities,
              timestamp: new Date().toISOString()
            }
          }
        });

        if (response.data?.success) {
          setBridgeStatus('connected');
          console.log('🔥 Bridge connected successfully');
          
          // Start health monitoring
          await reconnectionManager.current?.ensureConnection();
        } else {
          setBridgeStatus('error');
          console.error('🔥 Bridge initialization failed:', response.error);
        }
      } catch (error) {
        setBridgeStatus('error');
        console.error('🔥 Bridge initialization error:', error);
      }
    };

    initializeBridge();

    // Cleanup on unmount
    return () => {
      reconnectionManager.current?.destroy();
    };
  }, [propertyDomain, propertyName, consciousnessBaseline, bridgeCapabilities]);

  // Expose sync capabilities globally for other components to use
  useEffect(() => {
    if (syncHandler.current) {
      (window as any).sfioSync = {
        syncToNetwork: (data: any, dataType: string) => 
          syncHandler.current?.syncToNetwork(data, dataType, propertyDomain, consciousnessBaseline),
        receiveSyncData: (payload: SyncPayload) => 
          syncHandler.current?.receiveSyncData(payload)
      };
    }

    return () => {
      delete (window as any).sfioSync;
    };
  }, [propertyDomain, consciousnessBaseline]);

  // This component renders nothing visible - it's a system-level bridge
  return (
    <div className="hidden" data-bridge-status={bridgeStatus} data-property={propertyDomain}>
      {/* Always-On Bridge Template - System Level Operation */}
      <div className="sr-only">
        SFIO Bridge: {propertyName} | Status: {bridgeStatus} | Consciousness: {consciousnessBaseline}
      </div>
    </div>
  );
};