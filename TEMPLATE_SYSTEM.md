# Universal E-Commerce Temple Template System

## Overview

This template system transforms any e-commerce project into a reusable, configurable solution that can be instantly adapted to different industries and businesses. The system provides centralized configuration for branding, content, business logic, and visual themes.

## Quick Setup

1. **Clone the project** for a new implementation
2. **Run the Setup Wizard** (automatically appears on first load)
3. **Choose your industry preset** (Mead, Wine, Coffee, etc.)
4. **Customize branding and content**
5. **Configure business logic**
6. **Deploy your customized template**

## Core Components

### 1. Template Configuration (`src/config/template.config.ts`)
- **BrandConfig**: Company name, logo, contact info, social links
- **ContentConfig**: Copy text, terminology, hero content
- **BusinessConfig**: Product attributes, pricing, order flow
- **ThemeConfig**: Colors, typography, spacing, gradients
- **FeatureConfig**: Enable/disable features per implementation

### 2. Template Context (`src/contexts/TemplateContext.tsx`)
- Centralized state management for all template settings
- Automatic persistence to localStorage
- Industry preset application
- Deep configuration merging

### 3. Dynamic Content System (`src/components/template/DynamicContent.tsx`)
- `<DynamicContent>` - Template-based text rendering
- `<ProductTerminology>` - Dynamic product naming
- `<BusinessTerminology>` - Dynamic business terms
- `<QualityMetric>` - Configurable quality indicators

### 4. Theme Provider (`src/components/template/ThemeProvider.tsx`)
- CSS custom property injection
- Real-time theme updates
- Tailwind class generation utilities

### 5. Setup Wizard (`src/components/template/TemplateSetupWizard.tsx`)
- Step-by-step configuration process
- Industry preset selection
- Brand customization interface
- Business logic configuration

## Industry Presets

### Available Presets
- **Mead**: Sacred/spiritual branding, consciousness levels, ABV metrics
- **Wine**: Premium vintages, traditional wine terminology
- **Coffee**: Artisan roasting, origin scoring, cafe partnerships

### Creating New Presets
```typescript
export const INDUSTRY_PRESETS = {
  yourIndustry: {
    brand: {
      industry: "Your Industry",
      name: "Default Brand Name",
      // ... other brand config
    },
    content: {
      productTerminology: {
        singular: "Product",
        plural: "Products",
        category: "Premium Product"
      },
      // ... other content config
    },
    // ... theme and business config
  }
};
```

## Usage Examples

### Dynamic Content
```tsx
// Template-based content
<DynamicContent template="hero.title" fallback="Default Title" />

// Product terminology
<ProductTerminology type="singular" /> // "Mead" or "Wine" or "Coffee"

// Business terms  
<BusinessTerminology type="distributor" /> // "Distributor" or "Retailer" or "Partner"

// Quality metrics
<QualityMetric type="primary" value="12" showUnit /> // "12%" or "12 Score"
```

### Theme Usage
```tsx
const theme = useTheme();
<div className={`bg-gradient-to-r ${theme.gradients.primary}`}>
  Themed Content
</div>
```

### Configuration Updates
```tsx
const { updateConfig } = useTemplate();

// Update brand name
updateConfig({
  brand: { name: "New Brand Name" }
});

// Apply industry preset
applyPreset('wine');
```

## File Structure

```
src/
├── config/
│   └── template.config.ts          # Core configuration types & presets
├── contexts/
│   └── TemplateContext.tsx         # State management & hooks
├── components/
│   └── template/
│       ├── DynamicContent.tsx      # Content rendering components
│       ├── ThemeProvider.tsx       # Theme injection & utilities
│       └── TemplateSetupWizard.tsx # Setup interface
└── TEMPLATE_SYSTEM.md              # This documentation
```

## Customization Guide

### 1. Adding New Content Templates
```typescript
// In template.config.ts
copyTemplates: {
  "new.template": "Your template text with {{variables}}",
}

// Usage
<DynamicContent 
  template="new.template" 
  variables={{ variable: "value" }}
/>
```

### 2. Extending Business Logic
```typescript
// Add new business configuration
interface BusinessConfig {
  // ... existing config
  newFeature: {
    enabled: boolean;
    settings: any;
  };
}
```

### 3. Custom Theme Properties
```typescript
// Add new theme properties
interface ThemeConfig {
  // ... existing config
  animations: {
    duration: string;
    easing: string;
  };
}
```

## Best Practices

1. **Use the template system consistently** - Replace all hard-coded text and styles
2. **Create comprehensive presets** - Include all necessary configuration for your industry
3. **Test theme switching** - Ensure all components work with different color schemes
4. **Document custom extensions** - Keep track of any custom modifications
5. **Version your templates** - Use git tags for stable template versions

## Migration Guide

### Converting Existing Code
1. Replace hard-coded brand names with `useBrand().name`
2. Replace static copy with `<DynamicContent>` components
3. Replace color classes with theme variables
4. Add configuration options for business logic

### Example Migration
```tsx
// Before
<h1>Mandala Medery</h1>
<p>Sacred Kashmir Mead</p>

// After  
<h1>{useBrand().name}</h1>
<p>{useBrand().tagline}</p>

// Or with dynamic content
<DynamicContent template="brand.name" as="h1" />
<DynamicContent template="brand.tagline" as="p" />
```

## Deployment

1. **Development**: Use setup wizard for rapid prototyping
2. **Production**: Pre-configure templates and disable wizard
3. **Client Delivery**: Provide configured template with documentation
4. **Updates**: Use git subtree or submodule for template updates

## Support & Extension

This template system is designed to be:
- **Scalable**: Add new industries and features easily
- **Maintainable**: Centralized configuration reduces technical debt  
- **Reusable**: Clone and configure for unlimited implementations
- **Upgradeable**: Core improvements benefit all implementations

For questions or custom industry presets, refer to the project documentation or create an issue in the repository.
