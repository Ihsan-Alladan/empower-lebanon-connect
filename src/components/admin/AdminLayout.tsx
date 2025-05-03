
import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';

import AdminSidebar from './AdminSidebar';
import { getAdminAuthenticated } from '@/utils/adminAuth';
import { Button } from '@/components/ui/button';

const AdminLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if admin is authenticated, if not redirect to login
    if (!getAdminAuthenticated()) {
      navigate('/login');
    }
    
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setCollapsed(false);
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [navigate]);
  
  const toggleSidebar = () => {
    if (isMobile) {
      setSidebarOpen(!sidebarOpen);
    } else {
      setCollapsed(!collapsed);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <motion.div
        className={`${isMobile ? 'fixed' : ''} z-20`}
        initial={{ x: isMobile && !sidebarOpen ? -320 : 0 }}
        animate={{ x: isMobile && !sidebarOpen ? -320 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {sidebarOpen && (
          <AdminSidebar 
            collapsed={collapsed} 
            toggleCollapsed={toggleSidebar} 
          />
        )}
      </motion.div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white shadow-sm h-16 flex items-center px-4">
          <Button 
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="text-gray-500"
          >
            <Menu />
          </Button>
          <div className="ml-4 text-lg font-medium text-empower-brown">EmpowEra Admin</div>
        </header>
        
        {/* Page content */}
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
