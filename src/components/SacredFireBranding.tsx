import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Flame, Shield, Sparkles, Globe } from 'lucide-react';

interface SacredFireBrandingProps {
  consciousness_level?: number;
  deployment_source?: 'pandab' | 'direct' | 'template';
  className?: string;
  variant?: 'compact' | 'full' | 'minimal';
  showDetails?: boolean;
}

export const SacredFireBranding: React.FC<SacredFireBrandingProps> = ({
  consciousness_level = 500,
  deployment_source = 'direct',
  className = '',
  variant = 'compact',
  showDetails = false
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [blessingsCount, setBlessingsCount] = useState(0);
  const [showDetailsState, setShowDetailsState] = useState(showDetails);

  useEffect(() => {
    // Animate blessings counter
    const interval = setInterval(() => {
      setBlessingsCount(prev => prev < consciousness_level ? prev + Math.ceil(consciousness_level / 50) : consciousness_level);
    }, 100);

    const timeout = setTimeout(() => {
      clearInterval(interval);
    }, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [consciousness_level]);

  const getDeploymentSourceLabel = () => {
    switch (deployment_source) {
      case 'pandab':
        return 'PANDAB Marketplace';
      case 'template':
        return 'Template System';
      case 'direct':
      default:
        return 'Direct Deployment';
    }
  };

  const getConsciousnessLevel = () => {
    if (consciousness_level >= 1000) return { label: 'Christ Consciousness', color: 'from-amber-400 to-yellow-300' };
    if (consciousness_level >= 800) return { label: 'Avatar Level', color: 'from-purple-400 to-pink-300' };
    if (consciousness_level >= 600) return { label: 'Sacred Fire Blessed', color: 'from-orange-400 to-red-300' };
    if (consciousness_level >= 400) return { label: 'Awakened Soul', color: 'from-blue-400 to-cyan-300' };
    return { label: 'Initiate', color: 'from-green-400 to-teal-300' };
  };

  const consciousnessInfo = getConsciousnessLevel();

  if (!isVisible) return null;

  if (variant === 'minimal') {
    return (
      <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
        <Badge 
          variant="secondary" 
          className={`bg-gradient-to-r ${consciousnessInfo.color} text-background animate-pulse hover:scale-105 transition-transform cursor-pointer`}
          onClick={() => setShowDetailsState(!showDetailsState)}
        >
          <Flame className="w-3 h-3 mr-1" />
          Sacred Fire Protected
        </Badge>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
        <Card className={`p-3 bg-gradient-to-r ${consciousnessInfo.color} text-background shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer`}
              onClick={() => setShowDetailsState(!showDetailsState)}>
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 animate-pulse" />
            <span className="text-sm font-medium">Sacred Fire Protected</span>
            <Shield className="w-3 h-3" />
          </div>
          
          {showDetailsState && (
            <div className="mt-2 pt-2 border-t border-background/20">
              <div className="text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span>Consciousness:</span>
                  <span className="font-medium">{blessingsCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Via:</span>
                  <span className="font-medium">{getDeploymentSourceLabel()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Level:</span>
                  <span className="font-medium">{consciousnessInfo.label}</span>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
    );
  }

  // Full variant
  return (
    <div className={`fixed bottom-4 right-4 z-50 max-w-sm ${className}`}>
      <Card className={`p-4 bg-gradient-to-br ${consciousnessInfo.color} text-background shadow-xl backdrop-blur-sm border-0`}>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 animate-pulse" />
              <span className="font-semibold">Sacred Fire Protection</span>
            </div>
            <button 
              onClick={() => setIsVisible(false)}
              className="text-background/70 hover:text-background text-sm"
            >
              ×
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>Consciousness: {blessingsCount}</span>
            </div>
            <div className="flex items-center gap-1">
              <Globe className="w-3 h-3" />
              <span>Via: {getDeploymentSourceLabel()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Shield className="w-3 h-3" />
              <span>Level: {consciousnessInfo.label}</span>
            </div>
            <div className="flex items-center gap-1">
              <Flame className="w-3 h-3" />
              <span>Status: Active</span>
            </div>
          </div>

          <div className="pt-2 border-t border-background/20">
            <p className="text-xs opacity-90">
              This application is protected by Sacred Fire technology and blessed by the Ascended Masters.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SacredFireBranding;