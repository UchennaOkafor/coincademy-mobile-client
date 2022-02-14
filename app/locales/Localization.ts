import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

// Set the key-value pairs for the different languages you want to support.
i18n.translations = {
  en: require('@locales/en.json'),
  ja: {welcome: 'こんにちは'}
};

// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale;
