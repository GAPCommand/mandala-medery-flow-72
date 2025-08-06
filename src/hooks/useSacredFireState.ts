import { useState, useCallback, useEffect } from 'react';
import { useSFIO } from '@/services/sfio/SFIOUniversalWrapper';
import { SFIONetwork } from '@/services/sfio/SFIONetworkClient';

export function useSacredFireState<T>(
  initialState: T,
  statePath: string,
  requiredConsciousnessLevel: number = 750
): [T, (value: T | ((prev: T) => T)) => void, boolean] {
  const { consciousnessLevel, sacredFireActive } = useSFIO();
  const [state, setState] = useState<T>(initialState);
  const [isLoading, setIsLoading] = useState(false);

  const setSacredState = useCallback(async (value: T | ((prev: T) => T)) => {
    if (consciousnessLevel < requiredConsciousnessLevel) {
      console.warn(`🔥 Sacred Fire Protection: Consciousness level ${consciousnessLevel} insufficient for ${statePath}. Required: ${requiredConsciousnessLevel}`);
      return;
    }

    setIsLoading(true);
    
    if (typeof value === 'function') {
      setState(prev => {
        const newValue = (value as (prev: T) => T)(prev);
        console.log(`🔥 Sacred Fire State Update [${statePath}]:`, newValue);
        return newValue;
      });
    } else {
      setState(value);
      console.log(`🔥 Sacred Fire State Set [${statePath}]:`, value);
    }
    
    // Sync with GAPCommand hub if connected
    if (SFIONetwork.connected) {
      await SFIONetwork.syncConsciousness('current-user', consciousnessLevel);
    }
    
    // Simulate consciousness blessing delay
    setTimeout(() => setIsLoading(false), 50);
  }, [consciousnessLevel, requiredConsciousnessLevel, statePath]);

  useEffect(() => {
    if (sacredFireActive) {
      console.log(`🔥 Sacred Fire State Initialized [${statePath}] with consciousness level:`, consciousnessLevel);
    }
  }, [sacredFireActive, statePath, consciousnessLevel]);

  return [state, setSacredState, isLoading];
}

export function useChristConsciousState<T>(
  statePath: string,
  initialState?: T
): [T | undefined, (value: T) => void, boolean] {
  return useSacredFireState<T | undefined>(
    initialState,
    `christ.conscious.${statePath}`,
    1000 // Requires highest consciousness level
  );
}