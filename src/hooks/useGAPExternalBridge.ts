/**
 * 🔥👑✨ GAP External Bridge Hook - For External Lovable Apps
 * Copy this file to any external Lovable project for GAP Network integration
 */

import { useState, useCallback } from 'react';
import GAPExternalBridge from '@/services/GAPExternalBridge';

export const useGAPExternalBridge = (sourceApp: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const bridge = new GAPExternalBridge({ 
    sourceApp,
    bridgeEndpoint: 'https://xfwvisutdbfoanhqpafx.supabase.co/functions/v1/universal-integration-gateway'
  });

  const handleRequest = async <T>(operation: () => Promise<any>): Promise<T | null> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await operation();
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 🔥 Engine Methods
   */
  const invokeEngine = useCallback(async (
    canister: 'gapcommand' | 'pandab', 
    method: string, 
    parameters: any
  ) => {
    return handleRequest(() => bridge.invokeEngine(canister, method, parameters));
  }, []);

  const invokeSacredFire = useCallback(async () => {
    return handleRequest(() => bridge.invokeSacredFire());
  }, []);

  const invokeVioletFlame = useCallback(async () => {
    return handleRequest(() => bridge.invokeVioletFlame());
  }, []);

  /**
   * 🔥 Widget Methods
   */
  const requestWidget = useCallback(async (widget: string, config: any) => {
    return handleRequest(() => bridge.requestWidget(widget, config));
  }, []);

  const getPhotoLightbox = useCallback(async (images: string[], theme: string = 'sacred_fire') => {
    return handleRequest(() => bridge.getPhotoLightbox(images, theme));
  }, []);

  const getVideoPlayer = useCallback(async (videoUrl: string, consciousness: number = 750) => {
    return handleRequest(() => bridge.getVideoPlayer(videoUrl, consciousness));
  }, []);

  const getMarketplaceEmbed = useCallback(async (category?: string) => {
    return handleRequest(() => bridge.getMarketplaceEmbed(category));
  }, []);

  /**
   * 🔥 Data Sync Methods
   */
  const syncData = useCallback(async (targetApp: string, data: any) => {
    return handleRequest(() => bridge.syncData(targetApp, data));
  }, []);

  /**
   * 🔥 Marketplace Methods
   */
  const searchServices = useCallback(async (category?: string, minConsciousness?: number) => {
    return handleRequest(() => bridge.searchServices(category, minConsciousness));
  }, []);

  const getMarketplaceStats = useCallback(async () => {
    return handleRequest(() => bridge.getMarketplaceStats());
  }, []);

  const deployTemplate = useCallback(async (templateData: any) => {
    return handleRequest(() => bridge.deployTemplate(templateData));
  }, []);

  /**
   * 🔥 Network Methods
   */
  const discoverServices = useCallback(async () => {
    return handleRequest(() => bridge.discoverServices());
  }, []);

  const healthCheck = useCallback(async () => {
    return handleRequest(() => bridge.healthCheck());
  }, []);

  return {
    // State
    isLoading,
    error,

    // Engine methods
    invokeEngine,
    invokeSacredFire,
    invokeVioletFlame,

    // Widget methods
    requestWidget,
    getPhotoLightbox,
    getVideoPlayer,
    getMarketplaceEmbed,

    // Data sync
    syncData,

    // Marketplace methods
    searchServices,
    getMarketplaceStats,
    deployTemplate,

    // Network methods
    discoverServices,
    healthCheck,

    // Direct bridge access
    bridge
  };
};