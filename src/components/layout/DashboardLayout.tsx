
import React from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import DashboardSidebar from './DashboardSidebar';
import DashboardHeader from './DashboardHeader';
import { useIsMobile } from '@/hooks/use-mobile';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';

const DashboardLayout = () => {
  const isMobile = useIsMobile();

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-amber-50 to-orange-50">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <DashboardHeader />
          <main className="flex-1 p-3 sm:p-6 overflow-auto">
            <div className="max-w-full">
              <Outlet />
            </div>
          </main>
          
          {/* Inconspicuous back to main site link - bottom of layout */}
          <footer className="p-4 border-t border-amber-200/50 bg-white/50">
            <div className="flex justify-center">
              <Link 
                to="/" 
                className="text-xs text-amber-600/70 hover:text-amber-800 flex items-center space-x-1 transition-colors duration-200"
              >
                <ExternalLink className="h-3 w-3" />
                <span>Main Website</span>
              </Link>
            </div>
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
