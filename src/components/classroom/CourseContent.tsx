
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Book, 
  Video, 
  FileText, 
  Image as ImageIcon, 
  ChevronDown, 
  ChevronUp,
  Play,
  Download,
  ExternalLink,
  CheckCircle
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

// Mock module data
const mockModules = [
  {
    id: 'm1',
    title: 'Module 1: Introduction to Digital Marketing',
    progress: 100,
    completed: true,
    items: [
      { 
        id: 'l1', 
        type: 'video', 
        title: 'What is Digital Marketing?', 
        duration: '15:30',
        completed: true,
        thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      },
      { 
        id: 'l2', 
        type: 'reading', 
        title: 'The Digital Marketing Landscape', 
        duration: '10 min read',
        completed: true
      },
      { 
        id: 'l3', 
        type: 'quiz', 
        title: 'Digital Marketing Fundamentals Quiz', 
        duration: '10 questions',
        completed: true
      }
    ]
  },
  {
    id: 'm2',
    title: 'Module 2: Search Engine Optimization',
    progress: 50,
    completed: false,
    items: [
      { 
        id: 'l4', 
        type: 'video', 
        title: 'SEO Basics', 
        duration: '22:15',
        completed: true,
        thumbnail: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      },
      { 
        id: 'l5', 
        type: 'reading', 
        title: 'Keyword Research and Strategy', 
        duration: '15 min read',
        completed: true
      },
      { 
        id: 'l6', 
        type: 'video', 
        title: 'On-Page SEO Techniques', 
        duration: '18:45',
        completed: false,
        thumbnail: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      },
      { 
        id: 'l7', 
        type: 'assignment', 
        title: 'SEO Site Analysis', 
        duration: 'Due May 20',
        completed: false
      }
    ]
  },
  {
    id: 'm3',
    title: 'Module 3: Social Media Marketing',
    progress: 0,
    completed: false,
    locked: true,
    items: [
      { 
        id: 'l8', 
        type: 'video', 
        title: 'Social Media Platforms Overview', 
        duration: '20:10',
        completed: false,
        locked: true,
        thumbnail: 'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      },
      { 
        id: 'l9', 
        type: 'reading', 
        title: 'Creating Engaging Social Content', 
        duration: '12 min read',
        completed: false,
        locked: true
      },
      { 
        id: 'l10', 
        type: 'assignment', 
        title: 'Social Media Campaign Design', 
        duration: 'Due June 5',
        completed: false,
        locked: true
      }
    ]
  }
];

const CourseContent = () => {
  const [expandedModules, setExpandedModules] = useState<{ [key: string]: boolean }>({
    'm1': true,
    'm2': false,
    'm3': false
  });
  
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };

  const handleItemClick = (itemId: string, locked: boolean = false) => {
    if (locked) return;
    setActiveItem(itemId === activeItem ? null : itemId);
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

  const getItemIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'reading':
        return <FileText className="h-4 w-4" />;
      case 'quiz':
        return <FileText className="h-4 w-4" />;
      case 'assignment':
        return <FileText className="h-4 w-4" />;
      default:
        return <Book className="h-4 w-4" />;
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Overall Progress */}
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Course Progress</h3>
            <Badge variant="outline" className="bg-green-50">45% Complete</Badge>
          </div>
          <Progress value={45} className="h-2" />
        </CardContent>
      </Card>

      {/* Course Modules */}
      <div className="space-y-4">
        {mockModules.map((module) => (
          <motion.div 
            key={module.id} 
            variants={itemVariants}
            className={`border rounded-lg overflow-hidden ${module.locked ? 'opacity-75' : ''}`}
          >
            <div 
              className={`flex justify-between items-center p-4 cursor-pointer ${module.completed ? 'bg-green-50 border-green-100' : module.locked ? 'bg-gray-50' : 'bg-empower-ivory'}`}
              onClick={() => !module.locked && toggleModule(module.id)}
            >
              <div className="flex items-center">
                {module.completed ? (
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                ) : (
                  <Book className="h-5 w-5 text-empower-terracotta mr-3" />
                )}
                <div>
                  <h3 className="font-medium">{module.title}</h3>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <span>{module.items.length} items</span>
                    <span className="mx-2">•</span>
                    <span>{module.progress}% complete</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                {module.locked && (
                  <Badge variant="outline" className="mr-3">Locked</Badge>
                )}
                {expandedModules[module.id] ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </div>
            </div>
            
            {expandedModules[module.id] && (
              <div className="divide-y">
                {module.items.map((item) => (
                  <div 
                    key={item.id} 
                    className={`${item.locked ? 'opacity-75' : ''} ${item.completed ? 'bg-green-50' : ''}`}
                  >
                    <div 
                      className={`flex justify-between items-center p-4 hover:bg-gray-50 cursor-pointer ${activeItem === item.id ? 'bg-gray-50' : ''}`}
                      onClick={() => handleItemClick(item.id, item.locked)}
                    >
                      <div className="flex items-center">
                        <div className={`rounded-full p-2 mr-3 ${
                          item.completed ? 'bg-green-100 text-green-600' : 
                          item.locked ? 'bg-gray-100 text-gray-400' : 
                          item.type === 'video' ? 'bg-blue-100 text-blue-600' : 
                          item.type === 'reading' ? 'bg-purple-100 text-purple-600' : 
                          item.type === 'quiz' ? 'bg-amber-100 text-amber-600' : 
                          'bg-empower-terracotta/20 text-empower-terracotta'
                        }`}>
                          {getItemIcon(item.type)}
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">{item.title}</h4>
                          <div className="flex items-center text-xs text-gray-500 mt-1">
                            <span className="capitalize">{item.type}</span>
                            <span className="mx-2">•</span>
                            <span>{item.duration}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        {item.completed ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : item.locked ? (
                          <Badge variant="outline">Locked</Badge>
                        ) : (
                          <Badge className={
                            item.type === 'video' ? 'bg-blue-500' : 
                            item.type === 'reading' ? 'bg-purple-500' : 
                            item.type === 'quiz' ? 'bg-amber-500' : 
                            'bg-empower-terracotta'
                          }>
                            Start
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    {/* Expanded Item Content (for videos) */}
                    {activeItem === item.id && item.type === 'video' && (
                      <div className="p-4 bg-gray-50 border-t">
                        <div className="aspect-video relative rounded-lg overflow-hidden mb-3">
                          <img 
                            src={item.thumbnail} 
                            alt={item.title} 
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <Button size="sm" className="rounded-full bg-white text-black hover:bg-white/90 flex items-center gap-2">
                              <Play className="h-4 w-4" fill="currentColor" />
                              <span>Play Video</span>
                            </Button>
                          </div>
                        </div>
                        <div className="flex justify-between mt-2">
                          <Button variant="outline" size="sm" className="flex items-center gap-1">
                            <Download className="h-3 w-3" />
                            <span>Download</span>
                          </Button>
                          <Button variant="outline" size="sm" className="flex items-center gap-1">
                            <ExternalLink className="h-3 w-3" />
                            <span>Resources</span>
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default CourseContent;
