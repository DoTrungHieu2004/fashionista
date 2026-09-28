/** Ordered list of supported language tags — handy for `<FlatList>` pickers. */
export const languageCodes = ['en-GB', 'vi-VN'] as const;

/** Union of every supported BCP-47 language tag. */
export type Language = (typeof languageCodes)[number];

/** Applied when the device locale is unsupported and nothing is persisted. */
export const DEFAULT_LANGUAGE: Language = 'en-GB';
