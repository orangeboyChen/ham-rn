/**
 * @author orangeboyChen
 * @version 1.0
 * @date 2025/6/20 18:54
 */
import type {NativeModule} from 'react-native';
import { NativeModules} from 'react-native';
const {LogModule} = NativeModules;

interface LogModuleInterface extends NativeModule {
  i: (tag: string, message: string) => void;
  e: (tag: string, message: string) => void;
}

export default LogModule as LogModuleInterface;
