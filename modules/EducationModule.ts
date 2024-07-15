import {NativeModules} from 'react-native';
const {EducationModule} = NativeModules;

/**
 * @author orangeboyChen
 * @version 1.0
 * @date 2024/7/15 18:10
 */

export default EducationModule as {
  onGetCourseList(courseList: object, errorMessage: string | null): void;
  onGetScoreList(
    scoreList: string,
    userInfo: string,
    errorMessage: string | null,
  ): void;
  getCourseConfig(): Promise<{year: number; semester: number}>;
};
