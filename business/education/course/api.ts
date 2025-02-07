import {parseResponse} from './parser.ts';

/**
 * @author orangeboyChen
 * @version 1.0
 * @date 2024/7/15 18:10
 */

const getCourseList = async ({
  year,
  semester,
  funcId = 'N2151',
  validate,
}: {
  year: number;
  semester: number;
  funcId?: string;
  validate: string;
  ua?: string;
}) => {
  let requestSemester = semester;
  if (semester === 1) {
    requestSemester = 3;
  } else if (semester === 2) {
    requestSemester = 12;
  } else if (semester === 3) {
    requestSemester = 16;
  }
  const params = new URLSearchParams({
    gnmkdm: funcId,
  });
  const body = new URLSearchParams({
    validate: validate,
    xnm: `${year}`,
    xqm: `${requestSemester}`,
    xzlx: 'ck',
  });
  const response = await fetch(
    `https://jwgl.whu.edu.cn/kbcx/xskbcx_cxXsgrkb.html?${params}`,
    {
      method: 'post',
      body: body.toString(),
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
        'content-type': 'application/x-www-form-urlencoded',
      },
    },
  );
  const rawStr = await response.text();
  const str = rawStr.replaceAll(' ', '');
  const json = JSON.parse(str);
  return parseResponse({
    json,
    year,
    semester,
  });
};

export {getCourseList};
