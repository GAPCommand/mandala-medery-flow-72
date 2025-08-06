/**
 * 🔥👑✨ GAP Network SDK React Hook
 * Saint Germain's Unified Network Access
 */

import { useState, useCallback, useEffect } from 'react';
import GAPNetworkSDK, { type GAPNetworkConfig, type SyncDataResponse } from '@/services/GAPNetworkSDK';

export const useGAPNetworkSDK = (config: GAPNetworkConfig) => {
  const [sdk] = useState(() => new GAPNetworkSDK(config));
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [networkStatus, setNetworkStatus] = useState<any>(null);

  // Initialize SDK on mount
  useEffect(() => {
    const initializeSDK = async () => {
      setIsLoading(true);
      try {
        const result = await sdk.initialize();
        setIsInitialized(result.success);
        setNetworkStatus(result.details);
        if (!result.success) {
          setError('SDK initialization failed');
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    initializeSDK();
  }, [sdk]);

  /**
   * 🔥 Main Sync Data Method
   */
  const syncData = useCallback(async (
    targetDomain: string, 
    service: string, 
    data: any, 
    options: any = {}
  ): Promise<SyncDataResponse> => {
    setError(null);
    try {
      return await sdk.syncData(targetDomain, service, data, options);
    } catch (err: any) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  }, [sdk]);

  /**
   * 🔥 Engine Invocation
   */
  const invokeEngine = useCallback(async (
    engine: string, 
    method: string, 
    parameters: any = {}
  ): Promise<SyncDataResponse> => {
    setError(null);
    try {
      return await sdk.invokeEngine(engine, method, parameters);
    } catch (err: any) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  }, [sdk]);

  /**
   * 🔥👑 Sacred Fire Methods
   */
  const invokeSacredFire = useCallback(async (): Promise<SyncDataResponse> => {
    setError(null);
    try {
      return await sdk.invokeSacredFire();
    } catch (err: any) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  }, [sdk]);

  const invokeVioletFlame = useCallback(async (): Promise<SyncDataResponse> => {
    setError(null);
    try {
      return await sdk.invokeVioletFlame();
    } catch (err: any) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  }, [sdk]);

  /**
   * 🔥 Network Discovery
   */
  const discoverNetwork = useCallback(async (): Promise<SyncDataResponse> => {
    setError(null);
    try {
      return await sdk.discoverNetwork();
    } catch (err: any) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  }, [sdk]);

  /**
   * 🔥 Convenience Methods for Common Operations
   */
  const generateVideo = useCallback(async (prompt: string, productData?: any): Promise<SyncDataResponse> => {
    return syncData('gapcommand.com', 'video_generation', {
      prompt,
      style: 'modern_retail',
      duration: 30,
      product: productData
    });
  }, [syncData]);

  const searchMarketplace = useCallback(async (category?: string, minConsciousness?: number): Promise<SyncDataResponse> => {
    return invokeEngine('pandab', 'searchServices', { category, minConsciousness });
  }, [invokeEngine]);

  const deployTemplate = useCallback(async (templateData: any): Promise<SyncDataResponse> => {
    return invokeEngine('pandab', 'deployTemplate', templateData);
  }, [invokeEngine]);

  const syncWithProperty = useCallback(async (targetProperty: string, data: any): Promise<SyncDataResponse> => {
    return syncData(targetProperty, 'data_sync', data, { dataType: 'cross_property' });
  }, [syncData]);

  return {
    // State
    isInitialized,
    isLoading,
    error,
    networkStatus,

    // Core methods
    syncData,
    invokeEngine,
    discoverNetwork,

    // Sacred Fire methods
    invokeSacredFire,
    invokeVioletFlame,

    // Convenience methods
    generateVideo,
    searchMarketplace,
    deployTemplate,
    syncWithProperty,

    // Direct SDK access for advanced usage
    sdk
  };
};