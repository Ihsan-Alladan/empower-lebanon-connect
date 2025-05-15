
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar,
  Download,
  Filter,
  Mail,
  Flag,
  RefreshCcw,
  ArrowUpDown,
  ChevronDown,
  Check,
  ChevronsUpDown,
  Plus,
  Trash,
  PieChart,
  BarChart,
  DollarSign,
  Users,
  Settings,
  Edit,
  ChevronRight,
  X,
  Save
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { format } from 'date-fns';
import { Donation, DonationCause, DonationStatistics, Currency, PaymentMethod, DonationStatus } from '@/types/donation';

import {
  ResponsiveContainer,
  PieChart as RechartPieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

// Sample data - in a real application, this would come from an API
const SAMPLE_DONATIONS: Donation[] = [
  {
    id: "1",
    donor_name: "Alice Smith",
    donor_email: "alice@example.com",
    amount: 50,
    currency: "USD",
    payment_method: "Credit Card",
    cause: "Women's Education Fund",
    date: "2025-05-01",
    is_anonymous: false,
    status: "completed",
    created_at: "2025-05-01T10:30:00Z"
  },
  {
    id: "2",
    donor_name: "Anonymous",
    donor_email: "bob@example.com",
    amount: 100,
    currency: "USD",
    payment_method: "PayPal",
    cause: "Community Garden Project",
    date: "2025-05-05",
    is_anonymous: true,
    status: "completed",
    created_at: "2025-05-05T14:22:00Z"
  },
  {
    id: "3",
    donor_name: "Charlie Brown",
    donor_email: "charlie@example.com",
    amount: 25,
    currency: "EUR",
    payment_method: "Bank Transfer",
    cause: "Tech Education for Girls",
    date: "2025-05-08",
    is_anonymous: false,
    status: "pending",
    created_at: "2025-05-08T09:45:00Z"
  },
  {
    id: "4",
    donor_name: "Diana Prince",
    donor_email: "diana@example.com",
    amount: 200,
    currency: "USD",
    payment_method: "Credit Card",
    cause: "Women's Education Fund",
    date: "2025-05-10",
    is_anonymous: false,
    status: "completed",
    created_at: "2025-05-10T16:15:00Z"
  },
  {
    id: "5",
    donor_name: "Anonymous",
    donor_email: "emma@example.com",
    amount: 75,
    currency: "GBP",
    payment_method: "PayPal",
    cause: "Community Garden Project",
    date: "2025-05-12",
    is_anonymous: true,
    status: "completed",
    created_at: "2025-05-12T11:30:00Z"
  },
  {
    id: "6",
    donor_name: "Frank Castle",
    donor_email: "frank@example.com",
    amount: 35,
    currency: "USD",
    payment_method: "Credit Card",
    cause: "Tech Education for Girls",
    date: "2025-05-14",
    is_anonymous: false,
    status: "flagged",
    created_at: "2025-05-14T13:20:00Z"
  },
  {
    id: "7",
    donor_name: "George Banks",
    donor_email: "george@example.com",
    amount: 150,
    currency: "CAD",
    payment_method: "Bank Transfer",
    cause: "Women's Education Fund",
    date: "2025-04-25",
    is_anonymous: false,
    status: "completed",
    created_at: "2025-04-25T10:10:00Z"
  },
  {
    id: "8",
    donor_name: "Helen Troy",
    donor_email: "helen@example.com",
    amount: 65,
    currency: "USD",
    payment_method: "Credit Card",
    cause: "Community Garden Project",
    date: "2025-04-20",
    is_anonymous: false,
    status: "refunded",
    created_at: "2025-04-20T09:30:00Z",
    message: "Supporting the community!"
  },
  {
    id: "9",
    donor_name: "Anonymous",
    donor_email: "ian@example.com",
    amount: 120,
    currency: "AUD",
    payment_method: "PayPal",
    cause: "Tech Education for Girls",
    date: "2025-04-15",
    is_anonymous: true,
    status: "completed",
    created_at: "2025-04-15T14:45:00Z",
    message: "Keep up the great work!"
  },
  {
    id: "10",
    donor_name: "Julia Roberts",
    donor_email: "julia@example.com",
    amount: 250,
    currency: "USD",
    payment_method: "Credit Card",
    cause: "Women's Education Fund",
    date: "2025-04-10",
    is_anonymous: false,
    status: "completed",
    created_at: "2025-04-10T16:00:00Z",
    message: "Education is empowerment!"
  }
];

const SAMPLE_CAUSES: DonationCause[] = [
  {
    id: "1",
    name: "Women's Education Fund",
    description: "Supporting educational opportunities for women in underserved communities.",
    target_amount: 10000,
    current_amount: 5250,
    image_url: "/lovable-uploads/main5.jpg",
    is_active: true
  },
  {
    id: "2",
    name: "Community Garden Project",
    description: "Creating sustainable community gardens in urban areas.",
    target_amount: 5000,
    current_amount: 2890,
    image_url: "/lovable-uploads/handmade2.png",
    is_active: true
  },
  {
    id: "3",
    name: "Tech Education for Girls",
    description: "Providing resources for girls interested in STEM fields.",
    target_amount: 7500,
    current_amount: 3450,
    image_url: "/lovable-uploads/technologyW.jpg",
    is_active: true
  }
];

// Statistics sample data
const getStatistics = (donations: Donation[]): DonationStatistics => {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  
  const thisMonthDonations = donations.filter(donation => {
    const donationDate = new Date(donation.date);
    return donationDate.getMonth() === currentMonth && 
           donationDate.getFullYear() === currentYear &&
           donation.status === "completed";
  });
  
  const totalThisMonth = thisMonthDonations.reduce((sum, donation) => sum + donation.amount, 0);
  const totalAllTime = donations
    .filter(donation => donation.status === "completed")
    .reduce((sum, donation) => sum + donation.amount, 0);
  
  const uniqueDonors = new Set(donations
    .filter(donation => donation.status === "completed")
    .map(donation => donation.donor_email)
  );
  
  const donorCount = uniqueDonors.size;
  
  const averageDonation = totalAllTime / donations.filter(d => d.status === "completed").length;
  
  // Monthly trends (last 6 months)
  const monthlyTrends: { month: string, amount: number }[] = [];
  for (let i = 5; i >= 0; i--) {
    const monthDate = new Date(currentYear, currentMonth - i, 1);
    const monthName = format(monthDate, 'MMM');
    
    const monthDonations = donations.filter(donation => {
      const donationDate = new Date(donation.date);
      return donationDate.getMonth() === monthDate.getMonth() && 
             donationDate.getFullYear() === monthDate.getFullYear() &&
             donation.status === "completed";
    });
    
    const monthTotal = monthDonations.reduce((sum, donation) => sum + donation.amount, 0);
    monthlyTrends.push({ month: monthName, amount: monthTotal });
  }
  
  // Cause distribution
  const causeDistribution = SAMPLE_CAUSES.map(cause => {
    const causeTotal = donations
      .filter(donation => donation.cause === cause.name && donation.status === "completed")
      .reduce((sum, donation) => sum + donation.amount, 0);
    
    return { cause: cause.name, amount: causeTotal };
  });
  
  // Anonymous percentage
  const anonymousDonations = donations.filter(d => d.is_anonymous && d.status === "completed").length;
  const completedDonations = donations.filter(d => d.status === "completed").length;
  const anonymousPercentage = completedDonations > 0 ? (anonymousDonations / completedDonations) * 100 : 0;
  
  return {
    totalThisMonth,
    totalAllTime,
    donorCount,
    averageDonation,
    monthlyTrends,
    causeDistribution,
    anonymousPercentage
  };
};

const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];

