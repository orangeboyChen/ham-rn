/**
 * @format
 */

import {AppRegistry} from 'react-native';
import CasMobileLogin from './components/cas/CasMobileLoginView';
import Common from './components/common/Common';
import App from 'react-native/template/App';
import FetchCourseView from './components/education/course/FetchCourseView';

AppRegistry.registerComponent('RNCasMobileLogin', () => CasMobileLogin);
AppRegistry.registerComponent('RNCommon', () => Common);
AppRegistry.registerComponent('RNFetchCourseView', () => FetchCourseView);
