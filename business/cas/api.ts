import CasModule from '../../modules/CasModule.ts';

/**
 * @author orangeboyChen
 * @version 1.0
 * @date 2024/7/15 18:10
 */

const BASE_URL = 'https://cas.whu.edu.cn/authserver';

const fastLogin = async ({service}: {service: string}) => {
  return await fetch(`${BASE_URL}/login?service=${service}`, {
    method: 'GET',
    headers: {
      Cookie: await CasModule.requestCasCookie(),
    },
  });
};

export default {
  fastLogin,
};
