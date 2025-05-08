import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/hooks/useCart';
import { FavoritesProvider } from '@/hooks/useFavorites';
import Index from '@/pages/Index';
import Shop from '@/pages/Shop';
import ProductDetail from '@/pages/ProductDetail';
import SellerShop from '@/pages/SellerShop';
import SellerDashboard from '@/pages/SellerDashboard';
import SellerLogin from '@/pages/SellerLogin';
import Cart from '@/pages/Cart';
import Favorites from '@/pages/Favorites';
import Courses from '@/pages/Courses';
import CourseDetail from '@/pages/CourseDetail';
import Login from '@/pages/Login';
import SignUp from '@/pages/SignUp';
import SellerSignup from '@/pages/SellerSignup';
import LearnerSignup from '@/pages/LearnerSignup';
import InstructorSignup from '@/pages/InstructorSignup';
import CustomerSignup from '@/pages/CustomerSignup';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import ContentManagement from '@/pages/admin/ContentManagement';
import UserManagement from '@/pages/admin/UserManagement';
import ShopManagement from '@/pages/admin/ShopManagement';
import EventsManagement from '@/pages/admin/EventsManagement';
import Newsletter from '@/pages/admin/Newsletter';
import Analytics from '@/pages/admin/Analytics';
import Settings from '@/pages/admin/Settings';
import NotFound from '@/pages/NotFound';
import Donate from '@/pages/Donate';
import './App.css';

// Protected route component
const ProtectedRoute: React.FC<{ element: React.ReactNode; role?: string }> = ({ 
  element, 
  role
}) => {
  // Get user from localStorage directly to avoid issues with context not being ready
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}') : null;
  const isAuthenticated = user !== null;
  const userRole = user?.role;
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (role && userRole !== role) {
    return <Navigate to="/" />;
  }
  
  return <>{element}</>;
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <FavoritesProvider>
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
                  <ProtectedRoute element={<SellerDashboard />} role="seller" />
                } 
              />
              
              {/* Course Routes */}
              <Route path="/courses" element={<Courses />} />
              <Route path="/courses/:id" element={<CourseDetail />} />
              
              {/* Authentication Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signup/learner" element={<LearnerSignup />} />
              <Route path="/signup/instructor" element={<InstructorSignup />} />
              <Route path="/signup/customer" element={<CustomerSignup />} />
              
              {/* Admin Routes */}
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/content" element={<ContentManagement />} />
              <Route path="/admin/users" element={<UserManagement />} />
              <Route path="/admin/shop" element={<ShopManagement />} />
              <Route path="/admin/events" element={<EventsManagement />} />
              <Route path="/admin/newsletter" element={<Newsletter />} />
              <Route path="/admin/analytics" element={<Analytics />} />
              <Route path="/admin/settings" element={<Settings />} />
              
              {/* Other Routes */}
              <Route path="/donate" element={<Donate />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </FavoritesProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
