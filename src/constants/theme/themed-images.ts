import { type ImageSourcePropType } from 'react-native';

/* -------------------------------------------------------------------------- */
/*  Themed images — swap between light & dark                                 */
/* -------------------------------------------------------------------------- */

/**
 * Light-theme image set. All other theme variants are validated against
 * this shape via `satisfies`, so adding a key here forces the same key in
 * every other variant.
 */
const lightImages = {} as const satisfies Record<string, ImageSourcePropType>;

export const themedImages = {
  light: lightImages,
  dark: {} satisfies typeof lightImages,
} as const;

export type ThemedImages = typeof themedImages;
export type ThemeImageSet = typeof lightImages;

/** Resolve the correct themed image bundle for a color scheme. */
export function pickThemedImages(scheme: 'light' | 'dark' | null | undefined): ThemeImageSet {
  return scheme === 'dark' ? themedImages.dark : themedImages.light;
}
