
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, Key, Shield, User } from 'lucide-react';

const SettingsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-empower-brown">System Settings</h1>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="mr-2 text-empower-terracotta" size={20} />
            General Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Manage general system settings and configurations.</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Key className="mr-2 text-empower-terracotta" size={20} />
            Payment Integration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Configure payment gateways and integration settings.</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="mr-2 text-empower-terracotta" size={20} />
            Admin Roles
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Manage administrator roles and permissions.</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="mr-2 text-empower-terracotta" size={20} />
            Profile Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Update your administrator profile and security settings.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
