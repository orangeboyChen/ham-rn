enum ScoreCalcItemType {
  APP = 0,
  GITHUB = 1,
}

interface ScoreCalcItem {
  title: string;
  date: string;
  author: string;
  version: number;
  brief: string;
  updateBrief: string;
  desc: string;
  type: ScoreCalcItemType;
  url: string;
  script: string;
}

export {ScoreCalcItemType};
export type {ScoreCalcItem};
