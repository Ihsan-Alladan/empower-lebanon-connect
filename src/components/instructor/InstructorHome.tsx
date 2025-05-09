
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  BookOpen, 
  Calendar,
  Star, 
  Video,
  Clock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Sample data for charts
const studentsData = [
  { name: 'Jan', count: 12 },
  { name: 'Feb', count: 19 },
  { name: 'Mar', count: 14 },
  { name: 'Apr', count: 21 },
  { name: 'May', count: 25 },
  { name: 'Jun', count: 18 },
  { name: 'Jul', count: 22 },
  { name: 'Aug', count: 30 },
];

// Card variants for animation
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
    }
  })
};

const InstructorHome: React.FC = () => {
  const upcomingClasses = [
    {
      id: 1,
      title: 'Advanced Crocheting Techniques',
      time: '10:00 AM - 11:30 AM',
      date: 'Today',
      students: 12
    },
    {
      id: 2,
      title: 'Introduction to Handloom Weaving',
      time: '2:00 PM - 4:00 PM',
      date: 'Tomorrow',
      students: 8
    },
    {
      id: 3,
      title: 'Traditional Embroidery Workshop',
      time: '11:00 AM - 1:00 PM',
      date: 'Sep 12, 2023',
      students: 15
    }
  ];
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-empower-brown mb-6">Instructor Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { title: 'Total Students', value: '126', icon: <Users className="text-empower-terracotta" /> },
            { title: 'Active Courses', value: '8', icon: <BookOpen className="text-empower-terracotta" /> },
            { title: 'Upcoming Classes', value: '12', icon: <Calendar className="text-empower-terracotta" /> },
            { title: 'Average Rating', value: '4.8', icon: <Star className="text-empower-terracotta" /> },
          ].map((item, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
            >
              <Card>
                <CardContent className="p-6 flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">{item.title}</p>
                    <p className="text-2xl font-bold">{item.value}</p>
                  </div>
                  <div className="bg-slate-100 p-3 rounded-full">
                    {item.icon}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          variants={cardVariants}
          custom={4}
          initial="hidden"
          animate="visible"
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Student Enrollment</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={studentsData}>
                  <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" name="Students" fill="#1EAEDB" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          variants={cardVariants}
          custom={5}
          initial="hidden"
          animate="visible"
        >
          <Card className="h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Upcoming Classes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingClasses.map((cls) => (
                  <div key={cls.id} className="p-3 border rounded-lg hover:bg-slate-50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">{cls.title}</h3>
                      <div className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded">
                        {cls.date}
                      </div>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-500 gap-4">
                      <div className="flex items-center">
                        <Clock size={14} className="mr-1" />
                        {cls.time}
                      </div>
                      <div className="flex items-center">
                        <Users size={14} className="mr-1" />
                        {cls.students} students
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          variants={cardVariants}
          custom={6}
          initial="hidden"
          animate="visible"
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Recent Student Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'Emma Johnson', action: 'completed "Introduction to Crochet"', time: '3 hours ago' },
                  { name: 'Michael Smith', action: 'enrolled in "Advanced Weaving"', time: '1 day ago' },
                  { name: 'Sarah Wilson', action: 'left a 5-star review on "Embroidery Basics"', time: '2 days ago' },
                  { name: 'David Brown', action: 'submitted final project for "Traditional Patterns"', time: '3 days ago' },
                ].map((activity, i) => (
                  <div key={i} className="flex items-start space-x-4 p-3 rounded-md hover:bg-slate-50 transition-colors">
                    <div className="bg-slate-100 p-2 rounded-full">
                      <Users size={16} className="text-empower-terracotta" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium">{activity.name}</span> {activity.action}
                      </p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          variants={cardVariants}
          custom={7}
          initial="hidden"
          animate="visible"
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Popular Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { title: 'Traditional Weaving Techniques', students: 45, rating: 4.9 },
                  { title: 'Introduction to Crochet', students: 38, rating: 4.7 },
                  { title: 'Handmade Pottery Workshop', students: 32, rating: 4.8 },
                  { title: 'Sustainable Textile Art', students: 29, rating: 4.5 },
                ].map((course, i) => (
                  <div key={i} className="flex items-center space-x-4 p-3 rounded-md hover:bg-slate-50 transition-colors">
                    <div className="bg-slate-100 p-2 rounded-full">
                      <Video size={16} className="text-empower-terracotta" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{course.title}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <div className="flex items-center text-xs text-gray-500">
                          <Users size={12} className="mr-1" />
                          {course.students} students
                        </div>
                        <div className="flex items-center text-xs text-empower-gold">
                          <Star size={12} className="mr-1 fill-empower-gold" />
                          {course.rating}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default InstructorHome;
