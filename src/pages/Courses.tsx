
import React, { useState, useEffect, useRef } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { 
  Search, Filter, GraduationCap, Brush, Code, ArrowRight, HelpCircle, CheckCircle, TrendingUp
} from "lucide-react";
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CourseCard from '@/components/CourseCard';
import CourseFilters from '@/components/CourseFilters';
import { handmadeCourses, digitalCourses, trendingCourses } from '@/data';
import { Slider } from "@/components/ui/slider";
import QuestionnaireModal from '@/components/QuestionnaireModal';

const Courses: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [selectedTab, setSelectedTab] = useState('all');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [questionnaireOpen, setQuestionnaireOpen] = useState(false);
  const [recommendedCourses, setRecommendedCourses] = useState<any[]>([]);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const coursesListRef = useRef<HTMLDivElement>(null);

  const slides = [
    "/lovable-uploads/lovable-uploads/signup.jpg",    // Changed image 1
    "/lovable-uploads/lovable-uploads/skills.jpg",    // Changed image 2
    "/lovable-uploads/lovable-uploads/b6.webp"       // Changed image 3
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const scrollToCourses = () => {
    coursesListRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const openQuestionnaire = () => {
    setQuestionnaireOpen(true);
  };
  
  const handleRecommendCourses = (courses: any[]) => {
    setRecommendedCourses(courses);
    setShowRecommendations(true);
    // Automatically switch to the appropriate tab based on recommendations
    if (courses.length > 0) {
      const firstCourseCat = courses[0].category;
      if (firstCourseCat === 'handmade') {
        setSelectedTab('handmade');
      } else if (firstCourseCat === 'digital') {
        setSelectedTab('digital');
      } else {
        setSelectedTab('all');
      }
    }
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

  const filteredTrendingCourses = trendingCourses.filter(course => {
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
                  onClick={scrollToCourses}
                >
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    size="lg"
                    variant="outline"
                    className="bg-[#D946EF] border-[#D946EF] text-white hover:bg-[#D946EF]/90 hover:text-white hover:border-[#D946EF]/90 shadow-lg"
                    onClick={openQuestionnaire}
                  >
                    Confused!! Click Here <HelpCircle className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
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
        
        {/* Display recommendations if available */}
        {showRecommendations && recommendedCourses.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <CheckCircle className="text-green-500" size={22} />
              <h2 className="text-2xl font-bold">Recommended Courses For You</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
              {recommendedCourses.map((course) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <CourseCard course={course} />
                </motion.div>
              ))}
            </div>
            
            <div className="mt-6 flex justify-center">
              <Button 
                variant="outline" 
                onClick={() => setShowRecommendations(false)}
                className="text-empower-terracotta border-empower-terracotta hover:bg-empower-terracotta/10"
              >
                Show All Courses
              </Button>
            </div>
          </div>
        )}

        <div ref={coursesListRef}>
          {!showRecommendations && (
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
                  <TabsTrigger 
                    value="trending" 
                    className="data-[state=active]:bg-empower-gold data-[state=active]:text-empower-brown"
                  >
                    <TrendingUp className="mr-2" size={18} />
                    Trending Courses
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
              
              <TabsContent value="trending" className="animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredTrendingCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          )}
        </div>

        {/* Questionnaire Modal */}
        <QuestionnaireModal 
          open={questionnaireOpen} 
          onOpenChange={setQuestionnaireOpen} 
          onRecommendCourses={handleRecommendCourses}
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default Courses;
