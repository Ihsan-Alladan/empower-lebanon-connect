
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, TrendingUp } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { trendingCourses } from '@/data/trendingCourses';

const TrendingCourses: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="mb-12">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="text-rose-500" size={22} />
        <h2 className="text-2xl font-bold">Trending Courses</h2>
      </div>
      
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {trendingCourses.map((course, index) => (
            <CarouselItem key={course.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
              <Card className="overflow-hidden shadow-md card-hover">
                <div className="relative">
                  <img 
                    src={course.thumbnail} 
                    alt={course.title} 
                    className="w-full h-48 object-cover image-zoom"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge 
                      variant={course.category === 'handmade' ? 'default' : 'secondary'}
                      className="animate-bounce-light bg-gradient-to-r from-pink-400 to-rose-400 text-white border-0"
                    >
                      Trending
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg line-clamp-1 card-title">{course.title}</h3>
                  
                  <div className="flex items-center gap-2 mt-2 text-sm text-indigo-600">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={course.instructor.avatar} alt={course.instructor.name} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-400 to-indigo-500 text-white">
                        {course.instructor.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span>{course.instructor.name}</span>
                  </div>
                  
                  <div className="flex justify-between items-center mt-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={16} 
                          className={i < course.rating ? "fill-amber-400 text-amber-400" : "text-muted"}
                        />
                      ))}
                      <span className="text-xs ml-1">({course.reviews})</span>
                    </div>
                    
                    <Button 
                      size="sm" 
                      onClick={() => navigate(`/courses/${course.id}`)}
                      className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white button-pop border-0"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0" />
        <CarouselNext className="right-0" />
      </Carousel>
    </div>
  );
};

export default TrendingCourses;
