
export const DEFAULT_TEMPLATE_CONFIG = {
  brand: {
    name: "Your Brand",
    tagline: "Your Tagline", 
    description: "Your brand description",
    industry: "General",
    domain: "yourbrand.com",
    contact: {
      email: "hello@yourbrand.com",
      phone: "+1 (555) 123-4567",
      address: "123 Main St, City, State 12345"
    }
  },
  content: {
    heroSection: {
      title: "Welcome to Our Platform",
      subtitle: "Your Success Partner",
      description: "Join our exclusive distribution network",
      primaryCTA: "Get Started",
      secondaryCTA: "Learn More"
    },
    productTerminology: {
      singular: "Product",
      plural: "Products", 
      category: "Premium Products"
    },
    copyTemplates: {},
    businessTerms: {},
    qualityMetrics: {}
  },
  business: {
    pricing: {
      currency: "USD",
      taxRate: 0.08,
      freeShippingThreshold: 100
    },
    orderFlow: {
      minimumOrderQuantity: 1
    }
  },
  theme: {
    colors: {
      primary: {
        light: "#FCD34D",
        main: "#F59E0B",
        dark: "#D97706"
      },
      secondary: {
        light: "#FED7AA",
        main: "#FB923C",
        dark: "#EA580C"
      },
      accent: {
        light: "#FEE2E2",
        main: "#F87171",
        dark: "#DC2626"
      },
      background: {
        light: "#FFFBEB",
        main: "#FEF3C7",
        dark: "#FDE68A"
      }
    },
    typography: {
      fontFamily: {
        primary: "Inter, system-ui, sans-serif",
        secondary: "Inter, system-ui, sans-serif"
      },
      scale: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        xxl: "1.5rem"
      }
    },
    spacing: {
      container: "1200px",
      section: "4rem",
      component: "1.5rem"
    },
    borderRadius: {
      sm: "0.125rem",
      md: "0.375rem",
      lg: "0.5rem",
      xl: "0.75rem"
    },
    gradients: {
      primary: "from-amber-600 to-orange-600",
      secondary: "from-orange-500 to-red-500",
      hero: "from-amber-50 to-orange-100",
      card: "from-amber-50 to-orange-50"
    }
  },
  features: {}
};
