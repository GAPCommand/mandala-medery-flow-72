
import React from 'react';
import { useContent } from '@/contexts/TemplateContext';

interface DynamicContentProps {
  template: string;
  fallback?: string;
  variables?: Record<string, string | number>;
  className?: string;
  as?: 'span' | 'div' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const DynamicContent: React.FC<DynamicContentProps> = ({ 
  template, 
  fallback = '', 
  variables = {},
  className = '',
  as: Component = 'span'
}) => {
  const content = useContent();
  
  let text = content.copyTemplates[template] || fallback;
  
  // Replace variables in the text
  Object.entries(variables).forEach(([key, value]) => {
    text = text.replace(new RegExp(`{{${key}}}`, 'g'), String(value));
  });
  
  return <Component className={className}>{text}</Component>;
};

// Specialized components for common content types
export const ProductTerminology: React.FC<{ 
  type: 'singular' | 'plural' | 'category';
  className?: string;
  as?: 'span' | 'div' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}> = ({ type, className = '', as: Component = 'span' }) => {
  const content = useContent();
  return <Component className={className}>{content.productTerminology[type]}</Component>;
};

export const BusinessTerminology: React.FC<{ 
  type: 'distributor' | 'portal' | 'territory';
  className?: string;
  as?: 'span' | 'div' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}> = ({ type, className = '', as: Component = 'span' }) => {
  const content = useContent();
  return <Component className={className}>{content.businessTerms[type]}</Component>;
};

export const QualityMetric: React.FC<{ 
  type: 'primary' | 'secondary';
  showUnit?: boolean;
  value?: string | number;
  className?: string;
  as?: 'span' | 'div' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}> = ({ type, showUnit = false, value, className = '', as: Component = 'span' }) => {
  const content = useContent();
  const metric = content.qualityMetrics[type];
  
  const text = value 
    ? `${value}${showUnit && metric.unit ? metric.unit : ''}`
    : metric.label;
    
  return <Component className={className}>{text}</Component>;
};
