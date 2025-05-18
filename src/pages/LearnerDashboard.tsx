import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getUserCourses } from '@/services/courseService'; // Fixed: Use correct function name
import { useAuth } from '@/contexts/AuthContext';
import { Course } from '@/types/course';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const LearnerDashboard: React.FC = () => {
  const { user } = useAuth();
  const userId = user?.id || '';
  
  const { data: enrolledCourses, isLoading } = useQuery({
    queryKey: ['enrolledCourses', userId],
    queryFn: () => getUserCourses(userId),
    enabled: !!userId
  });

  const coursesArray = (enrolledCourses as Course[]) || [];
  const hasEnrolledCourses = coursesArray.length > 0;
  
  return (
    <div className="min-h-screen flex flex-col bg-empower-ivory">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-empower-brown">My Courses</h1>
        
        {isLoading ? (
          <p className="text-center text-gray-500">Loading enrolled courses...</p>
        ) : (
          hasEnrolledCourses ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coursesArray.map((course) => (
                <Card key={course.id} className="bg-white shadow-md rounded-md overflow-hidden hover-zoom">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={course.thumbnail} 
                      alt={course.title} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-bold line-clamp-2">{course.title}</h3>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={course.instructor.avatar} alt={course.instructor.name} />
                        <AvatarFallback>{course.instructor.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span>{course.instructor.name}</span>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pb-4">
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={16} 
                            className={i < course.rating ? "fill-empower-gold text-empower-gold" : "text-muted"}
                          />
                        ))}
                        <span className="text-xs text-muted-foreground ml-1">({course.reviews} reviews)</span>
                      </div>
                      <div className="font-semibold">
                        {course.price === 0 ? (
                          <span className="text-green-600">Free</span>
                        ) : (
                          <span>${course.price}</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-3">
                      <Link to={`/learner-classroom`} state={{ courseId: course.id }}>
                        <Button className="bg-empower-terracotta hover:bg-empower-terracotta/90 transition-all duration-300">
                          Go to Classroom
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-gray-500">
              <p>You are not enrolled in any courses yet.</p>
              <Link to="/courses">
                <Button className="mt-4 bg-empower-terracotta hover:bg-empower-terracotta/90 text-white">
                  Explore Courses
                </Button>
              </Link>
            </div>
          )
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default LearnerDashboard;
