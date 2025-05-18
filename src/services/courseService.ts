import { supabase } from '@/integrations/supabase/client';
import { Course, Instructor } from '@/types/course';

// Get all courses
export const getAllCourses = async (): Promise<Course[]> => {
  try {
    const { data, error } = await supabase
      .from('courses')
      .select(`
        *,
        profiles:instructor_id (
          id,
          first_name, 
          last_name, 
          avatar_url
        )
      `)
      .eq('is_published', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching courses:', error);
      return [];
    }

    const courses = data.map((course) => {
      // Create a default instructor with empty values
      let instructor: Instructor = {
        id: course.instructor_id || '',
        name: 'Instructor',
        avatar: '',
        title: 'Instructor',
        coursesCount: 0,
        studentsCount: 0,
        reviewsCount: 0
      };

      // Only try to access profile data if it exists
      if (course.profiles && typeof course.profiles === 'object') {
        const profile = course.profiles as any;
        
        if (profile) {
          const firstName = profile.first_name || '';
          const lastName = profile.last_name || '';
          const avatarUrl = profile.avatar_url || '';
          
          instructor = {
            id: profile.id || course.instructor_id || '',
            name: `${firstName} ${lastName}`.trim() || 'Instructor',
            avatar: avatarUrl,
            title: 'Instructor',
            coursesCount: 0,
            studentsCount: 0,
            reviewsCount: 0
          };
        }
      }

      return {
        id: course.id,
        title: course.title,
        description: course.description,
        thumbnail: course.thumbnail || '',
        category: course.category,
        level: course.level,
        price: course.price,
        duration: course.duration || '',
        instructor,
        rating: 0, // Will be calculated separately
        reviews: 0, // Will be counted separately
        updatedAt: course.updated_at,
        isTrending: course.is_trending
      } as Course;
    });

    return courses;
  } catch (error) {
    console.error('Error in getAllCourses:', error);
    return [];
  }
};

// Get courses by category
export const getCoursesByCategory = async (category: string): Promise<Course[]> => {
  try {
    const { data, error } = await supabase
      .from('courses')
      .select(`
        *,
        profiles:instructor_id (
          id,
          first_name, 
          last_name, 
          avatar_url
        )
      `)
      .eq('category', category)
      .eq('is_published', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error(`Error fetching courses for category ${category}:`, error);
      return [];
    }

    const courses = data.map((course) => {
      // Create a default instructor with empty values
      let instructor: Instructor = {
        id: course.instructor_id || '',
        name: 'Instructor',
        avatar: '',
        title: 'Instructor',
        coursesCount: 0,
        studentsCount: 0,
        reviewsCount: 0
      };

      // Only try to access profile data if it exists
      if (course.profiles && typeof course.profiles === 'object') {
        const profile = course.profiles as any;
        
        if (profile) {
          const firstName = profile.first_name || '';
          const lastName = profile.last_name || '';
          const avatarUrl = profile.avatar_url || '';
          
          instructor = {
            id: profile.id || course.instructor_id || '',
            name: `${firstName} ${lastName}`.trim() || 'Instructor',
            avatar: avatarUrl,
            title: 'Instructor',
            coursesCount: 0,
            studentsCount: 0,
            reviewsCount: 0
          };
        }
      }

      return {
        id: course.id,
        title: course.title,
        description: course.description,
        thumbnail: course.thumbnail || '',
        category: course.category,
        level: course.level,
        price: course.price,
        duration: course.duration || '',
        instructor,
        rating: 0, // Will be calculated separately
        reviews: 0, // Will be counted separately
        updatedAt: course.updated_at,
        isTrending: course.is_trending
      } as Course;
    });

    return courses;
  } catch (error) {
    console.error(`Error in getCoursesByCategory for ${category}:`, error);
    return [];
  }
};

