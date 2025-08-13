-- Create template API keys table for authentication and usage tracking
CREATE TABLE public.template_api_keys (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  api_key TEXT NOT NULL UNIQUE,
  tenant_id UUID NOT NULL,
  template_instance_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  daily_limit INTEGER NOT NULL DEFAULT 1000,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE,
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Create API usage logs table
CREATE TABLE public.api_usage_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  api_key_id UUID NOT NULL REFERENCES public.template_api_keys(id) ON DELETE CASCADE,
  endpoint TEXT NOT NULL,
  method TEXT NOT NULL,
  success BOOLEAN NOT NULL DEFAULT false,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  response_time_ms INTEGER,
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Create template instances table
CREATE TABLE public.template_instances (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  template_id TEXT NOT NULL,
  instance_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  deployment_url TEXT,
  api_key_id UUID REFERENCES public.template_api_keys(id),
  status TEXT NOT NULL DEFAULT 'pending', -- pending, active, suspended, expired
  configuration JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  last_accessed_at TIMESTAMP WITH TIME ZONE,
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Enable Row Level Security
ALTER TABLE public.template_api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.api_usage_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.template_instances ENABLE ROW LEVEL SECURITY;

-- Create policies for template API keys (admin only)
CREATE POLICY "Admins can manage template API keys" 
ON public.template_api_keys 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.user_roles ur 
  WHERE ur.user_id = auth.uid() 
  AND ur.role IN ('admin', 'super_admin')
  AND ur.is_active = true
));

-- Create policies for API usage logs (admin only)
CREATE POLICY "Admins can view API usage logs" 
ON public.api_usage_logs 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.user_roles ur 
  WHERE ur.user_id = auth.uid() 
  AND ur.role IN ('admin', 'super_admin')
  AND ur.is_active = true
));

-- Create policies for template instances (admin only)
CREATE POLICY "Admins can manage template instances" 
ON public.template_instances 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.user_roles ur 
  WHERE ur.user_id = auth.uid() 
  AND ur.role IN ('admin', 'super_admin')
  AND ur.is_active = true
));

-- Create indexes for performance
CREATE INDEX idx_template_api_keys_tenant_id ON public.template_api_keys(tenant_id);
CREATE INDEX idx_template_api_keys_active ON public.template_api_keys(is_active) WHERE is_active = true;
CREATE INDEX idx_api_usage_logs_api_key_id ON public.api_usage_logs(api_key_id);
CREATE INDEX idx_api_usage_logs_timestamp ON public.api_usage_logs(timestamp);
CREATE INDEX idx_template_instances_status ON public.template_instances(status);

-- Create function to generate API keys
CREATE OR REPLACE FUNCTION public.generate_template_api_key()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN 'mandala_' || encode(gen_random_bytes(32), 'hex');
END;
$$;

-- Create trigger to update last_accessed_at
CREATE OR REPLACE FUNCTION public.update_template_instance_access()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.last_accessed_at = now();
  RETURN NEW;
END;
$$;

-- Create function to track API usage
CREATE OR REPLACE FUNCTION public.track_template_api_usage(
  p_api_key TEXT,
  p_endpoint TEXT,
  p_method TEXT,
  p_success BOOLEAN DEFAULT true,
  p_response_time_ms INTEGER DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  api_key_id UUID;
  usage_log_id UUID;
BEGIN
  -- Get API key ID
  SELECT id INTO api_key_id
  FROM public.template_api_keys
  WHERE api_key = p_api_key;
  
  IF api_key_id IS NULL THEN
    RAISE EXCEPTION 'API key not found';
  END IF;
  
  -- Insert usage log
  INSERT INTO public.api_usage_logs (
    api_key_id,
    endpoint,
    method,
    success,
    response_time_ms
  ) VALUES (
    api_key_id,
    p_endpoint,
    p_method,
    p_success,
    p_response_time_ms
  ) RETURNING id INTO usage_log_id;
  
  RETURN usage_log_id;
END;
$$;