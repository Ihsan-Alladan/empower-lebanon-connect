
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Search, Filter, Heart, MessageCircle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';

// Mock discussion data
const mockDiscussions = [
  {
    id: 'd1',
    author: {
      name: 'Elena Martinez',
      avatar: 'https://i.pravatar.cc/150?img=1',
      role: 'student'
    },
    title: 'Question about SEO techniques',
    content: 'I\'m struggling to understand the difference between on-page and off-page SEO techniques. Can someone explain with examples?',
    createdAt: '2 days ago',
    likes: 5,
    replies: 3,
    tags: ['SEO', 'Module 2']
  },
  {
    id: 'd2',
    author: {
      name: 'Jane Smith',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      role: 'instructor'
    },
    title: 'Reminder for Assignment 2',
    content: 'Just a reminder that Assignment 2 is due next week. Please make sure to follow the rubric and submit through the assignment portal.',
    createdAt: '1 day ago',
    likes: 8,
    replies: 2,
    tags: ['Announcement', 'Assignment']
  },
  {
    id: 'd3',
    author: {
      name: 'Marcus Johnson',
      avatar: 'https://i.pravatar.cc/150?img=3',
      role: 'student'
    },
    title: 'Resources for social media project',
    content: 'Has anyone found good resources for analyzing social media campaigns? I\'m looking for tools that can help with the upcoming project.',
    createdAt: '5 hours ago',
    likes: 2,
    replies: 4,
    tags: ['Resources', 'Social Media']
  }
];

// Mock selected discussion replies
const mockReplies = [
  {
    id: 'r1',
    author: {
      name: 'Jane Smith',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      role: 'instructor'
    },
    content: 'Great question! On-page SEO refers to optimizations you make directly on your website (like meta tags, content quality, headings). Off-page SEO involves external factors like backlinks from other websites.',
    createdAt: '1 day ago',
    likes: 3
  },
  {
    id: 'r2',
    author: {
      name: 'David Wilson',
      avatar: 'https://i.pravatar.cc/150?img=4',
      role: 'student'
    },
    content: 'I found this helpful resource on the difference: [link]. It has some good examples of both types of SEO techniques.',
    createdAt: '1 day ago',
    likes: 2
  },
  {
    id: 'r3',
    author: {
      name: 'Sophia Chen',
      avatar: 'https://i.pravatar.cc/150?img=5',
      role: 'student'
    },
    content: 'I was confused about this too! The way I understand it, on-page is what you control on your own site, off-page is about building reputation and references elsewhere on the internet.',
    createdAt: '12 hours ago',
    likes: 1
  }
];

const ClassroomDiscussions = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDiscussion, setSelectedDiscussion] = useState<string | null>(null);
  const [newReply, setNewReply] = useState('');
  
  const handleDiscussionClick = (id: string) => {
    setSelectedDiscussion(id === selectedDiscussion ? null : id);
  };
  
  const handlePostReply = () => {
    if (!newReply.trim()) return;
    toast.success('Reply posted successfully!');
    setNewReply('');
  };
  
  const handleLike = (id: string) => {
    toast.success('Post liked!');
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
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            className="pl-10"
            placeholder="Search discussions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
          <Button className="bg-empower-terracotta hover:bg-empower-terracotta/90">
            New Discussion
          </Button>
        </div>
      </div>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        {mockDiscussions.map((discussion) => (
          <motion.div
            key={discussion.id}
            variants={itemVariants}
            className="border rounded-lg overflow-hidden"
          >
            <Card className="h-full">
              <CardContent className="p-4">
                <div className="flex justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={discussion.author.avatar} />
                      <AvatarFallback>
                        {discussion.author.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{discussion.author.name}</span>
                        <Badge variant="outline" className={
                          discussion.author.role === 'instructor' ? 'bg-blue-50 text-blue-700' : 'bg-gray-50'
                        }>
                          {discussion.author.role}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500">{discussion.createdAt}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-3">
                  <h3 className="font-medium">{discussion.title}</h3>
                  <p className="text-sm text-gray-600 mt-2">{discussion.content}</p>
                  
                  <div className="flex flex-wrap gap-2 mt-3">
                    {discussion.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-gray-100">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="border-t p-3 flex justify-between">
                <div className="flex space-x-4">
                  <button 
                    className="flex items-center space-x-1 text-gray-500 hover:text-empower-terracotta"
                    onClick={() => handleLike(discussion.id)}
                  >
                    <Heart className="h-4 w-4" />
                    <span className="text-xs">{discussion.likes}</span>
                  </button>
                  <button 
                    className="flex items-center space-x-1 text-gray-500 hover:text-empower-terracotta"
                    onClick={() => handleDiscussionClick(discussion.id)}
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span className="text-xs">{discussion.replies}</span>
                  </button>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-empower-terracotta"
                  onClick={() => handleDiscussionClick(discussion.id)}
                >
                  {selectedDiscussion === discussion.id ? 'Hide Replies' : 'Show Replies'}
                </Button>
              </CardFooter>
              
              {/* Replies Section */}
              {selectedDiscussion === discussion.id && (
                <div className="border-t bg-gray-50 p-4">
                  <div className="space-y-4 mb-4">
                    {mockReplies.map((reply) => (
                      <div key={reply.id} className="bg-white rounded-lg p-3 border">
                        <div className="flex items-start space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={reply.author.avatar} />
                            <AvatarFallback>{reply.author.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium">{reply.author.name}</span>
                              {reply.author.role === 'instructor' && (
                                <Badge variant="outline" className="bg-blue-50 text-blue-700 text-xs">
                                  instructor
                                </Badge>
                              )}
                              <span className="text-xs text-gray-500">{reply.createdAt}</span>
                            </div>
                            <p className="text-sm mt-1">{reply.content}</p>
                            <button 
                              className="flex items-center space-x-1 text-gray-500 hover:text-empower-terracotta mt-2"
                              onClick={() => handleLike(reply.id)}
                            >
                              <Heart className="h-3 w-3" />
                              <span className="text-xs">{reply.likes}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Reply Input */}
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://i.pravatar.cc/150?img=8" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 relative">
                      <Input 
                        placeholder="Write a reply..." 
                        value={newReply}
                        onChange={(e) => setNewReply(e.target.value)}
                        className="pr-10"
                      />
                      <button 
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-empower-terracotta hover:text-empower-terracotta/80"
                        onClick={handlePostReply}
                      >
                        <Send className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ClassroomDiscussions;
