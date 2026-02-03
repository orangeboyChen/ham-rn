/**
 * @author orangeboyChen
 * @version 1.0
 * @date 2024/8/3 18:06
 */
import type {CodegenTypes, TurboModule} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

/**
 * @author orangeboyChen
 * @version 1.0
 * @date 2024/8/3 16:58
 */
type ToastType = 'success' | 'error' | 'normal';

export interface Spec extends TurboModule {
  openUrl: (url: string) => void;
  showToast: (type: ToastType, message: string, hint: string) => void;
  getLocale: () => string;

  readonly onLocaleChanged: CodegenTypes.EventEmitter<void>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('NativeCommonModule');
