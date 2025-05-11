
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Search, 
  Plus, 
  UserPlus, 
  UserMinus,
  MessageSquare,
  Video,
  Users,
  Clock,
  Calendar,
  Mail
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const studentsMock = [
  {
    id: 1,
    name: 'Emma Johnson',
    email: 'emma.j@example.com',
    avatar: 'https://i.pravatar.cc/150?img=1',
    enrolledCourses: ['Traditional Weaving Techniques', 'Sustainable Textile Art'],
    lastActive: '2 days ago',
    progress: 68,
  },
  {
    id: 2,
    name: 'Michael Smith',
    email: 'michael.s@example.com',
    avatar: 'https://i.pravatar.cc/150?img=2',
    enrolledCourses: ['Traditional Weaving Techniques'],
    lastActive: '5 hours ago',
    progress: 42,
  },
  {
    id: 3,
    name: 'Sarah Wilson',
    email: 'sarah.w@example.com',
    avatar: 'https://i.pravatar.cc/150?img=3',
    enrolledCourses: ['Introduction to Crochet', 'Advanced Embroidery Masterclass'],
    lastActive: 'Just now',
    progress: 89,
  },
  {
    id: 4,
    name: 'David Brown',
    email: 'david.b@example.com',
    avatar: 'https://i.pravatar.cc/150?img=4',
    enrolledCourses: ['Traditional Weaving Techniques', 'Introduction to Crochet'],
    lastActive: '1 day ago',
    progress: 55,
  },
  {
    id: 5,
    name: 'Lisa Garcia',
    email: 'lisa.g@example.com',
    avatar: 'https://i.pravatar.cc/150?img=5',
    enrolledCourses: ['Handmade Pottery Workshop'],
    lastActive: '3 days ago',
    progress: 21,
  }
];

const sessionsMock = [
  {
    id: 1,
    title: 'Live Weaving Demonstration',
    course: 'Traditional Weaving Techniques',
    date: 'May 15, 2025',
    time: '10:00 AM - 11:30 AM',
    platform: 'Zoom',
    link: 'https://zoom.us/j/123456789',
    status: 'upcoming'
  },
  {
    id: 2,
    title: 'Q&A Session: Embroidery Techniques',
    course: 'Advanced Embroidery Masterclass',
    date: 'May 18, 2025',
    time: '3:00 PM - 4:00 PM',
    platform: 'Google Meet',
    link: 'https://meet.google.com/abc-defg-hij',
    status: 'upcoming'
  },
  {
    id: 3,
    title: 'Introduction to Pottery Materials',
    course: 'Handmade Pottery Workshop',
    date: 'April 25, 2025',
    time: '2:00 PM - 3:30 PM',
    platform: 'Zoom',
    link: 'https://zoom.us/j/987654321',
    status: 'completed'
  },
  {
    id: 4,
    title: 'Weaving Pattern Troubleshooting',
    course: 'Traditional Weaving Techniques',
    date: 'April 30, 2025',
    time: '11:00 AM - 12:00 PM',
    platform: 'Google Meet',
    link: 'https://meet.google.com/jkl-mnop-qrs',
    status: 'completed'
  }
];

const announcements = [
  {
    id: 1,
    title: 'New Module Released: Advanced Patterns',
    course: 'Traditional Weaving Techniques',
    date: 'May 2, 2025',
    content: 'I\'ve just released a new module on advanced patterns. Check it out and let me know if you have any questions!'
  },
  {
    id: 2,
    title: 'Upcoming Live Session Reminder',
    course: 'All Courses',
    date: 'April 28, 2025',
    content: 'Don\'t forget we have our monthly Q&A session this Friday at 3 PM. Bring your questions!'
  },
  {
    id: 3,
    title: 'Materials List Updated',
    course: 'Handmade Pottery Workshop',
    date: 'April 25, 2025',
    content: 'I\'ve updated the materials list for our next workshop. Please review before our next session.'
  }
];

