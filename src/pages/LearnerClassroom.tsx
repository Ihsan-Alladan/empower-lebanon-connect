
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  BookOpen, 
  FileText, 
  Video, 
  Upload, 
  MessageCircle, 
  Star, 
  Clock, 
  Check, 
  FileImage, 
  Book, 
  CheckCircle, 
  ThumbsUp, 
  FileCheck
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import PageTransition from "@/components/PageTransition";
import { Course } from "@/types/course";
import { toast } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

// Mock data
interface Assignment {
  id: string;
  title: string;
  due: string;
  isSubmitted: boolean;
  isGraded: boolean;
  grade?: number;
  feedback?: string;
}

interface Announcement {
  id: string;
  instructor: {
    name: string;
    avatar: string;
    role: string;
  };
  date: string;
  content: string;
  attachments?: {
    name: string;
    type: string;
    url: string;
  }[];
  comments: {
    id: string;
    user: {
      name: string;
      avatar: string;
    };
    date: string;
    content: string;
  }[];
}

interface Material {
  id: string;
  title: string;
  type: "video" | "pdf" | "quiz" | "document";
  description: string;
  url: string;
  dateAdded: string;
  duration?: string;
  icon: React.ReactNode;
}

// Sample data
const currentCourse: Course = {
  id: "course-1",
  title: "Introduction to Sustainable Crafting",
  description: "Learn the fundamentals of creating sustainable, eco-friendly handmade products while supporting fair trade practices.",
  thumbnail: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  category: "handmade",
  level: "beginner",
  price: 49.99,
  duration: "6 weeks",
  instructor: {
    name: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    title: "Master Craftsperson",
    bio: "Sarah has 15 years of experience in sustainable crafting and has taught over 5,000 students worldwide.",
    coursesCount: 12,
    studentsCount: 5420,
    reviewsCount: 1024
  },
  rating: 4.8,
  reviews: 245,
  updatedAt: "2024-04-10",
  studentsEnrolled: 324,
  learningObjectives: [
    "Understand sustainable material sourcing",
    "Master basic crafting techniques",
    "Create your first eco-friendly product",
    "Learn how to market handmade items",
    "Establish ethical business practices"
  ],
  requirements: [
    "No prior experience needed",
    "Basic craft supplies (list provided upon enrollment)",
    "Internet connection for live sessions",
    "Commitment to sustainable practices"
  ],
  targetAudience: "Beginners interested in sustainable crafting and social entrepreneurship. Perfect for those wanting to learn practical skills while making a positive impact.",
  modules: [
    {
      id: "module-1",
      title: "Foundations of Sustainable Crafting",
      lessons: [
        {
          title: "Introduction to Sustainable Materials",
          type: "video",
          duration: "15 min"
        },
        {
          title: "Understanding Environmental Impact",
          type: "video",
          duration: "20 min"
        },
        {
          title: "Sustainable Sourcing Quiz",
          type: "quiz",
          duration: "10 min"
        }
      ],
      duration: "45 min"
    },
    {
      id: "module-2",
      title: "Basic Techniques & Tools",
      lessons: [
        {
          title: "Essential Tools for Beginners",
          type: "video",
          duration: "25 min"
        },
        {
          title: "Setting Up Your Workspace",
          type: "video",
          duration: "15 min"
        },
        {
          title: "Workspace Design Assignment",
          type: "assignment",
          duration: "30 min"
        }
      ],
      duration: "70 min"
    }
  ],
  totalLessons: 25,
  ratingBreakdown: [
    { stars: 5, percentage: 75 },
    { stars: 4, percentage: 18 },
    { stars: 3, percentage: 5 },
    { stars: 2, percentage: 1 },
    { stars: 1, percentage: 1 }
  ],
  studentReviews: [
    {
      name: "Lisa M.",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 5,
      comment: "This course completely changed how I approach my craft business. The sustainable techniques I learned have not only reduced my environmental impact but have also become a selling point for my products!",
      date: "2024-03-28"
    },
    {
      name: "Michael P.",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 4,
      comment: "Very comprehensive introduction to sustainable crafting. I especially enjoyed the modules on material sourcing and ethical business practices.",
      date: "2024-03-15"
    }
  ],
  isTrending: true
};

