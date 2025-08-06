import { supabase } from "@/integrations/supabase/client";
import type { SacredTenant } from "@/contexts/TenantContext";

export class MultiTenantSupabaseService {
  private static instance: MultiTenantSupabaseService;
  private currentTenant: SacredTenant | null = null;

  private constructor() {}

  static getInstance(): MultiTenantSupabaseService {
    if (!MultiTenantSupabaseService.instance) {
      MultiTenantSupabaseService.instance = new MultiTenantSupabaseService();
    }
    return MultiTenantSupabaseService.instance;
  }

  setCurrentTenant(tenant: SacredTenant | null) {
    this.currentTenant = tenant;
  }

  getCurrentTenant(): SacredTenant | null {
    return this.currentTenant;
  }

  private validateTenant() {
    if (!this.currentTenant?.id) {
      throw new Error('No tenant context - all database operations require tenant isolation');
    }
  }

  // Tenant-scoped SELECT operations
  select(table: string, query?: string) {
    this.validateTenant();
    
    let builder = supabase.from(table as any).select(query || '*');
    
    // Apply tenant filter to all tenant-aware tables
    if (this.isTenantAwareTable(table)) {
      builder = builder.eq('tenant_id', this.currentTenant!.id);
    }
    
    return builder;
  }

  // Tenant-scoped INSERT operations
  insert(table: string, data: any | any[]) {
    this.validateTenant();
    
    // Ensure tenant_id is set for tenant-aware tables
    if (this.isTenantAwareTable(table)) {
      if (Array.isArray(data)) {
        data = data.map(item => ({ ...item, tenant_id: this.currentTenant!.id }));
      } else {
        data = { ...data, tenant_id: this.currentTenant!.id };
      }
    }
    
    return supabase.from(table as any).insert(data);
  }

  // Tenant-scoped UPDATE operations
  update(table: string, data: any) {
    this.validateTenant();
    
    let builder = supabase.from(table as any).update(data);
    
    // Apply tenant filter to prevent cross-tenant updates
    if (this.isTenantAwareTable(table)) {
      builder = builder.eq('tenant_id', this.currentTenant!.id);
    }
    
    return builder;
  }

  // Tenant-scoped DELETE operations
  delete(table: string) {
    this.validateTenant();
    
    let builder = supabase.from(table as any).delete();
    
    // Apply tenant filter to prevent cross-tenant deletes
    if (this.isTenantAwareTable(table)) {
      builder = builder.eq('tenant_id', this.currentTenant!.id);
    }
    
    return builder;
  }

  // Execute RPC functions with tenant context
  rpc(functionName: string, params?: any) {
    this.validateTenant();
    
    // Add tenant context to RPC parameters
    const tenantParams = {
      ...params,
      p_tenant_id: this.currentTenant!.id
    };
    
    return supabase.rpc(functionName as any, tenantParams);
  }

  // Check if table requires tenant isolation
  private isTenantAwareTable(table: string): boolean {
    const tenantTables = [
      'mandala_products',
      'mandala_distributors', 
      'mandala_orders',
      'mandala_inventory_batches',
      'mandala_sales_territories',
      'mandala_performance_metrics',
      'mandala_shipments',
      'tenant_users'
    ];
    
    return tenantTables.includes(table);
  }

  // Validate tenant access for specific operations
  async validateTenantAccess(tenantId: string): Promise<boolean> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return false;

      const { data } = await supabase
        .from('tenant_users')
        .select('role, is_active')
        .eq('tenant_id', tenantId)
        .eq('user_id', user.id)
        .eq('is_active', true)
        .single();

      return !!data;
    } catch (error) {
      console.error('Tenant access validation failed:', error);
      return false;
    }
  }

  // Get tenant-specific configuration
  async getTenantConfig(): Promise<any> {
    this.validateTenant();
    
    return {
      tenant_id: this.currentTenant!.id,
      subdomain: this.currentTenant!.subdomain,
      consciousness_level: this.currentTenant!.consciousness_level,
      feature_flags: this.currentTenant!.feature_flags
    };
  }

  // Emergency tenant isolation check
  async emergencyIsolationCheck(): Promise<boolean> {
    if (!this.currentTenant) {
      console.error('CRITICAL: No tenant context detected - blocking all operations');
      return false;
    }

    // Verify tenant still exists and is active
    const { data } = await supabase
      .from('sacred_tenants')
      .select('status')
      .eq('id', this.currentTenant.id)
      .single();

    if (!data || data.status !== 'active') {
      console.error('CRITICAL: Tenant not found or inactive - blocking operations');
      this.currentTenant = null;
      return false;
    }

    return true;
  }
}

// Export singleton instance
export const tenantService = MultiTenantSupabaseService.getInstance();