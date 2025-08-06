
import { useEffect } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';

export const useAutoRoleAssignment = () => {
  const { user, userRoles } = useAuth();

  useEffect(() => {
    const assignDefaultRole = async () => {
      if (!user || !user.id) return;

      // Check if user already has roles
      if (userRoles && userRoles.length > 0) {
        console.log('User already has roles:', userRoles);
        return;
      }

      try {
        console.log('Assigning default distributor role to user:', user.id);

        // First, ensure the distributor role exists
        const { data: existingRole } = await supabase
          .from('roles')
          .select('id')
          .eq('role_type', 'distributor')
          .single();

        let roleId = existingRole?.id;

        if (!roleId) {
          console.log('Creating distributor role...');
          // Create the distributor role if it doesn't exist
          const { data: newRole, error: roleError } = await supabase
            .from('roles')
            .insert({
              name: 'Distributor',
              role_type: 'distributor',
              permissions: {
                products: ['read'],
                orders: ['create', 'read'],
                inventory: ['read'],
                analytics: ['read']
              }
            })
            .select('id')
            .single();

          if (roleError) {
            console.error('Error creating role:', roleError);
            return;
          }

          roleId = newRole.id;
        }

        // Check if user already has this role assigned
        const { data: existingUserRole } = await supabase
          .from('user_roles')
          .select('id')
          .eq('user_id', user.id)
          .eq('role_id', roleId)
          .single();

        if (existingUserRole) {
          console.log('User already has distributor role assigned');
          return;
        }

        // Assign the role to the user
        const { error: assignError } = await supabase
          .from('user_roles')
          .insert({
            user_id: user.id,
            role_id: roleId,
            is_active: true
          });

        if (assignError) {
          console.error('Error assigning role:', assignError);
        } else {
          console.log('Successfully assigned distributor role to user');
        }

      } catch (error) {
        console.error('Error in role assignment:', error);
      }
    };

    // Run after a short delay to ensure auth is fully loaded
    const timeoutId = setTimeout(assignDefaultRole, 1000);
    return () => clearTimeout(timeoutId);
  }, [user, userRoles]);
};
