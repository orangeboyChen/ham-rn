/**
 * @author orangeboyChen
 * @version 1.0
 * @date 2024/7/16 00:50
 */
interface ScoreEntity {
  year: number;
  semester: number;
  name: string;
  courseId: string;
  instructor: string;
  credit: number;
  courseType: string;
  score: number;
  courseCollege: string;
}

interface ScoreRequestUserInfo {
  college: string;
  major: string;
  name: string;
  studentId: string;
}

export type {ScoreEntity, ScoreRequestUserInfo};
