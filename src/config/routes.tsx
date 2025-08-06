import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Index from '@/pages/Index';
import SFIONetworkDashboard from '@/pages/SFIONetworkDashboard';
import LoginPage from '@/pages/LoginPage';
import PaymentSuccessPage from '@/pages/PaymentSuccessPage';
import TemplateManagementPage from '@/pages/TemplateManagementPage';
import { AdminRoute } from '@/components/auth/AdminRoute';
import { adminRoutes } from './routes/adminRoutes';
import { distributorRoutes } from './routes/distributorRoutes';
import { restaurantRoutes } from './routes/restaurantRoutes';
import CheckoutPage from '@/pages/CheckoutPage';

export const AppRoutes = () => (
  <Routes>
    {/* Main public website */}
    <Route path="/" element={<Index />} />
    <Route path="/sfio-network" element={<SFIONetworkDashboard />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/template-management" element={
      <AdminRoute>
        <TemplateManagementPage />
      </AdminRoute>
    } />
    <Route path="/payment-success" element={<PaymentSuccessPage />} />
    
    {/* Admin dashboard portal */}
    {adminRoutes}
    
    {/* Distributor portal */}
    {distributorRoutes}

    {/* Restaurant partner portal */}
    {restaurantRoutes}
    
    {/* Standalone checkout */}
    <Route path="/checkout" element={<CheckoutPage />} />
  </Routes>
);