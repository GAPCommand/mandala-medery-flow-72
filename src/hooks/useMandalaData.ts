
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useTenant } from "@/contexts/TenantContext";

export interface MandalaProduct {
  id: string;
  name: string;
  description: string;
  wholesale_price: number;
  retail_msrp: number;
  category: string;
  sacred_attributes: any;
  tags: string[];
  abv_percentage: number;
  volume_ml: number;
  consciousness_level: number;
}

export interface MandalaDistributor {
  id: string;
  company_name: string;
  contact_name: string;
  email: string;
  territory: string;
  distributor_tier: string;
  status: string;
  address: any;
}

export interface MandalaOrder {
  id: string;
  order_number: string;
  distributor_id: string;
  order_status: string;
  total_amount: number;
  order_date: string;
  estimated_delivery: string;
  distributor?: MandalaDistributor;
}

export interface MandalaInventoryBatch {
  id: string;
  product_id: string;
  batch_number: string;
  production_date: string;
  expiry_date: string;
  sacred_honey_source: string;
  consciousness_blessing_level: number;
  quantity_produced: number;
  quantity_available: number;
  status: string;
  storage_location: string;
}

export interface MandalaSalesTerritory {
  id: string;
  territory_name: string;
  territory_code: string;
  geographic_bounds: any;
  assigned_rep_id: string;
  target_revenue: number;
  commission_structure: any;
  is_active: boolean;
}

export interface MandalaPerformanceMetric {
  id: string;
  metric_type: string;
  entity_id: string;
  metric_name: string;
  metric_value: number;
  period_start: string;
  period_end: string;
  performance_rating: string;
  divine_guidance_notes: string;
  consciousness_impact_score: number;
}

export interface MandalaShipment {
  id: string;
  order_id: string;
  tracking_number: string;
  carrier: string;
  shipment_type: string;
  origin_location: string;
  destination_location: string;
  status: string;
  estimated_delivery: string;
  divine_protection_applied: boolean;
}

