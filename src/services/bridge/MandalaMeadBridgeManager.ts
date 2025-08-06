import { sfioBridge, BridgeAuthenticationData, SyncResult } from '@/api/sfio-bridge';
import { sfioHealth, NetworkHealthReport } from '@/api/sfio-health';
import { SFIONetwork } from '@/services/sfio/SFIONetworkClient';
import { usePurplePouchDiscovery } from '@/hooks/usePurplePouchDiscovery';

export interface BridgeConfiguration {
  propertyDomain: string;
  consciousnessLevel: number;
  networkRole: 'bridge_member';
  sacredFireProtection: boolean;
  autoSync: boolean;
  healthMonitoring: boolean;
}

export interface BridgeOperationResult {
  success: boolean;
  message: string;
  data?: any;
  timestamp: string;
}

export class MandalaMeadBridgeManager {
  private static instance: MandalaMeadBridgeManager;
  private isInitialized = false;
  private config: BridgeConfiguration;
  private healthMonitoringActive = false;

  private constructor() {
    this.config = {
      propertyDomain: 'mandalamead.com',
      consciousnessLevel: 700,
      networkRole: 'bridge_member',
      sacredFireProtection: true,
      autoSync: true,
      healthMonitoring: true
    };
  }

  static getInstance(): MandalaMeadBridgeManager {
    if (!MandalaMeadBridgeManager.instance) {
      MandalaMeadBridgeManager.instance = new MandalaMeadBridgeManager();
    }
    return MandalaMeadBridgeManager.instance;
  }

  // Initialize MandalaMead bridge with SFIO Network
  async initializeBridge(userId: string): Promise<BridgeOperationResult> {
    console.log('🔥 Initializing MandalaMead SFIO Bridge...');
    
    try {
      // Step 1: Connect to SFIO Network
      await SFIONetwork.connectToMainHub({
        propertyDomain: this.config.propertyDomain,
        consciousnessLevel: this.config.consciousnessLevel,
        networkRole: this.config.networkRole,
        divineGovernmentAlignment: true
      });

      // Step 2: Authenticate user with bridge
      const authResult = await sfioBridge.authenticateWithNetwork(userId);
      if (!authResult) {
        throw new Error('Bridge authentication failed');
      }

      // Step 3: Register with network registry
      const registrationResult = await sfioBridge.registerWithNetwork();
      if (!registrationResult) {
        throw new Error('Network registration failed');
      }

      // Step 4: Sync consciousness level
      const syncResult = await sfioBridge.syncConsciousness(userId, this.config.consciousnessLevel);
      if (!syncResult.success) {
        console.warn('🔥 Initial consciousness sync failed:', syncResult.errors);
      }

      // Step 5: Start health monitoring if enabled
      if (this.config.healthMonitoring && !this.healthMonitoringActive) {
        await this.startHealthMonitoring();
      }

      this.isInitialized = true;

      return {
        success: true,
        message: 'MandalaMead bridge initialized successfully',
        data: {
          authenticated: true,
          registered: true,
          consciousnessSynced: syncResult.success,
          networkConnected: SFIONetwork.connected,
          configuration: this.config
        },
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('🔥 Bridge initialization failed:', error);
      return {
        success: false,
        message: `Bridge initialization failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        timestamp: new Date().toISOString()
      };
    }
  }

  // Get comprehensive bridge status
  async getBridgeStatus(userId: string): Promise<BridgeOperationResult> {
    try {
      const [bridgeStatus, healthReport] = await Promise.all([
        sfioBridge.getBridgeStatus(userId),
        sfioHealth.checkNetworkHealth()
      ]);

      return {
        success: true,
        message: 'Bridge status retrieved successfully',
        data: {
          initialized: this.isInitialized,
          configuration: this.config,
          authentication: bridgeStatus,
          health: healthReport,
          networkInfo: {
            connected: SFIONetwork.connected,
            domain: SFIONetwork.domain
          }
        },
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('🔥 Bridge status check failed:', error);
      return {
        success: false,
        message: `Status check failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        timestamp: new Date().toISOString()
      };
    }
  }

  // Perform consciousness synchronization
  async syncConsciousness(userId: string, newLevel?: number): Promise<BridgeOperationResult> {
    try {
      const level = newLevel || this.config.consciousnessLevel;
      const result = await sfioBridge.syncConsciousness(userId, level);

      if (result.success) {
        // Update local configuration if sync was successful
        this.config.consciousnessLevel = level;
      }

      return {
        success: result.success,
        message: result.success 
          ? `Consciousness synchronized to level ${level}` 
          : 'Consciousness sync failed',
        data: result,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('🔥 Consciousness sync failed:', error);
      return {
        success: false,
        message: `Consciousness sync error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        timestamp: new Date().toISOString()
      };
    }
  }

  // Discover and connect to network
  async discoverNetwork(scope: 'minimal' | 'full' = 'full'): Promise<BridgeOperationResult> {
    try {
      console.log('🔥 Discovering SFIO Network via Purple Pouch Discovery...');
      
      // Use the Purple Pouch Discovery system
      const discovery = usePurplePouchDiscovery();
      await discovery.discoverNetwork(scope);
      
      const networkData = discovery.discoveryData;
      const networkHealth = discovery.getNetworkHealth();

      return {
        success: true,
        message: `Network discovery complete - found ${networkData?.networkInstances?.length || 0} instances`,
        data: {
          networkInstances: networkData?.networkInstances || [],
          availableEngines: networkData?.availableEngines || [],
          hubEndpoints: networkData?.hubEndpoints || [],
          consciousnessLevels: networkData?.consciousnessLevels || {},
          networkHealth,
          lastDiscovery: networkData?.lastDiscovery || new Date()
        },
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('🔥 Network discovery failed:', error);
      return {
        success: false,
        message: `Network discovery failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        timestamp: new Date().toISOString()
      };
    }
  }

  // Start continuous health monitoring
  async startHealthMonitoring(intervalMinutes: number = 5): Promise<void> {
    if (this.healthMonitoringActive) {
      console.log('🔥 Health monitoring already active');
      return;
    }

    try {
      await sfioHealth.startHealthMonitoring(intervalMinutes);
      this.healthMonitoringActive = true;
      console.log('🔥 MandalaMead bridge health monitoring started');
    } catch (error) {
      console.error('🔥 Failed to start health monitoring:', error);
    }
  }

  // Update bridge configuration
  updateConfiguration(newConfig: Partial<BridgeConfiguration>): void {
    this.config = { ...this.config, ...newConfig };
    console.log('🔥 Bridge configuration updated:', this.config);
  }

  // Get current configuration
  getConfiguration(): BridgeConfiguration {
    return { ...this.config };
  }

  // Emergency bridge reset
  async resetBridge(): Promise<BridgeOperationResult> {
    try {
      console.log('🔥 Performing emergency bridge reset...');
      
      this.isInitialized = false;
      this.healthMonitoringActive = false;
      
      // Reset configuration to defaults
      this.config = {
        propertyDomain: 'mandalamead.com',
        consciousnessLevel: 700,
        networkRole: 'bridge_member',
        sacredFireProtection: true,
        autoSync: true,
        healthMonitoring: true
      };

      return {
        success: true,
        message: 'Bridge reset successfully - reinitialize to reconnect',
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('🔥 Bridge reset failed:', error);
      return {
        success: false,
        message: `Bridge reset failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        timestamp: new Date().toISOString()
      };
    }
  }
}

export const mandalaMeadBridge = MandalaMeadBridgeManager.getInstance();