
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { Book, ShoppingCart, Store, BookOpen } from "lucide-react";

import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

// Define the form schema
const signupSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string().min(6, { message: "Password must be at least 6 characters" }),
  role: z.enum(["learner", "customer", "seller", "instructor"]),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type SignUpFormValues = z.infer<typeof signupSchema>;

const SignUp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "learner",
    },
  });

  const onSubmit = async (values: SignUpFormValues) => {
    try {
      setIsSubmitting(true);
      
      // Just log the values to the console and show a success message
      console.log("Form submitted with values:", values);
      
      toast.success("Account created successfully!");
      
      // After successful submission, reset the form and show success message
      form.reset();
      
      // Redirect to login page
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      console.error("Error during signup:", error);
      toast.error("Failed to create account. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

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
              <CardHeader className="space-y-1 text-center mb-4">
                <CardTitle className="text-3xl font-bold text-empower-brown">Sign Up</CardTitle>
                <CardDescription className="text-empower-brown/80">
                  Create your EmpowEra account
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input placeholder="First name" {...field} />
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
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Last name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input 
                              type="email" 
                              placeholder="name@example.com" 
                              {...field} 
                            />
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
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input 
                                type={showPassword ? "text" : "password"}
                                placeholder="Create a password" 
                                {...field} 
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3 py-2"
                                onClick={togglePasswordVisibility}
                              >
                                {showPassword ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </Button>
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
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input 
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm your password" 
                                {...field} 
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3 py-2"
                                onClick={toggleConfirmPasswordVisibility}
                              >
                                {showConfirmPassword ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Account Type</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="grid grid-cols-2 gap-4"
                            >
                              <FormItem className="flex flex-col items-center space-y-2 rounded-md border border-muted p-4">
                                <FormControl>
                                  <RadioGroupItem value="learner" id="learner" className="sr-only" />
                                </FormControl>
                                <Book className="h-6 w-6 text-empower-terracotta" />
                                <FormLabel className="cursor-pointer" htmlFor="learner">Learner</FormLabel>
                              </FormItem>
                              
                              <FormItem className="flex flex-col items-center space-y-2 rounded-md border border-muted p-4">
                                <FormControl>
                                  <RadioGroupItem value="instructor" id="instructor" className="sr-only" />
                                </FormControl>
                                <BookOpen className="h-6 w-6 text-empower-terracotta" />
                                <FormLabel className="cursor-pointer" htmlFor="instructor">Instructor</FormLabel>
                              </FormItem>
                              
                              <FormItem className="flex flex-col items-center space-y-2 rounded-md border border-muted p-4">
                                <FormControl>
                                  <RadioGroupItem value="customer" id="customer" className="sr-only" />
                                </FormControl>
                                <ShoppingCart className="h-6 w-6 text-empower-terracotta" />
                                <FormLabel className="cursor-pointer" htmlFor="customer">Customer</FormLabel>
                              </FormItem>
                              
                              <FormItem className="flex flex-col items-center space-y-2 rounded-md border border-muted p-4">
                                <FormControl>
                                  <RadioGroupItem value="seller" id="seller" className="sr-only" />
                                </FormControl>
                                <Store className="h-6 w-6 text-empower-terracotta" />
                                <FormLabel className="cursor-pointer" htmlFor="seller">Seller</FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button
                      type="submit"
                      className="w-full bg-empower-terracotta hover:bg-empower-terracotta/90"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Creating Account..." : "Sign Up"}
                    </Button>
                    
                    <div className="text-center text-sm">
                      Already have an account?{" "}
                      <Link 
                        to="/login" 
                        className="font-medium text-empower-terracotta hover:text-empower-brown transition-colors"
                      >
                        Log In
                      </Link>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default SignUp;
