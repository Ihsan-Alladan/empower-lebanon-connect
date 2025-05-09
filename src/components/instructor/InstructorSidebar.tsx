
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Calendar,
  ChevronRight,
  Home,
  LogOut,
  MessageSquare,
  Settings,
  Users
} from 'lucide-react';

import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  to: string;
  active: boolean;
  collapsed: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, text, to, active, collapsed }) => {
  return (
    <Link to={to} className="w-full">
      <motion.div 
        className={`flex items-center p-3 rounded-md mb-1 transition-colors group ${active 
          ? 'bg-empower-terracotta text-white' 
          : 'text-gray-600 hover:bg-empower-terracotta/10'}`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="text-inherit">{icon}</div>
        {!collapsed && (
          <span className={`ml-3 font-medium text-sm ${active ? 'text-white' : 'text-gray-600 group-hover:text-empower-terracotta'}`}>
            {text}
          </span>
        )}
        {active && !collapsed && (
          <ChevronRight className="ml-auto text-white" size={16} />
        )}
      </motion.div>
    </Link>
  );
};

interface InstructorSidebarProps {
  collapsed: boolean;
  toggleCollapsed: () => void;
}

const InstructorSidebar: React.FC<InstructorSidebarProps> = ({ collapsed, toggleCollapsed }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  const menuItems = [
    { icon: <Home size={20} />, text: 'Dashboard', to: '/instructor-dashboard' },
    { icon: <BookOpen size={20} />, text: 'My Courses', to: '/instructor-dashboard/courses' },
    { icon: <Users size={20} />, text: 'Students', to: '/instructor-dashboard/students' },
    { icon: <Calendar size={20} />, text: 'Schedule', to: '/instructor-dashboard/schedule' },
    { icon: <MessageSquare size={20} />, text: 'Messages', to: '/instructor-dashboard/messages' },
    { icon: <Settings size={20} />, text: 'Settings', to: '/instructor-dashboard/settings' },
  ];

  return (
    <motion.div 
      className={`h-screen bg-white shadow-md transition-all duration-300 flex flex-col ${collapsed ? 'w-16' : 'w-64'}`}
      initial={{ width: collapsed ? 64 : 256 }}
      animate={{ width: collapsed ? 64 : 256 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-center h-16 border-b">
        <motion.div 
          className="font-bold text-empower-brown"
          animate={{ opacity: collapsed ? 0 : 1 }}
          transition={{ duration: 0.2 }}
        >
          {!collapsed && "Instructor Panel"}
        </motion.div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2">
        {menuItems.map((item, index) => (
          <SidebarItem
            key={index}
            icon={item.icon}
            text={item.text}
            to={item.to}
            active={location.pathname === item.to}
            collapsed={collapsed}
          />
        ))}
      </div>
      
      <div className="p-2 border-t">
        <Button 
          onClick={handleLogout}
          variant="ghost" 
          className="w-full flex items-center p-3 text-gray-600 hover:bg-red-50 hover:text-red-600"
        >
          <LogOut size={20} />
          {!collapsed && <span className="ml-3 font-medium text-sm">Logout</span>}
        </Button>
      </div>
    </motion.div>
  );
};

export default InstructorSidebar;
