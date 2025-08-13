import { TEMPLATE_SYSTEM_CONFIG, TemplateMode } from '@/config/template.config';
import { TemplateEngineClient } from './templateEngineClient';
import { getMockData, simulateApiDelay } from './mockData';

export interface EngineRequest {
  engine: string;
  method: string;
  parameters: any;
  tenant_id?: string;
  consciousness_level?: number;
}

export interface EngineResponse {
  success: boolean;
  data?: any;
  error?: string;
  engine_signature?: string;
  source?: 'local' | 'remote' | 'mock';
}

export class EngineRouter {
  private templateEngineClient?: TemplateEngineClient;
  
  constructor() {
    if (TEMPLATE_SYSTEM_CONFIG.mode === 'TEMPLATE' && TEMPLATE_SYSTEM_CONFIG.masterEngineUrl) {
      this.templateEngineClient = new TemplateEngineClient({
        templateId: 'mandala-sacred-commerce',
        templateName: 'Mandala Sacred Commerce',
        requiredEngines: ['MandalaProductEngine', 'MandalaInventoryEngine', 'MandalaOrderEngine'],
        sourceApp: 'template-instance',
        bridgeUrl: `${TEMPLATE_SYSTEM_CONFIG.masterEngineUrl}/universal-integration-gateway`,
        apiKey: TEMPLATE_SYSTEM_CONFIG.apiKey
      });
    }
  }

  async routeEngineCall(request: EngineRequest): Promise<EngineResponse> {
    if (TEMPLATE_SYSTEM_CONFIG.mode === 'MASTER') {
      return this.callLocalEngine(request);
    } else {
      return this.callRemoteEngine(request);
    }
  }

  private async callLocalEngine(request: EngineRequest): Promise<EngineResponse> {
    try {
      // Call local Supabase edge function
      const response = await fetch(`${window.location.origin}/functions/v1/mandala-engine-bridge`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-gap-source': 'mandala-master'
        },
        body: JSON.stringify(request)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return { ...result, source: 'local' };
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
        source: 'local'
      };
    }
  }

  private async callRemoteEngine(request: EngineRequest): Promise<EngineResponse> {
    if (!this.templateEngineClient) {
      return {
        success: false,
        error: 'Remote engine client not configured',
        source: 'remote'
      };
    }

    try {
      const result = await this.templateEngineClient.invokeEngine(
        request.engine,
        request.method,
        request.parameters,
        {
          tenant_id: request.tenant_id,
          consciousness_level: request.consciousness_level
        }
      );
      
      return { ...result, source: 'remote' };
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
        source: 'remote'
      };
    }
  }

  async getMockData(engine: string, method: string, parameters?: any): Promise<EngineResponse> {
    // Simulate API delay for realistic demo
    await simulateApiDelay(300);
    
    try {
      let data;
      
      switch (engine) {
        case 'MandalaProductEngine':
          data = this.handleProductMockData(method, parameters);
          break;
        case 'MandalaInventoryEngine':
          data = this.handleInventoryMockData(method, parameters);
          break;
        case 'MandalaOrderEngine':
          data = this.handleOrderMockData(method, parameters);
          break;
        case 'MandalaDistributorEngine':
          data = this.handleDistributorMockData(method, parameters);
          break;
        case 'MandalaAnalyticsEngine':
          data = this.handleAnalyticsMockData(method, parameters);
          break;
        default:
          throw new Error(`Mock engine ${engine} not implemented`);
      }
      
      return {
        success: true,
        data,
        engine_signature: `mock_${engine.toLowerCase()}_v1.0`,
        source: 'mock'
      };
      
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
        source: 'mock'
      };
    }
  }

  private handleProductMockData(method: string, parameters?: any) {
    const products = getMockData('products', parameters?.filters) as any[];
    
    switch (method) {
      case 'getProducts':
        return products;
      case 'getProduct':
        return products.find((p: any) => p.id === parameters?.id) || null;
      case 'createProduct':
        return { id: `mock-${Date.now()}`, ...parameters, created: true };
      case 'updateProduct':
        return { id: parameters?.id, updated: true };
      case 'deleteProduct':
        return { id: parameters?.id, deleted: true };
      default:
        throw new Error(`Product method ${method} not supported`);
    }
  }

  private handleInventoryMockData(method: string, parameters?: any) {
    const inventory = getMockData('inventory', parameters?.filters) as any[];
    
    switch (method) {
      case 'getBatchLevels':
        return inventory;
      case 'updateInventoryLevels':
        return { batch_id: parameters?.batch_id, updated: true, new_level: parameters?.level };
      default:
        throw new Error(`Inventory method ${method} not supported`);
    }
  }

  private handleOrderMockData(method: string, parameters?: any) {
    const orders = getMockData('orders', parameters?.filters) as any[];
    
    switch (method) {
      case 'getOrders':
        return orders;
      case 'getOrder':
        return orders.find((o: any) => o.id === parameters?.id) || null;
      case 'createOrder':
        return { id: `ORD-${Date.now()}`, ...parameters, status: 'pending', created: true };
      case 'updateOrderStatus':
        return { id: parameters?.id, status: parameters?.status, updated: true };
      default:
        throw new Error(`Order method ${method} not supported`);
    }
  }

  private handleDistributorMockData(method: string, parameters?: any) {
    const distributors = getMockData('distributors', parameters?.filters) as any[];
    
    switch (method) {
      case 'getDistributors':
        return distributors;
      case 'createDistributor':
        return { id: `dist-${Date.now()}`, ...parameters, created: true };
      default:
        throw new Error(`Distributor method ${method} not supported`);
    }
  }

  private handleAnalyticsMockData(method: string, parameters?: any) {
    const analytics = getMockData('analytics') as any;
    
    switch (method) {
      case 'getPerformanceMetrics':
        return analytics.sales_metrics;
      case 'getSalesReport':
        return analytics.product_performance;
      case 'getCustomerInsights':
        return analytics.customer_insights;
      default:
        throw new Error(`Analytics method ${method} not supported`);
    }
  }
}

// Global instance
export const engineRouter = new EngineRouter();