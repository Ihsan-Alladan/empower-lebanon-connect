
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MessageSquare, Search, Send, User } from 'lucide-react';

const InstructorMessages: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-empower-brown mb-6">Messages</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact List */}
        <Card className="h-[600px] flex flex-col">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Conversations</CardTitle>
          </CardHeader>
          <div className="p-4 border-b">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <Input placeholder="Search messages..." className="pl-9" />
              </div>
              <Select>
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="unread">Unread</SelectItem>
                  <SelectItem value="students">Students</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {[
              { id: 1, name: "Emma Johnson", message: "Hi! I had a question about the embroidery techniques...", time: "10:45 AM", unread: true },
              { id: 2, name: "Michael Smith", message: "Thank you for the feedback on my project!", time: "Yesterday", unread: false },
              { id: 3, name: "Sarah Wilson", message: "Will there be another session for the advanced weaving class?", time: "Yesterday", unread: false },
              { id: 4, name: "Admin", message: "Your new course has been approved and is now live!", time: "Sep 7", unread: false },
              { id: 5, name: "David Brown", message: "I'm having trouble accessing the course materials...", time: "Sep 5", unread: false },
            ].map((contact) => (
              <div key={contact.id} className={`flex items-start gap-3 p-4 cursor-pointer transition-colors ${contact.id === 1 ? 'bg-slate-100' : 'hover:bg-slate-50'} ${contact.unread ? 'border-l-2 border-empower-terracotta' : ''}`}>
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <User size={20} className="text-gray-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div className={`font-medium ${contact.unread ? 'text-empower-brown' : ''}`}>
                      {contact.name}
                    </div>
                    <div className="text-xs text-gray-500">{contact.time}</div>
                  </div>
                  <div className="text-sm text-gray-500 truncate">
                    {contact.message}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
        
        {/* Message View */}
        <Card className="lg:col-span-2 h-[600px] flex flex-col">
          <CardHeader className="pb-4 border-b">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <User size={20} className="text-gray-500" />
              </div>
              <div>
                <CardTitle className="text-lg">Emma Johnson</CardTitle>
                <div className="text-xs text-gray-500">
                  Last active: 5 minutes ago
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              <div className="flex flex-col items-start gap-2">
                <div className="bg-slate-100 rounded-lg p-3 max-w-[80%]">
                  <div className="text-sm">
                    Hi! I had a question about the embroidery techniques you taught in the last class. 
                    Could you explain the French knot technique again?
                  </div>
                  <div className="text-xs text-gray-500 mt-1">10:30 AM</div>
                </div>
              </div>
              
              <div className="flex flex-col items-end gap-2">
                <div className="bg-empower-terracotta/10 text-empower-brown rounded-lg p-3 max-w-[80%]">
                  <div className="text-sm">
                    Of course! The French knot technique is a bit tricky but very versatile. 
                    Let me explain the steps:
                  </div>
                  <div className="text-xs text-gray-500 mt-1">10:35 AM</div>
                </div>
                
                <div className="bg-empower-terracotta/10 text-empower-brown rounded-lg p-3 max-w-[80%]">
                  <div className="text-sm">
                    1. Bring your needle up through the fabric where you want the knot<br />
                    2. Hold the thread taut with your non-dominant hand<br />
                    3. Wrap the thread around the needle 2-3 times<br />
                    4. Insert the needle back into the fabric close to where it came up<br />
                    5. Pull the thread through while keeping tension
                  </div>
                  <div className="text-xs text-gray-500 mt-1">10:36 AM</div>
                </div>
                
                <div className="bg-empower-terracotta/10 text-empower-brown rounded-lg p-3 max-w-[80%]">
                  <div className="text-sm">
                    I'll also send you the video demonstration we recorded in class.
                  </div>
                  <div className="text-xs text-gray-500 mt-1">10:37 AM</div>
                </div>
              </div>
              
              <div className="flex flex-col items-start gap-2">
                <div className="bg-slate-100 rounded-lg p-3 max-w-[80%]">
                  <div className="text-sm">
                    Thank you so much! That's really helpful. I'll try practicing with these steps.
                  </div>
                  <div className="text-xs text-gray-500 mt-1">10:42 AM</div>
                </div>
                
                <div className="bg-slate-100 rounded-lg p-3 max-w-[80%]">
                  <div className="text-sm">
                    Would it be possible to schedule a quick session to show me in person?
                  </div>
                  <div className="text-xs text-gray-500 mt-1">10:45 AM</div>
                </div>
              </div>
            </div>
          </CardContent>
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input placeholder="Type a message..." className="flex-1" />
              <Button className="bg-empower-terracotta hover:bg-empower-terracotta/90">
                <Send size={16} />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default InstructorMessages;
