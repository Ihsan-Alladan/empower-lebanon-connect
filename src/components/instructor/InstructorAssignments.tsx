
import React, { useState } from 'react';
import { 
  Card,
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Search, 
  Plus, 
  Download,
  Eye,
  Edit,
  Trash2,
  Calendar
} from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';

const assignmentsMock = [
  {
    id: 1,
    title: 'Traditional Weaving Patterns',
    course: 'Traditional Weaving Techniques',
    dueDate: new Date(2025, 4, 15),
    submissions: 12,
    status: 'active'
  },
  {
    id: 2,
    title: 'Color Theory Basics',
    course: 'Introduction to Crochet',
    dueDate: new Date(2025, 4, 20),
    submissions: 8,
    status: 'active'
  },
  {
    id: 3,
    title: 'Final Project Submission',
    course: 'Advanced Embroidery Masterclass',
    dueDate: new Date(2025, 3, 30),
    submissions: 5,
    status: 'past'
  },
  {
    id: 4,
    title: 'Clay Preparation Techniques',
    course: 'Handmade Pottery Workshop',
    dueDate: new Date(2025, 5, 10),
    submissions: 0,
    status: 'upcoming'
  },
  {
    id: 5,
    title: 'Sustainable Materials Research',
    course: 'Sustainable Textile Art',
    dueDate: new Date(2025, 5, 5),
    submissions: 3,
    status: 'active'
  }
];

const submissionsMock = [
  {
    id: 1,
    assignmentId: 1,
    student: 'Emma Johnson',
    submittedDate: new Date(2025, 4, 10),
    file: 'traditional_patterns_emma.pdf',
    score: 92,
    feedback: 'Excellent work on the diamond pattern!'
  },
  {
    id: 2,
    assignmentId: 1,
    student: 'Michael Smith',
    submittedDate: new Date(2025, 4, 12),
    file: 'weaving_submission_michael.pdf',
    score: 88,
    feedback: 'Good work, but pay attention to edge consistency.'
  },
  {
    id: 3,
    assignmentId: 2,
    student: 'Sarah Wilson',
    submittedDate: new Date(2025, 4, 15),
    file: 'color_theory_sarah.pdf',
    score: 95,
    feedback: 'Outstanding color analysis and examples!'
  }
];

