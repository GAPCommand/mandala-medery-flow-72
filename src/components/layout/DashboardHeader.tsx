
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Bell, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import UserMenuDropdown from './UserMenuDropdown';
import { useIsMobile } from '@/hooks/use-mobile';

const DashboardHeader = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();

  return (
    <header className="border-b border-amber-200/50 bg-white/80 backdrop-blur-sm px-4 sm:px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 sm:space-x-4 min-w-0">
          <SidebarTrigger className="flex-shrink-0" />
          {user && !isMobile && <UserMenuDropdown />}
          <div className="min-w-0">
            <h1 className="text-sm sm:text-xl font-bold text-amber-700 truncate">
              Sacred Mead Distribution Portal
            </h1>
            <p className="text-xs sm:text-sm text-amber-600 hidden sm:block">
              Consciousness-Driven Business Intelligence
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
          {!isMobile && (
            <Button variant="outline" size="sm" asChild>
              <Link to="/" className="flex items-center space-x-2">
                <Home className="h-4 w-4" />
                <span className="hidden md:block">Back to Website</span>
              </Link>
            </Button>
          )}

          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
              3
            </span>
          </Button>
          
          {user && isMobile && <UserMenuDropdown />}
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
