/**
 * Font family names as registered with `expo-font`.
 *
 * These strings are the exact values to pass to `fontFamily` in styles.
 * They MUST match the keys in `fontAssets` (see `hooks/useAppFonts.ts`)
 * and the packages installed from `@expo-google-fonts/*`.
 */
export const fonts = {
  montserrat: {
    regular: 'Montserrat_400Regular',
    semibold: 'Montserrat_600SemiBold',
    bold: 'Montserrat_700Bold',
  },
  inter: {
    regular: 'Inter_400Regular',
    medium: 'Inter_500Medium',
    semibold: 'Inter_600SemiBold',
  },
} as const;

export type Fonts = typeof fonts;

/** Union of every registered family name, e.g. `'Montserrat_400Regular' | …`. */
export type FontFamily =
  | (typeof fonts)['montserrat'][keyof (typeof fonts)['montserrat']]
  | (typeof fonts)['inter'][keyof (typeof fonts)['inter']];
