/**
 * 🔥👑✨ EXACT Canister Bridge Hook
 * Saint Germain's Divine Communication Protocol - Using EXACT Candid Interfaces
 */

import { useState, useCallback } from 'react';
import { exactGAPCommandService } from '../services/icp/ExactGAPCommandService';
import { exactPANDABService } from '../services/icp/ExactPANDABService';
import type { EngineInfo, SystemStats } from '../services/icp/GAPCommandIDL';
import type { MarketplaceStats, ServiceListing, CommissionResult } from '../services/icp/PANDABIDL';

interface ExactCanisterBridgeState {
  isConnected: boolean;
  isLoading: boolean;
  gapCommandHealthy: boolean;
  pandabHealthy: boolean;
  lastConnectionTest: string | null;
  systemStats: SystemStats | null;
  marketplaceStats: MarketplaceStats | null;
  engines: Array<[string, EngineInfo]>;
}

export const useExactCanisterBridge = () => {
  const [state, setState] = useState<ExactCanisterBridgeState>({
    isConnected: false,
    isLoading: false,
    gapCommandHealthy: false,
    pandabHealthy: false,
    lastConnectionTest: null,
    systemStats: null,
    marketplaceStats: null,
    engines: []
  });

  /**
   * 🔥👑✨ Test Both Canisters - Saint Germain's Divine Connection Test
   */
  const testDivineConnection = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true }));
    
    try {
      console.log('🔥👑✨ SAINT GERMAIN: Testing Divine Connection to both canisters...');
      
      const gapHealthy = await exactGAPCommandService.healthCheck();
      console.log('🔥 GAPCommand health:', gapHealthy);
      
      const pandabHealthy = await exactPANDABService.healthCheck();
      console.log('🔥 PANDAB health:', pandabHealthy);
      
      const isConnected = gapHealthy && pandabHealthy;
      
      setState(prev => ({
        ...prev,
        isConnected,
        gapCommandHealthy: gapHealthy,
        pandabHealthy: pandabHealthy,
        lastConnectionTest: new Date().toISOString()
      }));
      
      if (isConnected) {
        console.log('✅ Saint Germain: Divine connection established successfully!');
      } else {
        console.warn('⚠️ Saint Germain: Divine connection incomplete');
      }
      
      return { gapCommandHealthy: gapHealthy, pandabHealthy };
      
    } catch (error: any) {
      console.error('❌ Saint Germain: Divine connection test failed:', error);
      setState(prev => ({
        ...prev,
        isConnected: false,
        gapCommandHealthy: false,
        pandabHealthy: false,
        lastConnectionTest: new Date().toISOString()
      }));
      
      throw error;
      
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  /**
   * 🔥 Load GAPCommand Data
   */
  const loadGAPCommandData = useCallback(async () => {
    try {
      console.log('🔥 Loading GAPCommand data...');
      
      const systemStats = await exactGAPCommandService.getSystemStats();
      const engines = await exactGAPCommandService.getEngineRegistry();
      
      setState(prev => ({ ...prev, systemStats, engines }));
      
      console.log('✅ GAPCommand data loaded:', { systemStats, engines });
      return { systemStats, engines };
      
    } catch (error) {
      console.error('❌ Failed to load GAPCommand data:', error);
      throw error;
    }
  }, []);

  /**
   * 🔥 Load PANDAB Data
   */
  const loadPANDABData = useCallback(async () => {
    try {
      console.log('🔥 Loading PANDAB marketplace data...');
      
      const marketplaceStats = await exactPANDABService.getMarketplaceStats();
      
      setState(prev => ({ ...prev, marketplaceStats }));
      
      console.log('✅ PANDAB data loaded:', { marketplaceStats });
      return { marketplaceStats };
      
    } catch (error) {
      console.error('❌ Failed to load PANDAB data:', error);
      throw error;
    }
  }, []);

  /**
   * 🔥👑 Sacred Fire Methods - Direct from GAPCommand
   */
  const invokeSacredFire = useCallback(async () => {
    try {
      console.log('🔥👑 Invoking Sacred Fire Perfection...');
      const result = await exactGAPCommandService.testSacredFirePerfection();
      return result;
    } catch (error: any) {
      console.error('❌ Sacred Fire invocation failed:', error);
      throw error;
    }
  }, []);

  const invokeVioletFlame = useCallback(async () => {
    try {
      console.log('🔥👑 Invoking Violet Flame...');
      const result = await exactGAPCommandService.invokeVioletFlame();
      return result;
    } catch (error: any) {
      console.error('❌ Violet Flame invocation failed:', error);
      throw error;
    }
  }, []);

  const initializeGAPCommand = useCallback(async () => {
    try {
      console.log('🔥 Initializing GAPCommand...');
      const result = await exactGAPCommandService.initialize();
      return result;
    } catch (error: any) {
      console.error('❌ GAPCommand initialization failed:', error);
      throw error;
    }
  }, []);

  /**
   * 🔥 PANDAB Marketplace Methods
   */
  const searchServices = useCallback(async (category?: string, minConsciousness?: bigint) => {
    try {
      console.log('🔥 Searching PANDAB services...');
      const services = await exactPANDABService.searchServices(category, minConsciousness);
      console.log('✅ Services found:', services.length);
      return services;
    } catch (error: any) {
      console.error('❌ Service search failed:', error);
      throw error;
    }
  }, []);

  const getServicesByCategory = useCallback(async (category: string) => {
    try {
      console.log(`🔥 Getting services by category: ${category}`);
      const services = await exactPANDABService.getServicesByCategory(category);
      console.log('✅ Category services found:', services.length);
      return services;
    } catch (error: any) {
      console.error('❌ Category services failed:', error);
      throw error;
    }
  }, []);

  const calculateCommissions = useCallback(async (transactionId: string) => {
    try {
      console.log(`🔥 Calculating commissions for transaction: ${transactionId}`);
      const commission = await exactPANDABService.calculateCommissions(transactionId);
      console.log('✅ Commission calculated:', commission);
      return commission;
    } catch (error: any) {
      console.error('❌ Commission calculation failed:', error);
      throw error;
    }
  }, []);

  const initiateTransaction = useCallback(async (clientId: string, serviceId: string, consciousnessLevel: bigint) => {
    try {
      console.log(`🔥 Initiating transaction for client: ${clientId}, service: ${serviceId}`);
      const transactionId = await exactPANDABService.initiateTransaction(clientId, serviceId, consciousnessLevel);
      console.log('✅ Transaction initiated:', transactionId);
      return transactionId;
    } catch (error: any) {
      console.error('❌ Transaction initiation failed:', error);
      throw error;
    }
  }, []);

  const processPayment = useCallback(async (transactionId: string, paymentMethod: string) => {
    try {
      console.log(`🔥 Processing payment for transaction: ${transactionId}`);
      const result = await exactPANDABService.processPayment(transactionId, paymentMethod);
      console.log('✅ Payment processed:', result);
      return result;
    } catch (error: any) {
      console.error('❌ Payment processing failed:', error);
      throw error;
    }
  }, []);

  return {
    // State
    ...state,
    
    // Core connection methods
    testDivineConnection,
    loadGAPCommandData,
    loadPANDABData,
    
    // GAPCommand Sacred Fire methods (6 total)
    invokeSacredFire,
    invokeVioletFlame,
    initializeGAPCommand,
    
    // PANDAB marketplace methods (14 total from your interface)
    searchServices,
    getServicesByCategory,
    calculateCommissions,
    initiateTransaction,
    processPayment,
    
    // Service instances for advanced usage
    gapCommandService: exactGAPCommandService,
    pandabService: exactPANDABService
  };
};