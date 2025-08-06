
import React from 'react';
import { Card } from '@/components/ui/card';
import { Shield, Crown, Building2, Users } from 'lucide-react';

const DistributorBenefits = () => {
  return (
    <Card className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
      <h3 className="text-xl font-bold text-amber-700 mb-4 flex items-center">
        <Shield className="h-6 w-6 mr-2" />
        Exclusive Distributor Benefits
      </h3>
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <div className="bg-amber-500 rounded-full p-1 mt-1">
            <Crown className="h-4 w-4 text-white" />
          </div>
          <div>
            <h4 className="font-semibold text-amber-800">Territorial Protection</h4>
            <p className="text-amber-700 text-sm">Exclusive distribution rights in your designated area</p>
          </div>
        </div>
        <div className="flex items-start space-x-3">
          <div className="bg-orange-500 rounded-full p-1 mt-1">
            <Building2 className="h-4 w-4 text-white" />
          </div>
          <div>
            <h4 className="font-semibold text-amber-800">Premium Margins</h4>
            <p className="text-amber-700 text-sm">Competitive wholesale pricing with healthy profit margins</p>
          </div>
        </div>
        <div className="flex items-start space-x-3">
          <div className="bg-red-500 rounded-full p-1 mt-1">
            <Users className="h-4 w-4 text-white" />
          </div>
          <div>
            <h4 className="font-semibold text-amber-800">Marketing Support</h4>
            <p className="text-amber-700 text-sm">Professional materials, training, and sales support</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DistributorBenefits;
