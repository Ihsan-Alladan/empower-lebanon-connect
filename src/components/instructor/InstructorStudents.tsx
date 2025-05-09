
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Calendar, Filter, Mail, Plus, Search, User } from 'lucide-react';

const InstructorStudents: React.FC = () => {
  const students = [
    {
      id: 1,
      name: "Emma Johnson",
      email: "emma@example.com",
      courses: ["Traditional Weaving", "Pottery Basics"],
      joined: "Aug 15, 2023",
      progress: 75
    },
    {
      id: 2,
      name: "Michael Smith",
      email: "michael@example.com",
      courses: ["Advanced Weaving", "Natural Dyes"],
      joined: "Jul 22, 2023",
      progress: 45
    },
    {
      id: 3,
      name: "Sarah Wilson",
      email: "sarah@example.com",
      courses: ["Embroidery Basics"],
      joined: "Sep 5, 2023",
      progress: 90
    },
    {
      id: 4,
      name: "David Brown",
      email: "david@example.com",
      courses: ["Traditional Patterns", "Sustainable Textiles"],
      joined: "Jun 10, 2023",
      progress: 60
    },
    {
      id: 5,
      name: "Jennifer Lopez",
      email: "jennifer@example.com",
      courses: ["Pottery Workshop"],
      joined: "Aug 30, 2023",
      progress: 30
    },
    {
      id: 6,
      name: "Robert Williams",
      email: "robert@example.com",
      courses: ["Handcrafting Basics", "Advanced Crochet"],
      joined: "Jul 5, 2023",
      progress: 85
    }
  ];
  
  const getProgressBadge = (progress: number) => {
    if (progress >= 80) {
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Excellent</Badge>;
    } else if (progress >= 50) {
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Good</Badge>;
    } else {
      return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">In Progress</Badge>;
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-empower-brown mb-6">My Students</h1>
      
        {/* Actions Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Search students by name or email..."
              className="pl-10"
            />
          </div>
          
          <Button className="bg-empower-terracotta hover:bg-empower-terracotta/90 w-full md:w-auto">
            <Mail size={16} className="mr-2" />
            Message All Students
          </Button>
        </div>
      </div>
      
      {/* Students Table */}
      <div className="rounded-lg border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Student</TableHead>
              <TableHead>Courses Enrolled</TableHead>
              <TableHead>Joined Date</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-empower-terracotta/10 rounded-full flex items-center justify-center">
                      <User size={16} className="text-empower-terracotta" />
                    </div>
                    <div>
                      <div className="font-medium">{student.name}</div>
                      <div className="text-sm text-gray-500">{student.email}</div>
                    </div>
                  </div>
                </TableCell>
                
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {student.courses.map((course, idx) => (
                      <Badge key={idx} variant="outline" className="bg-gray-50">
                        {course}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Calendar size={14} className="text-gray-400" />
                    <span>{student.joined}</span>
                  </div>
                </TableCell>
                
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-empower-terracotta" 
                        style={{ width: `${student.progress}%` }} 
                      />
                    </div>
                    <span className="text-sm">{student.progress}%</span>
                    {getProgressBadge(student.progress)}
                  </div>
                </TableCell>
                
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm">
                      <Mail size={14} className="mr-1" />
                      Message
                    </Button>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {/* Pagination */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Showing 1-6 of 6 students
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <Button variant="outline" size="sm" className="bg-empower-terracotta text-white">1</Button>
          <Button variant="outline" size="sm" disabled>Next</Button>
        </div>
      </div>
    </div>
  );
};

export default InstructorStudents;
