
import React from 'react';
import { Sparkles } from 'lucide-react';

const CatalogHeader: React.FC = () => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold text-amber-800 flex items-center">
          <Sparkles className="mr-2 h-8 w-8 text-amber-600" />
          Universal Product Catalog
        </h1>
        <p className="text-amber-600 mt-2">
          Integrated catalog from Universal Platform, PANDAB, and Mandala Mead
        </p>
      </div>
    </div>
  );
};

export default CatalogHeader;
