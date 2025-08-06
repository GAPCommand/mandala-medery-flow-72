
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import UserMenuDropdown from './layout/UserMenuDropdown';
import { Package, ChefHat } from 'lucide-react';

const Header = () => {
  const { user, userRoles } = useAuthContext();
  const navigate = useNavigate();

  const handlePortalLogin = () => {
    if (user) {
      // Redirect based on user role
      if (userRoles.includes('distributor')) {
        navigate('/distributor');
      } else if (userRoles.includes('admin') || userRoles.includes('staff')) {
        navigate('/dashboard');
      } else {
        navigate('/distributor'); // default fallback
      }
    } else {
      navigate('/login');
    }
  };

  const scrollToCatalog = () => {
    const catalogElement = document.getElementById('catalog');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getDistributorLink = () => {
    if (!user) return '/login';
    if (userRoles.includes('admin') || userRoles.includes('staff')) {
      return '/dashboard';
    }
    return '/distributor';
  };

  const getOrdersLink = () => {
    if (!user) return '/login';
    if (userRoles.includes('admin') || userRoles.includes('staff')) {
      return '/dashboard/orders';
    }
    return '/distributor/orders';
  };

  const getAnalyticsLink = () => {
    if (!user) return '/login';
    if (userRoles.includes('admin') || userRoles.includes('staff')) {
      return '/dashboard/analytics';
    }
    return '/distributor/analytics';
  };

  return (
    <header className="bg-gradient-to-r from-amber-900 via-red-900 to-orange-900 text-white shadow-2xl">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* User Menu - Only show if logged in */}
            {user && <UserMenuDropdown />}
            
            <Link to="/" className="flex items-center space-x-4">
              {/* Sacred Mandala Symbol */}
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <div className="w-8 h-8 border-2 border-white rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
              
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-200 to-orange-200 bg-clip-text text-transparent">
                  Mandala Medery
                </h1>
                <p className="text-amber-200 text-sm">Sacred Kashmir Mead • Oakland Distribution Hub</p>
              </div>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <a href="#catalog" className="text-amber-700 hover:text-amber-900 transition-colors">
              Sacred Collection
            </a>
            <a href="#contact" className="text-amber-700 hover:text-amber-900 transition-colors">
              Contact
            </a>
            
            {user ? (
              <div className="flex items-center space-x-4">
                {(userRoles.includes('admin') || userRoles.includes('staff')) && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => navigate('/dashboard')}
                    className="border-blue-600 text-blue-700 hover:bg-blue-50"
                  >
                    <Package className="h-4 w-4 mr-2" />
                    Admin Dashboard
                  </Button>
                )}
                
                {(userRoles.includes('distributor') || userRoles.includes('admin')) && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => navigate('/distributor')}
                    className="border-amber-600 text-amber-700 hover:bg-amber-50"
                  >
                    <Package className="h-4 w-4 mr-2" />
                    Distributor Portal
                  </Button>
                )}
                
                {(userRoles.includes('custom') || userRoles.includes('admin')) && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => navigate('/restaurant')}
                    className="border-purple-600 text-purple-700 hover:bg-purple-50"
                  >
                    <ChefHat className="h-4 w-4 mr-2" />
                    Restaurant Portal
                  </Button>
                )}
                
                <UserMenuDropdown />
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate('/login')}
                  className="border-amber-600 text-amber-700 hover:bg-amber-50"
                >
                  Distributor Login
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate('/login')}
                  className="border-purple-600 text-purple-700 hover:bg-purple-50"
                >
                  <ChefHat className="h-4 w-4 mr-2" />
                  Restaurant Partner
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
