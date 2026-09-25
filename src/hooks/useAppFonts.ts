import { useFonts } from 'expo-font';

import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold } from '@expo-google-fonts/inter';
import {
  Montserrat_400Regular,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from '@expo-google-fonts/montserrat';

import { type FontFamily } from '@/constants/theme/fonts';

/**
 * Every font asset loaded into the app. Keys MUST match the string values
 * declared in `constants/fonts.ts` — enforced by the `satisfies` guard below.
 */
export const fontAssets = {
  Montserrat_400Regular,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} as const;

// Compile-time guard: fails if `fonts.ts` references a family that isn't loaded.
fontAssets satisfies Record<FontFamily, unknown>;

/**
 * Loads every Google Font family used by the app.
 *
 * Wrap your root layout in this hook, gating render on `loaded` (and
 * optionally keeping the splash screen visible until then — see example).
 *
 * @returns `[loaded, error]` — identical signature to `expo-font`'s `useFonts`.
 *
 * @example
 * // app/_layout.tsx
 * import { SplashScreen, Stack } from 'expo-router';
 * import { useEffect } from 'react';
 * import { useAppFonts } from '@/hooks/useAppFonts';
 *
 * SplashScreen.preventAutoHideAsync();
 *
 * export default function RootLayout() {
 *   const [loaded, error] = useAppFonts();
 *
 *   useEffect(() => {
 *     if (loaded || error) SplashScreen.hideAsync();
 *   }, [loaded, error]);
 *
 *   if (!loaded && !error) return null;
 *   return <Stack />;
 * }
 */
export function useAppFonts() {
  return useFonts(fontAssets);
}
