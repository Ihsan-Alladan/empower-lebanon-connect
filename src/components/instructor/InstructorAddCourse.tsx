
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
import { Upload, ImagePlus, Save, Eye } from 'lucide-react';

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
});

const InstructorAddCourse: React.FC = () => {
  const navigate = useNavigate();
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof courseFormSchema>>({
    resolver: zodResolver(courseFormSchema),
    defaultValues: {
      title: '',
      description: '',
      category: '',
      level: 'beginner',
      instructorBio: '',
      price: '',
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

  const onSubmit = async (values: z.infer<typeof courseFormSchema>) => {
    setIsSubmitting(true);
    try {
      // In a real application, we would submit the form data to an API
      console.log('Form values:', values);
      console.log('Cover image:', coverImage);
      console.log('Files:', files);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
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
