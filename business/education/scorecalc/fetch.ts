/**
 * @author orangeboyChen
 * @version 1.0
 * @date 2024/8/3 17:33
 */
import {ScoreCalcItem, ScoreCalcItemType} from './type.ts';
import HistoryFacultyScoreCalc from './localcalc/HistoryFacultyScoreCalc.ts';

const fetchScoreCalcFromGithub = async (): Promise<Array<ScoreCalcItem>> => {
  const res = await fetch(
    'https://raw.githubusercontent.com/whu-ham/ScoreCalculator/main/config.json',
  );
  const json = await res.json();
  return Object.keys(json).map(key => {
    return {
      url: `https://raw.githubusercontent.com/whu-ham/ScoreCalculator/main/${key}`,
      type: ScoreCalcItemType.GITHUB,
      script: '',
      ...json[key],
    } as ScoreCalcItem;
  });
};

const getJsScriptFromGithub = async (url: string): Promise<string> => {
  const res = await fetch(url);
  return await res.text();
};

const fetchScoreCalcFromLocal = (): Array<ScoreCalcItem> => {
  return [];
};

export {
  fetchScoreCalcFromGithub,
  fetchScoreCalcFromLocal,
  getJsScriptFromGithub,
};
