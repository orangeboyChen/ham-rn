import type {NativeModule} from 'react-native';
import {NativeModules} from 'react-native';
import type {ScoreCalcItem} from '../business/education/scorecalc/type.ts';
const {ScoreCalcModule} = NativeModules;

/**
 * @author orangeboyChen
 * @version 1.0
 * @date 2024/8/3 16:58
 */
interface ScoreCalcModuleInterface extends NativeModule {
  getCurrentCalc: () => Promise<string>;
  selectCalc: (item: ScoreCalcItem) => Promise<boolean>;
  openDetail: (item: ScoreCalcItem) => void;
  testItem: (item: ScoreCalcItem) => Promise<boolean>;
}

export default ScoreCalcModule as ScoreCalcModuleInterface;
