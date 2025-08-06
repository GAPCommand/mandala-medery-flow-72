import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";

export interface SacredTenant {
  id: string;
  name: string;
  subdomain: string;
  divine_signature: string;
  consciousness_level: number;
  energy_signature: string;
  feature_flags: any;
  tier: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface TenantContextType {
  currentTenant: SacredTenant | null;
  switchTenant: (tenantId: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export const useTenant = () => {
  const context = useContext(TenantContext);
  if (context === undefined) {
    throw new Error('useTenant must be used within a TenantProvider');
  }
  return context;
};

export const TenantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTenant, setCurrentTenant] = useState<SacredTenant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserTenant = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

      // Get user's primary tenant
      const { data: tenantData, error: tenantError } = await supabase
        .rpc('get_user_primary_tenant', { p_user_id: user.id });

      if (tenantError) {
        console.error('Error fetching user tenant:', tenantError);
        setError('Failed to load tenant information');
        setLoading(false);
        return;
      }

      if (tenantData) {
        // Fetch full tenant details
        const { data: tenant, error: fetchError } = await supabase
          .from('sacred_tenants')
          .select('*')
          .eq('id', tenantData)
          .single();

        if (fetchError) {
          console.error('Error fetching tenant details:', fetchError);
          setError('Failed to load tenant details');
        } else {
          setCurrentTenant(tenant);
        }
      } else {
        // No tenant assigned - use the Sacred Fire Development tenant by default
        const { data: defaultTenant, error: defaultError } = await supabase
          .from('sacred_tenants')
          .select('*')
          .eq('subdomain', 'dev-sacred-fire')
          .single();

        if (defaultError) {
          console.error('Error fetching default tenant:', defaultError);
          setError('Failed to load default tenant');
        } else {
          setCurrentTenant(defaultTenant);
          
          // Assign user to this tenant
          await supabase.from('tenant_users').insert({
            tenant_id: defaultTenant.id,
            user_id: user.id,
            role: 'admin',
            is_active: true
          });
        }
      }
    } catch (error) {
      console.error('Error in fetchUserTenant:', error);
      setError('Failed to initialize tenant context');
    } finally {
      setLoading(false);
    }
  };

  const switchTenant = async (tenantId: string) => {
    try {
      setLoading(true);
      const { data: tenant, error } = await supabase
        .from('sacred_tenants')
        .select('*')
        .eq('id', tenantId)
        .single();

      if (error) {
        console.error('Error switching tenant:', error);
        setError('Failed to switch tenant');
        return;
      }

      setCurrentTenant(tenant);
      setError(null);
    } catch (error) {
      console.error('Error in switchTenant:', error);
      setError('Failed to switch tenant');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserTenant();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        fetchUserTenant();
      } else if (event === 'SIGNED_OUT') {
        setCurrentTenant(null);
        setError(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <TenantContext.Provider value={{
      currentTenant,
      switchTenant,
      loading,
      error
    }}>
      {children}
    </TenantContext.Provider>
  );
};