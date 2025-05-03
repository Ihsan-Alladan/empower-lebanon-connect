
import React from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { Book, ShoppingCart, Store, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";

type UserRole = "learner" | "customer" | "seller" | "instructor";

interface RoleButtonProps {
  role: UserRole;
  icon: React.ReactNode;
  label: string;
  onClick: (role: UserRole) => void;
}

const RoleButton: React.FC<RoleButtonProps> = ({ role, icon, label, onClick }) => {
  return (
    <Button
      variant="ghost"
      className="bg-empower-terracotta hover:bg-empower-terracotta/90 text-white font-bold py-4 flex flex-col items-center justify-center gap-2 transition-all duration-300 hover:scale-105 glow-on-hover w-full h-24"
      onClick={() => onClick(role)}
    >
      {icon}
      <span className="text-lg">{label}</span>
    </Button>
  );
};

const SignUp = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleRoleSelection = (role: UserRole) => {
    console.log(`Selected role: ${role}`);
    // In a real app, this would store the role and proceed to next step
    // For now, we'll just show a console message
    navigate(`/signup/${role}`);
  };

  return (
    <PageTransition route={location.pathname}>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <div className="flex-grow relative flex items-center justify-center py-12 px-4">
          {/* Background blur effect */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat filter blur-sm"
            style={{ 
              backgroundImage: "url('https://images.unsplash.com/photo-1497215842964-222b430dc094?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')",
              opacity: 0.6,
            }}
          ></div>
          
          {/* Overlay to darken the background slightly */}
          <div className="absolute inset-0 bg-empower-brown/20"></div>
          
          {/* Card containing sign up options */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 w-full max-w-2xl"
          >
            <Card className="bg-white shadow-xl rounded-xl overflow-hidden p-8">
              <div className="flex flex-col items-center justify-center mb-8">
                <h1 className="text-5xl md:text-6xl font-bold text-empower-terracotta mb-4 text-center">
                  Sign up
                </h1>
                <h2 className="text-2xl italic text-empower-brown text-center">
                  How do you like to join us?
                </h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-8">
                <RoleButton
                  role="learner"
                  icon={<Book className="w-9 h-9" />}
                  label="Learner"
                  onClick={handleRoleSelection}
                />
                
                <RoleButton
                  role="customer"
                  icon={<ShoppingCart className="w-9 h-9" />}
                  label="Customer"
                  onClick={handleRoleSelection}
                />
                
                <RoleButton
                  role="seller"
                  icon={<Store className="w-9 h-9" />}
                  label="Seller"
                  onClick={handleRoleSelection}
                />
                
                <RoleButton
                  role="instructor"
                  icon={<BookOpen className="w-9 h-9" />}
                  label="Instructor"
                  onClick={handleRoleSelection}
                />
              </div>
              
              <p className="text-center text-sm text-empower-brown/70 mt-8">
                Already have an account? <a href="/login" className="text-empower-terracotta font-medium hover:underline">Log in</a>
              </p>
            </Card>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default SignUp;
