
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const GuestCTASection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-amber-700 mb-4">
            Join the Sacred Distribution Network
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Partner with us to bring consciousness-driven, premium Kashmir mead to your territory. Experience exclusive distributor benefits and territorial protection.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold shadow-lg"
              asChild
            >
              <Link to="/login" className="flex items-center">
                Become a Distribution Partner
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-amber-500 text-amber-600 hover:bg-amber-50 font-semibold bg-white"
              onClick={() => {
                document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              View Product Catalog
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuestCTASection;
