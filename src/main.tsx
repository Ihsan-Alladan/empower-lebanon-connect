
import { createRoot } from 'react-dom/client'
import React from 'react';
import App from './App.tsx'
import './index.css'
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from 'sonner';

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
      <Toaster position="top-right" />
    </AuthProvider>
  </React.StrictMode>
);
