
import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  ClipboardList, 
  Activity, 
  MessageSquare, 
  Calendar, 
  Settings, 
  LogOut, 
  Home,
  Users
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarInset,
  SidebarFooter
} from '@/components/ui/sidebar';

const InstructorLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { 
      path: '/instructor-dashboard', 
      name: 'My Courses', 
      icon: BookOpen 
    },
    { 
      path: '/instructor-dashboard/classrooms', 
      name: 'Manage Classrooms', 
      icon: Users 
    },
    { 
      path: '/instructor-dashboard/assignments', 
      name: 'Assignments', 
      icon: ClipboardList 
    },
    { 
      path: '/instructor-dashboard/progress', 
      name: 'Student Progress', 
      icon: Activity 
    },
    { 
      path: '/instructor-dashboard/feedback', 
      name: 'Feedback', 
      icon: MessageSquare 
    },
    { 
      path: '/instructor-dashboard/schedule', 
      name: 'Schedule', 
      icon: Calendar 
    },
    { 
      path: '/instructor-dashboard/settings', 
      name: 'Account Settings', 
      icon: Settings 
    },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <Sidebar variant="floating" className="border-r border-gray-200">
          <SidebarHeader className="p-4">
            <Link to="/" className="flex items-center space-x-2">
              <img
                src="/lovable-uploads/22a31812-0de9-4dde-9442-b766171923c5.png"
                alt="EmpowEra"
                className="h-8 w-auto"
              />
              <span className="text-lg font-bold text-empower-brown">Instructor</span>
            </Link>
          </SidebarHeader>

          <SidebarContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.path}
                    tooltip={item.name}
                  >
                    <Link to={item.path} className="flex items-center">
                      <item.icon className="h-5 w-5 mr-2" />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter className="p-4 mt-auto border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="flex items-center space-x-2 text-empower-brown hover:text-empower-terracotta transition-colors">
                <Home className="h-5 w-5" />
                <span>Back to Home</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-red-500 hover:text-red-700 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="w-full">
          <div className="p-6 h-full">
            <div className="flex items-center justify-between mb-8">
              <SidebarTrigger className="lg:hidden" />
              <div className="ml-auto flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  {user?.avatar && (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <p className="font-medium text-gray-900">{user?.name}</p>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                  </div>
                </div>
              </div>
            </div>
            <Outlet />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default InstructorLayout;
