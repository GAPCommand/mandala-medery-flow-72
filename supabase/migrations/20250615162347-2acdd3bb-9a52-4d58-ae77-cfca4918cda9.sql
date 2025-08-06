
-- Create Mandala Medery specific tables for sacred mead distribution

-- Products table for Kashmir mead variants
CREATE TABLE IF NOT EXISTS mandala_products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  product_type TEXT DEFAULT 'mead',
  origin_location TEXT DEFAULT 'Kashmir',
  abv_percentage NUMERIC DEFAULT 12.0,
  volume_ml INTEGER DEFAULT 750,
  consciousness_level INTEGER DEFAULT 500,
  sacred_attributes JSONB DEFAULT '{}',
  wholesale_price NUMERIC NOT NULL,
  retail_msrp NUMERIC NOT NULL,
  category TEXT DEFAULT 'Traditional',
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Inventory locations for Kashmir + Oakland
CREATE TABLE IF NOT EXISTS mandala_inventory_locations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  location_name TEXT NOT NULL,
  location_type TEXT NOT NULL, -- 'production', 'warehouse', 'distribution'
  address JSONB NOT NULL,
  timezone TEXT DEFAULT 'UTC',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Product inventory tracking across locations
CREATE TABLE IF NOT EXISTS mandala_product_inventory (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES mandala_products(id),
  location_id UUID REFERENCES mandala_inventory_locations(id),
  quantity_available INTEGER DEFAULT 0,
  quantity_reserved INTEGER DEFAULT 0,
  batch_number TEXT,
  production_date DATE,
  expiry_date DATE,
  quality_grade TEXT DEFAULT 'premium',
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(product_id, location_id, batch_number)
);

-- B2B Distributors (extends existing CRM structure)
CREATE TABLE IF NOT EXISTS mandala_distributors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  address JSONB NOT NULL,
  territory TEXT,
  distributor_tier TEXT DEFAULT 'Standard', -- 'Premium Partner', 'Standard'
  pricing_tier TEXT DEFAULT 'standard',
  credit_limit NUMERIC DEFAULT 10000,
  payment_terms TEXT DEFAULT 'Net 30',
  license_info JSONB DEFAULT '{}',
  status TEXT DEFAULT 'active',
  onboarded_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- B2B Orders for wholesale distribution
CREATE TABLE IF NOT EXISTS mandala_orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number TEXT UNIQUE NOT NULL,
  distributor_id UUID REFERENCES mandala_distributors(id),
  order_status TEXT DEFAULT 'pending', -- 'pending', 'processing', 'in_transit', 'delivered'
  order_type TEXT DEFAULT 'wholesale',
  subtotal NUMERIC NOT NULL DEFAULT 0,
  discount_amount NUMERIC DEFAULT 0,
  tax_amount NUMERIC DEFAULT 0,
  shipping_amount NUMERIC DEFAULT 0,
  total_amount NUMERIC NOT NULL DEFAULT 0,
  origin_location_id UUID REFERENCES mandala_inventory_locations(id),
  destination_address JSONB NOT NULL,
  shipping_method TEXT,
  tracking_number TEXT,
  estimated_delivery DATE,
  order_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  shipped_date TIMESTAMP WITH TIME ZONE,
  delivered_date TIMESTAMP WITH TIME ZONE,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Order line items
CREATE TABLE IF NOT EXISTS mandala_order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES mandala_orders(id),
  product_id UUID REFERENCES mandala_products(id),
  quantity INTEGER NOT NULL,
  unit_price NUMERIC NOT NULL,
  line_total NUMERIC NOT NULL,
  batch_number TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Insert sacred Kashmir mead products
