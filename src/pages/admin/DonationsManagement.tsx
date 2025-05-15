
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Heart, DollarSign, TrendingUp, Plus, Edit2, Trash2, Users, Search, Mail } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/integrations/supabase/client';

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

// Define the schema for campaign form
const campaignFormSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  imageUrl: z.string().url('Please enter a valid URL'),
  goalAmount: z.number().min(1, 'Goal amount must be greater than 0'),
  suggestedAmount: z.number().min(1, 'Suggested amount must be greater than 0'),
  active: z.boolean().default(true),
});

type CampaignForm = z.infer<typeof campaignFormSchema>;

const DonationsManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('campaigns');
  const [campaigns, setCampaigns] = useState<DonationCampaign[]>([]);
  const [transactions, setTransactions] = useState<DonationTransaction[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<DonationCampaign | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTransactions, setFilteredTransactions] = useState<DonationTransaction[]>([]);
  const [emailContent, setEmailContent] = useState('');
  const [selectedDonorEmail, setSelectedDonorEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  // Initialize form
  const form = useForm<CampaignForm>({
    resolver: zodResolver(campaignFormSchema),
    defaultValues: {
      title: '',
      description: '',
      imageUrl: '',
      goalAmount: 1000,
      suggestedAmount: 50,
      active: true
    },
  });
  
  // Fetch campaigns and transactions on component mount
  useEffect(() => {
    fetchCampaigns();
    fetchTransactions();
  }, []);

  // Filter transactions when search query changes
  useEffect(() => {
    if (transactions.length > 0 && searchQuery) {
      const query = searchQuery.toLowerCase();
      const filtered = transactions.filter(
        t => 
          t.name.toLowerCase().includes(query) || 
          t.email.toLowerCase().includes(query) || 
          t.campaignTitle.toLowerCase().includes(query)
      );
      setFilteredTransactions(filtered);
    } else {
      setFilteredTransactions(transactions);
    }
  }, [transactions, searchQuery]);
  
  const fetchCampaigns = async () => {
    setIsLoading(true);
    // In a real application, fetch from Supabase
    // For now, using mock data
    const mockCampaigns = [
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
    ];
    
    setCampaigns(mockCampaigns);
    setIsLoading(false);
  };
  
  const fetchTransactions = async () => {
    // In a real application, fetch from Supabase
    // For now, using mock data
    const mockTransactions = [
      {
        id: 't1',
        name: 'Sarah Johnson',
        email: 'sarah.j@example.com',
        amount: 50,
        campaignId: 'edu-tech',
        campaignTitle: "Fund Women's Coding Courses",
        date: '2025-04-01T14:30:00',
        status: 'completed' as const
      },
      {
        id: 't2',
        name: 'Michael Smith',
        email: 'michael.s@example.com',
        amount: 100,
        campaignId: 'youth-dev',
        campaignTitle: "Youth Leadership Program",
        date: '2025-03-29T09:15:00',
        status: 'completed' as const
      },
      {
        id: 't3',
        name: 'Anonymous',
        email: 'anonymous@example.com',
        amount: 75,
        campaignId: 'entrepreneur',
        campaignTitle: "Small Business Grants",
        date: '2025-03-28T16:45:00',
        status: 'completed' as const
      },
      {
        id: 't4',
        name: 'Rachel Lee',
        email: 'rachel.l@example.com',
        amount: 25,
        campaignId: 'edu-tech',
        campaignTitle: "Fund Women's Coding Courses",
        date: '2025-03-27T11:20:00',
        status: 'completed' as const
      },
      {
        id: 't5',
        name: 'David Wilson',
        email: 'david.w@example.com',
        amount: 200,
        campaignId: 'entrepreneur',
        campaignTitle: "Small Business Grants",
        date: '2025-03-26T15:10:00',
        status: 'completed' as const
      }
    ];
    
    setTransactions(mockTransactions);
    setFilteredTransactions(mockTransactions);
  };
  
  const handleOpenForm = (campaign: DonationCampaign | null = null) => {
    if (campaign) {
      // Edit mode - populate form with campaign data
      form.setValue('title', campaign.title);
      form.setValue('description', campaign.description);
      form.setValue('imageUrl', campaign.imageUrl);
      form.setValue('goalAmount', campaign.goalAmount);
      form.setValue('suggestedAmount', campaign.suggestedAmount);
      form.setValue('active', campaign.active);
      setSelectedCampaign(campaign);
    } else {
      // Create mode - reset form
      form.reset();
      setSelectedCampaign(null);
    }
    setIsFormOpen(true);
  };
  
  const handleSubmitCampaign = (data: CampaignForm) => {
    if (selectedCampaign) {
      // Update existing campaign
      const updatedCampaigns = campaigns.map(c => 
        c.id === selectedCampaign.id 
          ? { 
              ...c, 
              title: data.title, 
              description: data.description,
              imageUrl: data.imageUrl,
              goalAmount: data.goalAmount,
              suggestedAmount: data.suggestedAmount,
              active: data.active
            } 
          : c
      );
      setCampaigns(updatedCampaigns);
      toast.success('Campaign updated successfully');
    } else {
      // Create new campaign
      const newCampaign = {
        id: `campaign-${Date.now()}`,
        title: data.title,
        description: data.description,
        imageUrl: data.imageUrl,
        currentAmount: 0,
        goalAmount: data.goalAmount,
        suggestedAmount: data.suggestedAmount,
        active: data.active
      };
      setCampaigns([...campaigns, newCampaign]);
      toast.success('Campaign created successfully');
    }
    setIsFormOpen(false);
  };
  
  const handleDeleteCampaign = () => {
    if (!selectedCampaign) return;
    
    const filteredCampaigns = campaigns.filter(c => c.id !== selectedCampaign.id);
    setCampaigns(filteredCampaigns);
    
    toast.success('Campaign deleted successfully');
    setIsDeleteDialogOpen(false);
  };
  
  const handleToggleStatus = (campaign: DonationCampaign) => {
    const updatedCampaigns = campaigns.map(c => 
      c.id === campaign.id ? { ...c, active: !c.active } : c
    );
    setCampaigns(updatedCampaigns);
    
    toast.success(`Campaign ${!campaign.active ? 'activated' : 'deactivated'} successfully`);
  };
  
  const openDeleteConfirmation = (campaign: DonationCampaign) => {
    setSelectedCampaign(campaign);
    setIsDeleteDialogOpen(true);
  };
  
  const openEmailDialog = (email: string) => {
    setSelectedDonorEmail(email);
    setIsEmailDialogOpen(true);
  };
  
  const handleSendEmail = () => {
    // In a real application, this would send an email
    toast.success(`Email sent to ${selectedDonorEmail}`);
    setIsEmailDialogOpen(false);
    setEmailContent('');
  };
  
  // Format date for display
  const formatTransactionDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'MMMM d, yyyy');
  };
  
  // Analytics data
  const totalDonations = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
  const totalDonors = new Set(transactions.map(t => t.email)).size;
  const averageDonation = transactions.length > 0 ? totalDonations / transactions.length : 0;
  const activeCampaigns = campaigns.filter(c => c.active).length;
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold text-empower-brown">Manage Donations</h1>
        <Button 
          className="bg-empower-terracotta hover:bg-empower-terracotta/90"
          onClick={() => handleOpenForm()}
        >
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
                <p className="text-2xl font-bold">{activeCampaigns}</p>
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
          {isLoading ? (
            <Card>
              <CardContent className="p-6 flex justify-center">
                <p>Loading campaigns...</p>
              </CardContent>
            </Card>
          ) : campaigns.length === 0 ? (
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-6">
                  <Heart className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No Campaigns Yet</h3>
                  <p className="text-gray-500 mb-4">Create your first donation campaign to start raising funds.</p>
                  <Button onClick={() => handleOpenForm()}>
                    <Plus className="mr-2 h-4 w-4" /> Create Campaign
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            campaigns.map((campaign) => (
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
                      <Button variant="outline" className="w-full" onClick={() => handleOpenForm(campaign)}>
                        <Edit2 className="mr-2 h-4 w-4" /> Edit
                      </Button>
                      <Button 
                        variant={campaign.active ? "default" : "secondary"} 
                        className="w-full"
                        onClick={() => handleToggleStatus(campaign)}
                      >
                        {campaign.active ? 'Deactivate' : 'Activate'}
                      </Button>
                      <Button 
                        variant="destructive" 
                        className="w-full"
                        onClick={() => openDeleteConfirmation(campaign)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
        
        <TabsContent value="transactions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Donation Transactions</CardTitle>
              <CardDescription>View and manage all donation transactions.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search transactions..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Campaign</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTransactions.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-4">
                          {searchQuery ? 'No transactions found matching your search.' : 'No transactions found.'}
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredTransactions.map((transaction) => {
                        const formattedDate = formatTransactionDate(transaction.date);
                        
                        return (
                          <TableRow key={transaction.id}>
                            <TableCell className="font-medium">{transaction.name}</TableCell>
                            <TableCell>{transaction.email}</TableCell>
                            <TableCell className="font-medium">${transaction.amount}</TableCell>
                            <TableCell>{transaction.campaignTitle}</TableCell>
                            <TableCell>{formattedDate}</TableCell>
                            <TableCell>
                              <Badge className={`px-2 py-1 ${
                                transaction.status === 'completed' ? 'bg-green-100 text-green-800' : 
                                transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                                'bg-red-100 text-red-800'
                              }`}>
                                {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => openEmailDialog(transaction.email)}
                              >
                                <span className="sr-only">Email donor</span>
                                <Mail className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
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
      
      {/* Campaign Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{selectedCampaign ? 'Edit Campaign' : 'Create Campaign'}</DialogTitle>
            <DialogDescription>
              {selectedCampaign ? 'Edit the campaign details below.' : 'Fill in the form to create a new donation campaign.'}
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmitCampaign)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter campaign title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter campaign description" 
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter image URL" {...field} />
                    </FormControl>
                    <FormDescription>
                      Provide a URL to an image that represents your campaign.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="goalAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Goal Amount ($)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min={1}
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="suggestedAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Suggested Donation ($)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min={1}
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="active"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={field.onChange}
                        className="h-4 w-4 rounded border-gray-300 text-empower-terracotta focus:ring-empower-terracotta"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Active Campaign</FormLabel>
                      <FormDescription>
                        This campaign will be visible to users and accept donations.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button type="submit" className="w-full">
                  {selectedCampaign ? 'Update Campaign' : 'Create Campaign'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* Delete Campaign Confirmation */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Campaign</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this campaign? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteCampaign}
            >
              Delete Campaign
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Email Dialog */}
      <Dialog open={isEmailDialogOpen} onOpenChange={setIsEmailDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Email Donor</DialogTitle>
            <DialogDescription>
              Send a personalized email to this donor.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="recipient">Recipient</Label>
              <Input id="recipient" value={selectedDonorEmail} disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="Thank you for your donation" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea 
                id="message" 
                placeholder="Enter your message here..."
                className="min-h-[200px]"
                value={emailContent}
                onChange={(e) => setEmailContent(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsEmailDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSendEmail}
              disabled={!emailContent.trim()}
            >
              Send Email
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DonationsManagement;
