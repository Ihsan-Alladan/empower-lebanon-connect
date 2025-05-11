
import React from 'react';
import { Link } from 'react-router-dom';

const AdminFooter: React.FC = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 text-white py-4 px-6 text-sm sticky bottom-0 z-10">
      <div className="flex flex-col md:flex-row justify-between items-center gap-2">
        <div>
          &copy; {year} EmpowEra. Admin Panel.
        </div>
        <div className="flex gap-4">
          <Link to="/" className="hover:text-empower-terracotta transition-colors" target="_blank">
            Platform
          </Link>
          <Link to="/admin/docs" className="hover:text-empower-terracotta transition-colors">
            Admin Docs
          </Link>
          <Link to="/admin/support" className="hover:text-empower-terracotta transition-colors">
            Support
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default AdminFooter;
