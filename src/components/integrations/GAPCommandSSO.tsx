
import React, { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface GAPCommandProfile {
  id: string;
  email: string;
  full_name: string;
  avatar_url: string;
  organization_id?: string;
  permissions: string[];
  consciousness_level: number;
  gapcommand_user_id: string;
}

interface GAPCommandContextType {
  profile: GAPCommandProfile | null;
  loading: boolean;
  error: string | null;
  syncWithGAPCommand: () => Promise<void>;
  hasPermission: (permission: string) => boolean;
}

const GAPCommandContext = createContext<GAPCommandContextType | undefined>(undefined);

export const useGAPCommand = () => {
  const context = useContext(GAPCommandContext);
  if (!context) {
    throw new Error('useGAPCommand must be used within GAPCommandProvider');
  }
  return context;
};

interface GAPCommandProviderProps {
  children: ReactNode;
}

export const GAPCommandProvider: React.FC<GAPCommandProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<GAPCommandProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const syncWithGAPCommand = async () => {
    if (!user) return;

    try {
      console.log('Syncing with GAPCommand SSO...');
      
      // Check for existing profile in the profiles table
      const { data: userProfile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError && profileError.code !== 'PGRST116') {
        console.error('Error fetching profile:', profileError);
        throw profileError;
      }

      if (userProfile) {
        // User exists in profiles system
        const mappedProfile: GAPCommandProfile = {
          id: userProfile.id,
          email: userProfile.email || user.email || '',
          full_name: userProfile.full_name || user.user_metadata?.full_name || '',
          avatar_url: userProfile.avatar_url || user.user_metadata?.avatar_url || '',
          organization_id: undefined, // Will be set based on business logic
          permissions: ['distributor:read', 'orders:create'], // Default permissions
          consciousness_level: 500, // Default consciousness level
          gapcommand_user_id: userProfile.id
        };
        
        setProfile(mappedProfile);
        console.log('GAPCommand profile found:', mappedProfile);
      } else {
        // Create new profile
        console.log('Creating new GAPCommand profile...');
        
        const newProfile = {
          id: user.id,
          email: user.email,
          full_name: user.user_metadata?.full_name || '',
          avatar_url: user.user_metadata?.avatar_url || '',
          updated_at: new Date().toISOString()
        };

        const { data: createdProfile, error: createError } = await supabase
          .from('profiles')
          .insert(newProfile)
          .select()
          .single();

        if (createError) {
          console.error('Error creating profile:', createError);
          throw createError;
        }

        const mappedProfile: GAPCommandProfile = {
          id: createdProfile.id,
          email: createdProfile.email || user.email || '',
          full_name: createdProfile.full_name || '',
          avatar_url: createdProfile.avatar_url || '',
          organization_id: undefined,
          permissions: ['distributor:read', 'orders:create'],
          consciousness_level: 500,
          gapcommand_user_id: createdProfile.id
        };
        
        setProfile(mappedProfile);
        console.log('GAPCommand profile created:', mappedProfile);
      }
    } catch (error) {
      console.error('Error syncing with GAPCommand:', error);
      setError('Failed to sync with GAPCommand');
    }
  };

  const hasPermission = (permission: string): boolean => {
    if (!profile) return false;
    return profile.permissions.includes(permission) || profile.permissions.includes('*');
  };

  useEffect(() => {
    const initializeGAPCommand = async () => {
      setLoading(true);
      setError(null);
      try {
        await syncWithGAPCommand();
      } catch (error) {
        console.error('Failed to initialize GAPCommand:', error);
        setError('Failed to initialize GAPCommand');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      initializeGAPCommand();
    } else {
      setProfile(null);
      setLoading(false);
    }
  }, [user]);

  const value: GAPCommandContextType = {
    profile,
    loading,
    error,
    syncWithGAPCommand,
    hasPermission
  };

  return (
    <GAPCommandContext.Provider value={value}>
      {children}
    </GAPCommandContext.Provider>
  );
};

export default GAPCommandProvider;
