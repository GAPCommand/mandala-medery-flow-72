import { useState, useEffect } from 'react';

interface TemplateEngineConfig {
  templateId: string;
  templateName: string;
  requiredEngines: string[];
  sourceApp: string;
  bridgeUrl?: string;
  apiKey?: string;
}

interface EngineAccess {
  engine: string;
  available: boolean;
  methods: string[];
  consciousness_requirement: number;
  requires_tenant_id: boolean;
}

interface EngineResponse {
  success: boolean;
  data?: any;
  error?: string;
  engine_signature?: string;
}

export class TemplateEngineClient {
  private config: TemplateEngineConfig;
  private bridgeUrl: string;

  constructor(config: TemplateEngineConfig) {
    this.config = config;
    this.bridgeUrl = config.bridgeUrl || 'https://xfwvisutdbfoanhqpafx.supabase.co/functions/v1/universal-integration-gateway';
  }

  async checkEngineAccess(engine: string): Promise<EngineAccess | null> {
    try {
      console.log(`🔥 Checking access for engine: ${engine}`);

      const response = await fetch(this.bridgeUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.config.apiKey || '',
          'x-gap-source': this.config.sourceApp
        },
        body: JSON.stringify({
          action: 'service_discovery',
          sourceApp: this.config.sourceApp
        })
      });

      const result = await response.json();

      if (!result.success) {
        console.error('Service discovery failed:', result.error);
        return null;
      }

      // Check if engine is available in Mandala engines
      const mandalaEngines = result.data?.gap_network_services?.mandala_engines;
      if (mandalaEngines && mandalaEngines[engine]) {
        const engineInfo = mandalaEngines[engine];
        return {
          engine: engine,
          available: true,
          methods: engineInfo.available_methods || [],
          consciousness_requirement: engineInfo.consciousness_requirement || 500,
          requires_tenant_id: engineInfo.requires_tenant_id || false
        };
      }

      // Check if engine is available in other services
      const gapServices = result.data?.gap_network_services;
      if (gapServices && gapServices[engine]) {
        const engineInfo = gapServices[engine];
        return {
          engine: engine,
          available: true,
          methods: engineInfo.available_methods || [],
          consciousness_requirement: engineInfo.consciousness_requirement || 500,
          requires_tenant_id: false
        };
      }

