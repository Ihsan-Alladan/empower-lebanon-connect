
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CreditCard, DollarSign, TrendingUp, Calendar } from 'lucide-react';

const DashboardFinance: React.FC = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-empower-brown">Finance Dashboard</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="rounded-full p-3 bg-green-100 mr-4">
                <DollarSign className="text-green-600" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Revenue</p>
                <h3 className="text-2xl font-bold">$2,450.00</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="rounded-full p-3 bg-blue-100 mr-4">
                <CreditCard className="text-blue-600" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Pending Payouts</p>
                <h3 className="text-2xl font-bold">$350.00</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="rounded-full p-3 bg-purple-100 mr-4">
                <Calendar className="text-purple-600" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Last Payout</p>
                <h3 className="text-2xl font-bold">$840.00</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="rounded-full p-3 bg-amber-100 mr-4">
                <TrendingUp className="text-amber-600" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Monthly Growth</p>
                <h3 className="text-2xl font-bold">+24%</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="text-center py-16">
        <CreditCard size={64} className="mx-auto text-[#B56E4D]/30 mb-6" />
        <h3 className="text-2xl font-semibold text-empower-brown mb-2">Finance Details Coming Soon</h3>
        <p className="text-empower-brown/70 max-w-md mx-auto">
          The full finance management section is under development. 
          Soon you'll have access to detailed transaction history, revenue analytics, and payout management.
        </p>
      </div>
    </div>
  );
};

export default DashboardFinance;
