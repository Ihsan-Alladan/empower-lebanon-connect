
import React, { useState, useEffect } from 'react';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Package,
  ShoppingCart,
  Users,
  BarChart2,
  Settings,
  Store,
  Edit,
  Trash2,
  Plus,
  Filter,
  Star,
  CreditCard,
  MessageCircle,
  Eye,
  LogOut,
  Home
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { products } from '@/data/products';
import { toast } from '@/components/ui/sonner';
import { Progress } from '@/components/ui/progress';
import DashboardProducts from '@/components/seller/DashboardProducts';
import DashboardOrders from '@/components/seller/DashboardOrders';
import DashboardCustomers from '@/components/seller/DashboardCustomers';
import DashboardFinance from '@/components/seller/DashboardFinance';
import DashboardFeedback from '@/components/seller/DashboardFeedback';
import DashboardSettings from '@/components/seller/DashboardSettings';

const SellerDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('products');
  
  // Check if user is authenticated as seller
  useEffect(() => {
    const currentUser = localStorage.getItem('user');
    if (!currentUser) {
      navigate('/seller-login');
      return;
    }
    
    const parsedUser = JSON.parse(currentUser);
    if (parsedUser.role !== 'seller') {
      navigate('/');
    }
  }, [navigate]);
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  const stats = [
    { title: 'Total Products', value: products.length, icon: Package, color: 'bg-blue-100 text-blue-600' },
    { title: 'Orders', value: 24, icon: ShoppingCart, color: 'bg-purple-100 text-purple-600' },
    { title: 'Customers', value: 18, icon: Users, color: 'bg-amber-100 text-amber-600' },
    { title: 'Revenue', value: '$2,450', icon: BarChart2, color: 'bg-green-100 text-green-600' },
  ];
  
  return (
    <div className="min-h-screen flex flex-col bg-empower-ivory">
      <Navbar />
      
      <div className="flex-1 flex">
        {/* Sidebar */}
        <div className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200 animate-fade-in">
          <div className="p-6 border-b">
            <div className="flex items-center">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full mr-3" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-[#B56E4D] flex items-center justify-center mr-3">
                  <span className="text-white font-semibold">{user?.name?.charAt(0) || 'S'}</span>
                </div>
              )}
              <div>
                <h3 className="font-medium text-gray-800">{user?.name || 'Seller'}</h3>
                <p className="text-xs text-gray-500">{user?.email || 'seller@example.com'}</p>
              </div>
            </div>
          </div>
          
          <nav className="flex-1 px-4 py-6 space-y-1">
            <NavLink 
              to="/seller-dashboard" 
              end
              className={({ isActive }) => 
                `flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                  isActive 
                    ? 'bg-[#B56E4D]/10 text-[#B56E4D]' 
                    : 'text-gray-600 hover:bg-[#B56E4D]/5 hover:text-[#B56E4D]'
                }`
              }
            >
              <Package size={18} className="mr-3" />
              Products
            </NavLink>
            
            <NavLink 
              to="/seller-dashboard/orders" 
              className={({ isActive }) => 
                `flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                  isActive 
                    ? 'bg-[#B56E4D]/10 text-[#B56E4D]' 
                    : 'text-gray-600 hover:bg-[#B56E4D]/5 hover:text-[#B56E4D]'
                }`
              }
            >
              <ShoppingCart size={18} className="mr-3" />
              Orders
            </NavLink>
            
            <NavLink 
              to="/seller-dashboard/customers" 
              className={({ isActive }) => 
                `flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                  isActive 
                    ? 'bg-[#B56E4D]/10 text-[#B56E4D]' 
                    : 'text-gray-600 hover:bg-[#B56E4D]/5 hover:text-[#B56E4D]'
                }`
              }
            >
              <Users size={18} className="mr-3" />
              Customers
            </NavLink>
            
            <NavLink 
              to="/seller-dashboard/finance" 
              className={({ isActive }) => 
                `flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                  isActive 
                    ? 'bg-[#B56E4D]/10 text-[#B56E4D]' 
                    : 'text-gray-600 hover:bg-[#B56E4D]/5 hover:text-[#B56E4D]'
                }`
              }
            >
              <CreditCard size={18} className="mr-3" />
              Finance
            </NavLink>
            
            <NavLink 
              to="/seller-dashboard/feedback" 
              className={({ isActive }) => 
                `flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                  isActive 
                    ? 'bg-[#B56E4D]/10 text-[#B56E4D]' 
                    : 'text-gray-600 hover:bg-[#B56E4D]/5 hover:text-[#B56E4D]'
                }`
              }
            >
              <Star size={18} className="mr-3" />
              Feedback
            </NavLink>
            
            <Separator className="my-4" />
            
            <NavLink 
              to="/seller-dashboard/settings" 
              className={({ isActive }) => 
                `flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                  isActive 
                    ? 'bg-[#B56E4D]/10 text-[#B56E4D]' 
                    : 'text-gray-600 hover:bg-[#B56E4D]/5 hover:text-[#B56E4D]'
                }`
              }
            >
              <Settings size={18} className="mr-3" />
              Settings
            </NavLink>
            
            <a 
              href={`/shop/seller/s1`} 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-4 py-3 text-sm font-medium rounded-md text-gray-600 hover:bg-[#B56E4D]/5 hover:text-[#B56E4D] transition-colors"
            >
              <Eye size={18} className="mr-3" />
              View My Shop
            </a>
            
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 text-sm font-medium rounded-md text-gray-600 hover:bg-red-50 hover:text-red-500 transition-colors"
            >
              <LogOut size={18} className="mr-3" />
              Logout
            </button>
          </nav>
        </div>
        
        {/* Main content */}
        <main className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-empower-brown">Seller Dashboard</h1>
              <p className="text-gray-500">Manage your products, orders, and shop settings</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <NavLink to="/">
                <Button variant="outline" size="sm" className="flex items-center">
                  <Home size={16} className="mr-2" /> Home
                </Button>
              </NavLink>
              <Button 
                variant="outline" 
                size="sm" 
                className="lg:hidden"
                onClick={() => navigate('/shop')}
              >
                <Store size={16} className="mr-2" /> Visit Shop
              </Button>
            </div>
          </div>
          
          {/* Stats overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-white hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className={`mr-4 p-3 rounded-full ${stat.color}`}>
                      <stat.icon size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-empower-brown/70">{stat.title}</p>
                      <h3 className="text-2xl font-bold text-empower-brown">{stat.value}</h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Quick actions */}
          <div className="lg:hidden mb-8">
            <h2 className="text-lg font-semibold mb-4 text-empower-brown">Quick Actions</h2>
            <div className="flex flex-wrap gap-4">
              {[
                { label: 'Products', icon: Package, href: '/seller-dashboard' },
                { label: 'Orders', icon: ShoppingCart, href: '/seller-dashboard/orders' },
                { label: 'Customers', icon: Users, href: '/seller-dashboard/customers' },
                { label: 'Finance', icon: CreditCard, href: '/seller-dashboard/finance' },
                { label: 'Feedback', icon: Star, href: '/seller-dashboard/feedback' },
                { label: 'Settings', icon: Settings, href: '/seller-dashboard/settings' }
              ].map((action, i) => (
                <NavLink key={i} to={action.href} className="no-underline">
                  <Button variant="outline" className="flex flex-col h-24 w-24 items-center justify-center gap-2">
                    <action.icon size={24} />
                    <span className="text-sm">{action.label}</span>
                  </Button>
                </NavLink>
              ))}
            </div>
          </div>
          
          {/* Main content area based on routes */}
          <div className="bg-white rounded-lg shadow-sm animate-fade-in">
            <Routes>
              <Route path="/" element={<DashboardProducts />} />
              <Route path="/orders" element={<DashboardOrders />} />
              <Route path="/customers" element={<DashboardCustomers />} />
              <Route path="/finance" element={<DashboardFinance />} />
              <Route path="/feedback" element={<DashboardFeedback />} />
              <Route path="/settings" element={<DashboardSettings />} />
            </Routes>
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default SellerDashboard;
