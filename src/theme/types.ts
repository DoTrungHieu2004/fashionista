import { type AppImages } from '@/constants/images';
import {
  type NeutralColors,
  type SemanticColors,
  type ThemeColors,
} from '@/constants/theme/colors';
import { type Fonts } from '@/constants/theme/fonts';
import { type Radius } from '@/constants/theme/radius';
import { type Spacing } from '@/constants/theme/spacing';
import { type ThemeImageSet } from '@/constants/theme/themed-images';

/**
 * The user's persisted intent.
 * - `'system'` follows the OS (`useColorScheme()`).
 * - `'light'` / `'dark'` are explicit overrides.
 */
export type ThemeMode = 'system' | 'light' | 'dark';

/** Everything a themed component needs. No functions, no utils. */
export interface Theme {
  /** The stored preference (not the resolved scheme). */
  mode: ThemeMode;
  /** Resolved: `'system'` collapses to the OS scheme here. */
  isDark: boolean;

  /* ---- Themed tokens (change with `isDark`) ---- */
  colors: ThemeColors;
  /** Light or dark image set - pick via `images.logo` etc. */
  images: ThemeImageSet;

  /* ---- Theme-independent tokens (identical in every mode) ---- */
  staticImages: AppImages;
  semantic: SemanticColors;
  neutral: NeutralColors;
  spacing: Spacing;
  radius: Radius;
  fonts: Fonts;
}

export interface ThemeContextValue extends Theme {
  /** `false` until the persisted mode has been read from AsyncStorage. */
  isReady: boolean;
  setMode: (mode: ThemeMode) => void;
}
