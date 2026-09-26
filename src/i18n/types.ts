import type enGB from './locales/en-GB.json';

import 'react-i18next';

/**
 * Module augmentation for `react-i18next`.
 *
 * Enables fully typed translation keys everywhere:
 *   t('common.ok')          ✅ autocompletes
 *   t('common.typo')        ❌ compile error
 *
 * The canonical shape comes from `en-GB.json` — add keys there first.
 * TS errors on other locales are intentionally **not** raised (missing
 * keys fall back at runtime), which keeps locale updates low-friction.
 */
declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: {
      translation: typeof enGB;
    };
  }
}