const InstructorClassroom: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('students');
  const [showAddStudentDialog, setShowAddStudentDialog] = useState(false);
  const [showAnnouncementDialog, setShowAnnouncementDialog] = useState(false);
  const [showSessionDialog, setShowSessionDialog] = useState(false);
  
  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Invitation sent successfully', {
      description: 'The student will receive an email invitation to join your course.'
    });
    setShowAddStudentDialog(false);
  };
  
  const handleSendAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Announcement sent successfully', {
      description: 'All students have been notified.'
    });
    setShowAnnouncementDialog(false);
  };
  
  const handleCreateSession = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Live session created', {
      description: 'Students will be notified of the upcoming session.'
    });
    setShowSessionDialog(false);
  };
  
  const handleRemoveStudent = (id: number) => {
    toast.success('Student removed from course', {
      description: 'The student has been removed and notified.'
    });
  };
  
  const handleJoinSession = (id: number) => {
    toast.info('Joining session', {
      description: 'Opening the meeting link in a new window.'
    });
    // This would normally open a new window with the meeting link
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-bold text-empower-brown">Classroom Management</h1>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button 
            onClick={() => setShowAnnouncementDialog(true)}
            variant="outline"
            className="flex gap-2"
          >
            <MessageSquare size={16} />
            Send Announcement
          </Button>
          <Button
            onClick={() => setShowSessionDialog(true)}
            variant="outline"
            className="flex gap-2"
          >
            <Video size={16} />
            Schedule Session
          </Button>
          <Button 
            onClick={() => setShowAddStudentDialog(true)}
            className="bg-empower-terracotta hover:bg-empower-terracotta/90"
          >
            <UserPlus size={16} className="mr-2" />
            Add Student
          </Button>
        </div>
      </div>
      
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="sessions">Live Sessions</TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
        </TabsList>
        
        <TabsContent value="students" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Manage Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row justify-between mb-4 gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input 
                    placeholder="Search students by name or email..." 
                    className="pl-10" 
                  />
                </div>
                
                <Select>
                  <SelectTrigger className="w-full sm:w-[250px]">
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
              
              <div className="border rounded-md overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead className="hidden md:table-cell">Enrolled In</TableHead>
                      <TableHead className="hidden md:table-cell">Last Active</TableHead>
                      <TableHead className="hidden md:table-cell">Progress</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {studentsMock.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarImage src={student.avatar} alt={student.name} />
                              <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{student.name}</div>
                              <div className="text-sm text-gray-500">{student.email}</div>
                              <div className="md:hidden text-xs text-gray-500 mt-1">
                                {student.enrolledCourses.length} courses • {student.lastActive}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div className="space-y-1">
                            {student.enrolledCourses.map((course, i) => (
                              <Badge 
                                key={i} 
                                variant="outline" 
                                className="mr-1 mb-1"
                              >
                                {course}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{student.lastActive}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className="bg-empower-terracotta h-2.5 rounded-full" 
                              style={{ width: `${student.progress}%` }}
                            ></div>
                          </div>
                          <div className="text-xs text-right mt-1">{student.progress}%</div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="flex gap-1"
                            >
                              <MessageSquare size={14} />
                              <span className="hidden sm:inline">Message</span>
                            </Button>
                            <Button 
                              variant="ghost"
                              size="sm"
                              className="flex gap-1 text-red-500 hover:text-red-600"
                              onClick={() => handleRemoveStudent(student.id)}
                            >
                              <UserMinus size={14} />
                              <span className="hidden sm:inline">Remove</span>
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
        
        <TabsContent value="sessions" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Live Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row justify-between mb-4 gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input 
                    placeholder="Search sessions..." 
                    className="pl-10" 
                  />
                </div>
                
                <Select>
                  <SelectTrigger className="w-full sm:w-[200px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sessions</SelectItem>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sessionsMock.map((session) => (
                  <Card key={session.id} className={`overflow-hidden border ${
                    session.status === 'upcoming' ? 'border-blue-200' : 'border-gray-200'
                  }`}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-lg">{session.title}</h3>
                          <p className="text-sm text-gray-500">{session.course}</p>
                        </div>
                        <Badge className={
                          session.status === 'upcoming' 
                            ? 'bg-blue-100 text-blue-800 hover:bg-blue-100' 
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-100'
                        }>
                          {session.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                        </Badge>
                      </div>
                      
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center text-sm">
                          <Calendar size={16} className="mr-2 text-gray-500" />
                          {session.date}
                        </div>
                        <div className="flex items-center text-sm">
                          <Clock size={16} className="mr-2 text-gray-500" />
                          {session.time}
                        </div>
                        <div className="flex items-center text-sm">
                          <Video size={16} className="mr-2 text-gray-500" />
                          {session.platform}
                        </div>
                        <div className="flex items-center text-sm">
                          <Users size={16} className="mr-2 text-gray-500" />
                          {Math.floor(Math.random() * 20) + 5} students registered
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        {session.status === 'upcoming' ? (
                          <Button 
                            className="w-full" 
                            onClick={() => handleJoinSession(session.id)}
                          >
                            <Video size={16} className="mr-2" />
                            Join Session
                          </Button>
                        ) : (
                          <Button variant="outline" className="w-full">
                            View Recording
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="announcements" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Course Announcements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-end mb-4">
                <Button 
                  onClick={() => setShowAnnouncementDialog(true)}
                  className="bg-empower-terracotta hover:bg-empower-terracotta/90"
                >
                  <Plus size={16} className="mr-2" />
                  New Announcement
                </Button>
              </div>
              
              <div className="space-y-4">
                {announcements.map((announcement) => (
                  <Card key={announcement.id} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-lg">{announcement.title}</h3>
                          <div className="flex items-center mt-1">
                            <Badge variant="outline" className="mr-2">
                              {announcement.course}
                            </Badge>
                            <span className="text-sm text-gray-500">{announcement.date}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 text-sm border-l-2 border-gray-200 pl-4">
                        {announcement.content}
                      </div>
                      
                      <div className="mt-4 flex justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Student Dialog */}
      <Dialog open={showAddStudentDialog} onOpenChange={setShowAddStudentDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Student to Course</DialogTitle>
            <DialogDescription>
              Send an invitation to a student to join your course.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleAddStudent} className="space-y-4 pt-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="student-email">Student Email</Label>
                <Input id="student-email" type="email" placeholder="student@example.com" />
              </div>
              
              <div>
                <Label htmlFor="course">Select Course</Label>
                <Select>
                  <SelectTrigger id="course">
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
                <Label htmlFor="message">Personal Message (Optional)</Label>
                <Textarea 
                  id="message" 
                  placeholder="Add a personal note to your invitation"
                  className="min-h-[100px]"
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowAddStudentDialog(false)}>
                Cancel
              </Button>
              <Button type="submit">
                <Mail size={16} className="mr-2" />
                Send Invitation
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Announcement Dialog */}
      <Dialog open={showAnnouncementDialog} onOpenChange={setShowAnnouncementDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create Announcement</DialogTitle>
            <DialogDescription>
              Send an announcement to all students in your course.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSendAnnouncement} className="space-y-4 pt-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="announcement-title">Announcement Title</Label>
                <Input id="announcement-title" placeholder="e.g. New Module Released" />
              </div>
              
              <div>
                <Label htmlFor="announcement-course">Course</Label>
                <Select>
                  <SelectTrigger id="announcement-course">
                    <SelectValue placeholder="Select a course" />
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
              
              <div>
                <Label htmlFor="announcement-content">Announcement Content</Label>
                <Textarea 
                  id="announcement-content" 
                  placeholder="Type your announcement message here"
                  className="min-h-[120px]"
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowAnnouncementDialog(false)}>
                Cancel
              </Button>
              <Button type="submit">
                <MessageSquare size={16} className="mr-2" />
                Send Announcement
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Live Session Dialog */}
      <Dialog open={showSessionDialog} onOpenChange={setShowSessionDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Schedule Live Session</DialogTitle>
            <DialogDescription>
              Create a new live session for your students.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleCreateSession} className="space-y-4 pt-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="session-title">Session Title</Label>
                <Input id="session-title" placeholder="e.g. Live Weaving Demonstration" />
              </div>
              
              <div>
                <Label htmlFor="session-course">Course</Label>
                <Select>
                  <SelectTrigger id="session-course">
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
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="session-date">Date</Label>
                  <Input id="session-date" type="date" />
                </div>
                <div>
                  <Label htmlFor="session-time">Time</Label>
                  <Input id="session-time" type="time" />
                </div>
              </div>
              
              <div>
                <Label htmlFor="session-platform">Platform</Label>
                <Select>
                  <SelectTrigger id="session-platform">
                    <SelectValue placeholder="Select a platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="zoom">Zoom</SelectItem>
                    <SelectItem value="meet">Google Meet</SelectItem>
                    <SelectItem value="teams">Microsoft Teams</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="session-link">Meeting Link</Label>
                <Input id="session-link" placeholder="https://" />
              </div>
              
              <div>
                <Label htmlFor="session-description">Session Description</Label>
                <Textarea 
                  id="session-description" 
                  placeholder="Provide details about what will be covered in this session"
                  className="min-h-[100px]"
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowSessionDialog(false)}>
                Cancel
              </Button>
              <Button type="submit">
                <Calendar size={16} className="mr-2" />
                Schedule Session
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InstructorClassroom;
