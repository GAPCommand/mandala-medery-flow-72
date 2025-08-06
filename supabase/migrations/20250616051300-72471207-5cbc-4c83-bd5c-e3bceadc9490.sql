
-- Create contact leads table for CRM tracking
CREATE TABLE IF NOT EXISTS public.contact_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  message TEXT,
  lead_source TEXT DEFAULT 'website_contact_form',
  lead_status TEXT DEFAULT 'new' CHECK (lead_status IN ('new', 'contacted', 'qualified', 'converted', 'closed')),
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  assigned_to UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  contacted_at TIMESTAMP WITH TIME ZONE,
  metadata JSONB DEFAULT '{}',
  ip_address TEXT,
  user_agent TEXT
);

-- Create contact form submissions table for detailed tracking
CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  contact_lead_id UUID REFERENCES public.contact_leads(id),
  form_data JSONB NOT NULL,
  email_sent BOOLEAN DEFAULT false,
  email_sent_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  ip_address TEXT,
  user_agent TEXT
);

-- Add RLS policies for contact leads
ALTER TABLE public.contact_leads ENABLE ROW LEVEL SECURITY;

-- Policy for authenticated users to view all contact leads (for CRM)
CREATE POLICY "Authenticated users can view contact leads" 
  ON public.contact_leads 
  FOR SELECT 
  USING (auth.role() = 'authenticated');

-- Policy for authenticated users to insert contact leads
CREATE POLICY "Authenticated users can create contact leads" 
  ON public.contact_leads 
  FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');

-- Policy for authenticated users to update contact leads
CREATE POLICY "Authenticated users can update contact leads" 
  ON public.contact_leads 
  FOR UPDATE 
  USING (auth.role() = 'authenticated');

-- Add RLS policies for contact submissions
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Policy for authenticated users to view contact submissions
CREATE POLICY "Authenticated users can view contact submissions" 
  ON public.contact_submissions 
  FOR SELECT 
  USING (auth.role() = 'authenticated');

-- Policy for authenticated users to insert contact submissions
CREATE POLICY "Authenticated users can create contact submissions" 
  ON public.contact_submissions 
  FOR INSERT 
  WITH CHECK (true); -- Allow anonymous submissions

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_contact_leads_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for contact leads
CREATE TRIGGER update_contact_leads_updated_at
  BEFORE UPDATE ON public.contact_leads
  FOR EACH ROW
  EXECUTE FUNCTION update_contact_leads_updated_at();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_contact_leads_email ON public.contact_leads(email);
CREATE INDEX IF NOT EXISTS idx_contact_leads_status ON public.contact_leads(lead_status);
CREATE INDEX IF NOT EXISTS idx_contact_leads_created_at ON public.contact_leads(created_at);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_lead_id ON public.contact_submissions(contact_lead_id);
