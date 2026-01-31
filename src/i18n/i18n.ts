import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import type {Resource} from 'i18next';
import en from './en/translation.json';
import ja from './ja/translation.json';
import zh from './zh/translation.json';
import CommonModule from '@/modules/CommonModule.ts';
import {NativeEventEmitter} from 'react-native';
import Log from '@/modules/Log.ts';

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

let inited = false;
i18n.use(initReactI18next).init({
  resources,
  fallbackLng: 'zh',
  lng: 'zh',
  supportedLngs: ['zh', 'en', 'ja'],
  interpolation: {
    escapeValue: false,
  },
});

export async function initI18n() {
  if (inited) return;
  const doInit = async () => {
    const locale = await CommonModule.getLocale();
    await i18n.changeLanguage(locale);
  };

  await doInit();
  const eventBus = new NativeEventEmitter(CommonModule);
  eventBus.addListener('onLocaleChanged', async event => {
    Log.i('Locale changed', event);
    const locale = await CommonModule.getLocale();
    await i18n.changeLanguage(locale);
  });
  inited = true;
}
initI18n().then();

export default i18n;
