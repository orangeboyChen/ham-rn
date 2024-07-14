import React, {useEffect} from 'react';
import codePush from 'react-native-code-push';
import {View} from 'react-native';

function Common() {
  useEffect(() => {
    console.log('Common - mounted');
  }, []);
  return <View />;
}

const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.ON_NEXT_RESUME,
};

export default codePush(codePushOptions)(Common);
