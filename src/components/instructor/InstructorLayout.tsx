
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import InstructorSidebar from './InstructorSidebar';
import InstructorHeader from './InstructorHeader';
import InstructorFooter from './InstructorFooter';
import { useAuth } from '@/contexts/AuthContext';

interface InstructorLayoutProps {
  children: React.ReactNode;
}

const InstructorLayout: React.FC<InstructorLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const { user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is authenticated and is an instructor
    if (!user || user.role !== 'instructor') {
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
  }, [navigate, user]);
  
  const toggleSidebar = () => {
    if (isMobile) {
      setSidebarOpen(!sidebarOpen);
    } else {
      setCollapsed(!collapsed);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Header */}
      <InstructorHeader toggleSidebar={toggleSidebar} />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <motion.div
          className={`${isMobile ? 'fixed' : ''} z-20 h-[calc(100vh-64px)]`}
          initial={{ x: isMobile && !sidebarOpen ? -320 : 0 }}
          animate={{ x: isMobile && !sidebarOpen ? -320 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {sidebarOpen && (
            <InstructorSidebar 
              collapsed={collapsed} 
              toggleCollapsed={toggleSidebar} 
            />
          )}
        </motion.div>
        
        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Page content */}
          <main className="flex-1 overflow-auto p-4 md:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="min-h-[calc(100vh-200px)]"
            >
              {children}
            </motion.div>
          </main>
          
          {/* Footer */}
          <InstructorFooter />
        </div>
      </div>
    </div>
  );
};

export default InstructorLayout;
