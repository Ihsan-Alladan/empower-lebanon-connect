
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
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
import PageTransition from "@/components/PageTransition";
import { PhoneInput } from "@/components/ui/phone-input";
import { authService } from "@/services/authService";

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  phone: z.string().min(1, {
    message: "Phone number is required.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  confirmPassword: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

const LearnerSignup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [phoneValid, setPhoneValid] = useState(false);
  const [fullPhoneNumber, setFullPhoneNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Only submit if phone is valid
    if (!phoneValid) {
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid phone number",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Include the full phone number (with country code)
      const submitData = {
        email: values.email,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
        role: 'learner' as const,
        phone: fullPhoneNumber,
      };
      
      // Register user with the learner role
      const result = await authService.signUpUser(submitData);
      
      if (result) {
        toast({
          title: "Account Created Successfully",
          description: "Welcome to EmpowEra! You can now log in.",
        });
        
        // Redirect to login page after successful signup
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        toast({
          title: "Signup Failed",
          description: "There was an error creating your account. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create account",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);
  
  const handlePhoneChange = (value: string, isValid: boolean, fullNumber: string) => {
    form.setValue("phone", value);
    setPhoneValid(isValid);
    setFullPhoneNumber(fullNumber);
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
                  Learner Sign Up
                </h2>
                <p className="mt-2 text-sm text-empower-brown/80">
                  Create your account to start learning with EmpowEra
                </p>
              </div>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-empower-brown">First Name</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input 
                                placeholder="Enter your first name" 
                                {...field} 
                                className="pl-10 rounded-xl" 
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
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-empower-brown">Last Name</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input 
                                placeholder="Enter your last name" 
                                {...field} 
                                className="pl-10 rounded-xl" 
                              />
                              <User className="absolute left-3 top-3 h-4 w-4 text-empower-brown/60" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-empower-brown">Phone</FormLabel>
                        <FormControl>
                          <PhoneInput 
                            value={field.value}
                            onChange={handlePhoneChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-empower-brown">Email</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input 
                              placeholder="Enter your email" 
                              type="email"
                              {...field} 
                              className="pl-10 rounded-xl" 
                            />
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-empower-brown/60" />
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
                              placeholder="Enter your password" 
                              {...field} 
                              className="pl-10 rounded-xl" 
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
                  
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-empower-brown">Confirm Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input 
                              type={showConfirmPassword ? "text" : "password"} 
                              placeholder="Confirm your password" 
                              {...field} 
                              className="pl-10 rounded-xl" 
                            />
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-empower-brown/60" />
                            <button 
                              type="button"
                              onClick={toggleConfirmPasswordVisibility}
                              className="absolute right-3 top-3"
                            >
                              {showConfirmPassword ? (
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
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-empower-terracotta hover:bg-empower-terracotta/90 flex items-center justify-center gap-2 mt-6 rounded-xl py-6"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Creating Account..." : "Create Account"}
                  </Button>
                  
                  <div className="text-center mt-4">
                    <p className="text-sm text-empower-brown/80">
                      Already have an account?{" "}
                      <a 
                        href="/login" 
                        className="font-medium text-empower-terracotta hover:text-empower-brown transition-colors"
                      >
                        Log in
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

export default LearnerSignup;
