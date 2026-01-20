/**
 * @author orangeboyChen
 * @version 1.0
 * @date 2024/7/15 18:17
 */
import React, {useState} from 'react';
import type {StyleProp, TextStyle, ViewStyle} from 'react-native';
import {ActivityIndicator, Text, View} from 'react-native';
import {getCourseList} from '@/business/education/course';
import EducationModule from '@/modules/EducationModule.ts';
import {loginEducation} from '@/business/education';
import {CaptchaView} from '../CaptchaView.tsx';
import Log from '@/modules/Log.ts';

const FetchCourseView = (): React.ReactElement => {
  const [captchaToken, setCaptchaToken] = useState('');
  return (
    <View style={containerStyle}>
      {captchaToken.length === 0 ? (
        <CaptchaView
          onGetToken={(token: string) => {
            setCaptchaToken(token);
            doGetCourseList(token).catch(err => {
              Log.e(
                'FetchCourseView',
                `doGetCourseList - error! err=${JSON.stringify(err)}`,
              );
              EducationModule.onGetCourseList({}, err.message);
            });
          }}
        />
      ) : (
        <View style={loadingContainerStyle}>
          <ActivityIndicator size={'large'} />
          <Text style={loadingTextStyle}>正在加载</Text>
        </View>
      )}
    </View>
  );
};

const doGetCourseList = async (captchaToken: string) => {
  await loginEducation();
  const {year, semester} = await EducationModule.getCourseConfig();
  if (!year || !semester) {
    throw Error('未设置开学日期');
  }

  const courseListResult = await getCourseList({
    year: year,
    semester: semester,
    validate: captchaToken,
  });
  const result: Record<string, string> = {};
  for (let entry of courseListResult.entries()) {
    const [course, courseGridList] = entry;
    result[JSON.stringify(course)] = JSON.stringify(courseGridList);
  }
  EducationModule.onGetCourseList(result, null);
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

export default FetchCourseView;
