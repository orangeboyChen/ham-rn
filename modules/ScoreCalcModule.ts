import {NativeModules} from 'react-native';
import {ScoreCalcItem} from '../business/education/scorecalc/type.ts';
const {ScoreCalcModule} = NativeModules;

/**
 * @author orangeboyChen
 * @version 1.0
 * @date 2024/8/3 16:58
 */
export default ScoreCalcModule as {
  getCurrentCalc: () => Promise<string>;
  selectCalc: (item: ScoreCalcItem) => Promise<boolean>;
  openDetail: (item: ScoreCalcItem) => void;
  testItem: (item: ScoreCalcItem) => Promise<boolean>;
};
