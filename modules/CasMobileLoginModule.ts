import {NativeModules} from 'react-native';
const {CasMobileLoginModule} = NativeModules;

interface CalendarInterface {
  onRequestSuccess(studentId: string, password: string, cookie: string): void;
}

export default CasMobileLoginModule as CalendarInterface;
