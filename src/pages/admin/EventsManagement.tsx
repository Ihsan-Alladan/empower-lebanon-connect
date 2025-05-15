
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  MapPin,
  Edit,
  Trash2,
  Users,
  Filter,
  Plus,
  Search,
  AlertTriangle,
  CheckCircle,
  Bell,
  X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { formatDate } from '@/lib/utils';
import { Event, EventCategory } from '@/types/event';
import { events } from '@/data/events';
import { supabase } from '@/integrations/supabase/client';
import { Textarea } from '@/components/ui/textarea';

interface DeletedEvent {
  event: Event;
  timestamp: number;
}

interface User {
  id: string;
  name: string;
  email: string;
}

const EventsManagement = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // State for events management
  const [allEvents, setAllEvents] = useState<Event[]>(events);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(events);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | 'all'>('all');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<Event | null>(null);
  const [recentlyDeletedEvents, setRecentlyDeletedEvents] = useState<DeletedEvent[]>([]);
  const [undoNotification, setUndoNotification] = useState<DeletedEvent | null>(null);
  
  // State for edit dialog
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  
  // State for notification dialog
  const [isNotifyDialogOpen, setIsNotifyDialogOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [eventForNotification, setEventForNotification] = useState<Event | null>(null);
  
  // State for attendance tracking
  const [isAttendanceDialogOpen, setIsAttendanceDialogOpen] = useState(false);
  const [attendanceEvent, setAttendanceEvent] = useState<Event | null>(null);
  const [attendees, setAttendees] = useState<{ id: string; name: string; checked: boolean }[]>([]);
  
  // Mock users data (in a real app, this would come from your database)
  const [users, setUsers] = useState<User[]>([
    { id: '1', name: 'John Doe', email: 'john@example.com' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
    { id: '3', name: 'Bob Johnson', email: 'bob@example.com' },
    { id: '4', name: 'Alice Williams', email: 'alice@example.com' },
    { id: '5', name: 'Mohammed Ali', email: 'mohammed@example.com' },
    { id: '6', name: 'Sarah Khan', email: 'sarah@example.com' },
  ]);
  
  // Filter events based on search query and selected category
  useEffect(() => {
    let result = [...allEvents];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(event => 
        event.title.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query) ||
        event.location.toLowerCase().includes(query)
      );
    }
    
    // Apply category filter
    if (selectedCategory !== 'all') {
      result = result.filter(event => event.category === selectedCategory);
    }
    
    setFilteredEvents(result);
  }, [allEvents, searchQuery, selectedCategory]);
  
  // Handler for deleting an event
  const handleDeleteEvent = (event: Event) => {
    setEventToDelete(event);
    setDeleteDialogOpen(true);
  };
  
  // Handler for confirming event deletion
  const confirmDelete = () => {
    if (!eventToDelete) return;
    
    // Remove the event from the events list
    setAllEvents(prev => prev.filter(e => e.id !== eventToDelete.id));
    
    // Add to recently deleted for potential undo
    const deletedEvent: DeletedEvent = {
      event: eventToDelete,
      timestamp: Date.now()
    };
    
    setRecentlyDeletedEvents(prev => [...prev, deletedEvent]);
    setUndoNotification(deletedEvent);
    setDeleteDialogOpen(false);
    
    toast({
      title: "Event deleted",
      description: "The event has been deleted successfully.",
      variant: "default",
    });
    
    // Clear undo notification after 5 seconds
    setTimeout(() => {
      setUndoNotification(null);
    }, 5000);
  };
  
  // Handler for undoing delete
  const handleUndo = () => {
    if (!undoNotification) return;
    
    // Restore the event to the events list
    setAllEvents(prev => [...prev, undoNotification.event]);
    
    // Remove from recently deleted
    setRecentlyDeletedEvents(prev => 
      prev.filter(d => d.event.id !== undoNotification.event.id)
    );
    
    setUndoNotification(null);
    
    toast({
      title: "Event restored",
      description: "The event has been restored successfully.",
      variant: "default",
    });
  };
  
  // Handler for editing an event
  const handleEditEvent = (event: Event) => {
    setEditingEvent({...event});
    setIsEditDialogOpen(true);
  };
  
  // Handler for saving edited event
  const handleSaveEvent = () => {
    if (!editingEvent) return;
    
    setAllEvents(prev => prev.map(event => 
      event.id === editingEvent.id ? editingEvent : event
    ));
    
    setIsEditDialogOpen(false);
    
    toast({
      title: "Event updated",
      description: "The event has been updated successfully.",
      variant: "default",
    });
  };
  
  // Handler for notifying users about an event
  const handleNotifyUsers = (event: Event) => {
    setEventForNotification(event);
    setNotificationMessage(`Join us for ${event.title} on ${formatDate(new Date(event.date))} at ${event.location}!`);
    setSelectedUsers([]);
    setIsNotifyDialogOpen(true);
  };
  
  // Handler for sending notification
  const handleSendNotification = () => {
    if (!eventForNotification || selectedUsers.length === 0) return;
    
    // In a real app, this would send notifications to the selected users
    // through your notification system (email, SMS, push notifications, etc.)
    
    toast({
      title: "Notification sent",
      description: `Notification sent to ${selectedUsers.length} user(s)`,
      variant: "default",
    });
    
    setIsNotifyDialogOpen(false);
  };
  
  // Handler for tracking attendance
  const handleTrackAttendance = (event: Event) => {
    setAttendanceEvent(event);
    
    // In a real app, you would fetch the actual attendees for this event
    // Here we're simulating with some mock data
    const mockAttendees = users.slice(0, event.registeredAttendees).map(user => ({
      id: user.id,
      name: user.name,
      checked: false
    }));
    
    setAttendees(mockAttendees);
    setIsAttendanceDialogOpen(true);
  };
  
  // Handler for saving attendance
  const handleSaveAttendance = () => {
    if (!attendanceEvent) return;
    
    const checkedCount = attendees.filter(a => a.checked).length;
    
    toast({
      title: "Attendance saved",
      description: `Marked ${checkedCount} out of ${attendees.length} attendees as present.`,
      variant: "default",
    });
    
    setIsAttendanceDialogOpen(false);
  };
  
  // Toggle user selection for notifications
  const toggleUserSelection = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };
  
  // Toggle attendee status
  const toggleAttendeeStatus = (attendeeId: string) => {
    setAttendees(prev => prev.map(attendee => 
      attendee.id === attendeeId
        ? { ...attendee, checked: !attendee.checked }
        : attendee
    ));
  };
  
  return (
    <motion.div 
      className="w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Events Management</h1>
        <p className="text-muted-foreground">Create, edit, and manage events.</p>
      </div>
      
      <div className="flex flex-col gap-4">
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search events..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Select 
            value={selectedCategory} 
            onValueChange={(value: string) => setSelectedCategory(value as EventCategory | 'all')}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="social">Social</SelectItem>
              <SelectItem value="educational">Educational</SelectItem>
              <SelectItem value="fundraising">Fundraising</SelectItem>
              <SelectItem value="workshop">Workshop</SelectItem>
              <SelectItem value="networking">Networking</SelectItem>
              <SelectItem value="community">Community</SelectItem>
              <SelectItem value="career">Career</SelectItem>
            </SelectContent>
          </Select>
          
          <Button className="ml-auto" onClick={() => navigate('/admin/events/create')}>
            <Plus className="mr-2 h-4 w-4" /> New Event
          </Button>
        </div>
        
        {/* Events Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Events</CardTitle>
            <CardDescription>
              Showing {filteredEvents.length} of {allEvents.length} events
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Attendees</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEvents.length > 0 ? (
                  filteredEvents.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell className="font-medium">{event.title}</TableCell>
                      <TableCell>{formatDate(new Date(event.date))}</TableCell>
                      <TableCell>{event.location}</TableCell>
                      <TableCell>
                        <Badge>{event.category}</Badge>
                      </TableCell>
                      <TableCell>
                        {event.registeredAttendees} / {event.capacity}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="icon" 
                            onClick={() => handleEditEvent(event)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="icon" 
                            onClick={() => handleDeleteEvent(event)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="icon" 
                            onClick={() => handleNotifyUsers(event)}
                          >
                            <Bell className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="icon" 
                            onClick={() => handleTrackAttendance(event)}
                          >
                            <Users className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No events found. Try adjusting your search or filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Event</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{eventToDelete?.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Event Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Event</DialogTitle>
            <DialogDescription>
              Make changes to the event details below
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="title" className="text-right font-medium">
                Title
              </label>
              <Input
                id="title"
                value={editingEvent?.title || ''}
                onChange={(e) => setEditingEvent(prev => prev ? {...prev, title: e.target.value} : null)}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="description" className="text-right font-medium">
                Description
              </label>
              <Textarea
                id="description"
                value={editingEvent?.description || ''}
                onChange={(e) => setEditingEvent(prev => prev ? {...prev, description: e.target.value} : null)}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="date" className="text-right font-medium">
                Date
              </label>
              <Input
                id="date"
                type="date"
                value={editingEvent?.date ? new Date(editingEvent.date).toISOString().split('T')[0] : ''}
                onChange={(e) => setEditingEvent(prev => prev ? {...prev, date: e.target.value} : null)}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="time" className="text-right font-medium">
                Time
              </label>
              <Input
                id="time"
                value={editingEvent?.time || ''}
                onChange={(e) => setEditingEvent(prev => prev ? {...prev, time: e.target.value} : null)}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="location" className="text-right font-medium">
                Location
              </label>
              <Input
                id="location"
                value={editingEvent?.location || ''}
                onChange={(e) => setEditingEvent(prev => prev ? {...prev, location: e.target.value} : null)}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="capacity" className="text-right font-medium">
                Capacity
              </label>
              <Input
                id="capacity"
                type="number"
                value={editingEvent?.capacity.toString() || '0'}
                onChange={(e) => setEditingEvent(prev => prev ? {...prev, capacity: parseInt(e.target.value) || 0} : null)}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="category" className="text-right font-medium">
                Category
              </label>
              <Select 
                value={editingEvent?.category} 
                onValueChange={(value) => setEditingEvent(prev => prev ? {...prev, category: value as EventCategory} : null)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="social">Social</SelectItem>
                  <SelectItem value="educational">Educational</SelectItem>
                  <SelectItem value="fundraising">Fundraising</SelectItem>
                  <SelectItem value="workshop">Workshop</SelectItem>
                  <SelectItem value="networking">Networking</SelectItem>
                  <SelectItem value="community">Community</SelectItem>
                  <SelectItem value="career">Career</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEvent}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Notify Users Dialog */}
      <Dialog open={isNotifyDialogOpen} onOpenChange={setIsNotifyDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Notify Users</DialogTitle>
            <DialogDescription>
              Select users to notify about "{eventForNotification?.title}"
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <Textarea
              placeholder="Enter notification message..."
              value={notificationMessage}
              onChange={(e) => setNotificationMessage(e.target.value)}
              className="w-full"
              rows={4}
            />
            
            <div className="max-h-[200px] overflow-y-auto border rounded-md p-2">
              {users.map(user => (
                <div key={user.id} className="flex items-center space-x-2 p-2 hover:bg-muted/50 rounded">
                  <Checkbox 
                    id={`user-${user.id}`} 
                    checked={selectedUsers.includes(user.id)}
                    onCheckedChange={() => toggleUserSelection(user.id)}
                  />
                  <label 
                    htmlFor={`user-${user.id}`}
                    className="flex-1 text-sm cursor-pointer flex justify-between"
                  >
                    <span>{user.name}</span>
                    <span className="text-muted-foreground text-xs">{user.email}</span>
                  </label>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                {selectedUsers.length} user(s) selected
              </span>
              <div className="space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setSelectedUsers(users.map(u => u.id))}
                >
                  Select All
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setSelectedUsers([])}
                >
                  Clear
                </Button>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsNotifyDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSendNotification} 
              disabled={selectedUsers.length === 0 || !notificationMessage.trim()}
            >
              Send Notification
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Track Attendance Dialog */}
      <Dialog open={isAttendanceDialogOpen} onOpenChange={setIsAttendanceDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Track Attendance</DialogTitle>
            <DialogDescription>
              Mark attendees present for "{attendanceEvent?.title}"
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div className="max-h-[300px] overflow-y-auto border rounded-md p-2">
              {attendees.length > 0 ? (
                attendees.map(attendee => (
                  <div key={attendee.id} className="flex items-center space-x-2 p-2 hover:bg-muted/50 rounded">
                    <Checkbox 
                      id={`attendee-${attendee.id}`} 
                      checked={attendee.checked}
                      onCheckedChange={() => toggleAttendeeStatus(attendee.id)}
                    />
                    <label 
                      htmlFor={`attendee-${attendee.id}`}
                      className="flex-1 text-sm cursor-pointer"
                    >
                      {attendee.name}
                    </label>
                  </div>
                ))
              ) : (
                <p className="text-center py-4 text-muted-foreground">No registered attendees for this event.</p>
              )}
            </div>
            
            <div className="text-sm text-muted-foreground">
              {attendees.filter(a => a.checked).length} out of {attendees.length} marked as present
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsAttendanceDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSaveAttendance}
            >
              Save Attendance
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Undo Delete Notification */}
      {undoNotification && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 right-4 bg-background border shadow-lg rounded-lg p-4 flex items-center gap-3 z-50"
        >
          <CheckCircle className="text-green-500 h-5 w-5" />
          <div className="flex-1">
            <p className="font-medium">Event deleted</p>
            <p className="text-sm text-muted-foreground">"{undoNotification.event.title}" has been deleted</p>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleUndo}
          >
            Undo
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6" 
            onClick={() => setUndoNotification(null)}
          >
            <X className="h-4 w-4" />
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default EventsManagement;
