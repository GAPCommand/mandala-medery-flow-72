import React from 'react';
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

interface ProductCatalogHeaderProps {
  canManageProducts: boolean;
  onManageProducts: () => void;
}

export const ProductCatalogHeader: React.FC<ProductCatalogHeaderProps> = ({
  canManageProducts,
  onManageProducts
}) => (
  <div className="text-center">
    <div className="flex justify-between items-center mb-4">
      <div className="flex-1">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
          Sacred Mead Collection
        </h2>
      </div>
      {canManageProducts && (
        <Button 
          onClick={onManageProducts}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
        >
          <Settings className="h-4 w-4 mr-2" />
          Manage Products
        </Button>
      )}
    </div>
    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
      Handcrafted in the mystical valleys of Kashmir, each bottle carries the essence of ancient traditions and sacred honey
    </p>
  </div>
);