
import React, { useEffect, useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

// This is a simple implementation of the LearnerClassroom component
// In a real application, this would be more complex with actual course content
const LearnerClassroom = () => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();
  const [activeCourseId, setActiveCourseId] = useState<string | null>(null);
  
  useEffect(() => {
    // Check if we have a courseId in the navigation state
    const courseId = location.state?.courseId;
    if (courseId) {
      setActiveCourseId(courseId);
      // You could load the specific course content here
      console.log(`Loading course content for course ID: ${courseId}`);
    }
  }, [location.state]);

  // Redirect if not authenticated or not a learner
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (user?.role !== 'learner') {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-empower-brown">Learner Classroom</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {activeCourseId ? (
          <div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">
                Currently viewing course: {activeCourseId}
              </h2>
              <p className="text-gray-600 mb-4">
                Welcome to your classroom! This is where you'll access all your course materials,
                assignments, and connect with instructors.
              </p>
              
              {/* This would be replaced with actual course content */}
              <div className="border rounded-lg p-4 bg-gray-50">
                <h3 className="font-medium">Course Materials</h3>
                <ul className="mt-2 space-y-2">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    Module 1: Introduction
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    Module 2: Core Concepts
                  </li>
                  <li className="flex items-center text-gray-400">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    Module 3: Advanced Topics (Unlocks in 2 days)
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-2">No Course Selected</h2>
            <p className="text-gray-600">
              Please select a course from the courses page to view its content.
            </p>
            <button 
              onClick={() => window.location.href = '/courses'}
              className="mt-4 px-4 py-2 bg-empower-terracotta text-white rounded-md hover:bg-empower-terracotta/90 transition-colors"
            >
              Browse Courses
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default LearnerClassroom;
