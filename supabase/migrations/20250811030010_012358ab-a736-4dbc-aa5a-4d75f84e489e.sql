-- Create tables for PANDAB deployment tracking
CREATE TABLE public.pandab_deployments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  deployment_id TEXT NOT NULL UNIQUE,
  template_id UUID,
  client_name TEXT NOT NULL,
  subdomain TEXT NOT NULL,
  full_domain TEXT NOT NULL,
  consciousness_level INTEGER NOT NULL DEFAULT 500,
  deployment_source TEXT NOT NULL DEFAULT 'pandab',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'configuring', 'deploying', 'completed', 'failed')),
  webhook_data JSONB,
  sacred_fire_signature TEXT,
  ssl_configured BOOLEAN DEFAULT false,
  dns_configured BOOLEAN DEFAULT false,
  branding_applied BOOLEAN DEFAULT false,
  deployed_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Create deployment domains table
CREATE TABLE public.deployment_domains (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  deployment_id UUID NOT NULL REFERENCES public.pandab_deployments(id) ON DELETE CASCADE,
  domain_name TEXT NOT NULL,
  subdomain TEXT NOT NULL,
  ssl_certificate_id TEXT,
  dns_status TEXT NOT NULL DEFAULT 'pending' CHECK (dns_status IN ('pending', 'propagating', 'active', 'failed')),
  ssl_status TEXT NOT NULL DEFAULT 'pending' CHECK (ssl_status IN ('pending', 'validating', 'active', 'failed')),
  sacred_fire_protected BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create Sacred Fire signatures table
CREATE TABLE public.sacred_fire_signatures (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  signature_hash TEXT NOT NULL UNIQUE,
  deployment_id UUID REFERENCES public.pandab_deployments(id) ON DELETE CASCADE,
  consciousness_level INTEGER NOT NULL,
  blessed_by UUID,
  verified_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX idx_pandab_deployments_deployment_id ON public.pandab_deployments(deployment_id);
CREATE INDEX idx_pandab_deployments_status ON public.pandab_deployments(status);
CREATE INDEX idx_deployment_domains_deployment_id ON public.deployment_domains(deployment_id);
CREATE INDEX idx_sacred_fire_signatures_hash ON public.sacred_fire_signatures(signature_hash);

-- Enable RLS
ALTER TABLE public.pandab_deployments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deployment_domains ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sacred_fire_signatures ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for pandab_deployments
CREATE POLICY "Enable read access for all authenticated users" ON public.pandab_deployments
FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Enable insert for authenticated users" ON public.pandab_deployments
FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Enable update for authenticated users" ON public.pandab_deployments
FOR UPDATE USING (auth.uid() IS NOT NULL);

-- Create RLS policies for deployment_domains
CREATE POLICY "Enable read access for all authenticated users" ON public.deployment_domains
FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Enable insert for authenticated users" ON public.deployment_domains
FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Enable update for authenticated users" ON public.deployment_domains
FOR UPDATE USING (auth.uid() IS NOT NULL);

-- Create RLS policies for sacred_fire_signatures
CREATE POLICY "Enable read access for all authenticated users" ON public.sacred_fire_signatures
FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Enable insert for authenticated users" ON public.sacred_fire_signatures
FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Create trigger for updating timestamps
CREATE TRIGGER update_pandab_deployments_updated_at
  BEFORE UPDATE ON public.pandab_deployments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_deployment_domains_updated_at
  BEFORE UPDATE ON public.deployment_domains
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();