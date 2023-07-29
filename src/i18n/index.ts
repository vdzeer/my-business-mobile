import i18n, {
  LanguageDetectorAsyncModule,
  Services,
  InitOptions,
} from 'i18next';
import { Platform, NativeModules } from 'react-native';
import { initReactI18next } from 'react-i18next';

import { en, ru, uk } from './Languages';

const getDeviceLang = () => {
  const appLanguage =
    Platform.OS === 'ios'
      ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0]
      : NativeModules.I18nManager.localeIdentifier;

  return appLanguage.search(/-|_/g) !== -1
    ? appLanguage.slice(0, 2)
    : appLanguage;
};

const languageDetector: LanguageDetectorAsyncModule = {
  type: 'languageDetector',
  async: true,
  init: (
    _services: Services,
    _detectorOptions: object,
    _i18nextOptions: InitOptions,
  ) => {},
  //@ts-ignore
  detect: async callback => {
    const deviceLang = getDeviceLang();
    callback(deviceLang);
  },
  cacheUserLanguage: async function () {},
};

const resources = {
  en: { translation: en },
  ru: { translation: ru },
  uk: { translation: uk },
};

i18n
  .use(initReactI18next)
  .use(languageDetector)
  .init({
    compatibilityJSON: 'v3',
    resources,
    fallbackLng: 'en',
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
