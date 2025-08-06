import React from 'react';
import { Route, Outlet } from 'react-router-dom';
import DistributorLayout from '@/components/layout/DistributorLayout';
import DistributorDashboard from '@/pages/dashboard/DistributorDashboard';
import OrderManagement from '@/pages/dashboard/OrderManagement';
import InventoryManagement from '@/pages/dashboard/InventoryManagement';
import CatalogPage from '@/pages/CatalogPage';
import CartPage from '@/pages/CartPage';
import DistributorTerritoryPage from '@/pages/DistributorTerritoryPage';
import DistributorAnalyticsPage from '@/pages/DistributorAnalyticsPage';
import DistributorMarketingPage from '@/pages/DistributorMarketingPage';
import DistributorCustomersPage from '@/pages/DistributorCustomersPage';
import DistributorKnowledgePage from '@/pages/DistributorKnowledgePage';
import DistributorSupportPage from '@/pages/DistributorSupportPage';

export const distributorRoutes = (
  <Route path="/distributor" element={<DistributorLayout><Outlet /></DistributorLayout>}>
    <Route index element={<DistributorDashboard />} />
    <Route path="orders" element={<OrderManagement />} />
    <Route path="inventory" element={<InventoryManagement />} />
    <Route path="catalog" element={<CatalogPage />} />
    <Route path="cart" element={<CartPage />} />
    <Route path="territory" element={<DistributorTerritoryPage />} />
    <Route path="analytics" element={<DistributorAnalyticsPage />} />
    <Route path="marketing" element={<DistributorMarketingPage />} />
    <Route path="customers" element={<DistributorCustomersPage />} />
    <Route path="knowledge" element={<DistributorKnowledgePage />} />
    <Route path="support" element={<DistributorSupportPage />} />
  </Route>
);