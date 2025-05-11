
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Calendar, Clock, GraduationCap, Users, Star, ChevronRight, 
  ShieldCheck, Award, Video, CheckCircle, Heart, Bookmark
} from 'lucide-react';
import { motion } from 'framer-motion';

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';

import { handmadeCourses, digitalCourses } from '@/data';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/sonner';

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState<any>(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  
  useEffect(() => {
    // Find the course from either handmade or digital courses
    const foundCourse = 
      [...handmadeCourses, ...digitalCourses].find(c => c.id === id);
    
    if (foundCourse) {
      setCourse(foundCourse);
      
      // Check if user is enrolled (simplistic implementation for demo)
      // In a real app, this would check against user data in a database
      setIsEnrolled(localStorage.getItem(`enrolled-${id}`) === 'true');
    }
  }, [id]);

  if (!course) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>
  }

  const handleEnroll = () => {
    if (!isAuthenticated) {
      toast.error("Please log in to enroll", {
        description: "You need an account to access this course"
      });
      navigate('/login');
      return;
    }

    if (user?.role !== 'learner') {
      toast.error("Invalid account type", {
        description: "You need a learner account to enroll in courses"
      });
      return;
    }

    // Simple enrollment simulation
    localStorage.setItem(`enrolled-${id}`, 'true');
    setIsEnrolled(true);
    
    toast.success("Successfully enrolled!", {
      description: "You now have access to all course materials"
    });

    // Redirect learners to the dashboard after enrolling
    setTimeout(() => {
      navigate('/learner-dashboard');
    }, 1000);
  };

  const handleAccessCourse = () => {
    // Redirect to learner classroom with this course selected
    navigate('/learner-classroom', { state: { courseId: id } });
  };

  // Ensure curriculum and review data exists with proper fallbacks
  const curriculum = course.curriculum || course.modules || [];
  const reviewsList = course.reviewsList || course.studentReviews || [];
  const learningObjectives = course.learningObjectives || [];

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1 container mx-auto px-4 py-8">
          {/* Course Hero Section */}
          <section className="mb-8">
            <div className="relative rounded-xl overflow-hidden shadow-lg">
              <img 
                src={course.image || course.thumbnail} 
                alt={course.title} 
                className="w-full h-64 object-cover object-center" 
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute bottom-0 left-0 p-6 w-full">
                <motion.h1 
                  className="text-3xl font-bold text-white mb-2"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {course.title}
                </motion.h1>
                <motion.p 
                  className="text-lg text-white/80"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {course.description}
                </motion.p>
              </div>
            </div>
          </section>

          {/* Course Info */}
          <section className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Course Details</h2>
                <ul>
                  <li className="flex items-center gap-2 mb-2">
                    <Calendar className="h-5 w-5 text-empower-terracotta" />
                    <span className="font-medium">Start Date:</span> {course.startDate || 'Flexible'}
                  </li>
                  <li className="flex items-center gap-2 mb-2">
                    <Clock className="h-5 w-5 text-empower-terracotta" />
                    <span className="font-medium">Duration:</span> {course.duration}
                  </li>
                  <li className="flex items-center gap-2 mb-2">
                    <GraduationCap className="h-5 w-5 text-empower-terracotta" />
                    <span className="font-medium">Level:</span> {course.level}
                  </li>
                  <li className="flex items-center gap-2 mb-2">
                    <Users className="h-5 w-5 text-empower-terracotta" />
                    <span className="font-medium">Participants:</span> {course.participants || course.studentsEnrolled || 0}
                  </li>
                  <li className="flex items-center gap-2 mb-2">
                    <Star className="h-5 w-5 text-empower-terracotta" />
                    <span className="font-medium">Rating:</span> {course.rating} ({course.reviews} reviews)
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">Instructor</h2>
                <div className="flex items-center gap-4">
                  <img 
                    src={course.instructorAvatar || course.instructor?.avatar} 
                    alt={course.instructorName || course.instructor?.name} 
                    className="w-16 h-16 rounded-full object-cover" 
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{course.instructorName || course.instructor?.name}</h3>
                    <p className="text-gray-600">{course.instructorTitle || course.instructor?.title}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Course Content Tabs */}
          <section>
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="bg-empower-ivory/50">
                <TabsTrigger value="overview" className="data-[state=active]:bg-empower-gold data-[state=active]:text-empower-brown">Overview</TabsTrigger>
                <TabsTrigger value="curriculum" className="data-[state=active]:bg-empower-gold data-[state=active]:text-empower-brown">Curriculum</TabsTrigger>
                <TabsTrigger value="reviews" className="data-[state=active]:bg-empower-gold data-[state=active]:text-empower-brown">Reviews</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="mt-6 animate-fade-in">
                <h3 className="text-xl font-semibold mb-3">About this course</h3>
                <p className="text-gray-700 mb-4">{course.overview || course.description}</p>
                
                <h3 className="text-xl font-semibold mb-3">What you'll learn</h3>
                <ul className="list-disc list-inside text-gray-700 mb-4">
                  {learningObjectives.map((objective, index) => (
                    <li key={index}>{objective}</li>
                  ))}
                </ul>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="text-green-500 h-5 w-5" />
                    <p className="font-medium">Quality Guaranteed</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="text-yellow-500 h-5 w-5" />
                    <p className="font-medium">Certificate of Completion</p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="curriculum" className="mt-6 animate-fade-in">
                <h3 className="text-xl font-semibold mb-3">Course Curriculum</h3>
                <ul className="space-y-4">
                  {curriculum && curriculum.map((module, index) => (
                    <li key={index} className="bg-white rounded-lg shadow-md p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Video className="h-5 w-5 text-empower-terracotta" />
                          <h4 className="font-semibold">{module.title}</h4>
                        </div>
                        <span className="text-gray-600">{module.duration}</span>
                      </div>
                      <p className="text-gray-700 mt-2">{module.description}</p>
                      <ul className="mt-2 space-y-2">
                        {module.lessons && module.lessons.map((lesson, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <ChevronRight className="h-4 w-4 text-gray-500" />
                            {typeof lesson === 'string' ? lesson : lesson.title}
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-6 animate-fade-in">
                <h3 className="text-xl font-semibold mb-3">Course Reviews</h3>
                {reviewsList && reviewsList.length > 0 ? (
                  reviewsList.map((review, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-4 mb-4">
                      <div className="flex items-start gap-4">
                        <img 
                          src={review.avatar} 
                          alt={review.name} 
                          className="w-10 h-10 rounded-full object-cover" 
                        />
                        <div>
                          <h4 className="font-semibold">{review.name}</h4>
                          <div className="flex items-center gap-1 text-yellow-500 mb-1">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="h-4 w-4" />
                            ))}
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No reviews yet for this course.</p>
                )}
              </TabsContent>
            </Tabs>
          </section>

          {/* Action Buttons */}
          <section className="mt-8">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {isEnrolled ? (
                <Button 
                  size="lg"
                  className="bg-empower-olive hover:bg-empower-olive/90 text-white shadow-lg"
                  onClick={handleAccessCourse}
                >
                  Access Course <CheckCircle className="ml-2 h-5 w-5" />
                </Button>
              ) : (
                <>
                  <Button 
                    size="lg"
                    className="bg-empower-terracotta hover:bg-empower-terracotta/90 text-white shadow-lg"
                    onClick={handleEnroll}
                  >
                    Enroll Now for ${course.price}
                  </Button>
                  <Button variant="outline">
                    <Heart className="mr-2 h-5 w-5" /> Add to Wishlist
                  </Button>
                  <Button variant="outline">
                    <Bookmark className="mr-2 h-5 w-5" /> Save for Later
                  </Button>
                </>
              )}
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </PageTransition>
  );
};

export default CourseDetail;
