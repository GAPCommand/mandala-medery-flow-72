-- Create template update tracking tables (skip existing ones)
CREATE TABLE IF NOT EXISTS public.template_update_checks (
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
CREATE TABLE IF NOT EXISTS public.template_backups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  template_id TEXT NOT NULL,
  backup_id TEXT NOT NULL UNIQUE,
  backup_type TEXT NOT NULL DEFAULT 'manual',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  retention_days INTEGER NOT NULL DEFAULT 30,
  backup_size_mb INTEGER,
  used_for_rollback BOOLEAN NOT NULL DEFAULT false,
  rollback_date TIMESTAMP WITH TIME ZONE,
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Create template customizations tracking
CREATE TABLE IF NOT EXISTS public.template_customizations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  template_id TEXT NOT NULL,
  file_path TEXT NOT NULL,
  customization_type TEXT NOT NULL,
  original_content TEXT,
  customized_content TEXT NOT NULL,
  is_preservable BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  metadata JSONB DEFAULT '{}'::jsonb,
  UNIQUE(template_id, file_path)
);

-- Enable Row Level Security (only if not already enabled)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'template_update_checks') THEN
    ALTER TABLE public.template_update_checks ENABLE ROW LEVEL SECURITY;
    
    CREATE POLICY "Admins can manage template update checks" 
    ON public.template_update_checks 
    FOR ALL 
    USING (EXISTS (
      SELECT 1 FROM public.user_roles ur 
      WHERE ur.user_id = auth.uid() 
      AND ur.role IN ('admin', 'super_admin')
      AND ur.is_active = true
    ));
  END IF;
END $$;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_template_update_checks_template_id ON public.template_update_checks(template_id);
CREATE INDEX IF NOT EXISTS idx_template_backups_template_id ON public.template_backups(template_id);
CREATE INDEX IF NOT EXISTS idx_template_customizations_template_id ON public.template_customizations(template_id);