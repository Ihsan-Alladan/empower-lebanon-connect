
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link } from 'react-router-dom';

interface ClassroomHeaderProps {
  classroom: {
    id: string;
    title: string;
    course: string;
    instructor: {
      name: string;
      avatar: string;
      role: string;
    };
  };
}

const ClassroomHeader: React.FC<ClassroomHeaderProps> = ({ classroom }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-empower-brown text-white"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center mb-1">
          <Link 
            to="/courses" 
            className="flex items-center text-white/90 hover:text-white text-sm font-medium"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Courses
          </Link>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between md:items-center py-2">
          <div>
            <h1 className="text-2xl font-bold">{classroom.title}</h1>
            <p className="text-white/90">{classroom.course}</p>
          </div>
          
          <div className="flex items-center mt-4 md:mt-0 space-x-3">
            <Avatar className="h-10 w-10 border-2 border-white/20">
              <AvatarImage src={classroom.instructor.avatar} />
              <AvatarFallback>
                {classroom.instructor.name
                  .split(' ')
                  .map((n: string) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{classroom.instructor.name}</p>
              <p className="text-xs text-white/80 capitalize">{classroom.instructor.role}</p>
            </div>
          </div>
        </div>
        
        <div className="hidden md:flex items-center space-x-8 pt-4">
          <button className="text-sm font-medium opacity-80 hover:opacity-100 border-b-2 border-transparent hover:border-white transition-all">Overview</button>
          <button className="text-sm font-medium opacity-80 hover:opacity-100 border-b-2 border-transparent hover:border-white transition-all">Resources</button>
          <button className="text-sm font-medium opacity-80 hover:opacity-100 border-b-2 border-transparent hover:border-white transition-all">Grades</button>
          <button className="text-sm font-medium opacity-80 hover:opacity-100 border-b-2 border-transparent hover:border-white transition-all">People</button>
        </div>
        
        <div className="md:hidden pt-3">
          <button className="w-full flex items-center justify-between py-1 px-3 bg-white/10 rounded">
            <span className="text-sm font-medium">Overview</span>
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ClassroomHeader;
