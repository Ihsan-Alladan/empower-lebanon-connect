
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
      className="bg-empower-terracotta hover:bg-empower-terracotta/90 text-white font-bold py-4 flex flex-col items-center justify-center gap-2 transition-all duration-300 hover:scale-105 w-full h-24"
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
        
        <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-empower-ivory to-white">
          <div className="max-w-md w-full space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h2 className="mt-6 text-3xl font-bold text-empower-brown">
                Sign Up
              </h2>
              <p className="mt-2 text-sm text-empower-brown/80">
                How would you like to join EmpowEra?
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mt-8 bg-white rounded-lg shadow-lg p-8"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <RoleButton
                  role="learner"
                  icon={<Book className="w-8 h-8" />}
                  label="Learner"
                  onClick={handleRoleSelection}
                />
                
                <RoleButton
                  role="customer"
                  icon={<ShoppingCart className="w-8 h-8" />}
                  label="Customer"
                  onClick={handleRoleSelection}
                />
                
                <RoleButton
                  role="seller"
                  icon={<Store className="w-8 h-8" />}
                  label="Seller"
                  onClick={handleRoleSelection}
                />
                
                <RoleButton
                  role="instructor"
                  icon={<BookOpen className="w-8 h-8" />}
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
