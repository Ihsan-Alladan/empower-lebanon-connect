
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
      className="bg-empower-terracotta hover:bg-empower-terracotta/90 text-white font-bold py-2 flex flex-col items-center justify-center gap-1 transition-all duration-300 hover:scale-105 w-full h-16"
      onClick={() => onClick(role)}
    >
      {icon}
      <span className="text-sm">{label}</span>
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
                  Sign Up
                </h2>
                <p className="mt-2 text-sm text-empower-brown/80">
                  How would you like to join EmpowEra?
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <RoleButton
                  role="learner"
                  icon={<Book className="w-5 h-5" />}
                  label="Learner"
                  onClick={handleRoleSelection}
                />
                
                <RoleButton
                  role="customer"
                  icon={<ShoppingCart className="w-5 h-5" />}
                  label="Customer"
                  onClick={handleRoleSelection}
                />
                
                <RoleButton
                  role="seller"
                  icon={<Store className="w-5 h-5" />}
                  label="Seller"
                  onClick={handleRoleSelection}
                />
                
                <RoleButton
                  role="instructor"
                  icon={<BookOpen className="w-5 h-5" />}
                  label="Instructor"
                  onClick={handleRoleSelection}
                />
              </div>
              
              <div className="text-center mt-6">
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
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default SignUp;
