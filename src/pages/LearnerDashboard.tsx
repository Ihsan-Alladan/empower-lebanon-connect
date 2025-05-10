
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { GraduationCap, Book, Clock, Calendar, ChevronRight } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import PageTransition from '@/components/PageTransition';

// Type for enrolled course
interface EnrolledCourse {
  id: string;
  title: string;
  instructor: string;
  thumbnail: string;
  lastAccessed?: string;
  progress?: number;
}

const LearnerDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

    // Simulate fetching enrolled courses
    // In a real app, this would come from a database
    const fetchEnrolledCourses = () => {
      setIsLoading(true);
      
      // Check localStorage for enrolled courses
      const enrolledCourseIds = Object.keys(localStorage)
        .filter(key => key.startsWith('enrolled-'))
        .map(key => key.replace('enrolled-', ''));
      
      // Simulate API call delay
      setTimeout(() => {
        // If no enrolled courses, set empty array
        if (enrolledCourseIds.length === 0) {
          setEnrolledCourses([]);
          setIsLoading(false);
          return;
        }

        // Mock data for enrolled courses based on localStorage
        const mockEnrolledCourses: EnrolledCourse[] = [
          {
            id: 'course-1',
            title: 'Introduction to Crochet',
            instructor: 'Sarah Johnson',
            thumbnail: '/lovable-uploads/dccc32b9-798a-4692-9816-6e03d3cfedf2.png',
            lastAccessed: '2 days ago',
            progress: 45
          },
          {
            id: 'course-2',
            title: 'Web Development Fundamentals',
            instructor: 'Michael Chen',
            thumbnail: '/lovable-uploads/88cb08a3-5df1-4252-b772-5ebb5ed8b0d5.png',
            lastAccessed: '1 week ago',
            progress: 30
          }
        ];
        
        // Filter courses based on enrolled IDs
        const userEnrolledCourses = mockEnrolledCourses.filter(
          course => enrolledCourseIds.includes(course.id)
        );
        
        setEnrolledCourses(userEnrolledCourses);
        setIsLoading(false);
      }, 800);
    };

    fetchEnrolledCourses();
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
                        <p className="text-sm text-gray-500">Instructor: {course.instructor}</p>
                      </CardHeader>
                      <CardContent className="pb-3">
                        <div className="flex justify-between text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Clock size={14} />
                            <span>Last accessed: {course.lastAccessed}</span>
                          </div>
                        </div>
                        <div className="mt-2">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className="bg-empower-terracotta h-2.5 rounded-full" 
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-right mt-1">{course.progress}% complete</p>
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
