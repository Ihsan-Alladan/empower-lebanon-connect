
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend
} from 'recharts';
import { Search, Download, ArrowDownToLine, Trophy } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/components/ui/sonner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

// Mock data for charts and tables
const studentProgressData = [
  { id: 1, name: 'Emma Johnson', course: 'Traditional Weaving Techniques', progress: 85, grade: 'A', completedLessons: 10, totalLessons: 12, lastActive: '1 day ago' },
  { id: 2, name: 'Michael Smith', course: 'Traditional Weaving Techniques', progress: 42, grade: 'C', completedLessons: 5, totalLessons: 12, lastActive: '3 days ago' },
  { id: 3, name: 'Sarah Wilson', course: 'Introduction to Crochet', progress: 93, grade: 'A+', completedLessons: 7, totalLessons: 8, lastActive: '2 hours ago' },
  { id: 4, name: 'David Brown', course: 'Traditional Weaving Techniques', progress: 68, grade: 'B', completedLessons: 8, totalLessons: 12, lastActive: '5 hours ago' },
  { id: 5, name: 'Lisa Garcia', course: 'Handmade Pottery Workshop', progress: 21, grade: 'D', completedLessons: 2, totalLessons: 10, lastActive: '1 week ago' },
  { id: 6, name: 'James Wilson', course: 'Introduction to Crochet', progress: 75, grade: 'B+', completedLessons: 6, totalLessons: 8, lastActive: '1 day ago' },
  { id: 7, name: 'Patricia Moore', course: 'Advanced Embroidery Masterclass', progress: 88, grade: 'A', completedLessons: 13, totalLessons: 15, lastActive: '12 hours ago' },
  { id: 8, name: 'Robert Taylor', course: 'Sustainable Textile Art', progress: 56, grade: 'C+', completedLessons: 4, totalLessons: 7, lastActive: '2 days ago' },
];

const courseCompletionData = [
  { name: 'Traditional Weaving', completion: 68 },
  { name: 'Intro to Crochet', completion: 82 },
  { name: 'Advanced Embroidery', completion: 75 },
  { name: 'Pottery Workshop', completion: 45 },
  { name: 'Sustainable Textile', completion: 60 },
];

const assignmentPerformanceData = [
  { name: 'Assignment 1', averageScore: 85 },
  { name: 'Assignment 2', averageScore: 78 },
  { name: 'Assignment 3', averageScore: 92 },
  { name: 'Assignment 4', averageScore: 65 },
  { name: 'Assignment 5', averageScore: 88 },
];

const gradeDistributionData = [
  { name: 'A', value: 35 },
  { name: 'B', value: 25 },
  { name: 'C', value: 20 },
  { name: 'D', value: 15 },
  { name: 'F', value: 5 },
];

