
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Tabs, TabsContent, TabsList, TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Star, Clock, Calendar, Users, Share2, Heart,
  CheckCircle, Play, MessageSquare
} from "lucide-react";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { handmadeCourses, digitalCourses } from '@/data/courses';

const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const allCourses = [...handmadeCourses, ...digitalCourses];
  const course = allCourses.find(course => course.id === id);
  
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeModule, setActiveModule] = useState<string | null>(null);
  
  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Course not found</h2>
        <Button onClick={() => navigate('/courses')}>
          Back to Courses
        </Button>
      </div>
    );
  }
  
  const toggleWishlist = () => {
    setIsWishlisted(prev => !prev);
  };
  
  const handleEnroll = () => {
    // Enrollment logic would go here
    console.log(`Enrolled in course: ${course.title}`);
  };
  
  const toggleModule = (moduleId: string) => {
    if (activeModule === moduleId) {
      setActiveModule(null);
    } else {
      setActiveModule(moduleId);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Course Banner */}
        <div className="bg-gradient-to-r from-empower-ivory to-empower-gold/30 relative">
          <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/2">
                <Badge variant={course.category === 'handmade' ? 'default' : 'secondary'} className="mb-4">
                  {course.category === 'handmade' ? 'Handmade & Crafts' : 'Technology & Digital Skills'}
                </Badge>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>
                
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={course.instructor.avatar} alt={course.instructor.name} />
                    <AvatarFallback>{course.instructor.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Instructor: {course.instructor.name}</p>
                    <p className="text-sm text-muted-foreground">{course.instructor.title}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-1">
                    <Clock size={18} className="text-muted-foreground" />
                    <span>{course.duration}</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Calendar size={18} className="text-muted-foreground" />
                    <span>Last updated {course.updatedAt}</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Users size={18} className="text-muted-foreground" />
                    <span>{course.studentsEnrolled} students</span>
                  </div>
                  
                  <Badge variant="outline">{course.level}</Badge>
                </div>
                
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={20} 
                        className={i < course.rating ? "fill-empower-gold text-empower-gold" : "text-muted"}
                      />
                    ))}
                  </div>
                  <span className="font-medium">{course.rating.toFixed(1)}</span>
                  <span className="text-muted-foreground">({course.reviews} reviews)</span>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <Button onClick={handleEnroll} size="lg" className="bg-empower-terracotta hover:bg-empower-terracotta/90">
                    Enroll Now {course.price === 0 ? '(Free)' : `($${course.price})`}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className={isWishlisted ? "text-red-500 border-red-500" : ""} 
                    onClick={toggleWishlist}
                  >
                    <Heart className={isWishlisted ? "fill-current" : ""} />
                  </Button>
                  
                  <Button variant="outline" size="icon">
                    <Share2 />
                  </Button>
                </div>
              </div>
              
              <div className="md:w-1/2">
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <img 
                    src={course.thumbnail} 
                    alt={course.title} 
                    className="w-full h-64 md:h-80 object-cover"
                  />
                  <div className="bg-empower-brown/80 p-4 flex justify-center">
                    <Button className="flex items-center gap-2 bg-empower-terracotta hover:bg-empower-terracotta/90">
                      <Play fill="white" size={18} />
                      Watch Introduction
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Course Content */}
        <div className="container mx-auto px-4 py-12">
          <Tabs defaultValue="overview">
            <TabsList className="mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
              <TabsTrigger value="instructor">Instructor</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="animate-fade-in">
              <div className="prose max-w-none">
                <h2>About This Course</h2>
                <p className="text-lg">{course.description}</p>
                
                <h3 className="mt-6 mb-4">What You'll Learn</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {course.learningObjectives.map((objective, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="text-empower-olive mt-1 flex-shrink-0" size={18} />
                      <span>{objective}</span>
                    </li>
                  ))}
                </ul>
                
                <h3 className="mt-8 mb-4">Requirements</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {course.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
                
                <h3 className="mt-8 mb-4">Who This Course is For</h3>
                <p>{course.targetAudience}</p>
              </div>
            </TabsContent>
            
            <TabsContent value="curriculum" className="animate-fade-in">
              <h2 className="text-2xl font-bold mb-6">Course Curriculum</h2>
              <p className="mb-4">{course.modules.length} modules • {course.totalLessons} lessons • Total length: {course.duration}</p>
              
              <div className="space-y-4">
                {course.modules.map((module) => (
                  <Collapsible
                    key={module.id}
                    open={activeModule === module.id}
                    onOpenChange={() => toggleModule(module.id)}
                    className="border rounded-md overflow-hidden"
                  >
                    <CollapsibleTrigger className="flex justify-between items-center w-full p-4 hover:bg-muted/50">
                      <div className="flex items-start">
                        <h3 className="font-medium text-left">{module.title}</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{module.lessons.length} lessons</span>
                        <span className="text-sm text-muted-foreground">{module.duration}</span>
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="border-t">
                        {module.lessons.map((lesson, index) => (
                          <div 
                            key={index} 
                            className="flex justify-between items-center p-4 hover:bg-muted/20"
                          >
                            <div className="flex items-center gap-3">
                              {lesson.type === 'video' ? (
                                <Play size={16} className="text-empower-terracotta" />
                              ) : (
                                <MessageSquare size={16} className="text-empower-olive" />
                              )}
                              <span>{lesson.title}</span>
                            </div>
                            <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                          </div>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="instructor" className="animate-fade-in">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/4">
                  <Avatar className="h-32 w-32 mx-auto">
                    <AvatarImage src={course.instructor.avatar} alt={course.instructor.name} />
                    <AvatarFallback className="text-4xl">
                      {course.instructor.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </div>
                
                <div className="md:w-3/4">
                  <h2 className="text-2xl font-bold mb-2">{course.instructor.name}</h2>
                  <p className="text-muted-foreground mb-4">{course.instructor.title}</p>
                  
                  <div className="flex gap-4 mb-6">
                    <div>
                      <p className="font-bold text-lg">{course.instructor.coursesCount}</p>
                      <p className="text-sm text-muted-foreground">Courses</p>
                    </div>
                    <div>
                      <p className="font-bold text-lg">{course.instructor.studentsCount}</p>
                      <p className="text-sm text-muted-foreground">Students</p>
                    </div>
                    <div>
                      <p className="font-bold text-lg">{course.instructor.reviewsCount}</p>
                      <p className="text-sm text-muted-foreground">Reviews</p>
                    </div>
                  </div>
                  
                  <p className="mb-6">{course.instructor.bio}</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="animate-fade-in">
              <h2 className="text-2xl font-bold mb-6">Student Reviews</h2>
              
              <div className="flex flex-col md:flex-row gap-8 mb-8">
                <div className="md:w-1/3 flex flex-col items-center justify-center">
                  <div className="text-5xl font-bold mb-2">{course.rating.toFixed(1)}</div>
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={24} 
                        className={i < course.rating ? "fill-empower-gold text-empower-gold" : "text-muted"}
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground">{course.reviews} reviews</p>
                </div>
                
                <div className="md:w-2/3">
                  {course.ratingBreakdown.map((item, index) => (
                    <div key={index} className="flex items-center gap-3 mb-2">
                      <span>{item.stars} stars</span>
                      <Progress value={item.percentage} className="h-2 flex-1" />
                      <span className="text-sm text-muted-foreground">{item.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-6">
                {course.studentReviews.map((review, index) => (
                  <div key={index} className="border-t pt-6">
                    <div className="flex items-start gap-4">
                      <Avatar>
                        <AvatarImage src={review.avatar} alt={review.name} />
                        <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium">{review.name}</h4>
                          <p className="text-sm text-muted-foreground">{review.date}</p>
                        </div>
                        
                        <div className="flex mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={16} 
                              className={i < review.rating ? "fill-empower-gold text-empower-gold" : "text-muted"}
                            />
                          ))}
                        </div>
                        
                        <p>{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CourseDetail;
