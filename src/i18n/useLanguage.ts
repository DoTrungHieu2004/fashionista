import { useCallback, useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';

import { LANGUAGE_STORAGE_KEY } from '@/constants/i18n';

import { type Language, languageCodes } from './locales/_index';
import { i18nReady } from '.';

/**
 * Read and change the active language. Persists changes to AsyncStorage.
 *
 * @example
 * const { language, setLanguage, languages } = useLanguage();
 *
 * languageCodes.map((code) => (
 *   <Button key={code} onPress={() => setLanguage(code)} title={code} />
 * ));
 */
export function useLanguage() {
  const { i18n } = useTranslation();

  const setLanguage = useCallback(
    (next: Language) => {
      // Update UI immediately; persist in the background.
      i18n.changeLanguage(next);
      AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, next).catch(() => {});
    },
    [i18n],
  );

  return {
    /** Currently active BCP-47 tag. */
    language: i18n.language as Language,
    /** Change language and persist the choice. */
    setLanguage,
    /** All supported language tags. */
    languages: languageCodes,
  };
}

/**
 * `true` once the persisted language preference has been applied.
 * Pair with a splash screen gate in `App.tsx` to prevent a language flash.
 *
 * @example
 * const ready = useI18nReady();
 * if (!ready) return null;
 */
export function useI18nReady(): boolean {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    i18nReady.then(() => {
      if (!cancelled) setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return ready;
}
