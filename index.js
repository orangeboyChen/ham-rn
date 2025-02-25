/**
 * @format
 */

import {AppRegistry} from 'react-native';
import CasMobileLogin from './components/cas/CasMobileLoginView';
import Common from './components/common/Common';
import FetchCourseView from './components/education/course/FetchCourseView';
import FetchScoreView from './components/education/score/FetchScoreView';
import ScoreCalcView from './components/scorecalc/ScoreCalcView';

AppRegistry.registerComponent('RNCasMobileLogin', () => CasMobileLogin);
AppRegistry.registerComponent('RNCommon', () => Common);
AppRegistry.registerComponent('RNFetchCourseView', () => FetchCourseView);
AppRegistry.registerComponent('RNFetchScoreView', () => FetchScoreView);
AppRegistry.registerComponent('RNScoreCalcView', () => ScoreCalcView);
