
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, FileText } from 'lucide-react';

const ContentManagement: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-empower-brown">Content Management</h1>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BookOpen className="mr-2 text-empower-terracotta" size={20} />
            Courses & Workshops
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>This section will allow you to manage all courses and workshops, categorized into Handmade and Technology.</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="mr-2 text-empower-terracotta" size={20} />
            Content Approval Queue
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Review and approve or reject course and workshop submissions from instructors.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentManagement;
