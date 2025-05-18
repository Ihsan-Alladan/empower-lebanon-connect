
import { supabase } from '@/integrations/supabase/client';
import { toast } from "sonner";

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar?: string;
  phoneNumber?: string;
  address?: string;
  bio?: string;
  expertise?: string[];
}

export const authService = {
  // Register a new user
  register: async (email: string, password: string, role: string, metadata: any = {}): Promise<User | null> => {
    try {
      // Include role in metadata
      const metaWithRole = { ...metadata, role };
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metaWithRole,
        }
      });
      
      if (error) throw error;
      
      if (!data.user) return null;
      
      // Return user data
      return {
        id: data.user.id,
        email: data.user.email || '',
        name: metadata.first_name 
          ? `${metadata.first_name} ${metadata.last_name || ''}`.trim()
          : email.split('@')[0],
        role: role,
      };
    } catch (error: any) {
      console.error("Registration error:", error);
      toast.error(error.message || "Registration failed");
      return null;
    }
  },
  
  // Login an existing user
  login: async (email: string, password: string): Promise<User | null> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      if (!data.user) return null;
      
      // Fetch user role
      const { data: roleData, error: roleError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', data.user.id)
        .single();
        
      if (roleError && roleError.code !== 'PGRST116') throw roleError;
      
      // Fetch profile data
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('first_name, last_name, avatar_url')
        .eq('id', data.user.id)
        .single();
        
      if (profileError && profileError.code !== 'PGRST116') throw profileError;
      
      const role = roleData?.role || 'customer'; // Default to customer if no role found
      
      return {
        id: data.user.id,
        email: data.user.email || '',
        name: profileData?.first_name 
          ? `${profileData.first_name} ${profileData.last_name || ''}`.trim()
          : email.split('@')[0],
        role: role,
        avatar: profileData?.avatar_url
      };
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(error.message || "Login failed");
      return null;
    }
  },
  
  // Logout the current user
  logout: async (): Promise<void> => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast.success("Logged out successfully");
    } catch (error: any) {
      console.error("Logout error:", error);
      toast.error(error.message || "Logout failed");
    }
  },
  
  // Get the current user
  getCurrentUser: async (): Promise<User | null> => {
    const { data } = await supabase.auth.getUser();
    
    if (!data.user) return null;
    
    try {
      // Fetch user role
      const { data: roleData, error: roleError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', data.user.id)
        .single();
        
      if (roleError && roleError.code !== 'PGRST116') throw roleError;
      
      // Fetch profile data
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('first_name, last_name, avatar_url, bio')
        .eq('id', data.user.id)
        .single();
        
      if (profileError && profileError.code !== 'PGRST116') throw profileError;
      
      const role = roleData?.role || 'customer'; // Default to customer if no role found
      
      return {
        id: data.user.id,
        email: data.user.email || '',
        name: profileData?.first_name 
          ? `${profileData.first_name} ${profileData.last_name || ''}`.trim()
          : data.user.email?.split('@')[0] || 'User',
        role: role,
        avatar: profileData?.avatar_url,
        bio: profileData?.bio
      };
    } catch (error) {
      console.error("Error getting current user details:", error);
      return {
        id: data.user.id,
        email: data.user.email || '',
        name: data.user.email?.split('@')[0] || 'User',
        role: 'customer', // Default role
      };
    }
  },
  
  // Check if user is authenticated
  isAuthenticated: async (): Promise<boolean> => {
    const { data } = await supabase.auth.getUser();
    return !!data.user;
  },
  
  // Check if user has a specific role
  hasRole: async (role: string): Promise<boolean> => {
    const { data } = await supabase.auth.getUser();
    
    if (!data.user) return false;
    
    try {
      // Fetch user roles
      const { data: roleData, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', data.user.id)
        .eq('role', role);
        
      if (error) throw error;
      
      return roleData && roleData.length > 0;
    } catch (error) {
      console.error(`Error checking ${role} role:`, error);
      return false;
    }
  },
  
  // Update user profile
  updateProfile: async (profile: Partial<User>): Promise<User | null> => {
    const { data: userData } = await supabase.auth.getUser();
    
    if (!userData.user) {
      throw new Error('User not authenticated');
    }
    
    try {
      // Update profiles table
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: profile.name?.split(' ')[0],
          last_name: profile.name?.split(' ').slice(1).join(' '),
          avatar_url: profile.avatar,
          bio: profile.bio
        })
        .eq('id', userData.user.id);
        
      if (error) throw error;
      
      return await authService.getCurrentUser();
    } catch (error: any) {
      console.error("Profile update error:", error);
      toast.error(error.message || "Failed to update profile");
      return null;
    }
  }
};
