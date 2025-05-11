
import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, Menu, Settings, User, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { logoutAdmin } from '@/utils/adminAuth';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface BreadcrumbItem {
  name: string;
  path: string;
}

interface AdminHeaderProps {
  toggleSidebar: () => void;
  breadcrumbs: BreadcrumbItem[];
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ toggleSidebar, breadcrumbs }) => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logoutAdmin();
    toast.success('Logged out successfully');
    navigate('/login');
  };
  
  return (
    <header className="bg-white shadow-sm h-16 flex items-center justify-between px-4 sticky top-0 z-10">
      <div className="flex items-center">
        <Button 
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="text-gray-500 mr-2 md:hidden"
        >
          <Menu />
        </Button>
        <Link to="/" className="flex items-center">
          <div className="ml-2 text-lg font-medium text-empower-brown hidden md:block">EmpowEra Admin Panel</div>
          <div className="ml-2 text-lg font-medium text-empower-brown md:hidden">Admin</div>
        </Link>
        
        {/* Breadcrumbs */}
        <div className="hidden md:flex items-center ml-6 text-sm">
          {breadcrumbs.map((item, index) => (
            <React.Fragment key={index}>
              {index > 0 && <ChevronRight className="mx-2 text-gray-400" size={14} />}
              <Link 
                to={item.path} 
                className={`hover:text-empower-terracotta ${index === breadcrumbs.length - 1 ? 'font-medium text-empower-terracotta' : 'text-gray-600'}`}
              >
                {item.name}
              </Link>
            </React.Fragment>
          ))}
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <Button variant="ghost" size="icon" className="text-gray-500 relative">
          <Bell size={20} />
          <span className="absolute top-1 right-1.5 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
        </Button>
        
        <Button variant="ghost" size="icon" className="text-gray-500 hidden md:flex">
          <Settings size={20} />
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="rounded-full h-10 w-10 p-0">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="Admin" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="flex flex-col">
              <span>Admin User</span>
              <span className="text-xs text-gray-500 font-normal">admin@admin.com</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/admin/settings" className="w-full cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-red-500 cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default AdminHeader;
