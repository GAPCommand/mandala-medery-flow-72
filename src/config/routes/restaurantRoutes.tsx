import React from 'react';
import { Route, Outlet } from 'react-router-dom';
import RestaurantLayout from '@/components/layout/RestaurantLayout';
import RestaurantDashboard from '@/components/restaurant/RestaurantDashboard';
import RestaurantCatalog from '@/components/restaurant/RestaurantCatalog';
import RestaurantOrdersPage from '@/pages/restaurant/RestaurantOrdersPage';
import RestaurantEventsPage from '@/pages/restaurant/RestaurantEventsPage';
import RestaurantMenuTemplatesPage from '@/pages/restaurant/RestaurantMenuTemplatesPage';
import RestaurantTrainingPage from '@/pages/restaurant/RestaurantTrainingPage';
import RestaurantAnalyticsPage from '@/pages/restaurant/RestaurantAnalyticsPage';
import RestaurantCustomerExperiencePage from '@/pages/restaurant/RestaurantCustomerExperiencePage';
import RestaurantResourcesPage from '@/pages/restaurant/RestaurantResourcesPage';
import RestaurantSettingsPage from '@/pages/restaurant/RestaurantSettingsPage';

export const restaurantRoutes = (
  <Route path="/restaurant" element={<RestaurantLayout><Outlet /></RestaurantLayout>}>
    <Route index element={<RestaurantDashboard />} />
    <Route path="catalog" element={<RestaurantCatalog />} />
    <Route path="orders" element={<RestaurantOrdersPage />} />
    <Route path="events" element={<RestaurantEventsPage />} />
    <Route path="menu-templates" element={<RestaurantMenuTemplatesPage />} />
    <Route path="training" element={<RestaurantTrainingPage />} />
    <Route path="analytics" element={<RestaurantAnalyticsPage />} />
    <Route path="customer-experience" element={<RestaurantCustomerExperiencePage />} />
    <Route path="resources" element={<RestaurantResourcesPage />} />
    <Route path="settings" element={<RestaurantSettingsPage />} />
  </Route>
);