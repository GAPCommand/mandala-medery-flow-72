
import React from 'react';
import { Card } from '@/components/ui/card';
import { Crown } from 'lucide-react';

const ResponsePromise = () => {
  return (
    <Card className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
      <div className="text-center">
        <div className="bg-green-500 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
          <Crown className="h-6 w-6 text-white" />
        </div>
        <h3 className="text-lg font-bold text-green-800 mb-2">24-Hour Response Guarantee</h3>
        <p className="text-green-700 text-sm">
          Our distribution team will review your inquiry and contact you within 24 hours to discuss 
          exclusive opportunities in your territory.
        </p>
      </div>
    </Card>
  );
};

export default ResponsePromise;
