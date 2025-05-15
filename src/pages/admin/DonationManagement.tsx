
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon, Download, Mail, RefreshCw, Search, Flag, PieChart, TrendingUp, DollarSign, CreditCard, Users, Plus, Edit2, Trash2, Send, AlertCircle, FileText, Undo } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { PieChart as RechartsPieChart, Pie, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@/lib/utils';
import { getAdminAuthenticated } from '@/utils/adminAuth';

// Define interfaces for our data
interface Donation {
  id: string;
  donor_name: string;
  donor_email: string;
  amount: number;
  currency: string;
  payment_method: string;
  cause: string;
  date: string;
  is_anonymous: boolean;
  status: 'completed' | 'refunded' | 'flagged';
  message?: string;
}

interface DonationCause {
  id: string;
  name: string;
  description: string;
  target_amount: number;
  current_amount: number;
  image_url: string;
  is_active: boolean;
}

interface EmailFormData {
  to: string;
  subject: string;
  message: string;
}

interface DonationStats {
  totalThisMonth: number;
  totalAllTime: number;
  donorCount: number;
  averageDonation: number;
}

// Create schema for email form
const emailFormSchema = z.object({
  to: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(1, { message: "Subject is required" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

// Create schema for cause form
const causeFormSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  target_amount: z.number().min(1, { message: "Target amount must be greater than 0" }),
  image_url: z.string().url({ message: "Please enter a valid URL" }),
  is_active: z.boolean().default(true),
});

// Payment settings form schema
const paymentSettingsSchema = z.object({
  stripe_public_key: z.string().optional(),
  stripe_secret_key: z.string().optional(),
  paypal_client_id: z.string().optional(),
  paypal_secret: z.string().optional(),
  suggested_amounts: z.string().transform(val => 
    val.split(',').map(v => parseFloat(v.trim())).filter(v => !isNaN(v))
  ),
});

// Email template form schema
const emailTemplateSchema = z.object({
  subject_template: z.string().min(5, { message: "Subject template is required" }),
  body_template: z.string().min(20, { message: "Body template is required" }),
});

const DonationManagement: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [donations, setDonations] = useState<Donation[]>([]);
  const [filteredDonations, setFilteredDonations] = useState<Donation[]>([]);
  const [causes, setCauses] = useState<DonationCause[]>([]);
  const [stats, setStats] = useState<DonationStats>({
    totalThisMonth: 0,
    totalAllTime: 0,
    donorCount: 0,
    averageDonation: 0
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined);
  const [selectedCause, setSelectedCause] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [selectedDonorEmail, setSelectedDonorEmail] = useState('');
  const [showCauseDialog, setShowCauseDialog] = useState(false);
  const [selectedCause2, setSelectedCause2] = useState<DonationCause | null>(null);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [showEmailTemplateDialog, setShowEmailTemplateDialog] = useState(false);
  const [lastDeletedDonation, setLastDeletedDonation] = useState<Donation | null>(null);
  const [showReassignDialog, setShowReassignDialog] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null);
  const [newCause, setNewCause] = useState<string>('');

  // Email form
  const emailForm = useForm<EmailFormData>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      to: '',
      subject: '',
      message: ''
    }
  });

  // Cause form
  const causeForm = useForm<DonationCause>({
    resolver: zodResolver(causeFormSchema),
    defaultValues: {
      id: '',
      name: '',
      description: '',
      target_amount: 1000,
      current_amount: 0,
      image_url: '',
      is_active: true
    }
  });

  // Payment settings form
  const settingsForm = useForm({
    resolver: zodResolver(paymentSettingsSchema),
    defaultValues: {
      stripe_public_key: '',
      stripe_secret_key: '',
      paypal_client_id: '',
      paypal_secret: '',
      suggested_amounts: '10,25,50,100',
    }
  });

  // Email template form
  const emailTemplateForm = useForm({
    resolver: zodResolver(emailTemplateSchema),
    defaultValues: {
      subject_template: 'Thank you for your donation to {{cause}}',
      body_template: 'Dear {{name}},\n\nThank you for your generous donation of {{amount}} {{currency}} to {{cause}}. Your support helps us make a difference.\n\nBest regards,\nThe Team'
    }
  });

  useEffect(() => {
    // Check if admin is authenticated
    if (!getAdminAuthenticated()) {
      toast.error('Please login as admin to access this page');
      navigate('/login');
      return;
    }
    
    // Fetch donations, causes, and stats
    fetchData();
  }, [navigate]);

  useEffect(() => {
    filterDonations();
  }, [searchTerm, dateFilter, selectedCause, donations]);

  const fetchData = async () => {
    setIsLoading(true);
    
    // In a real app, fetch from Supabase
    // For demo purposes, we'll use mock data
    
    // Mock Donations
    const mockDonations: Donation[] = [
      {
        id: '1',
        donor_name: 'John Smith',
        donor_email: 'john@example.com',
        amount: 100,
        currency: 'USD',
        payment_method: 'Credit Card',
        cause: 'Education Fund',
        date: '2025-05-01T10:30:00',
        is_anonymous: false,
        status: 'completed'
      },
      {
        id: '2',
        donor_name: 'Anonymous',
        donor_email: 'jane@example.com',
        amount: 50,
        currency: 'USD',
        payment_method: 'PayPal',
        cause: 'Community Center',
        date: '2025-05-05T14:20:00',
        is_anonymous: true,
        status: 'completed'
      },
      {
        id: '3',
        donor_name: 'Robert Johnson',
        donor_email: 'robert@example.com',
        amount: 200,
        currency: 'USD',
        payment_method: 'Bank Transfer',
        cause: 'Education Fund',
        date: '2025-05-10T09:15:00',
        is_anonymous: false,
        status: 'completed'
      },
      {
        id: '4',
        donor_name: 'Maria Garcia',
        donor_email: 'maria@example.com',
        amount: 75,
        currency: 'EUR',
        payment_method: 'Credit Card',
        cause: 'Women Empowerment',
        date: '2025-05-12T11:45:00',
        is_anonymous: false,
        status: 'flagged',
        message: 'Verification needed'
      },
      {
        id: '5',
        donor_name: 'Anonymous',
        donor_email: 'michael@example.com',
        amount: 150,
        currency: 'USD',
        payment_method: 'PayPal',
        cause: 'Community Center',
        date: '2025-05-15T16:30:00',
        is_anonymous: true,
        status: 'completed'
      }
    ];
    
    // Mock Causes
    const mockCauses: DonationCause[] = [
      {
        id: '1',
        name: 'Education Fund',
        description: 'Supporting educational programs and scholarships for underprivileged students.',
        target_amount: 10000,
        current_amount: 6500,
        image_url: '/lovable-uploads/57514e04-8524-41e5-8cbd-c63693884459.png',
        is_active: true
      },
      {
        id: '2',
        name: 'Community Center',
        description: 'Building a new community center with facilities for education, healthcare, and recreation.',
        target_amount: 25000,
        current_amount: 12000,
        image_url: '/lovable-uploads/22a31812-0de9-4dde-9442-b766171923c5.png',
        is_active: true
      },
      {
        id: '3',
        name: 'Women Empowerment',
        description: 'Supporting programs that provide skills training and economic opportunities for women.',
        target_amount: 15000,
        current_amount: 8000,
        image_url: '/lovable-uploads/9ccc3dc6-1453-4e2f-8240-babd3b2a121d.png',
        is_active: true
      }
    ];
    
    // Calculate stats
    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    
    const donationsThisMonth = mockDonations.filter(donation => 
      new Date(donation.date) >= firstDayOfMonth && donation.status === 'completed'
    );
    
    const totalThisMonth = donationsThisMonth.reduce((total, donation) => 
      total + donation.amount, 0
    );
    
    const totalAllTime = mockDonations
      .filter(donation => donation.status === 'completed')
      .reduce((total, donation) => total + donation.amount, 0);
    
    const uniqueDonors = new Set(
      mockDonations
        .filter(donation => donation.status === 'completed')
        .map(donation => donation.donor_email)
    );
    
    const completedDonations = mockDonations.filter(
      donation => donation.status === 'completed'
    );
    
    const avgDonation = completedDonations.length > 0 
      ? Math.round((totalAllTime / completedDonations.length) * 100) / 100
      : 0;
    
    const stats: DonationStats = {
      totalThisMonth,
      totalAllTime,
      donorCount: uniqueDonors.size,
      averageDonation: avgDonation
    };
    
    setDonations(mockDonations);
    setCauses(mockCauses);
    setStats(stats);
    setFilteredDonations(mockDonations);
    setIsLoading(false);
  };

  const filterDonations = () => {
    let filtered = [...donations];
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(donation => 
        donation.donor_name.toLowerCase().includes(term) ||
        donation.donor_email.toLowerCase().includes(term) ||
        donation.cause.toLowerCase().includes(term)
      );
    }
    
    // Filter by date
    if (dateFilter) {
      const filterDate = new Date(dateFilter);
      filtered = filtered.filter(donation => {
        const donationDate = new Date(donation.date);
        return donationDate.getDate() === filterDate.getDate() &&
               donationDate.getMonth() === filterDate.getMonth() &&
               donationDate.getFullYear() === filterDate.getFullYear();
      });
    }
    
    // Filter by cause
    if (selectedCause !== 'all') {
      filtered = filtered.filter(donation => donation.cause === selectedCause);
    }
    
    setFilteredDonations(filtered);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleDateSelect = (date: Date | undefined) => {
    setDateFilter(date);
  };

  const handleCauseSelect = (cause: string) => {
    setSelectedCause(cause);
  };

  const handleContactDonor = (email: string) => {
    setSelectedDonorEmail(email);
    emailForm.setValue('to', email);
    setShowEmailDialog(true);
  };

  const handleSendEmail = (data: EmailFormData) => {
    toast.success(`Email sent to ${data.to}`);
    setShowEmailDialog(false);
    emailForm.reset();
  };

  const handleStatusChange = (donation: Donation, status: 'completed' | 'refunded' | 'flagged') => {
    const updatedDonations = donations.map(d => 
      d.id === donation.id ? { ...d, status } : d
    );
    setDonations(updatedDonations);
    
    const statusMap = {
      'completed': 'Donation approved',
      'refunded': 'Donation refunded',
      'flagged': 'Donation flagged for review'
    };
    
    toast.success(statusMap[status]);
  };

  const handleAddEditCause = (cause: DonationCause | null = null) => {
    if (cause) {
      causeForm.reset({
        id: cause.id,
        name: cause.name,
        description: cause.description,
        target_amount: cause.target_amount,
        current_amount: cause.current_amount,
        image_url: cause.image_url,
        is_active: cause.is_active
      });
      setSelectedCause2(cause);
    } else {
      causeForm.reset({
        id: '',
        name: '',
        description: '',
        target_amount: 1000,
        current_amount: 0,
        image_url: '',
        is_active: true
      });
      setSelectedCause2(null);
    }
    setShowCauseDialog(true);
  };

  const handleSubmitCause = (data: DonationCause) => {
    if (selectedCause2) {
      // Edit existing cause
      const updatedCauses = causes.map(c => 
        c.id === selectedCause2.id ? { ...data, id: selectedCause2.id } : c
      );
      setCauses(updatedCauses);
      toast.success('Cause updated successfully');
    } else {
      // Add new cause
      const newCause = {
        ...data,
        id: Date.now().toString(),
        current_amount: 0
      };
      setCauses([...causes, newCause]);
      toast.success('New cause added successfully');
    }
    setShowCauseDialog(false);
  };

  const handleDeleteCause = (id: string) => {
    setCauses(causes.filter(c => c.id !== id));
    toast.success('Cause deleted successfully');
  };

  const handleToggleCauseStatus = (id: string) => {
    const updatedCauses = causes.map(c => 
      c.id === id ? { ...c, is_active: !c.is_active } : c
    );
    setCauses(updatedCauses);
    
    const cause = causes.find(c => c.id === id);
    toast.success(`Cause ${cause?.is_active ? 'deactivated' : 'activated'} successfully`);
  };

  const handleSavePaymentSettings = (data: any) => {
    console.log('Payment settings saved:', data);
    toast.success('Payment settings updated successfully');
    setShowSettingsDialog(false);
  };

  const handleSaveEmailTemplate = (data: any) => {
    console.log('Email template updated:', data);
    toast.success('Email template updated successfully');
    setShowEmailTemplateDialog(false);
  };

  const handleDeleteDonation = (donation: Donation) => {
    setLastDeletedDonation(donation);
    setDonations(donations.filter(d => d.id !== donation.id));
    toast('Donation deleted', {
      description: 'This action can be undone for the next 10 seconds.',
      action: {
        label: "Undo",
        onClick: () => handleUndoDelete(),
      },
      duration: 10000,
    });
    
    // After 10 seconds, clear the lastDeletedDonation state
    setTimeout(() => {
      if (lastDeletedDonation?.id === donation.id) {
        setLastDeletedDonation(null);
      }
    }, 10000);
  };

  const handleUndoDelete = () => {
    if (lastDeletedDonation) {
      setDonations(prev => [...prev, lastDeletedDonation]);
      setLastDeletedDonation(null);
      toast.success('Donation restored');
    }
  };

  const handleReassignDonation = (donation: Donation) => {
    setSelectedDonation(donation);
    setNewCause('');
    setShowReassignDialog(true);
  };

  const handleConfirmReassign = () => {
    if (selectedDonation && newCause) {
      const updatedDonations = donations.map(d => 
        d.id === selectedDonation.id ? { ...d, cause: newCause } : d
      );
      setDonations(updatedDonations);
      toast.success(`Donation reassigned to ${newCause}`);
      setShowReassignDialog(false);
    }
  };

  const handleExportCSV = () => {
    // Convert donations to CSV format
    const headers = ['ID', 'Donor Name', 'Email', 'Amount', 'Currency', 'Payment Method', 'Cause', 'Date', 'Anonymous', 'Status'];
    const csvData = [
      headers.join(','),
      ...filteredDonations.map(d => [
        d.id,
        d.donor_name,
        d.donor_email,
        d.amount,
        d.currency,
        d.payment_method,
        d.cause,
        new Date(d.date).toLocaleDateString(),
        d.is_anonymous ? 'Yes' : 'No',
        d.status
      ].join(','))
    ].join('\n');
    
    // Create a blob and download link
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', `donations_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    toast.success('Donations exported to CSV');
  };

  const handleGenerateReport = () => {
    toast.success('Monthly financial report downloaded');
  };

  // Chart data preparation
  const preparePieChartData = () => {
    const causeData = causes.map(cause => {
      const amount = donations
        .filter(d => d.cause === cause.name && d.status === 'completed')
        .reduce((sum, d) => sum + d.amount, 0);
      
      return {
        name: cause.name,
        value: amount
      };
    });
    return causeData;
  };

  const prepareAnonymousPieData = () => {
    const anonymousAmount = donations
      .filter(d => d.is_anonymous && d.status === 'completed')
      .reduce((sum, d) => sum + d.amount, 0);
    
    const namedAmount = donations
      .filter(d => !d.is_anonymous && d.status === 'completed')
      .reduce((sum, d) => sum + d.amount, 0);
    
    return [
      { name: 'Anonymous', value: anonymousAmount },
      { name: 'Named', value: namedAmount }
    ];
  };

  const prepareTrendData = () => {
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    
    return months.map(month => {
      // In a real app, this would calculate actual donations per month
      // For demo purposes, using random values
      return {
        name: month,
        amount: Math.floor(Math.random() * 5000) + 1000
      };
    });
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'PPP');
  };

  // COLORS for charts
  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE'];

  const totalUnallocated = stats.totalAllTime - causes.reduce((sum, cause) => sum + cause.current_amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold text-empower-brown">Donation Management</h1>
        <div className="flex space-x-2">
          <Button onClick={handleExportCSV} variant="outline" className="hidden md:flex">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
          <Button onClick={() => setShowSettingsDialog(true)} variant="outline">
            <CreditCard className="mr-2 h-4 w-4" />
            Payment Settings
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">This Month</p>
                <p className="text-2xl font-bold">${stats.totalThisMonth.toLocaleString()}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">All Time</p>
                <p className="text-2xl font-bold">${stats.totalAllTime.toLocaleString()}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Donors</p>
                <p className="text-2xl font-bold">{stats.donorCount}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Average Donation</p>
                <p className="text-2xl font-bold">${stats.averageDonation.toFixed(2)}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
                <PieChart className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" onValueChange={setActiveTab} value={activeTab}>
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:w-[600px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="donations">Donations</TabsTrigger>
          <TabsTrigger value="causes">Causes</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Donation Trends Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Donation Trends</CardTitle>
                <CardDescription>Monthly donation amounts for the current year</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={prepareTrendData()}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="amount" 
                      name="Donation Amount" 
                      stroke="#8884d8" 
                      activeDot={{ r: 8 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 gap-6">
              {/* Distribution by Cause */}
              <Card>
                <CardHeader>
                  <CardTitle>Distribution by Cause</CardTitle>
                  <CardDescription>Percentage of donations by cause</CardDescription>
                </CardHeader>
                <CardContent className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={preparePieChartData()}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {preparePieChartData().map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Anonymous vs. Named */}
              <Card>
                <CardHeader>
                  <CardTitle>Anonymous vs. Named Donations</CardTitle>
                  <CardDescription>Comparison of donation types</CardDescription>
                </CardHeader>
                <CardContent className="h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={prepareAnonymousPieData()}
                        cx="50%"
                        cy="50%"
                        outerRadius={60}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        <Cell fill="#82ca9d" />
                        <Cell fill="#8884d8" />
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Financial Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Financial Summary</CardTitle>
              <CardDescription>Overview of fundraising status and goals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {causes.map((cause) => (
                  <div key={cause.id} className="space-y-2">
                    <div className="flex justify-between">
                      <div>
                        <span className="font-medium">{cause.name}</span>
                        <Badge className={`ml-2 ${cause.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                          {cause.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                      <span className="text-sm font-medium">
                        ${cause.current_amount.toLocaleString()} of ${cause.target_amount.toLocaleString()}
                      </span>
                    </div>
                    <Progress value={(cause.current_amount / cause.target_amount) * 100} className="h-2" />
                  </div>
                ))}

                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Unallocated Funds</span>
                    <span className="font-medium">${totalUnallocated.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button variant="outline" onClick={handleGenerateReport}>
                <FileText className="mr-2 h-4 w-4" />
                Generate Monthly Report
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Donations Tab */}
        <TabsContent value="donations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Donation Records</CardTitle>
              <CardDescription>View and manage all donation transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search donations..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </div>
                <div className="flex gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateFilter ? format(dateFilter, 'PPP') : <span>Filter by date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={dateFilter}
                        onSelect={handleDateSelect}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <Select value={selectedCause} onValueChange={handleCauseSelect}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by cause" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Causes</SelectItem>
                      {causes.map(cause => (
                        <SelectItem key={cause.id} value={cause.name}>{cause.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {(dateFilter || selectedCause !== 'all') && (
                    <Button variant="ghost" onClick={() => {
                      setDateFilter(undefined);
                      setSelectedCause('all');
                    }}>
                      <RefreshCw className="h-4 w-4" />
                      <span className="sr-only">Reset filters</span>
                    </Button>
                  )}
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Donor</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead className="hidden md:table-cell">Cause</TableHead>
                      <TableHead className="hidden md:table-cell">Date</TableHead>
                      <TableHead className="hidden lg:table-cell">Payment Method</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-4">
                          Loading donations...
                        </TableCell>
                      </TableRow>
                    ) : filteredDonations.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-4">
                          No donations found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredDonations.map((donation) => (
                        <TableRow key={donation.id}>
                          <TableCell>
                            <div className="font-medium">
                              {donation.is_anonymous ? 'Anonymous' : donation.donor_name}
                            </div>
                            <div className="text-sm text-muted-foreground">{donation.donor_email}</div>
                          </TableCell>
                          <TableCell className="font-medium">
                            {donation.currency} {donation.amount.toLocaleString()}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">{donation.cause}</TableCell>
                          <TableCell className="hidden md:table-cell">{formatDate(donation.date)}</TableCell>
                          <TableCell className="hidden lg:table-cell">{donation.payment_method}</TableCell>
                          <TableCell>
                            <Badge className={`${
                              donation.status === 'completed' ? 'bg-green-100 text-green-800' : 
                              donation.status === 'refunded' ? 'bg-red-100 text-red-800' : 
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <span className="sr-only">Open menu</span>
                                  <MoreVerticalIcon className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => handleContactDonor(donation.donor_email)}>
                                  <Mail className="mr-2 h-4 w-4" />
                                  Contact Donor
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleReassignDonation(donation)}>
                                  <Edit2 className="mr-2 h-4 w-4" />
                                  Reassign Cause
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem 
                                  onClick={() => handleStatusChange(donation, 'completed')}
                                  disabled={donation.status === 'completed'}
                                >
                                  <CheckIcon className="mr-2 h-4 w-4" />
                                  Mark as Completed
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onClick={() => handleStatusChange(donation, 'flagged')}
                                  disabled={donation.status === 'flagged'}
                                >
                                  <Flag className="mr-2 h-4 w-4" />
                                  Flag for Review
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onClick={() => handleStatusChange(donation, 'refunded')}
                                  disabled={donation.status === 'refunded'}
                                >
                                  <RefreshCw className="mr-2 h-4 w-4" />
                                  Mark as Refunded
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={() => handleDeleteDonation(donation)}
                                  className="text-red-600"
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">
                Showing {filteredDonations.length} of {donations.length} donations
              </div>
              <Button variant="outline" className="md:hidden" onClick={handleExportCSV}>
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Causes Tab */}
        <TabsContent value="causes" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Donation Causes</h2>
            <Button onClick={() => handleAddEditCause()}>
              <Plus className="mr-2 h-4 w-4" />
              Add New Cause
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {causes.map((cause) => (
              <Card key={cause.id} className={`overflow-hidden ${!cause.is_active && 'opacity-75'}`}>
                <div className="h-48 overflow-hidden">
                  <img 
                    src={cause.image_url} 
                    alt={cause.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{cause.name}</CardTitle>
                    <Badge className={cause.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                      {cause.is_active ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                  <CardDescription className="line-clamp-3">{cause.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>${cause.current_amount.toLocaleString()} of ${cause.target_amount.toLocaleString()}</span>
                    </div>
                    <Progress value={(cause.current_amount / cause.target_amount) * 100} className="h-2" />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => handleToggleCauseStatus(cause.id)}>
                    {cause.is_active ? 'Deactivate' : 'Activate'}
                  </Button>
                  <div className="flex space-x-2">
                    <Button variant="ghost" onClick={() => handleAddEditCause(cause)}>
                      <Edit2 className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button variant="ghost" className="text-red-600" onClick={() => handleDeleteCause(cause.id)}>
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Integration Settings</CardTitle>
              <CardDescription>Configure your payment gateways and donation options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Stripe Integration</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="stripe_public_key">Stripe Public Key</Label>
                    <Input 
                      id="stripe_public_key" 
                      type="text" 
                      placeholder="pk_test_..."
                      value="pk_test_51ABCD..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stripe_secret_key">Stripe Secret Key</Label>
                    <Input 
                      id="stripe_secret_key" 
                      type="password" 
                      placeholder="sk_test_..."
                      value="••••••••••••••••••••"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">PayPal Integration</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="paypal_client_id">PayPal Client ID</Label>
                    <Input 
                      id="paypal_client_id" 
                      type="text" 
                      placeholder="Client ID"
                      value="AQj3C0LX92AE..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="paypal_secret">PayPal Secret</Label>
                    <Input 
                      id="paypal_secret" 
                      type="password" 
                      placeholder="Secret"
                      value="••••••••••••••••••••"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Donation Settings</h3>
                <div className="space-y-2">
                  <Label htmlFor="suggested_amounts">Suggested Donation Amounts</Label>
                  <Input 
                    id="suggested_amounts" 
                    type="text" 
                    placeholder="10, 25, 50, 100"
                    value="10, 25, 50, 100"
                  />
                  <p className="text-sm text-muted-foreground">Comma-separated list of suggested donation amounts</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setShowEmailTemplateDialog(true)}>
                Edit Email Templates
              </Button>
              <Button>Save Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Contact Donor Dialog */}
      <Dialog open={showEmailDialog} onOpenChange={setShowEmailDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Contact Donor</DialogTitle>
            <DialogDescription>
              Send an email to the donor regarding their donation.
            </DialogDescription>
          </DialogHeader>
          <Form {...emailForm}>
            <form onSubmit={emailForm.handleSubmit(handleSendEmail)} className="space-y-4">
              <FormField
                control={emailForm.control}
                name="to"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>To</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={emailForm.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Thank you for your donation" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={emailForm.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea 
                        {...field} 
                        placeholder="Enter your message here..." 
                        className="min-h-[150px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">
                  <Send className="mr-2 h-4 w-4" />
                  Send Email
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Add/Edit Cause Dialog */}
      <Dialog open={showCauseDialog} onOpenChange={setShowCauseDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{selectedCause2 ? 'Edit Cause' : 'Add New Cause'}</DialogTitle>
            <DialogDescription>
              {selectedCause2 
                ? 'Update the details for this donation cause.' 
                : 'Create a new donation cause for your organization.'}
            </DialogDescription>
          </DialogHeader>
          <Form {...causeForm}>
            <form onSubmit={causeForm.handleSubmit(handleSubmitCause)} className="space-y-4">
              <FormField
                control={causeForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Education Fund" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={causeForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        {...field} 
                        placeholder="Describe this cause..." 
                        className="min-h-[100px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={causeForm.control}
                  name="target_amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Target Amount ($)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          {...field}
                          onChange={e => field.onChange(parseFloat(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={causeForm.control}
                  name="image_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URL</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="https://example.com/image.jpg" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={causeForm.control}
                name="is_active"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Active</FormLabel>
                      <FormDescription>
                        This cause will be visible to users and accept donations
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowCauseDialog(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {selectedCause2 ? 'Update Cause' : 'Create Cause'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Reassign Dialog */}
      <Dialog open={showReassignDialog} onOpenChange={setShowReassignDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Reassign Donation</DialogTitle>
            <DialogDescription>
              Move this donation to a different cause.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {selectedDonation && (
              <div className="mb-4 p-3 bg-gray-50 rounded-md">
                <p className="text-sm font-medium">Original donation details:</p>
                <p className="text-sm">Donor: {selectedDonation.donor_name}</p>
                <p className="text-sm">Amount: {selectedDonation.currency} {selectedDonation.amount}</p>
                <p className="text-sm">Current Cause: {selectedDonation.cause}</p>
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="new-cause">Select New Cause</Label>
              <Select value={newCause} onValueChange={setNewCause}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a cause" />
                </SelectTrigger>
                <SelectContent>
                  {causes.map(cause => (
                    <SelectItem key={cause.id} value={cause.name}>{cause.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowReassignDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirmReassign} disabled={!newCause}>
              Reassign Donation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Email Template Dialog */}
      <Dialog open={showEmailTemplateDialog} onOpenChange={setShowEmailTemplateDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Email Templates</DialogTitle>
            <DialogDescription>
              Customize the email templates sent to donors
            </DialogDescription>
          </DialogHeader>
          <Form {...emailTemplateForm}>
            <form onSubmit={emailTemplateForm.handleSubmit(handleSaveEmailTemplate)} className="space-y-4">
              <div className="space-y-2">
                <FormField
                  control={emailTemplateForm.control}
                  name="subject_template"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Donation Receipt Subject</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>
                        Available variables: {{'{{'}}name{{'}}'}}, {{'{{'}}amount{{'}}'}}, {{'{{'}}currency{{'}}'}}, {{'{{'}}cause{{'}}'}}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <FormField
                  control={emailTemplateForm.control}
                  name="body_template"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Donation Receipt Email Body</FormLabel>
                      <FormControl>
                        <Textarea {...field} className="min-h-[200px]" />
                      </FormControl>
                      <FormDescription>
                        Available variables: {{'{{'}}name{{'}}'}}, {{'{{'}}amount{{'}}'}}, {{'{{'}}currency{{'}}'}}, {{'{{'}}cause{{'}}'}}, {{'{{'}}date{{'}}'}}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter>
                <Button type="submit">Save Template</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DonationManagement;
