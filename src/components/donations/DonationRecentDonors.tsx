
import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface Donor {
  id: string;
  name: string;
  amount: number;
  isAnonymous: boolean;
  date: string;
}

const DonationRecentDonors: React.FC = () => {
  // Mock data for recent donors
  const recentDonors: Donor[] = [
    { id: '1', name: 'Sarah M.', amount: 50, isAnonymous: false, date: '2 hours ago' },
    { id: '2', name: 'Anonymous', amount: 100, isAnonymous: true, date: '5 hours ago' },
    { id: '3', name: 'Michael T.', amount: 25, isAnonymous: false, date: '1 day ago' },
    { id: '4', name: 'Anonymous', amount: 75, isAnonymous: true, date: '1 day ago' },
    { id: '5', name: 'Rachel K.', amount: 200, isAnonymous: false, date: '2 days ago' },
  ];
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <Heart className="text-empower-terracotta mr-2" />
        <h3 className="text-xl font-semibold text-empower-brown">Recent Supporters</h3>
      </div>
      
      <motion.ul
        className="space-y-3"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {recentDonors.map((donor) => (
          <motion.li 
            key={donor.id}
            variants={item}
            className="flex justify-between items-center border-b border-gray-100 pb-2"
          >
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${donor.isAnonymous ? 'bg-gray-200' : 'bg-empower-ivory'}`}>
                {donor.isAnonymous ? 'A' : donor.name.charAt(0)}
              </div>
              <div>
                <p className="font-medium">{donor.name}</p>
                <p className="text-xs text-gray-500">{donor.date}</p>
              </div>
            </div>
            <span className="text-empower-terracotta font-semibold">${donor.amount}</span>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
};

export default DonationRecentDonors;
