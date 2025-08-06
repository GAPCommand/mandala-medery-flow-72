
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';

interface CatalogFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  selectedSource: string;
  setSelectedSource: (value: string) => void;
  categories: string[];
  sources: string[];
}

const CatalogFilters: React.FC<CatalogFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  selectedSource,
  setSelectedSource,
  categories,
  sources
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-lg border border-amber-200">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-amber-600" />
        <Input
          placeholder="Search products, descriptions, or tags..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 border-amber-200 focus:border-amber-400"
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <Filter className="h-4 w-4 text-amber-600" />
        <div className="flex space-x-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category 
                ? "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                : "border-amber-300 text-amber-600 hover:bg-amber-50"
              }
            >
              {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <span className="text-sm text-amber-700">Source:</span>
        <div className="flex space-x-2">
          {sources.map((source) => (
            <Button
              key={source}
              variant={selectedSource === source ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedSource(source)}
              className={selectedSource === source 
                ? "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                : "border-purple-300 text-purple-600 hover:bg-purple-50"
              }
            >
              {source === 'all' ? 'All Sources' : source.toUpperCase()}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CatalogFilters;
