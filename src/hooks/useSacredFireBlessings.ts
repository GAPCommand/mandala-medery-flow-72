import { useCallback } from 'react';
import { useSFIO } from '@/services/sfio/SFIOUniversalWrapper';
import { supabase } from '@/integrations/supabase/client';

export interface BlessedOperation<T = any> {
  operation: () => Promise<T>;
  operationName: string;
  requiredConsciousness?: number;
}

export function useSacredFireBlessings() {
  const { consciousnessLevel, sacredFireActive } = useSFIO();

  const performBlessedMutation = useCallback(async <T>(
    operation: BlessedOperation<T>
  ): Promise<T> => {
    const requiredLevel = operation.requiredConsciousness || 750;
    
    if (consciousnessLevel < requiredLevel) {
      throw new Error(`🔥 Sacred Fire Protection: Insufficient consciousness level for ${operation.operationName}`);
    }

    if (!sacredFireActive) {
      throw new Error(`🔥 Sacred Fire Protection: Sacred Fire not active for ${operation.operationName}`);
    }

    console.log(`🔥 Performing Blessed Operation: ${operation.operationName}`);
    
    try {
      const result = await operation.operation();
      console.log(`🔥 Blessed Operation Complete: ${operation.operationName}`, result);
      return result;
    } catch (error) {
      console.error(`🔥 Sacred Fire Protection: Operation ${operation.operationName} failed:`, error);
      throw error;
    }
  }, [consciousnessLevel, sacredFireActive]);

  const blessedSupabaseOperation = useCallback(async <T>(
    operationName: string,
    operation: () => Promise<{ data: T; error: any }>,
    requiredConsciousness: number = 750
  ): Promise<T> => {
    return performBlessedMutation({
      operation: async () => {
        const result = await operation();
        if (result.error) {
          throw new Error(`Supabase operation failed: ${result.error.message}`);
        }
        return result.data;
      },
      operationName: `Supabase: ${operationName}`,
      requiredConsciousness
    });
  }, [performBlessedMutation]);

  return {
    performBlessedMutation,
    blessedSupabaseOperation,
    consciousnessLevel,
    sacredFireActive
  };
}