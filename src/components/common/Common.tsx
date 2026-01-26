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
    const unsubscribe = HotUpdater.addListener('onProgress', ({progress}) => {
      Log.i('Common', `HotUpdater => onProgress: ${progress}%`);
    });
    Log.i('Common', 'mounted');
    Log.i('Common', `HotUpdater => Channel: ${HotUpdater.getChannel()}`);
    Log.i('Common', `HotUpdater => AppVersion: ${HotUpdater.getAppVersion()}`);
    Log.i(
      'Common',
      `HotUpdater => isUpdateDownloaded: ${HotUpdater.isUpdateDownloaded()}`,
    );
    Log.i(
      'Common',
      `HotUpdater => FingerprintHash: ${HotUpdater.getFingerprintHash()}`,
    );
    return () => {
      unsubscribe();
    };
  }, []);
  return <View />;
}

export default HotUpdater.wrap({
  baseURL: 'https://react-native-update.ham.obc.zone/api/check-update',
  updateStrategy: 'appVersion',
  updateMode: 'auto',
})(Common);
