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

export type {ScoreCalcItem};
