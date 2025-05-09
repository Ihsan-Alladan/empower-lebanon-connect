
import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, Menu, Settings, User } from 'lucide-react';
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
import { logoutAdmin } from '@/utils/adminAuth';
import { toast } from '@/components/ui/sonner';
import { useNavigate } from 'react-router-dom';

interface AdminHeaderProps {
  toggleSidebar: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logoutAdmin();
    toast.success('Logged out successfully');
    navigate('/login');
  };
  
  return (
    <header className="bg-white shadow-sm h-16 flex items-center justify-between px-4">
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
          <div className="ml-2 text-lg font-medium text-empower-brown">EmpowEra Admin</div>
        </Link>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" className="text-gray-500">
          <Bell size={20} />
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full bg-gray-100">
              <User size={20} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Admin</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/admin/settings" className="w-full cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
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

export default AdminHeader;
