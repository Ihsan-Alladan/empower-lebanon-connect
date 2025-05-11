
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Book, 
  Plus, 
  ListTodo, 
  Users, 
  Activity, 
  MessageSquare, 
  Settings,
  LogOut,
  Calendar
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/sonner';

interface InstructorSidebarProps {
  collapsed: boolean;
  toggleCollapsed: () => void;
}

const InstructorSidebar: React.FC<InstructorSidebarProps> = ({ collapsed }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };
  
  return (
    <aside
      className={cn(
        'h-full bg-white border-r transition-all duration-300 flex flex-col',
        collapsed ? 'w-[70px]' : 'w-[240px]'
      )}
    >
      {/* Logo */}
      <div className="py-4 px-4 border-b flex justify-center">
        <img 
          src="/lovable-uploads/57514e04-8524-41e5-8cbd-c63693884459.png" 
          alt="EmpowEra" 
          className={cn(
            'transition-all duration-300',
            collapsed ? 'h-8' : 'h-10'
          )}
        />
      </div>

      {/* Nav Links */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {[
            { to: '/instructor-dashboard', icon: <Activity size={20} />, label: 'Dashboard' },
            { to: '/instructor-dashboard/courses', icon: <Book size={20} />, label: 'My Courses' },
            { to: '/instructor-dashboard/add-course', icon: <Plus size={20} />, label: 'Add New Course' },
            { to: '/instructor-dashboard/assignments', icon: <ListTodo size={20} />, label: 'Assignments' },
            { to: '/instructor-dashboard/classroom', icon: <Users size={20} />, label: 'Classroom Management' },
            { to: '/instructor-dashboard/progress', icon: <Activity size={20} />, label: 'Student Progress' },
            { to: '/instructor-dashboard/messages', icon: <MessageSquare size={20} />, label: 'Feedback' },
            { to: '/instructor-dashboard/schedule', icon: <Calendar size={20} />, label: 'Schedule' },
            { to: '/instructor-dashboard/settings', icon: <Settings size={20} />, label: 'Settings' }
          ].map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.to}
                className={({ isActive }) => cn(
                  'flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-slate-100 text-empower-terracotta'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-empower-terracotta',
                  collapsed && 'justify-center px-0'
                )}
              >
                <span className={collapsed ? '' : 'mr-3'}>{item.icon}</span>
                {!collapsed && <span>{item.label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      {/* Logout Button */}
      <div className="mt-auto p-4 border-t">
        <Button 
          variant="ghost" 
          className={cn(
            'w-full flex items-center text-red-500 hover:bg-red-50 hover:text-red-600',
            collapsed && 'justify-center px-0'
          )}
          onClick={handleLogout}
        >
          <LogOut size={20} className={collapsed ? '' : 'mr-2'} />
          {!collapsed && 'Logout'}
        </Button>
      </div>
    </aside>
  );
};

export default InstructorSidebar;
