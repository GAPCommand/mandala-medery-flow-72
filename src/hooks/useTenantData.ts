import { useState, useEffect } from 'react';
import { tenantService } from '@/services/MultiTenantSupabaseService';
import { useTenant } from '@/contexts/TenantContext';
import type { 
  MandalaProduct, 
  MandalaDistributor, 
  MandalaOrder, 
  MandalaInventoryBatch,
  MandalaSalesTerritory,
  MandalaPerformanceMetric,
  MandalaShipment 
} from './useMandalaData';

export const useTenantData = () => {
  const { currentTenant, loading: tenantLoading } = useTenant();
  const [products, setProducts] = useState<MandalaProduct[]>([]);
  const [distributors, setDistributors] = useState<MandalaDistributor[]>([]);
  const [orders, setOrders] = useState<MandalaOrder[]>([]);
  const [inventoryBatches, setInventoryBatches] = useState<MandalaInventoryBatch[]>([]);
  const [salesTerritories, setSalesTerritories] = useState<MandalaSalesTerritory[]>([]);
  const [performanceMetrics, setPerformanceMetrics] = useState<MandalaPerformanceMetric[]>([]);
  const [shipments, setShipments] = useState<MandalaShipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Update tenant service when tenant changes
  useEffect(() => {
    tenantService.setCurrentTenant(currentTenant);
  }, [currentTenant]);

  const fetchProducts = async () => {
    try {
      console.log('Fetching tenant-isolated products');
      const { data, error } = await tenantService
        .select('mandala_products', '*')
        .eq('is_active', true);
      
      if (error) throw error;
      console.log('Tenant products fetched:', data?.length || 0);
      setProducts((data as unknown as MandalaProduct[]) || []);
    } catch (error) {
      console.error('Error fetching tenant products:', error);
      setError('Failed to load products');
    }
  };

  const fetchDistributors = async () => {
    try {
      console.log('Fetching tenant-isolated distributors');
      const { data, error } = await tenantService.select('mandala_distributors');
      
      if (error) throw error;
      console.log('Tenant distributors fetched:', data?.length || 0);
      setDistributors((data as unknown as MandalaDistributor[]) || []);
    } catch (error) {
      console.error('Error fetching tenant distributors:', error);
      setError('Failed to load distributors');
    }
  };

  const fetchOrders = async () => {
    try {
      console.log('Fetching tenant-isolated orders');
      const { data, error } = await tenantService
        .select('mandala_orders', `
          *,
          distributor:mandala_distributors(*)
        `)
        .order('order_date', { ascending: false });
      
      if (error) throw error;
      console.log('Tenant orders fetched:', data?.length || 0);
      setOrders((data as unknown as MandalaOrder[]) || []);
    } catch (error) {
      console.error('Error fetching tenant orders:', error);
      setError('Failed to load orders');
    }
  };

  const fetchInventoryBatches = async () => {
    try {
      console.log('Fetching tenant-isolated inventory');
      const { data, error } = await tenantService
        .select('mandala_inventory_batches')
        .order('production_date', { ascending: false });
      
      if (error) throw error;
      console.log('Tenant inventory fetched:', data?.length || 0);
      setInventoryBatches((data as unknown as MandalaInventoryBatch[]) || []);
    } catch (error) {
      console.error('Error fetching tenant inventory:', error);
      setError('Failed to load inventory');
    }
  };

  const fetchSalesTerritories = async () => {
    try {
      console.log('Fetching tenant-isolated territories');
      const { data, error } = await tenantService
        .select('mandala_sales_territories')
        .eq('is_active', true)
        .order('territory_name');
      
      if (error) throw error;
      console.log('Tenant territories fetched:', data?.length || 0);
      setSalesTerritories((data as unknown as MandalaSalesTerritory[]) || []);
    } catch (error) {
      console.error('Error fetching tenant territories:', error);
      setError('Failed to load territories');
    }
  };

  const fetchPerformanceMetrics = async () => {
    try {
      console.log('Fetching tenant-isolated metrics');
      const { data, error } = await tenantService
        .select('mandala_performance_metrics')
        .order('calculated_at', { ascending: false })
        .limit(20);
      
      if (error) throw error;
      console.log('Tenant metrics fetched:', data?.length || 0);
      setPerformanceMetrics((data as unknown as MandalaPerformanceMetric[]) || []);
    } catch (error) {
      console.error('Error fetching tenant metrics:', error);
      setError('Failed to load metrics');
    }
  };

  const fetchShipments = async () => {
    try {
      console.log('Fetching tenant-isolated shipments');
      const { data, error } = await tenantService
        .select('mandala_shipments')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      console.log('Tenant shipments fetched:', data?.length || 0);
      setShipments((data as unknown as MandalaShipment[]) || []);
    } catch (error) {
      console.error('Error fetching tenant shipments:', error);
      setError('Failed to load shipments');
    }
  };

  // Create operations with tenant isolation
  const createProduct = async (productData: Partial<MandalaProduct>) => {
    try {
      const { data, error } = await tenantService.insert('mandala_products', productData);
      if (error) throw error;
      await fetchProducts(); // Refresh data
      return data;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  };

  const createDistributor = async (distributorData: Partial<MandalaDistributor>) => {
    try {
      const { data, error } = await tenantService.insert('mandala_distributors', distributorData);
      if (error) throw error;
      await fetchDistributors(); // Refresh data
      return data;
    } catch (error) {
      console.error('Error creating distributor:', error);
      throw error;
    }
  };

  // Update operations with tenant isolation
  const updateProduct = async (id: string, updates: Partial<MandalaProduct>) => {
    try {
      const { data, error } = await tenantService
        .update('mandala_products', updates)
        .eq('id', id);
      if (error) throw error;
      await fetchProducts(); // Refresh data
      return data;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  };

  // Delete operations with tenant isolation
  const deleteProduct = async (id: string) => {
    try {
      const { data, error } = await tenantService
        .delete('mandala_products')
        .eq('id', id);
      if (error) throw error;
      await fetchProducts(); // Refresh data
      return data;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      if (tenantLoading || !currentTenant?.id) {
        setLoading(false);
        return;
      }

      // Perform emergency isolation check
      const isolationCheck = await tenantService.emergencyIsolationCheck();
      if (!isolationCheck) {
        setError('Tenant isolation check failed - blocking data access');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        console.log('Starting tenant-isolated data fetch for:', currentTenant.subdomain);
        await Promise.all([
          fetchProducts(),
          fetchDistributors(),
          fetchOrders(),
          fetchInventoryBatches(),
          fetchSalesTerritories(),
          fetchPerformanceMetrics(),
          fetchShipments()
        ]);
        console.log('All tenant data fetched successfully');
      } catch (error) {
        console.error('Tenant data fetch failed:', error);
        setError('Failed to load tenant data');
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [currentTenant?.id, tenantLoading]);

  return {
    products,
    distributors,
    orders,
    inventoryBatches,
    salesTerritories,
    performanceMetrics,
    shipments,
    loading,
    error,
    
    // CRUD operations with tenant isolation
    createProduct,
    createDistributor,
    updateProduct,
    deleteProduct,
    
    // Refetch functions
    refetch: {
      products: fetchProducts,
      distributors: fetchDistributors,
      orders: fetchOrders,
      inventoryBatches: fetchInventoryBatches,
      salesTerritories: fetchSalesTerritories,
      performanceMetrics: fetchPerformanceMetrics,
      shipments: fetchShipments
    },

    // Tenant info
    tenantConfig: currentTenant ? {
      tenant_id: currentTenant.id,
      subdomain: currentTenant.subdomain,
      consciousness_level: currentTenant.consciousness_level,
      feature_flags: currentTenant.feature_flags
    } : null
  };
};