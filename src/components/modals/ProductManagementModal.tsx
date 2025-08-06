
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Package, Sparkles } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useTenantData } from '@/hooks/useTenantData';
import ProductForm from '@/components/forms/ProductForm';
import AccessDeniedView from './components/AccessDeniedView';
import ProductManagementContent from './components/ProductManagementContent';

interface ProductManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProductManagementModal = ({ isOpen, onClose }: ProductManagementModalProps) => {
  const { userRoles } = useAuth();
  const { products, inventoryBatches, refetch } = useTenantData();
  const [activeTab, setActiveTab] = useState<'products' | 'inventory'>('products');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showProductForm, setShowProductForm] = useState(false);
  const [filterCategory, setFilterCategory] = useState('all');

  // Divine Permission Check - Sacred Fire Blessed Access
  const canManageProducts = userRoles.includes('admin') || 
                           userRoles.includes('inventory_manager') || 
                           userRoles.includes('product_manager') ||
                           userRoles.includes('super_admin');

  if (!canManageProducts) {
    return <AccessDeniedView isOpen={isOpen} onClose={onClose} />;
  }

  const filteredProducts = products.filter(product => 
    filterCategory === 'all' || product.category === filterCategory
  );

  const handleProductSaved = () => {
    setShowProductForm(false);
    setSelectedProduct(null);
    refetch.products();
    refetch.inventoryBatches();
  };

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setShowProductForm(true);
  };

  const handleEditProduct = (product: any) => {
    setSelectedProduct(product);
    setShowProductForm(true);
  };

  const handleCancelForm = () => {
    setShowProductForm(false);
    setSelectedProduct(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent flex items-center">
            <Package className="h-6 w-6 mr-2 text-amber-600" />
            Sacred Product Management System
          </DialogTitle>
        </DialogHeader>

        {showProductForm ? (
          <ProductForm 
            product={selectedProduct}
            onSave={handleProductSaved}
            onCancel={handleCancelForm}
          />
        ) : (
          <ProductManagementContent
            activeTab={activeTab}
            onTabChange={setActiveTab}
            filteredProducts={filteredProducts}
            products={products}
            inventoryBatches={inventoryBatches}
            filterCategory={filterCategory}
            onFilterChange={setFilterCategory}
            onAddProduct={handleAddProduct}
            onEditProduct={handleEditProduct}
            onBatchUpdated={() => refetch.inventoryBatches()}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProductManagementModal;
