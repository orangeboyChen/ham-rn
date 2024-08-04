/**
 * @author orangeboyChen
 * @version 1.0
 * @date 2024/8/3 18:06
 */
import {NativeModules} from 'react-native';
const {CommonModule} = NativeModules;

/**
 * @author orangeboyChen
 * @version 1.0
 * @date 2024/8/3 16:58
 */
type ToastType = 'success' | 'error' | 'normal';

export default CommonModule as {
  openUrl: (url: string) => void;
  showToast: (type: ToastType, message: string, hint: string) => void;
};
