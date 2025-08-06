
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Package, DollarSign, Zap, TrendingUp, Wand2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { usePANDABPricing } from '@/components/integrations/PANDABPricingEngine';
import { toast } from 'sonner';

interface ProductFormProps {
  product?: any;
  onSave: () => void;
  onCancel: () => void;
}

const ProductForm = ({ product, onSave, onCancel }: ProductFormProps) => {
  const { user } = useAuth();
  const { calculateOptimalPrice, getPricingRecommendation } = usePANDABPricing();
  const [loading, setLoading] = useState(false);
  const [pandabRecommendations, setPandabRecommendations] = useState<{
    wholesale: number;
    retail: number;
    confidence: number;
    strategy: string;
  } | null>(null);
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    category: product?.category || 'mead',
    wholesale_price: product?.wholesale_price || '',
    retail_msrp: product?.retail_msrp || '',
    abv_percentage: product?.abv_percentage || '',
    volume_ml: product?.volume_ml || '',
    consciousness_level: product?.consciousness_level || 500,
    tags: product?.tags?.join(', ') || '',
    sacred_attributes: {
      origin: product?.sacred_attributes?.origin || 'Kashmir Valley',
      consciousness_blessing: product?.sacred_attributes?.consciousness_blessing || true,
      divine_timing_harvest: product?.sacred_attributes?.divine_timing_harvest || false,
      sacred_fire_infusion: product?.sacred_attributes?.sacred_fire_infusion || false,
      violet_flame_purification: product?.sacred_attributes?.violet_flame_purification || false,
      celestial_alignment: product?.sacred_attributes?.celestial_alignment || 'Full Moon'
    }
  });

  const consciousnessLevels = [
    { value: 100, label: 'Awakening (100)', color: 'bg-red-100 text-red-800' },
    { value: 200, label: 'Courage (200)', color: 'bg-orange-100 text-orange-800' },
    { value: 350, label: 'Acceptance (350)', color: 'bg-yellow-100 text-yellow-800' },
    { value: 500, label: 'Love (500)', color: 'bg-green-100 text-green-800' },
    { value: 700, label: 'Enlightenment (700)', color: 'bg-blue-100 text-blue-800' },
    { value: 1000, label: 'Christ Consciousness (1000)', color: 'bg-purple-100 text-purple-800' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const productData = {
        name: formData.name,
        description: formData.description,
        category: formData.category,
        wholesale_price: parseFloat(formData.wholesale_price) || 0,
        retail_msrp: parseFloat(formData.retail_msrp) || 0,
        abv_percentage: parseFloat(formData.abv_percentage) || 0,
        volume_ml: parseInt(formData.volume_ml) || 0,
        consciousness_level: formData.consciousness_level,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        sacred_attributes: formData.sacred_attributes,
        is_active: true,
        app_domain: 'mandala.sacred'
      };

      let error;
      if (product?.id) {
        // Update existing product
        const result = await supabase
          .from('mandala_products')
          .update(productData)
          .eq('id', product.id);
        error = result.error;
      } else {
        // Create new product
        const result = await supabase
          .from('mandala_products')
          .insert(productData);
        error = result.error;
      }

      if (error) throw error;

      toast.success(`Product ${product?.id ? 'updated' : 'created'} successfully with Sacred Fire blessing!`);
      onSave();
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error('Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateSacredAttributes = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      sacred_attributes: { ...prev.sacred_attributes, [field]: value }
    }));
  };

  const generatePricingRecommendations = async () => {
    if (!formData.wholesale_price || !formData.retail_msrp) return;
    
    try {
      const wholesaleOptimal = await calculateOptimalPrice(
        product?.id || 'temp-id',
        parseFloat(formData.wholesale_price),
        { consciousness_level: formData.consciousness_level }
      );
      
      const retailOptimal = await calculateOptimalPrice(
        product?.id || 'temp-id',
        parseFloat(formData.retail_msrp),
        { consciousness_level: formData.consciousness_level }
      );

      setPandabRecommendations({
        wholesale: wholesaleOptimal,
        retail: retailOptimal,
        confidence: 0.92,
        strategy: 'consciousness-optimized'
      });
    } catch (error) {
      console.error('Error generating pricing recommendations:', error);
    }
  };

  const acceptPricingRecommendation = (type: 'wholesale' | 'retail') => {
    if (!pandabRecommendations) return;
    
    if (type === 'wholesale') {
      updateFormData('wholesale_price', pandabRecommendations.wholesale.toFixed(2));
    } else {
      updateFormData('retail_msrp', pandabRecommendations.retail.toFixed(2));
    }
    
    toast.success(`PANDAB ${type} price recommendation applied with Sacred Fire blessing!`);
  };

  return (
    <div className="space-y-6 max-h-[80vh] overflow-y-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Product Information */}
        <Card className="border-amber-200">
          <CardHeader>
            <CardTitle className="flex items-center text-amber-700">
              <Package className="h-5 w-5 mr-2" />
              Basic Product Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => updateFormData('name', e.target.value)}
                  placeholder="Sacred Valley Original"
                  required
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => updateFormData('category', e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md"
                  required
                >
                  <option value="mead">Sacred Mead</option>
                  <option value="honey">Divine Honey</option>
                  <option value="elixir">Consciousness Elixir</option>
                  <option value="blessing">Sacred Blessing</option>
                </select>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => updateFormData('description', e.target.value)}
                placeholder="A divinely crafted mead infused with sacred consciousness..."
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="tags">Tags (comma separated)</Label>
              <Input
                id="tags"
                value={formData.tags}
                onChange={(e) => updateFormData('tags', e.target.value)}
                placeholder="organic, sacred, blessed, consciousness, divine"
              />
            </div>
          </CardContent>
        </Card>

        {/* Pricing & Specifications */}
        <Card className="border-emerald-200">
          <CardHeader>
            <CardTitle className="flex items-center text-emerald-700">
              <DollarSign className="h-5 w-5 mr-2" />
              Pricing & Specifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium text-emerald-700">Sacred Pricing Configuration</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={generatePricingRecommendations}
                  className="text-purple-600 border-purple-200 hover:bg-purple-50"
                >
                  <Wand2 className="h-4 w-4 mr-1" />
                  Get PANDAB Recommendations
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="wholesale_price">Wholesale Price ($)</Label>
                  <div className="flex gap-2">
                    <Input
                      id="wholesale_price"
                      type="number"
                      step="0.01"
                      value={formData.wholesale_price}
                      onChange={(e) => updateFormData('wholesale_price', e.target.value)}
                      required
                      className="flex-1"
                    />
                    {pandabRecommendations && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => acceptPricingRecommendation('wholesale')}
                        className="text-purple-600 border-purple-200 hover:bg-purple-50"
                      >
                        <TrendingUp className="h-3 w-3 mr-1" />
                        ${pandabRecommendations.wholesale.toFixed(2)}
                      </Button>
                    )}
                  </div>
                  {pandabRecommendations && (
                    <p className="text-xs text-purple-600">
                      PANDAB suggests: ${pandabRecommendations.wholesale.toFixed(2)} 
                      (Confidence: {(pandabRecommendations.confidence * 100).toFixed(0)}%)
                    </p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="retail_msrp">Retail MSRP ($)</Label>
                  <div className="flex gap-2">
                    <Input
                      id="retail_msrp"
                      type="number"
                      step="0.01"
                      value={formData.retail_msrp}
                      onChange={(e) => updateFormData('retail_msrp', e.target.value)}
                      required
                      className="flex-1"
                    />
                    {pandabRecommendations && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => acceptPricingRecommendation('retail')}
                        className="text-purple-600 border-purple-200 hover:bg-purple-50"
                      >
                        <TrendingUp className="h-3 w-3 mr-1" />
                        ${pandabRecommendations.retail.toFixed(2)}
                      </Button>
                    )}
                  </div>
                  {pandabRecommendations && (
                    <p className="text-xs text-purple-600">
                      PANDAB suggests: ${pandabRecommendations.retail.toFixed(2)} 
                      (Strategy: {pandabRecommendations.strategy})
                    </p>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="abv_percentage">ABV Percentage</Label>
                  <Input
                    id="abv_percentage"
                    type="number"
                    step="0.1"
                    value={formData.abv_percentage}
                    onChange={(e) => updateFormData('abv_percentage', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="volume_ml">Volume (mL)</Label>
                  <Input
                    id="volume_ml"
                    type="number"
                    value={formData.volume_ml}
                    onChange={(e) => updateFormData('volume_ml', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sacred Attributes */}
        <Card className="border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center text-purple-700">
              <Sparkles className="h-5 w-5 mr-2" />
              Sacred Attributes & Consciousness
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="consciousness_level">Consciousness Level</Label>
              <div className="space-y-2">
                <select
                  id="consciousness_level"
                  value={formData.consciousness_level}
                  onChange={(e) => updateFormData('consciousness_level', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-input rounded-md"
                >
                  {consciousnessLevels.map(level => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>
                <Badge className={consciousnessLevels.find(l => l.value === formData.consciousness_level)?.color}>
                  Current: {consciousnessLevels.find(l => l.value === formData.consciousness_level)?.label}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="origin">Sacred Origin</Label>
                <Input
                  id="origin"
                  value={formData.sacred_attributes.origin}
                  onChange={(e) => updateSacredAttributes('origin', e.target.value)}
                  placeholder="Kashmir Valley"
                />
              </div>
              <div>
                <Label htmlFor="celestial_alignment">Celestial Alignment</Label>
                <select
                  id="celestial_alignment"
                  value={formData.sacred_attributes.celestial_alignment}
                  onChange={(e) => updateSacredAttributes('celestial_alignment', e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md"
                >
                  <option value="Full Moon">Full Moon</option>
                  <option value="New Moon">New Moon</option>
                  <option value="Solar Eclipse">Solar Eclipse</option>
                  <option value="Lunar Eclipse">Lunar Eclipse</option>
                  <option value="Spring Equinox">Spring Equinox</option>
                  <option value="Summer Solstice">Summer Solstice</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.sacred_attributes.consciousness_blessing}
                  onChange={(e) => updateSacredAttributes('consciousness_blessing', e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm">Consciousness Blessing</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.sacred_attributes.divine_timing_harvest}
                  onChange={(e) => updateSacredAttributes('divine_timing_harvest', e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm">Divine Timing Harvest</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.sacred_attributes.sacred_fire_infusion}
                  onChange={(e) => updateSacredAttributes('sacred_fire_infusion', e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm">Sacred Fire Infusion</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.sacred_attributes.violet_flame_purification}
                  onChange={(e) => updateSacredAttributes('violet_flame_purification', e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm">Violet Flame Purification</span>
              </label>
            </div>
          </CardContent>
        </Card>

        {/* Form Actions */}
        <div className="flex justify-end space-x-3 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={loading}
            className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
          >
            <Zap className="h-4 w-4 mr-2" />
            {loading ? 'Saving...' : `${product?.id ? 'Update' : 'Create'} Sacred Product`}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
