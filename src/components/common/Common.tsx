import React, {useEffect} from 'react';
import {View} from 'react-native';
import Log from '@/modules/Log.ts';
import {HotUpdater} from '@hot-updater/react-native';

/**
 * @author orangeboyChen
 * @version 1.0
 * @date 2024/7/15 18:10
 */

function Common() {
  useEffect(() => {
    Log.i('Common', 'mounted');
  }, []);
  return <View />;
}

export default HotUpdater.wrap({
  baseURL: 'https://react-native-update.ham.obc.zone/api/check-update',
  updateStrategy: 'appVersion',
  updateMode: 'auto',
})(Common);
