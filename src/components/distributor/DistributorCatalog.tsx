
import React, { useState } from 'react';
import { useMandalaData } from '@/hooks/useMandalaData';
import { LoadingSpinner, LoadingCard } from '@/components/ui/loading-spinner';
import CatalogHeader from './catalog/CatalogHeader';
import CatalogFilters from './catalog/CatalogFilters';
import EmptyState from './catalog/EmptyState';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package, Sparkles, Plus, Minus } from "lucide-react";
import { useIsMobile } from '@/hooks/use-mobile';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

const DistributorCatalog = () => {
  const { products, inventoryBatches, loading } = useMandalaData();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSource, setSelectedSource] = useState<string>('all');
  const isMobile = useIsMobile();

  // Convert Mandala products to universal format for compatibility
  const universalProducts = products.map(product => ({
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.wholesale_price,
    retail_price: product.retail_msrp,
    category: product.category,
    tags: product.tags || [],
    metadata: product.sacred_attributes,
    inventory_count: getProductStockLevel(product.id),
    status: 'active' as const,
    source: 'mandala' as const
  }));

  function getProductStockLevel(productId: string) {
    const productBatches = inventoryBatches.filter(batch => 
      batch.product_id === productId && batch.status === 'active'
    );
    return productBatches.reduce((sum, batch) => sum + (batch.quantity_available || 0), 0);
  }

  const handleAddToCart = (productId: string, quantity: number) => {
    const product = products.find(p => p.id === productId);
    const stockLevel = getProductStockLevel(productId);
    
    if (!product) {
      toast({
        title: "Product Not Found",
        description: "Unable to add product to cart",
        variant: "destructive",
      });
      return;
    }

    if (stockLevel < quantity) {
      toast({
        title: "Insufficient Stock",
        description: `Only ${stockLevel} units available for ${product.name}`,
        variant: "destructive",
      });
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      price: product.wholesale_price,
      category: product.category,
      quantity: quantity
    });

    toast({
      title: "Added to Cart",
      description: `${quantity} x ${product.name} added to cart`,
    });
  };

  const filteredProducts = universalProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSource = selectedSource === 'all' || product.source === selectedSource;
    
    return matchesSearch && matchesCategory && matchesSource;
  });

  const categories = ['all', ...Array.from(new Set(universalProducts.map(p => p.category)))];
  const sources = ['all', 'mandala']; // Only Mandala source for now

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <LoadingSpinner />
          <h1 className="text-2xl sm:text-3xl font-bold text-amber-800">Loading Sacred Catalog...</h1>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <LoadingCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <CatalogHeader />

      <CatalogFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedSource={selectedSource}
        setSelectedSource={setSelectedSource}
        categories={categories}
        sources={sources}
      />

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-amber-700 text-sm sm:text-base">
          {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
        </p>
      </div>

      {/* Product Grid - Mobile Optimized */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredProducts.map((product) => {
          const originalProduct = products.find(p => p.id === product.id);
          const latestBatch = inventoryBatches
            .filter(batch => batch.product_id === product.id && batch.status === 'active')
            .sort((a, b) => new Date(b.production_date).getTime() - new Date(a.production_date).getTime())[0];

          return (
            <Card key={product.id} className="p-3 sm:p-4 hover:shadow-lg transition-all bg-gradient-to-br from-white to-amber-50 border-amber-200">
              <div className="flex items-center space-x-3 sm:space-x-4 mb-3">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Package className="h-6 w-6 sm:h-8 sm:w-8 text-amber-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-amber-900 text-sm sm:text-base truncate">{product.name}</h3>
                  <div className="flex items-center space-x-1 sm:space-x-2 mt-1">
                    <Badge className="bg-amber-100 text-amber-800 text-xs">
                      {originalProduct?.abv_percentage || 0}% ABV
                    </Badge>
                    {originalProduct && originalProduct.consciousness_level >= 9 && (
                      <Badge className="bg-purple-100 text-purple-800 text-xs">
                        <Sparkles className="h-3 w-3 mr-1" />
                        Level {originalProduct.consciousness_level}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-xs sm:text-sm">Wholesale:</span>
                    <span className="font-bold text-green-700 text-xs sm:text-sm">${product.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs sm:text-sm">Retail MSRP:</span>
                    <span className="text-gray-600 text-xs sm:text-sm">${product.retail_price}</span>
                  </div>
                </div>
                
                {latestBatch && (
                  <div className="text-xs text-gray-600">
                    Available: {latestBatch.quantity_available} bottles
                    <br />
                    Batch: {latestBatch.batch_number}
                  </div>
                )}

                <div className={`flex ${isMobile ? 'flex-col space-y-2' : 'space-x-2'}`}>
                  <Button
                    size="sm"
                    className="flex-1 bg-amber-500 hover:bg-amber-600 text-xs sm:text-sm"
                    disabled={!latestBatch || latestBatch.quantity_available < 6}
                    onClick={() => handleAddToCart(product.id, 6)}
                  >
                    Add 6 Pack
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 bg-amber-600 hover:bg-amber-700 text-xs sm:text-sm"
                    disabled={!latestBatch || latestBatch.quantity_available < 12}
                    onClick={() => handleAddToCart(product.id, 12)}
                  >
                    Add Case (12)
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {filteredProducts.length === 0 && <EmptyState />}
    </div>
  );
};

export default DistributorCatalog;
