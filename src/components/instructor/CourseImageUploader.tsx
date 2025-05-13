
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FormLabel } from '@/components/ui/form';
import { Upload, ImagePlus } from 'lucide-react';

interface CourseImageUploaderProps {
  onImageChange: (image: string | null) => void;
  coverImage: string | null;
}

const CourseImageUploader: React.FC<CourseImageUploaderProps> = ({ onImageChange, coverImage }) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
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
  );
};

export default CourseImageUploader;
