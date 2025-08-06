
import React from 'react';
import { Package } from 'lucide-react';

const EmptyState: React.FC = () => {
  return (
    <div className="text-center py-12">
      <Package className="h-12 w-12 text-amber-400 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-amber-800 mb-2">No products found</h3>
      <p className="text-amber-600">Try adjusting your search or filter criteria</p>
    </div>
  );
};

export default EmptyState;
