
-- Create user_invitations table for the user management system
CREATE TABLE IF NOT EXISTS user_invitations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  role_assignments TEXT[] NOT NULL DEFAULT '{}',
  invited_by UUID REFERENCES auth.users(id),
  invitation_token TEXT UNIQUE NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  personal_message TEXT,
  accepted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE user_invitations ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow read access to user invitations" ON user_invitations FOR SELECT USING (true);
CREATE POLICY "Allow insert access to user invitations" ON user_invitations FOR INSERT WITH CHECK (auth.uid() = invited_by);
CREATE POLICY "Allow update access to user invitations" ON user_invitations FOR UPDATE USING (auth.uid() = invited_by);

-- Add updated_at trigger
CREATE TRIGGER update_user_invitations_updated_at 
BEFORE UPDATE ON user_invitations 
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
