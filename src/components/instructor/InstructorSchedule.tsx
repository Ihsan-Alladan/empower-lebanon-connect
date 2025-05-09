
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar as CalendarIcon, Clock, Plus, Users, Video } from 'lucide-react';

const InstructorSchedule: React.FC = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  
  const upcomingClasses = [
    {
      id: 1,
      title: "Advanced Crocheting Techniques",
      time: "10:00 AM - 11:30 AM",
      date: new Date(),
      type: "Online",
      students: 12
    },
    {
      id: 2,
      title: "Introduction to Handloom Weaving",
      time: "2:00 PM - 4:00 PM",
      date: new Date(Date.now() + 86400000), // Tomorrow
      type: "In-person",
      students: 8
    },
    {
      id: 3,
      title: "Traditional Embroidery Workshop",
      time: "11:00 AM - 1:00 PM",
      date: new Date(Date.now() + 86400000 * 7), // Next week
      type: "Hybrid",
      students: 15
    }
  ];
  
  const formatDate = (date: Date): string => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow";
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    }
  };
  
  // Filter classes for selected date
  const classesForSelectedDate = upcomingClasses.filter(cls => 
    date && cls.date.toDateString() === date.toDateString()
  );
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-empower-brown mb-6">Class Schedule</h1>
      
        <div className="flex justify-end mb-6">
          <Button className="bg-empower-terracotta hover:bg-empower-terracotta/90">
            <Plus size={16} className="mr-2" />
            Schedule New Class
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
            <CardDescription>Select a date to view scheduled classes</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              classNames={{
                day_selected: "bg-empower-terracotta text-primary-foreground hover:bg-empower-terracotta hover:text-white",
                day_today: "bg-empower-ivory text-accent-foreground",
              }}
            />
          </CardContent>
        </Card>
        
        {/* Classes for selected date */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>
              {date ? formatDate(date) : "Select a Date"}
            </CardTitle>
            <CardDescription>
              {date ? `Classes scheduled for ${date.toLocaleDateString()}` : "No date selected"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {classesForSelectedDate.length > 0 ? (
              <div className="space-y-4">
                {classesForSelectedDate.map(cls => (
                  <div key={cls.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="bg-empower-terracotta/10 p-3 rounded-full">
                        {cls.type === "Online" ? (
                          <Video className="text-empower-terracotta" size={20} />
                        ) : (
                          <Users className="text-empower-terracotta" size={20} />
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium">{cls.title}</h3>
                        <div className="mt-1 space-y-1">
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock size={14} className="mr-2" />
                            {cls.time}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Users size={14} className="mr-2" />
                            {cls.students} students enrolled
                          </div>
                          <div className="text-sm">
                            <Badge className={cls.type === "Online" ? "bg-blue-100 text-blue-800" : 
                                           cls.type === "In-person" ? "bg-green-100 text-green-800" : 
                                           "bg-purple-100 text-purple-800"}>
                              {cls.type}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button size="sm" className="bg-empower-terracotta hover:bg-empower-terracotta/90">
                        Start Class
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center">
                <CalendarIcon className="mx-auto text-gray-300 mb-3" size={48} />
                <h3 className="text-lg font-medium text-empower-brown mb-1">No Classes Scheduled</h3>
                <p className="text-gray-500 max-w-md mx-auto mb-4">
                  There are no classes scheduled for this date. Would you like to schedule a new class?
                </p>
                <Button className="bg-empower-terracotta hover:bg-empower-terracotta/90">
                  <Plus size={16} className="mr-2" />
                  Schedule Class
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Upcoming classes */}
      <Card>
        <CardHeader>
          <CardTitle>All Upcoming Classes</CardTitle>
          <CardDescription>View all of your upcoming scheduled classes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingClasses.map(cls => (
              <div key={cls.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="bg-empower-terracotta/10 p-3 rounded-full">
                    {cls.type === "Online" ? (
                      <Video className="text-empower-terracotta" size={20} />
                    ) : (
                      <Users className="text-empower-terracotta" size={20} />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium">{cls.title}</h3>
                    <div className="mt-1 space-y-1">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock size={14} className="mr-2" />
                        {cls.time}
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatDate(cls.date)}
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InstructorSchedule;
