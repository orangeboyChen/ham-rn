/**
 * @format
 */

import {AppRegistry} from 'react-native';
import CasMobileLogin from './src/components/cas/CasMobileLoginView';
import Common from './src/components/common/Common';
import FetchCourseView from './src/components/education/course/FetchCourseView';
import FetchScoreView from './src/components/education/score/FetchScoreView';
import ScoreCalcView from './src/components/scorecalc/ScoreCalcView';

AppRegistry.registerComponent('RNCasMobileLogin', () => CasMobileLogin);
AppRegistry.registerComponent('RNCommon', () => Common);
AppRegistry.registerComponent('RNFetchCourseView', () => FetchCourseView);
AppRegistry.registerComponent('RNFetchScoreView', () => FetchScoreView);
AppRegistry.registerComponent('RNScoreCalcView', () => ScoreCalcView);
