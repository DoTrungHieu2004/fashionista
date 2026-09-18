import { createContext, PropsWithChildren, useCallback, useEffect, useMemo, useState } from 'react';
import { Appearance, ColorSchemeName } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ResolvedTheme, ThemeContextValue, ThemeMode } from './ThemeContext';
import { darkColors, lightColors } from '../constants/theme/colors';

const THEME_STORAGE_KEY = '@fashionista/theme-mode';
const DEFAULT_THEME_MODE: ThemeMode = 'system';

function isValidThemeMode(value: string | null): value is ThemeMode {
  return value === 'system' || value === 'light' || value === 'dark';
}

function resolveTheme(mode: ThemeMode, systemTheme: ColorSchemeName): ResolvedTheme {
  if (mode === 'light') return 'light';
  if (mode === 'dark') return 'dark';

  return systemTheme === 'dark' ? 'dark' : 'light';
}

export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: PropsWithChildren) {
  const [mode, setModeState] = useState<ThemeMode>(DEFAULT_THEME_MODE);
  const [systemTheme, setSystemTheme] = useState<ColorSchemeName>(Appearance.getColorScheme());
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Restore the user's theme preference.
   */
  useEffect(() => {
    let isMounted = true;

    async function loadThemeMode() {
      try {
        const storedMode = await AsyncStorage.getItem(THEME_STORAGE_KEY);

        if (isMounted && isValidThemeMode(storedMode)) {
          setModeState(storedMode);
        }
      } catch (error) {
        console.warn('Failed to load theme preference:', error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadThemeMode();

    return () => {
      isMounted = false;
    };
  }, []);

  /**
   * Listen for OS appearance changes.
   *
   * This only affects the resolved theme when the user's preference is `system`.
   */
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setSystemTheme(colorScheme);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  /*
   * Update user's theme preference and persist their intent.
   */
  const setMode = useCallback(async (nextMode: ThemeMode) => {
    setModeState(nextMode);

    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, nextMode);
    } catch (error) {
      console.warn('Failed to save theme preference:', error);
    }
  }, []);

  const resolvedTheme = resolveTheme(mode, systemTheme);
  const colors = resolveTheme === 'dark' ? darkColors : lightColors;

  const value = useMemo<ThemeContextValue>(
    () => ({
      mode,
      resolvedTheme,
      colors,
      setMode,
      isLoading,
    }),
    [mode, resolveTheme, colors, setMode, isLoading],
  );

  if (isLoading) return null;

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
