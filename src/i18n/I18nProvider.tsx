import { type PropsWithChildren, useEffect } from 'react';

import { languages } from './locales/_registry';
import { i18n } from './instance';

/**
 * Injects locale bundles into the singleton.
 *
 * The effect depends on `languages`, whose identity changes whenever any
 * imported JSON file changes → Fast Refresh re-runs the effect without a
 * full app reload.
 */
export function I18nProvider({ children }: PropsWithChildren) {
  useEffect(() => {
    for (const [code, { translation }] of Object.entries(languages)) {
      i18n.addResourceBundle(code, 'translation', translation, true, true);
    }
    // Force `useTranslation` subscribers to re-render with the new strings.
    void i18n.changeLanguage(i18n.language);
  }, []);

  return <>{children}</>;
}
