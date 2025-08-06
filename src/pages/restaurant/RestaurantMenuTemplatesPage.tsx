import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BookOpen, 
  Search, 
  Download, 
  Eye, 
  Plus, 
  Star,
  Wine,
  ChefHat,
  Sparkles
} from 'lucide-react';

const RestaurantMenuTemplatesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const menuTemplates = [
    {
      id: 1,
      name: 'Sacred Tasting Menu',
      category: 'fine-dining',
      cuisine: 'Contemporary',
      courses: 7,
      description: 'Elevated multi-course experience with sacred mead pairings',
      pairings: ['Sacred Valley Original', 'Himalayan Reserve', 'Blessed Botanicals'],
      price_range: '$85-120',
      consciousness_level: 'elevated',
      downloads: 1247,
      rating: 4.8
    },
    {
      id: 2,
      name: 'Casual Conscious Dining',
      category: 'casual',
      cuisine: 'American',
      courses: 3,
      description: 'Approachable menu introducing customers to mindful dining',
      pairings: ['Gateway Blend', 'Sacred Valley Original'],
      price_range: '$25-45',
      consciousness_level: 'introductory',
      downloads: 2156,
      rating: 4.9
    },
    {
      id: 3,
      name: 'Seasonal Celebration',
      category: 'seasonal',
      cuisine: 'Seasonal',
      courses: 5,
      description: 'Rotating seasonal menu highlighting natural cycles',
      pairings: ['Seasonal Blends', 'Harvest Collection'],
      price_range: '$55-75',
      consciousness_level: 'moderate',
      downloads: 892,
      rating: 4.7
    },
    {
      id: 4,
      name: 'Business Lunch Enhancement',
      category: 'business',
      cuisine: 'Contemporary',
      courses: 2,
      description: 'Professional dining with subtle consciousness elevation',
      pairings: ['Executive Blend', 'Clear Focus Mead'],
      price_range: '$35-55',
      consciousness_level: 'subtle',
      downloads: 1834,
      rating: 4.6
    }
  ];

  const filteredTemplates = menuTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || template.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const getConsciousnessColor = (level: string) => {
    switch (level) {
      case 'elevated': return 'bg-purple-100 text-purple-800';
      case 'moderate': return 'bg-blue-100 text-blue-800';
      case 'introductory': return 'bg-green-100 text-green-800';
      case 'subtle': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-amber-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Menu Templates</h1>
            <p className="text-purple-100 mt-2">
              CRMGAP-powered menu templates with consciousness-aligned sacred mead pairings
            </p>
          </div>
          <Button className="bg-white/20 hover:bg-white/30 text-white border border-white/20">
            <Plus className="h-4 w-4 mr-2" />
            Create Custom
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <BookOpen className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <h3 className="font-medium">Templates</h3>
            <p className="text-2xl font-bold">{filteredTemplates.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Wine className="h-8 w-8 text-amber-600 mx-auto mb-2" />
            <h3 className="font-medium">Pairings</h3>
            <p className="text-2xl font-bold">24</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <ChefHat className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <h3 className="font-medium">Cuisines</h3>
            <p className="text-2xl font-bold">8</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Sparkles className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <h3 className="font-medium">Success Rate</h3>
            <p className="text-2xl font-bold">94%</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search templates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="fine-dining">Fine Dining</SelectItem>
                <SelectItem value="casual">Casual Dining</SelectItem>
                <SelectItem value="seasonal">Seasonal</SelectItem>
                <SelectItem value="business">Business</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <span>{template.name}</span>
                    <Badge className={getConsciousnessColor(template.consciousness_level)}>
                      {template.consciousness_level}
                    </Badge>
                  </CardTitle>
                  <p className="text-sm text-gray-600 mt-1">
                    {template.cuisine} • {template.courses} courses • {template.price_range}
                  </p>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{template.rating}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{template.description}</p>
              
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium mb-2">Sacred Mead Pairings:</h4>
                  <div className="flex flex-wrap gap-2">
                    {template.pairings.map((pairing, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {pairing}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-4 border-t">
                  <span className="text-sm text-gray-500">{template.downloads} downloads</span>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-1" />
                      Preview
                    </Button>
                    <Button size="sm" className="bg-gradient-to-r from-purple-600 to-amber-600">
                      <Download className="h-4 w-4 mr-1" />
                      Use Template
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* CRMGAP Integration Note */}
      <Card className="bg-gradient-to-r from-purple-50 to-amber-50 border-purple-200">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3">
            <Sparkles className="h-6 w-6 text-purple-600" />
            <div>
              <h3 className="font-medium text-purple-900">CRMGAP Template Management</h3>
              <p className="text-sm text-purple-700 mt-1">
                All menu templates are powered by the CRMGAP system with consciousness-aligned suggestions and automatic pairing recommendations based on your venue profile.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RestaurantMenuTemplatesPage;