
import { supabase } from '@/integrations/supabase/client';

export interface StockLevel {
  productId: string;
  availableQuantity: number;
  totalProduced: number;
  reorderPoint: number;
  isLowStock: boolean;
}

export interface InventoryBatch {
  id: string;
  product_id: string;
  batch_number: string;
  production_date: string;
  quantity_available: number;
  status: string;
}

export const getProductStockLevel = async (productId: string): Promise<StockLevel> => {
  try {
    const { data: batches, error } = await supabase
      .from('mandala_inventory_batches')
      .select('*')
      .eq('product_id', productId)
      .eq('status', 'active');

    if (error) {
      console.error('Error fetching stock level:', error);
      return {
        productId,
        availableQuantity: 0,
        totalProduced: 0,
        reorderPoint: 50,
        isLowStock: true
      };
    }

    const availableQuantity = batches?.reduce((sum, batch) => sum + (batch.quantity_available || 0), 0) || 0;
    const totalProduced = batches?.reduce((sum, batch) => sum + (batch.quantity_produced || 0), 0) || 0;
    const reorderPoint = 50; // Default reorder point
    const isLowStock = availableQuantity < reorderPoint;

    return {
      productId,
      availableQuantity,
      totalProduced,
      reorderPoint,
      isLowStock
    };

  } catch (error) {
    console.error('Error in getProductStockLevel:', error);
    return {
      productId,
      availableQuantity: 0,
      totalProduced: 0,
      reorderPoint: 50,
      isLowStock: true
    };
  }
};

export const getAllStockLevels = async (): Promise<StockLevel[]> => {
  try {
    const { data: products, error } = await supabase
      .from('mandala_products')
      .select('id')
      .eq('is_active', true);

    if (error || !products) {
      console.error('Error fetching products:', error);
      return [];
    }

    const stockLevels = await Promise.all(
      products.map(product => getProductStockLevel(product.id))
    );

    return stockLevels;

  } catch (error) {
    console.error('Error in getAllStockLevels:', error);
    return [];
  }
};

export const createInventoryBatch = async (batchData: {
  product_id: string;
  batch_number: string;
  production_date: string;
  expiry_date: string;
  sacred_honey_source: string;
  consciousness_blessing_level: number;
  quantity_produced: number;
  storage_location: string;
}) => {
  try {
    const { data, error } = await supabase
      .from('mandala_inventory_batches')
      .insert({
        ...batchData,
        quantity_available: batchData.quantity_produced,
        status: 'active'
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating inventory batch:', error);
      return { success: false, error: error.message };
    }

    return { success: true, batch: data };

  } catch (error) {
    console.error('Error in createInventoryBatch:', error);
    return { success: false, error: 'Unexpected error creating batch' };
  }
};

export const adjustInventoryQuantity = async (
  batchId: string, 
  adjustment: number, 
  reason: string
) => {
  try {
    const { data: batch, error: fetchError } = await supabase
      .from('mandala_inventory_batches')
      .select('*')
      .eq('id', batchId)
      .single();

    if (fetchError || !batch) {
      return { success: false, error: 'Batch not found' };
    }

    const newQuantity = Math.max(0, batch.quantity_available + adjustment);
    const newStatus = newQuantity === 0 ? 'depleted' : 'active';

    const { error: updateError } = await supabase
      .from('mandala_inventory_batches')
      .update({ 
        quantity_available: newQuantity,
        status: newStatus
      })
      .eq('id', batchId);

    if (updateError) {
      console.error('Error adjusting inventory:', updateError);
      return { success: false, error: updateError.message };
    }

    // Log the adjustment
    console.log(`Inventory adjusted: Batch ${batch.batch_number}, ${adjustment > 0 ? '+' : ''}${adjustment} units. Reason: ${reason}`);

    return { success: true, newQuantity };

  } catch (error) {
    console.error('Error in adjustInventoryQuantity:', error);
    return { success: false, error: 'Unexpected error adjusting inventory' };
  }
};
