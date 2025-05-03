
export interface Instructor {
  name: string;
  avatar: string;
  title: string;
  bio: string;
  coursesCount: number;
  studentsCount: number;
  reviewsCount: number;
}

export interface Lesson {
  title: string;
  type: 'video' | 'quiz' | 'assignment' | 'discussion';
  duration: string;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
  duration: string;
}

export interface RatingBreakdown {
  stars: number;
  percentage: number;
}

export interface StudentReview {
  name: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  category: 'handmade' | 'digital';
  level: 'beginner' | 'intermediate' | 'advanced';
  price: number;
  duration: string;
  instructor: Instructor;
  rating: number;
  reviews: number;
  updatedAt: string;
  studentsEnrolled: number;
  learningObjectives: string[];
  requirements: string[];
  targetAudience: string;
  modules: Module[];
  totalLessons: number;
  ratingBreakdown: RatingBreakdown[];
  studentReviews: StudentReview[];
  isTrending?: boolean;
}
