
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { 
  Search, Filter, GraduationCap, Brush, Code, ArrowRight, HelpCircle
} from "lucide-react";
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CourseCard from '@/components/CourseCard';
import CourseFilters from '@/components/CourseFilters';
import TrendingCourses from '@/components/TrendingCourses';
import { handmadeCourses, digitalCourses } from '@/data';
import { Slider } from "@/components/ui/slider";

const Courses: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [selectedTab, setSelectedTab] = useState('all');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [trendingRef, setTrendingRef] = useState<HTMLDivElement | null>(null);

  const slides = [
    "/lovable-uploads/dccc32b9-798a-4692-9816-6e03d3cfedf2.png", // Crochet workshop
    "/lovable-uploads/88cb08a3-5df1-4252-b772-5ebb5ed8b0d5.png",  // Technology workshop
    "/lovable-uploads/47bed620-a187-4c7f-aa12-2920437fa02a.png"   // Another course image
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const scrollToTrending = () => {
    trendingRef?.scrollIntoView({ behavior: 'smooth' });
  };

  const filteredHandmadeCourses = handmadeCourses.filter(course => {
    if (searchQuery && !course.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (selectedLevel !== 'all' && course.level !== selectedLevel) {
      return false;
    }
    if (selectedPrice !== 'all') {
      if (selectedPrice === 'free' && course.price !== 0) {
        return false;
      }
      if (selectedPrice === 'paid' && course.price === 0) {
        return false;
      }
    }
    return true;
  });

  const filteredDigitalCourses = digitalCourses.filter(course => {
    if (searchQuery && !course.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (selectedLevel !== 'all' && course.level !== selectedLevel) {
      return false;
    }
    if (selectedPrice !== 'all') {
      if (selectedPrice === 'free' && course.price !== 0) {
        return false;
      }
      if (selectedPrice === 'paid' && course.price === 0) {
        return false;
      }
    }
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Course Hero Slider */}
        <section className="relative h-[50vh] md:h-[60vh] overflow-hidden mb-12 rounded-xl">
          {/* Image Carousel */}
          <div className="absolute inset-0 w-full h-full">
            {slides.map((slide, index) => (
              <motion.div
                key={index}
                className="absolute inset-0 w-full h-full bg-black/30"
                initial={{ opacity: 0 }}
                animate={{ opacity: currentSlide === index ? 1 : 0 }}
                transition={{ duration: 1 }}
                style={{
                  backgroundImage: `url(${slide})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            ))}
            <div className="absolute inset-0 bg-black/50" /> {/* Overlay */}
          </div>

          {/* Content */}
          <div className="relative h-full flex items-center justify-center">
            <div className="text-center max-w-3xl px-4">
              <motion.h1 
                className="text-4xl md:text-5xl font-bold text-white mb-4"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                Available Courses
              </motion.h1>
              
              <motion.p 
                className="text-lg text-white/90 mb-8"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                Whether you're discovering the art of handcraft or diving into digital skills, 
                our courses are tailored to help you grow, create, and thrive. Learn at your own pace, 
                with real instructors guiding you every step of the way.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.8 }}
              >
                <Button 
                  size="lg"
                  className="bg-empower-terracotta hover:bg-empower-terracotta/90 text-white shadow-lg"
                  onClick={scrollToTrending}
                >
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                
                <Button 
                  size="lg"
                  variant="outline"
                  className="bg-[#D946EF] border-[#D946EF] text-white hover:bg-[#D946EF]/90 hover:text-white hover:border-[#D946EF]/90 shadow-lg"
                >
                  Confused!! Click Here <HelpCircle className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Carousel Indicators */}
          <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2">
            {slides.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full ${
                  currentSlide === index ? 'bg-white' : 'bg-white/50'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                animate={currentSlide === index ? 
                  { width: "24px", transition: { duration: 0.3 } } : 
                  { width: "12px", transition: { duration: 0.3 } }
                }
              />
            ))}
          </div>
        </section>

        <div className="mb-8">
          <CourseFilters 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedLevel={selectedLevel}
            setSelectedLevel={setSelectedLevel}
            selectedPrice={selectedPrice}
            setSelectedPrice={setSelectedPrice}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
        </div>
        
        <div ref={setTrendingRef}>
          <TrendingCourses />
        </div>

        <Tabs 
          defaultValue="all" 
          value={selectedTab}
          onValueChange={setSelectedTab}
          className="w-full"
        >
          <div className="flex justify-center mb-8">
            <TabsList className="bg-empower-ivory/50">
              <TabsTrigger 
                value="all" 
                className="data-[state=active]:bg-empower-gold data-[state=active]:text-empower-brown"
              >
                <GraduationCap className="mr-2" size={18} />
                All Courses
              </TabsTrigger>
              <TabsTrigger 
                value="handmade" 
                className="data-[state=active]:bg-empower-gold data-[state=active]:text-empower-brown"
              >
                <Brush className="mr-2" size={18} />
                Handmade & Crafts
              </TabsTrigger>
              <TabsTrigger 
                value="digital" 
                className="data-[state=active]:bg-empower-gold data-[state=active]:text-empower-brown"
              >
                <Code className="mr-2" size={18} />
                Technology & Digital Skills
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...filteredHandmadeCourses, ...filteredDigitalCourses].map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="handmade" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredHandmadeCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="digital" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDigitalCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default Courses;
