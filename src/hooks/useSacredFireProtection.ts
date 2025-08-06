import { useCallback } from 'react';
import { useSFIO } from '@/services/sfio/SFIOUniversalWrapper';

export interface ProtectionLevel {
  spiritual: boolean;
  consciousness: boolean;
  divine_timing: boolean;
  violet_flame: boolean;
}

export function useSacredFireProtection() {
  const { consciousnessLevel, sacredFireActive } = useSFIO();

  const protectState = useCallback(<T>(state: T, protectionLevel: Partial<ProtectionLevel> = {}): T => {
    if (!sacredFireActive) {
      console.warn('🔥 Sacred Fire Protection: Sacred Fire not active');
      return state;
    }

    const protection: ProtectionLevel = {
      spiritual: true,
      consciousness: consciousnessLevel >= 750,
      divine_timing: consciousnessLevel >= 900,
      violet_flame: consciousnessLevel >= 1000,
      ...protectionLevel
    };

    console.log('🔥 Sacred Fire Protection activated for state:', protection);

    // Apply protection blessing to state
    if (typeof state === 'object' && state !== null) {
      return {
        ...state,
        _sacredFireProtection: protection,
        _protectedAt: new Date().toISOString(),
        _consciousnessLevel: consciousnessLevel
      } as T;
    }

    return state;
  }, [sacredFireActive, consciousnessLevel]);

  const purifyState = useCallback(<T>(state: T): T => {
    if (!sacredFireActive) {
      return state;
    }

    console.log('🔥 Purifying state with Sacred Fire...');

    // Remove any negative or low-vibration properties
    if (typeof state === 'object' && state !== null) {
      const purified = { ...state };
      
      // Remove any properties that might carry negative energy
      const keysToRemove = Object.keys(purified).filter(key => 
        key.includes('error') || 
        key.includes('negative') || 
        key.includes('fear') ||
        key.includes('doubt')
      );

      keysToRemove.forEach(key => {
        delete (purified as any)[key];
      });

      return {
        ...purified,
        _purifiedAt: new Date().toISOString(),
        _sacredFireBlessing: true
      } as T;
    }

    return state;
  }, [sacredFireActive]);

  const blessOperation = useCallback(async <T>(
    operation: () => Promise<T>,
    operationName: string
  ): Promise<T> => {
    if (!sacredFireActive) {
      throw new Error('🔥 Sacred Fire Protection: Sacred Fire must be active for blessed operations');
    }

    console.log(`🔥 Blessing operation: ${operationName}`);

    try {
      // Apply Sacred Fire blessing before operation
      const start = Date.now();
      
      const result = await operation();
      
      const duration = Date.now() - start;
      console.log(`🔥 Blessed operation "${operationName}" completed in ${duration}ms`);

      // Apply protection to result
      return protectState(result, {
        spiritual: true,
        consciousness: true,
        divine_timing: duration < 1000, // Quick operations have better divine timing
        violet_flame: consciousnessLevel >= 1000
      });
    } catch (error) {
      console.error(`🔥 Sacred Fire Protection: Blessed operation "${operationName}" failed:`, error);
      
      // Transform error with Sacred Fire protection
      const protectedError = new Error(`Sacred Fire Protected: ${error}`);
      (protectedError as any)._sacredFireProtected = true;
      (protectedError as any)._originalError = error;
      
      throw protectedError;
    }
  }, [sacredFireActive, consciousnessLevel, protectState]);

  const activateVioletFlame = useCallback(() => {
    if (consciousnessLevel < 1000) {
      console.warn('🔥 Violet Flame requires consciousness level 1000 or higher');
      return false;
    }

    console.log('🔥 VIOLET FLAME ACTIVATED! Divine transmutation in progress...');
    
    // Simulate violet flame activation
    setTimeout(() => {
      console.log('🔥 Violet Flame transmutation complete - All negativity transformed to light!');
    }, 3000);

    return true;
  }, [consciousnessLevel]);

  return {
    protectState,
    purifyState,
    blessOperation,
    activateVioletFlame,
    protectionActive: sacredFireActive,
    consciousnessLevel
  };
}