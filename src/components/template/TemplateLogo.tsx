import React from 'react';
import { TemplateConfigService } from '@/services/TemplateConfigService';

interface TemplateLogoProps {
  fallback?: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const TemplateLogo: React.FC<TemplateLogoProps> = ({ 
  fallback,
  className = '',
  size = 'md'
}) => {
  const templateService = TemplateConfigService.getInstance();
  
  const logoUrl = templateService.getTemplateVariable('logoUrl');
  const logoWidth = templateService.getTemplateVariable('logoWidth');
  const logoHeight = templateService.getTemplateVariable('logoHeight');
  
  // Size mappings
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-16 h-16'
  };
  
  // If we have a logo URL and it's not a placeholder
  if (logoUrl && !logoUrl.includes('{{')) {
    return (
      <img 
        src={logoUrl}
        alt="Company Logo"
        className={`${sizeClasses[size]} ${className}`}
        style={{
          width: logoWidth && !logoWidth.includes('{{') ? logoWidth : undefined,
          height: logoHeight && !logoHeight.includes('{{') ? logoHeight : undefined
        }}
      />
    );
  }
  
  // Show fallback if provided
  if (fallback) {
    return <div className={className}>{fallback}</div>;
  }
  
  // Default geometric logo
  return (
    <div className={`${sizeClasses[size]} ${className} bg-template-gradient-primary rounded-full flex items-center justify-center shadow-lg`}>
      <div className={`${size === 'lg' ? 'w-10 h-10 border-2' : size === 'md' ? 'w-6 h-6 border-2' : 'w-4 h-4 border-1'} border-white rounded-full flex items-center justify-center`}>
        <div className={`${size === 'lg' ? 'w-4 h-4' : size === 'md' ? 'w-2 h-2' : 'w-1 h-1'} bg-white rounded-full`}></div>
      </div>
    </div>
  );
};