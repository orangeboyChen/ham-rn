import type {CourseEntity, CourseGridEntity} from './type.ts';
import {getRandomColorHexString} from './color';

/**
 * @author orangeboyChen
 * @version 1.0
 * @date 2024/7/15 18:10
 */

enum CourseWeekType {
  NORMAL,
  ODD,
  EVEN,
}

const parseResponse = ({
  json,
  year,
  semester,
}: {
  json: {
    kbList: {
      kcmc?: string;
      jxbmc?: string;
      xqj?: string;
      cdmc?: string;
      jcs?: string;
      xm?: string;
      zcmc?: string;
      kcxz?: string;
      xf?: string;
      zcd?: string;
    }[];
  };
  year: number;
  semester: number;
}): Map<CourseEntity, CourseGridEntity[]> => {
  const kbList = json.kbList;
  const result = new Map<CourseEntity, CourseGridEntity[]>();
  for (let data of kbList) {
    const course: CourseEntity = {
      classFrom: -1,
      classTo: -1,
      weekFrom: -1,
      weekTo: -1,
      name: data.kcmc ?? '',
      courseId: data.jxbmc ?? '',
      weekday: parseInt(data.xqj ?? '', 10) || -1,
      location: data.cdmc ?? '',
      color: getRandomColorHexString(data.jxbmc ?? ''),
      semester: semester,
      year: year,
      instructor: data.xm ?? '',
      instructorType: data.zcmc ?? '',
      courseType: data.kcxz ?? '',
      credit: parseFloat(data.xf ?? ''),
    };

    if (course.weekday === 7) {
      course.weekday = 0;
    }

    const classPeriod = data.jcs ?? '';
    if (classPeriod.includes('-')) {
      const [classFromStr, classToStr] = classPeriod.split('-');
      course.classFrom = parseInt(classFromStr, 10) || -1;
      course.classTo = parseInt(classToStr, 10) || -1;
    }

    const courseGridList = getEmptyCourseGridWithWeek(data.zcd ?? '');
    const weekFrom = Math.min(...courseGridList.map(grid => grid.week));
    const weekTo = Math.max(...courseGridList.map(grid => grid.week));
    const weekPeriodContinuous =
      weekTo - weekFrom + 1 === courseGridList.length;

    if (weekPeriodContinuous) {
      course.weekFrom = weekFrom;
      course.weekTo = weekTo;
    }

    courseGridList.forEach(grid => {
      grid.classFrom = course.classFrom;
      grid.classTo = course.classTo;
      grid.weekday = course.weekday;
    });

    result.set(course, courseGridList);
  }
  return result;
};

const getEmptyCourseGridWithWeek = (
  weekTime: string,
): Array<CourseGridEntity> => {
  return weekTime
    .split(',')
    .map(week => handleSingleWeekTime(week))
    .filter((data): boolean => data !== undefined)
    .map(data => data!!)
    .flatMap(({courseWeekType, weekFrom, weekTo}) => {
      const result: CourseGridEntity[] = [];
      for (let week = weekFrom; week <= weekTo; week++) {
        if (
          (courseWeekType === CourseWeekType.ODD && week % 2 === 0) ||
          (courseWeekType === CourseWeekType.EVEN && week % 2 === 1)
        ) {
          continue;
        }
        result.push({classFrom: 0, classTo: 0, color: '', weekday: 0, week});
      }
      return result;
    })
    .filter(
      (value, index, self) =>
        index === self.findIndex(t => t.week === value.week),
    );
};

const handleSingleWeekTime = (
  singleWeekTime: string,
):
  | undefined
  | {
      courseWeekType: CourseWeekType;
      weekFrom: number;
      weekTo: number;
    } => {
  if (!singleWeekTime || singleWeekTime.length <= 0) {
    return undefined;
  }

  let courseWeekType = CourseWeekType.NORMAL;
  if (singleWeekTime.indexOf('单') !== -1) {
    courseWeekType = CourseWeekType.ODD;
  } else if (singleWeekTime.indexOf('双') !== -1) {
    courseWeekType = CourseWeekType.EVEN;
  }

  const clearTimeStr = singleWeekTime.replace(/[()单双周]/g, '');
  const weekNumStrArr = clearTimeStr.split('-');
  const weekFrom = parseInt(weekNumStrArr[0], 10);
  if (isNaN(weekFrom)) {
    return undefined;
  }
  const weekTo =
    weekNumStrArr.length > 1 ? parseInt(weekNumStrArr[1], 10) : weekFrom;

  return {
    courseWeekType,
    weekFrom,
    weekTo: isNaN(weekTo) ? weekFrom : weekTo,
  };
};

export {parseResponse};
