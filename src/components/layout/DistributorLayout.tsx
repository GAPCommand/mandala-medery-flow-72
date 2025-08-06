
import React from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import DistributorSidebar from './DistributorSidebar';
import DistributorHeader from './DistributorHeader';
import { useAutoRoleAssignment } from '@/hooks/useAutoRoleAssignment';
import { useIsMobile } from '@/hooks/use-mobile';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';

interface DistributorLayoutProps {
  children: React.ReactNode;
}

const DistributorLayout = ({ children }: DistributorLayoutProps) => {
  const isMobile = useIsMobile();
  // Auto-assign distributor role for new users
  useAutoRoleAssignment();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-amber-50 to-orange-50">
        {/* Sidebar - Hidden on mobile, controlled by SidebarTrigger */}
        <DistributorSidebar />
        
        <div className="flex-1 flex flex-col min-w-0">
          {/* Mobile navigation trigger */}
          {isMobile && (
            <div className="bg-white border-b border-amber-200 p-2">
              <SidebarTrigger className="text-amber-600" />
            </div>
          )}
          
          <DistributorHeader />
          <main className="flex-1 p-3 sm:p-6 overflow-auto">
            <div className="max-w-full">
              {children}
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

export default DistributorLayout;
