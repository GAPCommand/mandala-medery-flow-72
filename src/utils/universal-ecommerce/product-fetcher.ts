import { supabase } from '@/integrations/supabase/client';
import { UniversalProduct } from '@/types/universal-ecommerce';
import { fetchPandabProducts } from './pandab-api';

export const fetchAllProducts = async (): Promise<UniversalProduct[]> => {
  console.log('Fetching products from Universal Integration...');
  
  // Fetch from multiple sources through existing tables
  const [mandalaProducts, pandabProducts] = await Promise.allSettled([
    // Existing Mandala products
    supabase.from('mandala_products').select('*').eq('is_active', true),
    // PANDAB products (would be API call in production)
    fetchPandabProducts()
  ]);

  const allProducts: UniversalProduct[] = [];

  // Process Mandala products
  if (mandalaProducts.status === 'fulfilled' && mandalaProducts.value.data) {
    const converted = mandalaProducts.value.data.map(product => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.wholesale_price,
      retail_price: product.retail_msrp,
      category: product.category,
      tags: product.tags,
      metadata: product.sacred_attributes,
      inventory_count: 100, // Default for now
      status: 'active' as const,
      source: 'mandala' as const
    }));
    allProducts.push(...converted);
  }

  // Process PANDAB products
  if (pandabProducts.status === 'fulfilled') {
    allProducts.push(...pandabProducts.value);
  }

  console.log('Universal products loaded:', allProducts.length);
  return allProducts;
};
