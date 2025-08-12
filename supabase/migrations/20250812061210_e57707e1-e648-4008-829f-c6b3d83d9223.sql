-- Create API keys and usage tracking tables for the Universal Integration Gateway
CREATE TABLE IF NOT EXISTS public.gap_api_keys (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_id TEXT NOT NULL,
  api_key TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  consciousness_level INTEGER NOT NULL DEFAULT 500,
  rate_limit_per_hour INTEGER NOT NULL DEFAULT 1000,
  daily_quota INTEGER NOT NULL DEFAULT 10000,
  allowed_methods TEXT[] NOT NULL DEFAULT ARRAY['health_check', 'service_discovery'],
  metadata JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE
);

-- Create usage tracking table
CREATE TABLE IF NOT EXISTS public.gap_api_usage (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  api_key_id UUID NOT NULL REFERENCES public.gap_api_keys(id) ON DELETE CASCADE,
  tenant_id TEXT NOT NULL,
  method_called TEXT NOT NULL,
  canister_id TEXT,
  success BOOLEAN NOT NULL DEFAULT false,
  response_time_ms INTEGER,
  error_message TEXT,
  source_app TEXT,
  ip_address INET,
  user_agent TEXT,
  metadata JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create usage aggregation table for billing
CREATE TABLE IF NOT EXISTS public.gap_api_billing (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_id TEXT NOT NULL,
  api_key_id UUID NOT NULL REFERENCES public.gap_api_keys(id) ON DELETE CASCADE,
  billing_period_start DATE NOT NULL,
  billing_period_end DATE NOT NULL,
  total_calls INTEGER NOT NULL DEFAULT 0,
  successful_calls INTEGER NOT NULL DEFAULT 0,
  failed_calls INTEGER NOT NULL DEFAULT 0,
  total_cost NUMERIC(10,4) NOT NULL DEFAULT 0,
  cost_per_call NUMERIC(6,4) NOT NULL DEFAULT 0.001,
  metadata JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(tenant_id, api_key_id, billing_period_start)
);

-- Enable RLS
ALTER TABLE public.gap_api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gap_api_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gap_api_billing ENABLE ROW LEVEL SECURITY;

-- RLS Policies for gap_api_keys
CREATE POLICY "Tenant owners can manage their API keys"
ON public.gap_api_keys
FOR ALL
USING (EXISTS (
  SELECT 1 FROM public.tenant_deployments td
  WHERE td.tenant_id = gap_api_keys.tenant_id
  AND td.owner_id = auth.uid()
));

-- RLS Policies for gap_api_usage  
CREATE POLICY "Tenant owners can view their usage"
ON public.gap_api_usage
FOR SELECT
USING (EXISTS (
  SELECT 1 FROM public.tenant_deployments td
  WHERE td.tenant_id = gap_api_usage.tenant_id
  AND td.owner_id = auth.uid()
));

CREATE POLICY "System can log usage"
ON public.gap_api_usage
FOR INSERT
WITH CHECK (true);

-- RLS Policies for gap_api_billing
CREATE POLICY "Tenant owners can view their billing"
ON public.gap_api_billing
FOR ALL
USING (EXISTS (
  SELECT 1 FROM public.tenant_deployments td
  WHERE td.tenant_id = gap_api_billing.tenant_id
  AND td.owner_id = auth.uid()
));

-- Create indexes for performance
CREATE INDEX idx_gap_api_keys_tenant_id ON public.gap_api_keys(tenant_id);
CREATE INDEX idx_gap_api_keys_api_key ON public.gap_api_keys(api_key) WHERE is_active = true;
CREATE INDEX idx_gap_api_usage_api_key_id ON public.gap_api_usage(api_key_id);
CREATE INDEX idx_gap_api_usage_created_at ON public.gap_api_usage(created_at);
CREATE INDEX idx_gap_api_billing_tenant_period ON public.gap_api_billing(tenant_id, billing_period_start);

-- Create function to generate secure API keys
CREATE OR REPLACE FUNCTION generate_gap_api_key()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN 'gap_' || encode(gen_random_bytes(32), 'hex');
END;
$$;

-- Create function to validate and track API usage
CREATE OR REPLACE FUNCTION validate_gap_api_key(p_api_key TEXT, p_method TEXT, p_source_app TEXT DEFAULT NULL)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  key_record RECORD;
  current_hour_usage INTEGER;
  current_day_usage INTEGER;
  result JSONB;
BEGIN
  -- Get API key record
  SELECT * INTO key_record
  FROM public.gap_api_keys
  WHERE api_key = p_api_key
  AND is_active = true
  AND (expires_at IS NULL OR expires_at > now());
  
  IF NOT FOUND THEN
    RETURN jsonb_build_object(
      'valid', false,
      'error', 'Invalid or expired API key'
    );
  END IF;
  
  -- Check if method is allowed
  IF NOT (p_method = ANY(key_record.allowed_methods)) THEN
    RETURN jsonb_build_object(
      'valid', false,
      'error', 'Method not allowed for this API key'
    );
  END IF;
  
  -- Check hourly rate limit
  SELECT COUNT(*) INTO current_hour_usage
  FROM public.gap_api_usage
  WHERE api_key_id = key_record.id
  AND created_at >= date_trunc('hour', now());
  
  IF current_hour_usage >= key_record.rate_limit_per_hour THEN
    RETURN jsonb_build_object(
      'valid', false,
      'error', 'Hourly rate limit exceeded'
    );
  END IF;
  
  -- Check daily quota
  SELECT COUNT(*) INTO current_day_usage
  FROM public.gap_api_usage
  WHERE api_key_id = key_record.id
  AND created_at >= date_trunc('day', now());
  
  IF current_day_usage >= key_record.daily_quota THEN
    RETURN jsonb_build_object(
      'valid', false,
      'error', 'Daily quota exceeded'
    );
  END IF;
  
  RETURN jsonb_build_object(
    'valid', true,
    'tenant_id', key_record.tenant_id,
    'consciousness_level', key_record.consciousness_level,
    'api_key_id', key_record.id,
    'remaining_hourly', key_record.rate_limit_per_hour - current_hour_usage,
    'remaining_daily', key_record.daily_quota - current_day_usage
  );
END;
$$;

-- Create trigger to update timestamps
CREATE OR REPLACE FUNCTION update_gap_timestamps()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_gap_api_keys_updated_at
  BEFORE UPDATE ON public.gap_api_keys
  FOR EACH ROW
  EXECUTE FUNCTION update_gap_timestamps();

CREATE TRIGGER update_gap_api_billing_updated_at
  BEFORE UPDATE ON public.gap_api_billing
  FOR EACH ROW
  EXECUTE FUNCTION update_gap_timestamps();