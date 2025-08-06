
import { supabase } from '@/integrations/supabase/client';

export const fetchUserRoles = async (userId: string): Promise<string[]> => {
  try {
    const { data: userRoleData, error } = await supabase
      .from('user_roles')
      .select(`
        roles (
          role_type
        )
      `)
      .eq('user_id', userId);
    
    if (error) {
      console.error('Error fetching user roles:', error);
      return [];
    }
    
    // Extract role types from the joined data
    const roles = userRoleData?.map((item: any) => item.roles?.role_type).filter(Boolean) || [];
    
    // If user has no roles, assign distributor role as default
    if (roles.length === 0) {
      await assignDefaultDistributorRole(userId);
      return ['distributor'];
    }
    
    return roles;
  } catch (error) {
    console.error('Error fetching user roles:', error);
    return [];
  }
};

export const assignDefaultDistributorRole = async (userId: string): Promise<void> => {
  try {
    // First, check if distributor role exists, if not create it
    const { data: distributorRole } = await supabase
      .from('roles')
      .select('id')
      .eq('role_type', 'distributor')
      .single();

    let roleId = distributorRole?.id;

    if (!roleId) {
      // Create distributor role if it doesn't exist
      const { data: newRole } = await supabase
        .from('roles')
        .insert({
          name: 'Distributor',
          role_type: 'distributor',
          permissions: {}
        })
        .select('id')
        .single();
      
      roleId = newRole?.id;
    }

    if (roleId) {
      // Assign distributor role to user
      await supabase
        .from('user_roles')
        .insert({
          user_id: userId,
          role_id: roleId,
          is_active: true
        });

      console.log('Assigned default distributor role to user:', userId);
    }
  } catch (error) {
    console.error('Error assigning default distributor role:', error);
  }
};

export const assignRestaurantPartnerRole = async (userId: string): Promise<void> => {
  try {
    // First, check if custom role exists, if not create it
    const { data: restaurantRole } = await supabase
      .from('roles')
      .select('id')
      .eq('role_type', 'custom')
      .single();

    let roleId = restaurantRole?.id;

    if (!roleId) {
      // Create custom role if it doesn't exist
      const { data: newRole } = await supabase
        .from('roles')
        .insert({
          name: 'Restaurant Partner',
          role_type: 'custom',
          permissions: {}
        })
        .select('id')
        .single();
      
      roleId = newRole?.id;
    }

    if (roleId) {
      // Assign custom role to user (representing restaurant partner)
      await supabase
        .from('user_roles')
        .insert({
          user_id: userId,
          role_id: roleId,
          is_active: true
        });

      console.log('Assigned restaurant partner role to user:', userId);
    }
  } catch (error) {
    console.error('Error assigning restaurant partner role:', error);
  }
};
