/**
 * @author orangeboyChen
 * @version 1.0
 * @date 2024/7/15 18:17
 */
import React, {useEffect} from 'react';
import type {StyleProp, TextStyle, ViewStyle} from 'react-native';
import {ActivityIndicator, Text, View} from 'react-native';
import {getCourseList} from '@/business/education/course';
import EducationModule from '@/modules/EducationModule.ts';
import {loginEducation} from '@/business/education';
import Log from '@/modules/Log.ts';
import {generateValidate} from '@/business/education/api.ts';

const FetchCourseView = (): React.ReactElement => {
  useEffect(() => {
    doGetCourseList().catch(err => {
      Log.e(
        'FetchCourseView',
        `doGetCourseList - error! err=${JSON.stringify(err)}`,
      );
      EducationModule.onGetCourseList({}, err.message);
    });
  }, []);
  return (
    <View style={containerStyle}>
      <View style={loadingContainerStyle}>
        <ActivityIndicator size={'large'} />
        <Text style={loadingTextStyle}>正在加载</Text>
      </View>
    </View>
  );
};

const doGetCourseList = async () => {
  await loginEducation();
  const {year, semester} = await EducationModule.getCourseConfig();
  if (!year || !semester) {
    throw Error('未设置开学日期');
  }

  const courseListResult = await getCourseList({
    year: year,
    semester: semester,
    validate: generateValidate(),
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
