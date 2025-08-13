import React from 'react';
import { Route } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Dashboard from '@/pages/Dashboard';
import CatalogPage from '@/pages/CatalogPage';
import OrderManagement from '@/pages/dashboard/OrderManagement';
import InventoryManagement from '@/pages/dashboard/InventoryManagement';
import DistributorManagement from '@/pages/dashboard/DistributorManagement';
import AnalyticsPage from '@/pages/AnalyticsPage';
import AdminPricingAnalytics from '@/components/admin/AdminPricingAnalytics';
import TerritoryManagementPage from '@/pages/dashboard/TerritoryManagementPage';
import PerformancePage from '@/pages/PerformancePage';
import UsersPage from '@/pages/UsersPage';
import SecurityPage from '@/pages/SecurityPage';
import SettingsPage from '@/pages/SettingsPage';
import AdminTemplateDeployment from '@/components/admin/AdminTemplateDeployment';
import TemplateMarketplaceManager from '@/components/admin/TemplateMarketplaceManager';
import FullTemplateSystemTest from '@/components/test/FullTemplateSystemTest';
import { TemplateGenerationPanel } from '@/components/admin/TemplateGenerationPanel';

export const adminRoutes = (
  <Route path="/dashboard" element={<DashboardLayout />}>
    <Route index element={<Dashboard />} />
    <Route path="catalog" element={<CatalogPage />} />
    <Route path="orders" element={<OrderManagement />} />
    <Route path="inventory" element={<InventoryManagement />} />
    <Route path="distributors" element={<DistributorManagement />} />
    <Route path="analytics" element={<AnalyticsPage />} />
    <Route path="pricing-analytics" element={<AdminPricingAnalytics />} />
    <Route path="territories" element={<TerritoryManagementPage />} />
    <Route path="performance" element={<PerformancePage />} />
    <Route path="users" element={<UsersPage />} />
    <Route path="templates" element={<AdminTemplateDeployment />} />
    <Route path="marketplace" element={<TemplateMarketplaceManager />} />
    <Route path="system-tests" element={<FullTemplateSystemTest />} />
    <Route path="template-generator" element={<TemplateGenerationPanel />} />
    <Route path="security" element={<SecurityPage />} />
    <Route path="settings" element={<SettingsPage />} />
  </Route>
);