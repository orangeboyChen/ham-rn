/**
 * @author orangeboyChen
 * @version 1.0
 * @date 2024/8/3 18:04
 */
import {NativeModules} from 'react-native';
const {EventModule} = NativeModules;

/**
 * @author orangeboyChen
 * @version 1.0
 * @date 2024/8/3 16:58
 */
export default EventModule as {
  postEvent: (name: string, args?: any) => void;
};
