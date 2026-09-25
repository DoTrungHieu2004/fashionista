import { useContext } from 'react';

import { ThemeContext } from './context';

/**
 * Read the active theme. Must be called inside `<ThemeProvider>`.
 *
 * @example
 * const { colors, spacing, radius, isDark, setMode } = useTheme();
 *
 * // Switch modes:
 * setMode('dark');    // explicit override
 * setMode('system');  // follow the OS
 */
export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (ctx === null) {
    throw new Error('useTheme must be used within a <ThemeProvider>');
  }
  return ctx;
}
