
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Users,
  BookOpen,
  Package,
  Calendar,
  PieChart,
  Mail,
  Settings,
  LogOut,
  ChevronRight,
  Home
} from 'lucide-react';

import { Button } from "@/components/ui/button";
import { logoutAdmin } from '@/utils/adminAuth';
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

interface AdminSidebarProps {
  collapsed: boolean;
  toggleCollapsed: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ collapsed, toggleCollapsed }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logoutAdmin();
    navigate('/login');
  };
  
  const menuItems = [
    { icon: <Home size={20} />, text: 'Dashboard', to: '/admin' },
    { icon: <Users size={20} />, text: 'User Management', to: '/admin/users' },
    { icon: <BookOpen size={20} />, text: 'Educational Content', to: '/admin/content' },
    { icon: <Package size={20} />, text: 'Shop', to: '/admin/shop' },
    { icon: <Calendar size={20} />, text: 'Events', to: '/admin/events' },
    { icon: <PieChart size={20} />, text: 'Analytics', to: '/admin/analytics' },
    { icon: <Mail size={20} />, text: 'Newsletter', to: '/admin/newsletter' },
    { icon: <Settings size={20} />, text: 'Settings', to: '/admin/settings' },
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
          {!collapsed && "Admin Panel"}
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

export default AdminSidebar;
