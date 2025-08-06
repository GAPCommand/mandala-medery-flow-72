
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ResponsiveCardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  variant?: 'default' | 'sacred' | 'success' | 'warning';
}

const ResponsiveCard: React.FC<ResponsiveCardProps> = ({
  title,
  children,
  className,
  headerClassName,
  contentClassName,
  variant = 'default'
}) => {
  const variantStyles = {
    default: 'border-gray-200',
    sacred: 'border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50',
    success: 'border-green-200 bg-gradient-to-br from-green-50 to-emerald-50',
    warning: 'border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50'
  };

  const headerVariantStyles = {
    default: 'bg-gray-50',
    sacred: 'bg-gradient-to-r from-amber-100 to-orange-100',
    success: 'bg-gradient-to-r from-green-100 to-emerald-100',
    warning: 'bg-gradient-to-r from-yellow-100 to-orange-100'
  };

  return (
    <Card className={cn(
      'w-full shadow-sm hover:shadow-md transition-shadow duration-200',
      'touch-manipulation', // Better touch interactions on mobile
      variantStyles[variant],
      className
    )}>
      {title && (
        <CardHeader className={cn(
          'pb-3 px-4 sm:px-6',
          headerVariantStyles[variant],
          headerClassName
        )}>
          <CardTitle className="text-lg sm:text-xl font-semibold">
            {title}
          </CardTitle>
        </CardHeader>
      )}
      <CardContent className={cn(
        'px-4 sm:px-6 py-4 sm:py-6',
        contentClassName
      )}>
        {children}
      </CardContent>
    </Card>
  );
};

export default ResponsiveCard;