INSERT INTO mandala_products (name, description, wholesale_price, retail_msrp, category, sacred_attributes, tags) VALUES
(
  'Sacred Valley Original',
  'Our signature Kashmir honey mead, aged in Himalayan oak',
  24.99,
  39.99,
  'Traditional',
  '{"origin": "Srinagar Valley", "aging_process": "Himalayan oak", "consciousness_blessing": true}',
  ARRAY['traditional', 'oak-aged', 'signature']
),
(
  'Saffron Blessed Mead',
  'Infused with sacred Kashmir saffron and mountain wildflower honey',
  34.99,
  54.99,
  'Premium',
  '{"origin": "Pampore Fields", "saffron_grade": "premium", "consciousness_blessing": true}',
  ARRAY['saffron', 'premium', 'blessed']
),
(
  'Himalayan Reserve',
  'Limited edition high-altitude honey from sacred monastery apiaries',
  44.99,
  74.99,
  'Ultra-Premium',
  '{"origin": "Ladakh Monasteries", "altitude": "high", "limited_edition": true}',
  ARRAY['limited', 'monastery', 'reserve']
);

-- Insert inventory locations
INSERT INTO mandala_inventory_locations (location_name, location_type, address) VALUES
(
  'Kashmir Production Facility',
  'production',
  '{"street": "Sacred Valley Road", "city": "Srinagar", "state": "Kashmir", "country": "India", "postal_code": "190001"}'
),
(
  'Oakland Distribution Warehouse',
  'warehouse',
  '{"street": "1234 Industrial Blvd", "city": "Oakland", "state": "CA", "country": "USA", "postal_code": "94607"}'
);

-- Insert sample distributors
INSERT INTO mandala_distributors (company_name, contact_name, email, territory, distributor_tier, address) VALUES
(
  'Golden Gate Wine Distributors',
  'Michael Chen',
  'michael@goldengatedist.com',
  'North Oakland, Berkeley',
  'Premium Partner',
  '{"street": "567 Wine Row", "city": "Oakland", "state": "CA", "postal_code": "94612"}'
),
(
  'Bay Area Specialty Beverages',
  'Sarah Rodriguez',
  'sarah@bayspecialty.com',
  'East Oakland, Alameda',
  'Standard',
  '{"street": "890 Distribution Ave", "city": "Oakland", "state": "CA", "postal_code": "94621"}'
),
(
  'Sacred Spirits Collective',
  'David Kim',
  'david@sacredspirits.com',
  'SF Metro, Marin',
  'Premium Partner',
  '{"street": "123 Spiritual Way", "city": "San Francisco", "state": "CA", "postal_code": "94102"}'
);

-- Add some sample inventory
INSERT INTO mandala_product_inventory (product_id, location_id, quantity_available, batch_number, production_date)
SELECT 
  p.id,
  l.id,
  CASE 
    WHEN l.location_type = 'production' THEN 500
    WHEN l.location_type = 'warehouse' THEN 250
  END,
  'SV-2024-001',
  '2024-01-15'::DATE
FROM mandala_products p
CROSS JOIN mandala_inventory_locations l
WHERE p.name = 'Sacred Valley Original';

-- Enable RLS
ALTER TABLE mandala_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE mandala_inventory_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE mandala_product_inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE mandala_distributors ENABLE ROW LEVEL SECURITY;
ALTER TABLE mandala_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE mandala_order_items ENABLE ROW LEVEL SECURITY;

-- Create policies for access control
CREATE POLICY "Allow read access to mandala products" ON mandala_products FOR SELECT USING (true);
CREATE POLICY "Allow read access to inventory locations" ON mandala_inventory_locations FOR SELECT USING (true);
CREATE POLICY "Allow read access to product inventory" ON mandala_product_inventory FOR SELECT USING (true);
CREATE POLICY "Allow read access to distributors" ON mandala_distributors FOR SELECT USING (true);
CREATE POLICY "Allow read access to orders" ON mandala_orders FOR SELECT USING (true);
CREATE POLICY "Allow read access to order items" ON mandala_order_items FOR SELECT USING (true);

-- Add updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_mandala_products_updated_at BEFORE UPDATE ON mandala_products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_mandala_inventory_locations_updated_at BEFORE UPDATE ON mandala_inventory_locations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_mandala_distributors_updated_at BEFORE UPDATE ON mandala_distributors FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_mandala_orders_updated_at BEFORE UPDATE ON mandala_orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
