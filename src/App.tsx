
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { authService } from '@/services/authService';
import { toast } from 'sonner';

// Import components
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Import pages
import Home from '@/pages/Index';  // Already updated to correct path
import NotFound from '@/pages/NotFound';
import AdminLayout from '@/components/admin/AdminLayout';

// Import admin pages
import AdminDashboard from '@/pages/admin/AdminDashboard';
import EventsManagement from '@/pages/admin/EventsManagement';
import UserManagement from '@/pages/admin/UserManagement';
import ShopManagement from '@/pages/admin/ShopManagement';
import ContentManagement from '@/pages/admin/ContentManagement';
import Newsletter from '@/pages/admin/Newsletter';
import Analytics from '@/pages/admin/Analytics';
import Settings from '@/pages/admin/Settings';
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
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
