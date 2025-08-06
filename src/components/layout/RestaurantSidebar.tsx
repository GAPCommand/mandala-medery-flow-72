
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLocation, Link } from 'react-router-dom';
import { 
  LayoutDashboard,
  Wine,
  ShoppingCart,
  Calendar,
  BookOpen,
  ChefHat,
  BarChart3,
  Users,
  Sparkles,
  Settings
} from 'lucide-react';

interface RestaurantSidebarProps {
  onItemClick?: () => void;
}

const RestaurantSidebar = ({ onItemClick }: RestaurantSidebarProps) => {
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/restaurant', exact: true },
    { icon: Wine, label: 'Sacred Catalog', path: '/restaurant/catalog' },
    { icon: ShoppingCart, label: 'My Orders', path: '/restaurant/orders' },
    { icon: Calendar, label: 'Sacred Events', path: '/restaurant/events' },
    { icon: ChefHat, label: 'Menu Templates', path: '/restaurant/menu-templates' },
    { icon: BookOpen, label: 'Staff Training', path: '/restaurant/training' },
    { icon: BarChart3, label: 'Analytics', path: '/restaurant/analytics' },
    { icon: Users, label: 'Customer Experience', path: '/restaurant/customer-experience' },
    { icon: Sparkles, label: 'Sacred Resources', path: '/restaurant/resources' },
    { icon: Settings, label: 'Settings', path: '/restaurant/settings' }
  ];

  const isActive = (path: string, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const handleItemClick = () => {
    if (onItemClick) {
      onItemClick();
    }
  };

  return (
    <aside className="w-64 bg-white shadow-sm border-r border-purple-200 min-h-full">
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <Link key={item.path} to={item.path} onClick={handleItemClick}>
            <Button
              variant={isActive(item.path, item.exact) ? 'default' : 'ghost'}
              className={`w-full justify-start space-x-3 ${
                isActive(item.path, item.exact) 
                  ? 'bg-gradient-to-r from-purple-600 to-amber-600 text-white' 
                  : 'text-gray-700 hover:bg-purple-50'
              }`}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Button>
          </Link>
        ))}
      </nav>

      {/* Sacred Commerce Level */}
      <div className="p-4 mt-6">
        <div className="bg-gradient-to-r from-purple-50 to-amber-50 p-4 rounded-lg border border-purple-200">
          <div className="text-center">
            <Sparkles className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <h3 className="font-medium text-purple-900">Sacred Commerce Level</h3>
            <div className="text-2xl font-bold text-amber-600">Level 3</div>
            <p className="text-xs text-purple-700 mt-1">Restaurant Partner Tier</p>
            <div className="mt-3 bg-purple-200 rounded-full h-2">
              <div className="bg-purple-600 h-2 rounded-full w-3/4"></div>
            </div>
            <p className="text-xs text-purple-600 mt-1">75% to Level 4</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default RestaurantSidebar;
