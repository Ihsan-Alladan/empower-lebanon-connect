
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('customer');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = await login(email, password);
      
      if (user) {
        toast.success(`Welcome back, ${user.name}!`);
        
        // Redirect based on user role
        if (user.role === 'admin') {
          navigate('/admin');
        } else if (user.role === 'seller') {
          navigate('/seller-dashboard');
        } else if (user.role === 'instructor') {
          navigate('/instructor-dashboard');
        } else {
          navigate('/');
        }
      } else {
        toast.error("Invalid email or password");
      }
    } catch (error) {
      toast.error("An error occurred while logging in");
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // Reset form fields when tab changes
    setEmail('');
    setPassword('');

    // Pre-fill email for demo accounts
    if (value === 'seller') {
      setEmail('seller@seller.com');
    } else if (value === 'instructor') {
      setEmail('instructor@instructor.com');
    } else if (value === 'admin') {
      setEmail('admin@admin.com');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="mb-8 flex flex-col items-center text-center">
          <Link to="/">
            <img 
              src="/lovable-uploads/22a31812-0de9-4dde-9442-b766171923c5.png" 
              alt="EmpowEra Logo" 
              className="h-16 w-auto mb-6"
            />
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="mt-2 text-gray-600">Sign in to your account to continue</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Choose your account type</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="customer" value={activeTab} onValueChange={handleTabChange} className="w-full">
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger value="customer">Customer</TabsTrigger>
                <TabsTrigger value="seller">Seller</TabsTrigger>
                <TabsTrigger value="instructor">Instructor</TabsTrigger>
                <TabsTrigger value="admin">Admin</TabsTrigger>
              </TabsList>
              
              <TabsContent value="customer">
                <p className="text-sm text-gray-500 mb-4">Login as a customer to shop for products and enroll in courses.</p>
              </TabsContent>
              
              <TabsContent value="seller">
                <p className="text-sm text-gray-500 mb-4">Login as a seller to manage your products and orders.</p>
              </TabsContent>
              
              <TabsContent value="instructor">
                <p className="text-sm text-gray-500 mb-4">Login as an instructor to manage your courses and classrooms.</p>
                <div className="text-xs text-gray-500 p-2 bg-blue-50 rounded mb-4 flex flex-col">
                  <span>Demo Instructor Credentials:</span>
                  <span>Email: instructor@instructor.com</span>
                  <span>Password: instructor321</span>
                </div>
              </TabsContent>
              
              <TabsContent value="admin">
                <p className="text-sm text-gray-500 mb-4">Login as an administrator to manage the platform.</p>
              </TabsContent>
              
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email"
                    type="email" 
                    placeholder="Enter your email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link to="/forgot-password" className="text-xs text-empower-terracotta hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="Enter your password" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-empower-terracotta hover:bg-empower-terracotta/90"
                  disabled={loading}
                >
                  {loading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>
            </Tabs>
          </CardContent>
          <CardFooter className="flex-col items-center">
            <div className="text-center text-sm text-gray-500">
              Don't have an account?{' '}
              <Link to="/signup" className="font-medium text-empower-terracotta hover:underline">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;
