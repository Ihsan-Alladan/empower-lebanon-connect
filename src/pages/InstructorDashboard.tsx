
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import InstructorLayout from '@/components/instructor/InstructorLayout';
import InstructorHome from '@/components/instructor/InstructorHome';
import InstructorCourses from '@/components/instructor/InstructorCourses';
import InstructorStudents from '@/components/instructor/InstructorStudents';
import InstructorSchedule from '@/components/instructor/InstructorSchedule';
import InstructorSettings from '@/components/instructor/InstructorSettings';
import InstructorMessages from '@/components/instructor/InstructorMessages';

const InstructorDashboard: React.FC = () => {
  return (
    <InstructorLayout>
      <Routes>
        <Route path="/" element={<InstructorHome />} />
        <Route path="/courses" element={<InstructorCourses />} />
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
