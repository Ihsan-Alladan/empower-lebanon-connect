import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Heart, DollarSign, TrendingUp, Plus, Edit2, Trash2, Users } from 'lucide-react';

interface DonationCampaign {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  currentAmount: number;
  goalAmount: number;
  suggestedAmount: number;
  active: boolean;
}

interface DonationTransaction {
  id: string;
  name: string;
  email: string;
  amount: number;
  campaignId: string;
  campaignTitle: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

const DonationsManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('campaigns');
  
  // Mock data for campaigns
  const [campaigns, setCampaigns] = useState<DonationCampaign[]>([
    {
      id: 'edu-tech',
      title: "Fund Women's Coding Courses",
      description: "Help women develop tech skills that lead to sustainable careers.",
      imageUrl: "/lovable-uploads/57514e04-8524-41e5-8cbd-c63693884459.png",
      currentAmount: 8750,
      goalAmount: 15000,
      suggestedAmount: 50,
      active: true
    },
    {
      id: 'youth-dev',
      title: "Youth Leadership Program",
      description: "Support workshops that build confidence and leadership skills.",
      imageUrl: "/lovable-uploads/22a31812-0de9-4dde-9442-b766171923c5.png",
      currentAmount: 4200,
      goalAmount: 10000,
      suggestedAmount: 35,
      active: true
    },
    {
      id: 'entrepreneur',
      title: "Small Business Grants",
      description: "Provide seed funding to help local entrepreneurs start sustainable businesses.",
      imageUrl: "/lovable-uploads/9ccc3dc6-1453-4e2f-8240-babd3b2a121d.png",
      currentAmount: 12500,
      goalAmount: 20000,
      suggestedAmount: 75,
      active: true
    }
  ]);
  
  // Mock data for transactions
  const [transactions, setTransactions] = useState<DonationTransaction[]>([
    {
      id: 't1',
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      amount: 50,
      campaignId: 'edu-tech',
      campaignTitle: "Fund Women's Coding Courses",
      date: '2025-04-01T14:30:00',
      status: 'completed'
    },
    {
      id: 't2',
      name: 'Michael Smith',
      email: 'michael.s@example.com',
      amount: 100,
      campaignId: 'youth-dev',
      campaignTitle: "Youth Leadership Program",
      date: '2025-03-29T09:15:00',
      status: 'completed'
    },
    {
      id: 't3',
      name: 'Anonymous',
      email: 'anonymous@example.com',
      amount: 75,
      campaignId: 'entrepreneur',
      campaignTitle: "Small Business Grants",
      date: '2025-03-28T16:45:00',
      status: 'completed'
    },
    {
      id: 't4',
      name: 'Rachel Lee',
      email: 'rachel.l@example.com',
      amount: 25,
      campaignId: 'edu-tech',
      campaignTitle: "Fund Women's Coding Courses",
      date: '2025-03-27T11:20:00',
      status: 'completed'
    },
    {
      id: 't5',
      name: 'David Wilson',
      email: 'david.w@example.com',
      amount: 200,
      campaignId: 'entrepreneur',
      campaignTitle: "Small Business Grants",
      date: '2025-03-26T15:10:00',
      status: 'completed'
    }
  ]);
  
  // Analytics data
  const totalDonations = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
  const totalDonors = new Set(transactions.map(t => t.email)).size;
  const averageDonation = totalDonations / transactions.length;
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold text-empower-brown">Manage Donations</h1>
        <Button className="bg-empower-terracotta hover:bg-empower-terracotta/90">
          <Plus className="mr-2 h-4 w-4" /> Add New Campaign
        </Button>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Total Donations</p>
                <p className="text-2xl font-bold">${totalDonations.toLocaleString()}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-empower-terracotta/10 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-empower-terracotta" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Active Campaigns</p>
                <p className="text-2xl font-bold">{campaigns.filter(c => c.active).length}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-empower-terracotta/10 flex items-center justify-center">
                <Heart className="h-6 w-6 text-empower-terracotta" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Total Donors</p>
                <p className="text-2xl font-bold">{totalDonors}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-empower-terracotta/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-empower-terracotta" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Average Donation</p>
                <p className="text-2xl font-bold">${averageDonation.toFixed(2)}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-empower-terracotta/10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-empower-terracotta" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Tabs */}
      <Tabs defaultValue="campaigns" onValueChange={setActiveTab} value={activeTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="campaigns" className="space-y-6">
          {campaigns.map((campaign) => (
            <Card key={campaign.id}>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="md:col-span-1">
                    <img 
                      src={campaign.imageUrl} 
                      alt={campaign.title} 
                      className="w-full h-32 object-cover rounded-md"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <h3 className="text-lg font-semibold mb-1">{campaign.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{campaign.description}</p>
                    
                    <div className="mb-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>${campaign.currentAmount.toLocaleString()} of ${campaign.goalAmount.toLocaleString()}</span>
                      </div>
                      <Progress value={Math.round((campaign.currentAmount / campaign.goalAmount) * 100)} className="h-2" />
                    </div>
                    
                    <div className="text-sm text-gray-600">
                      <span>Suggested Donation: ${campaign.suggestedAmount}</span>
                      <span className={`ml-4 ${campaign.active ? 'text-green-600' : 'text-red-600'}`}>
                        {campaign.active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                  <div className="md:col-span-1 flex flex-col justify-center gap-2">
                    <Button variant="outline" className="w-full">
                      <Edit2 className="mr-2 h-4 w-4" /> Edit
                    </Button>
                    <Button variant={campaign.active ? "default" : "secondary"} className="w-full">
                      {campaign.active ? 'Deactivate' : 'Activate'}
                    </Button>
                    <Button variant="destructive" className="w-full">
                      <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="transactions" className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Name</th>
                      <th className="text-left py-3 px-4">Email</th>
                      <th className="text-left py-3 px-4">Amount</th>
                      <th className="text-left py-3 px-4">Campaign</th>
                      <th className="text-left py-3 px-4">Date</th>
                      <th className="text-left py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction) => {
                      const date = new Date(transaction.date);
                      const formattedDate = date.toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      });
                      
                      return (
                        <tr key={transaction.id} className="border-b">
                          <td className="py-3 px-4">{transaction.name}</td>
                          <td className="py-3 px-4">{transaction.email}</td>
                          <td className="py-3 px-4 font-medium">${transaction.amount}</td>
                          <td className="py-3 px-4">{transaction.campaignTitle}</td>
                          <td className="py-3 px-4">{formattedDate}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              transaction.status === 'completed' ? 'bg-green-100 text-green-800' : 
                              transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-red-100 text-red-800'
                            }`}>
                              {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Donation Analytics</CardTitle>
              <CardDescription>
                View donation trends and insights to optimize your fundraising strategies.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96 flex items-center justify-center bg-gray-50 rounded-md">
                <p className="text-gray-500">Donation analytics charts and graphs will be displayed here.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DonationsManagement;
