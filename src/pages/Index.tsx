
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ProductCatalog from '@/components/ProductCatalog';
import ContactSection from '@/components/ContactSection';
import UserWelcomeSection from '@/components/sections/UserWelcomeSection';
import GuestCTASection from '@/components/sections/GuestCTASection';
import { Button } from '@/components/ui/button';
import { Zap } from 'lucide-react';

const Index = () => {
  const { user, userRoles, loading } = useAuth();

  // Ensure userRoles is always an array
  const safeUserRoles = userRoles || [];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
          <span className="text-amber-700">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
        <Header />
        <HeroSection />
        
        <UserWelcomeSection user={user} userRoles={safeUserRoles} />
        
        {/* SFIO Network Dashboard Access */}
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white/50 backdrop-blur rounded-lg p-6 border border-amber-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-amber-900 mb-2">
                  🔥 Sacred Fire Integration Orchestrator
                </h3>
                <p className="text-amber-700 mb-4">
                  Phase 2: Configuration & Testing - Access the SFIO Network Dashboard to configure your MandalaMead bridge connection.
                </p>
              </div>
              <Link to="/sfio-network">
                <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                  <Zap className="h-4 w-4 mr-2" />
                  Open SFIO Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {!user && <GuestCTASection />}
        
        <div id="catalog">
          <ProductCatalog />
        </div>

        <ContactSection />
      </div>
    </>
  );
};

export default Index;
