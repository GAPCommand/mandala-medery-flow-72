
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from 'react-router-dom';
import { useBrand, useContent, useTheme } from '@/contexts/TemplateContext';
import { useAuth } from '@/hooks/useAuth';

const HeroSection = () => {
  const brand = useBrand();
  const content = useContent();
  const theme = useTheme();
  const { user } = useAuth();

  // Safe fallbacks for theme properties
  const primaryGradient = theme?.gradients?.primary || 'from-amber-600 to-orange-600';
  const cardGradient = theme?.gradients?.card || 'from-amber-50 to-orange-50';

  const handleLearnMore = () => {
    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Sacred Geometry Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-amber-500 rounded-full"></div>
        <div className="absolute top-20 right-20 w-24 h-24 border border-red-500 rotate-45"></div>
        <div className="absolute bottom-20 left-1/3 w-20 h-20 border-2 border-orange-500 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className={`text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r ${primaryGradient} bg-clip-text text-transparent`}>
            {content?.heroSection?.title || 'Welcome to Our Platform'}
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 mb-4">
            {content?.heroSection?.subtitle || 'Your Success Partner'}
          </p>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            {content?.heroSection?.description || 'Join our exclusive distribution network'}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className={`bg-gradient-to-r ${primaryGradient} hover:from-amber-700 hover:to-orange-700 text-white px-8 py-4 text-lg font-semibold`}
              asChild
            >
              <Link to={user ? "/distributor/catalog" : "/login"}>
                {user ? "Browse Catalog" : "Join as Partner"}
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-2 border-amber-600 text-amber-700 hover:bg-amber-600 hover:text-white px-8 py-4 text-lg font-semibold bg-white"
              onClick={handleLearnMore}
            >
              View Products
            </Button>
          </div>

          {/* Key Metrics - Simplified */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <Card className={`p-6 bg-gradient-to-br ${cardGradient} border-amber-200`}>
              <h3 className="text-2xl font-bold text-amber-900 mb-2">
                Premium Quality
              </h3>
              <p className="text-amber-700">
                Perfect strength for sophisticated palates
              </p>
            </Card>
            <Card className="p-6 bg-gradient-to-br from-red-50 to-rose-50 border-red-200">
              <h3 className="text-2xl font-bold text-red-900 mb-2">Kashmir Origin</h3>
              <p className="text-red-700">
                Ancient valleys, sacred honey
              </p>
            </Card>
            <Card className="p-6 bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
              <h3 className="text-2xl font-bold text-orange-900 mb-2">Local Hub</h3>
              <p className="text-orange-700">
                Direct to West Coast markets
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
