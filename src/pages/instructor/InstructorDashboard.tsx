
import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Eye, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';

// Mock data for instructor courses
const mockCourses = [
  {
    id: 1,
    title: 'Introduction to Digital Marketing',
    students: 42,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Tech'
  },
  {
    id: 2,
    title: 'Advanced Handmade Jewelry Techniques',
    students: 28,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Handmade'
  },
  {
    id: 3,
    title: 'Sustainable Business Practices',
    students: 36,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Business'
  }
];

// Recent activity mock data
const recentActivities = [
  { id: 1, action: 'Updated course content', course: 'Introduction to Digital Marketing', time: '2 hours ago' },
  { id: 2, action: 'Responded to student feedback', course: 'Advanced Handmade Jewelry Techniques', time: '5 hours ago' },
  { id: 3, action: 'Added new assignment', course: 'Sustainable Business Practices', time: '1 day ago' },
  { id: 4, action: 'Graded assignments', course: 'Introduction to Digital Marketing', time: '2 days ago' },
];

const InstructorDashboard: React.FC = () => {
  const { user } = useAuth();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-8 bg-gradient-to-r from-empower-brown to-blue-800 text-white rounded-xl relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-cover bg-center opacity-10" 
             style={{ backgroundImage: "url('https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')" }}>
          <div className="absolute inset-0 bg-empower-brown/50 mix-blend-multiply" />
        </div>

        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-2">Welcome Back, {user?.name}</h1>
          <p className="text-lg opacity-90">It's great to see you again! Here's your instructor dashboard.</p>
        </div>
      </motion.div>

      {/* Stats Overview */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <motion.div variants={itemVariants} className="bg-white rounded-lg shadow p-6 border border-gray-100">
          <h2 className="text-gray-500 text-sm uppercase font-semibold">Total Students</h2>
          <p className="text-3xl font-bold text-empower-brown mt-2">106</p>
          <div className="flex items-center mt-4 text-emerald-600">
            <span className="text-sm">+12% from last month</span>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white rounded-lg shadow p-6 border border-gray-100">
          <h2 className="text-gray-500 text-sm uppercase font-semibold">Active Courses</h2>
          <p className="text-3xl font-bold text-empower-brown mt-2">3</p>
          <div className="flex items-center mt-4 text-empower-terracotta">
            <span className="text-sm">New course pending approval</span>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white rounded-lg shadow p-6 border border-gray-100">
          <h2 className="text-gray-500 text-sm uppercase font-semibold">Average Rating</h2>
          <p className="text-3xl font-bold text-empower-brown mt-2">4.7</p>
          <div className="flex items-center mt-4 text-sky-600">
            <span className="text-sm">32 new reviews this week</span>
          </div>
        </motion.div>
      </motion.div>

      {/* My Courses Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-empower-brown">My Courses</h2>
          <Button className="flex items-center space-x-2 bg-empower-terracotta hover:bg-empower-terracotta/90">
            <Plus className="h-4 w-4" />
            <span>Add Course</span>
          </Button>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {mockCourses.map((course) => (
            <motion.div 
              key={course.id} 
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group"
            >
              <Card className="h-full overflow-hidden transition-all border-gray-200 hover:shadow-lg">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="w-full h-full object-cover transition-transform group-hover:scale-105" 
                  />
                  <Badge className="absolute top-3 right-3 bg-empower-terracotta hover:bg-empower-terracotta/90">
                    {course.category}
                  </Badge>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold line-clamp-2">{course.title}</CardTitle>
                  <CardDescription>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-sm">{course.students} Students</span>
                      <div className="flex items-center space-x-1">
                        <span className="text-sm font-medium">{course.rating}</span>
                        <span className="text-yellow-500">★</span>
                      </div>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardFooter className="pt-0">
                  <div className="flex w-full gap-2">
                    <Button variant="outline" size="sm" className="flex-1 flex items-center justify-center gap-1">
                      <Edit className="h-3.5 w-3.5" />
                      <span>Edit</span>
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 flex items-center justify-center gap-1">
                      <Eye className="h-3.5 w-3.5" />
                      <span>View</span>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Recent Activity Section */}
      <div>
        <h2 className="text-2xl font-bold text-empower-brown mb-6">Recent Activity</h2>
        <Card>
          <CardContent className="p-0">
            <ul className="divide-y divide-gray-100">
              {recentActivities.map((activity, index) => (
                <motion.li 
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 hover:bg-gray-50"
                >
                  <div>
                    <p className="font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-500">{activity.course}</p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500">{activity.time}</span>
                    <ArrowRight className="h-4 w-4 ml-2 text-gray-400" />
                  </div>
                </motion.li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="flex justify-center p-4 border-t">
            <Button variant="ghost" className="text-empower-terracotta hover:text-empower-terracotta/90 hover:bg-blue-50">
              View All Activity
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default InstructorDashboard;
