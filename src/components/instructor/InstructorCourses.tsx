
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Card, 
  CardContent, 
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Filter, Plus, Search, Star, Users, Video } from 'lucide-react';

const InstructorCourses: React.FC = () => {
  const courses = [
    {
      id: 1,
      title: "Traditional Weaving Techniques",
      category: "Handcraft",
      students: 45,
      lessons: 12,
      status: "published",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1599202889720-d071bd694193?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      id: 2,
      title: "Introduction to Crochet",
      category: "Handcraft",
      students: 38,
      lessons: 8,
      status: "published",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1574521091464-a55e7763c1e5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      id: 3,
      title: "Handmade Pottery Workshop",
      category: "Pottery",
      students: 32,
      lessons: 10,
      status: "published",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1565193566173-7a0ee3a2ad2e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      id: 4,
      title: "Sustainable Textile Art",
      category: "Textiles",
      students: 29,
      lessons: 7,
      status: "published",
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1551907234-fb773f8297e5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      id: 5,
      title: "Advanced Embroidery Masterclass",
      category: "Handcraft",
      students: 0,
      lessons: 15,
      status: "draft",
      rating: 0,
      image: "https://images.unsplash.com/photo-1591169269144-ddd0007ec380?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      id: 6,
      title: "Natural Dye Techniques",
      category: "Textiles",
      students: 0,
      lessons: 6,
      status: "pending",
      rating: 0,
      image: "https://images.unsplash.com/photo-1599653040663-46639cd0a8fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    }
  ];
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Published</Badge>;
      case 'draft':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Draft</Badge>;
      case 'pending':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Pending Review</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-empower-brown mb-6">Manage Courses</h1>
      
        {/* Actions Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search courses..."
                className="pl-10 min-w-[200px]"
              />
            </div>
            
            <Select>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="handcraft">Handcraft</SelectItem>
                <SelectItem value="pottery">Pottery</SelectItem>
                <SelectItem value="textiles">Textiles</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button className="bg-empower-terracotta hover:bg-empower-terracotta/90 w-full sm:w-auto">
            <Plus size={16} className="mr-2" />
            Create New Course
          </Button>
        </div>
      </div>
      
      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video relative">
              <img 
                src={course.image} 
                alt={course.title} 
                className="w-full h-full object-cover"
              />
              {getStatusBadge(course.status)}
            </div>
            
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{course.title}</CardTitle>
              <p className="text-sm text-gray-500">{course.category}</p>
            </CardHeader>
            
            <CardContent className="pb-2">
              <div className="flex justify-between text-sm">
                <div className="flex items-center">
                  <Video size={16} className="text-empower-terracotta mr-1" />
                  <span>{course.lessons} Lessons</span>
                </div>
                
                <div className="flex items-center">
                  <Users size={16} className="text-empower-terracotta mr-1" />
                  <span>{course.students} Students</span>
                </div>
                
                {course.rating > 0 && (
                  <div className="flex items-center text-empower-gold">
                    <Star size={16} className="fill-empower-gold mr-1" />
                    <span>{course.rating}</span>
                  </div>
                )}
              </div>
            </CardContent>
            
            <CardFooter className="pt-2 flex justify-between">
              <Button variant="outline" size="sm">
                Edit
              </Button>
              <Button variant="outline" size="sm">
                View
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default InstructorCourses;
