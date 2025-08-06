
import React, { useEffect } from 'react';
import { useTheme } from '@/contexts/TemplateContext';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const theme = useTheme();

  useEffect(() => {
    // Safety check - only apply theme if it exists and has the expected structure
    if (!theme || !theme.colors) {
      console.log('Theme not loaded yet or missing colors structure');
      return;
    }

    const root = document.documentElement;
    
    // Apply color variables with safety checks
    if (theme.colors.primary) {
      root.style.setProperty('--color-primary-light', theme.colors.primary.light);
      root.style.setProperty('--color-primary-main', theme.colors.primary.main);
      root.style.setProperty('--color-primary-dark', theme.colors.primary.dark);
    }
    
    if (theme.colors.secondary) {
      root.style.setProperty('--color-secondary-light', theme.colors.secondary.light);
      root.style.setProperty('--color-secondary-main', theme.colors.secondary.main);
      root.style.setProperty('--color-secondary-dark', theme.colors.secondary.dark);
    }
    
    if (theme.colors.accent) {
      root.style.setProperty('--color-accent-light', theme.colors.accent.light);
      root.style.setProperty('--color-accent-main', theme.colors.accent.main);
      root.style.setProperty('--color-accent-dark', theme.colors.accent.dark);
    }
    
    if (theme.colors.background) {
      root.style.setProperty('--color-background-light', theme.colors.background.light);
      root.style.setProperty('--color-background-main', theme.colors.background.main);
      root.style.setProperty('--color-background-dark', theme.colors.background.dark);
    }
    
    // Apply typography variables with safety checks
    if (theme.typography?.fontFamily) {
      root.style.setProperty('--font-primary', theme.typography.fontFamily.primary);
      root.style.setProperty('--font-secondary', theme.typography.fontFamily.secondary);
    }
    
    if (theme.typography?.scale) {
      root.style.setProperty('--text-xs', theme.typography.scale.xs);
      root.style.setProperty('--text-sm', theme.typography.scale.sm);
      root.style.setProperty('--text-base', theme.typography.scale.base);
      root.style.setProperty('--text-lg', theme.typography.scale.lg);
      root.style.setProperty('--text-xl', theme.typography.scale.xl);
      root.style.setProperty('--text-xxl', theme.typography.scale.xxl);
    }
    
    // Apply spacing variables with safety checks
    if (theme.spacing) {
      root.style.setProperty('--container-max-width', theme.spacing.container);
      root.style.setProperty('--section-spacing', theme.spacing.section);
      root.style.setProperty('--component-spacing', theme.spacing.component);
    }
    
    // Apply border radius variables with safety checks
    if (theme.borderRadius) {
      root.style.setProperty('--radius-sm', theme.borderRadius.sm);
      root.style.setProperty('--radius-md', theme.borderRadius.md);
      root.style.setProperty('--radius-lg', theme.borderRadius.lg);
      root.style.setProperty('--radius-xl', theme.borderRadius.xl);
    }
    
  }, [theme]);

  return <>{children}</>;
};

// Utility function to get Tailwind classes based on theme
export const getThemeClasses = (theme: any) => {
  if (!theme || !theme.gradients) {
    // Return default classes if theme is not loaded
    return {
      gradients: {
        primary: 'bg-gradient-to-r from-amber-600 to-orange-600',
        secondary: 'bg-gradient-to-r from-orange-500 to-red-500',
        hero: 'bg-gradient-to-br from-amber-50 to-orange-100',
        card: 'bg-gradient-to-br from-amber-50 to-orange-50'
      },
      buttons: {
        primary: 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-600 hover:to-orange-600',
        secondary: 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-amber-700 hover:to-orange-700'
      }
    };
  }

  return {
    gradients: {
      primary: `bg-gradient-to-r ${theme.gradients.primary}`,
      secondary: `bg-gradient-to-r ${theme.gradients.secondary}`,
      hero: `bg-gradient-to-br ${theme.gradients.hero}`,
      card: `bg-gradient-to-br ${theme.gradients.card}`
    },
    buttons: {
      primary: `bg-gradient-to-r ${theme.gradients.primary} hover:from-amber-600 hover:to-orange-600`,
      secondary: `bg-gradient-to-r ${theme.gradients.secondary} hover:from-amber-700 hover:to-orange-700`
    }
  };
};
