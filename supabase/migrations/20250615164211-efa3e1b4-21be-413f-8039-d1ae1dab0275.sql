
-- Phase 2: Distribution Pipeline Tables
CREATE TABLE mandala_inventory_batches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES mandala_products(id),
  batch_number TEXT UNIQUE NOT NULL,
  production_date DATE NOT NULL,
  expiry_date DATE,
  sacred_honey_source TEXT NOT NULL, -- Kashmir valley location
  consciousness_blessing_level INTEGER DEFAULT 500,
  quality_certifications JSONB DEFAULT '[]'::jsonb,
  quantity_produced INTEGER NOT NULL,
  quantity_available INTEGER NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'reserved', 'shipped', 'expired')),
  storage_location TEXT DEFAULT 'Kashmir Facility',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE mandala_reorder_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES mandala_products(id),
  minimum_stock_level INTEGER NOT NULL,
  reorder_quantity INTEGER NOT NULL,
  lead_time_days INTEGER DEFAULT 21, -- Kashmir production time
  auto_reorder_enabled BOOLEAN DEFAULT true,
  supplier_contact JSONB DEFAULT '{}'::jsonb,
  sacred_timing_preferences JSONB DEFAULT '{}'::jsonb, -- Moon phases, etc.
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE mandala_shipments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES mandala_orders(id),
  tracking_number TEXT UNIQUE,
  carrier TEXT NOT NULL,
  shipment_type TEXT DEFAULT 'standard' CHECK (shipment_type IN ('standard', 'expedited', 'sacred_express')),
  origin_location TEXT DEFAULT 'Kashmir Facility',
  destination_location TEXT NOT NULL,
  shipped_at TIMESTAMP WITH TIME ZONE,
  estimated_delivery TIMESTAMP WITH TIME ZONE,
  actual_delivery TIMESTAMP WITH TIME ZONE,
  status TEXT DEFAULT 'preparing' CHECK (status IN ('preparing', 'in_transit', 'delivered', 'exception')),
  compliance_documents JSONB DEFAULT '[]'::jsonb,
  customs_clearance JSONB DEFAULT '{}'::jsonb,
  divine_protection_applied BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Phase 3: Sales & Territory Management Tables
CREATE TABLE mandala_sales_territories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  territory_name TEXT NOT NULL,
  territory_code TEXT UNIQUE NOT NULL,
  geographic_bounds JSONB NOT NULL, -- Coordinates for mapping
  population_density TEXT CHECK (population_density IN ('urban', 'suburban', 'rural')),
  consciousness_demographic JSONB DEFAULT '{}'::jsonb,
  assigned_rep_id UUID REFERENCES mandala_distributors(id),
  target_revenue DECIMAL(10,2),
  commission_structure JSONB NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE mandala_sales_quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_number TEXT UNIQUE NOT NULL,
  distributor_id UUID REFERENCES mandala_distributors(id),
  territory_id UUID REFERENCES mandala_sales_territories(id),
  quote_items JSONB NOT NULL, -- Product quantities and pricing
  subtotal DECIMAL(10,2) NOT NULL,
  discount_percentage DECIMAL(5,2) DEFAULT 0,
  tax_amount DECIMAL(10,2) DEFAULT 0,
  total_amount DECIMAL(10,2) NOT NULL,
  valid_until TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'accepted', 'expired', 'converted')),
  sacred_pricing_tier TEXT DEFAULT 'standard',
  consciousness_discount_applied BOOLEAN DEFAULT false,
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE mandala_commission_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES mandala_orders(id),
  sales_rep_id UUID,
  territory_id UUID REFERENCES mandala_sales_territories(id),
  commission_type TEXT CHECK (commission_type IN ('base', 'bonus', 'override')),
  commission_rate DECIMAL(5,4) NOT NULL,
  commission_amount DECIMAL(10,2) NOT NULL,
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'calculated', 'paid')),
  pay_period TEXT NOT NULL, -- YYYY-MM format
  divine_abundance_multiplier DECIMAL(3,2) DEFAULT 1.00,
  paid_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Phase 4: Analytics & Divine Insights Tables
