
-- Sacred Fire Mead Demo Data Population (Fixed for duplicates)
-- This will create compelling products, distributors, territories, and sample data

-- First, let's add some premium Sacred Fire mead products (only if they don't exist)
INSERT INTO mandala_products (
  id,
  name,
  description,
  wholesale_price,
  retail_msrp,
  category,
  sacred_attributes,
  tags,
  abv_percentage,
  volume_ml,
  consciousness_level,
  is_active
) 
SELECT 
  gen_random_uuid(),
  'Sacred Valley Original',
  'Our flagship mead crafted from wild Kashmir honey and blessed spring water. Aged in oak barrels with consciousness-raising ceremonies. A perfect balance of earthiness and divine sweetness.',
  45.00,
  89.99,
  'premium',
  '{"consciousness_blessing": true, "sacred_fire_activated": true, "meditation_enhancement": 9, "chakra_alignment": "heart"}'::jsonb,
  ARRAY['premium', 'oak-aged', 'consciousness', 'signature'],
  12.5,
  750,
  9,
  true
WHERE NOT EXISTS (SELECT 1 FROM mandala_products WHERE name = 'Sacred Valley Original')

UNION ALL

SELECT 
  gen_random_uuid(),
  'Saffron Blessed Mead',
  'Infused with authentic Kashmir saffron and blessed during full moon ceremonies. Each bottle contains threads of the golden spice and carries the energy of ancient wisdom.',
  65.00,
  129.99,
  'ultra-premium',
  '{"consciousness_blessing": true, "sacred_fire_activated": true, "meditation_enhancement": 10, "chakra_alignment": "crown", "saffron_threads": 0.5}'::jsonb,
  ARRAY['ultra-premium', 'saffron', 'ceremonial', 'limited'],
  13.0,
  750,
  10,
  true
WHERE NOT EXISTS (SELECT 1 FROM mandala_products WHERE name = 'Saffron Blessed Mead')

UNION ALL

SELECT 
  gen_random_uuid(),
  'Himalayan Reserve',
  'Limited edition mead made with honey from 15,000+ feet elevation. Aged 18 months in blessed caves. Only 500 bottles produced annually. Pure mountain consciousness.',
  95.00,
  199.99,
  'ultra-premium',
  '{"consciousness_blessing": true, "sacred_fire_activated": true, "meditation_enhancement": 11, "chakra_alignment": "all", "cave_aged_months": 18}'::jsonb,
  ARRAY['ultra-premium', 'cave-aged', 'limited-edition', 'collector'],
  14.0,
  750,
  11,
  true
WHERE NOT EXISTS (SELECT 1 FROM mandala_products WHERE name = 'Himalayan Reserve')

UNION ALL

SELECT 
  gen_random_uuid(),
  'Rose Petal Divine',
  'Delicate mead infused with organic Kashmir rose petals. Perfect for conscious celebrations and heart-opening ceremonies. Naturally pink with floral consciousness.',
  55.00,
  109.99,
  'premium',
  '{"consciousness_blessing": true, "sacred_fire_activated": true, "meditation_enhancement": 8, "chakra_alignment": "heart", "rose_petals": true}'::jsonb,
  ARRAY['premium', 'floral', 'ceremonial', 'rose'],
  11.5,
  750,
  8,
  true
WHERE NOT EXISTS (SELECT 1 FROM mandala_products WHERE name = 'Rose Petal Divine')

UNION ALL

SELECT 
  gen_random_uuid(),
  'Ancient Spice Blend',
  'Complex mead featuring cardamom, cinnamon, and cloves from Kashmir spice markets. Warming and consciousness-expanding. Perfect for winter meditation sessions.',
  50.00,
  99.99,
  'premium',
  '{"consciousness_blessing": true, "sacred_fire_activated": true, "meditation_enhancement": 8, "chakra_alignment": "solar_plexus", "spice_blend": ["cardamom", "cinnamon", "cloves"]}'::jsonb,
  ARRAY['premium', 'spiced', 'warming', 'meditation'],
  12.0,
  750,
  8,
  true
