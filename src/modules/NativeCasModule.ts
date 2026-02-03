import type {TurboModule} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

/**
 * @author orangeboyChen
 * @version 1.0
 * @date 2024/7/15 18:10
 */

export interface Spec extends TurboModule {
  requestCasCookie(): string;
}

export default TurboModuleRegistry.getEnforcing<Spec>('NativeCasModule');
