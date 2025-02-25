import Cas from '../cas';

/**
 * @author orangeboyChen
 * @version 1.0
 * @date 2024/7/15 18:10
 */

const loginEducation = async () => {
  const res = await Cas.Api.fastLogin({
    service: 'https%3A%2F%2Fjwgl.whu.edu.cn%2Fsso%2Fjznewsixlogin',
  });
  if (res.url.indexOf('index_initMenu.html') === -1) {
    console.log(res.url);
    const errReason = await parseJsError(res);
    const realReason = errReason.length ? errReason : '试试重新登录信息门户呢~';
    throw Error(`教务系统登录失败！${realReason}`);
  }
};

const parseJsError = async (response: Response): Promise<string> => {
  const html = await response.text();
  const regex = /var dlktsxx=".*";/;
  const match = regex.exec(html);
  return match ? match[0].replace('var dlktsxx="', '').replace('";', '') : '';
};

export {loginEducation};
