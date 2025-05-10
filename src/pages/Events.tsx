
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Share2, Calendar, MapPin, Users, Clock } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import PageTransition from '@/components/PageTransition';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { formatDate } from '@/lib/utils';
import EventCard from '@/components/events/EventCard';
import EventFilters from '@/components/events/EventFilters';
import EventDetailsModal from '@/components/events/EventDetailsModal';
import { Event, EventCategory } from '@/types/event';
import { events } from '@/data/events';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Events = () => {
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | 'all'>('all');
  const [selectedTime, setSelectedTime] = useState<'upcoming' | 'past' | 'all'>('all');
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const handleViewDetails = (event: Event) => {
    setSelectedEvent(event);
    setIsDetailsModalOpen(true);
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.speakers.some(speaker => speaker.name.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    
    const now = new Date();
    const eventDate = new Date(event.date);
    const matchesTime = 
      selectedTime === 'all' || 
      (selectedTime === 'upcoming' && eventDate >= now) || 
      (selectedTime === 'past' && eventDate < now);
    
    return matchesSearch && matchesCategory && matchesTime;
  });

  const upcomingCount = events.filter(e => new Date(e.date) >= new Date()).length;
  const pastCount = events.length - upcomingCount;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <PageTransition route="/events">
        <div className="min-h-screen bg-gradient-to-b from-empower-ivory to-white flex-grow">
          {/* Banner Section */}
          <div className="relative h-64 md:h-80 w-full overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: 'url("/lovable-uploads/43cdb952-f7ba-4e66-a36e-73f796864ba9.png")' }}
            >
              <div className="absolute inset-0 bg-empower-brown/40"></div>
            </div>
            
            <div className="relative z-10 container mx-auto h-full flex flex-col justify-center items-center text-center px-4">
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Join Our Events & Stay Connected
              </motion.h1>
              
              <motion.p 
                className="text-xl md:text-2xl text-white max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Connect, learn and grow with our community.
              </motion.p>
            </div>
          </div>

          {/* Main Content */}
          <div className="container mx-auto py-8 px-4">
            {/* Search & Filters */}
            <div className="mb-8 space-y-6">
              <div className="relative">
                <Input 
                  type="search" 
                  placeholder="Search events by title, description or speaker..." 
                  className="pl-10 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
                </svg>
              </div>
              
              <EventFilters 
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />

              {/* Tabs for Upcoming/Past */}
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
                  <TabsTrigger 
                    value="all" 
                    onClick={() => setSelectedTime('all')}
                  >
                    All
                    <Badge variant="outline" className="ml-2">{events.length}</Badge>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="upcoming" 
                    onClick={() => setSelectedTime('upcoming')}
                  >
                    Upcoming
                    <Badge variant="outline" className="ml-2">{upcomingCount}</Badge>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="past" 
                    onClick={() => setSelectedTime('past')}
                  >
                    Past
                    <Badge variant="outline" className="ml-2">{pastCount}</Badge>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Event Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    whileHover={{ y: -5 }}
                    className="h-full"
                  >
                    <EventCard 
                      event={event} 
                      onViewDetails={() => handleViewDetails(event)}
                    />
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <h3 className="text-2xl font-semibold text-gray-700 mb-2">No events found</h3>
                  <p className="text-muted-foreground">Try adjusting your filters or search query</p>
                </div>
              )}
            </div>
          </div>

          {/* Stats Section */}
          <motion.div 
            className="bg-empower-terracotta/10 py-12 mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div className="flex flex-col items-center">
                  <span className="text-3xl md:text-4xl font-bold text-empower-terracotta mb-2">100+</span>
                  <span className="text-sm md:text-base text-gray-700">Events Hosted</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-3xl md:text-4xl font-bold text-empower-terracotta mb-2">5000+</span>
                  <span className="text-sm md:text-base text-gray-700">Attendees</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-3xl md:text-4xl font-bold text-empower-terracotta mb-2">50+</span>
                  <span className="text-sm md:text-base text-gray-700">Distinguished Speakers</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-3xl md:text-4xl font-bold text-empower-terracotta mb-2">8</span>
                  <span className="text-sm md:text-base text-gray-700">Event Categories</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Details Modal */}
          <EventDetailsModal
            event={selectedEvent}
            isOpen={isDetailsModalOpen}
            onClose={() => setIsDetailsModalOpen(false)}
          />
        </div>
      </PageTransition>
      <Footer />
    </div>
  );
};

export default Events;
