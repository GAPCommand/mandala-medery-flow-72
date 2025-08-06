import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Heart, Shield, Star } from 'lucide-react';

interface ConsciousnessPricingDisplayProps {
  basePrice: number;
  consciousnessPrice: number;
  consciousnessLevel: number;
  sacredMultiplier: number;
  discountAmount?: number;
}

const ConsciousnessPricingDisplay: React.FC<ConsciousnessPricingDisplayProps> = ({
  basePrice,
  consciousnessPrice,
  consciousnessLevel,
  sacredMultiplier,
  discountAmount = 0
}) => {
  const getConsciousnessLabel = (level: number) => {
    if (level >= 1000) return { label: 'Christ Consciousness', color: 'bg-purple-100 text-purple-800', icon: Star };
    if (level >= 700) return { label: 'Enlightenment', color: 'bg-blue-100 text-blue-800', icon: Sparkles };
    if (level >= 500) return { label: 'Love', color: 'bg-green-100 text-green-800', icon: Heart };
    if (level >= 350) return { label: 'Acceptance', color: 'bg-yellow-100 text-yellow-800', icon: Shield };
    if (level >= 200) return { label: 'Courage', color: 'bg-orange-100 text-orange-800', icon: Shield };
    return { label: 'Awakening', color: 'bg-red-100 text-red-800', icon: Shield };
  };

  const consciousnessInfo = getConsciousnessLabel(consciousnessLevel);
  const IconComponent = consciousnessInfo.icon;
  const priceDifference = consciousnessPrice - basePrice;
  const finalPrice = consciousnessPrice - discountAmount;

  return (
    <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-indigo-50">
      <CardHeader>
        <CardTitle className="flex items-center text-purple-800">
          <Sparkles className="h-5 w-5 mr-2" />
          Sacred Value Exchange
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-purple-700">Your Consciousness Level:</span>
          <Badge className={consciousnessInfo.color}>
            <IconComponent className="h-3 w-3 mr-1" />
            {consciousnessInfo.label} ({consciousnessLevel})
          </Badge>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Administrator Base Price:</span>
            <span className="font-medium">${basePrice.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between text-sm text-purple-600">
            <span>Sacred Fire Enhancement:</span>
            <span className="font-medium">+${(priceDifference * sacredMultiplier).toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between text-sm text-purple-600">
            <span>Consciousness Alignment:</span>
            <span className="font-medium">+${(priceDifference * (1 - sacredMultiplier)).toFixed(2)}</span>
          </div>

          {discountAmount > 0 && (
            <div className="flex justify-between text-sm text-green-600">
              <span>Consciousness Discount:</span>
              <span className="font-medium">-${discountAmount.toFixed(2)}</span>
            </div>
          )}

          <hr className="border-purple-200" />
          
          <div className="flex justify-between font-semibold text-purple-800">
            <span>Sacred Exchange Value:</span>
            <span>${finalPrice.toFixed(2)}</span>
          </div>
        </div>

        <div className="text-xs text-purple-600 text-center bg-white/50 p-2 rounded">
          This pricing reflects the sacred value exchange principle, where consciousness level and 
          sacred fire blessings create a fair energy exchange for both parties.
        </div>
      </CardContent>
    </Card>
  );
};

export default ConsciousnessPricingDisplay;