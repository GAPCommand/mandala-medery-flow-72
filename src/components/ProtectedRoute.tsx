
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRoles = [] 
}) => {
  const { user, userRoles, loading } = useAuthContext();
  const location = useLocation();

  console.log('ProtectedRoute check:', { user, userRoles, requiredRoles, loading });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin text-amber-600" />
          <span className="text-amber-700">Authenticating...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If no specific roles required, allow authenticated users
  if (requiredRoles.length === 0) {
    return <>{children}</>;
  }

  // Check if user has required roles - allow access if user has ANY of the required roles
  const hasRequiredRole = requiredRoles.some(role => {
    const hasRole = userRoles && userRoles.includes(role);
    console.log(`Checking role ${role}:`, hasRole);
    return hasRole;
  });

  // For distributor routes, also allow if user has no roles yet (new users)
  const isDistributorRoute = location.pathname.startsWith('/distributor');
  const allowNewUsers = isDistributorRoute && (!userRoles || userRoles.length === 0);

  if (!hasRequiredRole && !allowNewUsers) {
    console.log('Access denied. User roles:', userRoles, 'Required:', requiredRoles);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100">
        <div className="text-center max-w-md mx-auto p-6">
          <h1 className="text-2xl font-bold text-red-700 mb-4">Access Denied</h1>
          <p className="text-red-600 mb-4">
            You don't have the required permissions to access this page.
          </p>
          <p className="text-sm text-red-500 mb-4">
            Required roles: {requiredRoles.join(', ')}
          </p>
          <p className="text-sm text-red-500">
            Your roles: {userRoles && userRoles.length > 0 ? userRoles.join(', ') : 'No roles assigned'}
          </p>
          <div className="mt-6">
            <button 
              onClick={() => window.location.href = '/login'}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
