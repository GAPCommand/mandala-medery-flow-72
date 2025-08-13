-- Create template update tracking tables
CREATE TABLE public.template_update_checks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  template_id TEXT NOT NULL,
  current_version TEXT NOT NULL,
  latest_version TEXT NOT NULL,
  updates_available BOOLEAN NOT NULL DEFAULT false,
  security_updates_available BOOLEAN NOT NULL DEFAULT false,
  checked_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  user_agent TEXT,
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Create template backups table
CREATE TABLE public.template_backups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  template_id TEXT NOT NULL,
  backup_id TEXT NOT NULL UNIQUE,
  backup_type TEXT NOT NULL DEFAULT 'manual', -- manual, pre_update, scheduled
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  retention_days INTEGER NOT NULL DEFAULT 30,
  backup_size_mb INTEGER,
  used_for_rollback BOOLEAN NOT NULL DEFAULT false,
  rollback_date TIMESTAMP WITH TIME ZONE,
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Create template deployments tracking
CREATE TABLE public.template_deployments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  template_id TEXT NOT NULL,
  deployment_url TEXT NOT NULL,
  deployment_type TEXT NOT NULL DEFAULT 'manual', -- manual, auto_update, scheduled
  status TEXT NOT NULL DEFAULT 'pending', -- pending, success, failed
  deployed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  deployment_duration_ms INTEGER,
  build_logs JSONB,
  environment_variables JSONB,
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Create template customizations tracking
CREATE TABLE public.template_customizations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  template_id TEXT NOT NULL,
  file_path TEXT NOT NULL,
  customization_type TEXT NOT NULL, -- branding, styling, content, functionality
  original_content TEXT,
  customized_content TEXT NOT NULL,
  is_preservable BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  metadata JSONB DEFAULT '{}'::jsonb,
  UNIQUE(template_id, file_path)
);

-- Enable Row Level Security
ALTER TABLE public.template_update_checks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.template_backups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.template_deployments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.template_customizations ENABLE ROW LEVEL SECURITY;

-- Create policies for admin access
CREATE POLICY "Admins can manage template update checks" 
ON public.template_update_checks 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.user_roles ur 
  WHERE ur.user_id = auth.uid() 
  AND ur.role IN ('admin', 'super_admin')
  AND ur.is_active = true
));

CREATE POLICY "Admins can manage template backups" 
ON public.template_backups 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.user_roles ur 
  WHERE ur.user_id = auth.uid() 
  AND ur.role IN ('admin', 'super_admin')
  AND ur.is_active = true
));

CREATE POLICY "Admins can manage template deployments" 
ON public.template_deployments 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.user_roles ur 
  WHERE ur.user_id = auth.uid() 
  AND ur.role IN ('admin', 'super_admin')
  AND ur.is_active = true
));

CREATE POLICY "Admins can manage template customizations" 
ON public.template_customizations 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.user_roles ur 
  WHERE ur.user_id = auth.uid() 
  AND ur.role IN ('admin', 'super_admin')
  AND ur.is_active = true
));

-- Create indexes for performance
CREATE INDEX idx_template_update_checks_template_id ON public.template_update_checks(template_id);
CREATE INDEX idx_template_update_checks_checked_at ON public.template_update_checks(checked_at);
CREATE INDEX idx_template_backups_template_id ON public.template_backups(template_id);
CREATE INDEX idx_template_backups_created_at ON public.template_backups(created_at);
CREATE INDEX idx_template_deployments_template_id ON public.template_deployments(template_id);
CREATE INDEX idx_template_deployments_status ON public.template_deployments(status);
CREATE INDEX idx_template_customizations_template_id ON public.template_customizations(template_id);

-- Create trigger to update customizations timestamp
CREATE OR REPLACE FUNCTION public.update_template_customizations_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_template_customizations_updated_at
  BEFORE UPDATE ON public.template_customizations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_template_customizations_updated_at();

-- Create function to clean up old backups
CREATE OR REPLACE FUNCTION public.cleanup_expired_template_backups()
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  deleted_count INTEGER;
BEGIN
  DELETE FROM public.template_backups
  WHERE created_at < now() - INTERVAL '1 day' * retention_days
  AND used_for_rollback = false;
  
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  
  RETURN deleted_count;
END;
$$;

-- Create function to get template update summary
CREATE OR REPLACE FUNCTION public.get_template_update_summary(p_template_id TEXT)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result JSONB;
BEGIN
  SELECT jsonb_build_object(
    'template_id', p_template_id,
    'last_update_check', (
      SELECT checked_at 
      FROM public.template_update_checks 
      WHERE template_id = p_template_id 
      ORDER BY checked_at DESC 
      LIMIT 1
    ),
    'total_backups', (
      SELECT COUNT(*) 
      FROM public.template_backups 
      WHERE template_id = p_template_id
    ),
    'last_deployment', (
      SELECT jsonb_build_object(
        'deployed_at', deployed_at,
        'status', status,
        'deployment_url', deployment_url
      )
      FROM public.template_deployments 
      WHERE template_id = p_template_id 
      ORDER BY deployed_at DESC 
      LIMIT 1
    ),
    'customizations_count', (
      SELECT COUNT(*) 
      FROM public.template_customizations 
      WHERE template_id = p_template_id
    ),
    'preservable_customizations', (
      SELECT COUNT(*) 
      FROM public.template_customizations 
      WHERE template_id = p_template_id 
      AND is_preservable = true
    )
  ) INTO result;
  
  RETURN result;
END;
$$;