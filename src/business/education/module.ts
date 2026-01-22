import {generateValidate, loginEducation} from '@/business/education/api.ts';
import EducationModule from '@/modules/EducationModule.ts';
import type {CourseEntity, CourseGridEntity} from '@/business/education/course';
import {getCourseList} from '@/business/education/course';
import {getScoreList} from '@/business/education/score';
import type {
  ScoreEntity,
  ScoreRequestUserInfo,
} from '@/business/education/score/type.ts';

/**
 * @author orangeboyChen
 * @version 1.0
 * @date 2026/1/22 14:25
 */
const updateCourseList = async (year: number, semester: number) => {
  try {
    await loginEducation();
  } catch (e: unknown) {
    if (e instanceof Error) {
      EducationModule.onGetCourseList([], `教务系统登录失败! ${e.message}`);
    }
    return;
  }

  let courseListResult: Map<CourseEntity, CourseGridEntity[]>;
  try {
    courseListResult = await getCourseList({
      year: year,
      semester: semester,
      validate: generateValidate(),
    });
  } catch (e: unknown) {
    if (e instanceof Error) {
      EducationModule.onGetCourseList([], `获取课程失败! ${e.message}`);
    }
    return;
  }

  const result: Record<string, string> = {};
  for (let entry of courseListResult.entries()) {
    const [course, courseGridList] = entry;
    result[JSON.stringify(course)] = JSON.stringify(courseGridList);
  }
  EducationModule.onGetCourseList(result, null);
};

const updateScoreList = async () => {
  try {
    await loginEducation();
  } catch (e: unknown) {
    if (e instanceof Error) {
      EducationModule.onGetScoreList('', '', `教务系统登录失败! ${e.message}`);
    }
    return;
  }

  let [scoreList, userInfo]: [ScoreEntity[], ScoreRequestUserInfo] = [
    [],
    {
      college: '',
      major: '',
      name: '',
      studentId: '',
    },
  ];
  try {
    [scoreList, userInfo] = await getScoreList({
      validate: generateValidate(),
    });
  } catch (e: unknown) {
    if (e instanceof Error) {
      EducationModule.onGetCourseList([], `获取成绩失败! ${e.message}`);
    }
    return;
  }
  const scoreListResult = JSON.stringify(scoreList);
  const userInfoResult = JSON.stringify(userInfo);
  EducationModule.onGetScoreList(scoreListResult, userInfoResult, null);
};

const educationCallableModule = {
  updateCourseList,
  updateScoreList,
};

export {educationCallableModule};
