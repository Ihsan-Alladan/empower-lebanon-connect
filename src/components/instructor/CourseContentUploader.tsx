
import React from 'react';
import { Button } from '@/components/ui/button';
import { FormLabel } from '@/components/ui/form';
import { Upload } from 'lucide-react';

interface CourseContentUploaderProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
}

const CourseContentUploader: React.FC<CourseContentUploaderProps> = ({ files, onFilesChange }) => {
  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onFilesChange(Array.from(e.target.files));
    }
  };

  return (
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
  );
};

export default CourseContentUploader;