interface ContactDonorFormProps {
  donor: Donation;
  onClose: () => void;
}

const ContactDonorForm: React.FC<ContactDonorFormProps> = ({ donor, onClose }) => {
  const [subject, setSubject] = useState(`Thank you for your donation to ${donor.cause}`);
  const [message, setMessage] = useState(`Dear ${donor.is_anonymous ? 'Donor' : donor.donor_name},\n\nThank you for your generous donation of ${donor.currency} ${donor.amount} to our ${donor.cause} initiative. Your support makes a real difference.\n\nBest regards,\nEmpowEra Team`);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Email sent to ${donor.donor_email}`);
    onClose();
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="recipient">To</Label>
        <Input id="recipient" value={donor.donor_email} disabled />
      </div>
      <div className="space-y-2">
        <Label htmlFor="subject">Subject</Label>
        <Input id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea 
          id="message" 
          value={message} 
          onChange={(e) => setMessage(e.target.value)}
          className="min-h-[200px]"
        />
      </div>
      <div className="flex justify-end space-x-2">
        <Button variant="outline" type="button" onClick={onClose}>Cancel</Button>
        <Button type="submit">Send Email</Button>
      </div>
    </form>
  );
};

interface CauseFormProps {
  cause?: DonationCause;
  onSave: (cause: Partial<DonationCause>) => void;
  onClose: () => void;
}

const CauseForm: React.FC<CauseFormProps> = ({ cause, onSave, onClose }) => {
  const isEditing = !!cause;
  const [formData, setFormData] = useState({
    name: cause?.name || '',
    description: cause?.description || '',
    target_amount: cause?.target_amount || 0,
    image_url: cause?.image_url || '',
    is_active: cause?.is_active ?? true
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'number') {
      setFormData(prev => ({ ...prev, [name]: parseFloat(value) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const handleSwitchChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, is_active: checked }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: cause?.id || `new-${Date.now()}`
    });
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Cause Name</Label>
        <Input 
          id="name" 
          name="name"
          value={formData.name} 
          onChange={handleChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea 
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="target_amount">Target Amount</Label>
        <Input 
          id="target_amount"
          name="target_amount"
          type="number"
          min="0"
          step="0.01"
          value={formData.target_amount} 
          onChange={handleChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="image_url">Image URL</Label>
        <Input 
          id="image_url"
          name="image_url"
          value={formData.image_url} 
          onChange={handleChange}
          placeholder="/images/your-image.jpg"
        />
      </div>
      <div className="flex items-center space-x-2">
        <Switch 
          id="is_active"
          checked={formData.is_active}
          onCheckedChange={handleSwitchChange}
        />
        <Label htmlFor="is_active">Active</Label>
      </div>
      <div className="flex justify-end space-x-2">
        <Button variant="outline" type="button" onClick={onClose}>Cancel</Button>
        <Button type="submit">{isEditing ? 'Update' : 'Create'}</Button>
      </div>
    </form>
  );
};

const DonationManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [donations, setDonations] = useState<Donation[]>(SAMPLE_DONATIONS);
  const [causes, setCauses] = useState<DonationCause[]>(SAMPLE_CAUSES);
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null);
  const [selectedCause, setSelectedCause] = useState<DonationCause | null>(null);
  const [showContactDialog, setShowContactDialog] = useState(false);
  const [showCauseDialog, setShowCauseDialog] = useState(false);
  const [sortColumn, setSortColumn] = useState<keyof Donation>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState<{ start: string, end: string }>({
    start: '',
    end: ''
  });
  const [statusFilter, setStatusFilter] = useState<DonationStatus | 'all'>('all');
  const [causeFilter, setCauseFilter] = useState<string>('all');
  
  const statistics = getStatistics(donations);
  
  // Sort and filter donations
  const filteredDonations = donations.filter(donation => {
    // Search query filter
    const matchesSearch = searchQuery === '' || 
      donation.donor_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donation.donor_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donation.cause.toLowerCase().includes(searchQuery.toLowerCase());
      
    // Date range filter
    let withinDateRange = true;
    if (dateRange.start && dateRange.end) {
      const donationDate = new Date(donation.date);
      const startDate = new Date(dateRange.start);
      const endDate = new Date(dateRange.end);
      endDate.setHours(23, 59, 59); // Include the entire end day
      
      withinDateRange = donationDate >= startDate && donationDate <= endDate;
    }
    
    // Status filter
    const matchesStatus = statusFilter === 'all' || donation.status === statusFilter;
    
    // Cause filter
    const matchesCause = causeFilter === 'all' || donation.cause === causeFilter;
    
    return matchesSearch && withinDateRange && matchesStatus && matchesCause;
  });
  
  const sortedDonations = [...filteredDonations].sort((a, b) => {
    let valueA: string | number | boolean = a[sortColumn];
    let valueB: string | number | boolean = b[sortColumn];
    
    if (typeof valueA === 'string' && typeof valueB === 'string') {
      valueA = valueA.toLowerCase();
      valueB = valueB.toLowerCase();
    }
    
    if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1;
    if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });
  
  const handleSort = (column: keyof Donation) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };
  
  const resetFilters = () => {
    setSearchQuery('');
    setDateRange({ start: '', end: '' });
    setStatusFilter('all');
    setCauseFilter('all');
  };
  
  const handleRefundDonation = (donationId: string) => {
    setDonations(donations.map(donation => 
      donation.id === donationId 
        ? { ...donation, status: 'refunded' as DonationStatus } 
        : donation
    ));
    toast.success("Donation has been refunded");
  };
  
  const handleFlagDonation = (donationId: string) => {
    setDonations(donations.map(donation => 
      donation.id === donationId 
        ? { ...donation, status: 'flagged' as DonationStatus } 
        : donation
    ));
    toast.success("Donation has been flagged for review");
  };
  
  const handleChangeCause = (donationId: string, newCause: string) => {
    setDonations(donations.map(donation => 
      donation.id === donationId 
        ? { ...donation, cause: newCause } 
        : donation
    ));
    toast.success("Donation cause has been updated");
  };
  
  const handleDeleteCause = (causeId: string) => {
    setCauses(causes.filter(cause => cause.id !== causeId));
    toast.success("Cause has been deleted");
  };
  
  const handleSaveCause = (causeData: Partial<DonationCause>) => {
    if (!causeData.id) return;
    
    const existingIndex = causes.findIndex(c => c.id === causeData.id);
    
    if (existingIndex >= 0) {
      // Update existing cause
      const updatedCauses = [...causes];
      updatedCauses[existingIndex] = { ...updatedCauses[existingIndex], ...causeData } as DonationCause;
      setCauses(updatedCauses);
      toast.success("Cause has been updated");
    } else {
      // Add new cause
      setCauses([...causes, causeData as DonationCause]);
      toast.success("New cause has been created");
    }
    
    setShowCauseDialog(false);
  };
  
  const handleExportCSV = () => {
    const headers = ['ID', 'Donor Name', 'Email', 'Amount', 'Currency', 'Payment Method', 
      'Cause', 'Date', 'Anonymous', 'Status', 'Message'];
    
    const csvContent = [
      headers.join(','),
      ...sortedDonations.map(d => [
        d.id,
        `"${d.donor_name}"`,
        d.donor_email,
        d.amount,
        d.currency,
        `"${d.payment_method}"`,
        `"${d.cause}"`,
        d.date,
        d.is_anonymous,
        d.status,
        d.message ? `"${d.message.replace(/"/g, '""')}"` : ''
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `donations-export-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("CSV export started");
  };

  // Overview statistics section
  const renderOverviewTab = () => (
    <div className="space-y-8">
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              This Month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="text-2xl font-bold">
                ${statistics.totalThisMonth.toLocaleString()}
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              All Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="text-2xl font-bold">
                ${statistics.totalAllTime.toLocaleString()}
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Donors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="text-2xl font-bold">
                {statistics.donorCount}
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Average Donation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="text-2xl font-bold">
                ${statistics.averageDonation.toFixed(2)}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Monthly Trends</CardTitle>
            <CardDescription>Donation amounts over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={statistics.monthlyTrends}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Amount']}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="amount" 
                    name="Donations" 
                    stroke="#8884d8" 
                    activeDot={{ r: 8 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-rows-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Cause Distribution</CardTitle>
              <CardDescription>Breakdown by donation cause</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartPieChart>
                    <Pie
                      data={statistics.causeDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="amount"
                      nameKey="cause"
                      label={({ cause, percent }) => `${cause}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {statistics.causeDistribution?.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value, name, props) => [
                        `$${Number(value).toLocaleString()}`, 
                        props.payload.cause
                      ]} 
                    />
                  </RechartPieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Anonymous vs. Named</CardTitle>
              <CardDescription>Percentage of anonymous donations</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center items-center h-52">
              <div className="relative flex items-center justify-center w-40 h-40">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  {/* Background circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#e6e6e6"
                    strokeWidth="10"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#FF6384"
                    strokeWidth="10"
                    strokeDasharray={`${statistics.anonymousPercentage ? statistics.anonymousPercentage * 2.83 : 0} 283`}
                    strokeDashoffset="0"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-4xl font-bold">{statistics.anonymousPercentage?.toFixed(0)}%</span>
                  <span className="text-sm text-muted-foreground">Anonymous</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Recent donations */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Donations</CardTitle>
          <CardDescription>Latest 5 donations received</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {donations.slice(0, 5).map(donation => (
              <div 
                key={donation.id} 
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    {donation.is_anonymous ? 
                      <Users className="h-5 w-5 text-gray-500" /> : 
                      <span className="font-medium text-lg">{donation.donor_name.charAt(0)}</span>
                    }
                  </div>
                  <div>
                    <p className="font-medium">{donation.is_anonymous ? "Anonymous" : donation.donor_name}</p>
                    <p className="text-sm text-muted-foreground">
                      {donation.cause} • {format(new Date(donation.date), 'MMM d, yyyy')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Badge className={
                    donation.status === "completed" ? "bg-green-500" :
                    donation.status === "pending" ? "bg-yellow-500" :
                    donation.status === "refunded" ? "bg-red-500" :
                    "bg-gray-500"
                  }>
                    {donation.status}
                  </Badge>
                  <span className="ml-4 font-semibold">
                    {donation.currency} {donation.amount}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full" onClick={() => setActiveTab('donations')}>
            View All Donations
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
  
  // Donations list and management
  const renderDonationsTab = () => (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle>All Donations</CardTitle>
            <CardDescription>Manage and filter donation records</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={handleExportCSV} variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Filter Options</DropdownMenuLabel>
                <DropdownMenuSeparator />
                
                <div className="px-2 py-1.5">
                  <Label htmlFor="startDate" className="text-xs">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={dateRange.start}
                    onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                    className="h-8 mt-1"
                  />
                </div>
                
                <div className="px-2 py-1.5">
                  <Label htmlFor="endDate" className="text-xs">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={dateRange.end}
                    onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                    className="h-8 mt-1"
                  />
                </div>
                
                <DropdownMenuSeparator />
                
                <div className="px-2 py-1.5">
                  <Label htmlFor="statusFilter" className="text-xs">Status</Label>
                  <Select 
                    value={statusFilter} 
                    onValueChange={(value) => setStatusFilter(value as DonationStatus | 'all')}
                  >
                    <SelectTrigger id="statusFilter" className="h-8 mt-1">
                      <SelectValue placeholder="All Statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="refunded">Refunded</SelectItem>
                      <SelectItem value="flagged">Flagged</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="px-2 py-1.5">
                  <Label htmlFor="causeFilter" className="text-xs">Cause</Label>
                  <Select 
                    value={causeFilter} 
                    onValueChange={(value) => setCauseFilter(value)}
                  >
                    <SelectTrigger id="causeFilter" className="h-8 mt-1">
                      <SelectValue placeholder="All Causes" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Causes</SelectItem>
                      {causes.map(cause => (
                        <SelectItem key={cause.id} value={cause.name}>
                          {cause.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <DropdownMenuSeparator />
                
                <div className="px-2 py-1.5">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={resetFilters}
                    className="w-full"
                  >
                    Reset Filters
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="mt-3">
          <Input 
            placeholder="Search donations..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th 
                    className="h-10 px-4 text-left align-middle font-medium cursor-pointer"
                    onClick={() => handleSort('donor_name')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Donor</span>
                      {sortColumn === 'donor_name' && (
                        <ArrowUpDown className="h-4 w-4" />
                      )}
                    </div>
                  </th>
                  <th 
                    className="h-10 px-4 text-left align-middle font-medium cursor-pointer"
                    onClick={() => handleSort('amount')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Amount</span>
                      {sortColumn === 'amount' && (
                        <ArrowUpDown className="h-4 w-4" />
                      )}
                    </div>
                  </th>
                  <th 
                    className="h-10 px-4 text-left align-middle font-medium cursor-pointer"
                    onClick={() => handleSort('cause')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Cause</span>
                      {sortColumn === 'cause' && (
                        <ArrowUpDown className="h-4 w-4" />
                      )}
                    </div>
                  </th>
                  <th 
                    className="h-10 px-4 text-left align-middle font-medium cursor-pointer"
                    onClick={() => handleSort('date')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Date</span>
                      {sortColumn === 'date' && (
                        <ArrowUpDown className="h-4 w-4" />
                      )}
                    </div>
                  </th>
                  <th 
                    className="h-10 px-4 text-left align-middle font-medium cursor-pointer"
                    onClick={() => handleSort('status')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Status</span>
                      {sortColumn === 'status' && (
                        <ArrowUpDown className="h-4 w-4" />
                      )}
                    </div>
                  </th>
                  <th className="h-10 px-4 text-right align-middle font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {sortedDonations.length > 0 ? (
                  sortedDonations.map(donation => (
                    <tr 
                      key={donation.id}
                      className="border-b transition-colors hover:bg-muted/50"
                    >
                      <td className="p-4 align-middle">
                        <div>
                          <p className="font-medium">
                            {donation.is_anonymous ? "Anonymous" : donation.donor_name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {donation.donor_email}
                          </p>
                        </div>
                      </td>
                      <td className="p-4 align-middle">
                        <div>
                          <p className="font-medium">
                            {donation.currency} {donation.amount}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {donation.payment_method}
                          </p>
                        </div>
                      </td>
                      <td className="p-4 align-middle">
                        {donation.cause}
                      </td>
                      <td className="p-4 align-middle">
                        {format(new Date(donation.date), 'MMM d, yyyy')}
                      </td>
                      <td className="p-4 align-middle">
                        <Badge className={
                          donation.status === "completed" ? "bg-green-500" :
                          donation.status === "pending" ? "bg-yellow-500" :
                          donation.status === "refunded" ? "bg-red-500" :
                          "bg-gray-500"
                        }>
                          {donation.status}
                        </Badge>
                      </td>
                      <td className="p-4 align-middle text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVerticalIcon className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedDonation(donation);
                                setShowContactDialog(true);
                              }}
                            >
                              <Mail className="mr-2 h-4 w-4" />
                              <span>Contact Donor</span>
                            </DropdownMenuItem>
                            
                            <DropdownMenuItem disabled={donation.status !== 'completed'}
                              onClick={() => donation.status === 'completed' && handleRefundDonation(donation.id)}
                            >
                              <RefreshCcw className="mr-2 h-4 w-4" />
                              <span>Refund</span>
                            </DropdownMenuItem>
                            
                            <DropdownMenuItem disabled={donation.status !== 'completed'}
                              onClick={() => donation.status === 'completed' && handleFlagDonation(donation.id)}
                            >
                              <Flag className="mr-2 h-4 w-4" />
                              <span>Flag as Suspicious</span>
                            </DropdownMenuItem>
                            
                            <DropdownMenuSeparator />
                            
                            <DropdownMenuLabel>Change Cause</DropdownMenuLabel>
                            {causes.map(cause => (
                              <DropdownMenuItem 
                                key={cause.id}
                                onClick={() => handleChangeCause(donation.id, cause.name)}
                              >
                                {donation.cause === cause.name && (
                                  <Check className="mr-2 h-4 w-4" />
                                )}
                                <span className={donation.cause !== cause.name ? "ml-6" : ""}>
                                  {cause.name}
                                </span>
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="h-24 text-center">
                      No donations found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-xs text-muted-foreground">
          Showing {sortedDonations.length} of {donations.length} donations
        </div>
        {/* Simple pagination could go here */}
      </CardFooter>
    </Card>
  );
  
  // Causes management
  const renderCausesTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Donation Causes</h2>
        <Dialog open={showCauseDialog} onOpenChange={setShowCauseDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New Cause
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>
                {selectedCause ? 'Edit Donation Cause' : 'Create New Donation Cause'}
              </DialogTitle>
              <DialogDescription>
                {selectedCause ? 'Update the details for this donation cause' : 'Add a new cause for donations'}
              </DialogDescription>
            </DialogHeader>
            <CauseForm 
              cause={selectedCause || undefined}
              onSave={handleSaveCause}
              onClose={() => {
                setSelectedCause(null);
                setShowCauseDialog(false);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {causes.map(cause => (
          <Card key={cause.id} className="overflow-hidden">
            <div className="aspect-video w-full overflow-hidden">
              <img 
                src={cause.image_url || '/placeholder.svg'} 
                alt={cause.name}
                className="object-cover w-full h-full"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/placeholder.svg';
                }}
              />
            </div>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{cause.name}</CardTitle>
                {cause.is_active ? (
                  <Badge>Active</Badge>
                ) : (
                  <Badge variant="outline">Inactive</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-3">
                {cause.description}
              </p>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">
                    ${cause.current_amount.toLocaleString()} of ${cause.target_amount.toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2.5">
                  <div 
                    className="bg-primary h-2.5 rounded-full" 
                    style={{ width: `${Math.min(100, Math.round((cause.current_amount / cause.target_amount) * 100))}%` }}
                  />
                </div>
                <div className="text-xs text-right text-muted-foreground">
                  {Math.round((cause.current_amount / cause.target_amount) * 100)}%
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline" size="sm"
                onClick={() => {
                  setSelectedCause(cause);
                  setShowCauseDialog(true);
                }}
              >
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
              <Button variant="outline" size="sm" 
                onClick={() => handleDeleteCause(cause.id)}
              >
                <Trash className="h-4 w-4 mr-1" />
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {causes.length === 0 && (
        <div className="text-center py-10">
          <div className="text-muted-foreground mb-4">No causes found</div>
          <Button 
            variant="outline"
            onClick={() => {
              setSelectedCause(null);
              setShowCauseDialog(true);
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Your First Cause
          </Button>
        </div>
      )}
    </div>
  );
  
  // Settings tab
  const renderSettingsTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Payment Integrations</CardTitle>
          <CardDescription>Configure payment gateways for donation processing</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-md bg-muted">
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <path 
                      fill="currentColor" 
                      d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Stripe</h3>
                  <p className="text-sm text-muted-foreground">Credit card and direct debit processing</p>
                </div>
              </div>
              <Switch id="stripe" defaultChecked />
            </div>
            
            <div>
              <Label htmlFor="stripe_key">API Key</Label>
              <div className="flex gap-2 mt-1.5">
                <Input id="stripe_key" type="password" value="sk_test_•••••••••••••••••••••••••" readOnly className="flex-1" />
                <Button variant="outline" size="sm">Change</Button>
              </div>
            </div>
            
            <div>
              <Label htmlFor="stripe_webhook">Webhook Secret</Label>
              <div className="flex gap-2 mt-1.5">
                <Input id="stripe_webhook" type="password" value="whsec_••••••••••••••••••••••" readOnly className="flex-1" />
                <Button variant="outline" size="sm">Change</Button>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-md bg-muted">
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <path 
                      fill="currentColor" 
                      d="M12.001 4c-2.761 0-5 2.24-5 5v3h-2v7c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-7h-2V9c0-2.761-2.238-5-5-5zm0 2a3 3 0 0 1 3 3v3h-6V9a3 3 0 0 1 3-3z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">PayPal</h3>
                  <p className="text-sm text-muted-foreground">PayPal Express Checkout</p>
                </div>
              </div>
              <Switch id="paypal" />
            </div>
            
            <div>
              <Label htmlFor="paypal_client">Client ID</Label>
              <div className="flex gap-2 mt-1.5">
                <Input id="paypal_client" placeholder="PayPal Client ID" className="flex-1" />
                <Button variant="outline" size="sm">Verify</Button>
              </div>
            </div>
            
            <div>
              <Label htmlFor="paypal_secret">Client Secret</Label>
              <div className="flex gap-2 mt-1.5">
                <Input id="paypal_secret" type="password" placeholder="PayPal Client Secret" className="flex-1" />
                <Button variant="outline" size="sm">Verify</Button>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button>Save Payment Settings</Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Donation Page Configuration</CardTitle>
          <CardDescription>Customize your donation collection process</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-medium">Suggested Donation Amounts</h3>
            <p className="text-sm text-muted-foreground">Set predefined donation amount options for donors</p>
            
            <div className="flex flex-wrap gap-2">
              {[10, 25, 50, 100, 250].map(amount => (
                <div key={amount} className="flex items-center">
                  <Badge className="flex items-center gap-1">
                    ${amount}
                    <X className="h-3 w-3 cursor-pointer" />
                  </Badge>
                </div>
              ))}
              <Badge variant="outline" className="cursor-pointer">
                <Plus className="h-3 w-3 mr-1" />
                Add
              </Badge>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium">Email Templates</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Donation Receipt</Label>
                <Button variant="ghost" size="sm">Edit</Button>
              </div>
              <div className="flex justify-between items-center">
                <Label>Thank You Email</Label>
                <Button variant="ghost" size="sm">Edit</Button>
              </div>
              <div className="flex justify-between items-center">
                <Label>Monthly Summary</Label>
                <Button variant="ghost" size="sm">Edit</Button>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Allow Anonymous Donations</h3>
                <p className="text-sm text-muted-foreground">Let donors hide their identity</p>
              </div>
              <Switch id="anonymous" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Allow Monthly Recurring</h3>
                <p className="text-sm text-muted-foreground">Enable monthly subscription donations</p>
              </div>
              <Switch id="recurring" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Allow Donor Comments</h3>
                <p className="text-sm text-muted-foreground">Let donors leave messages with their donations</p>
              </div>
              <Switch id="comments" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Display Donor Wall</h3>
                <p className="text-sm text-muted-foreground">Show list of recent donors on donation page</p>
              </div>
              <Switch id="donor_wall" defaultChecked />
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <div className="flex gap-2">
            <Button>Save Settings</Button>
            <Button variant="outline">Preview Donation Page</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex flex-col md:flex-row justify-between md:items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Donation Management</h1>
          <p className="text-muted-foreground">
            Monitor donation activities and manage fundraising causes.
          </p>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 md:w-fit">
          <TabsTrigger value="overview">
            <BarChart className="h-4 w-4 mr-2 hidden md:inline-block" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="donations">
            <DollarSign className="h-4 w-4 mr-2 hidden md:inline-block" />
            Donations
          </TabsTrigger>
          <TabsTrigger value="causes">
            <PieChart className="h-4 w-4 mr-2 hidden md:inline-block" />
            Causes
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="h-4 w-4 mr-2 hidden md:inline-block" />
            Settings
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          {renderOverviewTab()}
        </TabsContent>
        
        <TabsContent value="donations" className="space-y-4">
          {renderDonationsTab()}
        </TabsContent>
        
        <TabsContent value="causes" className="space-y-4">
          {renderCausesTab()}
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-4">
          {renderSettingsTab()}
        </TabsContent>
      </Tabs>
      
      {/* Contact Donor Dialog */}
      <Dialog open={showContactDialog} onOpenChange={setShowContactDialog}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Contact Donor</DialogTitle>
            <DialogDescription>
              Send an email to the donor regarding their donation.
            </DialogDescription>
          </DialogHeader>
          {selectedDonation && (
            <ContactDonorForm 
              donor={selectedDonation} 
              onClose={() => {
                setSelectedDonation(null);
                setShowContactDialog(false);
              }} 
            />
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default DonationManagement;
