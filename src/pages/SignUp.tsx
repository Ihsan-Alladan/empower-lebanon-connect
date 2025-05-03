
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
      className="bg-empower-terracotta hover:bg-empower-terracotta/90 text-white font-bold py-2 flex flex-col items-center justify-center gap-2 transition-all duration-300 hover:scale-105 w-full h-20"
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
      <div className="min-h-screen flex flex-col bg-gradient-to-r from-empower-ivory to-empower-gold/20">
        <Navbar />
        
        <div className="flex-grow flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-sm w-full space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h2 className="mt-2 text-3xl font-bold text-empower-brown text-center">
                Sign Up
              </h2>
              <p className="mt-2 text-sm text-empower-brown/80 text-center">
                How would you like to join?
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6"
            >
              <div className="grid grid-cols-2 gap-3">
                <RoleButton
                  role="learner"
                  icon={<Book className="w-6 h-6" />}
                  label="Learner"
                  onClick={handleRoleSelection}
                />
                
                <RoleButton
                  role="customer"
                  icon={<ShoppingCart className="w-6 h-6" />}
                  label="Customer"
                  onClick={handleRoleSelection}
                />
                
                <RoleButton
                  role="seller"
                  icon={<Store className="w-6 h-6" />}
                  label="Seller"
                  onClick={handleRoleSelection}
                />
                
                <RoleButton
                  role="instructor"
                  icon={<BookOpen className="w-6 h-6" />}
                  label="Instructor"
                  onClick={handleRoleSelection}
                />
              </div>
              
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
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default SignUp;
