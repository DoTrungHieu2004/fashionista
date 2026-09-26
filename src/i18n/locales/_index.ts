import enGB from './en-GB.json';
import viVN from './vi-VN.json';

/**
 * Registry of every language the app ships with.
 *
 * Add a language by importing its JSON and appending one entry — the
 * `Language` union, `languageCodes`, and the i18next `resources` map all
 * update automatically.
 *
 * `label` is the **endonym** (name in its own language), suitable for a
 * language picker. Do not translate it.
 */
export const languages = {
  'en-GB': {
    label: 'English (UK)',
    translation: enGB,
  },
  'vi-VN': {
    label: 'Tiếng Việt',
    translation: viVN,
  },
} as const;

/** Union of every supported BCP-47 language tag. */
export type Language = keyof typeof languages;

/** Ordered list of supported language tags — handy for `<FlatList>` pickers. */
export const languageCodes = Object.keys(languages) as Language[];

/** Applied when the device locale is unsupported and nothing is persisted. */
export const DEFAULT_LANGUAGE: Language = 'en-GB';

/**
 * i18next `resources`, derived from `languages`.
 *
 * Shape expected by i18next: `{ [lang]: { [namespace]: translations } }`.
 * We use a single `'translation'` namespace — split into more only if the
 * bundle grows large enough to warrant lazy-loading.
 */
export const resources = Object.fromEntries(
  Object.entries(languages).map(([code, { translation }]) => [code, { translation }]),
) as { [K in Language]: { translation: (typeof languages)[K]['translation'] } };

export type { Language as LanguageTag };
