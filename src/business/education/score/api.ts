import {parseResponse} from './parser.ts';
import {requestPost} from '@/utils/request/request.ts';

/**
 * @author orangeboyChen
 * @version 1.0
 * @date 2024/7/16 00:43
 */
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
  const json = JSON.parse(str);
  return parseResponse({json});
};

export {getScoreList};
