
import { useState, useCallback } from 'react';

interface UseLoadingStateResult {
  isLoading: boolean;
  error: string | null;
  startLoading: () => void;
  stopLoading: () => void;
  setError: (error: string | null) => void;
  withLoading: <T>(asyncFunction: () => Promise<T>) => Promise<T | null>;
}

export const useLoadingState = (initialLoading = false): UseLoadingStateResult => {
  const [isLoading, setIsLoading] = useState(initialLoading);
  const [error, setError] = useState<string | null>(null);

  const startLoading = useCallback(() => {
    setIsLoading(true);
    setError(null);
  }, []);

  const stopLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  const withLoading = useCallback(
    async <T>(asyncFunction: () => Promise<T>): Promise<T | null> => {
      try {
        startLoading();
        const result = await asyncFunction();
        return result;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred';
        setError(errorMessage);
        console.error('Loading error:', err);
        return null;
      } finally {
        stopLoading();
      }
    },
    [startLoading, stopLoading]
  );

  return {
    isLoading,
    error,
    startLoading,
    stopLoading,
    setError,
    withLoading
  };
};
