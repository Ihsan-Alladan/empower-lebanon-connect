
import { Course } from '@/types/course';
import { handmadeCourses } from './handmadeCourses';
import { digitalCourses } from './digitalCourses';

export const trendingCourses: Course[] = [
  ...handmadeCourses.filter(course => course.isTrending),
  ...digitalCourses.filter(course => course.isTrending),
];
