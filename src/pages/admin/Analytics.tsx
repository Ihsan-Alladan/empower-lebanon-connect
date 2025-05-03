
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, BarChart, TrendingUp } from 'lucide-react';

const Analytics: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-empower-brown">Analytics</h1>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <PieChart className="mr-2 text-empower-terracotta" size={20} />
            User Demographics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Detailed analytics on user demographics and engagement.</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart className="mr-2 text-empower-terracotta" size={20} />
            Revenue Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Track revenue from courses, shop products, and donations.</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="mr-2 text-empower-terracotta" size={20} />
            Growth Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Monitor growth metrics and trends over time.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
