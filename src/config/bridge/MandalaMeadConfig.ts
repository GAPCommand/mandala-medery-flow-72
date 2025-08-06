// MandalaMead SFIO Network Configuration
export const MANDALA_MEAD_CONFIG = {
  // Core Property Identity
  PROPERTY_DOMAIN: 'mandalamead.com',
  PROPERTY_NAME: 'MandalaMead Sacred Brewing Network',
  
  // Consciousness & Spiritual Configuration
  CONSCIOUSNESS_LEVEL: 700, // Sacred mead consciousness level
  NETWORK_ROLE: 'bridge_member' as const,
  SACRED_FIRE_PROTECTION: true,
  DIVINE_GOVERNMENT_ALIGNMENT: true,
  
  // Network Endpoints
  GAPCOMMAND_HUB: 'https://gapcommand.com/functions/v1/universal-service-bridge',
  CENTRAL_DISCOVERY: 'https://xfwvisutdbfoanhqpafx.supabase.co/functions/v1/sfio-network-discovery',
  HEALTH_CHECK: 'https://xfwvisutdbfoanhqpafx.supabase.co/functions/v1/sfio-bridge-status',
  
  // Local Endpoints
  LOCAL_DISCOVERY: '/.well-known/sfio-network',
  LOCAL_HEALTH: '/api/health',
  
  // Capabilities & Features
  CAPABILITIES: [
    'mead_brewing',
    'sacred_recipes', 
    'divine_timing',
    'consciousness_enhancement',
    'purple_pouch_discovery',
    'sacred_fire_integration',
    'mandala_distribution'
  ],
  
  // Bridge Settings
  BRIDGE_VERSION: '2.1.0',
  AUTO_CONNECT: true,
  HEALTH_MONITORING: true,
  HEALTH_CHECK_INTERVAL: 5, // minutes
  
  // Purple Pouch Discovery Settings
  PURPLE_POUCH_ENABLED: true,
  PURPLE_POUCH_SCOPE: 'full' as const,
  MEET_AT_EDGE_PROTOCOL: true,
  
  // Consciousness Sync Settings
  AUTO_CONSCIOUSNESS_SYNC: true,
  CONSCIOUSNESS_SYNC_INTERVAL: 30, // minutes
  
  // Security Settings
  SECURE_TRANSPORT: true,
  CERTIFICATE_VALIDATION: true,
  SACRED_FIRE_HEADERS: {
    'X-Sacred-Fire-Protection': 'true',
    'X-Consciousness-Level': '700',
    'X-Property-Domain': 'mandalamead.com'
  }
};

// Environment-specific overrides
export const getEnvironmentConfig = () => {
  const isProduction = window.location.hostname === 'mandalamead.com';
  const isDevelopment = window.location.hostname.includes('localhost') || 
                       window.location.hostname.includes('lovableproject.com');
  
  return {
    ...MANDALA_MEAD_CONFIG,
    PROPERTY_DOMAIN: isProduction ? 'mandalamead.com' : window.location.hostname,
    AUTO_CONNECT: isDevelopment ? false : true, // Manual control in dev
    HEALTH_MONITORING: true, // Always monitor
  };
};

// Configuration validator
export const validateConfig = (config: typeof MANDALA_MEAD_CONFIG): boolean => {
  const required = [
    'PROPERTY_DOMAIN',
    'CONSCIOUSNESS_LEVEL', 
    'NETWORK_ROLE',
    'CAPABILITIES'
  ];
  
  return required.every(key => config[key as keyof typeof config] !== undefined);
};

export default MANDALA_MEAD_CONFIG;