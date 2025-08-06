
import React from 'react';
import { cn } from '@/lib/utils';

interface MobileOptimizedLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const MobileOptimizedLayout: React.FC<MobileOptimizedLayoutProps> = ({ 
  children, 
  className 
}) => {
  return (
    <div className={cn(
      "min-h-screen bg-gradient-to-br from-amber-50 to-orange-50",
      "supports-[height:100dvh]:min-h-[100dvh]", // Use dynamic viewport height
      className
    )}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MobileOptimizedLayout;