// Get trending courses
export const getTrendingCourses = async (): Promise<Course[]> => {
  try {
    const { data, error } = await supabase
      .from('courses')
      .select(`
        *,
        profiles:instructor_id (
          id,
          first_name, 
          last_name, 
          avatar_url
        )
      `)
      .eq('is_trending', true)
      .eq('is_published', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching trending courses:', error);
      return [];
    }

    const courses = data.map((course) => {
      // Create a default instructor with empty values
      let instructor: Instructor = {
        id: course.instructor_id || '',
        name: 'Instructor',
        avatar: '',
        title: 'Instructor',
        coursesCount: 0,
        studentsCount: 0,
        reviewsCount: 0
      };

      // Only try to access profile data if it exists
      if (course.profiles && typeof course.profiles === 'object') {
        const profile = course.profiles as any;
        
        if (profile) {
          const firstName = profile.first_name || '';
          const lastName = profile.last_name || '';
          const avatarUrl = profile.avatar_url || '';
          
          instructor = {
            id: profile.id || course.instructor_id || '',
            name: `${firstName} ${lastName}`.trim() || 'Instructor',
            avatar: avatarUrl,
            title: 'Instructor',
            coursesCount: 0,
            studentsCount: 0,
            reviewsCount: 0
          };
        }
      }

      return {
        id: course.id,
        title: course.title,
        description: course.description,
        thumbnail: course.thumbnail || '',
        category: course.category,
        level: course.level,
        price: course.price,
        duration: course.duration || '',
        instructor,
        rating: 0, // Will be calculated separately
        reviews: 0, // Will be counted separately
        updatedAt: course.updated_at,
        isTrending: course.is_trending
      } as Course;
    });

    return courses;
  } catch (error) {
    console.error('Error in getTrendingCourses:', error);
    return [];
  }
};

// Get course details by ID
export const getCourseById = async (id: string): Promise<Course | null> => {
  try {
    const { data, error } = await supabase
      .from('courses')
      .select(`
        *,
        profiles:instructor_id (
          id,
          first_name, 
          last_name, 
          avatar_url
        ),
        course_objectives (
          objective
        ),
        course_requirements (
          requirement
        ),
        course_modules (
          id,
          title,
          duration,
          course_lessons (
            title,
            type,
            duration
          )
        ),
        course_reviews (
          rating,
          comment,
          created_at,
          profiles:user_id (
            first_name,
            last_name,
            avatar_url
          )
        )
      `)
      .eq('id', id)
      .maybeSingle();

    if (error) {
      console.error(`Error fetching course details for ID ${id}:`, error);
      return null;
    }

    if (!data) {
      console.error(`No course found for ID ${id}`);
      return null;
    }

    // Calculate average rating
    let averageRating = 0;
    let reviewsCount = 0;
    
    if (data.course_reviews && Array.isArray(data.course_reviews)) {
      reviewsCount = data.course_reviews.length;
      
      const totalRating = data.course_reviews.reduce((sum: number, review: any) => {
        return sum + (review?.rating || 0);
      }, 0);
      
      averageRating = reviewsCount > 0 ? totalRating / reviewsCount : 0;
    }

    // Create a default instructor with empty values
    let instructor: Instructor = {
      id: data.instructor_id || '',
      name: 'Instructor',
      avatar: '',
      title: 'Instructor',
      coursesCount: 0,
      studentsCount: 0,
      reviewsCount: 0
    };

    // Only try to access profile data if it exists
    if (data.profiles && typeof data.profiles === 'object') {
      const profile = data.profiles as any;
      
      if (profile) {
        const firstName = profile.first_name || '';
        const lastName = profile.last_name || '';
        const avatarUrl = profile.avatar_url || '';
        
        instructor = {
          id: profile.id || data.instructor_id || '',
          name: `${firstName} ${lastName}`.trim() || 'Instructor',
          avatar: avatarUrl,
          title: 'Instructor',
          coursesCount: 0,
          studentsCount: 0,
          reviewsCount: 0
        };
      }
    }

    // Map learning objectives
    const learningObjectives = data.course_objectives
      ? Array.isArray(data.course_objectives) ? 
        data.course_objectives.map(obj => obj.objective) : []
      : [];

    // Map requirements
    const requirements = data.course_requirements
      ? Array.isArray(data.course_requirements) ? 
        data.course_requirements.map(req => req.requirement) : []
      : [];

    // Map modules and lessons
    const modules = data.course_modules
      ? data.course_modules.map((module: any) => ({
          id: module.id,
          title: module.title,
          duration: module.duration || '',
          lessons: module.course_lessons
            ? module.course_lessons.map((lesson: any) => ({
                title: lesson.title,
                type: lesson.type,
                duration: lesson.duration || ''
              }))
            : []
        }))
      : [];

    // Calculate total lessons
    const totalLessons = modules.reduce(
      (sum: number, module: any) => sum + (module.lessons ? module.lessons.length : 0),
      0
    );

    // Map student reviews
    const studentReviews = data.course_reviews
      ? Array.isArray(data.course_reviews) ? 
        data.course_reviews.map((review: any) => {
          // Create a default review with empty values
          const reviewProfile = (review.profiles && typeof review.profiles === 'object') ? 
                               review.profiles : {};
          
          const firstName = reviewProfile.first_name || '';
          const lastName = reviewProfile.last_name || '';
          const avatarUrl = reviewProfile.avatar_url || '';
          
          return {
            name: `${firstName} ${lastName}`.trim() || 'Student',
            avatar: avatarUrl,
            rating: review.rating,
            comment: review.comment,
            date: review.created_at
          };
        })
      : []
      : [];

    return {
      id: data.id,
      title: data.title,
      description: data.description,
      thumbnail: data.thumbnail || '',
      category: data.category,
      level: data.level,
      price: data.price,
      duration: data.duration || '',
      instructor,
      rating: averageRating,
      reviews: reviewsCount,
      updatedAt: data.updated_at,
      isTrending: data.is_trending,
      learningObjectives,
      requirements,
      modules,
      totalLessons,
      studentReviews
    } as Course;
  } catch (error) {
    console.error(`Error in getCourseById for ${id}:`, error);
    return null;
  }
};

