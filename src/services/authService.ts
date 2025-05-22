
import { supabase } from '@/integrations/supabase/client';

// Type for user role - update to match the database roles
export type UserRole = 'admin' | 'instructor' | 'customer' | 'seller';

// Interface for user signup data
export interface SignUpData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: UserRole;
  phone?: string;
  address?: string;
}

// Sign up user
export const signUpUser = async (data: SignUpData): Promise<any> => {
  const { email, password, firstName, lastName, role = 'customer', phone, address } = data;
  
  const { data: authData, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
        role: role,
        phone: phone,
        address: address
      },
    }
  });

  if (error) {
    console.error('Error signing up:', error);
    throw error;
  }

  // Ensure role is added to user_roles table
  if (authData?.user) {
    try {
      const { error: roleError } = await supabase
        .from('user_roles')
        .insert({
          user_id: authData.user.id,
          role: role
        });
      
      if (roleError) {
        console.error('Error adding user role:', roleError);
        // Continue despite error - the trigger should handle this in most cases
      }
    } catch (roleErr) {
      console.error('Exception adding user role:', roleErr);
      // Continue despite error - the trigger should handle this in most cases
    }
  }

  return authData;
};

// Sign in user
export const signInUser = async (email: string, password: string): Promise<any> => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error('Error signing in:', error);
    throw error;
  }

  return data;
};

// Sign out user
export const signOutUser = async (): Promise<void> => {
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

// Get current session
export const getCurrentSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  
  if (error) {
    console.error('Error getting session:', error);
    throw error;
  }
  
  return data.session;
};

// Get current user
export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  
  if (error) {
    console.error('Error getting user:', error);
    return null;
  }
  
  return data.user;
};

// Get user profile
export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  
  if (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
  
  return data;
};

// Get user role
export const getUserRole = async (userId: string): Promise<UserRole | null> => {
  const { data, error } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', userId)
    .single();
  
  if (error) {
    console.error('Error fetching user role:', error);
    return null;
  }
  
  return data.role as UserRole;
};

// Update user profile
export const updateUserProfile = async (userId: string, updates: any) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId);
  
  if (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
  
  return data;
};

// Reset password
export const resetPassword = async (email: string) => {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });
  
  if (error) {
    console.error('Error resetting password:', error);
    throw error;
  }
  
  return true;
};

// Change password
export const changePassword = async (password: string) => {
  const { error } = await supabase.auth.updateUser({
    password,
  });
  
  if (error) {
    console.error('Error changing password:', error);
    throw error;
  }
  
  return true;
};

// Register a new user with a specific role
export const registerUser = async (data: SignUpData, role: UserRole) => {
  const userData = {
    ...data,
    role
  };
  
  return await signUpUser(userData);
};

// Create a named export for the authService object to match what's being imported
export const authService = {
  signUpUser,
  signInUser,
  signOutUser,
  getCurrentSession,
  getCurrentUser,
  getUserProfile,
  getUserRole,
  updateUserProfile,
  resetPassword,
  changePassword,
  registerUser
};
