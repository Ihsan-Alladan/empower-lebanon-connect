
import React from 'react';
import { Link } from 'react-router-dom';

const AdminFooter: React.FC = () => {
  return (
    <footer className="bg-white border-t py-4 px-6 text-sm text-gray-500">
      <div className="flex flex-col md:flex-row justify-between items-center gap-2">
        <div>
          &copy; {new Date().getFullYear()} EmpowEra. All rights reserved.
        </div>
        <div className="flex gap-4">
          <Link to="/privacy" className="hover:text-empower-terracotta transition-colors">
            Privacy Policy
          </Link>
          <Link to="/terms" className="hover:text-empower-terracotta transition-colors">
            Terms of Service
          </Link>
          <Link to="/contact" className="hover:text-empower-terracotta transition-colors">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default AdminFooter;
