
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Clock, Heart } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { Course } from '@/types/course';
import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { enrollInCourse } from '@/services/courseService';
import { useAuth } from '@/contexts/AuthContext';

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  
  const enrollMutation = useMutation({
    mutationFn: () => enrollInCourse(course.id, course.id), // Fixed: Pass both required arguments
    onSuccess: () => {
      toast.success(`Successfully enrolled in ${course.title}!`);
      queryClient.invalidateQueries({ queryKey: ['enrolledCourses'] });
      navigate(`/learner-classroom`, { state: { courseId: course.id } });
    },
    onError: (error) => {
      console.error('Error enrolling in course:', error);
      toast.error('Failed to enroll in this course. Please try again.');
    }
  });
  
  const handleEnroll = () => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      toast.error("Please log in to enroll in this course", {
        action: {
          label: "Login",
          onClick: () => navigate('/login'),
        },
      });
      return;
    }
    
    enrollMutation.mutate();
  };
  
  return (
    <Card className="overflow-hidden hover-zoom">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={course.thumbnail} 
          alt={course.title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-2 right-2">
          <Badge variant={course.category === 'handmade' ? 'default' : 'secondary'}>
            {course.category === 'handmade' ? 'Handmade & Crafts' : 'Digital Skills'}
          </Badge>
        </div>
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold line-clamp-2">{course.title}</h3>
          <Button variant="ghost" size="icon" className="text-empower-terracotta hover:text-empower-terracotta/80">
            <Heart size={20} />
          </Button>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Avatar className="h-6 w-6">
            <AvatarImage src={course.instructor.avatar} alt={course.instructor.name} />
            <AvatarFallback>{course.instructor.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span>{course.instructor.name}</span>
        </div>
      </CardHeader>
      
      <CardContent className="pb-4">
        <p className="text-muted-foreground line-clamp-2 mb-3">{course.description}</p>
        
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center gap-1">
            <Clock size={16} className="text-muted-foreground" />
            <span>{course.duration}</span>
          </div>
          <Badge variant="outline">{course.level}</Badge>
        </div>
        
        <div className="flex justify-between items-center mt-3">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={16} 
                className={i < course.rating ? "fill-empower-gold text-empower-gold" : "text-muted"}
              />
            ))}
            <span className="text-xs text-muted-foreground ml-1">({course.reviews} reviews)</span>
          </div>
          <div className="font-semibold">
            {course.price === 0 ? (
              <span className="text-green-600">Free</span>
            ) : (
              <span>${course.price}</span>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        <Button 
          onClick={handleEnroll} 
          className="w-full bg-empower-terracotta hover:bg-empower-terracotta/90 transition-all duration-300"
          disabled={enrollMutation.isPending}
        >
          {enrollMutation.isPending ? 'Enrolling...' : 'Enroll Now'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
