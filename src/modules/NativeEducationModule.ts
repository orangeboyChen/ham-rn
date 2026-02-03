import type {TurboModule} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

/**
 * @author orangeboyChen
 * @version 1.0
 * @date 2024/7/15 18:10
 */

export interface NativeCourseEntity {
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

export interface NativeCourseGridEntity {
  week: number;
  weekday: number;
  classFrom: number;
  classTo: number;
  color: string;
}

export interface NativeSemesterInfo {
  year: number;
  semester: number;
}

export interface Spec extends TurboModule {
  onGetCourseList(
    courseList: NativeCourseEntity[],
    courseGridEntity: NativeCourseGridEntity[][],
    errorMessage: string | null,
  ): void;
  onGetScoreList(
    scoreList: string,
    userInfo: string,
    errorMessage: string | null,
  ): void;
  getCourseConfig(): NativeSemesterInfo;
}

export default TurboModuleRegistry.getEnforcing<Spec>('NativeEducationModule');
