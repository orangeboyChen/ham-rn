import {NativeModules} from 'react-native';
const {EducationModule} = NativeModules;

/**
 * @author orangeboyChen
 * @version 1.0
 * @date 2024/7/15 18:10
 */

export default EducationModule as {
  onGetCourseList(courseList: any, errorMessage?: string): void;
  onGetScoreList(): void;
  getCourseConfig(): Promise<{year: number; semester: number}>;
};