const assignments: Assignment[] = [
  {
    id: "assignment-1",
    title: "Sustainable Materials Research Paper",
    due: "2024-05-15",
    isSubmitted: true,
    isGraded: true,
    grade: 92,
    feedback: "Excellent research on local sustainable materials. Your analysis of environmental impact was particularly insightful."
  },
  {
    id: "assignment-2",
    title: "Basic Crafting Techniques Demo",
    due: "2024-05-22",
    isSubmitted: true,
    isGraded: false
  },
  {
    id: "assignment-3",
    title: "Product Design Prototype",
    due: "2024-06-01",
    isSubmitted: false,
    isGraded: false
  }
];

const announcements: Announcement[] = [
  {
    id: "announcement-1",
    instructor: {
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      role: "Instructor"
    },
    date: "2024-05-05",
    content: "Hello everyone! I'm excited to announce that we'll have a special guest workshop next week on natural dyes. Please prepare by gathering some white fabric scraps if you'd like to follow along!",
    comments: [
      {
        id: "comment-1",
        user: {
          name: "Emma Johnson",
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
        },
        date: "2024-05-05",
        content: "This sounds amazing! I've been wanting to learn about natural dyes."
      }
    ]
  },
  {
    id: "announcement-2",
    instructor: {
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      role: "Instructor"
    },
    date: "2024-04-28",
    content: "I've added new resource materials on sustainable packaging in the Materials section. These should help with your upcoming assignment!",
    attachments: [
      {
        name: "Sustainable_Packaging_Guide.pdf",
        type: "pdf",
        url: "#"
      }
    ],
    comments: []
  }
];

const materials: Material[] = [
  {
    id: "material-1",
    title: "Introduction to Sustainable Materials",
    type: "video",
    description: "Learn about the fundamentals of sustainable material sourcing",
    url: "#",
    dateAdded: "2024-04-10",
    duration: "15 min",
    icon: <Video className="h-5 w-5 text-empower-terracotta" />
  },
  {
    id: "material-2",
    title: "Sustainable Sourcing Guide",
    type: "pdf",
    description: "Comprehensive guide to finding and evaluating sustainable materials",
    url: "#",
    dateAdded: "2024-04-12",
    icon: <FileText className="h-5 w-5 text-empower-terracotta" />
  },
  {
    id: "material-3",
    title: "Basic Techniques Workshop",
    type: "video",
    description: "Step-by-step tutorial on essential crafting techniques",
    url: "#",
    dateAdded: "2024-04-15",
    duration: "25 min",
    icon: <Video className="h-5 w-5 text-empower-terracotta" />
  },
  {
    id: "material-4",
    title: "Environmental Impact Assessment",
    type: "document",
    description: "Template for evaluating the environmental impact of your projects",
    url: "#",
    dateAdded: "2024-04-18",
    icon: <FileImage className="h-5 w-5 text-empower-terracotta" />
  },
  {
    id: "material-5",
    title: "Module 1 Quiz",
    type: "quiz",
    description: "Test your knowledge of sustainable crafting fundamentals",
    url: "#",
    dateAdded: "2024-04-20",
    icon: <Book className="h-5 w-5 text-empower-terracotta" />
  }
];

const feedbackItems = [
  {
    id: "feedback-1",
    assignment: "Sustainable Materials Research Paper",
    feedback: "Excellent research on local sustainable materials. Your analysis of environmental impact was particularly insightful.",
    grade: "A",
    instructor: "Sarah Johnson",
    date: "2024-05-10"
  },
  {
    id: "feedback-2",
    assignment: "Material Sourcing Exercise",
    feedback: "Good work identifying sustainable alternatives. Consider expanding your research to include more local options.",
    grade: "B+",
    instructor: "Sarah Johnson",
    date: "2024-04-25"
  }
];

