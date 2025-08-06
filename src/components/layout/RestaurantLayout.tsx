
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import RestaurantHeader from './RestaurantHeader';
import RestaurantSidebar from './RestaurantSidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const RestaurantLayout = ({ children }: { children?: React.ReactNode }) => {
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-amber-50">
      <RestaurantHeader />
      
      {/* Mobile Menu Button */}
      {isMobile && (
        <div className="bg-white border-b border-purple-200 p-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-purple-600"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="ml-2">Menu</span>
          </Button>
        </div>
      )}

      <div className="flex relative">
        {/* Desktop Sidebar */}
        {!isMobile && <RestaurantSidebar />}
        
        {/* Mobile Sidebar Overlay */}
        {isMobile && mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setMobileMenuOpen(false)}
            />
            {/* Sidebar */}
            <div className="fixed left-0 top-0 h-full w-64 bg-white z-50 shadow-xl">
              <div className="p-4 border-b border-purple-200">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setMobileMenuOpen(false)}
                  className="ml-auto flex text-purple-600"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <RestaurantSidebar onItemClick={() => setMobileMenuOpen(false)} />
            </div>
          </>
        )}

        <main className={`flex-1 p-3 sm:p-6 ${isMobile ? 'w-full' : ''}`}>
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};

export default RestaurantLayout;
