import CasModule from '@/modules/NativeCasModule';
import {requestGet} from '@/utils/request/request';
import NativeLog from '@/modules/NativeLog';

/**
 * @author orangeboyChen
 * @version 1.0
 * @date 2024/7/15 18:10
 */

const fastLogin = async ({service}: {service: string}) => {
  const casCookie = CasModule.requestCasCookie();
  NativeLog.i('CAS', `fastLogin - casCookie: ${casCookie}`);
  return await requestGet({
    url: `https://cas.whu.edu.cn/authserver/login?service=${service}`,
    headers: {
      Cookie: CasModule.requestCasCookie(),
    },
  });
};

export default {
  fastLogin,
};
