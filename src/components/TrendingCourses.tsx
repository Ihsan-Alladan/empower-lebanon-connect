
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
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
import { fetchTrendingCourses } from '@/services/courseService';
import { toast } from 'sonner';

const TrendingCourses: React.FC = () => {
  const navigate = useNavigate();
  
  const { data: trendingCourses = [], isLoading, error } = useQuery({
    queryKey: ['trendingCourses'],
    queryFn: fetchTrendingCourses
  });

  React.useEffect(() => {
    if (error) {
      console.error("Error loading trending courses:", error);
      toast.error("Failed to load trending courses");
    }
  }, [error]);
  
  return (
    <div className="mb-12">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="text-empower-terracotta" size={22} />
        <h2 className="text-2xl font-bold">Trending Courses</h2>
      </div>
      
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {isLoading ? (
            [1, 2, 3, 4].map((item) => (
              <CarouselItem key={item} className="md:basis-1/2 lg:basis-1/3 pl-4">
                <Card className="overflow-hidden shadow-md hover-zoom">
                  <div className="bg-gray-200 h-48 animate-pulse" />
                  <CardContent className="p-4">
                    <div className="h-6 bg-gray-200 rounded animate-pulse mb-2" />
                    <div className="h-4 bg-gray-100 rounded animate-pulse mb-3" />
                    <div className="h-4 bg-gray-100 rounded animate-pulse mb-3" />
                    <div className="h-8 bg-gray-200 rounded animate-pulse mt-3" />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))
          ) : (
            trendingCourses.map((course) => (
              <CarouselItem key={course.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                <Card className="overflow-hidden shadow-md hover-zoom">
                  <div className="relative">
                    <img 
                      src={course.thumbnail} 
                      alt={course.title} 
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge 
                        variant={course.category === 'handmade' ? 'default' : 'secondary'}
                        className="animate-bounce-light"
                      >
                        Trending
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg line-clamp-1">{course.title}</h3>
                    
                    <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={course.instructor.avatar} alt={course.instructor.name} />
                        <AvatarFallback>{course.instructor.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span>{course.instructor.name}</span>
                    </div>
                    
                    <div className="flex justify-between items-center mt-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={16} 
                            className={i < course.rating ? "fill-empower-gold text-empower-gold" : "text-muted"}
                          />
                        ))}
                        <span className="text-xs ml-1">({course.reviews})</span>
                      </div>
                      
                      <Button 
                        size="sm" 
                        onClick={() => navigate(`/courses/${course.id}`)}
                        className="bg-empower-terracotta hover:bg-empower-terracotta/90"
                      >
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))
          )}
        </CarouselContent>
        <CarouselPrevious className="left-0" />
        <CarouselNext className="right-0" />
      </Carousel>
    </div>
  );
};

export default TrendingCourses;
