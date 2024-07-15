/**
 * @author orangeboyChen
 * @version 1.0
 * @date 2024/7/15 18:17
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
import {getCourseList} from '../../../business/education/course';
import EducationModule from '../../../modules/EducationModule.ts';
import {WebView, WebViewMessageEvent} from 'react-native-webview';
import {loginEducation} from '../../../business/education';

const FetchCourseView = (): React.ReactElement => {
  const [captchaToken, setCaptchaToken] = useState('');

  let container;
  if (captchaToken.length === 0) {
    container = (
      <WebView
        source={require('../../../resources/captcha-page.html')}
        onMessage={(e: WebViewMessageEvent) => {
          const data = JSON.parse(e.nativeEvent.data) as {token: string};
          setCaptchaToken(data.token);
          doGetCourseList(data.token).catch(err => {
            console.log(err);
            EducationModule.onGetCourseList({}, err.message);
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
  return <View>{container}</View>;
};

const doGetCourseList = async (captchaToken: string) => {
  await loginEducation();
  const {year, semester} = await EducationModule.getCourseConfig();
  const courseListResult = await getCourseList({
    year,
    semester,
    validate: captchaToken,
  });
  const result: any = {};
  for (let entry of courseListResult.entries()) {
    const [course, courseGridList] = entry;
    result[JSON.stringify(course)] = JSON.stringify(courseGridList);
  }
  EducationModule.onGetCourseList(result);
};

const loadingContainerStyle: StyleProp<ViewStyle> = {
  alignItems: 'center',
};

const loadingTextStyle: StyleProp<TextStyle> = {
  fontSize: 12,
};

export default FetchCourseView;
