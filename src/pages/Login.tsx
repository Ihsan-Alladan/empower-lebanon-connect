
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Eye, EyeOff, Lock, LogIn, User, Store } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";
import { Checkbox } from "@/components/ui/checkbox";
import PageTransition from "@/components/PageTransition";
import { useAuth } from "@/contexts/AuthContext";
import { isAdminUser, setAdminAuthenticated } from "@/utils/adminAuth";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  rememberMe: z.boolean().default(false),
});

const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Login attempt with:", values);
    
    // Check if this is an admin login
    if (isAdminUser(values.email, values.password)) {
      toast({
        title: "Admin Login Successful",
        description: "Welcome to the admin dashboard!",
      });
      
      // Set admin as authenticated
      setAdminAuthenticated(true);
      
      // Redirect to admin dashboard after successful login
      setTimeout(() => {
        navigate("/admin");
      }, 1000);
      
      return;
    }
    
    // Regular or seller login
    const user = await login(values.email, values.password);
    
    if (user) {
      toast({
        title: "Login Successful",
        description: `Welcome back, ${user.name}!`,
      });
      
      // Redirect based on user role
      if (user.role === "seller") {
        navigate("/seller-dashboard");
      } else {
        navigate("/");
      }
    } else {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "Invalid email or password. Please try again."
      });
    }
  }

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  
  // Demo credentials
  const loginAsDemo = (type: "customer" | "seller" | "admin") => {
    let email = "";
    let password = "";
    
    if (type === "seller") {
      email = "seller@seller.com";
      password = "seller321";
    } else if (type === "admin") {
      email = "admin@admin.com";
      password = "admin321";
    } else {
      // Demo customer credentials would go here
      return;
    }
    
    form.setValue("email", email);
    form.setValue("password", password);
  };

  return (
    <PageTransition route={location.pathname}>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <div 
          className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          {/* Overlay with blur effect */}
          <div className="absolute inset-0 backdrop-blur-md bg-black/30" />
          
          <div className="max-w-md w-full space-y-8 relative z-10">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-white rounded-lg shadow-2xl p-8"
            >
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-empower-brown">
                  Welcome Back
                </h2>
                <p className="mt-2 text-sm text-empower-brown/80">
                  Sign in to your account to continue your journey with EmpowEra
                </p>
              </div>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-empower-brown">Email</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input 
                              placeholder="your@email.com" 
                              {...field} 
                              className="pl-10" 
                            />
                            <User className="absolute left-3 top-3 h-4 w-4 text-empower-brown/60" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-empower-brown">Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input 
                              type={showPassword ? "text" : "password"} 
                              placeholder="••••••••" 
                              {...field} 
                              className="pl-10" 
                            />
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-empower-brown/60" />
                            <button 
                              type="button"
                              onClick={togglePasswordVisibility}
                              className="absolute right-3 top-3"
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4 text-empower-brown/60" />
                              ) : (
                                <Eye className="h-4 w-4 text-empower-brown/60" />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex items-center justify-between">
                    <FormField
                      control={form.control}
                      name="rememberMe"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                          <FormControl>
                            <Checkbox 
                              checked={field.value} 
                              onCheckedChange={field.onChange} 
                              className="text-empower-terracotta" 
                            />
                          </FormControl>
                          <FormLabel className="text-sm cursor-pointer text-empower-brown/80">
                            Remember me
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                    
                    <a 
                      href="#" 
                      className="text-sm font-medium text-empower-terracotta hover:text-empower-brown transition-colors"
                    >
                      Forgot password?
                    </a>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-empower-terracotta hover:bg-empower-terracotta/90 flex items-center justify-center gap-2"
                  >
                    <LogIn className="h-4 w-4" />
                    Sign in
                  </Button>
                  
                  {/* Quick login buttons */}
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex items-center gap-2"
                      onClick={() => loginAsDemo("seller")}
                    >
                      <Store className="h-4 w-4" />
                      <span className="text-xs">Login as Seller</span>
                    </Button>
                    
                    <Button
                      type="button"
                      variant="outline"
                      className="flex items-center gap-2"
                      onClick={() => loginAsDemo("admin")}
                    >
                      <User className="h-4 w-4" />
                      <span className="text-xs">Login as Admin</span>
                    </Button>
                  </div>
                  
                  {/* Test credentials info */}
                  <div className="text-xs text-center mt-4 text-gray-500 space-y-1">
                    <p>Seller: seller@seller.com / seller321</p>
                    <p>Admin: admin@admin.com / admin321</p>
                  </div>
                  
                  <div className="text-center mt-4">
                    <p className="text-sm text-empower-brown/80">
                      Don't have an account?{" "}
                      <a 
                        href="/signup" 
                        className="font-medium text-empower-terracotta hover:text-empower-brown transition-colors"
                      >
                        Sign up
                      </a>
                    </p>
                  </div>
                </form>
              </Form>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Login;
