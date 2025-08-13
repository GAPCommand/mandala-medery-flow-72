import { useState } from 'react';
import { engineRouter, EngineRequest, EngineResponse } from '@/lib/engineRouter';
import { TEMPLATE_SYSTEM_CONFIG } from '@/config/template.config';

export const useEngineRouter = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const callEngine = async (request: EngineRequest): Promise<EngineResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      let result: EngineResponse;

      if (TEMPLATE_SYSTEM_CONFIG.mockDataEnabled) {
        result = await engineRouter.getMockData(request.engine, request.method, request.parameters);
      } else {
        result = await engineRouter.routeEngineCall(request);
      }

      if (!result.success) {
        setError(result.error || 'Engine call failed');
      }

      return result;
    } catch (err: any) {
      const errorMessage = err.message || 'Unknown error occurred';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    } finally {
      setIsLoading(false);
    }
  };

  const getProducts = async (filters?: any) => {
    return callEngine({
      engine: 'MandalaProductEngine',
      method: 'getProducts',
      parameters: filters || {}
    });
  };

  const createProduct = async (productData: any) => {
    return callEngine({
      engine: 'MandalaProductEngine',
      method: 'createProduct',
      parameters: productData
    });
  };

  const getInventoryLevels = async () => {
    return callEngine({
      engine: 'MandalaInventoryEngine',
      method: 'getBatchLevels',
      parameters: {}
    });
  };

  const getOrders = async (filters?: any) => {
    return callEngine({
      engine: 'MandalaOrderEngine',
      method: 'getOrders',
      parameters: filters || {}
    });
  };

  const createOrder = async (orderData: any) => {
    return callEngine({
      engine: 'MandalaOrderEngine',
      method: 'createOrder',
      parameters: orderData
    });
  };

  return {
    callEngine,
    getProducts,
    createProduct,
    getInventoryLevels,
    getOrders,
    createOrder,
    isLoading,
    error,
    systemMode: TEMPLATE_SYSTEM_CONFIG.mode,
    mockDataEnabled: TEMPLATE_SYSTEM_CONFIG.mockDataEnabled
  };
};