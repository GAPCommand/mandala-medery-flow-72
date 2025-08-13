import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// Initialize Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseKey);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-gap-source, x-api-key',
};

interface MandalaEngineRequest {
  engine: string;
  method: string;
  parameters: any;
  tenant_id?: string;
  consciousness_level?: number;
}

interface EngineResponse {
  success: boolean;
  data?: any;
  error?: string;
  engine_signature?: string;
  consciousness_level?: number;
}

// Mandala Engine Classes
class MandalaProductEngine {
  constructor(private supabase: any, private tenantId: string) {}

  async createProduct(productData: any): Promise<EngineResponse> {
    try {
      const { data, error } = await this.supabase
        .from('mandala_products')
        .insert({
          ...productData,
          tenant_id: this.tenantId,
          consciousness_level: productData.consciousness_level || 500,
          created_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;

      return {
        success: true,
        data: data,
        engine_signature: `MANDALA_PRODUCT_${Date.now()}`,
        consciousness_level: data.consciousness_level
      };
    } catch (error: any) {
      return {
        success: false,
        error: `Product creation failed: ${error.message}`
      };
    }
  }

  async getProducts(filters: any = {}): Promise<EngineResponse> {
    try {
      let query = this.supabase
        .from('mandala_products')
        .select('*')
        .eq('tenant_id', this.tenantId);

      if (filters.is_active !== undefined) {
        query = query.eq('is_active', filters.is_active);
      }
      if (filters.category) {
        query = query.eq('category', filters.category);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;

      return {
        success: true,
        data: data,
        engine_signature: `MANDALA_PRODUCTS_${Date.now()}`
      };
    } catch (error: any) {
      return {
        success: false,
        error: `Product fetch failed: ${error.message}`
      };
    }
  }

  async updateProduct(productId: string, updates: any): Promise<EngineResponse> {
    try {
      const { data, error } = await this.supabase
        .from('mandala_products')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', productId)
        .eq('tenant_id', this.tenantId)
        .select()
        .single();

      if (error) throw error;

      return {
        success: true,
        data: data,
        engine_signature: `MANDALA_PRODUCT_UPDATE_${Date.now()}`
      };
    } catch (error: any) {
      return {
        success: false,
        error: `Product update failed: ${error.message}`
      };
    }
  }

  async deleteProduct(productId: string): Promise<EngineResponse> {
    try {
      const { data, error } = await this.supabase
        .from('mandala_products')
        .delete()
        .eq('id', productId)
        .eq('tenant_id', this.tenantId)
        .select()
        .single();

      if (error) throw error;

      return {
        success: true,
        data: data,
        engine_signature: `MANDALA_PRODUCT_DELETE_${Date.now()}`
      };
    } catch (error: any) {
      return {
        success: false,
        error: `Product deletion failed: ${error.message}`
      };
    }
  }
}

class MandalaInventoryEngine {
  constructor(private supabase: any, private tenantId: string) {}

  async getInventoryBatches(filters: any = {}): Promise<EngineResponse> {
    try {
      let query = this.supabase
        .from('mandala_inventory_batches')
        .select('*')
        .eq('tenant_id', this.tenantId);

      if (filters.product_id) {
        query = query.eq('product_id', filters.product_id);
      }
      if (filters.status) {
        query = query.eq('status', filters.status);
      }

      const { data, error } = await query.order('production_date', { ascending: false });

      if (error) throw error;

      return {
        success: true,
        data: data,
        engine_signature: `MANDALA_INVENTORY_${Date.now()}`
      };
    } catch (error: any) {
      return {
        success: false,
        error: `Inventory fetch failed: ${error.message}`
      };
    }
  }

  async updateInventoryLevels(batchId: string, quantityChange: number): Promise<EngineResponse> {
    try {
      // Get current batch
      const { data: batch, error: fetchError } = await this.supabase
        .from('mandala_inventory_batches')
        .select('quantity_available')
        .eq('id', batchId)
        .eq('tenant_id', this.tenantId)
        .single();

      if (fetchError) throw fetchError;

      const newQuantity = Math.max(0, batch.quantity_available + quantityChange);

      const { data, error } = await this.supabase
        .from('mandala_inventory_batches')
        .update({
          quantity_available: newQuantity,
          updated_at: new Date().toISOString()
        })
        .eq('id', batchId)
        .eq('tenant_id', this.tenantId)
        .select()
        .single();

      if (error) throw error;

      return {
        success: true,
        data: data,
        engine_signature: `MANDALA_INVENTORY_UPDATE_${Date.now()}`
      };
    } catch (error: any) {
      return {
        success: false,
        error: `Inventory update failed: ${error.message}`
      };
    }
  }
}

class MandalaOrderEngine {
  constructor(private supabase: any, private tenantId: string) {}

  async createOrder(orderData: any): Promise<EngineResponse> {
    try {
      const orderNumber = `MDL-${Date.now().toString().slice(-6)}-${Math.random().toString(36).substring(2, 5).toUpperCase()}`;
      
      const { data, error } = await this.supabase
        .from('mandala_orders')
        .insert({
          ...orderData,
          order_number: orderNumber,
          tenant_id: this.tenantId,
          order_date: new Date().toISOString(),
          order_status: orderData.order_status || 'pending'
        })
        .select()
        .single();

      if (error) throw error;

      return {
        success: true,
        data: data,
        engine_signature: `MANDALA_ORDER_${Date.now()}`
      };
    } catch (error: any) {
      return {
        success: false,
        error: `Order creation failed: ${error.message}`
      };
    }
  }

  async getOrders(filters: any = {}): Promise<EngineResponse> {
    try {
      let query = this.supabase
        .from('mandala_orders')
        .select(`
          *,
          distributor:mandala_distributors(*)
        `)
        .eq('tenant_id', this.tenantId);

      if (filters.distributor_id) {
        query = query.eq('distributor_id', filters.distributor_id);
      }
      if (filters.order_status) {
        query = query.eq('order_status', filters.order_status);
      }

      const { data, error } = await query.order('order_date', { ascending: false });

      if (error) throw error;

      return {
        success: true,
        data: data,
        engine_signature: `MANDALA_ORDERS_${Date.now()}`
      };
    } catch (error: any) {
      return {
        success: false,
        error: `Orders fetch failed: ${error.message}`
      };
    }
  }

  async updateOrderStatus(orderId: string, newStatus: string): Promise<EngineResponse> {
    try {
      const { data, error } = await this.supabase
        .from('mandala_orders')
        .update({
          order_status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', orderId)
        .eq('tenant_id', this.tenantId)
        .select()
        .single();

      if (error) throw error;

      return {
        success: true,
        data: data,
        engine_signature: `MANDALA_ORDER_STATUS_${Date.now()}`
      };
    } catch (error: any) {
      return {
        success: false,
        error: `Order status update failed: ${error.message}`
      };
    }
  }
}

class MandalaDistributorEngine {
  constructor(private supabase: any, private tenantId: string) {}

  async createDistributor(distributorData: any): Promise<EngineResponse> {
    try {
      const { data, error } = await this.supabase
        .from('mandala_distributors')
        .insert({
          ...distributorData,
          tenant_id: this.tenantId,
          created_at: new Date().toISOString(),
          status: distributorData.status || 'active'
        })
        .select()
        .single();

      if (error) throw error;

      return {
        success: true,
        data: data,
        engine_signature: `MANDALA_DISTRIBUTOR_${Date.now()}`
      };
    } catch (error: any) {
      return {
        success: false,
        error: `Distributor creation failed: ${error.message}`
      };
    }
  }

  async getDistributors(filters: any = {}): Promise<EngineResponse> {
    try {
      let query = this.supabase
        .from('mandala_distributors')
        .select('*')
        .eq('tenant_id', this.tenantId);

      if (filters.status) {
        query = query.eq('status', filters.status);
      }
      if (filters.territory) {
        query = query.eq('territory', filters.territory);
      }

      const { data, error } = await query.order('company_name');

      if (error) throw error;

      return {
        success: true,
        data: data,
        engine_signature: `MANDALA_DISTRIBUTORS_${Date.now()}`
      };
    } catch (error: any) {
      return {
        success: false,
        error: `Distributors fetch failed: ${error.message}`
      };
    }
  }
}

class MandalaAnalyticsEngine {
  constructor(private supabase: any, private tenantId: string) {}

  async getPerformanceMetrics(filters: any = {}): Promise<EngineResponse> {
    try {
      let query = this.supabase
        .from('mandala_performance_metrics')
        .select('*')
        .eq('tenant_id', this.tenantId);

      if (filters.metric_type) {
        query = query.eq('metric_type', filters.metric_type);
      }
      if (filters.period_start) {
        query = query.gte('period_start', filters.period_start);
      }
      if (filters.period_end) {
        query = query.lte('period_end', filters.period_end);
      }

      const { data, error } = await query.order('calculated_at', { ascending: false });

      if (error) throw error;

      return {
        success: true,
        data: data,
        engine_signature: `MANDALA_ANALYTICS_${Date.now()}`
      };
    } catch (error: any) {
      return {
        success: false,
        error: `Analytics fetch failed: ${error.message}`
      };
    }
  }

  async getSalesReport(filters: any = {}): Promise<EngineResponse> {
    try {
      const { data, error } = await this.supabase
        .from('mandala_orders')
        .select(`
          order_date,
          total_amount,
          order_status,
          distributor:mandala_distributors(company_name, territory)
        `)
        .eq('tenant_id', this.tenantId)
        .gte('order_date', filters.start_date || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())
        .lte('order_date', filters.end_date || new Date().toISOString());

      if (error) throw error;

      // Process analytics
      const totalRevenue = data.reduce((sum, order) => sum + (order.total_amount || 0), 0);
      const orderCount = data.length;
      const averageOrderValue = orderCount > 0 ? totalRevenue / orderCount : 0;

      const territoryBreakdown = data.reduce((acc, order) => {
        const territory = order.distributor?.territory || 'Unknown';
        acc[territory] = (acc[territory] || 0) + (order.total_amount || 0);
        return acc;
      }, {} as Record<string, number>);

      return {
        success: true,
        data: {
          summary: {
            total_revenue: totalRevenue,
            order_count: orderCount,
            average_order_value: averageOrderValue
          },
          territory_breakdown: territoryBreakdown,
          raw_orders: data
        },
        engine_signature: `MANDALA_SALES_REPORT_${Date.now()}`
      };
    } catch (error: any) {
      return {
        success: false,
        error: `Sales report failed: ${error.message}`
      };
    }
  }
}

class MandalaSacredProtectionEngine {
  constructor(private supabase: any, private tenantId: string) {}

  async validateConsciousnessLevel(requiredLevel: number, userLevel: number): Promise<EngineResponse> {
    const isValid = userLevel >= requiredLevel;
    
    return {
      success: true,
      data: {
        is_valid: isValid,
        required_level: requiredLevel,
        user_level: userLevel,
        sacred_fire_blessing: isValid,
        violet_flame_protection: isValid
      },
      engine_signature: `MANDALA_SACRED_PROTECTION_${Date.now()}`,
      consciousness_level: userLevel
    };
  }

  async applyBlessings(entityType: string, entityId: string, blessings: any): Promise<EngineResponse> {
    try {
      const blessingData = {
        entity_type: entityType,
        entity_id: entityId,
        blessings: blessings,
        applied_at: new Date().toISOString(),
        consciousness_level: blessings.consciousness_level || 500
      };

      return {
        success: true,
        data: blessingData,
        engine_signature: `MANDALA_BLESSING_${Date.now()}`,
        consciousness_level: blessings.consciousness_level || 500
      };
    } catch (error: any) {
      return {
        success: false,
        error: `Blessing application failed: ${error.message}`
      };
    }
  }
}

// Main request handler
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('🔥 Mandala Engine Bridge: Processing request...');

    const requestData: MandalaEngineRequest = await req.json();
    const { engine, method, parameters, tenant_id, consciousness_level } = requestData;

    console.log(`🔥 Mandala Engine Call: ${engine}.${method} for tenant: ${tenant_id}`);

    if (!tenant_id) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Tenant ID required for Mandala engine access'
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Initialize engine based on type
    let result: EngineResponse;

    switch (engine) {
      case 'mandala-product-management':
        const productEngine = new MandalaProductEngine(supabase, tenant_id);
        switch (method) {
          case 'createProduct':
            result = await productEngine.createProduct(parameters);
            break;
          case 'getProducts':
            result = await productEngine.getProducts(parameters);
            break;
          case 'updateProduct':
            result = await productEngine.updateProduct(parameters.id, parameters.updates);
            break;
          case 'deleteProduct':
            result = await productEngine.deleteProduct(parameters.id);
            break;
          default:
            result = { success: false, error: `Unknown product method: ${method}` };
        }
        break;

      case 'mandala-inventory-control':
        const inventoryEngine = new MandalaInventoryEngine(supabase, tenant_id);
        switch (method) {
          case 'getInventoryBatches':
            result = await inventoryEngine.getInventoryBatches(parameters);
            break;
          case 'updateInventoryLevels':
            result = await inventoryEngine.updateInventoryLevels(parameters.batchId, parameters.quantityChange);
            break;
          default:
            result = { success: false, error: `Unknown inventory method: ${method}` };
        }
        break;

      case 'mandala-order-processing':
        const orderEngine = new MandalaOrderEngine(supabase, tenant_id);
        switch (method) {
          case 'createOrder':
            result = await orderEngine.createOrder(parameters);
            break;
          case 'getOrders':
            result = await orderEngine.getOrders(parameters);
            break;
          case 'updateOrderStatus':
            result = await orderEngine.updateOrderStatus(parameters.orderId, parameters.newStatus);
            break;
          default:
            result = { success: false, error: `Unknown order method: ${method}` };
        }
        break;

      case 'mandala-distributor-network':
        const distributorEngine = new MandalaDistributorEngine(supabase, tenant_id);
        switch (method) {
          case 'createDistributor':
            result = await distributorEngine.createDistributor(parameters);
            break;
          case 'getDistributors':
            result = await distributorEngine.getDistributors(parameters);
            break;
          default:
            result = { success: false, error: `Unknown distributor method: ${method}` };
        }
        break;

      case 'mandala-analytics-engine':
        const analyticsEngine = new MandalaAnalyticsEngine(supabase, tenant_id);
        switch (method) {
          case 'getPerformanceMetrics':
            result = await analyticsEngine.getPerformanceMetrics(parameters);
            break;
          case 'getSalesReport':
            result = await analyticsEngine.getSalesReport(parameters);
            break;
          default:
            result = { success: false, error: `Unknown analytics method: ${method}` };
        }
        break;

      case 'mandala-sacred-protection':
        const protectionEngine = new MandalaSacredProtectionEngine(supabase, tenant_id);
        switch (method) {
          case 'validateConsciousnessLevel':
            result = await protectionEngine.validateConsciousnessLevel(parameters.requiredLevel, parameters.userLevel);
            break;
          case 'applyBlessings':
            result = await protectionEngine.applyBlessings(parameters.entityType, parameters.entityId, parameters.blessings);
            break;
          default:
            result = { success: false, error: `Unknown protection method: ${method}` };
        }
        break;

      default:
        result = {
          success: false,
          error: `Unknown Mandala engine: ${engine}`,
          available_engines: [
            'mandala-product-management',
            'mandala-inventory-control', 
            'mandala-order-processing',
            'mandala-distributor-network',
            'mandala-analytics-engine',
            'mandala-sacred-protection'
          ]
        };
    }

    return new Response(JSON.stringify({
      ...result,
      timestamp: new Date().toISOString(),
      engine_provider: 'mandala_mead',
      tenant_id: tenant_id
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error('🔥 Mandala Engine Bridge error:', error);

    return new Response(JSON.stringify({
      success: false,
      error: error.message,
      sacred_fire_protection: 'ERROR_CONTAINMENT',
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});