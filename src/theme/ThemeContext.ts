import { ColorSchemeName } from 'react-native';

import { darkColors, lightColors } from '../constants/theme/colors';

export type ThemeMode = 'system' | 'light' | 'dark';
export type ResolvedTheme = Exclude<ColorSchemeName, null>;
export type ThemeColors = typeof lightColors | typeof darkColors;

export interface ThemeContextValue {
  /**
   * User's selected theme preference.
   *
   * - `system`: follow device appearance
   * - `light`: force light theme
   * - `dark`: force dark theme
   */
  mode: ThemeMode;

  /**
   * Actual theme currently being rendered.
   *
   * Unlike `mode`, this is always either `light` or `dark`.
   */
  resolvedTheme: ResolvedTheme;

  /**
   * Active color palette.
   */
  colors: ThemeColors;

  /**
   * Change the user's theme preference.
   */
  setMode: (mode: ThemeMode) => Promise<void>;

  /**
   * Whether the theme preference is still being restored from persistent storage.
   */
  isLoading: boolean;
}
