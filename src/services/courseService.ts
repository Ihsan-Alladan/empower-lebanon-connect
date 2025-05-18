
import { supabase } from '@/integrations/supabase/client';
import { Course } from '@/types/course';

// Fetch all courses
export const fetchCourses = async (): Promise<Course[]> => {
  const { data, error } = await supabase
    .from('courses')
    .select(`
      *,
      instructor_id (id, email),
      course_reviews (rating)
    `)
    .eq('is_published', true);

  if (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }

  // Transform data to match Course interface
  return data.map(course => {
    // Calculate average rating if course has reviews
    const reviews = course.course_reviews || [];
    const rating = reviews.length > 0 
      ? reviews.reduce((sum: number, review: any) => sum + review.rating, 0) / reviews.length 
      : 0;

    return {
      id: course.id,
      title: course.title,
      description: course.description,
      thumbnail: course.thumbnail || '',
      price: course.price,
      instructor: {
        id: course.instructor_id?.id || '',
        name: course.instructor_id?.email?.split('@')[0] || 'Unknown Instructor',
        avatar: ''
      },
      level: course.level,
      duration: course.duration || '0h',
      category: course.category,
      rating: Math.round(rating * 10) / 10,
      reviews: reviews.length,
      enrolled: 0, // Will be fetched separately if needed
    };
  });
};

// Fetch trending courses
export const fetchTrendingCourses = async (): Promise<Course[]> => {
  const { data, error } = await supabase
    .from('courses')
    .select(`
      *,
      instructor_id (id, email),
      course_reviews (rating)
    `)
    .eq('is_trending', true)
    .eq('is_published', true);

  if (error) {
    console.error('Error fetching trending courses:', error);
    throw error;
  }

  // Transform data to match Course interface
  return data.map(course => {
    // Calculate average rating if course has reviews
    const reviews = course.course_reviews || [];
    const rating = reviews.length > 0 
      ? reviews.reduce((sum: number, review: any) => sum + review.rating, 0) / reviews.length 
      : 0;

    return {
      id: course.id,
      title: course.title,
      description: course.description,
      thumbnail: course.thumbnail || '',
      price: course.price,
      instructor: {
        id: course.instructor_id?.id || '',
        name: course.instructor_id?.email?.split('@')[0] || 'Unknown Instructor',
        avatar: ''
      },
      level: course.level,
      duration: course.duration || '0h',
      category: course.category,
      rating: Math.round(rating * 10) / 10,
      reviews: reviews.length,
      enrolled: 0, // Will be fetched separately if needed
    };
  });
};

// Fetch courses by category
export const fetchCoursesByCategory = async (category: string): Promise<Course[]> => {
  const { data, error } = await supabase
    .from('courses')
    .select(`
      *,
      instructor_id (id, email),
      course_reviews (rating)
    `)
    .eq('category', category)
    .eq('is_published', true);

  if (error) {
    console.error(`Error fetching ${category} courses:`, error);
    throw error;
  }

  // Transform data to match Course interface (same logic as fetchCourses)
  return data.map(course => {
    const reviews = course.course_reviews || [];
    const rating = reviews.length > 0 
      ? reviews.reduce((sum: number, review: any) => sum + review.rating, 0) / reviews.length 
      : 0;

    return {
      id: course.id,
      title: course.title,
      description: course.description,
      thumbnail: course.thumbnail || '',
      price: course.price,
      instructor: {
        id: course.instructor_id?.id || '',
        name: course.instructor_id?.email?.split('@')[0] || 'Unknown Instructor',
        avatar: ''
      },
      level: course.level,
      duration: course.duration || '0h',
      category: course.category,
      rating: Math.round(rating * 10) / 10,
      reviews: reviews.length,
      enrolled: 0,
    };
  });
};

// Enroll in a course
export const enrollInCourse = async (courseId: string): Promise<boolean> => {
  const { error } = await supabase
    .from('course_enrollments')
    .insert([
      { course_id: courseId, user_id: supabase.auth.getUser() }
    ]);

  if (error) {
    console.error('Error enrolling in course:', error);
    throw error;
  }

  return true;
};

// Get user's enrolled courses
export const getEnrolledCourses = async (): Promise<Course[]> => {
  const { data: user } = await supabase.auth.getUser();
  
  if (!user.user) {
    throw new Error('User not authenticated');
  }

  const { data, error } = await supabase
    .from('course_enrollments')
    .select(`
      progress,
      last_accessed_at,
      courses:course_id (
        *,
        instructor_id (id, email),
        course_reviews (rating)
      )
    `)
    .eq('user_id', user.user.id);

  if (error) {
    console.error('Error fetching enrolled courses:', error);
    throw error;
  }

  return data.map(enrollment => {
    const course = enrollment.courses;
    const reviews = course.course_reviews || [];
    const rating = reviews.length > 0 
      ? reviews.reduce((sum: number, review: any) => sum + review.rating, 0) / reviews.length 
      : 0;

    return {
      id: course.id,
      title: course.title,
      description: course.description,
      thumbnail: course.thumbnail || '',
      price: course.price,
      instructor: {
        id: course.instructor_id?.id || '',
        name: course.instructor_id?.email?.split('@')[0] || 'Unknown Instructor',
        avatar: ''
      },
      level: course.level,
      duration: course.duration || '0h',
      category: course.category,
      rating: Math.round(rating * 10) / 10,
      reviews: reviews.length,
      enrolled: 0,
      progress: enrollment.progress || 0,
      lastAccessed: enrollment.last_accessed_at || new Date().toISOString(),
    };
  });
};
