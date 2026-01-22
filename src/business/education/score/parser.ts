import type {ScoreEntity, ScoreRequestUserInfo} from './type.ts';

/**
 * @author orangeboyChen
 * @version 1.0
 * @date 2024/7/16 00:49
 */
interface ScoreResponseItem {
  jgmc?: string;
  zymc?: string;
  xm?: string;
  xh?: string;
  xnm?: string;
  kcmc?: string;
  jsxm?: string;
  jxbmc?: string;
  xf?: string;
  kcxzmc?: string;
  bfzcj?: string;
  kkbmmc?: string;
  xqm?: string;
}

const parseResponse = ({
  json,
}: {
  json: {
    items: ScoreResponseItem[];
  };
}): [ScoreEntity[], ScoreRequestUserInfo] => {
  const items = json.items;
  let userInfo: ScoreRequestUserInfo = {
    college: '',
    major: '',
    name: '',
    studentId: '',
  };
  let result: ScoreEntity[] = [];
  for (let item of items) {
    if (item.xh !== '') {
      userInfo = {
        college: item.jgmc ?? '',
        major: item.zymc ?? '',
        name: item.xm ?? '',
        studentId: item.xh ?? '',
      };
    }

    const entity: ScoreEntity = {
      year: parseInt(item.xnm ?? '', 10),
      name: item.kcmc ?? '',
      instructor: item.jsxm ?? '',
      courseId: item.jxbmc ?? '',
      credit: parseFloat(item.xf ?? ''),
      courseType: item.kcxzmc ?? '',
      score: parseInt(item.bfzcj ?? '', 10),
      courseCollege: item.kkbmmc ?? '',
      semester: parseInt(item.xqm ?? '', 10),
      isEnabled: true,
    };
    if (entity.semester === 3) {
      entity.semester = 1;
    } else if (entity.semester === 12) {
      entity.semester = 2;
    } else if (entity.semester === 16) {
      entity.semester = 3;
    } else {
      entity.semester = 1;
    }

    if (entity.year <= 0 || isNaN(entity.credit) || isNaN(entity.score)) {
      continue;
    }
    result.push(entity);
  }
  return [result, userInfo];
};

export {parseResponse};
