
import React from 'react';
import { useAuthContext } from '@/contexts/AuthContext';
import DashboardOverview from './dashboard/DashboardOverview';
import AdminDashboard from '@/components/admin/AdminDashboard';

const Dashboard = () => {
  const { userRoles, loading } = useAuthContext();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-2 text-amber-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Check if user has admin roles that should see the admin dashboard
  const isAdmin = userRoles.includes('admin') || userRoles.includes('super_admin') || userRoles.includes('staff');

  if (isAdmin) {
    return <AdminDashboard />;
  }

  // Fallback to general dashboard overview
  return <DashboardOverview />;
};

export default Dashboard;
