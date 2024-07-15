import {parseResponse} from './parser.ts';

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
  const response = await fetch(
    `https://jwgl.whu.edu.cn/cjcx/cjcx_cxXsgrcj.html?${query}`,
    {
      method: 'post',
      body: body.toString(),
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
        'content-type': 'application/x-www-form-urlencoded',
        Host: 'jwgl.whu.edu.cn',
      },
    },
  );
  const rawStr = await response.text();
  const str = rawStr.replaceAll(' ', '');
  const json = JSON.parse(str);
  return parseResponse({json});
};

export {getScoreList};
