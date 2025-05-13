
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from '@/components/ui/sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Save, Eye } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

// Import refactored components
import CourseImageUploader from './CourseImageUploader';
import CourseContentUploader from './CourseContentUploader';
import InstructorSelector from './InstructorSelector';
import CoursePriceInput from './CoursePriceInput';
import { useCourseImageUpload } from '@/hooks/useCourseImageUpload';

const courseFormSchema = z.object({
  title: z.string().min(5, {
    message: 'Title must be at least 5 characters.',
  }),
  description: z.string().min(20, {
    message: 'Description must be at least 20 characters.',
  }),
  category: z.string({
    required_error: 'Please select a category.',
  }),
  level: z.string({
    required_error: 'Please select a level.',
  }),
  instructorBio: z.string().min(10, {
    message: 'Instructor bio must be at least 10 characters.',
  }),
  price: z.string().refine(
    (val) => {
      if (val === 'free') return true;
      const num = parseFloat(val);
      return !isNaN(num) && num >= 0;
    },
    {
      message: 'Price must be "free" or a valid number.',
    }
  ),
  seqNb: z.string().optional(),
  capacity: z.string().optional(),
});

const InstructorAddCourse: React.FC = () => {
  const navigate = useNavigate();
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedInstructorId, setSelectedInstructorId] = useState<string>('');
  const { uploadImageToStorage } = useCourseImageUpload();
  
  const form = useForm<z.infer<typeof courseFormSchema>>({
    resolver: zodResolver(courseFormSchema),
    defaultValues: {
      title: '',
      description: '',
      category: '',
      level: 'beginner',
      instructorBio: '',
      price: '',
      seqNb: '',
      capacity: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof courseFormSchema>) => {
    if (!selectedInstructorId) {
      toast.error('Please select an instructor');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Extract base64 data and convert to a file object for storage upload
      let thumbnailUrl = null;
      if (coverImage && coverImage.startsWith('data:')) {
        // Convert base64 to file
        const res = await fetch(coverImage);
        const blob = await res.blob();
        const imageFile = new File([blob], "course-thumbnail.jpg", { type: "image/jpeg" });
        
        // Upload to storage
        thumbnailUrl = await uploadImageToStorage(imageFile);
      }
      
      // Calculate price based on input
      const priceValue = values.price === 'free' ? 0 : parseFloat(values.price);
      
      // Prepare course data
      const courseData = {
        title: values.title,
        description: values.description,
        category: values.category,
        level: values.level,
        price: priceValue,
        instructor_id: selectedInstructorId,
        thumbnail: thumbnailUrl,
        sequence_number: values.seqNb ? parseInt(values.seqNb) : null,
        capacity: values.capacity ? parseInt(values.capacity) : 30,
        is_published: false,  // Set to draft by default
      };
      
      // Insert into courses table
      const { data, error } = await supabase
        .from('courses')
        .insert(courseData)
        .select();
      
      if (error) throw error;
      
      toast.success('Course created successfully!', {
        description: 'Your course has been created and is now ready for review.',
      });
      
      navigate('/instructor-dashboard/courses');
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to create course', {
        description: 'There was an error creating your course. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePreview = () => {
    toast.info('Preview functionality', {
      description: 'This would show a preview of how the course will look to students.',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-empower-brown">Create New Course</h1>
        <div className="flex space-x-2">
          <Button type="button" variant="outline" onClick={handlePreview}>
            <Eye size={16} className="mr-2" />
            Preview
          </Button>
        </div>
      </div>

      <Card>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle>Course Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Course Cover Image */}
              <CourseImageUploader 
                coverImage={coverImage} 
                onImageChange={setCoverImage} 
              />

              {/* Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Introduction to Traditional Weaving" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Provide a detailed description of your course" 
                        className="min-h-[120px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Category & Level */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="handmade">Handmade Crafts</SelectItem>
                          <SelectItem value="digital">Digital Skills</SelectItem>
                          <SelectItem value="business">Business</SelectItem>
                          <SelectItem value="pottery">Pottery</SelectItem>
                          <SelectItem value="textiles">Textiles</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="level"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Level</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Instructor Selection */}
              <InstructorSelector 
                selectedInstructorId={selectedInstructorId}
                onInstructorSelect={setSelectedInstructorId}
              />

              {/* Instructor Bio */}
              <FormField
                control={form.control}
                name="instructorBio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Instructor Bio</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Share your expertise and background" 
                        className="min-h-[80px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Price */}
              <CoursePriceInput control={form.control} />
              
              {/* Sequence Number & Capacity */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="seqNb"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sequence Number</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="1" min="0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="capacity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Capacity</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="30" min="1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Course Content Files */}
              <CourseContentUploader 
                files={files}
                onFilesChange={setFiles}
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => navigate('/instructor-dashboard/courses')}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                <Save size={16} className="mr-2" />
                {isSubmitting ? 'Creating...' : 'Create Course'}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default InstructorAddCourse;
