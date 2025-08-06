
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useMandalaData } from '@/hooks/useMandalaData';
import { 
  Wine, 
  Package, 
  Star, 
  Download, 
  ChefHat, 
  Users,
  Calendar,
  Sparkles,
  ShoppingCart
} from 'lucide-react';

interface RestaurantProduct {
  id: string;
  name: string;
  description: string;
  restaurantPrice: number; // Between wholesale and retail
  retailPrice: number;
  caseSize: number;
  abv: string;
  pairingNotes: string[];
  menuSuggestions: string[];
  consciousnessLevel: number;
  idealFor: string[];
  minimumOrder: number;
}

const RestaurantCatalog = () => {
  const { products, loading } = useMandalaData();
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock restaurant pricing (in real app, this would come from backend)
  const restaurantProducts: RestaurantProduct[] = [
    {
      id: '1',
      name: 'Sacred Valley Original',
      description: 'Our flagship mead, crafted with ancient Kashmir honey and blessed with sacred fire consciousness',
      restaurantPrice: 28, // Between wholesale ($24) and retail ($35)
      retailPrice: 35,
      caseSize: 12,
      abv: '12.5%',
      pairingNotes: ['Roasted duck with pomegranate', 'Aged cheeses', 'Dark chocolate desserts'],
      menuSuggestions: ['Sacred Valley Pairing Menu', 'Consciousness Dinner Experience'],
      consciousnessLevel: 5,
      idealFor: ['Fine dining', 'Special occasions', 'Sacred ceremonies'],
      minimumOrder: 1
    },
    {
      id: '2',
      name: 'Saffron Blessed Mead',
      description: 'Infused with Kashmir saffron and elevated through sacred blessing rituals',
      restaurantPrice: 32,
      retailPrice: 42,
      caseSize: 12,
      abv: '13.2%',
      pairingNotes: ['Lamb biryani', 'Saffron rice pudding', 'Persian cuisine'],
      menuSuggestions: ['Saffron Sunset Tasting', 'Royal Kashmir Experience'],
      consciousnessLevel: 7,
      idealFor: ['Luxury dining', 'Cultural events', 'Wedding ceremonies'],
      minimumOrder: 1
    },
    {
      id: '3',
      name: 'Himalayan Reserve',
      description: 'Limited edition mead from high-altitude honey, aged with consciousness-raising herbs',
      restaurantPrice: 45,
      retailPrice: 65,
      caseSize: 6,
      abv: '14.8%',
      pairingNotes: ['Wagyu beef', 'Truffle dishes', 'Himalayan salt-cured fish'],
      menuSuggestions: ['Summit Experience', 'Enlightenment Tasting Journey'],
      consciousnessLevel: 10,
      idealFor: ['Ultra-fine dining', 'VIP experiences', 'Spiritual retreats'],
      minimumOrder: 1
    }
  ];

  const categories = [
    { id: 'all', name: 'All Products', icon: Wine },
    { id: 'signature', name: 'Signature Collection', icon: Star },
    { id: 'limited', name: 'Limited Editions', icon: Sparkles },
    { id: 'events', name: 'Event Specials', icon: Calendar }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        <p className="mt-2 text-purple-600">Loading Sacred Collection...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent mb-4">
          Restaurant Partner Catalog
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Exclusive restaurant pricing on sacred mead collection. Complete with pairing guides, menu templates, and consciousness elevation materials.
        </p>
      </div>

      {/* Restaurant Benefits Banner */}
      <Card className="bg-gradient-to-r from-purple-50 to-amber-50 border-purple-200">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Package className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="font-semibold text-purple-900">Restaurant Pricing</p>
                <p className="text-sm text-purple-700">20-30% off retail</p>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                <ChefHat className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="font-semibold text-amber-900">Menu Integration</p>
                <p className="text-sm text-amber-700">Pairing guides included</p>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-blue-900">Staff Training</p>
                <p className="text-sm text-blue-700">Sacred knowledge materials</p>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-green-900">Event Support</p>
                <p className="text-sm text-green-700">Sacred ceremony planning</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? 'default' : 'outline'}
            onClick={() => setSelectedCategory(category.id)}
            className="flex items-center space-x-2"
          >
            <category.icon className="h-4 w-4" />
            <span>{category.name}</span>
          </Button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {restaurantProducts.map((product) => (
          <Card key={product.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl text-purple-900">{product.name}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">{product.description}</p>
                </div>
                <Badge className="bg-purple-100 text-purple-800">
                  Level {product.consciousnessLevel}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Pricing */}
              <div className="bg-gradient-to-r from-purple-50 to-amber-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-bold text-purple-900">
                    ${product.restaurantPrice}/bottle
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    Retail: ${product.retailPrice}
                  </span>
                </div>
                <div className="text-sm text-purple-700">
                  Case of {product.caseSize}: ${product.restaurantPrice * product.caseSize}
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  Min order: {product.minimumOrder} case(s) • {product.abv} ABV
                </div>
              </div>

              {/* Pairing Notes */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2 flex items-center space-x-1">
                  <ChefHat className="h-4 w-4" />
                  <span>Perfect Pairings</span>
                </h4>
                <div className="flex flex-wrap gap-1">
                  {product.pairingNotes.slice(0, 2).map((note, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {note}
                    </Badge>
                  ))}
                  {product.pairingNotes.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{product.pairingNotes.length - 2} more
                    </Badge>
                  )}
                </div>
              </div>

              {/* Ideal For */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2 flex items-center space-x-1">
                  <Sparkles className="h-4 w-4" />
                  <span>Ideal For</span>
                </h4>
                <div className="flex flex-wrap gap-1">
                  {product.idealFor.map((use, index) => (
                    <Badge key={index} className="bg-amber-100 text-amber-800 text-xs">
                      {use}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <Button className="flex-1 bg-gradient-to-r from-purple-600 to-amber-600 hover:from-purple-700 hover:to-amber-700">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>

              {/* Menu Templates */}
              <div className="pt-2 border-t">
                <p className="text-xs text-gray-600 mb-2">Menu Templates Available:</p>
                <div className="space-y-1">
                  {product.menuSuggestions.map((suggestion, index) => (
                    <div key={index} className="flex justify-between items-center text-xs">
                      <span className="text-purple-700">{suggestion}</span>
                      <Button variant="ghost" size="sm" className="h-6 px-2">
                        <Download className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Additional Resources */}
      <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
        <CardHeader>
          <CardTitle className="text-center text-amber-900">Restaurant Partner Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <Download className="h-6 w-6 text-amber-600" />
              <div className="text-center">
                <p className="font-medium">Menu Templates</p>
                <p className="text-xs text-gray-600">Sacred dining experiences</p>
              </div>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <Users className="h-6 w-6 text-purple-600" />
              <div className="text-center">
                <p className="font-medium">Staff Training</p>
                <p className="text-xs text-gray-600">Sacred knowledge courses</p>
              </div>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <Calendar className="h-6 w-6 text-blue-600" />
              <div className="text-center">
                <p className="font-medium">Event Planning</p>
                <p className="text-xs text-gray-600">Sacred ceremony guides</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RestaurantCatalog;
