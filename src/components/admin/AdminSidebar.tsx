
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
  Home,
  Palette,
  Heart,
  Layout
} from 'lucide-react';

import { Button } from "@/components/ui/button";
import { logoutAdmin } from '@/utils/adminAuth';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

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
        className={`flex items-center p-3 rounded-md mb-1 transition-all group ${active 
          ? 'bg-empower-terracotta text-white shadow-lg shadow-empower-terracotta/20' 
          : 'text-gray-600 hover:bg-empower-terracotta/10'}`}
        whileHover={{ scale: 1.02, boxShadow: active ? '' : '0 4px 12px rgba(0, 0, 0, 0.05)' }}
        whileTap={{ scale: 0.98 }}
      >
        <div className={cn("text-inherit transition-all", 
          active ? "text-white" : "text-gray-500 group-hover:text-empower-terracotta"
        )}>
          {icon}
        </div>
        {!collapsed && (
          <span className={cn("ml-3 font-medium text-sm transition-colors", 
            active ? "text-white" : "text-gray-600 group-hover:text-empower-terracotta"
          )}>
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
  isOpen: boolean;
  currentPath: string;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ 
  collapsed, 
  toggleCollapsed, 
  isOpen,
  currentPath
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logoutAdmin();
    navigate('/login');
  };
  
  if (!isOpen) return null;
  
  const menuItems = [
    { icon: <Home size={20} />, text: 'Dashboard', to: '/admin' },
    { icon: <Users size={20} />, text: 'Manage Users', to: '/admin/users' },
    { icon: <BookOpen size={20} />, text: 'Manage Courses', to: '/admin/content' },
    { icon: <Calendar size={20} />, text: 'Manage Events', to: '/admin/events' },
    { icon: <Heart size={20} />, text: 'Manage Donations', to: '/admin/donations' },
    { icon: <Package size={20} />, text: 'Manage Sellers & Products', to: '/admin/shop' },
    { icon: <Palette size={20} />, text: 'Home Design', to: '/admin/home-design' },
    { icon: <Mail size={20} />, text: 'Newsletter Control', to: '/admin/newsletter' },
    { icon: <Layout size={20} />, text: 'Analytics', to: '/admin/analytics' },
    { icon: <Settings size={20} />, text: 'Settings', to: '/admin/settings' },
  ];

  return (
    <motion.div 
      className={`h-screen bg-white shadow-md transition-all duration-300 flex flex-col ${collapsed ? 'w-16' : 'w-64'}`}
      initial={{ width: collapsed ? 64 : 256, x: isOpen ? 0 : -256 }}
      animate={{ width: collapsed ? 64 : 256, x: isOpen ? 0 : -256 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between h-16 border-b px-4">
        <motion.div 
          className="font-bold text-empower-brown truncate"
          animate={{ opacity: collapsed ? 0 : 1 }}
          transition={{ duration: 0.2 }}
        >
          {!collapsed && "EmpowEra Admin"}
        </motion.div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleCollapsed}
          className="text-gray-500"
        >
          <ChevronRight className={`transform transition-transform ${collapsed ? 'rotate-180' : ''}`} />
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2">
        {menuItems.map((item, index) => (
          <SidebarItem
            key={index}
            icon={item.icon}
            text={item.text}
            to={item.to}
            active={currentPath === item.to || currentPath.startsWith(`${item.to}/`)}
            collapsed={collapsed}
          />
        ))}
      </div>
      
      <div className="p-2 border-t">
        <Button 
          onClick={handleLogout}
          variant="ghost" 
          className="w-full flex items-center p-3 text-gray-600 hover:bg-red-50 hover:text-red-600 group"
        >
          <LogOut size={20} className="text-gray-500 group-hover:text-red-600" />
          {!collapsed && <span className="ml-3 font-medium text-sm">Logout</span>}
        </Button>
      </div>
    </motion.div>
  );
};

export default AdminSidebar;
