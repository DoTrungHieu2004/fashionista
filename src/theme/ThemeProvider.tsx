import { PropsWithChildren, useCallback, useEffect, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { darkColors, lightColors, neutralColors, semanticColors } from '@/constants/theme/colors';
import { images } from '@/constants/images';
import { pickThemedImages } from '@/constants/theme/themed-images';
import { spacing } from '@/constants/theme/spacing';
import { radius } from '@/constants/theme/radius';
import { fonts } from '@/constants/theme/fonts';

import { ThemeContextValue, ThemeMode } from './types';
import { ThemeContext } from './context';

const STORAGE_KEY = '@fashionista/theme-mode';
const VALID_MODES = ['system', 'light', 'dark'] as const satisfies readonly ThemeMode[];

export function ThemeProvider({ children }: PropsWithChildren) {
  const systemScheme = useColorScheme();
  const [mode, setModeState] = useState<ThemeMode>('system');
  const [isReady, setIsReady] = useState(false);

  // Hydrate the persisted preference once on mount.
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (!cancelled && stored !== null && (VALID_MODES as readonly string[]).includes(stored)) {
          setModeState(stored as ThemeMode);
        }
      } catch {
        // Storage unavailable - stay on 'system'.
      } finally {
        if (!cancelled) setIsReady(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const setMode = useCallback((next: ThemeMode) => {
    // Update UI immediately; persist in the background
    setModeState(next);
    AsyncStorage.setItem(STORAGE_KEY, next).catch(() => {});
  }, []);

  const isDark = mode === 'system' ? systemScheme === 'dark' : mode === 'dark';

  const value = useMemo<ThemeContextValue>(
    () => ({
      mode,
      isDark,
      isReady,
      colors: isDark ? darkColors : lightColors,
      images: pickThemedImages(isDark ? 'dark' : 'light'),
      staticImages: images,
      semantic: semanticColors,
      neutral: neutralColors,
      spacing: spacing,
      radius: radius,
      fonts: fonts,
      setMode,
    }),
    [mode, isDark, isReady, setMode],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
