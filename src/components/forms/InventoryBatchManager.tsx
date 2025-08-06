
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Package, Calendar, MapPin, Sparkles, Edit } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface InventoryBatchManagerProps {
  products: any[];
  inventoryBatches: any[];
  onBatchUpdated: () => void;
}

const InventoryBatchManager = ({ products, inventoryBatches, onBatchUpdated }: InventoryBatchManagerProps) => {
  const { user } = useAuth();
  const [showBatchForm, setShowBatchForm] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [batchData, setBatchData] = useState({
    product_id: '',
    batch_number: '',
    production_date: '',
    expiry_date: '',
    sacred_honey_source: 'Kashmir Wildflower',
    consciousness_blessing_level: 500,
    quantity_produced: '',
    quantity_available: '',
    storage_location: 'Sacred Vault A'
  });

  const generateBatchNumber = () => {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.random().toString(36).substr(2, 3).toUpperCase();
    return `BATCH-${timestamp}-${random}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const batchInfo = {
        product_id: batchData.product_id,
        batch_number: batchData.batch_number || generateBatchNumber(),
        production_date: batchData.production_date,
        expiry_date: batchData.expiry_date,
        sacred_honey_source: batchData.sacred_honey_source,
        consciousness_blessing_level: parseInt(batchData.consciousness_blessing_level.toString()),
        quantity_produced: parseInt(batchData.quantity_produced),
        quantity_available: parseInt(batchData.quantity_available),
        storage_location: batchData.storage_location,
        status: 'active'
      };

      let error;
      if (selectedBatch?.id) {
        const result = await supabase
          .from('mandala_inventory_batches')
          .update(batchInfo)
          .eq('id', selectedBatch.id);
        error = result.error;
      } else {
        const result = await supabase
          .from('mandala_inventory_batches')
          .insert(batchInfo);
        error = result.error;
      }

      if (error) throw error;

      toast.success(`Batch ${selectedBatch?.id ? 'updated' : 'created'} successfully with Sacred Fire blessing!`);
      setShowBatchForm(false);
      setSelectedBatch(null);
      setBatchData({
        product_id: '',
        batch_number: '',
        production_date: '',
        expiry_date: '',
        sacred_honey_source: 'Kashmir Wildflower',
        consciousness_blessing_level: 500,
        quantity_produced: '',
        quantity_available: '',
        storage_location: 'Sacred Vault A'
      });
      onBatchUpdated();
    } catch (error) {
      console.error('Error saving batch:', error);
      toast.error('Failed to save batch');
    } finally {
      setLoading(false);
    }
  };

  const editBatch = (batch: any) => {
    setSelectedBatch(batch);
    setBatchData({
      product_id: batch.product_id,
      batch_number: batch.batch_number,
      production_date: batch.production_date.split('T')[0],
      expiry_date: batch.expiry_date.split('T')[0],
      sacred_honey_source: batch.sacred_honey_source,
      consciousness_blessing_level: batch.consciousness_blessing_level,
      quantity_produced: batch.quantity_produced.toString(),
      quantity_available: batch.quantity_available.toString(),
      storage_location: batch.storage_location
    });
    setShowBatchForm(true);
  };

  const getProductName = (productId: string) => {
    const product = products.find(p => p.id === productId);
    return product?.name || 'Unknown Product';
  };

  const getStockColor = (available: number, produced: number) => {
    const ratio = available / produced;
    if (ratio > 0.7) return 'text-green-600';
    if (ratio > 0.3) return 'text-amber-600';
    return 'text-red-600';
  };

  if (showBatchForm) {
    return (
      <Card className="border-emerald-200">
        <CardHeader>
          <CardTitle className="flex items-center text-emerald-700">
            <Package className="h-5 w-5 mr-2" />
            {selectedBatch ? 'Edit Sacred Batch' : 'Create New Sacred Batch'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="product_id">Sacred Product</Label>
                <select
                  id="product_id"
                  value={batchData.product_id}
                  onChange={(e) => setBatchData(prev => ({ ...prev, product_id: e.target.value }))}
                  className="w-full px-3 py-2 border border-input rounded-md"
                  required
                >
                  <option value="">Select Product</option>
                  {products.map(product => (
                    <option key={product.id} value={product.id}>
                      {product.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="batch_number">Batch Number</Label>
                <Input
                  id="batch_number"
                  value={batchData.batch_number}
                  onChange={(e) => setBatchData(prev => ({ ...prev, batch_number: e.target.value }))}
                  placeholder="Auto-generated if empty"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="production_date">Production Date</Label>
                <Input
                  id="production_date"
                  type="date"
                  value={batchData.production_date}
                  onChange={(e) => setBatchData(prev => ({ ...prev, production_date: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="expiry_date">Expiry Date</Label>
                <Input
                  id="expiry_date"
                  type="date"
                  value={batchData.expiry_date}
                  onChange={(e) => setBatchData(prev => ({ ...prev, expiry_date: e.target.value }))}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="sacred_honey_source">Sacred Honey Source</Label>
                <select
                  id="sacred_honey_source"
                  value={batchData.sacred_honey_source}
                  onChange={(e) => setBatchData(prev => ({ ...prev, sacred_honey_source: e.target.value }))}
                  className="w-full px-3 py-2 border border-input rounded-md"
                >
                  <option value="Kashmir Wildflower">Kashmir Wildflower</option>
                  <option value="Himalayan Acacia">Himalayan Acacia</option>
                  <option value="Sacred Valley Mixed">Sacred Valley Mixed</option>
                  <option value="Divine Clover">Divine Clover</option>
                  <option value="Mystical Manuka">Mystical Manuka</option>
                </select>
              </div>
              <div>
                <Label htmlFor="consciousness_blessing_level">Consciousness Blessing Level</Label>
                <select
                  id="consciousness_blessing_level"
                  value={batchData.consciousness_blessing_level}
                  onChange={(e) => setBatchData(prev => ({ ...prev, consciousness_blessing_level: parseInt(e.target.value) }))}
                  className="w-full px-3 py-2 border border-input rounded-md"
                >
                  <option value={200}>Courage (200)</option>
                  <option value={350}>Acceptance (350)</option>
                  <option value={500}>Love (500)</option>
                  <option value={700}>Enlightenment (700)</option>
                  <option value={1000}>Christ Consciousness (1000)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="quantity_produced">Quantity Produced</Label>
                <Input
                  id="quantity_produced"
                  type="number"
                  value={batchData.quantity_produced}
                  onChange={(e) => setBatchData(prev => ({ ...prev, quantity_produced: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="quantity_available">Quantity Available</Label>
                <Input
                  id="quantity_available"
                  type="number"
                  value={batchData.quantity_available}
                  onChange={(e) => setBatchData(prev => ({ ...prev, quantity_available: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="storage_location">Storage Location</Label>
                <select
                  id="storage_location"
                  value={batchData.storage_location}
                  onChange={(e) => setBatchData(prev => ({ ...prev, storage_location: e.target.value }))}
                  className="w-full px-3 py-2 border border-input rounded-md"
                >
                  <option value="Sacred Vault A">Sacred Vault A</option>
                  <option value="Sacred Vault B">Sacred Vault B</option>
                  <option value="Divine Cellar 1">Divine Cellar 1</option>
                  <option value="Divine Cellar 2">Divine Cellar 2</option>
                  <option value="Mystical Storage">Mystical Storage</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  setShowBatchForm(false);
                  setSelectedBatch(null);
                }}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading} className="bg-gradient-to-r from-emerald-600 to-teal-600">
                <Sparkles className="h-4 w-4 mr-2" />
                {loading ? 'Saving...' : `${selectedBatch ? 'Update' : 'Create'} Sacred Batch`}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Button 
          onClick={() => setShowBatchForm(true)}
          className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Sacred Batch
        </Button>
        <Badge className="bg-emerald-100 text-emerald-800">
          {inventoryBatches.length} Active Batches
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
        {inventoryBatches.map(batch => (
          <Card key={batch.id} className="hover:shadow-md transition-shadow border-emerald-200">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg text-emerald-900">{getProductName(batch.product_id)}</CardTitle>
                  <p className="text-sm text-gray-600">{batch.batch_number}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => editBatch(batch)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3 text-gray-500" />
                    <span>Produced: {new Date(batch.production_date).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="h-3 w-3 text-gray-500" />
                  <span>{batch.sacred_honey_source}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Available:</span>
                  <span className={`font-semibold ${getStockColor(batch.quantity_available, batch.quantity_produced)}`}>
                    {batch.quantity_available} / {batch.quantity_produced}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Consciousness:</span>
                  <Badge className="bg-purple-100 text-purple-800 text-xs">
                    ⚡ Level {batch.consciousness_blessing_level}
                  </Badge>
                </div>
                <div className="text-xs text-gray-500">
                  Stored in: {batch.storage_location}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default InventoryBatchManager;
