
import React, { useEffect, useState } from 'react';
import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowLeft, Book, Calendar, Clock, Users, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { handmadeCourses, digitalCourses } from '@/data';
import PageTransition from '@/components/PageTransition';

interface CourseModule {
  title: string;
  completed: boolean;
}

const LearnerClassroom = () => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeCourseId, setActiveCourseId] = useState<string | null>(null);
  const [courseData, setCourseData] = useState<any>(null);
  const [modules, setModules] = useState<CourseModule[]>([]);
  const [activeModule, setActiveModule] = useState<number>(0);
  
  useEffect(() => {
    // Check if we have a courseId in the navigation state
    const courseId = location.state?.courseId;
    if (courseId) {
      setActiveCourseId(courseId);
      
      // Find the course data based on the ID
      const allCourses = [...handmadeCourses, ...digitalCourses];
      const foundCourse = allCourses.find(course => course.id === courseId) || 
                           {id: courseId, title: `Course ${courseId}`};
      
      setCourseData(foundCourse);
      
      // Set up mock modules for the course
      setModules([
        { title: "Introduction", completed: true },
        { title: "Core Concepts", completed: true },
        { title: "Advanced Topics", completed: false },
        { title: "Project Work", completed: false },
        { title: "Final Assessment", completed: false },
      ]);
      
      console.log(`Loading course content for course ID: ${courseId}`);
    } else {
      // If no course ID, redirect to dashboard
      navigate('/learner-dashboard');
    }
  }, [location.state, navigate]);

  // Redirect if not authenticated or not a learner
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (user?.role !== 'learner') {
    return <Navigate to="/" />;
  }

  const handleModuleClick = (index: number) => {
    setActiveModule(index);
  };
  
  const handleBackToDashboard = () => {
    navigate('/learner-dashboard');
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <Button 
              variant="ghost" 
              onClick={handleBackToDashboard}
              className="text-empower-brown mb-2"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
            </Button>
            <h1 className="text-2xl font-bold text-empower-brown">
              {courseData?.title || "Course Classroom"}
            </h1>
            {courseData && (
              <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" /> 
                  <span>{courseData.startDate || "Self-paced"}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" /> 
                  <span>{courseData.duration || "8 weeks"}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" /> 
                  <span>{courseData.participants || "125"} students enrolled</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-1 text-yellow-500" /> 
                  <span>{courseData.rating || "4.8"} ({courseData.reviews || "42"} reviews)</span>
                </div>
              </div>
            )}
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar with modules */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-4">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <Book className="mr-2 h-5 w-5 text-empower-terracotta" /> 
                  Course Modules
                </h2>
                <ul className="space-y-2">
                  {modules.map((module, index) => (
                    <li key={index}>
                      <button
                        onClick={() => handleModuleClick(index)}
                        className={`w-full text-left py-2 px-3 rounded-md transition-colors ${
                          activeModule === index 
                            ? 'bg-empower-terracotta text-white' 
                            : module.completed 
                              ? 'bg-empower-terracotta/10 text-empower-brown' 
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{module.title}</span>
                          {module.completed && (
                            <span className="text-xs font-medium">
                              {activeModule === index ? '✓' : 'COMPLETED'}
                            </span>
                          )}
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Main content area */}
            <div className="lg:col-span-3">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">
                  {modules[activeModule]?.title || "Course Content"}
                </h2>
                
                {activeCourseId ? (
                  <div>
                    <p className="text-gray-600 mb-4">
                      Welcome to your classroom! This is where you'll access all your course materials,
                      assignments, and connect with instructors.
                    </p>
                    
                    {/* Module content - would be dynamically loaded based on the module */}
                    <div className="border rounded-lg p-4 bg-gray-50">
                      {activeModule === 0 && (
                        <div>
                          <h3 className="font-medium mb-2">Module 1: Introduction</h3>
                          <p className="mb-4 text-gray-600">
                            This module introduces you to the foundational concepts of the course.
                            You'll learn the basic terminology and principles that will be expanded upon
                            in later modules.
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="border rounded p-3 bg-white">
                              <h4 className="font-medium text-empower-brown">Video Lecture</h4>
                              <p className="text-sm text-gray-500 mb-2">Duration: 45 minutes</p>
                              <Button className="w-full bg-empower-terracotta hover:bg-empower-terracotta/90">
                                Watch Lecture
                              </Button>
                            </div>
                            <div className="border rounded p-3 bg-white">
                              <h4 className="font-medium text-empower-brown">Reading Materials</h4>
                              <p className="text-sm text-gray-500 mb-2">3 articles, 1 PDF guide</p>
                              <Button className="w-full bg-empower-terracotta hover:bg-empower-terracotta/90">
                                Access Materials
                              </Button>
                            </div>
                          </div>
                          <div className="border rounded p-3 bg-white">
                            <h4 className="font-medium text-empower-brown">Introductory Quiz</h4>
                            <p className="text-sm text-gray-500 mb-2">Test your understanding of the basics</p>
                            <div className="flex justify-between items-center">
                              <span className="text-green-600 text-sm font-medium">Completed ✓</span>
                              <Button variant="outline" className="text-empower-terracotta border-empower-terracotta">
                                Review Quiz
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {activeModule === 1 && (
                        <div>
                          <h3 className="font-medium mb-2">Module 2: Core Concepts</h3>
                          <p className="mb-4 text-gray-600">
                            Building on the introduction, this module explores the core concepts in greater detail.
                            You'll gain practical experience through guided exercises and examples.
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="border rounded p-3 bg-white">
                              <h4 className="font-medium text-empower-brown">Video Lecture</h4>
                              <p className="text-sm text-gray-500 mb-2">Duration: 1 hour 15 minutes</p>
                              <Button className="w-full bg-empower-terracotta hover:bg-empower-terracotta/90">
                                Watch Lecture
                              </Button>
                            </div>
                            <div className="border rounded p-3 bg-white">
                              <h4 className="font-medium text-empower-brown">Practical Exercise</h4>
                              <p className="text-sm text-gray-500 mb-2">Hands-on application</p>
                              <Button className="w-full bg-empower-terracotta hover:bg-empower-terracotta/90">
                                Start Exercise
                              </Button>
                            </div>
                          </div>
                          <div className="border rounded p-3 bg-white">
                            <h4 className="font-medium text-empower-brown">Assignment</h4>
                            <p className="text-sm text-gray-500 mb-2">Apply what you've learned</p>
                            <div className="flex justify-between items-center">
                              <span className="text-green-600 text-sm font-medium">Submitted ✓</span>
                              <Button variant="outline" className="text-empower-terracotta border-empower-terracotta">
                                View Feedback
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {activeModule >= 2 && (
                        <div className="text-center py-8">
                          <h3 className="font-medium mb-2">Module {activeModule + 1}: {modules[activeModule]?.title}</h3>
                          <p className="mb-4 text-gray-600">
                            This module will be unlocked according to the course schedule.
                          </p>
                          <Button disabled variant="outline">
                            Coming Soon
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <h2 className="text-xl font-semibold mb-2">No Course Selected</h2>
                    <p className="text-gray-600">
                      Please return to dashboard and select a course to view its content.
                    </p>
                    <Button 
                      onClick={handleBackToDashboard}
                      className="mt-4 px-4 py-2 bg-empower-terracotta text-white rounded-md hover:bg-empower-terracotta/90 transition-colors"
                    >
                      Back to Dashboard
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </PageTransition>
  );
};

export default LearnerClassroom;
