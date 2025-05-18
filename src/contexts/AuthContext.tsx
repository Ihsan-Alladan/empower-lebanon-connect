
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import { toast } from 'sonner';
import { getUserRole } from '@/services/authService';

export interface AuthUser {
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

interface AuthContextType {
  user: AuthUser | null;
  session: Session | null;
  login: (email: string, password: string) => Promise<AuthUser | null>;
  logout: () => void;
  isAuthenticated: boolean;
  isSeller: boolean;
  isAdmin: boolean;
  isLearner: boolean;
  isInstructor: boolean;
  isCustomer: boolean;
  loading: boolean;
  userRole: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [userRole, setUserRole] = useState<string | null>(null);
  
  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        console.log('Auth state changed:', event);
        setSession(newSession);
        
        if (newSession?.user) {
          fetchUserProfile(newSession.user);
        } else {
          setUser(null);
          setUserRole(null);
        }
      }
    );
    
    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      if (currentSession?.user) {
        fetchUserProfile(currentSession.user);
      } else {
        setLoading(false);
      }
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
  const fetchUserProfile = async (authUser: User) => {
    try {
      // Fetch user role from user_roles table
      const { data: roleData, error: roleError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', authUser.id)
        .single();
        
      if (roleError && roleError.code !== 'PGRST116') {
        console.error('Error fetching role:', roleError);
        // If role not found, we'll default to customer below
      }
      
      // Fetch additional profile info if needed
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('first_name, last_name, avatar_url, bio')
        .eq('id', authUser.id)
        .single();
        
      if (profileError && profileError.code !== 'PGRST116') {
        console.error('Error fetching profile:', profileError);
      }
      
      // If role isn't in the database, check from the user metadata
      let role = roleData?.role;
      if (!role && authUser.user_metadata) {
        role = authUser.user_metadata.role;
        
        // If we found the role in metadata but not in the database, add it
        if (role) {
          const { error: insertError } = await supabase
            .from('user_roles')
            .insert({
              user_id: authUser.id,
              role: role
            });
            
          if (insertError) {
            console.error('Error adding user role from metadata:', insertError);
          }
        }
      }
      
      // Default to customer if no role found
      role = role || 'customer'; 
      setUserRole(role);
      
      const formattedUser: AuthUser = {
        id: authUser.id,
        email: authUser.email || '',
        name: profileData?.first_name 
              ? `${profileData.first_name} ${profileData.last_name || ''}`.trim()
              : authUser.email?.split('@')[0] || 'User',
        role: role,
        avatar: profileData?.avatar_url || undefined,
        bio: profileData?.bio || undefined,
        phoneNumber: authUser.user_metadata?.phone || undefined,
        address: authUser.user_metadata?.address || undefined
      };
      
      setUser(formattedUser);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const login = async (email: string, password: string): Promise<AuthUser | null> => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      // User profile will be fetched by the onAuthStateChange listener
      toast.success('Logged in successfully');
      return user; // Will be updated by the auth listener
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.message || 'Failed to login');
      return null;
    } finally {
      setLoading(false);
    }
  };
  
  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast.success("Logged out successfully");
      // User state will be cleared by the onAuthStateChange listener
    } catch (error: any) {
      console.error('Logout error:', error);
      toast.error(error.message || 'Failed to logout');
    }
  };
  
  const value = {
    user,
    session,
    login,
    logout,
    isAuthenticated: !!user,
    isSeller: userRole === 'seller',
    isAdmin: userRole === 'admin',
    isLearner: userRole === 'learner',
    isInstructor: userRole === 'instructor',
    isCustomer: userRole === 'customer',
    loading,
    userRole
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
