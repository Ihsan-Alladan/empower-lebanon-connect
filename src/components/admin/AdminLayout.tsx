
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

import AdminHeader from './AdminHeader';
import AdminFooter from './AdminFooter';
import AdminSidebar from './AdminSidebar';
import { getAdminAuthenticated } from '@/utils/adminAuth';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    // Check if admin is authenticated, if not redirect to login
    if (!getAdminAuthenticated()) {
      toast.error('Please login as admin to access this page');
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

  // Generate breadcrumbs based on current path
  const generateBreadcrumbs = () => {
    if (location.pathname === '/admin') return [{ name: 'Dashboard', path: '/admin' }];
    
    const paths = location.pathname.split('/').filter(Boolean);
    let currentPath = '';
    
    return paths.map((path, i) => {
      currentPath += `/${path}`;
      return {
        name: path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' '),
        path: currentPath
      };
    });
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Header - fixed at top */}
      <div className="sticky top-0 z-30">
        <AdminHeader 
          toggleSidebar={toggleSidebar} 
          breadcrumbs={breadcrumbs}
        />
      </div>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - fixed to left */}
        <div className={`${isMobile ? 'fixed' : 'sticky'} top-16 z-30 h-[calc(100vh-4rem)]`}>
          <AdminSidebar 
            collapsed={collapsed} 
            toggleCollapsed={toggleSidebar} 
            isOpen={sidebarOpen}
            currentPath={location.pathname}
          />
        </div>
        
        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Page content */}
          <main className="flex-1 overflow-auto p-4 md:p-6 pt-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="min-h-[calc(100vh-200px)]"
            >
              {children}
            </motion.div>
          </main>
          
          {/* Footer - fixed at bottom */}
          <div className="sticky bottom-0 z-20 bg-white border-t">
            <AdminFooter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
