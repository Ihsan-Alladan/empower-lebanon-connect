
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { GraduationCap, Book, Clock, Calendar, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import PageTransition from '@/components/PageTransition';
import { getEnrolledCourses } from '@/services/courseService';

const LearnerDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const { data: enrolledCourses = [], isLoading, error } = useQuery({
    queryKey: ['enrolledCourses'],
    queryFn: getEnrolledCourses,
    enabled: isAuthenticated && user?.role === 'learner',
    retry: false,
    onError: (err) => {
      console.error("Failed to fetch enrolled courses:", err);
      toast.error("Failed to load your courses. Please try again later.");
    }
  });

  useEffect(() => {
    // Redirect if not authenticated or not a learner
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    if (user?.role !== 'learner') {
      navigate('/');
      return;
    }
  }, [isAuthenticated, user, navigate]);

  const handleCourseClick = (courseId: string) => {
    // Navigate to the classroom with the selected course
    navigate('/learner-classroom', { state: { courseId } });
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-empower-brown">
              My Learning Dashboard
            </h1>
            <p className="text-gray-600 mt-2">
              Welcome back, {user?.name}! Continue your learning journey.
            </p>
          </div>
          
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                <Book className="text-empower-terracotta" />
                My Enrolled Courses
              </h2>
              <Button 
                variant="outline" 
                onClick={() => navigate('/courses')}
                className="text-empower-terracotta border-empower-terracotta hover:bg-empower-terracotta/10"
              >
                Explore More Courses
              </Button>
            </div>
            
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((_, index) => (
                  <Card key={index} className="bg-gray-100 animate-pulse h-64">
                    <div className="h-full"></div>
                  </Card>
                ))}
              </div>
            ) : enrolledCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrolledCourses.map((course) => (
                  <motion.div
                    key={course.id}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    onClick={() => handleCourseClick(course.id)}
                  >
                    <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                      <div className="h-40 overflow-hidden">
                        <img 
                          src={course.thumbnail} 
                          alt={course.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardHeader className="pb-2">
                        <h3 className="font-semibold text-lg">{course.title}</h3>
                        <p className="text-sm text-gray-500">Instructor: {course.instructor.name}</p>
                      </CardHeader>
                      <CardContent className="pb-3">
                        <div className="flex justify-between text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Clock size={14} />
                            <span>Last accessed: {course.lastAccessed ? new Date(course.lastAccessed).toLocaleString() : 'Never'}</span>
                          </div>
                        </div>
                        <div className="mt-2">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className="bg-empower-terracotta h-2.5 rounded-full" 
                              style={{ width: `${course.progress || 0}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-right mt-1">{course.progress || 0}% complete</p>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <Button 
                          className="w-full bg-empower-terracotta hover:bg-empower-terracotta/90"
                          onClick={(e) => {
                            e.stopPropagation(); 
                            handleCourseClick(course.id);
                          }}
                        >
                          Continue Learning <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 border rounded-lg p-8 text-center">
                <GraduationCap className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No courses yet</h3>
                <p className="text-gray-500 mb-6">
                  You haven't enrolled in any courses yet. Explore our catalog to find courses that interest you.
                </p>
                <Button 
                  onClick={() => navigate('/courses')}
                  className="bg-empower-terracotta hover:bg-empower-terracotta/90"
                >
                  Browse Courses
                </Button>
              </div>
            )}
          </section>
        </main>
        
        <Footer />
      </div>
    </PageTransition>
  );
};

export default LearnerDashboard;
