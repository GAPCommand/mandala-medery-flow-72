
import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  className 
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  return (
    <div 
      className={cn(
        'animate-spin rounded-full border-2 border-amber-200 border-t-amber-600',
        sizeClasses[size],
        className
      )}
    />
  );
};

export const LoadingCard: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn('animate-pulse', className)}>
    <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-lg p-6 space-y-4">
      <div className="h-4 bg-amber-200 rounded w-3/4"></div>
      <div className="space-y-2">
        <div className="h-3 bg-amber-200 rounded"></div>
        <div className="h-3 bg-amber-200 rounded w-5/6"></div>
      </div>
      <div className="h-8 bg-amber-300 rounded w-1/3"></div>
    </div>
  </div>
);

export const LoadingTable: React.FC<{ rows?: number; columns?: number }> = ({ 
  rows = 5, 
  columns = 4 
}) => (
  <div className="animate-pulse space-y-4">
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-4">
      <div className="space-y-3">
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: columns }).map((_, i) => (
            <div key={i} className="h-4 bg-amber-200 rounded"></div>
          ))}
        </div>
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-4 gap-4">
            {Array.from({ length: columns }).map((_, colIndex) => (
              <div key={colIndex} className="h-3 bg-amber-100 rounded"></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  </div>
);
