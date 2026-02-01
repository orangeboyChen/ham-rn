import type {TurboModule} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

/**
 * @author orangeboyChen
 * @version 1.0
 * @date 2024/7/15 18:10
 */

export interface Spec extends TurboModule {
  onRequestSuccess(studentId: string, password: string, cookie: string): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>(
  'NativeCasMobileLoginModule',
);
