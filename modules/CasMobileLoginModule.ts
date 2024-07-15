import {NativeModules} from 'react-native';
const {CasMobileLoginModule} = NativeModules;

/**
 * @author orangeboyChen
 * @version 1.0
 * @date 2024/7/15 18:10
 */

export default CasMobileLoginModule as {
  onRequestSuccess(studentId: string, password: string, cookie: string): void;
};
