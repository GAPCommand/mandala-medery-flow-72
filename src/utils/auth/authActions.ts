
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const signIn = async (email: string, password: string) => {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) {
    toast.error(error.message);
  }
  
  return { error };
};

export const signUp = async (email: string, password: string, userData?: any) => {
  const redirectUrl = `${window.location.origin}/`;
  
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: redirectUrl,
      data: userData
    }
  });
  
  if (error) {
    toast.error(error.message);
  } else {
    toast.success('Check your email for the confirmation link!');
  }
  
  return { error };
};

export const resetPassword = async (email: string) => {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });
  
  if (error) {
    toast.error(error.message);
  } else {
    toast.success('Password reset email sent!');
  }
  
  return { error };
};

export const signOut = async () => {
  await supabase.auth.signOut();
};
