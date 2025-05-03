
import React from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Eye, EyeOff, Lock, LogIn, User } from "lucide-react";
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
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import { Checkbox } from "@/components/ui/checkbox";
import PageTransition from "@/components/PageTransition";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  rememberMe: z.boolean().default(false),
});

const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Mock login - in a real app this would connect to your authentication system
    console.log(values);
    
    toast({
      title: "Login Successful",
      description: "Welcome back to EmpowEra!",
    });
    
    // Redirect to home page after successful login
    setTimeout(() => {
      navigate("/");
    }, 1000);
  }

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-empower-ivory to-white">
          <div className="max-w-md w-full space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h2 className="mt-6 text-3xl font-bold text-empower-brown">
                Welcome Back
              </h2>
              <p className="mt-2 text-sm text-empower-brown/80">
                Sign in to your account to continue your journey with EmpowEra
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mt-8 bg-white rounded-lg shadow-lg p-8"
            >
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