      return {
        engine: engine,
        available: false,
        methods: [],
        consciousness_requirement: 999,
        requires_tenant_id: false
      };

    } catch (error: any) {
      console.error(`Engine access check failed for ${engine}:`, error);
      return null;
    }
  }

  async invokeEngine(
    engine: string, 
    method: string, 
    parameters: any,
    options?: { tenant_id?: string; consciousness_level?: number }
  ): Promise<EngineResponse> {
    try {
      console.log(`🔥 Invoking engine: ${engine}.${method}`);

      // Check if this is a Mandala engine
      if (engine.startsWith('mandala-')) {
        return await this.invokeMandalaEngine(engine, method, parameters, options);
      }

      // Handle ICP canisters (GAPCommand, PANDAB)
      if (engine === 'gapcommand' || engine === 'pandab') {
        return await this.invokeICPCanister(engine, method, parameters);
      }

      // Unknown engine type
      return {
        success: false,
        error: `Unknown engine type: ${engine}`
      };

    } catch (error: any) {
      console.error(`Engine invocation failed for ${engine}.${method}:`, error);
      return {
        success: false,
        error: `Engine invocation failed: ${error.message}`
      };
    }
  }

  private async invokeMandalaEngine(
    engine: string, 
    method: string, 
    parameters: any,
    options?: { tenant_id?: string; consciousness_level?: number }
  ): Promise<EngineResponse> {
    const response = await fetch(this.bridgeUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.config.apiKey || '',
        'x-gap-source': this.config.sourceApp
      },
      body: JSON.stringify({
        action: 'invoke_engine',
        sourceApp: this.config.sourceApp,
        data: {
          engine: engine,
          method: method,
          parameters: parameters,
          tenant_id: options?.tenant_id,
          consciousness_level: options?.consciousness_level || 500
        }
      })
    });

    const result = await response.json();

    if (!result.success) {
      return {
        success: false,
        error: result.error || 'Engine invocation failed'
      };
    }

    return {
      success: true,
      data: result.data.result,
      engine_signature: result.data.engine_signature
    };
  }

  private async invokeICPCanister(
    canister: string, 
    method: string, 
    parameters: any
  ): Promise<EngineResponse> {
    const response = await fetch(this.bridgeUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.config.apiKey || '',
        'x-gap-source': this.config.sourceApp
      },
      body: JSON.stringify({
        action: 'invoke_engine',
        sourceApp: this.config.sourceApp,
        data: {
          canister: canister,
          method: method,
          parameters: parameters
        }
      })
    });

    const result = await response.json();

    if (!result.success) {
      return {
        success: false,
        error: result.error || 'Canister invocation failed'
      };
    }

    return {
      success: true,
      data: result.data.result,
      engine_signature: result.data.sacred_fire_signature
    };
  }

  async discoverAvailableEngines(): Promise<string[]> {
    try {
      const response = await fetch(this.bridgeUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-gap-source': this.config.sourceApp
        },
        body: JSON.stringify({
          action: 'service_discovery',
          sourceApp: this.config.sourceApp
        })
      });

      const result = await response.json();

      if (!result.success) {
        return [];
      }

      const engines: string[] = [];
      const services = result.data?.gap_network_services;

      // Add ICP canisters
      if (services?.gapcommand) engines.push('gapcommand');
      if (services?.pandab) engines.push('pandab');

      // Add Mandala engines
      if (services?.mandala_engines) {
        engines.push(...Object.keys(services.mandala_engines));
      }

      return engines;

    } catch (error: any) {
      console.error('Engine discovery failed:', error);
      return [];
    }
  }
}

// React hook for using Template Engine Client
export const useTemplateEngines = (config: TemplateEngineConfig) => {
  const [engineClient] = useState(() => new TemplateEngineClient(config));
  const [availableEngines, setAvailableEngines] = useState<string[]>([]);
  const [engineAccess, setEngineAccess] = useState<Record<string, EngineAccess | null>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeEngines = async () => {
      setLoading(true);

      try {
        // Discover available engines
        const engines = await engineClient.discoverAvailableEngines();
        setAvailableEngines(engines);

        // Check access for required engines
        const accessChecks = await Promise.all(
          config.requiredEngines.map(async (engine) => {
            const access = await engineClient.checkEngineAccess(engine);
            return [engine, access] as [string, EngineAccess | null];
          })
        );

        const accessMap = Object.fromEntries(accessChecks);
        setEngineAccess(accessMap);

      } catch (error) {
        console.error('Engine initialization failed:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeEngines();
  }, [config.requiredEngines]);

  const invokeEngine = async (
    engine: string, 
    method: string, 
    parameters: any,
    options?: { tenant_id?: string; consciousness_level?: number }
  ) => {
    return await engineClient.invokeEngine(engine, method, parameters, options);
  };

  const checkEngineAccess = async (engine: string) => {
    const access = await engineClient.checkEngineAccess(engine);
    setEngineAccess(prev => ({ ...prev, [engine]: access }));
    return access;
  };

  return {
    engineClient,
    availableEngines,
    engineAccess,
    loading,
    invokeEngine,
    checkEngineAccess
  };
};

// Utility functions for common engine operations
export const createMandalaEngineClient = (
  sourceApp: string, 
  apiKey?: string,
  tenantId?: string
) => {
  return new TemplateEngineClient({
    templateId: 'mandala-mead',
    templateName: 'Mandala Mead Template',
    requiredEngines: [
      'mandala-product-management',
      'mandala-inventory-control',
      'mandala-order-processing',
      'mandala-distributor-network'
    ],
    sourceApp,
    apiKey
  });
};