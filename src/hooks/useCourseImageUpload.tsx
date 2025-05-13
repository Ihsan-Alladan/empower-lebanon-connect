
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '@/integrations/supabase/client';

export const useCourseImageUpload = () => {
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

  return { uploadImageToStorage };
};
