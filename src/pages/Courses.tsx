
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
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
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-empower-brown mb-4">Our Courses</h1>
          <p className="text-lg max-w-3xl mx-auto">
            Whether you're discovering the art of handcraft or diving into digital skills, 
            our courses are tailored to help you grow, create, and thrive. Learn at your own pace, 
            with real instructors guiding you every step of the way.
          </p>
        </div>
        
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
        
        <TrendingCourses />

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
