import React from 'react';
import { TemplateConfigService } from '@/services/TemplateConfigService';
import { useBrand } from '@/contexts/TemplateContext';

interface TemplateBrandNameProps {
  fallback?: string;
  className?: string;
  as?: 'span' | 'div' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const TemplateBrandName: React.FC<TemplateBrandNameProps> = ({ 
  fallback = 'Your Brand',
  className = '',
  as: Component = 'span'
}) => {
  const templateService = TemplateConfigService.getInstance();
  const brand = useBrand();
  
  const brandName = templateService.isInTemplateMode() 
    ? templateService.getTemplateVariable('companyName') || fallback
    : brand.name;

  // Don't render placeholder text in production
  const displayName = brandName.includes('{{') ? fallback : brandName;
  
  return <Component className={className}>{displayName}</Component>;
};