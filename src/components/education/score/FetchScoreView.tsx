/**
 * @author orangeboyChen
 * @version 1.0
 * @date 2024/7/16 00:39
 */
import React, {useEffect} from 'react';
import '@/i18n/i18n';
import type {StyleProp, TextStyle, ViewStyle} from 'react-native';
import {ActivityIndicator, Text, View} from 'react-native';
import EducationModule from '@/modules/NativeEducationModule.ts';
import {loginEducation} from '@/business/education';
import {getScoreList} from '@/business/education/score';
import Log from '@/modules/NativeLog.ts';
import {generateValidate} from '@/business/education/api';
import {useTranslation} from 'react-i18next';
import {getUserInfo} from '@/business/education/score/api';

const FetchScoreView = (): React.ReactElement => {
  const {t} = useTranslation();
  useEffect(() => {
    doGetScoreList().catch(err => {
      Log.i('FetchScoreView', `doGetScoreList - err=${JSON.stringify(err)}`);
      EducationModule.onGetScoreList('', '', err.message);
    });
  }, []);
  return (
    <View style={containerStyle}>
      <View style={loadingContainerStyle}>
        <ActivityIndicator size={'large'} />
        <Text style={loadingTextStyle}>{t('education.loading')}</Text>
      </View>
    </View>
  );
};

const doGetScoreList = async () => {
  await loginEducation();
  const [scoreList, userInfo] = await getScoreList({
    validate: generateValidate(),
  });
  if (userInfo.studentId === '') {
    let {studentID} = await getUserInfo();
    userInfo.studentId = studentID;
  }
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
