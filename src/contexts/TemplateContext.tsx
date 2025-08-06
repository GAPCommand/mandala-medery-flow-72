
import React, { createContext, useContext, useState, useEffect } from 'react';
import { TemplateConfig, DEFAULT_TEMPLATE_CONFIG, INDUSTRY_PRESETS } from '@/config/template.config';

interface TemplateContextType {
  config: TemplateConfig;
  updateConfig: (newConfig: Partial<TemplateConfig>) => void;
  applyPreset: (industry: string) => void;
  resetToDefault: () => void;
  isCustomized: boolean;
  isLoaded: boolean;
}

const TemplateContext = createContext<TemplateContextType | undefined>(undefined);

export const TemplateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<TemplateConfig>(DEFAULT_TEMPLATE_CONFIG);
  const [isCustomized, setIsCustomized] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load configuration from localStorage on mount
  useEffect(() => {
    try {
      const savedConfig = localStorage.getItem('template-config');
      if (savedConfig) {
        const parsedConfig = JSON.parse(savedConfig);
        // Ensure we have all required properties by merging with defaults
        const mergedConfig = {
          ...DEFAULT_TEMPLATE_CONFIG,
          ...parsedConfig,
          theme: {
            ...DEFAULT_TEMPLATE_CONFIG.theme,
            ...(parsedConfig.theme || {})
          }
        };
        setConfig(mergedConfig);
        setIsCustomized(true);
      }
    } catch (error) {
      console.error('Error loading template config:', error);
      // Fallback to default config
      setConfig(DEFAULT_TEMPLATE_CONFIG);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save configuration to localStorage whenever it changes (but only after initial load)
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('template-config', JSON.stringify(config));
    }
  }, [config, isLoaded]);

  const updateConfig = (newConfig: Partial<TemplateConfig>) => {
    setConfig(prev => {
      const updated = { ...prev };
      
      // Deep merge the configuration
      Object.keys(newConfig).forEach(key => {
        const configKey = key as keyof TemplateConfig;
        if (typeof newConfig[configKey] === 'object' && !Array.isArray(newConfig[configKey])) {
          updated[configKey] = { ...updated[configKey], ...newConfig[configKey] } as any;
        } else {
          updated[configKey] = newConfig[configKey] as any;
        }
      });
      
      return updated;
    });
    setIsCustomized(true);
  };

  const applyPreset = (industry: string) => {
    const preset = INDUSTRY_PRESETS[industry];
    if (preset) {
      const newConfig = {
        ...DEFAULT_TEMPLATE_CONFIG,
        ...preset,
        theme: {
          ...DEFAULT_TEMPLATE_CONFIG.theme,
          ...(preset.theme || {})
        }
      };
      setConfig(newConfig);
      setIsCustomized(true);
    }
  };

  const resetToDefault = () => {
    setConfig(DEFAULT_TEMPLATE_CONFIG);
    setIsCustomized(false);
    localStorage.removeItem('template-config');
  };

  // Always render children, even while loading, with safe defaults
  return (
    <TemplateContext.Provider value={{
      config,
      updateConfig,
      applyPreset,
      resetToDefault,
      isCustomized,
      isLoaded
    }}>
      {children}
    </TemplateContext.Provider>
  );
};

export const useTemplate = () => {
  const context = useContext(TemplateContext);
  if (context === undefined) {
    throw new Error('useTemplate must be used within a TemplateProvider');
  }
  return context;
};

// Utility hooks for specific sections with safety checks
export const useBrand = () => {
  const { config } = useTemplate();
  return config?.brand || DEFAULT_TEMPLATE_CONFIG.brand;
};

export const useContent = () => {
  const { config } = useTemplate();
  return config?.content || DEFAULT_TEMPLATE_CONFIG.content;
};

export const useTheme = () => {
  const { config } = useTemplate();
  return config?.theme || DEFAULT_TEMPLATE_CONFIG.theme;
};

export const useBusiness = () => {
  const { config } = useTemplate();
  return config?.business || DEFAULT_TEMPLATE_CONFIG.business;
};

export const useFeatures = () => {
  const { config } = useTemplate();
  return config?.features || DEFAULT_TEMPLATE_CONFIG.features;
};
