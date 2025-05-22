
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

import AuthLayout from '@/components/auth/AuthLayout';
import LoginForm from '@/components/auth/LoginForm';
import SignupForm from '@/components/auth/SignupForm';
import { getRedirectPathByRole } from '@/utils/authUtils';

const Login = () => {
  const [activeTab, setActiveTab] = useState<string>('login');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated, user } = useAuth();
  
  // Get return URL from location state or default to home
  const from = location.state?.from?.pathname || '/';
  
  // Redirect authenticated users
  useEffect(() => {
    if (isAuthenticated && user) {
      console.log('User authenticated, redirecting based on role:', user.role);
      const redirectPath = getRedirectPathByRole(user.role);
      navigate(redirectPath);
      toast.success(`Welcome back, ${user.name}!`);
    }
  }, [isAuthenticated, user, navigate, from]);

  const handleLogin = async (email: string, password: string) => {
    try {
      setIsSubmitting(true);
      const result = await login(email, password);
      if (!result) {
        toast.error('Invalid email or password. Please try again.');
      }
      return result;
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
      return null;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignupSuccess = (email: string) => {
    setActiveTab('login');
  };

  const footerText = (
    <>
      By continuing, you agree to our <Link to="/terms" className="text-empower-terracotta hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-empower-terracotta hover:underline">Privacy Policy</Link>.
    </>
  );

  return (
    <AuthLayout 
      title="Welcome to EmpowEra" 
      subtitle="Sign in to your account or create a new one"
      footerText={footerText}
    >
      <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        
        {/* Login Tab */}
        <TabsContent value="login">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm
              onLogin={handleLogin}
              isSubmitting={isSubmitting}
            />
          </CardContent>
        </TabsContent>
        
        {/* Sign Up Tab */}
        <TabsContent value="signup">
          <CardHeader>
            <CardTitle>Create an Account</CardTitle>
            <CardDescription>
              Join EmpowEra to access courses, workshops and more
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignupForm
              onSignupSuccess={handleSignupSuccess}
              isSubmitting={isSubmitting}
              setIsSubmitting={setIsSubmitting}
            />
          </CardContent>
        </TabsContent>
      </Tabs>
    </AuthLayout>
  );
};

export default Login;
