import {parseResponse} from './parser.ts';
import {requestGet, requestPost} from '@/utils/request/request.ts';
import Log from '@/modules/Log.ts';
import * as cheerio from 'cheerio';

/**
 * @author orangeboyChen
 * @version 1.0
 * @date 2024/7/16 00:43
 */

interface UserInfo {
  studentID: string;
  name: string;
  college: string;
}

const getUserInfo = async (): Promise<UserInfo> => {
  const response = await requestGet({
    url: 'https://jwgl.whu.edu.cn/xtgl/index_cxYhxxIndex.html?xt=jw&localeKey=zh_CN&_=1769360780967&gnmkdm=index',
    headers: {
      Host: 'jwgl.whu.edu.cn',
    },
  });
  const str = await response.text();

  const $ = cheerio.load(str);

  // 1. 学号
  const src = $('img.media-object').attr('src') || '';
  const xhId =
    new URL(src, 'https://dummy.base').searchParams.get('xh_id') ?? '';

  // 2. 姓名
  const nameText = $('h4.media-heading').text();
  const name = nameText
    .replace(/\s*学生.*/, '')
    .replace(/\u00a0/g, ' ') // &nbsp;
    .trim();

  // 3. 学院 + 班级
  const pText = $('.media-body > p').first().text().trim();
  const college = pText.replace(/\s+\d{4}.*/, '').trim();
  return {
    studentID: xhId,
    name: name,
    college: college,
  };
};

const getScoreList = async ({
  year = -1,
  semester = -1,
  funcId = 'N305005',
  validate,
}: {
  year?: number;
  semester?: number;
  funcId?: string;
  validate: string;
}) => {
  const query = new URLSearchParams({
    doType: 'query',
    gnmkdm: funcId,
  });
  const body = new URLSearchParams({
    validate,
    xnm: year !== -1 ? `${year}` : '',
    xqm: semester !== -1 ? `${semester}` : '',
    'queryModel.showCount': '150',
  });
  const response = await requestPost({
    url: `https://jwgl.whu.edu.cn/cjcx/cjcx_cxXsgrcj.html?${query}`,
    body: body.toString(),
    headers: {
      Host: 'jwgl.whu.edu.cn',
    },
    contentType: 'application/x-www-form-urlencoded',
  });
  const rawStr = await response.text();
  const str = rawStr.replaceAll(' ', '');
  Log.i('getScoreList', `response: ${str}`);
  const json = JSON.parse(str);
  return parseResponse({json});
};

export {getScoreList, getUserInfo};
