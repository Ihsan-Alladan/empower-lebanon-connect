
import React, { useState, useEffect } from 'react';
import { FormLabel } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';

interface InstructorSelectorProps {
  selectedInstructorId: string;
  onInstructorSelect: (id: string) => void;
}

interface Instructor {
  id: string;
  name: string;
}

const InstructorSelector: React.FC<InstructorSelectorProps> = ({ 
  selectedInstructorId, 
  onInstructorSelect 
}) => {
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  
  useEffect(() => {
    // Fetch instructors from database
    const fetchInstructors = async () => {
      try {
        // Fetch instructors with an instructor role
        const { data, error } = await supabase
          .from('user_roles')
          .select('user_id, role')
          .eq('role', 'instructor');
        
        if (error) throw error;
        
        // If we have instructor users, fetch their profile information
        if (data && data.length > 0) {
          const instructorIds = data.map(item => item.user_id);
          
          // Fetch profiles for these instructors
          const { data: profilesData, error: profilesError } = await supabase
            .from('profiles')
            .select('id, first_name, last_name')
            .in('id', instructorIds);
          
          if (profilesError) throw profilesError;
          
          const formattedInstructors = profilesData.map(profile => ({
            id: profile.id,
            name: `${profile.first_name || ''} ${profile.last_name || ''}`.trim() || 'Unnamed Instructor'
          }));
          
          setInstructors(formattedInstructors);
        } else {
          // Fallback to sample data if no instructors are found
          setInstructors([
            { id: '1', name: 'Jane Smith' },
            { id: '2', name: 'John Doe' },
            { id: '3', name: 'Emily Johnson' },
            { id: '4', name: 'Michael Wilson' },
          ]);
        }
      } catch (error) {
        console.error('Error fetching instructors:', error);
        // Fallback to sample data if there's an error
        setInstructors([
          { id: '1', name: 'Jane Smith' },
          { id: '2', name: 'John Doe' },
          { id: '3', name: 'Emily Johnson' },
          { id: '4', name: 'Michael Wilson' },
        ]);
      }
    };
    
    fetchInstructors();
  }, []);

  return (
    <div>
      <FormLabel>Instructor</FormLabel>
      <Select 
        onValueChange={onInstructorSelect}
        defaultValue={selectedInstructorId}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select an instructor" />
        </SelectTrigger>
        <SelectContent>
          {instructors.map(instructor => (
            <SelectItem key={instructor.id} value={instructor.id}>
              {instructor.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default InstructorSelector;