WHERE NOT EXISTS (SELECT 1 FROM mandala_products WHERE name = 'Ancient Spice Blend')

UNION ALL

SELECT 
  gen_random_uuid(),
  'Crystal Clear Essence',
  'Pure, unfiltered mead that captures the essence of Kashmir meadows. No additives, just consciousness and honey. The most authentic expression of our craft.',
  40.00,
  79.99,
  'classic',
  '{"consciousness_blessing": true, "sacred_fire_activated": true, "meditation_enhancement": 7, "chakra_alignment": "throat", "unfiltered": true}'::jsonb,
  ARRAY['classic', 'pure', 'authentic', 'unfiltered'],
  11.0,
  750,
  7,
  true
WHERE NOT EXISTS (SELECT 1 FROM mandala_products WHERE name = 'Crystal Clear Essence');

-- Create sample distributor accounts (only if they don't exist)
INSERT INTO mandala_distributors (
  id,
  company_name,
  contact_name,
  email,
  territory,
  distributor_tier,
  status,
  address
) 
SELECT * FROM (VALUES
  (
    gen_random_uuid(),
    'Bay Area Sacred Beverages',
    'Michael Chen',
    'michael@bayareasacred.com',
    'San Francisco Bay Area',
    'Premium Partner',
    'active',
    '{"street": "1234 Mission Street", "city": "San Francisco", "state": "CA", "zip": "94103", "country": "USA"}'::jsonb
  ),
  (
    gen_random_uuid(),
    'Pacific Northwest Consciousness Co.',
    'Sarah Williams',
    'sarah@pnwconsciousness.com',
    'Portland Metro & Seattle',
    'Premium Partner',
    'active',
    '{"street": "5678 Pearl District Ave", "city": "Portland", "state": "OR", "zip": "97209", "country": "USA"}'::jsonb
  ),
  (
    gen_random_uuid(),
    'SoCal Spiritual Spirits',
    'David Rodriguez',
    'david@socalspiritual.com',
    'Los Angeles & Orange County',
    'Premium Partner',
    'active',
    '{"street": "9012 Sunset Boulevard", "city": "West Hollywood", "state": "CA", "zip": "90069", "country": "USA"}'::jsonb
  ),
  (
    gen_random_uuid(),
    'Rocky Mountain High Beverages',
    'Jennifer Thompson',
    'jen@rmhighbev.com',
    'Colorado Front Range',
    'Standard',
    'active',
    '{"street": "3456 16th Street", "city": "Denver", "state": "CO", "zip": "80202", "country": "USA"}'::jsonb
  ),
  (
    gen_random_uuid(),
    'Austin Conscious Living',
    'Robert Johnson',
    'rob@austinconscious.com',
    'Austin Metro Area',
    'Standard',
    'active',
    '{"street": "7890 South Lamar", "city": "Austin", "state": "TX", "zip": "78704", "country": "USA"}'::jsonb
  ),
  (
    gen_random_uuid(),
    'New York Sacred Selections',
    'Lisa Anderson',
    'lisa@nysacred.com',
    'Manhattan & Brooklyn',
    'Premium Partner',
    'active',
    '{"street": "2468 Broadway", "city": "New York", "state": "NY", "zip": "10024", "country": "USA"}'::jsonb
  )
) AS new_distributors(id, company_name, contact_name, email, territory, distributor_tier, status, address)
WHERE NOT EXISTS (
  SELECT 1 FROM mandala_distributors 
  WHERE company_name = new_distributors.company_name
);

-- Create realistic inventory batches (with unique batch numbers)
INSERT INTO mandala_inventory_batches (
  id,
  product_id,
  batch_number,
  production_date,
  expiry_date,
  sacred_honey_source,
  consciousness_blessing_level,
  quantity_produced,
  quantity_available,
  status,
  storage_location
)
SELECT 
  gen_random_uuid(),
  p.id,
  CASE 
    WHEN p.name = 'Sacred Valley Original' THEN 'SVO-2024-' || LPAD((EXTRACT(epoch FROM NOW())::int % 1000)::text, 3, '0')
    WHEN p.name = 'Saffron Blessed Mead' THEN 'SBM-2024-' || LPAD((EXTRACT(epoch FROM NOW())::int % 1000 + 1)::text, 3, '0')
    WHEN p.name = 'Himalayan Reserve' THEN 'HR-2024-' || LPAD((EXTRACT(epoch FROM NOW())::int % 1000 + 2)::text, 3, '0')
    WHEN p.name = 'Rose Petal Divine' THEN 'RPD-2024-' || LPAD((EXTRACT(epoch FROM NOW())::int % 1000 + 3)::text, 3, '0')
    WHEN p.name = 'Ancient Spice Blend' THEN 'ASB-2024-' || LPAD((EXTRACT(epoch FROM NOW())::int % 1000 + 4)::text, 3, '0')
    WHEN p.name = 'Crystal Clear Essence' THEN 'CCE-2024-' || LPAD((EXTRACT(epoch FROM NOW())::int % 1000 + 5)::text, 3, '0')
  END,
  '2024-01-15'::date,
  '2026-01-15'::date,
  CASE 
    WHEN p.name LIKE '%Himalayan%' THEN 'High Altitude Kashmir Meadows (15,000+ ft)'
    WHEN p.name LIKE '%Saffron%' THEN 'Saffron Fields of Pampore, Kashmir'
    WHEN p.name LIKE '%Rose%' THEN 'Rose Gardens of Srinagar'
    ELSE 'Sacred Valley Apiaries, Kashmir'
  END,
  p.consciousness_level,
  CASE 
    WHEN p.name LIKE '%Himalayan%' THEN 500
    WHEN p.name LIKE '%Saffron%' THEN 1000
    ELSE 2000
  END,
  CASE 
    WHEN p.name LIKE '%Himalayan%' THEN 450
    WHEN p.name LIKE '%Saffron%' THEN 850
    ELSE 1800
  END,
  'active',
  'Oakland Sacred Storage Facility - Climate Controlled'
FROM mandala_products p
WHERE p.is_active = true
AND NOT EXISTS (
  SELECT 1 FROM mandala_inventory_batches b 
  WHERE b.product_id = p.id
);

-- Create sample orders (only if we have distributors)
INSERT INTO mandala_orders (
  id,
  order_number,
  distributor_id,
  order_status,
  order_type,
  subtotal,
  discount_amount,
  tax_amount,
  shipping_amount,
  total_amount,
  destination_address,
  order_date,
  estimated_delivery,
  metadata
)
SELECT 
  gen_random_uuid(),
  'QO-' || TO_CHAR(NOW() - INTERVAL '30 days' + (random() * INTERVAL '30 days'), 'YYYYMMDD') || '-' || UPPER(substring(gen_random_uuid()::text, 1, 4)),
  d.id,
  CASE 
    WHEN random() < 0.7 THEN 'delivered'
    WHEN random() < 0.9 THEN 'shipped'
    ELSE 'pending'
  END,
  'wholesale',
  (random() * 8000 + 2000)::numeric(10,2),
  0,
  0,
  (random() * 200 + 50)::numeric(10,2),
  (random() * 8200 + 2050)::numeric(10,2),
  d.address,
  NOW() - INTERVAL '30 days' + (random() * INTERVAL '30 days'),
  NOW() - INTERVAL '25 days' + (random() * INTERVAL '30 days'),
  ('{"created_by": "system", "order_source": "distributor_portal", "consciousness_level": ' || (7 + random() * 4)::int || '}')::jsonb
FROM mandala_distributors d
WHERE d.status = 'active'
AND NOT EXISTS (SELECT 1 FROM mandala_orders WHERE distributor_id = d.id)
LIMIT 10;
