import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Search, 
  Edit, 
  Trash2, 
  CheckCircle, 
  XCircle,
  UserCheck,
  Undo,
  Send
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

// Mock data for users
const initialUsers = [
  { 
    id: 1, 
    name: 'John Doe', 
    email: 'john@example.com', 
    role: 'customer', 
    status: 'active', 
    createdAt: '2024-04-15'
  },
  { 
    id: 2, 
    name: 'Sarah Smith', 
    email: 'sarah@example.com', 
    role: 'instructor', 
    status: 'pending', 
    createdAt: '2024-04-12'
  },
  { 
    id: 3, 
    name: 'Michael Johnson', 
    email: 'michael@example.com', 
    role: 'customer', 
    status: 'active', 
    createdAt: '2024-04-10'
  },
  { 
    id: 4, 
    name: 'Emily Williams', 
    email: 'emily@example.com', 
    role: 'donor', 
    status: 'active', 
    createdAt: '2024-04-05'
  },
  { 
    id: 5, 
    name: 'David Brown', 
    email: 'david@example.com', 
    role: 'instructor', 
    status: 'pending', 
    createdAt: '2024-04-01'
  },
  { 
    id: 6, 
    name: 'Lisa Miller', 
    email: 'lisa@example.com', 
    role: 'customer', 
    status: 'active', 
    createdAt: '2024-03-28'
  },
  { 
    id: 7, 
    name: 'Robert Wilson', 
    email: 'robert@example.com', 
    role: 'donor', 
    status: 'active', 
    createdAt: '2024-03-25'
  },
  { 
    id: 8, 
    name: 'Jessica Davis', 
    email: 'jessica@example.com', 
    role: 'instructor', 
    status: 'pending', 
    createdAt: '2024-03-20'
  },
];

type User = typeof initialUsers[0];

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [recentlyRejected, setRecentlyRejected] = useState<User | null>(null);
  const [recentlyDeleted, setRecentlyDeleted] = useState<User | null>(null);
  const { toast } = useToast();
  
  // New state for the message dialog
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [userMessage, setUserMessage] = useState("");

  // Filter users based on search term and role
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Updated filtering logic to consider donors as customers
    // Every donor is a customer, but not every customer is a donor
    let roleMatches = filterRole === "all";
    if (filterRole === "customer") {
      // When filtering for customer, include both customers and donors
      roleMatches = user.role === "customer" || user.role === "donor";
    } else {
      // For all other filter options, match the exact role
      roleMatches = user.role === filterRole;
    }
    
    return matchesSearch && roleMatches;
  });
  
  const handleDeleteUser = (id: number) => {
    // Find the user being deleted
    const deletedUser = users.find(user => user.id === id);
    
    // Store the deleted user for potential undo
    if (deletedUser) {
      setRecentlyDeleted(deletedUser);
    }
    
    // Remove the user from the list
    setUsers(users.filter(user => user.id !== id));
    
    // Show toast with undo button
    toast({
      title: "User Deleted",
      description: "User has been successfully removed.",
      action: (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => handleUndoDelete(deletedUser)}
          className="gap-1"
        >
          <Undo size={16} />
          Undo
        </Button>
      ),
    });
  };
  
  const handleUndoDelete = (user: User | null | undefined) => {
    if (user) {
      // Add the user back to the list
      setUsers(prevUsers => [...prevUsers, user]);
      
      // Clear the recently deleted user
      setRecentlyDeleted(null);
      
      // Show confirmation toast
      toast({
        title: "Deletion Undone",
        description: `${user.name} has been added back to the system.`,
      });
    }
  };
  
  const handleApproveUser = (id: number) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, status: 'active' } : user
    ));
    toast({
      title: "User Approved",
      description: "User has been successfully approved.",
    });
  };
  
  const handleRejectUser = (id: number) => {
    // Find the user being rejected
    const rejectedUser = users.find(user => user.id === id);
    
    // Store the rejected user for potential undo
    if (rejectedUser) {
      setRecentlyRejected(rejectedUser);
    }
    
    // Remove the user from the list
    setUsers(users.filter(user => user.id !== id));
    
    // Show toast with undo button
    toast({
      title: "User Rejected",
      description: "User has been rejected and removed from the system.",
      action: (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => handleUndoReject(rejectedUser)}
          className="gap-1"
        >
          <Undo size={16} />
          Undo
        </Button>
      ),
    });
  };
  
  const handleUndoReject = (user: User | null | undefined) => {
    if (user) {
      // Add the user back to the list
      setUsers(prevUsers => [...prevUsers, user]);
      
      // Clear the recently rejected user
      setRecentlyRejected(null);
      
      // Show confirmation toast
      toast({
        title: "Rejection Undone",
        description: `${user.name} has been added back to the system.`,
      });
    }
  };

  // New function to handle opening the edit dialog
  const handleEditClick = (id: number) => {
    setSelectedUserId(id);
    setUserMessage("");
    setMessageDialogOpen(true);
  };
  
  // Function to handle sending the message and changing status to pending
  const handleSendMessage = () => {
    if (selectedUserId && userMessage.trim()) {
      // Update user status to pending
      setUsers(users.map(user => 
        user.id === selectedUserId ? { ...user, status: 'pending' } : user
      ));
      
      // Show success message
      toast({
        title: "Status Updated & Message Sent",
        description: `User status changed to pending and message sent.`,
      });
      
      // Close the dialog and reset state
      setMessageDialogOpen(false);
      setSelectedUserId(null);
      setUserMessage("");
    } else {
      // Show error if message is empty
      toast({
        title: "Message Required",
        description: "Please enter a message before sending.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-empower-brown">User Management</h1>
        
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <Input 
              placeholder="Search users..." 
              className="pl-9 w-full md:w-auto"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select 
            className="border rounded-md p-2 bg-white"
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
          >
            <option value="all">All Roles</option>
            <option value="customer">Customers & Donors</option>
            <option value="instructor">Instructors</option>
            <option value="seller">Sellers</option>
            <option value="learner">Learners</option>
          </select>
        </div>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center">
            <Users size={20} className="mr-2 text-empower-terracotta" />
            User List
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined On</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          user.role === 'customer' ? 'bg-blue-100 text-blue-700' :
                          user.role === 'instructor' ? 'bg-purple-100 text-purple-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                        </span>
                      </TableCell>
                      <TableCell>{user.createdAt}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          {user.status === 'pending' && (
                            <>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleApproveUser(user.id)}
                                className="text-green-600 hover:text-green-800 hover:bg-green-100"
                                title="Approve User"
                              >
                                <CheckCircle size={16} />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRejectUser(user.id)}
                                className="text-red-600 hover:text-red-800 hover:bg-red-100"
                                title="Reject User"
                              >
                                <XCircle size={16} />
                              </Button>
                            </>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditClick(user.id)}
                            className="text-blue-600 hover:text-blue-800 hover:bg-blue-100"
                            title="Edit User & Send Message"
                          >
                            <Edit size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteUser(user.id)}
                            className="text-red-600 hover:text-red-800 hover:bg-red-100"
                            title="Delete User"
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No users found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      {/* Message Dialog */}
      <Dialog open={messageDialogOpen} onOpenChange={setMessageDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Send Message to User</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className="text-sm text-muted-foreground">
              This will change the user's status to "pending" and send them a message.
            </p>
            <Textarea 
              placeholder="Write your message here..." 
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              className="min-h-[120px]"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setMessageDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSendMessage} className="gap-2">
              <Send size={16} />
              Send Message
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserManagement;
