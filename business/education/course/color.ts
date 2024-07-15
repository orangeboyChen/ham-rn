import md5 from 'react-native-md5';

/**
 * @author orangeboyChen
 * @version 1.0
 * @date 2024/7/15 18:10
 */

const randomColorHexList = [
  '#F3A5A5',
  '#D6A5E0',
  '#C7A5E6',
  '#B5A5E1',
  '#A5B9F3',
  '#A5D6F4',
  '#A5E3F4',
  '#A5E6E1',
  '#C7F3B5',
  '#D6F3A5',
  '#E6F3A5',
  '#F3F3A5',
  '#F3E6A5',
  '#F3D6A5',
  '#F3C7A5',
  '#C7B5A5',
  '#D6D6D6',
  '#B5C7D6',
];

const getRandomColorHexString = (str: string): string => {
  const strMd5 = md5.str_md5(str);
  let stringBuilder = '';
  for (let i = 0; i <= 7; i++) {
    stringBuilder += strMd5.charCodeAt(i).toString();
  }

  const hashNum = parseInt(stringBuilder, 10);
  let index = hashNum % randomColorHexList.length;
  if (index < 0) {
    index += randomColorHexList.length;
  }
  return randomColorHexList[index];
};

export {randomColorHexList, getRandomColorHexString};
