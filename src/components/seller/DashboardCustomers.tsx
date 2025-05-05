
import React from 'react';
import { Users } from 'lucide-react';

const DashboardCustomers: React.FC = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-empower-brown">Customer Management</h2>
      </div>
      
      <div className="text-center py-16">
        <Users size={64} className="mx-auto text-[#B56E4D]/30 mb-6" />
        <h3 className="text-2xl font-semibold text-empower-brown mb-2">Coming Soon</h3>
        <p className="text-empower-brown/70 max-w-md mx-auto">
          The customer management section is currently under development. 
          Soon you'll be able to view customer information, purchase history, and manage relationships.
        </p>
      </div>
    </div>
  );
};

export default DashboardCustomers;
