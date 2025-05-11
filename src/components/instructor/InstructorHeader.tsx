
import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, Mail, Menu, Settings, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from '@/components/ui/sonner';
import { useNavigate } from 'react-router-dom';

interface InstructorHeaderProps {
  toggleSidebar: () => void;
}

const InstructorHeader: React.FC<InstructorHeaderProps> = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };
  
  return (
    <header className="bg-white shadow-sm h-16 flex items-center justify-between px-4 z-30">
      <div className="flex items-center">
        <Button 
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="text-gray-500 mr-2"
        >
          <Menu />
        </Button>
        <Link to="/" className="flex items-center">
          <img 
            src="/lovable-uploads/57514e04-8524-41e5-8cbd-c63693884459.png" 
            alt="EmpowEra" 
            className="h-8 mr-2"
          />
          <div className="text-lg font-medium text-empower-brown">EmpowEra Instructor</div>
        </Link>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" className="text-gray-500 relative">
          <Bell size={20} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </Button>
        
        <Button variant="ghost" size="icon" className="text-gray-500">
          <Mail size={20} />
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="rounded-full h-8 w-8 overflow-hidden">
              {user?.avatar ? (
                <img src={user.avatar} alt={user?.name || 'User'} className="h-full w-full object-cover" />
              ) : (
                <User size={20} className="text-gray-600" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>{user?.name || 'Instructor'}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/instructor-dashboard/settings" className="w-full cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/profile" className="w-full cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-red-500 cursor-pointer">
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default InstructorHeader;
