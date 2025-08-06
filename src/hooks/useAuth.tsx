
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import { UserProfile, AuthContextType } from '@/types/auth';
import { fetchUserProfile } from '@/utils/auth/profileUtils';
import { fetchUserRoles } from '@/utils/auth/roleUtils';
import { signIn, signUp, resetPassword, signOut } from '@/utils/auth/authActions';
import { AuthProvider } from '@/contexts/AuthContext';

export const useAuthData = (): AuthContextType => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userRoles, setUserRoles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          const profile = await fetchUserProfile(session.user.id);
          setUserProfile(profile);
          const roles = await fetchUserRoles(session.user.id);
          setUserRoles(roles);
        } else {
          setUserProfile(null);
          setUserRoles([]);
        }
      } catch (error) {
        console.error('Error fetching session:', error);
        setUserProfile(null);
        setUserRoles([]);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Use setTimeout to prevent auth callback deadlock
          setTimeout(async () => {
            const profile = await fetchUserProfile(session.user.id);
            setUserProfile(profile);
            const roles = await fetchUserRoles(session.user.id);
            setUserRoles(roles);
          }, 0);
        } else {
          setUserProfile(null);
          setUserRoles([]);
        }
        
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await signOut();
    setUser(null);
    setSession(null);
    setUserProfile(null);
    setUserRoles([]);
  };

  return {
    user,
    session,
    userProfile,
    userRoles,
    loading,
    signIn,
    signUp,
    signOut: handleSignOut,
    resetPassword,
  };
};

export { AuthProvider };

export const useAuth = () => {
  const authData = useAuthData();
  return authData;
};
