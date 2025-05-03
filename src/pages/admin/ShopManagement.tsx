
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, ClipboardList } from 'lucide-react';

const ShopManagement: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-empower-brown">Shop Management</h1>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Package className="mr-2 text-empower-terracotta" size={20} />
            Product Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Manage all shop products, inventory, and categories.</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <ClipboardList className="mr-2 text-empower-terracotta" size={20} />
            Orders & Inventory
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>View and manage customer orders and track inventory levels.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShopManagement;