export const useMandalaData = () => {
  const { currentTenant } = useTenant();
  const [products, setProducts] = useState<MandalaProduct[]>([]);
  const [distributors, setDistributors] = useState<MandalaDistributor[]>([]);
  const [orders, setOrders] = useState<MandalaOrder[]>([]);
  const [inventoryBatches, setInventoryBatches] = useState<MandalaInventoryBatch[]>([]);
  const [salesTerritories, setSalesTerritories] = useState<MandalaSalesTerritory[]>([]);
  const [performanceMetrics, setPerformanceMetrics] = useState<MandalaPerformanceMetric[]>([]);
  const [shipments, setShipments] = useState<MandalaShipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    if (!currentTenant?.id) return;
    
    try {
      console.log('Fetching products for tenant:', currentTenant.id);
      const { data, error } = await supabase
        .from('mandala_products')
        .select('*')
        .eq('tenant_id', currentTenant.id)
        .eq('is_active', true);
      
      if (error) {
        console.error('Products fetch error:', error);
        throw error;
      }
      console.log('Products fetched:', data?.length || 0);
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to load products');
    }
  };

  const fetchDistributors = async () => {
    if (!currentTenant?.id) return;
    
    try {
      console.log('Fetching distributors for tenant:', currentTenant.id);
      const { data, error } = await supabase
        .from('mandala_distributors')
        .select('*')
        .eq('tenant_id', currentTenant.id);
      
      if (error) {
        console.error('Distributors fetch error:', error);
        throw error;
      }
      console.log('Distributors fetched:', data?.length || 0);
      setDistributors(data || []);
    } catch (error) {
      console.error('Error fetching distributors:', error);
      setError('Failed to load distributors');
    }
  };

  const fetchOrders = async () => {
    if (!currentTenant?.id) return;
    
    try {
      console.log('Fetching orders for tenant:', currentTenant.id);
      const { data, error } = await supabase
        .from('mandala_orders')
        .select(`
          *,
          distributor:mandala_distributors(*)
        `)
        .eq('tenant_id', currentTenant.id)
        .order('order_date', { ascending: false });
      
      if (error) {
        console.error('Orders fetch error:', error);
        throw error;
      }
      console.log('Orders fetched:', data?.length || 0);
      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError('Failed to load orders');
    }
  };

  const fetchInventoryBatches = async () => {
    if (!currentTenant?.id) return;
    
    try {
      console.log('Fetching inventory batches for tenant:', currentTenant.id);
      const { data, error } = await supabase
        .from('mandala_inventory_batches')
        .select('*')
        .eq('tenant_id', currentTenant.id)
        .order('production_date', { ascending: false });
      
      if (error) {
        console.error('Inventory batches fetch error:', error);
        throw error;
      }
      console.log('Inventory batches fetched:', data?.length || 0);
      setInventoryBatches(data || []);
    } catch (error) {
      console.error('Error fetching inventory batches:', error);
      setError('Failed to load inventory');
    }
  };

  const fetchSalesTerritories = async () => {
    if (!currentTenant?.id) return;
    
    try {
      console.log('Fetching sales territories for tenant:', currentTenant.id);
      const { data, error } = await supabase
        .from('mandala_sales_territories')
        .select('*')
        .eq('tenant_id', currentTenant.id)
        .eq('is_active', true)
        .order('territory_name');
      
      if (error) {
        console.error('Sales territories fetch error:', error);
        throw error;
      }
      console.log('Sales territories fetched:', data?.length || 0);
      setSalesTerritories(data || []);
    } catch (error) {
      console.error('Error fetching sales territories:', error);
      setError('Failed to load territories');
    }
  };

  const fetchPerformanceMetrics = async () => {
    if (!currentTenant?.id) return;
    
    try {
      console.log('Fetching performance metrics for tenant:', currentTenant.id);
      const { data, error } = await supabase
        .from('mandala_performance_metrics')
        .select('*')
        .eq('tenant_id', currentTenant.id)
        .order('calculated_at', { ascending: false })
        .limit(20);
      
      if (error) {
        console.error('Performance metrics fetch error:', error);
        throw error;
      }
      console.log('Performance metrics fetched:', data?.length || 0);
      setPerformanceMetrics(data || []);
    } catch (error) {
      console.error('Error fetching performance metrics:', error);
      setError('Failed to load metrics');
    }
  };

  const fetchShipments = async () => {
    if (!currentTenant?.id) return;
    
    try {
      console.log('Fetching shipments for tenant:', currentTenant.id);
      const { data, error } = await supabase
        .from('mandala_shipments')
        .select('*')
        .eq('tenant_id', currentTenant.id)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Shipments fetch error:', error);
        throw error;
      }
      console.log('Shipments fetched:', data?.length || 0);
      setShipments(data || []);
    } catch (error) {
      console.error('Error fetching shipments:', error);
      setError('Failed to load shipments');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!currentTenant?.id) {
        setLoading(false);
        return;
      }
      
      setLoading(true);
      setError(null);
      
      try {
        console.log('Starting data fetch for tenant:', currentTenant.id);
        await Promise.all([
          fetchProducts(),
          fetchDistributors(),
          fetchOrders(),
          fetchInventoryBatches(),
          fetchSalesTerritories(),
          fetchPerformanceMetrics(),
          fetchShipments()
        ]);
        console.log('All data fetched successfully');
      } catch (error) {
        console.error('Data fetch failed:', error);
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentTenant?.id]);

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
    refetch: {
      products: fetchProducts,
      distributors: fetchDistributors,
      orders: fetchOrders,
      inventoryBatches: fetchInventoryBatches,
      salesTerritories: fetchSalesTerritories,
      performanceMetrics: fetchPerformanceMetrics,
      shipments: fetchShipments
    }
  };
};
