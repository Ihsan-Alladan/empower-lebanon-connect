
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Label } from '@/components/ui/label';
import { Calendar as CalendarIcon, Clock, MapPin, Users, UserCheck, Bell, AlertCircle, Search, Plus, Edit2, Trash2, Calendar, Send, User } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Event, EventCategory, Speaker } from '@/types/event';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarDate, DatePicker } from '@/components/ui/date-picker';
import { events as mockEvents } from '@/data/events';

// Define the schema for the event form
const eventFormSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  date: z.date(),
  time: z.string().min(1, 'Time is required'),
  location: z.string().min(3, 'Location is required'),
  capacity: z.number().min(1, 'Capacity must be at least 1'),
  category: z.string(),
  imageUrl: z.string().min(1, 'Image URL is required'),
});

type EventForm = z.infer<typeof eventFormSchema>;

// Define interface for event registration
interface EventRegistration {
  id: string;
  user_id: string;
  event_id: string;
  registered_at: string;
  user_name?: string;
  user_email?: string;
}

const EventsManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [isNotifyDialogOpen, setIsNotifyDialogOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [eventRegistrations, setEventRegistrations] = useState<{[key: string]: EventRegistration[]}>({});
  const [selectedAttendees, setSelectedAttendees] = useState<string[]>([]);
  const [isRegistrationDialogOpen, setIsRegistrationDialogOpen] = useState(false);
  const [viewingRegistrationsForEvent, setViewingRegistrationsForEvent] = useState<Event | null>(null);
  const navigate = useNavigate();

  // Form for creating/editing events
  const eventForm = useForm<EventForm>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      title: '',
      description: '',
      date: new Date(),
      time: '',
      location: '',
      capacity: 50,
      category: 'educational',
      imageUrl: '',
    },
  });

  // Fetch events from Supabase
  useEffect(() => {
    fetchEvents();
  }, []);

  // Filter events based on search query and active tab
  useEffect(() => {
    if (events.length > 0) {
      const now = new Date();
      let filtered = events;
      
      // Apply tab filtering
      if (activeTab === 'upcoming') {
        filtered = filtered.filter(event => new Date(event.date) >= now);
      } else if (activeTab === 'past') {
        filtered = filtered.filter(event => new Date(event.date) < now);
      }
      
      // Apply search filtering
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(
          event => 
            event.title.toLowerCase().includes(query) || 
            event.description.toLowerCase().includes(query) || 
            event.location.toLowerCase().includes(query)
        );
      }
      
      setFilteredEvents(filtered);
    }
  }, [events, searchQuery, activeTab]);

  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      // Try to fetch from Supabase first
      const { data: eventsData, error } = await supabase
        .from('events')
        .select('*, event_speakers(*), event_images(url), event_highlights(highlight)');
      
      if (error) throw error;
      
      if (eventsData && eventsData.length > 0) {
        const formattedEvents = eventsData.map(event => ({
          id: event.id,
          title: event.title,
          description: event.description,
          date: event.date,
          time: event.time,
          location: event.location,
          capacity: event.capacity,
          registeredAttendees: event.registered_attendees,
          category: event.category as EventCategory,
          imageUrl: event.image_url,
          images: event.event_images?.map((img: { url: string }) => img.url) || [event.image_url],
          speakers: event.event_speakers || [],
          highlights: event.event_highlights?.map((h: { highlight: string }) => h.highlight) || [],
        }));
        setEvents(formattedEvents);
      } else {
        // If no data in Supabase or empty result, use mock data
        setEvents(mockEvents);
      }
      
      // Fetch registrations data for all events
      await fetchAllRegistrations();
    } catch (error) {
      console.error('Error fetching events:', error);
      toast.error('Failed to load events from database, using mock data');
      setEvents(mockEvents);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAllRegistrations = async () => {
    try {
      const { data: registrationsData, error } = await supabase
        .from('event_registrations')
        .select('*, profiles(first_name, last_name, id, avatar_url)');

      if (error) throw error;
      
      if (registrationsData) {
        // Group registrations by event_id
        const groupedRegistrations: {[key: string]: EventRegistration[]} = {};
        
        registrationsData.forEach((reg: any) => {
          const registration: EventRegistration = {
            id: reg.id,
            user_id: reg.user_id,
            event_id: reg.event_id,
            registered_at: reg.registered_at,
            user_name: reg.profiles ? `${reg.profiles.first_name || ''} ${reg.profiles.last_name || ''}`.trim() : 'Anonymous User',
            user_email: reg.profiles?.email || 'No Email'
          };
          
          if (!groupedRegistrations[reg.event_id]) {
            groupedRegistrations[reg.event_id] = [];
          }
          groupedRegistrations[reg.event_id].push(registration);
        });
        
        setEventRegistrations(groupedRegistrations);
      }
    } catch (error) {
      console.error('Error fetching registrations:', error);
      toast.error('Failed to load event registrations');
    }
  };

  // Fixed handleCreateEvent function to properly chain promises
  const handleCreateEvent = (data: EventForm) => {
    // Implementation for creating a new event
    setIsSubmitting(true);
    
    const newEvent = {
      title: data.title,
      description: data.description,
      date: data.date.toISOString(),
      time: data.time,
      location: data.location,
      capacity: data.capacity,
      category: data.category,
      image_url: data.imageUrl,
      registered_attendees: 0,
    };
    
    // Create a Promise wrapper to ensure we have access to catch and finally
    Promise.resolve(
      supabase
        .from('events')
        .insert(newEvent)
        .select()
    )
      .then(({ data, error }) => {
        if (error) {
          toast.error('Failed to create event');
          console.error(error);
          return;
        }
        
        if (data) {
          toast.success('Event created successfully');
          fetchEvents();
          eventForm.reset();
        }
      })
      .catch(error => {
        console.error('Error creating event:', error);
        toast.error('An unexpected error occurred');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const handleEditEvent = (event: Event) => {
    // Implementation for editing an event
    eventForm.setValue('title', event.title);
    eventForm.setValue('description', event.description);
    eventForm.setValue('date', new Date(event.date));
    eventForm.setValue('time', event.time);
    eventForm.setValue('location', event.location);
    eventForm.setValue('capacity', event.capacity);
    eventForm.setValue('category', event.category);
    eventForm.setValue('imageUrl', event.imageUrl);
    
    setSelectedEventId(event.id);
  };

  // Fixed handleUpdateEvent function to properly chain promises
  const handleUpdateEvent = (data: EventForm) => {
    if (!selectedEventId) return;
    
    setIsSubmitting(true);
    
    const updatedEvent = {
      title: data.title,
      description: data.description,
      date: data.date.toISOString(),
      time: data.time,
      location: data.location,
      capacity: data.capacity,
      category: data.category,
      image_url: data.imageUrl,
    };
    
    // Create a Promise wrapper to ensure we have access to catch and finally
    Promise.resolve(
      supabase
        .from('events')
        .update(updatedEvent)
        .eq('id', selectedEventId)
    )
      .then(({ error }) => {
        if (error) {
          toast.error('Failed to update event');
          console.error(error);
          return;
        }
        
        toast.success('Event updated successfully');
        fetchEvents();
        eventForm.reset();
        setSelectedEventId(null);
      })
      .catch(error => {
        console.error('Error updating event:', error);
        toast.error('An unexpected error occurred');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const openDeleteConfirmation = (id: string) => {
    setSelectedEventId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteEvent = async () => {
    if (!selectedEventId) return;
    
    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', selectedEventId);
      
      if (error) throw error;
      
      toast.success('Event deleted successfully');
      fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
      toast.error('Failed to delete event');
    } finally {
      setIsDeleteDialogOpen(false);
      setSelectedEventId(null);
    }
  };

  const openNotifyDialog = (id: string) => {
    setSelectedEventId(id);
    setSelectedAttendees([]);
    setIsNotifyDialogOpen(true);
  };

  const handleSendNotification = async () => {
    if (!selectedEventId || !notificationMessage) return;
    
    try {
      // Get the event details
      const event = events.find(e => e.id === selectedEventId);
      if (!event) throw new Error('Event not found');

      // In a real application, this would connect to a notification service
      // For now, we'll simulate success
      toast.success(`Notification sent to ${selectedAttendees.length > 0 ? selectedAttendees.length : 'all'} registered attendees`);
      setNotificationMessage('');
      setIsNotifyDialogOpen(false);
      setSelectedAttendees([]);
    } catch (error) {
      console.error('Error sending notification:', error);
      toast.error('Failed to send notification');
    }
  };

  const openRegistrationsDialog = (event: Event) => {
    setViewingRegistrationsForEvent(event);
    setIsRegistrationDialogOpen(true);
  };

  const handleSubmit = (data: EventForm) => {
    if (selectedEventId) {
      handleUpdateEvent(data);
    } else {
      handleCreateEvent(data);
    }
  };

  // Format date for display
  const formatEventDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'MMMM d, yyyy');
  };

  const handleAttendeeSelection = (userId: string) => {
    if (selectedAttendees.includes(userId)) {
      setSelectedAttendees(selectedAttendees.filter(id => id !== userId));
    } else {
      setSelectedAttendees([...selectedAttendees, userId]);
    }
  };
  
  // Analytics data
  const totalUpcomingEvents = events.filter(event => new Date(event.date) >= new Date()).length;
  const totalPastEvents = events.filter(event => new Date(event.date) < new Date()).length;
  const totalCapacity = events.reduce((sum, event) => sum + event.capacity, 0);
  const totalRegistrations = events.reduce((sum, event) => sum + event.registeredAttendees, 0);
  const registrationRate = totalCapacity > 0 ? Math.round((totalRegistrations / totalCapacity) * 100) : 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold text-empower-brown">Events Management</h1>
        
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search events..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-empower-terracotta hover:bg-empower-terracotta/90">
                <Plus className="mr-2 h-4 w-4" /> New Event
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
              <DialogHeader>
                <DialogTitle>{selectedEventId ? 'Edit Event' : 'Create New Event'}</DialogTitle>
                <DialogDescription>
                  {selectedEventId
                    ? 'Make changes to the selected event.'
                    : 'Add a new event to your calendar.'}
                </DialogDescription>
              </DialogHeader>
              
              <Form {...eventForm}>
                <form onSubmit={eventForm.handleSubmit(handleSubmit)} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                  <FormField
                    control={eventForm.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Event Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter event title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={eventForm.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Event Date</FormLabel>
                          <FormControl>
                            <DatePicker
                              date={field.value}
                              setDate={field.onChange}
                              className="w-full"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={eventForm.control}
                      name="time"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Event Time</FormLabel>
                          <FormControl>
                            <Input type="time" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={eventForm.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter event location" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={eventForm.control}
                      name="capacity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Capacity</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              min={1}
                              {...field} 
                              onChange={(e) => field.onChange(parseInt(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={eventForm.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                            </FormControl>
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
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={eventForm.control}
                    name="imageUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image URL</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter image URL" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={eventForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Enter event description" 
                            className="min-h-[120px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <DialogFooter>
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full"
                    >
                      {isSubmitting ? 'Saving...' : selectedEventId ? 'Update Event' : 'Create Event'}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Upcoming Events</p>
                <p className="text-2xl font-bold">{totalUpcomingEvents}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-empower-terracotta/10 flex items-center justify-center">
                <CalendarIcon className="h-6 w-6 text-empower-terracotta" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Past Events</p>
                <p className="text-2xl font-bold">{totalPastEvents}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-empower-terracotta/10 flex items-center justify-center">
                <Clock className="h-6 w-6 text-empower-terracotta" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Total Registrations</p>
                <p className="text-2xl font-bold">{totalRegistrations}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-empower-terracotta/10 flex items-center justify-center">
                <UserCheck className="h-6 w-6 text-empower-terracotta" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Registration Rate</p>
                <p className="text-2xl font-bold">{registrationRate}%</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-empower-terracotta/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-empower-terracotta" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Tabs */}
      <Tabs defaultValue="upcoming" onValueChange={setActiveTab} value={activeTab}>
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
          <TabsTrigger value="past">Past Events</TabsTrigger>
          <TabsTrigger value="registrations">Registrations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="space-y-4">
          {isLoading ? (
            <Card>
              <CardContent className="p-6 flex justify-center">
                <p>Loading events...</p>
              </CardContent>
            </Card>
          ) : filteredEvents.length === 0 ? (
            <Card>
              <CardContent className="p-6 flex justify-center">
                <p>No upcoming events found.</p>
              </CardContent>
            </Card>
          ) : (
            filteredEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
                  <div className="md:col-span-1">
                    <img 
                      src={event.imageUrl} 
                      alt={event.title} 
                      className="w-full h-full object-cover md:h-full"
                      style={{ minHeight: '100%' }}
                    />
                  </div>
                  <div className="p-6 md:col-span-3">
                    <div className="flex flex-col h-full">
                      <div>
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold">{event.title}</h3>
                          <Badge>{event.category}</Badge>
                        </div>
                        
                        <div className="mt-2 space-y-1 text-sm text-gray-600">
                          <div className="flex items-center">
                            <CalendarIcon className="mr-2 h-4 w-4 text-empower-terracotta" />
                            <span>{formatEventDate(event.date)}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="mr-2 h-4 w-4 text-empower-terracotta" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="mr-2 h-4 w-4 text-empower-terracotta" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-3 flex-grow">
                        <p className="text-sm line-clamp-2">{event.description}</p>
                      </div>
                      
                      <div className="mt-4">
                        <div className="flex justify-between text-xs mb-1">
                          <span>Registrations</span>
                          <span>
                            {event.registeredAttendees} / {event.capacity} ({Math.round((event.registeredAttendees / event.capacity) * 100)}%)
                          </span>
                        </div>
                        <Progress value={(event.registeredAttendees / event.capacity) * 100} className="h-1" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4 md:col-span-1 flex flex-col justify-center gap-2 bg-gray-50">
                    <Button variant="outline" size="sm" onClick={() => handleEditEvent(event)}>
                      <Edit2 className="mr-2 h-3 w-3" /> Edit
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => openNotifyDialog(event.id)}>
                      <Bell className="mr-2 h-3 w-3" /> Notify
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => openRegistrationsDialog(event)}>
                      <Users className="mr-2 h-3 w-3" /> Attendees
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => openDeleteConfirmation(event.id)}
                    >
                      <Trash2 className="mr-2 h-3 w-3" /> Delete
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </TabsContent>
        
        <TabsContent value="past" className="space-y-4">
          {isLoading ? (
            <Card>
              <CardContent className="p-6 flex justify-center">
                <p>Loading events...</p>
              </CardContent>
            </Card>
          ) : filteredEvents.length === 0 ? (
            <Card>
              <CardContent className="p-6 flex justify-center">
                <p>No past events found.</p>
              </CardContent>
            </Card>
          ) : (
            filteredEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden opacity-90">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
                  <div className="md:col-span-1">
                    <div className="relative">
                      <img 
                        src={event.imageUrl} 
                        alt={event.title} 
                        className="w-full h-full object-cover md:h-full grayscale"
                        style={{ minHeight: '100%' }}
                      />
                      <div className="absolute top-2 right-2">
                        <Badge variant="secondary" className="bg-black/70 text-white">
                          Completed
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 md:col-span-3">
                    <div className="flex flex-col h-full">
                      <div>
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold">{event.title}</h3>
                          <Badge variant="outline">{event.category}</Badge>
                        </div>
                        
                        <div className="mt-2 space-y-1 text-sm text-gray-600">
                          <div className="flex items-center">
                            <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
                            <span>{formatEventDate(event.date)}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="mr-2 h-4 w-4 text-gray-400" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-3 flex-grow">
                        <p className="text-sm line-clamp-2">{event.description}</p>
                      </div>
                      
                      <div className="mt-4">
                        <div className="flex justify-between text-xs mb-1">
                          <span>Final Attendance</span>
                          <span>
                            {event.registeredAttendees} / {event.capacity} ({Math.round((event.registeredAttendees / event.capacity) * 100)}%)
                          </span>
                        </div>
                        <Progress value={(event.registeredAttendees / event.capacity) * 100} className="h-1" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4 md:col-span-1 flex flex-col justify-center gap-2 bg-gray-50">
                    <Button variant="outline" size="sm" onClick={() => handleEditEvent(event)}>
                      <Edit2 className="mr-2 h-3 w-3" /> Edit
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => openRegistrationsDialog(event)}>
                      <Users className="mr-2 h-3 w-3" /> Attendees
                    </Button>
                    <Button variant="secondary" size="sm">
                      Report
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => openDeleteConfirmation(event.id)}
                    >
                      <Trash2 className="mr-2 h-3 w-3" /> Delete
                    </Button>
                  </div>
                </div>
                
                {/* Event highlights for past events */}
                {event.highlights && event.highlights.length > 0 && (
                  <div className="p-4 bg-gray-50 border-t">
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="highlights">
                        <AccordionTrigger className="text-sm">View Event Highlights</AccordionTrigger>
                        <AccordionContent>
                          <ul className="list-disc pl-5 space-y-1 text-sm">
                            {event.highlights.map((highlight, idx) => (
                              <li key={idx}>{highlight}</li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                )}
              </Card>
            ))
          )}
        </TabsContent>
        
        <TabsContent value="registrations">
          <Card>
            <CardHeader>
              <CardTitle>Event Registrations</CardTitle>
              <CardDescription>
                View and manage registrations for all events.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Attendee</TableHead>
                    <TableHead>Registration Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.keys(eventRegistrations).length > 0 ? (
                    Object.entries(eventRegistrations).flatMap(([eventId, registrations]) => {
                      const event = events.find(e => e.id === eventId);
                      if (!event) return [];
                      
                      return registrations.map(registration => (
                        <TableRow key={registration.id}>
                          <TableCell>{event.title}</TableCell>
                          <TableCell>{formatEventDate(event.date)}</TableCell>
                          <TableCell>{registration.user_name || 'Anonymous'}</TableCell>
                          <TableCell>{format(new Date(registration.registered_at), 'MMM d, yyyy')}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-green-50 text-green-700">Confirmed</Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" onClick={() => {
                              setSelectedEventId(eventId);
                              setSelectedAttendees([registration.user_id]);
                              setIsNotifyDialogOpen(true);
                            }}>
                              <Send className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ));
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-4">No registrations found</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this event? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-end">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleDeleteEvent}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Notification Dialog */}
      <Dialog open={isNotifyDialogOpen} onOpenChange={setIsNotifyDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Send Notification</DialogTitle>
            <DialogDescription>
              Send a notification to {selectedAttendees.length > 0 
                ? `${selectedAttendees.length} selected attendee(s)`
                : 'all registered attendees'} for this event.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            {selectedEventId && eventRegistrations[selectedEventId] && eventRegistrations[selectedEventId].length > 0 && selectedAttendees.length === 0 && (
              <div className="space-y-2">
                <Label>Recipients</Label>
                <div className="border rounded-md p-2 max-h-32 overflow-y-auto">
                  <div className="flex flex-wrap gap-1">
                    {eventRegistrations[selectedEventId].map((reg) => (
                      <Badge key={reg.id} variant="outline" className="cursor-pointer hover:bg-accent" onClick={() => handleAttendeeSelection(reg.user_id)}>
                        {reg.user_name || 'Anonymous'}
                      </Badge>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Click on attendees to select specific recipients or leave empty to notify all
                </p>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="message">Notification Message</Label>
              <Textarea
                id="message"
                placeholder="Enter your message to attendees"
                value={notificationMessage}
                onChange={(e) => setNotificationMessage(e.target.value)}
                className="h-32"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setIsNotifyDialogOpen(false);
                setSelectedAttendees([]);
              }}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSendNotification}
              disabled={!notificationMessage}
            >
              <Bell className="mr-2 h-4 w-4" />
              Send Notification
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Registrations Dialog */}
      <Dialog open={isRegistrationDialogOpen} onOpenChange={setIsRegistrationDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Event Registrations</DialogTitle>
            <DialogDescription>
              {viewingRegistrationsForEvent && (
                <>
                  People registered for <span className="font-medium">{viewingRegistrationsForEvent.title}</span> on {formatEventDate(viewingRegistrationsForEvent.date)}
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {viewingRegistrationsForEvent && eventRegistrations[viewingRegistrationsForEvent.id] && eventRegistrations[viewingRegistrationsForEvent.id].length > 0 ? (
              <div className="max-h-[50vh] overflow-y-auto pr-2">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Attendee</TableHead>
                      <TableHead>Registration Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {eventRegistrations[viewingRegistrationsForEvent.id].map((registration) => (
                      <TableRow key={registration.id}>
                        <TableCell className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          {registration.user_name || 'Anonymous'}
                        </TableCell>
                        <TableCell>{format(new Date(registration.registered_at), 'MMM d, yyyy')}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" onClick={() => {
                            setIsRegistrationDialogOpen(false);
                            setSelectedEventId(viewingRegistrationsForEvent.id);
                            setSelectedAttendees([registration.user_id]);
                            setIsNotifyDialogOpen(true);
                          }}>
                            <Send className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <p className="text-center py-6 text-muted-foreground">No registrations found for this event</p>
            )}
            
            {viewingRegistrationsForEvent && (
              <div className="flex justify-between items-center pt-2 border-t">
                <p className="text-sm text-muted-foreground">
                  Total registrations: {eventRegistrations[viewingRegistrationsForEvent.id]?.length || 0} / {viewingRegistrationsForEvent.capacity}
                </p>
                <Button onClick={() => {
                  if (!viewingRegistrationsForEvent) return;
                  setIsRegistrationDialogOpen(false);
                  setSelectedEventId(viewingRegistrationsForEvent.id);
                  setSelectedAttendees([]);
                  setIsNotifyDialogOpen(true);
                }} disabled={!viewingRegistrationsForEvent || !eventRegistrations[viewingRegistrationsForEvent.id]?.length}>
                  <Bell className="mr-2 h-4 w-4" /> Notify All
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EventsManagement;
