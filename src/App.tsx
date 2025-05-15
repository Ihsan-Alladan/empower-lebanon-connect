import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { authService } from '@/services/authService';
import { toast } from 'sonner';

// Import components
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Import pages
import Home from '@/pages/Home';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Shop from '@/pages/Shop';
import ProductDetails from '@/pages/ProductDetails';
import Events from '@/pages/Events';
import EventDetails from '@/pages/EventDetails';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Profile from '@/pages/Profile';
import NotFound from '@/pages/NotFound';
import TermsOfService from '@/pages/TermsOfService';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import ForgotPassword from '@/pages/ForgotPassword';
import ResetPassword from '@/pages/ResetPassword';
import SellerDashboard from '@/pages/seller/SellerDashboard';
import CreateProduct from '@/pages/seller/CreateProduct';
import EditProduct from '@/pages/seller/EditProduct';
import InstructorDashboard from '@/pages/instructor/InstructorDashboard';
import CreateCourse from '@/pages/instructor/CreateCourse';
import EditCourse from '@/pages/instructor/EditCourse';
import Courses from '@/pages/Courses';
import CourseDetails from '@/pages/CourseDetails';
import LearnerDashboard from '@/pages/learner/LearnerDashboard';
import Cart from '@/pages/Cart';
import Checkout from '@/pages/Checkout';
import Success from '@/pages/Success';
import Cancel from '@/pages/Cancel';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import EventsManagement from '@/pages/admin/EventsManagement';
import UserManagement from '@/pages/admin/UserManagement';
import ShopManagement from '@/pages/admin/ShopManagement';
import ContentManagement from '@/pages/admin/ContentManagement';
import Newsletter from '@/pages/admin/Newsletter';
import Analytics from '@/pages/admin/Analytics';
import Settings from '@/pages/admin/Settings';
import AdminLayout from '@/components/admin/AdminLayout';

// Import the DonationManagement component
import DonationManagement from '@/pages/admin/DonationManagement';

const App: React.FC = () => {
  const { loading, isAuthenticated } = useAuth();
  
  useEffect(() => {
    // Check if user is already logged in
    if (authService.isAuthenticated()) {
      console.log("App: User is authenticated");
    } else {
      console.log("App: User is not authenticated");
    }
  }, [isAuthenticated]);
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  return (
    <Router>
      <Navbar />
      <main className="container mx-auto py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/events" element={<Events />} />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/course/:id" element={<CourseDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
          
          {/* Seller Routes */}
          <Route path="/seller/dashboard" element={
            authService.isSeller() ? <SellerDashboard /> : <Navigate to="/login" replace />
          } />
          <Route path="/seller/product/create" element={
            authService.isSeller() ? <CreateProduct /> : <Navigate to="/login" replace />
          } />
          <Route path="/seller/product/edit/:id" element={
            authService.isSeller() ? <EditProduct /> : <Navigate to="/login" replace />
          } />
          
          {/* Instructor Routes */}
          <Route path="/instructor/dashboard" element={
            authService.isInstructor() ? <InstructorDashboard /> : <Navigate to="/login" replace />
          } />
          <Route path="/instructor/course/create" element={
            authService.isInstructor() ? <CreateCourse /> : <Navigate to="/login" replace />
          } />
          <Route path="/instructor/course/edit/:id" element={
            authService.isInstructor() ? <EditCourse /> : <Navigate to="/login" replace />
          } />
          
          {/* Learner Routes */}
          <Route path="/learner/dashboard" element={
            authService.isLearner() ? <LearnerDashboard /> : <Navigate to="/login" replace />
          } />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
          <Route path="/admin/events" element={<AdminLayout><EventsManagement /></AdminLayout>} />
          <Route path="/admin/users" element={<AdminLayout><UserManagement /></AdminLayout>} />
          <Route path="/admin/shop" element={<AdminLayout><ShopManagement /></AdminLayout>} />
          <Route path="/admin/content" element={<AdminLayout><ContentManagement /></AdminLayout>} />
          <Route path="/admin/newsletter" element={<AdminLayout><Newsletter /></AdminLayout>} />
          <Route path="/admin/analytics" element={<AdminLayout><Analytics /></AdminLayout>} />
          <Route path="/admin/donations" element={<AdminLayout><DonationManagement /></AdminLayout>} />
          <Route path="/admin/settings" element={<AdminLayout><Settings /></AdminLayout>} />

          {/* Profile Route - accessible to authenticated users */}
          <Route path="/profile" element={
            isAuthenticated ? <Profile /> : <Navigate to="/login" replace />
          } />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
