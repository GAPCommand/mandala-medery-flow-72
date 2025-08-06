
import React from 'react';
import { Package, Sparkles, Star, Zap } from 'lucide-react';

export const getSourceIcon = (source: string) => {
  switch (source) {
    case 'pandab': return <Zap className="h-4 w-4" />;
    case 'universal': return <Star className="h-4 w-4" />;
    case 'mandala': return <Sparkles className="h-4 w-4" />;
    default: return <Package className="h-4 w-4" />;
  }
};

export const getSourceColor = (source: string) => {
  switch (source) {
    case 'pandab': return 'bg-purple-100 text-purple-800';
    case 'universal': return 'bg-blue-100 text-blue-800';
    case 'mandala': return 'bg-amber-100 text-amber-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};
