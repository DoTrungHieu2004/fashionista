/**
 * Public i18n surface. No side effects, no logic — just re-exports.
 * This guarantees `import { useTranslation } from '@/i18n'` can never
 * participate in a require cycle.
 */
export { i18n, i18nReady } from './instance';
export * from './locales/_index';
export * from './useLanguage';
export { Trans, useTranslation } from 'react-i18next';
