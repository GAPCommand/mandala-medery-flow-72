
import { User, Session } from '@supabase/supabase-js';

export interface UserProfile {
  id?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  company?: string;
  phone?: string;
  territory_name?: string;
  territory_region?: string;
  // Restaurant-specific fields
  venue_name?: string;
  venue_type?: 'restaurant' | 'bar' | 'lounge' | 'hotel' | 'event_venue';
  license_number?: string;
  seating_capacity?: number;
  cuisine_type?: string;
}

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  userProfile: UserProfile | null;
  userRoles: string[];
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, userData?: any) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: any }>;
}
