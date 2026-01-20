import CasModule from '@/modules/CasModule.ts';
import {requestGet} from '@/utils/request/request.ts';

/**
 * @author orangeboyChen
 * @version 1.0
 * @date 2024/7/15 18:10
 */

const fastLogin = async ({service}: {service: string}) => {
  return await requestGet({
    url: `https://cas.whu.edu.cn/authserver/login?service=${service}`,
    headers: {
      Cookie: await CasModule.requestCasCookie(),
    },
  });
};

export default {
  fastLogin,
};
