-- Create a new tenant for independent development
INSERT INTO sacred_tenants (
  id,
  tenant_name,
  subdomain,
  consciousness_level,
  sacred_fire_protection,
  feature_flags,
  tenant_config,
  is_active
) VALUES (
  gen_random_uuid(),
  'Sacred Fire Development Instance',
  'dev-sacred-fire',
  800,
  true,
  '{"mandala_products": true, "distributor_management": true, "order_processing": true, "inventory_tracking": true, "performance_analytics": true, "bridge_integration": true, "icp_canisters": true}',
  '{"app_domain": "sacredfire.dev", "primary_color": "hsl(280, 70%, 60%)", "brand_name": "Sacred Fire Development", "admin_email": "admin@sacredfire.dev"}',
  true
);

-- Add tenant_id column to mandala tables that don't have it yet
ALTER TABLE mandala_products ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES sacred_tenants(id);
ALTER TABLE mandala_distributors ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES sacred_tenants(id);
ALTER TABLE mandala_orders ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES sacred_tenants(id);
ALTER TABLE mandala_inventory_batches ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES sacred_tenants(id);
ALTER TABLE mandala_sales_territories ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES sacred_tenants(id);
ALTER TABLE mandala_performance_metrics ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES sacred_tenants(id);
ALTER TABLE mandala_shipments ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES sacred_tenants(id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_mandala_products_tenant_id ON mandala_products(tenant_id);
CREATE INDEX IF NOT EXISTS idx_mandala_distributors_tenant_id ON mandala_distributors(tenant_id);
CREATE INDEX IF NOT EXISTS idx_mandala_orders_tenant_id ON mandala_orders(tenant_id);
CREATE INDEX IF NOT EXISTS idx_mandala_inventory_batches_tenant_id ON mandala_inventory_batches(tenant_id);
CREATE INDEX IF NOT EXISTS idx_mandala_sales_territories_tenant_id ON mandala_sales_territories(tenant_id);
CREATE INDEX IF NOT EXISTS idx_mandala_performance_metrics_tenant_id ON mandala_performance_metrics(tenant_id);
CREATE INDEX IF NOT EXISTS idx_mandala_shipments_tenant_id ON mandala_shipments(tenant_id);

-- Create RLS policies for tenant isolation
DROP POLICY IF EXISTS "Tenant isolation for mandala_products" ON mandala_products;
CREATE POLICY "Tenant isolation for mandala_products" ON mandala_products
FOR ALL USING (
  tenant_id IN (
    SELECT id FROM sacred_tenants 
    WHERE id = get_user_primary_tenant(auth.uid())
  )
);

DROP POLICY IF EXISTS "Tenant isolation for mandala_distributors" ON mandala_distributors;
CREATE POLICY "Tenant isolation for mandala_distributors" ON mandala_distributors
FOR ALL USING (
  tenant_id IN (
    SELECT id FROM sacred_tenants 
    WHERE id = get_user_primary_tenant(auth.uid())
  )
);

DROP POLICY IF EXISTS "Tenant isolation for mandala_orders" ON mandala_orders;
CREATE POLICY "Tenant isolation for mandala_orders" ON mandala_orders
FOR ALL USING (
  tenant_id IN (
    SELECT id FROM sacred_tenants 
    WHERE id = get_user_primary_tenant(auth.uid())
  )
);

DROP POLICY IF EXISTS "Tenant isolation for mandala_inventory_batches" ON mandala_inventory_batches;
CREATE POLICY "Tenant isolation for mandala_inventory_batches" ON mandala_inventory_batches
FOR ALL USING (
  tenant_id IN (
    SELECT id FROM sacred_tenants 
    WHERE id = get_user_primary_tenant(auth.uid())
  )
);

DROP POLICY IF EXISTS "Tenant isolation for mandala_sales_territories" ON mandala_sales_territories;
CREATE POLICY "Tenant isolation for mandala_sales_territories" ON mandala_sales_territories
FOR ALL USING (
  tenant_id IN (
    SELECT id FROM sacred_tenants 
    WHERE id = get_user_primary_tenant(auth.uid())
  )
);

DROP POLICY IF EXISTS "Tenant isolation for mandala_performance_metrics" ON mandala_performance_metrics;
CREATE POLICY "Tenant isolation for mandala_performance_metrics" ON mandala_performance_metrics
FOR ALL USING (
  tenant_id IN (
    SELECT id FROM sacred_tenants 
    WHERE id = get_user_primary_tenant(auth.uid())
  )
);

DROP POLICY IF EXISTS "Tenant isolation for mandala_shipments" ON mandala_shipments;
CREATE POLICY "Tenant isolation for mandala_shipments" ON mandala_shipments
FOR ALL USING (
  tenant_id IN (
    SELECT id FROM sacred_tenants 
    WHERE id = get_user_primary_tenant(auth.uid())
  )
);

-- Function to get current user's tenant context
CREATE OR REPLACE FUNCTION get_current_tenant_id()
RETURNS UUID AS $$
BEGIN
  RETURN get_user_primary_tenant(auth.uid());
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Seed initial data for the new tenant
DO $$
DECLARE
  new_tenant_id UUID;
BEGIN
  -- Get the new tenant ID
  SELECT id INTO new_tenant_id 
  FROM sacred_tenants 
  WHERE subdomain = 'dev-sacred-fire';
  
  -- Seed sample products for the new tenant
  INSERT INTO mandala_products (
    tenant_id, name, description, wholesale_price, retail_msrp, 
    category, sacred_attributes, tags, abv_percentage, volume_ml, 
    consciousness_level, is_active
  ) VALUES 
  (new_tenant_id, 'Sacred Fire Honey Mead - Original', 'Original sacred honey mead blessed with divine fire', 15.00, 24.99, 'mead', '{"blessing_level": 500, "sacred_fire_infused": true}', ARRAY['honey', 'mead', 'sacred'], 12.5, 750, 600, true),
  (new_tenant_id, 'Violet Flame Ceremonial Mead', 'Ceremonial mead for sacred rituals and divine connection', 25.00, 39.99, 'ceremonial', '{"blessing_level": 800, "violet_flame_activated": true}', ARRAY['ceremonial', 'violet_flame', 'sacred'], 14.0, 500, 800, true),
  (new_tenant_id, 'Golden Age Celebration Mead', 'Celebratory mead for Golden Age festivities', 20.00, 32.99, 'celebration', '{"blessing_level": 700, "golden_age_essence": true}', ARRAY['celebration', 'golden_age', 'festive'], 13.5, 750, 700, true);
  
  -- Seed sample sales territory
  INSERT INTO mandala_sales_territories (
    tenant_id, territory_name, territory_code, geographic_bounds,
    target_revenue, commission_structure, is_active
  ) VALUES 
  (new_tenant_id, 'Sacred Fire West Coast', 'SF-WC', '{"states": ["CA", "OR", "WA"], "region": "west_coast"}', 100000, '{"base_rate": 0.10, "tier_bonuses": {"silver": 0.02, "gold": 0.05}}', true);
  
END $$;