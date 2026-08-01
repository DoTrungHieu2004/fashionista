import React from 'react';
import { useTranslation, initReactI18next } from 'react-i18next';
import { getLocales } from 'expo-localization';
import i18n from 'i18next';

import { resources } from '.';

const deviceLanguage = getLocales()[0]?.languageCode ?? 'en';

i18n.use(initReactI18next).init({
  resources: resources,
  lng: deviceLanguage,
  fallbackLng: 'en',

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
