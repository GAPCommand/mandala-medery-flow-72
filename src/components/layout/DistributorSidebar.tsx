
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
  Sparkles,
  Package,
  ShoppingCart,
  BarChart3,
  Users,
  Crown,
  MapPin,
  BookOpen,
  MessageCircle,
  Star,
  Zap
} from 'lucide-react';

const DistributorSidebar = () => {
  const { userProfile } = useAuth();
  const location = useLocation();

  const menuItems = [
    {
      title: 'Sacred Catalog',
      url: '/distributor/catalog',
      icon: Package,
      description: 'Browse Divine Products'
    },
    {
      title: 'Shopping Cart',
      url: '/distributor/cart',
      icon: ShoppingCart,
      description: 'Review & Checkout'
    },
    {
      title: 'My Territory',
      url: '/distributor/territory',
      icon: MapPin,
      description: 'Territory Performance'
    },
    {
      title: 'Sales Analytics',
      url: '/distributor/analytics',
      icon: BarChart3,
      description: 'Growth Insights'
    },
    {
      title: 'Marketing Hub',
      url: '/distributor/marketing',
      icon: Star,
      description: 'Sales Materials'
    },
    {
      title: 'Customer Success',
      url: '/distributor/customers',
      icon: Users,
      description: 'End Customer Tools'
    },
    {
      title: 'Sacred Knowledge',
      url: '/distributor/knowledge',
      icon: BookOpen,
      description: 'Training & FAQ'
    },
    {
      title: 'Support',
      url: '/distributor/support',
      icon: MessageCircle,
      description: 'Get Help Fast'
    }
  ];

  return (
    <Sidebar className="border-r border-amber-200/50 bg-gradient-to-b from-amber-50 to-orange-50">
      <SidebarHeader className="border-b border-amber-200/50 p-4 bg-gradient-to-r from-amber-100 to-orange-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
            <div className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
          </div>
          <div>
            <h2 className="font-bold text-amber-700">Mandala Distribution</h2>
            <p className="text-xs text-amber-600">Sacred Partnership Portal</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.url}>
              <SidebarMenuButton
                asChild
                isActive={location.pathname === item.url}
                className="w-full justify-start hover:bg-amber-100/50 data-[active=true]:bg-gradient-to-r data-[active=true]:from-amber-200 data-[active=true]:to-orange-200"
              >
                <Link to={item.url} className="flex items-center space-x-3 p-3 rounded-lg">
                  <item.icon className="h-5 w-5 text-amber-600" />
                  <div className="flex-1">
                    <div className="font-medium text-amber-800">{item.title}</div>
                    <div className="text-xs text-amber-600">{item.description}</div>
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="border-t border-amber-200/50 p-4 bg-gradient-to-r from-amber-100 to-orange-100">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
            <Crown className="h-4 w-4 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-amber-700">
              {userProfile?.first_name} {userProfile?.last_name}
            </p>
            <p className="text-xs text-amber-600">
              Sacred Distribution Partner
            </p>
          </div>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
};

export default DistributorSidebar;