const InstructorAssignments: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('assignments');
  const [selectedAssignment, setSelectedAssignment] = useState<number | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  
  const currentSubmissions = submissionsMock.filter(
    (sub) => selectedAssignment === null || sub.assignmentId === selectedAssignment
  );

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Assignment created successfully', {
      description: 'Students will be notified of the new assignment'
    });
    setShowCreateDialog(false);
  };

  const handleViewSubmission = (id: number) => {
    toast.info('Viewing submission', {
      description: 'This would open the full submission details'
    });
  };

  const handleDownloadSubmission = (id: number) => {
    toast.info('Downloading submission', {
      description: 'The file is being downloaded to your device'
    });
  };

  const handleDeleteAssignment = (id: number) => {
    toast.success('Assignment deleted', {
      description: 'The assignment has been deleted successfully'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <h1 className="text-2xl font-bold text-empower-brown">Assignments</h1>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <Button 
            onClick={() => setShowCreateDialog(true)}
            className="bg-empower-terracotta hover:bg-empower-terracotta/90"
          >
            <Plus size={16} className="mr-2" />
            Create Assignment
          </Button>
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="submissions">Submissions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="assignments" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Manage Assignments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row justify-between mb-4 gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input 
                    placeholder="Search assignments..." 
                    className="pl-10 min-w-[200px]" 
                  />
                </div>
                
                <Select>
                  <SelectTrigger className="w-full sm:w-[200px]">
                    <SelectValue placeholder="Filter by course" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Courses</SelectItem>
                    <SelectItem value="weaving">Traditional Weaving</SelectItem>
                    <SelectItem value="crochet">Introduction to Crochet</SelectItem>
                    <SelectItem value="embroidery">Advanced Embroidery</SelectItem>
                    <SelectItem value="pottery">Handmade Pottery</SelectItem>
                    <SelectItem value="textile">Sustainable Textile Art</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="border rounded-md overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Assignment</TableHead>
                      <TableHead className="hidden md:table-cell">Course</TableHead>
                      <TableHead className="hidden md:table-cell">Due Date</TableHead>
                      <TableHead className="text-center">Submissions</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {assignmentsMock.map((assignment) => (
                      <TableRow key={assignment.id}>
                        <TableCell className="font-medium">
                          {assignment.title}
                          <div className="md:hidden mt-1 text-sm text-gray-500">
                            {assignment.course} • Due: {format(assignment.dueDate, 'MMM d, yyyy')}
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{assignment.course}</TableCell>
                        <TableCell className="hidden md:table-cell">{format(assignment.dueDate, 'MMM d, yyyy')}</TableCell>
                        <TableCell className="text-center">{assignment.submissions}</TableCell>
                        <TableCell className="text-center">
                          <Badge className={cn(
                            assignment.status === 'active' && 'bg-green-100 text-green-800 hover:bg-green-100',
                            assignment.status === 'upcoming' && 'bg-blue-100 text-blue-800 hover:bg-blue-100',
                            assignment.status === 'past' && 'bg-gray-100 text-gray-800 hover:bg-gray-100'
                          )}>
                            {assignment.status === 'active' && 'Active'}
                            {assignment.status === 'upcoming' && 'Upcoming'}
                            {assignment.status === 'past' && 'Past'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => setSelectedAssignment(assignment.id)}
                            >
                              <Eye size={18} />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Edit size={18} />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="text-red-500"
                              onClick={() => handleDeleteAssignment(assignment.id)}
                            >
                              <Trash2 size={18} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="submissions" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">
                {selectedAssignment 
                  ? `Submissions for ${assignmentsMock.find(a => a.id === selectedAssignment)?.title}` 
                  : 'All Submissions'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row justify-between mb-4 gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input 
                    placeholder="Search submissions..." 
                    className="pl-10" 
                  />
                </div>
                
                <Select 
                  value={selectedAssignment ? String(selectedAssignment) : 'all'}
                  onValueChange={(value) => setSelectedAssignment(value === 'all' ? null : Number(value))}
                >
                  <SelectTrigger className="w-full sm:w-[250px]">
                    <SelectValue placeholder="Filter by assignment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Assignments</SelectItem>
                    {assignmentsMock.map(assignment => (
                      <SelectItem key={assignment.id} value={String(assignment.id)}>
                        {assignment.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {currentSubmissions.length > 0 ? (
                <div className="border rounded-md overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead className="hidden md:table-cell">Submitted</TableHead>
                        <TableHead className="text-center">Score</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentSubmissions.map((submission) => (
                        <TableRow key={submission.id}>
                          <TableCell className="font-medium">
                            {submission.student}
                            <div className="md:hidden mt-1 text-sm text-gray-500">
                              Submitted: {format(submission.submittedDate, 'MMM d, yyyy')}
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">{format(submission.submittedDate, 'MMM d, yyyy')}</TableCell>
                          <TableCell className="text-center">{submission.score || '-'}/100</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => handleViewSubmission(submission.id)}
                              >
                                <Eye size={18} />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => handleDownloadSubmission(submission.id)}
                              >
                                <Download size={18} />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No submissions found. Select a different assignment or check back later.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Assignment</DialogTitle>
            <DialogDescription>
              Add a new assignment for your students. Notifications will be sent to enrolled students.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleCreateAssignment} className="space-y-4 pt-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Assignment Title</Label>
                <Input id="title" placeholder="e.g. Traditional Weaving Patterns" />
              </div>
              
              <div>
                <Label htmlFor="course">Course</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a course" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weaving">Traditional Weaving Techniques</SelectItem>
                    <SelectItem value="crochet">Introduction to Crochet</SelectItem>
                    <SelectItem value="embroidery">Advanced Embroidery Masterclass</SelectItem>
                    <SelectItem value="pottery">Handmade Pottery Workshop</SelectItem>
                    <SelectItem value="textile">Sustainable Textile Art</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Provide instructions and requirements for the assignment"
                  className="min-h-[100px]"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Due Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !selectedDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : "Select a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div>
                  <Label htmlFor="file">Upload Files (Optional)</Label>
                  <div className="mt-1">
                    <Button variant="outline" className="w-full" asChild>
                      <label className="cursor-pointer flex items-center justify-center">
                        <Plus size={16} className="mr-2" />
                        Add Files
                        <input
                          type="file"
                          className="sr-only"
                          multiple
                        />
                      </label>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowCreateDialog(false)}>
                Cancel
              </Button>
              <Button type="submit">
                Create Assignment
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InstructorAssignments;
