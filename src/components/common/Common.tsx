import React, {useEffect} from 'react';
import {View} from 'react-native';
import Log from '@/modules/NativeLog';
import {HotUpdater} from '@hot-updater/react-native';
import NativeCommonModule from '@/modules/NativeCommonModule';
import i18n from '@/i18n/i18n';
import NativeLog from '@/modules/NativeLog';

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

  useEffect(() => {
    const unsub = NativeCommonModule.onLocaleChanged(() => {
      NativeLog.i('Common', 'onLocaleChanged');
      i18n.changeLanguage(NativeCommonModule.getLocale());
    });
    return () => {
      unsub.remove();
    };
  }, []);

  return <View />;
}

export default HotUpdater.wrap({
  baseURL: 'https://react-native-update.ham.obc.zone/api/check-update',
  updateStrategy: 'appVersion',
  updateMode: 'auto',
})(Common);
