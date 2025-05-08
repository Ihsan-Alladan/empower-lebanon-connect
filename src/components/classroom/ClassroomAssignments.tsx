
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Upload, 
  ClipboardList, 
  Clock, 
  Calendar,
  CheckCircle,
  AlertCircle,
  FileText,
  Award,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Progress } from '@/components/ui/progress';

// Mock assignments data
const mockAssignments = [
  {
    id: 'a1',
    title: 'Digital Marketing Audit',
    dueDate: '2025-05-10T23:59:00',
    timeRemaining: 'Completed',
    maxPoints: 100,
    earned: 95,
    status: 'completed',
    description: 'Conduct a comprehensive audit of a website\'s digital marketing strategy including SEO, content, and social media presence.',
    feedback: 'Excellent analysis of the website\'s SEO strategy. Your recommendations were well-researched and practical.'
  },
  {
    id: 'a2',
    title: 'Social Media Analysis Report',
    dueDate: '2025-05-20T23:59:00',
    timeRemaining: '3 days',
    maxPoints: 50,
    status: 'in-progress',
    progress: 65,
    description: 'Analyze a brand\'s social media presence across platforms and provide recommendations for improvement.'
  },
  {
    id: 'a3',
    title: 'Content Marketing Plan',
    dueDate: '2025-06-05T23:59:00',
    timeRemaining: '2 weeks',
    maxPoints: 100,
    status: 'upcoming',
    description: 'Develop a comprehensive content marketing strategy for a company of your choice.'
  }
];

const ClassroomAssignments = () => {
  const [activeAssignment, setActiveAssignment] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    // Process files
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      toast.success(`File "${e.dataTransfer.files[0].name}" would be uploaded here!`);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      toast.success(`File "${e.target.files[0].name}" would be uploaded here!`);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {mockAssignments.map((assignment) => (
        <motion.div
          key={assignment.id}
          variants={itemVariants}
          className="border rounded-lg overflow-hidden"
        >
          <Card className="h-full">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <CardTitle className="text-xl">{assignment.title}</CardTitle>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                  </div>
                </div>
                <Badge className={
                  assignment.status === 'completed' ? 'bg-green-500' :
                  assignment.status === 'in-progress' ? 'bg-blue-500' :
                  'bg-gray-500'
                }>
                  {assignment.status === 'completed' ? 'Completed' :
                   assignment.status === 'in-progress' ? 'In Progress' :
                   'Upcoming'}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="py-2">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  {assignment.status === 'completed' ? (
                    <>
                      <Award className="h-5 w-5 text-yellow-500 mr-2" />
                      <span className="font-medium">{assignment.earned}/{assignment.maxPoints} points</span>
                    </>
                  ) : (
                    <>
                      <ClipboardList className="h-5 w-5 text-empower-terracotta mr-2" />
                      <span className="font-medium">{assignment.maxPoints} points possible</span>
                    </>
                  )}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{assignment.timeRemaining}</span>
                </div>
              </div>
              
              {assignment.status === 'in-progress' && (
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{assignment.progress}%</span>
                  </div>
                  <Progress value={assignment.progress} className="h-2" />
                </div>
              )}
              
              <p className="text-sm text-gray-600">{assignment.description}</p>
              
              {assignment.status === 'completed' && assignment.feedback && (
                <div className="mt-4 bg-green-50 border border-green-100 rounded-lg p-3">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-green-800">Instructor Feedback</h4>
                      <p className="text-sm text-green-700">{assignment.feedback}</p>
                    </div>
                  </div>
                </div>
              )}
              
              {assignment.status === 'in-progress' && activeAssignment === assignment.id && (
                <div className="mt-4">
                  <div 
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
                      dragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300'
                    }`}
                  >
                    <div className="flex flex-col items-center">
                      <Upload className={`h-10 w-10 mb-3 ${dragActive ? 'text-blue-500' : 'text-gray-400'}`} />
                      <h3 className="font-medium mb-1">Drop files here or click to upload</h3>
                      <p className="text-sm text-gray-500 mb-4">Support for PDF, DOC, DOCX, or ZIP (max 10MB)</p>
                      <Button 
                        variant="outline" 
                        onClick={() => document.getElementById('file-upload')?.click()}
                        className="relative"
                      >
                        Select File
                        <input 
                          id="file-upload" 
                          type="file" 
                          className="hidden" 
                          onChange={handleFileChange}
                        />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            
            <CardFooter className="pt-2 flex justify-between">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <FileText className="h-4 w-4" />
                <span>Instructions</span>
              </Button>
              
              {assignment.status === 'completed' ? (
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <ExternalLink className="h-4 w-4" />
                  <span>View Submission</span>
                </Button>
              ) : assignment.status === 'in-progress' ? (
                <Button 
                  className="bg-empower-terracotta hover:bg-empower-terracotta/90"
                  size="sm"
                  onClick={() => setActiveAssignment(activeAssignment === assignment.id ? null : assignment.id)}
                >
                  {activeAssignment === assignment.id ? 'Cancel Upload' : 'Submit Assignment'}
                </Button>
              ) : (
                <Button variant="outline" size="sm" disabled>
                  Not Available Yet
                </Button>
              )}
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ClassroomAssignments;
