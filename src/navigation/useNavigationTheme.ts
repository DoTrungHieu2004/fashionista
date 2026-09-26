import { DarkTheme, DefaultTheme, type Theme as NavTheme } from '@react-navigation/native';

import { type Theme } from '@/theme/types';

/**
 * Adapts our `Theme` shape to React Navigation's `Theme` shape.
 *
 * This covers header backgrounds, card backgrounds, default text colors,
 * back-arrow tints, and the hardware back-gesture overlay.
 *
 * @example
 * const theme = useTheme();
 * const navTheme = useMemo(() => buildNavigationTheme(theme), [theme]);
 * <NavigationContainer theme={navTheme}>…</NavigationContainer>
 */
export function buildNavigationTheme(theme: Theme): NavTheme {
  const base = theme.isDark ? DarkTheme : DefaultTheme;

  return {
    ...base,
    dark: theme.isDark,
    colors: {
      ...base.colors,
      primary: theme.colors.primary,
      background: theme.colors.background,
      card: theme.colors.surfaceContainer,
      text: theme.colors.onSurface,
      border: theme.colors.outlineVariant,
      notification: theme.colors.error,
    },
  };
}
