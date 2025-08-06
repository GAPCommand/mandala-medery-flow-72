
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCatalog from '@/components/ProductCatalog';
import DistributorCatalog from '@/components/distributor/DistributorCatalog';
import { seedSampleProducts } from '@/utils/seedProducts';

const CatalogPage = () => {
  const location = useLocation();
  const isDistributorPortal = location.pathname.startsWith('/distributor');

  useEffect(() => {
    // Seed products on first load if needed
    seedSampleProducts();
  }, []);

  return (
    <div id="catalog">
      {isDistributorPortal ? <DistributorCatalog /> : <ProductCatalog />}
    </div>
  );
};

export default CatalogPage;
