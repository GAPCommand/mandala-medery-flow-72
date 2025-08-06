
import React from 'react';
import { Card } from "@/components/ui/card";
import { Crown, CheckCircle } from "lucide-react";

const PremiumBenefits = () => {
  return (
    <Card className="p-6 bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
      <h2 className="text-2xl font-bold text-purple-800 mb-4 flex items-center">
        <Crown className="h-6 w-6 mr-2" />
        Premium Partner Benefits
      </h2>
      <div className="space-y-3">
        <div className="flex items-center space-x-3 p-2 bg-white rounded border border-purple-200">
          <CheckCircle className="h-5 w-5 text-emerald-600" />
          <span className="text-sm">24/7 Sacred Hotline Access</span>
        </div>
        <div className="flex items-center space-x-3 p-2 bg-white rounded border border-purple-200">
          <CheckCircle className="h-5 w-5 text-emerald-600" />
          <span className="text-sm">Priority Response (&lt; 1 hour)</span>
        </div>
        <div className="flex items-center space-x-3 p-2 bg-white rounded border border-purple-200">
          <CheckCircle className="h-5 w-5 text-emerald-600" />
          <span className="text-sm">Dedicated Account Master</span>
        </div>
        <div className="flex items-center space-x-3 p-2 bg-white rounded border border-purple-200">
          <CheckCircle className="h-5 w-5 text-emerald-600" />
          <span className="text-sm">Video Consultation Access</span>
        </div>
        <div className="flex items-center space-x-3 p-2 bg-white rounded border border-purple-200">
          <CheckCircle className="h-5 w-5 text-emerald-600" />
          <span className="text-sm">Sacred Knowledge Library</span>
        </div>
      </div>
      <p className="text-xs text-purple-600 mt-4 text-center">
        You are a Premium Partner - All benefits active ✨
      </p>
    </Card>
  );
};

export default PremiumBenefits;
