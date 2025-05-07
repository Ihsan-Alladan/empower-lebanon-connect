
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, ArrowRight, Eye, Users, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { toast } from 'sonner';

// Mock classroom data
const mockClassrooms = [
  {
    id: 'c1',
    title: 'Digital Marketing Essentials - Spring 2025',
    course: 'Introduction to Digital Marketing',
    students: 24,
    status: 'active',
    lastActivity: '2 hours ago',
    nextSession: 'Tomorrow, 3:00 PM',
    coverImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'c2',
    title: 'Jewelry Making Techniques - Workshop Group A',
    course: 'Advanced Handmade Jewelry Techniques',
    students: 16,
    status: 'active',
    lastActivity: '1 day ago',
    nextSession: 'Friday, 2:00 PM',
    coverImage: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'c3',
    title: 'Sustainable Business Planning - Winter 2025',
    course: 'Sustainable Business Practices',
    students: 18,
    status: 'upcoming',
    lastActivity: 'Not started yet',
    nextSession: 'Starts in 2 weeks',
    coverImage: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  }
];

const ClassroomManagement = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateSheetOpen, setIsCreateSheetOpen] = useState(false);
  const [viewClassroomId, setViewClassroomId] = useState<string | null>(null);

  const filteredClassrooms = mockClassrooms.filter((classroom) =>
    classroom.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateClassroom = () => {
    toast.success('Classroom creation would happen here!');
    setIsCreateSheetOpen(false);
  };

  const handleViewClassroom = (id: string) => {
    setViewClassroomId(id);
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };
  
  const getClassroomById = (id: string) => {
    return mockClassrooms.find(classroom => classroom.id === id);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-empower-brown">Manage Classrooms</h1>
          <p className="text-gray-600">Create and manage your virtual classrooms</p>
        </div>
        <Button 
          onClick={() => setIsCreateSheetOpen(true)}
          className="bg-empower-terracotta hover:bg-empower-terracotta/90 flex items-center gap-2"
        >
          <Plus size={18} />
          <span>Create Classroom</span>
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input
          className="pl-10"
          placeholder="Search classrooms..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredClassrooms.map((classroom) => (
          <motion.div key={classroom.id} variants={itemVariants}>
            <Card className="overflow-hidden h-full hover:shadow-md transition-shadow duration-200">
              <div className="relative h-40 overflow-hidden">
                <img
                  src={classroom.coverImage}
                  alt={classroom.title}
                  className="w-full h-full object-cover"
                />
                <Badge 
                  className={`absolute top-3 right-3 ${
                    classroom.status === 'active' ? 'bg-green-500' : 'bg-blue-500'
                  }`}
                >
                  {classroom.status === 'active' ? 'Active' : 'Upcoming'}
                </Badge>
              </div>
              
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{classroom.title}</CardTitle>
                <p className="text-sm text-gray-500">{classroom.course}</p>
              </CardHeader>
              
              <CardContent className="pb-0 pt-0">
                <div className="flex flex-col space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Users size={16} className="text-gray-500 mr-2" />
                      <span className="text-sm">{classroom.students} Students</span>
                    </div>
                    <div className="flex items-center">
                      <Clock size={16} className="text-gray-500 mr-2" />
                      <span className="text-sm">{classroom.lastActivity}</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Calendar size={16} className="text-gray-500 mr-2" />
                    <span className="text-sm">{classroom.nextSession}</span>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="pt-4">
                <Button
                  onClick={() => handleViewClassroom(classroom.id)}
                  variant="outline"
                  className="w-full flex justify-center items-center gap-2"
                >
                  <Eye size={16} />
                  <span>View Classroom</span>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Create Classroom Sheet */}
      <Sheet open={isCreateSheetOpen} onOpenChange={setIsCreateSheetOpen}>
        <SheetContent className="sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>Create New Classroom</SheetTitle>
          </SheetHeader>
          
          <div className="grid gap-4 py-6">
            <div>
              <label htmlFor="classroom-title" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Classroom Title
              </label>
              <Input id="classroom-title" placeholder="Enter classroom title" className="mt-2" />
            </div>
            
            <div>
              <label htmlFor="course-select" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Select Course
              </label>
              <select id="course-select" className="flex h-10 w-full mt-2 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                <option value="">Select a course</option>
                <option value="1">Introduction to Digital Marketing</option>
                <option value="2">Advanced Handmade Jewelry Techniques</option>
                <option value="3">Sustainable Business Practices</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="start-date" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Start Date
              </label>
              <Input id="start-date" type="date" className="mt-2" />
            </div>
            
            <div>
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Classroom Status
              </label>
              <div className="flex items-center space-x-4 mt-2">
                <label className="flex items-center space-x-2">
                  <input type="radio" name="status" value="active" className="h-4 w-4" />
                  <span>Active</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="status" value="upcoming" className="h-4 w-4" />
                  <span>Upcoming</span>
                </label>
              </div>
            </div>
          </div>
          
          <SheetFooter>
            <Button onClick={() => setIsCreateSheetOpen(false)} variant="outline">
              Cancel
            </Button>
            <Button 
              onClick={handleCreateClassroom}
              className="bg-empower-terracotta hover:bg-empower-terracotta/90"
            >
              Create Classroom
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* View Classroom Sheet */}
      <Sheet open={!!viewClassroomId} onOpenChange={() => setViewClassroomId(null)}>
        <SheetContent side="right" className="sm:max-w-xl">
          {viewClassroomId && (
            <>
              <SheetHeader>
                <SheetTitle>{getClassroomById(viewClassroomId)?.title}</SheetTitle>
              </SheetHeader>
              
              <div className="space-y-6 py-6">
                <img
                  src={getClassroomById(viewClassroomId)?.coverImage}
                  alt={getClassroomById(viewClassroomId)?.title}
                  className="w-full h-40 object-cover rounded-lg"
                />
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Course</h3>
                    <p>{getClassroomById(viewClassroomId)?.course}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Students</h3>
                    <p>{getClassroomById(viewClassroomId)?.students} enrolled students</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Next Session</h3>
                    <p>{getClassroomById(viewClassroomId)?.nextSession}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Last Activity</h3>
                    <p>{getClassroomById(viewClassroomId)?.lastActivity}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Button className="w-full bg-empower-terracotta hover:bg-empower-terracotta/90">
                    Enter Classroom
                  </Button>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline">Edit Classroom</Button>
                    <Button variant="outline" className="text-red-500 hover:text-red-700">Disable Classroom</Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ClassroomManagement;