const LearnerClassroom: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [progress, setProgress] = useState(30);
  const [expandedComments, setExpandedComments] = useState<Set<string>>(new Set());
  
  useEffect(() => {
    // Redirect if not authenticated or not a learner
    if (!isAuthenticated || user?.role !== "learner") {
      navigate("/login");
      toast.error("You must be logged in as a learner to access this page");
    }
  }, [isAuthenticated, user, navigate]);
  
  // Toggle comments visibility
  const toggleComments = (announcementId: string) => {
    setExpandedComments(prev => {
      const newSet = new Set(prev);
      if (newSet.has(announcementId)) {
        newSet.delete(announcementId);
      } else {
        newSet.add(announcementId);
      }
      return newSet;
    });
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };
  
  // Card hover animation
  const cardHoverVariants = {
    hover: { 
      y: -5,
      boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
      transition: { type: "spring", stiffness: 300 }
    }
  };
  
  return (
    <PageTransition route="/learner-classroom">
      <div className="min-h-screen bg-empower-ivory">
        {/* Banner with course info */}
        <div className="bg-gradient-to-r from-empower-terracotta to-empower-olive text-white p-6 shadow-md">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">{currentCourse.title}</h1>
                <div className="flex items-center mt-2">
                  <img 
                    src={currentCourse.instructor.avatar} 
                    alt={currentCourse.instructor.name}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <p className="font-medium">{currentCourse.instructor.name}</p>
                    <p className="text-sm opacity-80">{currentCourse.instructor.title}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 md:mt-0 w-full md:w-1/3">
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Course Progress</span>
                  <span className="text-sm">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Main content with tabs */}
        <div className="container mx-auto py-6 px-4">
          <Tabs defaultValue="stream" className="w-full">
            <TabsList className="mb-6 w-full md:w-auto grid grid-cols-3 md:grid-cols-5 gap-1">
              <TabsTrigger value="stream" className="flex items-center gap-1">
                <MessageCircle className="h-4 w-4" />
                <span className="hidden sm:inline">Stream</span>
              </TabsTrigger>
              <TabsTrigger value="classwork" className="flex items-center gap-1">
                <Book className="h-4 w-4" />
                <span className="hidden sm:inline">Classwork</span>
              </TabsTrigger>
              <TabsTrigger value="assignments" className="flex items-center gap-1">
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline">Assignments</span>
              </TabsTrigger>
              <TabsTrigger value="materials" className="flex items-center gap-1">
                <FileImage className="h-4 w-4" />
                <span className="hidden sm:inline">Materials</span>
              </TabsTrigger>
              <TabsTrigger value="feedback" className="flex items-center gap-1">
                <Star className="h-4 w-4" />
                <span className="hidden sm:inline">Feedback</span>
              </TabsTrigger>
            </TabsList>
            
            {/* Stream Tab */}
            <TabsContent value="stream" className="focus:outline-none">
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                {announcements.map(announcement => (
                  <motion.div 
                    key={announcement.id} 
                    variants={itemVariants}
                    className="bg-white rounded-lg shadow-sm p-6"
                  >
                    <div className="flex items-start">
                      <img 
                        src={announcement.instructor.avatar} 
                        alt={announcement.instructor.name}
                        className="w-10 h-10 rounded-full mr-4"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-bold">{announcement.instructor.name}</h3>
                            <p className="text-xs text-gray-500">{announcement.instructor.role} • {announcement.date}</p>
                          </div>
                        </div>
                        <div className="mt-3">
                          <p className="text-gray-800">{announcement.content}</p>
                          
                          {announcement.attachments && announcement.attachments.length > 0 && (
                            <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                              {announcement.attachments.map((attachment, index) => (
                                <div key={index} className="flex items-center text-sm">
                                  {attachment.type === 'pdf' ? <FileText className="h-4 w-4 mr-2" /> : <FileImage className="h-4 w-4 mr-2" />}
                                  <a href={attachment.url} className="text-empower-terracotta hover:underline">
                                    {attachment.name}
                                  </a>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        
                        {/* Comments section */}
                        <div className="mt-4 pt-3 border-t">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => toggleComments(announcement.id)}
                            className="text-sm flex items-center gap-1"
                          >
                            <MessageCircle className="h-3.5 w-3.5" />
                            {announcement.comments.length} {announcement.comments.length === 1 ? 'Comment' : 'Comments'}
                          </Button>
                          
                          <AnimatePresence>
                            {expandedComments.has(announcement.id) && (
                              <motion.div 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-3 space-y-3"
                              >
                                {announcement.comments.map(comment => (
                                  <div key={comment.id} className="flex items-start bg-gray-50 p-3 rounded-lg">
                                    <img 
                                      src={comment.user.avatar} 
                                      alt={comment.user.name}
                                      className="w-7 h-7 rounded-full mr-3"
                                    />
                                    <div>
                                      <div className="flex items-baseline">
                                        <h4 className="font-medium text-sm">{comment.user.name}</h4>
                                        <span className="ml-2 text-xs text-gray-500">{comment.date}</span>
                                      </div>
                                      <p className="text-sm mt-1">{comment.content}</p>
                                    </div>
                                  </div>
                                ))}
                                
                                <div className="flex items-center gap-2">
                                  <input
                                    type="text"
                                    placeholder="Add a comment..."
                                    className="flex-1 p-2 border rounded-md text-sm"
                                  />
                                  <Button size="sm">Post</Button>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
            
            {/* Classwork Tab */}
            <TabsContent value="classwork">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <h2 className="text-xl font-bold mb-4">Course Modules</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentCourse.modules.map((module, index) => (
                    <motion.div 
                      key={module.id}
                      variants={itemVariants}
                      whileHover="hover"
                      className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100"
                    >
                      <div className="bg-empower-terracotta/10 p-4">
                        <h3 className="font-bold text-empower-brown flex items-center gap-2">
                          <span className="bg-empower-terracotta text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                            {index + 1}
                          </span>
                          {module.title}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">{module.duration}</p>
                      </div>
                      <div className="p-4">
                        <ul className="space-y-2">
                          {module.lessons.map((lesson, i) => (
                            <li key={i} className="text-sm flex items-center gap-2">
                              {lesson.type === 'video' ? (
                                <Video className="h-4 w-4 text-empower-terracotta" />
                              ) : lesson.type === 'quiz' ? (
                                <Book className="h-4 w-4 text-empower-terracotta" />
                              ) : (
                                <FileText className="h-4 w-4 text-empower-terracotta" />
                              )}
                              <span>{lesson.title}</span>
                              <span className="ml-auto text-xs text-gray-400">{lesson.duration}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-4 pt-3 border-t border-gray-100 flex justify-end">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-empower-terracotta hover:text-empower-terracotta/80 hover:bg-empower-terracotta/10"
                          >
                            Start Module
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </TabsContent>
            
            {/* Assignments Tab */}
            <TabsContent value="assignments">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-8"
              >
                <div>
                  <h2 className="text-xl font-bold mb-4">Upcoming Assignments</h2>
                  <div className="space-y-4">
                    {assignments.filter(a => !a.isSubmitted).map(assignment => (
                      <motion.div 
                        key={assignment.id}
                        variants={itemVariants}
                        className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-yellow-400"
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-lg">{assignment.title}</h3>
                          <div className="flex items-center gap-1 text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full">
                            <Clock className="h-4 w-4" />
                            <span className="text-sm">Due: {assignment.due}</span>
                          </div>
                        </div>
                        <div className="mt-4">
                          <Button className="flex items-center gap-2">
                            <Upload className="h-4 w-4" />
                            Submit Assignment
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h2 className="text-xl font-bold mb-4">Submitted Assignments</h2>
                  <div className="space-y-4">
                    {assignments.filter(a => a.isSubmitted).map(assignment => (
                      <motion.div 
                        key={assignment.id}
                        variants={itemVariants}
                        className={cn(
                          "bg-white rounded-lg shadow-sm p-6 border-l-4",
                          assignment.isGraded ? "border-green-400" : "border-blue-400"
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-lg">{assignment.title}</h3>
                          <div className={cn(
                            "flex items-center gap-1 px-3 py-1 rounded-full",
                            assignment.isGraded 
                              ? "text-green-600 bg-green-50" 
                              : "text-blue-600 bg-blue-50"
                          )}>
                            {assignment.isGraded ? (
                              <>
                                <CheckCircle className="h-4 w-4" />
                                <span className="text-sm">Graded</span>
                              </>
                            ) : (
                              <>
                                <Check className="h-4 w-4" />
                                <span className="text-sm">Submitted</span>
                              </>
                            )}
                          </div>
                        </div>
                        
                        {assignment.isGraded && (
                          <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-bold">Grade:</span>
                              <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-sm">
                                {assignment.grade}/100
                              </span>
                            </div>
                            <div>
                              <span className="font-bold">Feedback:</span>
                              <p className="text-gray-700 mt-1">{assignment.feedback}</p>
                            </div>
                          </div>
                        )}
                        
                        <div className="mt-4">
                          <Button 
                            variant="outline" 
                            className="flex items-center gap-2"
                          >
                            <FileCheck className="h-4 w-4" />
                            View Submission
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </TabsContent>
            
            {/* Materials Tab */}
            <TabsContent value="materials">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <h2 className="text-xl font-bold mb-4">Course Materials</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {materials.map(material => (
                    <motion.div
                      key={material.id}
                      variants={cardHoverVariants}
                      whileHover="hover"
                      className="bg-white rounded-lg shadow-sm p-6 border border-gray-100"
                    >
                      <div className="flex items-start">
                        <div className="bg-empower-terracotta/10 p-3 rounded-lg mr-4">
                          {material.icon}
                        </div>
                        <div>
                          <h3 className="font-bold">{material.title}</h3>
                          <p className="text-sm text-gray-500">{material.dateAdded}</p>
                          {material.duration && (
                            <p className="text-xs text-gray-400 mt-1">{material.duration}</p>
                          )}
                        </div>
                      </div>
                      
                      <p className="text-sm mt-3 text-gray-700">
                        {material.description}
                      </p>
                      
                      <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
                        <p className="text-xs text-gray-400">
                          {material.type === 'video' ? 'Video Lesson' : 
                           material.type === 'pdf' ? 'PDF Document' :
                           material.type === 'quiz' ? 'Interactive Quiz' : 'Document'}
                        </p>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-empower-terracotta hover:text-empower-terracotta/80 hover:bg-empower-terracotta/10"
                        >
                          {material.type === 'video' ? 'Watch' : 
                           material.type === 'quiz' ? 'Start Quiz' : 'Download'}
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </TabsContent>
            
            {/* Feedback Tab */}
            <TabsContent value="feedback">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                <h2 className="text-xl font-bold mb-4">Instructor Feedback</h2>
                
                {feedbackItems.map(feedback => (
                  <motion.div
                    key={feedback.id}
                    variants={itemVariants}
                    className="bg-white rounded-lg shadow-sm p-6"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg">{feedback.assignment}</h3>
                        <p className="text-sm text-gray-500">
                          From {feedback.instructor} • {feedback.date}
                        </p>
                      </div>
                      <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">
                        Grade: {feedback.grade}
                      </div>
                    </div>
                    
                    <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-700">{feedback.feedback}</p>
                    </div>
                    
                    <div className="mt-4 pt-3 border-t border-gray-100">
                      <h4 className="font-medium text-sm mb-2">Rate this feedback:</h4>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map(star => (
                          <button key={star} className="text-gray-300 hover:text-yellow-400">
                            <Star className="h-6 w-6" />
                          </button>
                        ))}
                      </div>
                      
                      <div className="flex gap-2 mt-3">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="flex items-center gap-1 text-gray-600"
                        >
                          <ThumbsUp className="h-4 w-4" />
                          Helpful
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="flex items-center gap-1 text-gray-600"
                        >
                          <MessageCircle className="h-4 w-4" />
                          Reply
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="font-bold text-lg mb-3">Rate This Course</h3>
                  <div className="flex items-center gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button key={star} className="text-gray-300 hover:text-yellow-400">
                        <Star className="h-8 w-8" />
                      </button>
                    ))}
                  </div>
                  <textarea
                    placeholder="Share your thoughts about this course..."
                    className="w-full border rounded-lg p-3 h-32"
                  ></textarea>
                  <div className="mt-3 flex justify-end">
                    <Button>Submit Feedback</Button>
                  </div>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageTransition>
  );
};

export default LearnerClassroom;
