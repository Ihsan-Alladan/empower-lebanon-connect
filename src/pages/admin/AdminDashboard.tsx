
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AdminLayout from '@/components/admin/AdminLayout';
import DashboardHome from '@/components/admin/DashboardHome';
import ContentManagement from '@/pages/admin/ContentManagement';
import UserManagement from '@/pages/admin/UserManagement';
import ShopManagement from '@/pages/admin/ShopManagement';
import EventsManagement from '@/pages/admin/EventsManagement';
import DonationsManagement from '@/pages/admin/DonationsManagement';
import Newsletter from '@/pages/admin/Newsletter';
import Analytics from '@/pages/admin/Analytics';
import Settings from '@/pages/admin/Settings';
import HomeDesign from '@/pages/admin/HomeDesign';

const AdminDashboard: React.FC = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<DashboardHome />} />
        <Route path="/content" element={<ContentManagement />} />
        <Route path="/users" element={<UserManagement />} />
        <Route path="/shop" element={<ShopManagement />} />
        <Route path="/events" element={<EventsManagement />} />
        <Route path="/donations" element={<DonationsManagement />} />
        <Route path="/newsletter" element={<Newsletter />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/home-design" element={<HomeDesign />} />
        <Route path="*" element={<Navigate to="/admin" />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminDashboard;
