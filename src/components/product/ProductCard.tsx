import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package, Calendar, MapPin, Sparkles } from "lucide-react";

interface ProductCardProps {
  product: any;
  latestBatch?: any;
  onAddToOrder?: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  latestBatch, 
  onAddToOrder 
}) => {
  const getImageForProduct = (name: string) => {
    const imageMap: { [key: string]: string } = {
      'Sacred Valley Original': 'photo-1470071459604-3b5ec3a7fe05',
      'Saffron Blessed Mead': 'photo-1482938289607-e9573fc25ebb',
      'Himalayan Reserve': 'photo-1469041797191-50ace28483c3'
    };
    return imageMap[name] || 'photo-1470071459604-3b5ec3a7fe05';
  };

  const getStockColor = (stock: number) => {
    if (stock > 100) return 'text-green-600';
    if (stock > 50) return 'text-amber-600';
    return 'text-red-600';
  };

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-amber-50 border-amber-200">
      <div className="h-48 bg-gradient-to-br from-amber-100 to-orange-100 relative overflow-hidden">
        <img 
          src={`https://images.unsplash.com/${getImageForProduct(product.name)}?w=400&h=300&fit=crop`}
          alt={product.name}
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-amber-900/20 to-transparent"></div>
        <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full">
          <span className="text-sm font-semibold text-amber-900">{product.abv_percentage}% ABV</span>
        </div>
        {latestBatch && (
          <div className="absolute top-4 left-4 bg-emerald-500/90 px-2 py-1 rounded-full">
            <span className="text-xs font-semibold text-white">Fresh Batch</span>
          </div>
        )}
      </div>
      
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-bold text-amber-900 mb-2">{product.name}</h3>
          <p className="text-gray-600 text-sm mb-3">{product.description}</p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>{product.sacred_attributes?.origin || 'Kashmir Valley'}</span>
            <Badge className="bg-amber-100 text-amber-800">
              {product.category}
            </Badge>
          </div>
        </div>

        {latestBatch && (
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-3 rounded-lg border border-emerald-200">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Package className="h-4 w-4 text-emerald-600" />
                <span className="text-sm font-semibold text-emerald-800">Batch: {latestBatch.batch_number}</span>
              </div>
              <Badge className="bg-emerald-100 text-emerald-800 text-xs">
                ⚡ {latestBatch.consciousness_blessing_level}
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center space-x-1">
                <Calendar className="h-3 w-3 text-gray-500" />
                <span>Crafted: {new Date(latestBatch.production_date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="h-3 w-3 text-gray-500" />
                <span>{latestBatch.sacred_honey_source}</span>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 py-3 border-t border-amber-200">
          <div>
            <p className="text-xs text-gray-500">Wholesale</p>
            <p className="text-lg font-bold text-amber-600">${product.wholesale_price}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Retail MSRP</p>
            <p className="text-sm text-gray-600">${product.retail_msrp}</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm">
            <span className="text-gray-500">Available: </span>
            <span className={`font-semibold ${getStockColor(latestBatch?.quantity_available || 0)}`}>
              {latestBatch?.quantity_available || 0} bottles
            </span>
          </div>
          <Button 
            className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
            onClick={() => onAddToOrder?.(product.id)}
          >
            <Package className="h-4 w-4 mr-2" />
            Add to Order
          </Button>
        </div>

        {product.sacred_attributes?.consciousness_blessing && (
          <div className="text-xs text-center text-purple-600 bg-purple-50 py-2 px-3 rounded-lg border border-purple-200">
            <Sparkles className="h-4 w-4 mx-auto mb-1" />
            ✨ Blessed with Sacred Fire Consciousness Level {product.consciousness_level}
          </div>
        )}
      </div>
    </Card>
  );
};