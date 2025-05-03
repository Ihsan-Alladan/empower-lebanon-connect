
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Send } from 'lucide-react';

const Newsletter: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-empower-brown">Newsletter Management</h1>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Mail className="mr-2 text-empower-terracotta" size={20} />
            Newsletter Campaigns
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Create and manage email newsletter campaigns.</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Send className="mr-2 text-empower-terracotta" size={20} />
            Announcements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Create and manage announcements for the homepage.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Newsletter;
