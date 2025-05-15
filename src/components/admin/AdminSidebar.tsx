
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Users, 
  ShoppingBag, 
  FileText, 
  Mail, 
  BarChart, 
  Settings,
  Heart,
  Calendar
} from 'lucide-react';

interface AdminSidebarProps {
  collapsed: boolean;
  toggleCollapsed: () => void;
  isOpen: boolean;
  currentPath: string;
}

type AdminNavItem = {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

const adminNavItems: AdminNavItem[] = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
  },
  {
    title: 'Events',
    href: '/admin/events',
    icon: Calendar,
  },
  {
    title: 'Users',
    href: '/admin/users',
    icon: Users,
  },
  {
    title: 'Shop',
    href: '/admin/shop',
    icon: ShoppingBag,
  },
  {
    title: 'Content',
    href: '/admin/content',
    icon: FileText,
  },
  {
    title: 'Newsletter',
    href: '/admin/newsletter',
    icon: Mail,
  },
  {
    title: 'Donations',
    href: '/admin/donations',
    icon: Heart,
  },
  {
    title: 'Analytics',
    href: '/admin/analytics',
    icon: BarChart,
  },
  {
    title: 'Settings',
    href: '/admin/settings',
    icon: Settings,
  },
];

const AdminSidebar: React.FC<AdminSidebarProps> = ({ 
  collapsed, 
  toggleCollapsed, 
  isOpen,
  currentPath
}) => {
  // Only mobile sidebar should have a backdrop and close on item click
  const isMobile = !collapsed && isOpen;

  const handleItemClick = () => {
    if (isMobile) {
      toggleCollapsed();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={cn(
      "h-full bg-white border-r transition-all duration-300",
      collapsed ? "w-[70px]" : "w-[250px]"
    )}>
      <div className="h-16 border-b flex items-center justify-center">
        <h1 className={cn(
          "font-bold text-empower-terracotta transition-opacity",
          collapsed ? "opacity-0 w-0" : "opacity-100"
        )}>
          Admin Portal
        </h1>
        {collapsed && (
          <span className="text-empower-terracotta text-xl font-bold">A</span>
        )}
      </div>

      <nav className="p-2">
        <ul className="space-y-2">
          {adminNavItems.map((item) => (
            <li key={item.href}>
              <Link
                to={item.href}
                className={cn(
                  "flex items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors",
                  currentPath === item.href && "bg-gray-100 text-gray-900 font-medium",
                  collapsed ? "justify-center" : "justify-start"
                )}
                onClick={handleItemClick}
              >
                <item.icon className={cn(
                  "flex-shrink-0",
                  collapsed ? "w-5 h-5" : "w-5 h-5 mr-3"
                )} />
                {!collapsed && <span>{item.title}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default AdminSidebar;
