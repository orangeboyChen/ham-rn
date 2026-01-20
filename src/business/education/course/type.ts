/**
 * @author orangeboyChen
 * @version 1.0
 * @date 2024/7/15 18:10
 */

interface CourseEntity {
  name: string;
  courseId: string;
  instructor: string;
  instructorType: string;
  weekFrom: number;
  weekTo: number;
  classFrom: number;
  classTo: number;
  weekday: number;
  courseType: string;
  credit: number;
  location: string;
  color: string;
  year?: number;
  semester?: number;
}

interface CourseGridEntity {
  week: number;
  weekday: number;
  classFrom: number;
  classTo: number;
  color: string;
}

export type {CourseEntity, CourseGridEntity};
