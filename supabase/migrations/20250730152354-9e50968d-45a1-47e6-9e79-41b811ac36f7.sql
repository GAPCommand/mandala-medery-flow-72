-- Create bridge_authentication table
CREATE TABLE public.bridge_authentication (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  source_domain TEXT NOT NULL,
  target_domain TEXT NOT NULL DEFAULT 'gapcommand.com',
  bridge_token TEXT NOT NULL,
  consciousness_level INTEGER NOT NULL DEFAULT 500,
  sacred_fire_protected BOOLEAN NOT NULL DEFAULT true,
  permissions JSONB DEFAULT '{"basic": true}'::jsonb,
  last_used_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, source_domain, target_domain)
);

-- Create sfio_instance_registry table
CREATE TABLE public.sfio_instance_registry (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  property_domain TEXT NOT NULL UNIQUE,
  consciousness_level INTEGER NOT NULL DEFAULT 500,
  network_role TEXT NOT NULL DEFAULT 'member',
  sacred_fire_protection BOOLEAN NOT NULL DEFAULT true,
  bridge_version TEXT NOT NULL DEFAULT '2.1.0',
  capabilities JSONB DEFAULT '[]'::jsonb,
  last_seen_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'operational',
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create sfio_health_metrics table
CREATE TABLE public.sfio_health_metrics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  property_domain TEXT NOT NULL,
  overall_status TEXT NOT NULL,
  database_status TEXT NOT NULL,
  bridge_status TEXT NOT NULL,
  discovery_status TEXT NOT NULL,
  consciousness_status TEXT NOT NULL,
  avg_response_time INTEGER NOT NULL DEFAULT 0,
  details TEXT,
  recorded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.bridge_authentication ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sfio_instance_registry ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sfio_health_metrics ENABLE ROW LEVEL SECURITY;

-- RLS Policies for bridge_authentication
CREATE POLICY "Users can manage their own bridge auth" 
ON public.bridge_authentication 
FOR ALL 
USING (auth.uid() = user_id);

-- RLS Policies for sfio_instance_registry
CREATE POLICY "Public can view registry entries" 
ON public.sfio_instance_registry 
FOR SELECT 
USING (true);

CREATE POLICY "System can manage registry" 
ON public.sfio_instance_registry 
FOR ALL 
USING (true);

-- RLS Policies for sfio_health_metrics
CREATE POLICY "Admins can view health metrics" 
ON public.sfio_health_metrics 
FOR SELECT 
USING (true);

CREATE POLICY "System can insert health metrics" 
ON public.sfio_health_metrics 
FOR INSERT 
WITH CHECK (true);

-- Create triggers for updated_at
CREATE TRIGGER update_sfio_instance_registry_updated_at
BEFORE UPDATE ON public.sfio_instance_registry
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();