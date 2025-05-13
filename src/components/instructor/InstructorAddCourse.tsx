
import React, { useState, useEffect } from 'react';
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
import { Upload, ImagePlus, Save, Eye } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';

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
  const [instructors, setInstructors] = useState<{ id: string; name: string }[]>([]);
  const [selectedInstructorId, setSelectedInstructorId] = useState<string>('');
  
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const uploadImageToStorage = async (imageFile: File): Promise<string> => {
    try {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `course-thumbnails/${fileName}`;
      
      // Upload file to Supabase Storage
      const { data, error } = await supabase.storage
        .from('course-media')
        .upload(filePath, imageFile);
      
      if (error) throw error;
      
      // Get public URL
      const { data: urlData } = supabase.storage
        .from('course-media')
        .getPublicUrl(filePath);
      
      return urlData.publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

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
              <div className="mb-6">
                <FormLabel>Course Cover Image</FormLabel>
                <div className="mt-2 flex flex-col items-center">
                  {coverImage ? (
                    <div className="w-full aspect-video rounded-md overflow-hidden mb-4">
                      <img 
                        src={coverImage} 
                        alt="Course cover" 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                  ) : (
                    <div className="w-full aspect-video bg-slate-100 rounded-md flex items-center justify-center mb-4">
                      <ImagePlus size={48} className="text-slate-400" />
                    </div>
                  )}
                  <Button type="button" variant="outline" asChild>
                    <label className="cursor-pointer flex items-center">
                      <Upload size={16} className="mr-2" />
                      {coverImage ? 'Change Image' : 'Upload Image'}
                      <input
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={handleImageChange}
                      />
                    </label>
                  </Button>
                </div>
              </div>

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
              <div>
                <FormLabel>Instructor</FormLabel>
                <Select 
                  onValueChange={setSelectedInstructorId}
                  defaultValue={selectedInstructorId}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an instructor" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {instructors.map(instructor => (
                      <SelectItem key={instructor.id} value={instructor.id}>
                        {instructor.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

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
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <div className="flex space-x-4">
                        <Select 
                          onValueChange={(value) => {
                            if (value === 'free') {
                              field.onChange('free');
                            } else if (value === 'paid') {
                              field.onChange('');
                            }
                          }}
                          defaultValue={field.value === 'free' ? 'free' : 'paid'}
                        >
                          <SelectTrigger className="w-[100px]">
                            <SelectValue placeholder="Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="free">Free</SelectItem>
                            <SelectItem value="paid">Paid</SelectItem>
                          </SelectContent>
                        </Select>
                        
                        {field.value !== 'free' && (
                          <div className="relative flex-1">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2">$</span>
                            <Input 
                              type="number" 
                              className="pl-7" 
                              placeholder="29.99" 
                              min="0" 
                              step="0.01"
                              value={field.value === 'free' ? '' : field.value}
                              onChange={(e) => field.onChange(e.target.value)}
                            />
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
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
              <div>
                <FormLabel>Course Content (PDFs, Videos, etc.)</FormLabel>
                <div className="mt-2">
                  <Button type="button" variant="outline" asChild className="w-full h-24 border-dashed">
                    <label className="cursor-pointer flex flex-col items-center justify-center h-full">
                      <Upload size={24} className="mb-2 text-slate-400" />
                      <span className="text-sm text-slate-600">
                        {files.length > 0
                          ? `${files.length} file(s) selected`
                          : 'Upload course materials'
                        }
                      </span>
                      <input
                        type="file"
                        className="sr-only"
                        multiple
                        onChange={handleFilesChange}
                      />
                    </label>
                  </Button>
                  {files.length > 0 && (
                    <div className="mt-2">
                      <ul className="text-sm text-slate-600">
                        {files.slice(0, 3).map((file, i) => (
                          <li key={i}>{file.name}</li>
                        ))}
                        {files.length > 3 && (
                          <li>...and {files.length - 3} more</li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
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
