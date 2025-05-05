
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/sonner';
import { Store, Lock, Mail } from 'lucide-react';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
});

type FormData = z.infer<typeof formSchema>;

const SellerLogin: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  
  const onSubmit = async (data: FormData) => {
    setLoading(true);
    
    try {
      console.log("Attempting seller login with:", data.email);
      
      // Attempt login using auth context
      const user = await login(data.email, data.password);
      
      if (user) {
        console.log("Login successful, user:", user);
        toast.success('Seller login successful!');
        
        // Add a small delay to ensure the localStorage is updated
        setTimeout(() => {
          navigate('/seller-dashboard');
        }, 200);
      } else {
        toast.error('Login failed', {
          description: 'Invalid seller credentials'
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error('An error occurred', {
        description: 'Please try again later'
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-empower-ivory">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <Card className="animate-fade-in">
            <CardHeader className="space-y-1 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-[#B56E4D] rounded-full flex items-center justify-center mb-2">
                <Store className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-2xl text-empower-brown">Seller Login</CardTitle>
              <CardDescription>
                Enter your credentials to access your seller dashboard
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail size={16} /> Email
                  </Label>
                  <Input
                    id="email"
                    placeholder="seller@example.com"
                    {...register('email')}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="flex items-center gap-2">
                    <Lock size={16} /> Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    {...register('password')}
                  />
                  {errors.password && (
                    <p className="text-sm text-red-500">{errors.password.message}</p>
                  )}
                </div>
                
                <div className="mt-6">
                  <Button 
                    type="submit" 
                    className="w-full bg-[#B56E4D] hover:bg-[#B56E4D]/80 text-white"
                    disabled={loading}
                  >
                    {loading ? 'Logging in...' : 'Login'}
                  </Button>
                </div>
              </form>
              
              <div className="text-sm text-center mt-4 space-y-1 text-gray-500">
                <p>Test Accounts:</p>
                <p>seller@seller.com / seller321</p>
                <p>seller22@gmail.com / seller1234</p>
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-2">
              <div className="text-sm text-center text-gray-500">
                Don't have a seller account?
              </div>
              <Link to="/seller-signup">
                <Button variant="outline" className="w-full">
                  Register as a Seller
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SellerLogin;
