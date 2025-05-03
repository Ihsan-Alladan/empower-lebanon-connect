
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Clock, Heart } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { Course } from '@/types/course';
import { toast } from "@/components/ui/sonner";

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  
  const handleEnroll = () => {
    navigate(`/courses/${course.id}`);
  };
  
  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    
    if (!isLiked) {
      toast.success("Added to wishlist", {
        description: `${course.title} has been added to your wishlist.`,
      });
    } else {
      toast("Removed from wishlist", {
        description: `${course.title} has been removed from your wishlist.`,
      });
    }
  };
  
  return (
    <Card className="overflow-hidden card-hover gradient-border">
      <div className="relative h-48 overflow-hidden group">
        <img 
          src={course.thumbnail} 
          alt={course.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-2 right-2">
          <Badge 
            variant={course.category === 'handmade' ? 'default' : 'secondary'}
            className={`${course.isTrending ? 'animate-bounce-light' : ''}`}
          >
            {course.category === 'handmade' ? 'Handmade & Crafts' : 'Digital Skills'}
          </Badge>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute bottom-0 left-0 right-0 p-3 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
          <p className="text-sm line-clamp-2">{course.description}</p>
        </div>
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold line-clamp-2 group-hover:text-empower-terracotta transition-colors duration-300">{course.title}</h3>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleLike}
            className={`${isLiked ? 'text-empower-terracotta' : 'text-gray-400'} hover:text-empower-terracotta/80 hover:scale-110 transition-all duration-300`}
          >
            <Heart 
              size={20} 
              className={isLiked ? 'fill-empower-terracotta animate-pop-up' : ''} 
            />
          </Button>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Avatar className="h-6 w-6 ring-1 ring-empower-terracotta/20">
            <AvatarImage src={course.instructor.avatar} alt={course.instructor.name} />
            <AvatarFallback className="bg-gradient-to-br from-empower-terracotta to-empower-coral text-white">
              {course.instructor.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <span>{course.instructor.name}</span>
        </div>
      </CardHeader>
      
      <CardContent className="pb-4">
        <p className="text-muted-foreground line-clamp-2 mb-3">{course.description}</p>
        
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center gap-1">
            <Clock size={16} className="text-empower-skyblue" />
            <span>{course.duration}</span>
          </div>
          <Badge variant="outline" className={
            course.level === 'Beginner' ? 'bg-empower-mint/20 text-empower-olive' : 
            course.level === 'Intermediate' ? 'bg-empower-gold/20 text-empower-gold' : 
            'bg-empower-lavender/20 text-empower-lavender'
          }>
            {course.level}
          </Badge>
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
              <span className="text-green-600 bg-green-100 py-1 px-2 rounded-full text-sm">Free</span>
            ) : (
              <span className="text-empower-terracotta">${course.price}</span>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        <Button 
          onClick={handleEnroll} 
          className="w-full bg-gradient-to-r from-empower-terracotta to-empower-coral hover:from-empower-coral hover:to-empower-terracotta text-white transition-all duration-500 shadow-lg hover:shadow-xl btn-hover"
        >
          Enroll Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
