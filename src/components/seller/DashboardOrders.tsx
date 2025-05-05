
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, ShoppingCart } from 'lucide-react';

// Mock order data
const orders = [
  {
    id: 'ORD-001',
    date: '2023-05-10',
    customer: 'Emily Johnson',
    items: [
      { id: '1', name: 'Handwoven Rustic Basket', quantity: 1, price: 49.99 }
    ],
    total: 49.99,
    status: 'processing',
    paymentStatus: 'paid',
    shippingMethod: 'Standard Shipping',
    trackingNumber: 'TRK12345678'
  },
  {
    id: 'ORD-002',
    date: '2023-05-08',
    customer: 'Michael Smith',
    items: [
      { id: '5', name: 'Traditional Crochet Throw Blanket', quantity: 1, price: 129.00 }
    ],
    total: 129.00,
    status: 'shipped',
    paymentStatus: 'paid',
    shippingMethod: 'Express Shipping',
    trackingNumber: 'TRK87654321'
  },
  {
    id: 'ORD-003',
    date: '2023-05-05',
    customer: 'Sarah Williams',
    items: [
      { id: '2', name: 'Hand-Embroidered Table Runner', quantity: 1, price: 35.50 },
      { id: '6', name: 'Handmade Copper Turkish Coffee Set', quantity: 1, price: 89.50 }
    ],
    total: 125.00,
    status: 'delivered',
    paymentStatus: 'paid',
    shippingMethod: 'Standard Shipping',
    trackingNumber: 'TRK23456789'
  },
  {
    id: 'ORD-004',
    date: '2023-05-01',
    customer: 'David Brown',
    items: [
      { id: '3', name: 'Ceramic Coffee Mug Set', quantity: 2, price: 52.00 }
    ],
    total: 104.00,
    status: 'delivered',
    paymentStatus: 'paid',
    shippingMethod: 'Standard Shipping',
    trackingNumber: 'TRK34567890'
  }
];

const DashboardOrders: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [activeTab, setActiveTab] = useState('all');
  
  // Filter orders based on search, status, and tabs
  const filteredOrders = orders.filter(order => {
    // Filter by search query
    if (
      searchQuery && 
      !order.id.toLowerCase().includes(searchQuery.toLowerCase()) && 
      !order.customer.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    
    // Filter by status
    if (selectedStatus !== 'all' && order.status !== selectedStatus) {
      return false;
    }
    
    // Filter by tab
    if (activeTab !== 'all' && order.status !== activeTab) {
      return false;
    }
    
    return true;
  });
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'processing':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Processing</Badge>;
      case 'shipped':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Shipped</Badge>;
      case 'delivered':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Delivered</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">{status}</Badge>;
    }
  };
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-empower-brown">Orders Management</h2>
      </div>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full mb-6">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="all" className="data-[state=active]:text-[#B56E4D]">
            All Orders
          </TabsTrigger>
          <TabsTrigger value="processing" className="data-[state=active]:text-[#B56E4D]">
            Processing
          </TabsTrigger>
          <TabsTrigger value="shipped" className="data-[state=active]:text-[#B56E4D]">
            Shipped
          </TabsTrigger>
          <TabsTrigger value="delivered" className="data-[state=active]:text-[#B56E4D]">
            Delivered
          </TabsTrigger>
        </TabsList>
      </Tabs>
      
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Search orders by ID or customer name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="w-full md:w-60">
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger>
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Orders table */}
      <div className="overflow-x-auto">
        {filteredOrders.length > 0 ? (
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Order ID</th>
                <th className="text-left py-3 px-4">Date</th>
                <th className="text-left py-3 px-4">Customer</th>
                <th className="text-left py-3 px-4">Items</th>
                <th className="text-left py-3 px-4">Total</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-empower-ivory/30 animate-fade-in">
                  <td className="py-3 px-4 font-medium">{order.id}</td>
                  <td className="py-3 px-4">{new Date(order.date).toLocaleDateString()}</td>
                  <td className="py-3 px-4">{order.customer}</td>
                  <td className="py-3 px-4">{order.items.length} item(s)</td>
                  <td className="py-3 px-4">${order.total.toFixed(2)}</td>
                  <td className="py-3 px-4">{getStatusBadge(order.status)}</td>
                  <td className="py-3 px-4">
                    <Button variant="outline" size="sm">
                      Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-12">
            <ShoppingCart size={48} className="mx-auto text-gray-300 mb-3" />
            <h3 className="text-lg font-medium text-empower-brown mb-1">No orders found</h3>
            <p className="text-gray-500">Try adjusting your filters or wait for new orders</p>
          </div>
        )}
      </div>
      
      {/* Pagination */}
      {filteredOrders.length > 0 && (
        <div className="flex justify-between items-center mt-6">
          <div className="text-sm text-empower-brown/70">
            Showing {filteredOrders.length} of {orders.length} orders
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm" className="bg-[#B56E4D] text-white">1</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardOrders;
