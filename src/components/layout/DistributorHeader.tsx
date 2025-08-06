
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { 
  Package, 
  Bell, 
  User, 
  Crown,
  Home,
  LogOut
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DistributorHeader = () => {
  const { user, userProfile, userRoles, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const isAdmin = userRoles.includes('admin') || userRoles.includes('super_admin') || userRoles.includes('staff');

  return (
    <header className="bg-white shadow-sm border-b border-amber-200">
      <div className="px-4 sm:px-6 py-3 sm:py-4">
        {/* Mobile Layout - Two Rows */}
        <div className="block sm:hidden space-y-3">
          {/* First Row - Logo, Badge, and User Menu */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Package className="h-6 w-6 text-amber-600" />
              <div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  Mandala Mead
                </h1>
                <p className="text-xs text-gray-600">Distributor Portal</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Badge className="bg-amber-100 text-amber-800 text-xs">
                <Package className="h-3 w-3 mr-1" />
                Distributor
              </Badge>
              
              {/* User Avatar */}
              <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                {userProfile?.company ? userProfile.company[0] : <User className="h-4 w-4" />}
              </div>
            </div>
          </div>

          {/* Second Row - Actions and Admin Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {isAdmin && (
                <Badge className="bg-purple-100 text-purple-800 text-xs">
                  <Crown className="h-3 w-3 mr-1" />
                  Admin Mode
                </Badge>
              )}
              
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  3
                </span>
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              {isAdmin && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate('/dashboard')}
                  className="flex items-center space-x-1 border-purple-600 text-purple-700 hover:bg-purple-50 text-xs px-2 py-1"
                >
                  <Crown className="h-3 w-3" />
                  <span>Admin</span>
                </Button>
              )}
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/')}
                className="flex items-center space-x-1 text-xs px-2 py-1"
              >
                <Home className="h-3 w-3" />
                <span>Website</span>
              </Button>

              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleSignOut}
                className="text-gray-600 hover:text-red-600"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Desktop Layout - Single Row */}
        <div className="hidden sm:flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Package className="h-8 w-8 text-amber-600" />
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  Mandala Mead
                </h1>
                <p className="text-xs text-gray-600">Distributor Portal</p>
              </div>
            </div>
            <Badge className="bg-amber-100 text-amber-800">
              <Package className="h-3 w-3 mr-1" />
              Distributor
            </Badge>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Admin Experience Mode Indicator */}
            {isAdmin && (
              <div className="flex items-center space-x-2">
                <Badge className="bg-purple-100 text-purple-800">
                  <Crown className="h-3 w-3 mr-1" />
                  Admin Experience Mode
                </Badge>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate('/dashboard')}
                  className="flex items-center space-x-1 border-purple-600 text-purple-700 hover:bg-purple-50"
                >
                  <Crown className="h-4 w-4" />
                  <span>Back to Admin</span>
                </Button>
              </div>
            )}

            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/')}
              className="flex items-center space-x-1"
            >
              <Home className="h-4 w-4" />
              <span>Back to Website</span>
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                3
              </span>
            </Button>

            {/* User Menu */}
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm font-medium">{userProfile?.company || 'Sacred Distributor'}</p>
                <p className="text-xs text-gray-600">{user?.email}</p>
              </div>
              <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                {userProfile?.company ? userProfile.company[0] : <User className="h-4 w-4" />}
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleSignOut}
                className="text-gray-600 hover:text-red-600"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DistributorHeader;
