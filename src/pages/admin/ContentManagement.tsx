import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { BookOpen, Search, PlusCircle, Edit, Trash2, Users, FileText, Upload, Film } from 'lucide-react';
import { getAdminAuthenticated } from '@/utils/adminAuth';

// Sample data for demonstrations
const sampleCourses = [
  { id: 1, title: "Introduction to Handmade Crafts", category: "Handmade", instructor: "Jane Smith", difficulty: "Beginner", price: 29.99, image: "craft_intro.jpg" },
  { id: 2, title: "Advanced Web Development", category: "Technology", instructor: "John Doe", difficulty: "Advanced", price: 49.99, image: "webdev_advanced.jpg" },
  { id: 3, title: "Leadership Fundamentals", category: "Soft Skills", instructor: "Emily Johnson", difficulty: "Intermediate", price: 0, image: "leadership_basics.jpg" },
];

const sampleInstructors = [
  { id: 1, name: "Jane Smith" },
  { id: 2, name: "John Doe" },
  { id: 3, name: "Emily Johnson" },
  { id: 4, name: "Michael Wilson" },
];

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
      type: "spring",
      stiffness: 100
    }
  }
};

const ContentManagement: React.FC = () => {
  const [isAddCourseOpen, setIsAddCourseOpen] = useState(false);
  const [isEditCourseOpen, setIsEditCourseOpen] = useState(false);
  const [isAddLearnerOpen, setIsAddLearnerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentCourse, setCurrentCourse] = useState<any>(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Check if admin is authenticated
  React.useEffect(() => {
    if (!getAdminAuthenticated()) {
      navigate('/login');
    }
  }, [navigate]);

  // Filter courses based on search
  const filteredCourses = sampleCourses.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Form setup for Add Course
  const addCourseForm = useForm({
    defaultValues: {
      title: "",
      category: "",
      instructor: "",
      description: "",
      duration: "",
      difficulty: "",
      price: "",
    }
  });

  // Form setup for Edit Course
  const editCourseForm = useForm();
  
  // Reset and populate edit form when a course is selected
  React.useEffect(() => {
    if (currentCourse && isEditCourseOpen) {
      editCourseForm.reset({
        title: currentCourse.title,
        category: currentCourse.category,
        instructor: currentCourse.instructor,
        description: currentCourse.description || "",
        duration: currentCourse.duration || "",
        difficulty: currentCourse.difficulty,
        price: currentCourse.price,
      });
    }
  }, [currentCourse, isEditCourseOpen, editCourseForm]);

  // Form setup for Add Learner
  const addLearnerForm = useForm({
    defaultValues: {
      email: "",
      course: "",
      justification: "",
    }
  });

  const handleAddCourse = (data: any) => {
    console.log("Adding course:", data);
    // Implementation would add this to the database
    toast({
      title: "Course Added",
      description: `Successfully added ${data.title}`,
    });
    setIsAddCourseOpen(false);
    addCourseForm.reset();
  };

  const handleEditCourse = (data: any) => {
    console.log("Editing course:", data);
    // Implementation would update this in the database
    toast({
      title: "Course Updated",
      description: `Successfully updated ${data.title}`,
    });
    setIsEditCourseOpen(false);
  };

  const handleDeleteCourse = () => {
    console.log("Deleting course:", currentCourse);
    // Implementation would delete this from the database
    toast({
      title: "Course Deleted",
      description: `${currentCourse.title} has been deleted`,
      variant: "destructive",
    });
    setIsDeleteConfirmOpen(false);
  };

  const handleAddLearner = (data: any) => {
    console.log("Adding learner to course:", data);
    // Implementation would add this learner to the course
    toast({
      title: "Learner Added",
      description: `${data.email} has been added to the course`,
    });
    setIsAddLearnerOpen(false);
    addLearnerForm.reset();
  };

  const openEditModal = (course: any) => {
    setCurrentCourse(course);
    setIsEditCourseOpen(true);
  };

  const openDeleteConfirm = (course: any) => {
    setCurrentCourse(course);
    setIsDeleteConfirmOpen(true);
  };

  return (
    <div className="space-y-8">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-empower-brown mb-8"
      >
        Educational Content Management
      </motion.h1>
      
      {/* Course Management Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <Card>
          <CardHeader className="bg-gradient-to-r from-blue-50 to-white border-b">
            <CardTitle className="flex items-center text-empower-brown">
              <BookOpen className="mr-2 text-empower-terracotta" size={24} />
              Course Management
            </CardTitle>
            <CardDescription>Add, edit and manage all educational content</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex flex-wrap justify-between items-center mb-6">
              <motion.div
                variants={itemVariants}
                className="flex space-x-2"
              >
                <Button 
                  onClick={() => setIsAddCourseOpen(true)} 
                  className="bg-empower-terracotta hover:bg-empower-terracotta/90 space-x-2"
                >
                  <PlusCircle size={18} />
                  <span>Add Course</span>
                </Button>
              </motion.div>
              
              <motion.div variants={itemVariants} className="relative mt-2 sm:mt-0">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search courses..." 
                  className="pl-9 w-full md:w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </motion.div>
            </div>
            
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4"
            >
              {filteredCourses.map((course) => (
                <motion.div 
                  key={course.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                  className="bg-white rounded-lg border overflow-hidden"
                >
                  <div className="h-36 bg-gray-100 relative">
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                      {course.image ? (
                        <img 
                          src={`/placeholder.svg`} 
                          alt={course.title} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <BookOpen size={48} />
                      )}
                    </div>
                    <div className="absolute top-2 right-2">
                      <span className={`
                        px-2 py-1 rounded text-xs font-medium
                        ${course.category === 'Handmade' ? 'bg-purple-100 text-purple-800' : ''}
                        ${course.category === 'Technology' ? 'bg-blue-100 text-blue-800' : ''}
                        ${course.category === 'Soft Skills' ? 'bg-green-100 text-green-800' : ''}
                      `}>
                        {course.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1 line-clamp-1">{course.title}</h3>
                    <div className="text-sm text-gray-500 mb-2">Instructor: {course.instructor}</div>
                    <div className="flex justify-between items-center">
                      <div>
                        <span className={`
                          px-2 py-1 rounded text-xs
                          ${course.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' : ''}
                          ${course.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' : ''}
                          ${course.difficulty === 'Advanced' ? 'bg-red-100 text-red-800' : ''}
                        `}>
                          {course.difficulty}
                        </span>
                        <span className="ml-2 font-medium">
                          {course.price === 0 ? 'Free' : `$${course.price}`}
                        </span>
                      </div>
                      <div className="flex space-x-1">
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          onClick={() => openEditModal(course)}
                          className="h-8 w-8 text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                        >
                          <Edit size={16} />
                        </Button>
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          onClick={() => openDeleteConfirm(course)}
                          className="h-8 w-8 text-red-600 hover:text-red-800 hover:bg-red-50"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {filteredCourses.length === 0 && (
                <div className="col-span-full flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
                  <FileText className="mb-2 h-10 w-10 text-gray-300" />
                  <h3 className="text-lg font-semibold">No courses found</h3>
                  <p className="max-w-sm">Try adjusting your search or add a new course to get started.</p>
                </div>
              )}
            </motion.div>
          </CardContent>
        </Card>

        {/* Learner Management Section */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader className="bg-gradient-to-r from-blue-50 to-white border-b">
              <CardTitle className="flex items-center text-empower-brown">
                <Users className="mr-2 text-empower-terracotta" size={24} />
                Learner Management
              </CardTitle>
              <CardDescription>Manage course enrollments and learner access</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <motion.div 
                whileHover={{ scale: 1.03 }} 
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  onClick={() => setIsAddLearnerOpen(true)} 
                  className="bg-empower-terracotta hover:bg-empower-terracotta/90 space-x-2"
                >
                  <PlusCircle size={18} />
                  <span>Force Add Learner</span>
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.section>

      {/* Add Course Dialog */}
      <Dialog open={isAddCourseOpen} onOpenChange={setIsAddCourseOpen}>
        <DialogContent className="sm:max-w-[600px] p-0" scrollable={true}>
          <DialogHeader className="p-6 pb-2 bg-gradient-to-r from-blue-50 to-white border-b">
            <DialogTitle className="text-2xl font-bold text-empower-brown flex items-center">
              <PlusCircle className="mr-2 h-5 w-5 text-empower-terracotta" />
              Add New Course
            </DialogTitle>
            <DialogDescription>
              Fill in the details to create a new course. All fields marked with * are required.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...addCourseForm}>
            <form onSubmit={addCourseForm.handleSubmit(handleAddCourse)} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={addCourseForm.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Course Title *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter course title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={addCourseForm.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Category *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Handmade">Handmade</SelectItem>
                          <SelectItem value="Technology">Technology</SelectItem>
                          <SelectItem value="Soft Skills">Soft Skills</SelectItem>
                          <SelectItem value="Business">Business</SelectItem>
                          <SelectItem value="Creative">Creative</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={addCourseForm.control}
                  name="instructor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Instructor *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select instructor" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {sampleInstructors.map(instructor => (
                            <SelectItem key={instructor.id} value={instructor.name}>
                              {instructor.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={addCourseForm.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Duration *</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 4 weeks, 10 hours" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={addCourseForm.control}
                  name="difficulty"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Difficulty Level *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select difficulty" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Beginner">Beginner</SelectItem>
                          <SelectItem value="Intermediate">Intermediate</SelectItem>
                          <SelectItem value="Advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={addCourseForm.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Price ($) *</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" step="0.01" placeholder="Enter price (0 for free)" {...field} />
                      </FormControl>
                      <FormDescription>Enter 0 for free courses</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={addCourseForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium">Description *</FormLabel>
                    <FormControl>
                      <textarea 
                        className="flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Enter course description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="space-y-4">
                <div>
                  <FormLabel className="font-medium">Course Image *</FormLabel>
                  <div className="mt-2 flex items-center space-x-4">
                    <div className="h-20 w-28 bg-gray-100 flex items-center justify-center rounded border">
                      <Upload className="h-8 w-8 text-gray-400" />
                    </div>
                    <Button type="button" className="space-x-2">
                      <Upload size={16} />
                      <span>Upload Image</span>
                    </Button>
                  </div>
                </div>
                
                <div>
                  <FormLabel className="font-medium">Course Video (Optional)</FormLabel>
                  <div className="mt-2 flex items-center space-x-4">
                    <div className="h-20 w-28 bg-gray-100 flex items-center justify-center rounded border">
                      <Film className="h-8 w-8 text-gray-400" />
                    </div>
                    <Button type="button" variant="outline" className="space-x-2">
                      <Upload size={16} />
                      <span>Upload Video</span>
                    </Button>
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsAddCourseOpen(false)}>Cancel</Button>
                <Button type="submit" className="bg-empower-terracotta hover:bg-empower-terracotta/90">
                  Save Course
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Edit Course Dialog */}
      <Dialog open={isEditCourseOpen} onOpenChange={setIsEditCourseOpen}>
        <DialogContent className="sm:max-w-[600px] p-0" scrollable={true}>
          <DialogHeader className="p-6 pb-2 bg-gradient-to-r from-blue-50 to-white border-b">
            <DialogTitle className="text-2xl font-bold text-empower-brown flex items-center">
              <Edit className="mr-2 h-5 w-5 text-empower-terracotta" />
              Edit Course
            </DialogTitle>
            <DialogDescription>
              Update the details for {currentCourse?.title}
            </DialogDescription>
          </DialogHeader>
          
          <Form {...editCourseForm}>
            <form onSubmit={editCourseForm.handleSubmit(handleEditCourse)} className="p-6 space-y-6">
              {/* Form fields same as Add Course but prefilled */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={editCourseForm.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Course Title *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter course title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={editCourseForm.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Category *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Handmade">Handmade</SelectItem>
                          <SelectItem value="Technology">Technology</SelectItem>
                          <SelectItem value="Soft Skills">Soft Skills</SelectItem>
                          <SelectItem value="Business">Business</SelectItem>
                          <SelectItem value="Creative">Creative</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={editCourseForm.control}
                  name="instructor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Instructor *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select instructor" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {sampleInstructors.map(instructor => (
                            <SelectItem key={instructor.id} value={instructor.name}>
                              {instructor.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={editCourseForm.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Duration *</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 4 weeks, 10 hours" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={editCourseForm.control}
                  name="difficulty"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Difficulty Level *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select difficulty" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Beginner">Beginner</SelectItem>
                          <SelectItem value="Intermediate">Intermediate</SelectItem>
                          <SelectItem value="Advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={editCourseForm.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Price ($) *</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" step="0.01" placeholder="Enter price (0 for free)" {...field} />
                      </FormControl>
                      <FormDescription>Enter 0 for free courses</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={editCourseForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium">Description *</FormLabel>
                    <FormControl>
                      <textarea 
                        className="flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Enter course description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="space-y-4">
                <div>
                  <FormLabel className="font-medium">Course Image *</FormLabel>
                  <div className="mt-2 flex items-center space-x-4">
                    <div className="h-20 w-28 bg-gray-100 flex items-center justify-center rounded border">
                      <Upload className="h-8 w-8 text-gray-400" />
                    </div>
                    <Button type="button" className="space-x-2">
                      <Upload size={16} />
                      <span>Upload Image</span>
                    </Button>
                  </div>
                </div>
                
                <div>
                  <FormLabel className="font-medium">Course Video (Optional)</FormLabel>
                  <div className="mt-2 flex items-center space-x-4">
                    <div className="h-20 w-28 bg-gray-100 flex items-center justify-center rounded border">
                      <Film className="h-8 w-8 text-gray-400" />
                    </div>
                    <Button type="button" variant="outline" className="space-x-2">
                      <Upload size={16} />
                      <span>Upload Video</span>
                    </Button>
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsEditCourseOpen(false)}>Cancel</Button>
                <Button type="submit" className="bg-empower-terracotta hover:bg-empower-terracotta/90">
                  Update Course
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the course "{currentCourse?.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:justify-between">
            <Button type="button" variant="outline" onClick={() => setIsDeleteConfirmOpen(false)}>
              Cancel
            </Button>
            <Button type="button" variant="destructive" onClick={handleDeleteCourse}>
              Delete Course
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Learner Dialog */}
      <Dialog open={isAddLearnerOpen} onOpenChange={setIsAddLearnerOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5 text-empower-terracotta" />
              Force Add Learner
            </DialogTitle>
            <DialogDescription>
              Add a learner directly to a course without requiring them to enroll.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...addLearnerForm}>
            <form onSubmit={addLearnerForm.handleSubmit(handleAddLearner)} className="space-y-4 pt-2">
              <FormField
                control={addLearnerForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Learner's Email *</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Enter email address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={addLearnerForm.control}
                name="course"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course to Enroll *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select course" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {sampleCourses.map(course => (
                          <SelectItem key={course.id} value={course.id.toString()}>
                            {course.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={addLearnerForm.control}
                name="justification"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Justification Note (Optional)</FormLabel>
                    <FormControl>
                      <textarea 
                        className="flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Reason for adding this learner"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter className="pt-4">
                <Button type="button" variant="outline" onClick={() => setIsAddLearnerOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-empower-terracotta hover:bg-empower-terracotta/90">
                  Add Learner
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContentManagement;
