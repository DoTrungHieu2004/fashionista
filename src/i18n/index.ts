import { getLocales } from 'expo-localization';

import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { LANGUAGE_STORAGE_KEY } from '@/constants/i18n';

import { DEFAULT_LANGUAGE, type Language, languageCodes, resources } from './locales/_index';

// Side-effect import: registers the `react-i18next` type augmentation.
import './types';

/**
 * Best-effort device language detection.
 *
 * Resolution order:
 *   1. Exact BCP-47 match — e.g. device `'vi-VN'` → supported `'vi-VN'`.
 *   2. Primary-subtag match — device `'en-US'` → supported `'en-GB'`.
 *   3. `DEFAULT_LANGUAGE` if nothing matches.
 */
function detectDeviceLanguage(): Language {
  const locales = getLocales();

  for (const { languageTag } of locales) {
    if ((languageCodes as readonly string[]).includes(languageTag)) {
      return languageTag as Language;
    }
  }
  for (const { languageCode } of locales) {
    const match = languageCodes.find((c) => c.split('-')[0] === languageCode);
    if (match) return match;
  }
  return DEFAULT_LANGUAGE;
}

// ---------------------------------------------------------------------------
// Synchronous init — the app renders immediately in the device language.
// ---------------------------------------------------------------------------

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: detectDeviceLanguage(),
    fallbackLng: DEFAULT_LANGUAGE,
    defaultNS: 'translation',
    interpolation: {
      // React escapes by default; i18next double-escaping corrupts
      // strings containing `&`, `<`, etc.
      escapeValue: false,
    },
    // Return empty strings rather than `null` for missing keys — safer
    // for `<Text>` children and typed t() consumers.
    returnNull: false,
  });
}

// ---------------------------------------------------------------------------
// Async hydration — applies the persisted override if one exists.
// ---------------------------------------------------------------------------

/**
 * Resolves once the persisted language preference has been read from
 * AsyncStorage and applied (if it differs from the detected device language).
 *
 * Await this before hiding the splash screen to avoid a one-frame flash
 * of the device language on launch after the user switched languages.
 *
 * Failures are swallowed — the app remains usable on the detected language.
 */
export const i18nReady: Promise<void> = (async () => {
  try {
    const stored = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (
      stored !== null &&
      (languageCodes as readonly string[]).includes(stored) &&
      stored !== i18n.language
    ) {
      await i18n.changeLanguage(stored);
    }
  } catch {
    // Storage unavailable — device-detected language stays.
  }
})();

export { i18n };
export * from './locales/_index';
export * from './useLanguage';
export { Trans, useTranslation } from 'react-i18next';
