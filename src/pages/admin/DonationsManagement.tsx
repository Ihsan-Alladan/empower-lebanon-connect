
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, DollarSign, TrendingUp } from 'lucide-react';

const DonationsManagement: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-empower-brown">Manage Donations</h1>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Heart className="mr-2 text-empower-terracotta" size={20} />
            Donation Campaigns
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Create and manage donation campaigns for your organization.</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <DollarSign className="mr-2 text-empower-terracotta" size={20} />
            Donation Transactions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>View and manage all donation transactions.</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="mr-2 text-empower-terracotta" size={20} />
            Donation Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Track donation metrics and campaign performance.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DonationsManagement;
