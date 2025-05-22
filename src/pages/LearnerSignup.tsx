import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail, User, MapPin } from "lucide-react";
import { authService } from "@/services/authService"; // Add this import

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
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Sample country and city data - in a real app, this would come from an API
const countries = [
  { id: "us", name: "United States" },
  { id: "uk", name: "United Kingdom" },
  { id: "ca", name: "Canada" },
  { id: "au", name: "Australia" },
  { id: "lb", name: "Lebanon" },
];

const citiesByCountry: Record<string, {id: string, name: string}[]> = {
  us: [
    { id: "nyc", name: "New York" },
    { id: "la", name: "Los Angeles" },
    { id: "chi", name: "Chicago" },
    { id: "hou", name: "Houston" },
  ],
  uk: [
    { id: "lon", name: "London" },
    { id: "manc", name: "Manchester" },
    { id: "birm", name: "Birmingham" },
    { id: "edin", name: "Edinburgh" },
  ],
  ca: [
    { id: "tor", name: "Toronto" },
    { id: "vanc", name: "Vancouver" },
    { id: "mont", name: "Montreal" },
    { id: "calg", name: "Calgary" },
  ],
  au: [
    { id: "syd", name: "Sydney" },
    { id: "melb", name: "Melbourne" },
    { id: "bris", name: "Brisbane" },
    { id: "perth", name: "Perth" },
  ],
  lb: [
    { id: "beir", name: "Beirut" },
    { id: "trip", name: "Tripoli" },
    { id: "sidon", name: "Sidon" },
    { id: "tyre", name: "Tyre" },
  ],
};

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
  country: z.string({
    required_error: "Please select a country.",
  }),
  city: z.string({
    required_error: "Please select a city.",
  }),
  street: z.string().min(2, {
    message: "Street address is required."
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
  const [cities, setCities] = useState<{id: string, name: string}[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      country: "",
      city: "",
      street: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Update cities when country changes
  const watchCountry = form.watch("country");
  
  useEffect(() => {
    if (watchCountry) {
      const countryCities = citiesByCountry[watchCountry] || [];
      setCities(countryCities);
      form.setValue("city", ""); // Reset city when country changes
    }
  }, [watchCountry, form]);

  // Try to get user's location on component mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, we would use this position to determine country and city
          // through a reverse geocoding service like Google Maps API
          console.log("Location detected:", position.coords.latitude, position.coords.longitude);
          toast({
            title: "Location detected",
            description: "We've detected your location to improve address suggestions.",
          });
        },
        (error) => {
          console.log("Error getting location:", error);
        }
      );
    }
  }, [toast]);

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
    
    try {
      // Include the full phone number (with country code) and address information
      const submitData = {
        email: values.email,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
        role: 'learner' as const, // Changed to match updated UserRole type
        phone: fullPhoneNumber,
        address: `${values.street}, ${cities.find(c => c.id === values.city)?.name || ''}, ${countries.find(c => c.id === values.country)?.name || ''}`,
      };
      
      // Register user with the learner role using authService
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
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create account",
        variant: "destructive",
      });
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
              className="bg-white/90 rounded-lg shadow-2xl p-8"
            >
              <div className="text-center mb-6">
                <motion.h2 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="text-3xl font-bold text-empower-brown"
                >
                  Customer Sign Up
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="mt-2 text-sm text-empower-brown/80"
                >
                  Create your customer account to start shopping with EmpowEra
                </motion.p>
              </div>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                    >
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
                                  className="pl-10 rounded-2xl focus:ring-offset-empower-terracotta" 
                                />
                                <User className="absolute left-3 top-3 h-4 w-4 text-empower-brown/60" />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                    >
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
                                  className="pl-10 rounded-2xl focus:ring-offset-empower-terracotta" 
                                />
                                <User className="absolute left-3 top-3 h-4 w-4 text-empower-brown/60" />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                  >
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
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                  >
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
                                className="pl-10 rounded-2xl focus:ring-offset-empower-terracotta" 
                              />
                              <Mail className="absolute left-3 top-3 h-4 w-4 text-empower-brown/60" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.5 }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-empower-brown">Country</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="rounded-2xl">
                                  <SelectValue placeholder="Select country" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {countries.map(country => (
                                  <SelectItem key={country.id} value={country.id}>
                                    {country.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-empower-brown">City</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              disabled={!watchCountry}
                            >
                              <FormControl>
                                <SelectTrigger className="rounded-2xl">
                                  <SelectValue placeholder="Select city" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {cities.map(city => (
                                  <SelectItem key={city.id} value={city.id}>
                                    {city.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0, duration: 0.5 }}
                  >
                    <FormField
                      control={form.control}
                      name="street"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-empower-brown">Street Address</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input 
                                placeholder="Enter your street address" 
                                {...field} 
                                className="pl-10 rounded-2xl focus:ring-offset-empower-terracotta" 
                              />
                              <MapPin className="absolute left-3 top-3 h-4 w-4 text-empower-brown/60" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1, duration: 0.5 }}
                  >
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
                                className="pl-10 rounded-2xl focus:ring-offset-empower-terracotta" 
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
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.5 }}
                  >
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
                                className="pl-10 rounded-2xl focus:ring-offset-empower-terracotta" 
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
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.3, duration: 0.5 }}
                    className="pt-2"
                  >
                    <Button 
                      type="submit" 
                      className="w-full bg-empower-terracotta hover:bg-empower-terracotta/90 flex items-center justify-center gap-2 rounded-2xl py-6 transition-all duration-300 hover:scale-105"
                    >
                      Sign Up
                    </Button>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4, duration: 0.5 }}
                    className="text-center mt-4"
                  >
                    <p className="text-sm text-empower-brown/80">
                      Already have an account?{" "}
                      <a 
                        href="/login" 
                        className="font-medium text-empower-terracotta hover:text-empower-brown transition-colors"
                      >
                        Log in
                      </a>
                    </p>
                  </motion.div>
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
