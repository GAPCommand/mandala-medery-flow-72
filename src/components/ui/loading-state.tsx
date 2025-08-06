
import React from 'react';
import { Loader2, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingStateProps {
  message?: string;
  variant?: 'default' | 'sacred' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading...',
  variant = 'default',
  size = 'md',
  className
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  if (variant === 'minimal') {
    return (
      <div className={cn('flex items-center justify-center', className)}>
        <Loader2 className={cn('animate-spin text-amber-600', sizeClasses[size])} />
      </div>
    );
  }

  if (variant === 'sacred') {
    return (
      <div className={cn('flex flex-col items-center justify-center p-8 text-center', className)}>
        <div className="relative mb-4">
          <Sparkles className={cn('text-amber-500 animate-pulse', sizeClasses[size])} />
          <Loader2 className={cn('absolute inset-0 animate-spin text-amber-600', sizeClasses[size])} />
        </div>
        <p className={cn('text-amber-700 font-medium', textSizeClasses[size])}>
          {message}
        </p>
        <p className="text-xs text-amber-600 mt-2">
          Channeling sacred energy...
        </p>
      </div>
    );
  }

  return (
    <div className={cn('flex flex-col items-center justify-center p-6 text-center', className)}>
      <Loader2 className={cn('animate-spin text-amber-600 mb-3', sizeClasses[size])} />
      <p className={cn('text-amber-700', textSizeClasses[size])}>
        {message}
      </p>
    </div>
  );
};

export default LoadingState;
