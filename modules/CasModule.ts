import {NativeModules} from 'react-native';
const {CasModule} = NativeModules;

/**
 * @author orangeboyChen
 * @version 1.0
 * @date 2024/7/15 18:10
 */

export default CasModule as {
  requestCasCookie(): Promise<string>;
};
