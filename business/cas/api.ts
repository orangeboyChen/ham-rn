import CasModule from '../../modules/CasModule.ts';

/**
 * @author orangeboyChen
 * @version 1.0
 * @date 2024/7/15 18:10
 */

const fastLogin = async ({service}: {service: string}) => {
  return await fetch(
    `https://cas.whu.edu.cn/authserver/login?service=${service}`,
    {
      method: 'GET',
      headers: {
        Cookie: await CasModule.requestCasCookie(),
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
      },
    },
  );
};

export default {
  fastLogin,
};
