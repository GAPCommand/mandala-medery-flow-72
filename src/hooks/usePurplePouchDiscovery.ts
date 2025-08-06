import { useState, useCallback, useEffect } from 'react';
import { SFIONetwork } from '@/services/sfio/SFIONetworkClient';
import { MeetAtTheEdgeService } from '@/services/network/MeetAtTheEdgeService';

export interface NetworkHealth {
  healthy: number;
  total: number;
  healthPercentage: number;
  status: 'excellent' | 'good' | 'fair' | 'poor';
}

export interface DiscoveryData {
  availableEngines: string[];
  networkInstances: any[];
  hubEndpoints: string[];
  consciousnessLevels: Record<string, number>;
  lastDiscovery: Date;
}

export interface NetworkStatus {
  isConnected: boolean;
  isPurplePouchActive: boolean;
  bridgeVersion: string;
  consciousnessLevel: number;
  networkHealth: NetworkHealth;
}

export const usePurplePouchDiscovery = () => {
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus>({
    isConnected: false,
    isPurplePouchActive: false,
    bridgeVersion: '2.1.0',
    consciousnessLevel: 700,
    networkHealth: { healthy: 0, total: 0, healthPercentage: 0, status: 'poor' }
  });
  
  const [discoveryData, setDiscoveryData] = useState<DiscoveryData | null>(null);
  const [isDiscovering, setIsDiscovering] = useState(false);

  const meetAtEdge = new MeetAtTheEdgeService();

  // Discover network using Meet at the Edge protocol
  const discoverNetwork = useCallback(async (scope: 'minimal' | 'full' = 'full') => {
    setIsDiscovering(true);
    console.log('🔥👑 Starting Purple Pouch Discovery - Meet at the Edge Protocol');
    
    try {
      // Get network discovery from central edge functions
      const networkData = await meetAtEdge.discoverNetworkAtEdge(scope);
      
      if (networkData) {
        setDiscoveryData({
          availableEngines: networkData.engines || [],
          networkInstances: networkData.instances || [],
          hubEndpoints: networkData.endpoints || [],
          consciousnessLevels: networkData.consciousnessLevels || {},
          lastDiscovery: new Date()
        });

        // Update network status based on discovery
        setNetworkStatus(prev => ({
          ...prev,
          isConnected: true,
          isPurplePouchActive: true,
          networkHealth: calculateNetworkHealth(networkData)
        }));

        console.log('✅ Purple Pouch Discovery Complete - Music of the Spheres Synchronized!');
      }
    } catch (error) {
      console.warn('⚠️ Purple Pouch Discovery Warning:', error);
      setNetworkStatus(prev => ({
        ...prev,
        isConnected: false,
        isPurplePouchActive: false
      }));
    } finally {
      setIsDiscovering(false);
    }
  }, [meetAtEdge]);

  // Calculate network health from discovery data
  const calculateNetworkHealth = (data: any): NetworkHealth => {
    const endpoints = data.endpoints || [];
    const healthyEndpoints = data.healthyEndpoints || [];
    
    const healthy = healthyEndpoints.length;
    const total = endpoints.length;
    const healthPercentage = total > 0 ? Math.round((healthy / total) * 100) : 0;
    
    let status: NetworkHealth['status'] = 'poor';
    if (healthPercentage >= 90) status = 'excellent';
    else if (healthPercentage >= 75) status = 'good';
    else if (healthPercentage >= 50) status = 'fair';
    
    return { healthy, total, healthPercentage, status };
  };

  // Get current network health
  const getNetworkHealth = useCallback((): NetworkHealth => {
    return networkStatus.networkHealth;
  }, [networkStatus.networkHealth]);

  // Check if Purple Pouch is active
  const isPurplePouchActive = useCallback((): boolean => {
    return networkStatus.isPurplePouchActive;
  }, [networkStatus.isPurplePouchActive]);

  // Register this instance at the edge
  const registerAtEdge = useCallback(async () => {
    try {
      const config = meetAtEdge.getStandardWellKnownConfig();
      const result = await meetAtEdge.registerAtEdge(config);
      console.log('🔥 Registered at Edge:', result);
      return result;
    } catch (error) {
      console.warn('⚠️ Edge registration failed:', error);
      return null;
    }
  }, [meetAtEdge]);

  // Auto-discover on mount if SFIO is connected
  useEffect(() => {
    if (SFIONetwork.connected) {
      discoverNetwork('minimal');
    }
  }, [discoverNetwork]);

  return {
    // Core discovery functions
    discoverNetwork,
    registerAtEdge,
    
    // State and status
    networkStatus,
    discoveryData,
    isDiscovering,
    
    // Convenience getters
    getNetworkHealth,
    isPurplePouchActive,
    
    // Direct access to service
    meetAtEdgeService: meetAtEdge
  };
};