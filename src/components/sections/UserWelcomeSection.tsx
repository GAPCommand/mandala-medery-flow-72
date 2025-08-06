
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Shield, Crown, Users, Building } from 'lucide-react';
import UserBenefitsGrid from './UserBenefitsGrid';

interface UserWelcomeSectionProps {
  user: any;
  userRoles: string[];
}

const UserWelcomeSection = ({ user, userRoles }: UserWelcomeSectionProps) => {
  const navigate = useNavigate();

  const getRecommendedRoute = () => {
    if (!user) return '/auth';
    if (Array.isArray(userRoles) && userRoles.includes('distributor')) return '/distributor/catalog';
    if (Array.isArray(userRoles) && (userRoles.includes('admin') || userRoles.includes('super_admin') || userRoles.includes('sales_rep'))) return '/internal';
    return '/distributor/catalog';
  };

  const getRecommendedLabel = () => {
    if (!user) return 'Access Sacred Portal';
    if (Array.isArray(userRoles) && userRoles.includes('distributor')) return 'Enter Distribution Portal';
    if (Array.isArray(userRoles) && (userRoles.includes('admin') || userRoles.includes('super_admin') || userRoles.includes('sales_rep'))) return 'Enter Operations Center';
    return 'Enter Sacred Portal';
  };

  if (!user) return null;

  return (
    <section className="py-16 bg-gradient-to-r from-amber-500 to-orange-500">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto text-white">
          <div className="flex items-center justify-center mb-4">
            {Array.isArray(userRoles) && userRoles.includes('super_admin') && <Crown className="h-8 w-8 text-yellow-200 mr-2" />}
            {Array.isArray(userRoles) && userRoles.includes('admin') && <Shield className="h-8 w-8 text-blue-200 mr-2" />}
            {Array.isArray(userRoles) && userRoles.includes('distributor') && <Users className="h-8 w-8 text-purple-200 mr-2" />}
            {Array.isArray(userRoles) && userRoles.includes('sales_rep') && <Building className="h-8 w-8 text-green-200 mr-2" />}
            <Sparkles className="h-8 w-8 text-amber-200" />
          </div>
          
          <h2 className="text-3xl font-bold mb-4">
            {Array.isArray(userRoles) && userRoles.includes('distributor') 
              ? 'Welcome back, Sacred Distribution Partner! ✨'
              : Array.isArray(userRoles) && (userRoles.includes('admin') || userRoles.includes('super_admin'))
              ? 'Welcome to the Operations Command Center! 🏢'
              : 'Welcome back, Sacred Team Member! ✨'
            }
          </h2>
          <p className="text-xl text-amber-100 mb-8">
            {Array.isArray(userRoles) && userRoles.includes('distributor') 
              ? 'Your exclusive portal awaits with premium products, territory insights, and growth opportunities.'
              : 'Access powerful business intelligence, distributor management, and operational controls.'
            }
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-amber-600 hover:bg-amber-50 font-semibold shadow-lg"
              onClick={() => navigate(getRecommendedRoute())}
            >
              {getRecommendedLabel()}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            {Array.isArray(userRoles) && (userRoles.includes('admin') || userRoles.includes('super_admin')) ? (
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white/20 font-semibold bg-white/10 backdrop-blur-sm"
                asChild
              >
                <Link to="/distributor/catalog">Preview Distribution Portal</Link>
              </Button>
            ) : Array.isArray(userRoles) && userRoles.includes('distributor') ? (
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white/20 font-semibold bg-white/10 backdrop-blur-sm"
                asChild
              >
                <Link to="/distributor/analytics">View Analytics</Link>
              </Button>
            ) : null}
          </div>
          
          <UserBenefitsGrid userRoles={userRoles} />
        </div>
      </div>
    </section>
  );
};

export default UserWelcomeSection;
