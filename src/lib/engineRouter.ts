import { TEMPLATE_SYSTEM_CONFIG, TemplateMode } from '@/config/template.config';
import { TemplateEngineClient } from './templateEngineClient';

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
  source?: 'local' | 'remote';
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

  async getMockData(engine: string, method: string): Promise<EngineResponse> {
    // Mock data for template development/demos
    const mockResponses: Record<string, Record<string, any>> = {
      MandalaProductEngine: {
        getProducts: {
          success: true,
          data: [
            { id: 'mock-1', name: 'Sacred Honey Mead', price: 4999, consciousness_level: 800 },
            { id: 'mock-2', name: 'Divine Elixir', price: 7999, consciousness_level: 900 }
          ]
        },
        createProduct: {
          success: true,
          data: { id: 'mock-new', name: 'New Product', created: true }
        }
      },
      MandalaInventoryEngine: {
        getBatchLevels: {
          success: true,
          data: [
            { batch_id: 'B001', current_level: 150, status: 'optimal' },
            { batch_id: 'B002', current_level: 75, status: 'low' }
          ]
        }
      },
      MandalaOrderEngine: {
        getOrders: {
          success: true,
          data: [
            { id: 'O001', status: 'pending', total: 12999, created_at: new Date().toISOString() }
          ]
        }
      }
    };

    return mockResponses[engine]?.[method] || {
      success: false,
      error: `Mock data not available for ${engine}.${method}`
    };
  }
}

// Global instance
export const engineRouter = new EngineRouter();