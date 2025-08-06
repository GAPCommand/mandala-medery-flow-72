
import { supabase } from '@/integrations/supabase/client';

export const seedSampleProducts = async () => {
  try {
    // Check if products already exist
    const { data: existingProducts } = await supabase
      .from('mandala_products')
      .select('id')
      .limit(1);

    if (existingProducts && existingProducts.length > 0) {
      console.log('Products already exist, skipping seeding');
      return;
    }

    console.log('Seeding sample products...');

    const sampleProducts = [
      {
        name: 'Sacred Valley Original',
        description: 'Our flagship mead crafted from ancient Kashmiri honey traditions. A perfect balance of earthly sweetness and divine consciousness.',
        wholesale_price: 35.00,
        retail_msrp: 65.00,
        category: 'traditional',
        abv_percentage: 12.5,
        volume_ml: 750,
        consciousness_level: 500,
        tags: ['traditional', 'flagship', 'kashmir', 'honey'],
        sacred_attributes: {
          origin: 'Kashmir Valley',
          consciousness_blessing: true,
          sacred_geometry_infused: true,
          harvest_moon_blessed: true
        },
        is_active: true
      },
      {
        name: 'Saffron Blessed Mead',
        description: 'Premium mead infused with genuine Kashmiri saffron and blessed under the full moon. Each bottle carries the essence of divine abundance.',
        wholesale_price: 55.00,
        retail_msrp: 95.00,
        category: 'premium',
        abv_percentage: 14.0,
        volume_ml: 750,
        consciousness_level: 750,
        tags: ['premium', 'saffron', 'luxury', 'blessed'],
        sacred_attributes: {
          origin: 'Kashmir Valley',
          saffron_threads: 12,
          consciousness_blessing: true,
          full_moon_blessed: true,
          golden_ratio_fermented: true
        },
        is_active: true
      },
      {
        name: 'Divine Nectar Light',
        description: 'A lighter, more accessible mead perfect for conscious beginners. Gentle sweetness with uplifting energy.',
        wholesale_price: 25.00,
        retail_msrp: 45.00,
        category: 'light',
        abv_percentage: 8.5,
        volume_ml: 500,
        consciousness_level: 300,
        tags: ['light', 'beginner', 'accessible', 'gentle'],
        sacred_attributes: {
          origin: 'Kashmir Valley',
          consciousness_blessing: true,
          beginner_friendly: true,
          gentle_fermentation: true
        },
        is_active: true
      }
    ];

    const { data: products, error: productError } = await supabase
      .from('mandala_products')
      .insert(sampleProducts)
      .select();

    if (productError) {
      console.error('Error seeding products:', productError);
      return;
    }

    console.log('Products seeded successfully:', products);

    // Add inventory batches for each product
    if (products) {
      const inventoryBatches = products.map((product, index) => ({
        product_id: product.id,
        batch_number: `SF-2024-${String(index + 1).padStart(3, '0')}`,
        production_date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
        expiry_date: new Date(Date.now() + 2 * 365 * 24 * 60 * 60 * 1000).toISOString(), // 2 years from now
        sacred_honey_source: product.category === 'premium' ? 'Sacred Rose Gardens' : 'Kashmir Valley Cooperative',
        consciousness_blessing_level: product.consciousness_level,
        quantity_produced: product.category === 'premium' ? 200 : 500,
        quantity_available: product.category === 'premium' ? 180 : 450,
        status: 'active',
        storage_location: 'Oakland Sacred Warehouse'
      }));

      const { error: batchError } = await supabase
        .from('mandala_inventory_batches')
        .insert(inventoryBatches);

      if (batchError) {
        console.error('Error seeding inventory batches:', batchError);
      } else {
        console.log('Inventory batches seeded successfully');
      }
    }

  } catch (error) {
    console.error('Error in seedSampleProducts:', error);
  }
};
