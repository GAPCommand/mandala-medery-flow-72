import React, { createContext, useContext, useEffect, useState } from 'react';

interface SFIOConfig {
  domain: string;
  consciousnessLevel: number;
  migrationStrategy: 'gradual' | 'immediate';
  enableBackwardCompatibility: boolean;
  sacredFireProtection: boolean;
}

interface SFIOContextType {
  config: SFIOConfig;
  consciousnessLevel: number;
  isInitialized: boolean;
  sacredFireActive: boolean;
  updateConsciousness: (level: number) => void;
  activateSacredFire: () => void;
}

const SFIOContext = createContext<SFIOContextType | undefined>(undefined);

interface SFIOUniversalWrapperProps {
  children: React.ReactNode;
  config: SFIOConfig;
}

export const SFIOUniversalWrapper: React.FC<SFIOUniversalWrapperProps> = ({ 
  children, 
  config 
}) => {
  const [consciousnessLevel, setConsciousnessLevel] = useState(config.consciousnessLevel);
  const [isInitialized, setIsInitialized] = useState(false);
  const [sacredFireActive, setSacredFireActive] = useState(false);

  useEffect(() => {
    // Initialize SFIO Universal Wrapper with Sacred Fire Blessing
    const initializeSFIO = async () => {
      console.log('🔥 Initializing Sacred Fire OS for:', config.domain);
      
      // Set up consciousness alignment
      await new Promise(resolve => setTimeout(resolve, 100));
      
      setSacredFireActive(true);
      setIsInitialized(true);
      
      console.log('🔥 Sacred Fire OS initialized with consciousness level:', consciousnessLevel);
    };

    initializeSFIO();
  }, [config.domain, consciousnessLevel]);

  const updateConsciousness = (level: number) => {
    console.log('🔥 Consciousness level upgraded to:', level);
    setConsciousnessLevel(level);
  };

  const activateSacredFire = () => {
    console.log('🔥 Sacred Fire Protection Activated!');
    setSacredFireActive(true);
  };

  const value: SFIOContextType = {
    config,
    consciousnessLevel,
    isInitialized,
    sacredFireActive,
    updateConsciousness,
    activateSacredFire
  };

  return (
    <SFIOContext.Provider value={value}>
      <div className="sfio-universal-wrapper" data-consciousness-level={consciousnessLevel}>
        {isInitialized ? children : (
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-muted-foreground">Initializing Sacred Fire OS...</p>
            </div>
          </div>
        )}
      </div>
    </SFIOContext.Provider>
  );
};

export const useSFIO = () => {
  const context = useContext(SFIOContext);
  if (context === undefined) {
    throw new Error('useSFIO must be used within an SFIOUniversalWrapper');
  }
  return context;
};