/**
 * @author orangeboyChen
 * @version 1.0
 * @date 2025/6/20 18:54
 */
import type {TurboModule} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  i(tag: string, message: string): void;
  e(tag: string, message: string): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('NativeLog');