CREATE TABLE mandala_demand_forecasts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES mandala_products(id),
  territory_id UUID REFERENCES mandala_sales_territories(id),
  forecast_period TEXT NOT NULL, -- YYYY-MM format
  predicted_demand INTEGER NOT NULL,
  confidence_score DECIMAL(3,2) NOT NULL, -- 0.00 to 1.00
  seasonal_factors JSONB DEFAULT '{}'::jsonb,
  consciousness_trends JSONB DEFAULT '{}'::jsonb,
  market_indicators JSONB DEFAULT '{}'::jsonb,
  model_version TEXT DEFAULT 'v1.0',
  generated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE mandala_performance_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_type TEXT NOT NULL, -- 'distributor', 'territory', 'product', 'overall'
  entity_id UUID, -- References distributor, territory, or product
  metric_name TEXT NOT NULL,
  metric_value DECIMAL(15,2) NOT NULL,
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  benchmark_value DECIMAL(15,2),
  performance_rating TEXT CHECK (performance_rating IN ('excellent', 'good', 'average', 'below_average', 'poor')),
  divine_guidance_notes TEXT,
  consciousness_impact_score INTEGER DEFAULT 500,
  calculated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE mandala_compliance_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_type TEXT NOT NULL, -- 'tax', 'alcohol_control', 'import_export', 'quality'
  report_period TEXT NOT NULL, -- YYYY-MM or YYYY-QN format
  jurisdiction TEXT NOT NULL, -- 'CA', 'US', 'IN', etc.
  report_data JSONB NOT NULL,
  compliance_score INTEGER DEFAULT 100,
  violations JSONB DEFAULT '[]'::jsonb,
  corrective_actions JSONB DEFAULT '[]'::jsonb,
  submitted_to_authority BOOLEAN DEFAULT false,
  submission_date TIMESTAMP WITH TIME ZONE,
  authority_response JSONB DEFAULT '{}'::jsonb,
  sacred_fire_protection_active BOOLEAN DEFAULT true,
  generated_by UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Add triggers for updated_at columns
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_mandala_inventory_batches_updated_at BEFORE UPDATE ON mandala_inventory_batches FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_mandala_reorder_rules_updated_at BEFORE UPDATE ON mandala_reorder_rules FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_mandala_shipments_updated_at BEFORE UPDATE ON mandala_shipments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_mandala_sales_territories_updated_at BEFORE UPDATE ON mandala_sales_territories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_mandala_sales_quotes_updated_at BEFORE UPDATE ON mandala_sales_quotes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_mandala_commission_tracking_updated_at BEFORE UPDATE ON mandala_commission_tracking FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_mandala_compliance_reports_updated_at BEFORE UPDATE ON mandala_compliance_reports FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS on all new tables
ALTER TABLE mandala_inventory_batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE mandala_reorder_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE mandala_shipments ENABLE ROW LEVEL SECURITY;
ALTER TABLE mandala_sales_territories ENABLE ROW LEVEL SECURITY;
ALTER TABLE mandala_sales_quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE mandala_commission_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE mandala_demand_forecasts ENABLE ROW LEVEL SECURITY;
ALTER TABLE mandala_performance_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE mandala_compliance_reports ENABLE ROW LEVEL SECURITY;

-- Insert sample data for demonstration
INSERT INTO mandala_inventory_batches (product_id, batch_number, production_date, expiry_date, sacred_honey_source, quantity_produced, quantity_available) 
SELECT id, 'KSH-2024-001', '2024-11-15', '2026-11-15', 'Gulmarg Sacred Valley', 500, 420
FROM mandala_products WHERE name = 'Sacred Valley Original';

INSERT INTO mandala_inventory_batches (product_id, batch_number, production_date, expiry_date, sacred_honey_source, quantity_produced, quantity_available) 
SELECT id, 'SAF-2024-002', '2024-10-30', '2026-10-30', 'Pahalgam Monastery Gardens', 300, 180
FROM mandala_products WHERE name = 'Saffron Blessed Mead';

INSERT INTO mandala_sales_territories (territory_name, territory_code, geographic_bounds, assigned_rep_id, target_revenue, commission_structure) VALUES
('North Bay Sacred Circle', 'NB-SC', '{"lat_min": 37.7, "lat_max": 38.5, "lng_min": -122.8, "lng_max": -122.0}', (SELECT id FROM mandala_distributors LIMIT 1), 150000, '{"base_rate": 0.08, "bonus_threshold": 50000, "bonus_rate": 0.12}'),
('East Bay Consciousness Hub', 'EB-CH', '{"lat_min": 37.6, "lat_max": 37.9, "lng_min": -122.4, "lng_max": -121.7}', (SELECT id FROM mandala_distributors LIMIT 1 OFFSET 1), 200000, '{"base_rate": 0.08, "bonus_threshold": 75000, "bonus_rate": 0.12}'),
('Peninsula Divine Network', 'PD-NET', '{"lat_min": 37.3, "lat_max": 37.7, "lng_min": -122.5, "lng_max": -122.0}', (SELECT id FROM mandala_distributors LIMIT 1 OFFSET 2), 180000, '{"base_rate": 0.08, "bonus_threshold": 60000, "bonus_rate": 0.12}');
