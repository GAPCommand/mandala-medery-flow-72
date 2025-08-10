import React from 'react';
import { TemplateConfigService } from '@/services/TemplateConfigService';
import { useBrand } from '@/contexts/TemplateContext';

interface TemplateTaglineProps {
  fallback?: string;
  className?: string;
  as?: 'span' | 'div' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const TemplateTagline: React.FC<TemplateTaglineProps> = ({ 
  fallback = 'Your Success Partner',
  className = '',
  as: Component = 'span'
}) => {
  const templateService = TemplateConfigService.getInstance();
  const brand = useBrand();
  
  const tagline = templateService.isInTemplateMode() 
    ? templateService.getTemplateVariable('companyTagline') || fallback
    : brand.tagline;

  // Don't render placeholder text in production
  const displayTagline = tagline.includes('{{') ? fallback : tagline;
  
  return <Component className={className}>{displayTagline}</Component>;
};