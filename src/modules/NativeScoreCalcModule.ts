import type {CodegenTypes, TurboModule} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

/**
 * @author orangeboyChen
 * @version 1.0
 * @date 2024/8/3 16:58
 */
interface ScoreCalcItem {
  title: string;
  date: string;
  author: string;
  version: number;
  brief: string;
  updateBrief: string;
  desc: string;
  type: 'APP' | 'GITHUB';
  url: string;
  script: string;
}

export interface Spec extends TurboModule {
  getCurrentCalc: () => string;
  selectCalc: (item: ScoreCalcItem) => boolean;
  openDetail: (item: ScoreCalcItem) => void;
  testItem: (item: ScoreCalcItem) => boolean;
  readonly onSetScoreJsCalcItem: CodegenTypes.EventEmitter<void>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('NativeScoreCalcModule');
