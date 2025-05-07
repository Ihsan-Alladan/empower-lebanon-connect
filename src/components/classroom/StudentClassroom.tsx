
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Book, 
  MessageSquare, 
  ClipboardList, 
  Bell, 
  Calendar,
  Users,
  FileText,
  Video,
  Image,
  Upload,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import ClassroomHeader from '@/components/classroom/ClassroomHeader';
import CourseContent from '@/components/classroom/CourseContent';
import ClassroomDiscussions from '@/components/classroom/ClassroomDiscussions';
import ClassroomAssignments from '@/components/classroom/ClassroomAssignments';

// Mock classroom data
const mockClassroomData = {
  id: 'c1',
  title: 'Digital Marketing Essentials - Spring 2025',
  course: 'Introduction to Digital Marketing',
  instructor: {
    name: 'Jane Smith',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    role: 'instructor'
  },
  description: 'Learn the fundamentals of digital marketing including social media strategies, SEO, content marketing, and analytics.',
  announcements: [
    {
      id: 'a1',
      title: 'Welcome to the course!',
      content: 'Hello everyone! Welcome to Digital Marketing Essentials. I\'m excited to start this journey with you all. Please take some time to introduce yourselves in the discussion board.',
      date: '2 days ago',
      author: 'Jane Smith'
    },
    {
      id: 'a2',
      title: 'Week 3 materials now available',
      content: 'I\'ve just uploaded the materials for Week 3: Content Marketing Strategy. Please review them before our next live session.',
      date: '5 hours ago',
      author: 'Jane Smith'
    }
  ],
  nextDeadline: {
    assignment: 'Social Media Analysis Report',
    dueDate: '2025-05-15T23:59:00',
    timeRemaining: '3 days'
  },
  activeStudents: 22
};

const StudentClassroom = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [classroom, setClassroom] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('content');

  useEffect(() => {
    // Simulate API fetch
    const fetchClassroomData = async () => {
      setLoading(true);
      // In a real app, fetch data from API using id
      setTimeout(() => {
        setClassroom(mockClassroomData);
        setLoading(false);
      }, 800);
    };

    fetchClassroomData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-pulse flex flex-col items-center space-y-4">
          <div className="rounded-full bg-blue-100 h-16 w-16"></div>
          <div className="h-4 bg-blue-100 rounded w-48"></div>
          <div className="h-3 bg-blue-100 rounded w-40"></div>
        </div>
      </div>
    );
  }

  if (!classroom) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-2xl font-bold text-red-500 mb-2">Classroom Not Found</h2>
        <p className="text-gray-600 mb-6">The classroom you're looking for doesn't exist or you don't have access to it.</p>
        <Button onClick={() => window.history.back()}>Go Back</Button>
      </div>
    );
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ClassroomHeader classroom={classroom} />
      
      <div className="container mx-auto px-4 py-6 pb-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Left sidebar - classroom info and announcements */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Bell className="mr-2 h-5 w-5 text-empower-terracotta" />
                  Announcements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-4"
                >
                  {classroom.announcements.map((announcement: any) => (
                    <motion.div 
                      key={announcement.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-l-4 border-empower-terracotta pl-4 py-2"
                    >
                      <h4 className="font-medium">{announcement.title}</h4>
                      <p className="text-sm text-gray-600 line-clamp-2">{announcement.content}</p>
                      <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                        <span>{announcement.author}</span>
                        <span>{announcement.date}</span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <Button variant="ghost" size="sm" className="w-full justify-center text-empower-terracotta">
                  View All Announcements
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-empower-terracotta" />
                  Next Deadline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <h4 className="font-medium">{classroom.nextDeadline.assignment}</h4>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-empower-terracotta h-2.5 rounded-full w-3/4"></div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Due in {classroom.nextDeadline.timeRemaining}</span>
                    <span className="text-empower-terracotta font-medium">75% Done</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <Button size="sm" className="w-full justify-center bg-empower-terracotta hover:bg-empower-terracotta/90">
                  Complete Assignment
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Users className="mr-2 h-5 w-5 text-empower-terracotta" />
                  Class Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Active Students</span>
                    <Badge variant="outline">{classroom.activeStudents}</Badge>
                  </div>
                  <div className="flex -space-x-2">
                    {[...Array(5)].map((_, i) => (
                      <Avatar key={i} className="border-2 border-white">
                        <AvatarImage src={`https://i.pravatar.cc/150?img=${30 + i}`} />
                        <AvatarFallback>U{i}</AvatarFallback>
                      </Avatar>
                    ))}
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 border-2 border-white text-xs font-medium">
                      +{classroom.activeStudents - 5}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <Button variant="outline" size="sm" className="w-full justify-center">
                  See All Classmates
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          {/* Main content area with tabs */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="content" className="flex items-center gap-2">
                  <Book className="h-4 w-4" />
                  <span className="hidden sm:inline">Course Content</span>
                  <span className="inline sm:hidden">Content</span>
                </TabsTrigger>
                <TabsTrigger value="discussions" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  <span className="hidden sm:inline">Discussions</span>
                  <span className="inline sm:hidden">Discuss</span>
                </TabsTrigger>
                <TabsTrigger value="assignments" className="flex items-center gap-2">
                  <ClipboardList className="h-4 w-4" />
                  <span className="hidden sm:inline">Assignments</span>
                  <span className="inline sm:hidden">Assign</span>
                </TabsTrigger>
              </TabsList>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <TabsContent value="content" className="mt-0">
                    <CourseContent />
                  </TabsContent>
                  
                  <TabsContent value="discussions" className="mt-0">
                    <ClassroomDiscussions />
                  </TabsContent>
                  
                  <TabsContent value="assignments" className="mt-0">
                    <ClassroomAssignments />
                  </TabsContent>
                </motion.div>
              </AnimatePresence>
            </Tabs>
          </div>
        </motion.div>
      </div>
      
      {/* Floating navigation bar for quick actions */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
        className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40"
      >
        <div className="bg-white rounded-full shadow-lg px-4 py-3 flex items-center space-x-4">
          <Button size="sm" variant="ghost" className="rounded-full" onClick={() => toast.success("Live Session Starting Soon")}>
            <Video className="h-5 w-5 text-empower-terracotta" />
          </Button>
          <Button size="sm" variant="ghost" className="rounded-full" onClick={() => toast.success("Uploaded to Gallery")}>
            <Image className="h-5 w-5 text-purple-500" />
          </Button>
          <Button size="sm" variant="ghost" className="rounded-full" onClick={() => toast.success("File Uploaded")}>
            <Upload className="h-5 w-5 text-green-500" />
          </Button>
          <Button size="sm" variant="ghost" className="rounded-full" onClick={() => toast.success("Task Complete")}>
            <Check className="h-5 w-5 text-blue-500" />
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default StudentClassroom;
