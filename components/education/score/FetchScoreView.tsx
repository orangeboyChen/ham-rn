/**
 * @author orangeboyChen
 * @version 1.0
 * @date 2024/7/16 00:39
 */
import React, {useState} from 'react';
import {
  ActivityIndicator,
  StyleProp,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {CaptchaView} from '../CaptchaView.tsx';
import EducationModule from '../../../modules/EducationModule.ts';
import {loginEducation} from '../../../business/education';
import {getScoreList} from '../../../business/education/score';

const FetchScoreView = (): React.ReactElement => {
  const [captchaToken, setCaptchaToken] = useState('');
  let container;
  if (captchaToken.length === 0) {
    container = (
      <CaptchaView
        onGetToken={(token: string) => {
          setCaptchaToken(token);
          doGetScoreList(token).catch(err => {
            console.log(err);
            EducationModule.onGetScoreList('', '', err.message);
          });
        }}
      />
    );
  } else {
    container = (
      <View style={loadingContainerStyle}>
        <ActivityIndicator size={'large'} />
        <Text style={loadingTextStyle}>正在加载</Text>
      </View>
    );
  }
  return <View style={containerStyle}>{container}</View>;
};

const doGetScoreList = async (captchaToken: string) => {
  await loginEducation();
  const [scoreList, userInfo] = await getScoreList({
    validate: captchaToken,
  });
  const scoreListResult = JSON.stringify(scoreList);
  const userInfoResult = JSON.stringify(userInfo);
  EducationModule.onGetScoreList(scoreListResult, userInfoResult, null);
};

const containerStyle: StyleProp<ViewStyle> = {
  width: '100%',
  height: '100%',
};

const loadingContainerStyle: StyleProp<ViewStyle> = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
};

const loadingTextStyle: StyleProp<TextStyle> = {
  fontSize: 12,
};

export default FetchScoreView;
