
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, Filter, GraduationCap, Brush, Code 
} from "lucide-react";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CourseCard from '@/components/CourseCard';
import CourseFilters from '@/components/CourseFilters';
import TrendingCourses from '@/components/TrendingCourses';
import { handmadeCourses, digitalCourses } from '@/data';

const Courses: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [selectedTab, setSelectedTab] = useState('all');
  const [animatedIn, setAnimatedIn] = useState(false);

  useEffect(() => {
    // Trigger animations after component mounts
    setAnimatedIn(true);
  }, []);

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
      
      <main className="flex-1 container mx-auto px-4 py-8 overflow-hidden">
        <div className={`text-center mb-12 transition-all duration-1000 ease-out ${animatedIn ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-gradient-to-r from-empower-terracotta to-empower-coral bg-clip-text text-transparent">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Courses</h1>
          </div>
          <p className="text-lg max-w-3xl mx-auto text-empower-brown/80 slide-up">
            Whether you're discovering the art of handcraft or diving into digital skills, 
            our courses are tailored to help you grow, create, and thrive. Learn at your own pace, 
            with real instructors guiding you every step of the way.
          </p>
        </div>
        
        <div className={`transition-all duration-700 delay-300 ${animatedIn ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
          <TrendingCourses />
        </div>

        <div className={`mb-8 transition-all duration-700 delay-500 ${animatedIn ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
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

        <Tabs 
          defaultValue="all" 
          value={selectedTab}
          onValueChange={setSelectedTab}
          className={`w-full transition-all duration-700 delay-700 ${animatedIn ? 'opacity-100' : 'opacity-0 translate-y-10'}`}
        >
          <div className="flex justify-center mb-8">
            <TabsList className="bg-empower-ivory/50 p-1 rounded-full overflow-hidden shadow-md">
              <TabsTrigger 
                value="all" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-empower-terracotta data-[state=active]:to-empower-coral data-[state=active]:text-white rounded-full px-6 py-2 transition-all duration-300"
              >
                <GraduationCap className="mr-2" size={18} />
                All Courses
              </TabsTrigger>
              <TabsTrigger 
                value="handmade" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-empower-gold data-[state=active]:to-empower-peach data-[state=active]:text-empower-brown rounded-full px-6 py-2 transition-all duration-300"
              >
                <Brush className="mr-2" size={18} />
                Handmade & Crafts
              </TabsTrigger>
              <TabsTrigger 
                value="digital" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-empower-skyblue data-[state=active]:to-empower-lavender data-[state=active]:text-white rounded-full px-6 py-2 transition-all duration-300"
              >
                <Code className="mr-2" size={18} />
                Technology & Digital Skills
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="stagger-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...filteredHandmadeCourses, ...filteredDigitalCourses].map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="handmade" className="stagger-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredHandmadeCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="digital" className="stagger-in">
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
