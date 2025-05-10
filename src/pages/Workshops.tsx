
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, MapPin } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import WorkshopCard from '@/components/workshops/WorkshopCard';
import WorkshopFilters from '@/components/workshops/WorkshopFilters';
import RegistrationModal from '@/components/workshops/RegistrationModal';
import PageTransition from '@/components/PageTransition';
import { Workshop, WorkshopCategory } from '@/types/workshop';
import { workshops } from '@/data/workshops';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Workshops = () => {
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<WorkshopCategory | 'all'>('all');
  const [selectedDate, setSelectedDate] = useState<'upcoming' | 'past' | 'all'>('upcoming');
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null);

  const handleRegisterClick = (workshop: Workshop) => {
    setSelectedWorkshop(workshop);
    setIsRegistrationModalOpen(true);
  };

  const filteredWorkshops = workshops.filter(workshop => {
    const matchesSearch = workshop.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      workshop.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      workshop.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || workshop.category === selectedCategory;
    
    const now = new Date();
    const workshopDate = new Date(workshop.date);
    const matchesDate = 
      selectedDate === 'all' || 
      (selectedDate === 'upcoming' && workshopDate >= now) || 
      (selectedDate === 'past' && workshopDate < now);
    
    return matchesSearch && matchesCategory && matchesDate;
  });

  const upcomingCount = workshops.filter(w => new Date(w.date) >= new Date()).length;
  const pastCount = workshops.length - upcomingCount;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <PageTransition route="/workshops">
        <div className="min-h-screen bg-gradient-to-b from-empower-ivory to-white flex-grow">
          {/* Banner Section */}
          <div className="relative h-64 md:h-80 w-full overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: 'url("/lovable-uploads/f6ddb42e-7197-483b-b428-24ce8a62075d.png")' }}
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
                Explore Our Workshops
              </motion.h1>
              
              <motion.p 
                className="text-xl md:text-2xl text-white max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Grow your skills, meet others, and be inspired.
              </motion.p>
            </div>
          </div>

          {/* Main Content */}
          <div className="container mx-auto py-8 px-4">
            {/* Search & Filters */}
            <div className="mb-8 space-y-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input 
                  type="search" 
                  placeholder="Search workshops by title, description or instructor..." 
                  className="pl-10 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <WorkshopFilters 
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />

              {/* Tabs for Upcoming/Past */}
              <Tabs defaultValue="upcoming" className="w-full">
                <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
                  <TabsTrigger 
                    value="upcoming" 
                    onClick={() => setSelectedDate('upcoming')}
                  >
                    Upcoming
                    <Badge variant="outline" className="ml-2">{upcomingCount}</Badge>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="past" 
                    onClick={() => setSelectedDate('past')}
                  >
                    Past
                    <Badge variant="outline" className="ml-2">{pastCount}</Badge>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="all"
                    onClick={() => setSelectedDate('all')}
                  >
                    All
                    <Badge variant="outline" className="ml-2">{workshops.length}</Badge>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Workshop Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredWorkshops.length > 0 ? (
                filteredWorkshops.map((workshop) => (
                  <motion.div
                    key={workshop.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    whileHover={{ y: -5 }}
                    className="h-full"
                  >
                    <WorkshopCard 
                      workshop={workshop} 
                      onRegisterClick={() => handleRegisterClick(workshop)}
                    />
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <h3 className="text-2xl font-semibold text-gray-700 mb-2">No workshops found</h3>
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
                  <span className="text-3xl md:text-4xl font-bold text-empower-terracotta mb-2">50+</span>
                  <span className="text-sm md:text-base text-gray-700">Workshops Completed</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-3xl md:text-4xl font-bold text-empower-terracotta mb-2">1000+</span>
                  <span className="text-sm md:text-base text-gray-700">Happy Participants</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-3xl md:text-4xl font-bold text-empower-terracotta mb-2">25+</span>
                  <span className="text-sm md:text-base text-gray-700">Expert Instructors</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-3xl md:text-4xl font-bold text-empower-terracotta mb-2">12</span>
                  <span className="text-sm md:text-base text-gray-700">Categories</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Registration Modal */}
          <RegistrationModal
            workshop={selectedWorkshop}
            isOpen={isRegistrationModalOpen}
            onClose={() => setIsRegistrationModalOpen(false)}
          />
        </div>
      </PageTransition>
      <Footer />
    </div>
  );
};

export default Workshops;
