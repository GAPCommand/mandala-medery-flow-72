
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  BarChart3,
  Settings,
  UserCheck,
  MapPin,
  TrendingUp,
  Shield,
  Crown,
  Sparkles,
  DollarSign,
  Rocket
} from 'lucide-react';

const DashboardSidebar = () => {
  const { userRoles, userProfile } = useAuth();
  const location = useLocation();

  const isAdmin = userRoles.includes('admin') || userRoles.includes('super_admin');
  const isSalesRep = userRoles.includes('sales_rep');
  const isDistributor = userRoles.includes('distributor');

  const menuItems = [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: LayoutDashboard,
      roles: ['all']
    },
    {
      title: 'Product Catalog',
      url: '/dashboard/catalog',
      icon: Package,
      roles: ['all']
    },
    {
      title: 'Distributors',
      url: '/dashboard/distributors',
      icon: Users,
      roles: ['admin', 'super_admin', 'sales_rep', 'staff']
    },
    {
      title: 'Orders',
      url: '/dashboard/orders',
      icon: ShoppingCart,
      roles: ['all']
    },
    {
      title: 'Analytics',
      url: '/dashboard/analytics',
      icon: BarChart3,
      roles: ['all']
    },
    {
      title: 'PANDAB Pricing',
      url: '/dashboard/pricing-analytics',
      icon: DollarSign,
      roles: ['admin', 'super_admin', 'staff']
    },
    {
      title: 'Territory Management',
      url: '/dashboard/territories',
      icon: MapPin,
      roles: ['admin', 'super_admin', 'sales_rep', 'staff']
    },
    {
      title: 'Performance',
      url: '/dashboard/performance',
      icon: TrendingUp,
      roles: ['admin', 'super_admin', 'sales_rep', 'staff']
    },
    {
      title: 'User Management',
      url: '/dashboard/users',
      icon: UserCheck,
      roles: ['admin', 'super_admin']
    },
    {
      title: 'Template Management',
      url: '/dashboard/templates',
      icon: Rocket,
      roles: ['admin', 'super_admin', 'template_manager']
    },
    {
      title: 'Sacred Security',
      url: '/dashboard/security',
      icon: Shield,
      roles: ['admin', 'super_admin']
    },
    {
      title: 'Settings',
      url: '/dashboard/settings',
      icon: Settings,
      roles: ['all']
    }
  ];

  const filteredMenuItems = menuItems.filter(item => {
    if (item.roles.includes('all')) return true;
    return item.roles.some(role => userRoles.includes(role));
  });

  const getRoleIcon = () => {
    if (userRoles.includes('super_admin')) return <Crown className="h-4 w-4 text-yellow-500" />;
    if (userRoles.includes('admin')) return <Shield className="h-4 w-4 text-blue-500" />;
    if (userRoles.includes('sales_rep')) return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (userRoles.includes('distributor')) return <Users className="h-4 w-4 text-purple-500" />;
    return <Sparkles className="h-4 w-4 text-amber-500" />;
  };

  return (
    <Sidebar className="border-r border-amber-200/50">
      <SidebarHeader className="border-b border-amber-200/50 p-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
            <div className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
          <div>
            <h2 className="font-bold text-amber-700">Mandala Medery</h2>
            <p className="text-xs text-amber-600">Admin Dashboard</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {filteredMenuItems.map((item) => (
            <SidebarMenuItem key={item.url}>
              <SidebarMenuButton
                asChild
                isActive={location.pathname === item.url}
                className="w-full justify-start"
              >
                <Link to={item.url} className="flex items-center space-x-3">
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="border-t border-amber-200/50 p-4">
        <div className="flex items-center space-x-3">
          {getRoleIcon()}
          <div className="flex-1">
            <p className="text-sm font-medium text-amber-700">
              {userProfile?.first_name} {userProfile?.last_name}
            </p>
            <p className="text-xs text-amber-600 capitalize">
              {userRoles.join(', ') || 'User'}
            </p>
          </div>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
};

export default DashboardSidebar;
