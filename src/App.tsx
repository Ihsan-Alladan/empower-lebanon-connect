import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { CartProvider } from '@/hooks/useCart';
import { FavoritesProvider } from '@/hooks/useFavorites';
import Index from '@/pages/Index';
import Shop from '@/pages/Shop';
import ProductDetail from '@/pages/ProductDetail';
import SellerShop from '@/pages/SellerShop';
import SellerDashboard from '@/pages/SellerDashboard';
import Cart from '@/pages/Cart';
import Favorites from '@/pages/Favorites';
import Courses from '@/pages/Courses';
import CourseDetail from '@/pages/CourseDetail';
import Login from '@/pages/Login';
import SignUp from '@/pages/SignUp';
import SellerSignup from '@/pages/SellerSignup';
import LearnerSignup from '@/pages/LearnerSignup';
import InstructorSignup from '@/pages/InstructorSignup';
import InstructorDashboard from '@/pages/InstructorDashboard';
import CustomerSignup from '@/pages/CustomerSignup';
import CustomerProfile from '@/pages/CustomerProfile';
import LearnerDashboard from '@/pages/LearnerDashboard';
import LearnerClassroom from '@/pages/LearnerClassroom';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import ContentManagement from '@/pages/admin/ContentManagement';
import UserManagement from '@/pages/admin/UserManagement';
import ShopManagement from '@/pages/admin/ShopManagement';
import EventsManagement from '@/pages/admin/EventsManagement';
import Newsletter from '@/pages/admin/Newsletter';
import Analytics from '@/pages/admin/Analytics';
import Settings from '@/pages/admin/Settings';
import HomeDesign from '@/pages/admin/HomeDesign';
import NotFound from '@/pages/NotFound';
import Donate from '@/pages/Donate';
import DonationCheckout from '@/pages/DonationCheckout';
import Workshops from '@/pages/Workshops';
import Events from '@/pages/Events';
import NewsletterPage from '@/pages/Newsletter';
import './App.css';
import { toast } from 'sonner';

// Protected route component
interface ProtectedRouteProps {
  element: React.ReactNode;
  requiredRole?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  element, 
  requiredRole 
}) => {
  const { isAuthenticated, user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    // If user data is loaded and user is not authenticated, redirect to login
    if (!loading && !isAuthenticated) {
      toast.error("Please sign in to access this page");
      navigate('/login', { state: { from: location } });
    }
    
    // If user is authenticated but doesn't have the required role
    if (!loading && isAuthenticated && requiredRole && user?.role !== requiredRole) {
      toast.error(`Access denied. You need to be a ${requiredRole} to view this page.`);
      navigate('/');
    }
  }, [isAuthenticated, user, loading, navigate, location, requiredRole]);
  
  // Show nothing while checking auth status
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  // If authenticated and has correct role, render the element
  return isAuthenticated && (!requiredRole || user?.role === requiredRole) ? (
    <>{element}</>
  ) : null;
};

// Main App component
function AppContent() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        
        {/* Shop Routes */}
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/product/:id" element={<ProductDetail />} />
        <Route path="/shop/seller/:id" element={<SellerShop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/favorites" element={<Favorites />} />
        
        {/* Seller Routes */}
        <Route path="/seller-signup" element={<SellerSignup />} />
        <Route 
          path="/seller-dashboard/*" 
          element={
            <ProtectedRoute element={<SellerDashboard />} requiredRole="seller" />
          } 
        />
        
        {/* Customer Routes */}
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute element={<CustomerProfile />} requiredRole="customer" />
          } 
        />
        
        {/* Instructor Routes */}
        <Route 
          path="/instructor-dashboard/*" 
          element={
            <ProtectedRoute element={<InstructorDashboard />} requiredRole="instructor" />
          } 
        />
        
        {/* Course Routes */}
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        
        {/* Learner Routes */}
        <Route 
          path="/learner-dashboard" 
          element={
            <ProtectedRoute element={<LearnerDashboard />} requiredRole="learner" />
          }
        />
        <Route 
          path="/learner-classroom" 
          element={
            <ProtectedRoute element={<LearnerClassroom />} requiredRole="learner" />
          }
        />
        
        {/* Workshop & Event Routes */}
        <Route path="/workshops" element={<Workshops />} />
        <Route path="/events" element={<Events />} />
        <Route path="/newsletter" element={<NewsletterPage />} />
        
        {/* Authentication Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signup/learner" element={<LearnerSignup />} />
        <Route path="/signup/instructor" element={<InstructorSignup />} />
        <Route path="/signup/customer" element={<CustomerSignup />} />
        
        {/* Admin Routes */}
        <Route 
          path="/admin" 
          element={<ProtectedRoute element={<AdminDashboard />} requiredRole="admin" />}
        />
        <Route 
          path="/admin/content" 
          element={<ProtectedRoute element={<ContentManagement />} requiredRole="admin" />}
        />
        <Route 
          path="/admin/users" 
          element={<ProtectedRoute element={<UserManagement />} requiredRole="admin" />}
        />
        <Route 
          path="/admin/shop" 
          element={<ProtectedRoute element={<ShopManagement />} requiredRole="admin" />}
        />
        <Route 
          path="/admin/events" 
          element={<ProtectedRoute element={<EventsManagement />} requiredRole="admin" />}
        />
        <Route 
          path="/admin/newsletter" 
          element={<ProtectedRoute element={<Newsletter />} requiredRole="admin" />}
        />
        <Route 
          path="/admin/analytics" 
          element={<ProtectedRoute element={<Analytics />} requiredRole="admin" />}
        />
        <Route 
          path="/admin/settings" 
          element={<ProtectedRoute element={<Settings />} requiredRole="admin" />}
        />
        <Route 
          path="/admin/home-design" 
          element={<ProtectedRoute element={<HomeDesign />} requiredRole="admin" />}
        />
        <Route path="/admin/*" element={<Navigate to="/admin" />} />
        
        {/* Donation Routes */}
        <Route path="/donate" element={<Donate />} />
        <Route path="/donate/checkout/:causeId" element={<DonationCheckout />} />
        
        {/* Other Routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <FavoritesProvider>
          <AppContent />
        </FavoritesProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