// Create a new course
export const createCourse = async (courseData: Partial<Course>, instructorId: string): Promise<string | null> => {
  try {
    const { data, error } = await supabase
      .from('courses')
      .insert([
        {
          title: courseData.title,
          description: courseData.description,
          thumbnail: courseData.thumbnail,
          price: courseData.price,
          level: courseData.level,
          category: courseData.category,
          instructor_id: instructorId,
          duration: courseData.duration,
          is_published: false,
          is_trending: false
        }
      ])
      .select();

    if (error) {
      console.error('Error creating course:', error);
      return null;
    }

    return data[0].id;
  } catch (error) {
    console.error('Error in createCourse:', error);
    return null;
  }
};

// Enroll a user in a course
export const enrollInCourse = async (userId: string, courseId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('course_enrollments')
      .insert([{
        user_id: userId,
        course_id: courseId,
      }]);

    if (error) {
      console.error('Error enrolling in course:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in enrollInCourse:', error);
    return false;
  }
};

// Get user's enrolled courses
export const getUserCourses = async (userId: string): Promise<Course[]> => {
  try {
    const { data, error } = await supabase
      .from('course_enrollments')
      .select(`
        progress,
        last_accessed_at,
        courses:course_id (
          *,
          profiles:instructor_id (
            id,
            first_name, 
            last_name, 
            avatar_url
          )
        )
      `)
      .eq('user_id', userId);

    if (error) {
      console.error(`Error fetching courses for user ${userId}:`, error);
      return [];
    }

    const courses = data
      .filter(enrollment => enrollment.courses) // Filter out any null courses
      .map((enrollment) => {
        const course = enrollment.courses;
        if (!course) return null;

        // Create a default instructor with empty values
        let instructor: Instructor = {
          id: course.instructor_id || '',
          name: 'Instructor',
          avatar: '',
          title: 'Instructor',
          coursesCount: 0,
          studentsCount: 0,
          reviewsCount: 0
        };

        // Only try to access profile data if it exists
        if (course.profiles && typeof course.profiles === 'object') {
          const profile = course.profiles as any;
          
          if (profile) {
            const firstName = profile.first_name || '';
            const lastName = profile.last_name || '';
            const avatarUrl = profile.avatar_url || '';
            
            instructor = {
              id: profile.id || course.instructor_id || '',
              name: `${firstName} ${lastName}`.trim() || 'Instructor',
              avatar: avatarUrl,
              title: 'Instructor',
              coursesCount: 0,
              studentsCount: 0,
              reviewsCount: 0
            };
          }
        }

        return {
          id: course.id,
          title: course.title,
          description: course.description,
          thumbnail: course.thumbnail || '',
          category: course.category,
          level: course.level,
          price: course.price,
          duration: course.duration || '',
          instructor,
          rating: 0,
          reviews: 0,
          updatedAt: course.updated_at,
          isTrending: course.is_trending,
          progress: enrollment.progress,
          lastAccessed: enrollment.last_accessed_at,
        } as Course;
      }).filter(Boolean) as Course[]; // Filter out any nulls

    return courses;
  } catch (error) {
    console.error(`Error in getUserCourses for ${userId}:`, error);
    return [];
  }
};
