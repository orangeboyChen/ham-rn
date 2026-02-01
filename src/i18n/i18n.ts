import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import type {Resource} from 'i18next';
import en from './en/translation.json';
import ja from './ja/translation.json';
import zh from './zh/translation.json';
import CommonModule from '@/modules/NativeCommonModule';
import {DeviceEventEmitter} from 'react-native';
import Log from '@/modules/NativeLog';

const resources: Resource = {
  en: {
    translation: en,
  },
  ja: {
    translation: ja,
  },
  zh: {
    translation: zh,
  },
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: 'zh',
  lng: CommonModule.getLocale(),
  supportedLngs: ['zh', 'en', 'ja'],
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