const timeSpentData = [
  { name: 'Week 1', hours: 12 },
  { name: 'Week 2', hours: 15 },
  { name: 'Week 3', hours: 8 },
  { name: 'Week 4', hours: 10 },
  { name: 'Week 5', hours: 14 },
  { name: 'Week 6', hours: 16 },
  { name: 'Week 7', hours: 12 },
  { name: 'Week 8', hours: 9 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const InstructorProgress: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [selectedCourse, setSelectedCourse] = useState('all');
  
  const handleExportReport = () => {
    toast.success('Exporting report', {
      description: 'Your report is being downloaded as a CSV file.'
    });
  };
  
  const handleViewStudentDetails = (studentId: number) => {
    toast.info('View student details', {
      description: 'This would open a detailed view of the student\'s progress.'
    });
  };
  
  // Filter students based on selected course
  const filteredStudents = selectedCourse === 'all' 
    ? studentProgressData 
    : studentProgressData.filter(student => {
        const courseName = student.course.toLowerCase();
        return courseName.includes(selectedCourse);
      });
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <h1 className="text-2xl font-bold text-empower-brown">Student Progress</h1>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={handleExportReport}
          >
            <ArrowDownToLine size={16} />
            Export Report
          </Button>
        </div>
      </div>
      
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="detailed">Detailed Analysis</TabsTrigger>
          <TabsTrigger value="students">Individual Students</TabsTrigger>
        </TabsList>
        
        <div className="flex justify-end mb-2">
          <Select 
            value={selectedCourse}
            onValueChange={setSelectedCourse}
          >
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder="Filter by course" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Courses</SelectItem>
              <SelectItem value="weaving">Traditional Weaving Techniques</SelectItem>
              <SelectItem value="crochet">Introduction to Crochet</SelectItem>
              <SelectItem value="embroidery">Advanced Embroidery Masterclass</SelectItem>
              <SelectItem value="pottery">Handmade Pottery Workshop</SelectItem>
              <SelectItem value="textile">Sustainable Textile Art</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Course Completion Rates</CardTitle>
                <CardDescription>Average completion percentage by course</CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={courseCompletionData}
                      margin={{
                        top: 5,
                        right: 20,
                        left: 0,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis label={{ value: 'Completion %', angle: -90, position: 'insideLeft' }} />
                      <Tooltip />
                      <Bar dataKey="completion" fill="#1EAEDB" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Assignment Performance</CardTitle>
                <CardDescription>Average scores across all assignments</CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={assignmentPerformanceData}
                      margin={{
                        top: 5,
                        right: 20,
                        left: 0,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, 100]} label={{ value: 'Score', angle: -90, position: 'insideLeft' }} />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="averageScore" 
                        stroke="#8884d8" 
                        strokeWidth={2}
                        activeDot={{ r: 8 }} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Top Performing Students</CardTitle>
                <CardDescription>Students with highest completion rates</CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="space-y-4">
                  {studentProgressData
                    .sort((a, b) => b.progress - a.progress)
                    .slice(0, 5)
                    .map((student, index) => (
                      <div key={student.id} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="bg-slate-100 rounded-full w-8 h-8 flex items-center justify-center mr-3 text-xs font-medium text-slate-600">
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-medium">{student.name}</div>
                            <div className="text-xs text-slate-500">{student.course}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-empower-terracotta">{student.progress}%</div>
                          <div className="text-xs text-slate-500">Grade: {student.grade}</div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Grade Distribution</CardTitle>
                <CardDescription>Overall grades across all courses</CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={gradeDistributionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {gradeDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Students At Risk</CardTitle>
                <CardDescription>Students with low completion or activity</CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="space-y-4">
                  {studentProgressData
                    .filter(s => s.progress < 50)
                    .sort((a, b) => a.progress - b.progress)
                    .slice(0, 5)
                    .map((student) => (
                      <div key={student.id} className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">{student.name}</div>
                          <div className="text-xs text-slate-500">{student.course}</div>
                          <div className="text-xs text-red-500 mt-1">
                            {student.progress}% Complete • Last active: {student.lastActive}
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleViewStudentDetails(student.id)}
                        >
                          Contact
                        </Button>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="detailed" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Time Spent Learning</CardTitle>
                <CardDescription>Average hours per week across all courses</CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={timeSpentData}
                      margin={{
                        top: 5,
                        right: 20,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis label={{ value: 'Hours', angle: -90, position: 'insideLeft' }} />
                      <Tooltip />
                      <Bar dataKey="hours" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Lesson Completion</CardTitle>
                <CardDescription>Completion rates by lesson module</CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="space-y-4">
                  {[
                    { name: "Introduction to Tools", completion: 95 },
                    { name: "Basic Techniques", completion: 87 },
                    { name: "Pattern Design", completion: 74 },
                    { name: "Color Theory", completion: 68 },
                    { name: "Advanced Patterns", completion: 45 },
                    { name: "Final Project", completion: 32 },
                  ].map((lesson, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{lesson.name}</span>
                        <span className="font-medium">{lesson.completion}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-empower-terracotta h-2 rounded-full" 
                          style={{ width: `${lesson.completion}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Assignment Analysis</CardTitle>
              <CardDescription>Detailed performance metrics by assignment</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="border rounded-md overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Assignment</TableHead>
                      <TableHead className="text-right">Avg. Score</TableHead>
                      <TableHead className="text-right">Submission Rate</TableHead>
                      <TableHead className="text-right">Avg. Time Spent</TableHead>
                      <TableHead className="text-right">Difficulty Rating</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { name: "Weaving Pattern 1", avgScore: 87, submissionRate: 95, timeSpent: "45 min", difficulty: "Easy" },
                      { name: "Color Wheel Exercise", avgScore: 92, submissionRate: 88, timeSpent: "30 min", difficulty: "Easy" },
                      { name: "Pattern Design Project", avgScore: 78, submissionRate: 82, timeSpent: "2.5 hours", difficulty: "Medium" },
                      { name: "Traditional Techniques", avgScore: 83, submissionRate: 75, timeSpent: "1.5 hours", difficulty: "Medium" },
                      { name: "Advanced Weaving", avgScore: 72, submissionRate: 65, timeSpent: "3 hours", difficulty: "Hard" },
                      { name: "Final Project Submission", avgScore: 89, submissionRate: 70, timeSpent: "5+ hours", difficulty: "Hard" },
                    ].map((assignment, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium">{assignment.name}</TableCell>
                        <TableCell className="text-right">{assignment.avgScore}/100</TableCell>
                        <TableCell className="text-right">{assignment.submissionRate}%</TableCell>
                        <TableCell className="text-right">{assignment.timeSpent}</TableCell>
                        <TableCell className="text-right">
                          <Badge className={
                            assignment.difficulty === "Easy" ? "bg-green-100 text-green-800" :
                            assignment.difficulty === "Medium" ? "bg-yellow-100 text-yellow-800" :
                            "bg-red-100 text-red-800"
                          }>
                            {assignment.difficulty}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="students" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Individual Student Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row justify-between mb-4 gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input 
                    placeholder="Search students by name..." 
                    className="pl-10" 
                  />
                </div>
              </div>
              
              <div className="border rounded-md overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead className="hidden md:table-cell">Course</TableHead>
                      <TableHead className="text-center">Progress</TableHead>
                      <TableHead className="text-center hidden md:table-cell">Lessons</TableHead>
                      <TableHead className="text-center">Grade</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{student.name}</div>
                              <div className="md:hidden text-xs text-gray-500">
                                {student.course}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{student.course}</TableCell>
                        <TableCell className="text-center">
                          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                            <div 
                              className="bg-empower-terracotta h-2.5 rounded-full" 
                              style={{ width: `${student.progress}%` }}
                            ></div>
                          </div>
                          <div className="text-xs">{student.progress}%</div>
                        </TableCell>
                        <TableCell className="text-center hidden md:table-cell">
                          {student.completedLessons}/{student.totalLessons}
                        </TableCell>
                        <TableCell className="text-center">
                          <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                            student.grade.startsWith('A') ? 'bg-green-100 text-green-800' :
                            student.grade.startsWith('B') ? 'bg-blue-100 text-blue-800' :
                            student.grade.startsWith('C') ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {student.grade}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleViewStudentDetails(student.id)}
                            >
                              Details
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="text-blue-600"
                            >
                              Message
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              {filteredStudents.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No students found. Try another course filter.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InstructorProgress;
