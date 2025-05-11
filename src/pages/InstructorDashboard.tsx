
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import InstructorLayout from '@/components/instructor/InstructorLayout';
import InstructorHome from '@/components/instructor/InstructorHome';
import InstructorCourses from '@/components/instructor/InstructorCourses';
import InstructorStudents from '@/components/instructor/InstructorStudents';
import InstructorSchedule from '@/components/instructor/InstructorSchedule';
import InstructorSettings from '@/components/instructor/InstructorSettings';
import InstructorMessages from '@/components/instructor/InstructorMessages';
import InstructorAssignments from '@/components/instructor/InstructorAssignments';
import InstructorAddCourse from '@/components/instructor/InstructorAddCourse';
import InstructorProgress from '@/components/instructor/InstructorProgress';
import InstructorClassroom from '@/components/instructor/InstructorClassroom';
import { useAuth } from '@/contexts/AuthContext';

const InstructorDashboard: React.FC = () => {
  const { user } = useAuth();
  
  // Redirect if not logged in or not an instructor
  if (!user || user.role !== 'instructor') {
    return <Navigate to="/login" />;
  }
  
  return (
    <InstructorLayout>
      <Routes>
        <Route path="/" element={<InstructorHome />} />
        <Route path="/courses" element={<InstructorCourses />} />
        <Route path="/add-course" element={<InstructorAddCourse />} />
        <Route path="/assignments" element={<InstructorAssignments />} />
        <Route path="/classroom" element={<InstructorClassroom />} />
        <Route path="/progress" element={<InstructorProgress />} />
        <Route path="/students" element={<InstructorStudents />} />
        <Route path="/schedule" element={<InstructorSchedule />} />
        <Route path="/messages" element={<InstructorMessages />} />
        <Route path="/settings" element={<InstructorSettings />} />
        <Route path="*" element={<Navigate to="/instructor-dashboard" />} />
      </Routes>
    </InstructorLayout>
  );
};

export default InstructorDashboard;
