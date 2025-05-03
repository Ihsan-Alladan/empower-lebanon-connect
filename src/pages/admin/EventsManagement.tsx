
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Users } from 'lucide-react';

const EventsManagement: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-empower-brown">Events Management</h1>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="mr-2 text-empower-terracotta" size={20} />
            Events Calendar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>View and manage all upcoming and past events.</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="mr-2 text-empower-terracotta" size={20} />
            Event Registrations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Manage registrations for events and see attendee lists.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default EventsManagement;
