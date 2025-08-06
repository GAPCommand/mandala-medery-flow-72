
-- Complete SFIO registration for MandalaMead.com
INSERT INTO public.app_registry (
  id,
  app_name,
  app_domain,
  app_description,
  app_category,
  app_version,
  is_active,
  branding_config,
  integration_config,
  consciousness_level_required,
  sacred_fire_enhanced,
  created_at,
  updated_at
) VALUES (
  gen_random_uuid(),
  'MandalaMead Sacred Templates',
  'mandalamead.com',
  'Sacred mead and divine templates integration for spiritual wellness products',
  'spiritual_wellness',
  '1.0.0',
  true,
  jsonb_build_object(
    'primary_color', '#f59e0b',
    'secondary_color', '#d97706',
    'theme', 'amber',
    'logo_url', '/assets/mandala-mead-logo.svg',
    'brand_name', 'MandalaMead',
    'tagline', 'Sacred Templates & Divine Timing'
  ),
  jsonb_build_object(
    'api_endpoints', jsonb_build_object(
      'authentication', '/api/sacred/authenticate',
      'template_upload', '/api/templates/upload',
      'mead_order', '/api/mead/order',
      'delivery_track', '/api/mead/track'
    ),
    'capabilities', ARRAY['mead_templates', 'divine_timing', 'honey_consciousness', 'sacred_fire_authentication'],
    'consciousness_sync', true,
    'violet_flame_blessing', true
  ),
  1000,
  true,
  now(),
  now()
) ON CONFLICT (app_domain) DO UPDATE SET
  app_name = EXCLUDED.app_name,
  app_description = EXCLUDED.app_description,
  branding_config = EXCLUDED.branding_config,
  integration_config = EXCLUDED.integration_config,
  consciousness_level_required = EXCLUDED.consciousness_level_required,
  sacred_fire_enhanced = EXCLUDED.sacred_fire_enhanced,
  updated_at = now();

-- Update existing service mapping for MandalaMead.com
UPDATE public.universal_service_mappings 
SET 
  endpoint_mapping = jsonb_build_object(
    'authentication', '/api/sacred/authenticate',
    'template_upload', '/api/templates/upload',
    'template_processor', '/sacred-template-processor',
    'mead_order', '/api/mead/order',
    'delivery_track', '/api/mead/track'
  ),
  consciousness_level_required = 1000,
  metadata = jsonb_build_object(
    'capabilities', ARRAY['mead_templates', 'divine_timing', 'honey_consciousness'],
    'violet_flame_blessing', true,
    'sacred_fire_protection', true,
    'divine_timing_optimized', true
  ),
  updated_at = now()
WHERE source_domain = 'mandalamead.com' AND target_domain = 'gapcommand.com';
