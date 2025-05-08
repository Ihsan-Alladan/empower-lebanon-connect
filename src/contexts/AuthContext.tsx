
import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService, User } from '@/services/authService';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<User | null>;
  logout: () => void;
  isAuthenticated: boolean;
  isSeller: boolean;
  isInstructor: boolean;
  isAdmin: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    // Check if user is already logged in
    const storedUser = authService.getCurrentUser();
    if (storedUser) {
      console.log("AuthContext: Found stored user", storedUser);
      setUser(storedUser);
    }
    setLoading(false);

    // Set up Supabase auth listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Supabase Auth Event:", event);
      if (session && session.user) {
        // Handle actual Supabase auth when we implement it
        console.log("Supabase user logged in:", session.user);
      } else if (event === 'SIGNED_OUT') {
        console.log("Supabase user signed out");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
  const login = async (email: string, password: string): Promise<User | null> => {
    const loggedInUser = await authService.login(email, password);
    if (loggedInUser) {
      console.log("AuthContext: Login successful", loggedInUser);
      setUser(loggedInUser);
      return loggedInUser;
    }
    return null;
  };
  
  const logout = () => {
    authService.logout();
    setUser(null);
    toast.success("Logged out successfully");
  };
  
  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isSeller: user?.role === 'seller',
    isInstructor: user?.role === 'instructor',
    isAdmin: user?.role === 'admin',
    loading
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
