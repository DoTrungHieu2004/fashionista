import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';

import { useAppFonts } from './hooks/useAppFonts';
import { RootNavigator } from './navigation/RootNavigator';
import { useTheme } from './theme/useTheme';
import { useI18nReady } from './i18n';

/**
 * Everything under the ThemeProvider. Gates on both font + theme
 * hydration, then hides the splash and renders the app.
 */
export function AppContent() {
  const { isDark, isReady: themeReady } = useTheme();
  const [fontsLoaded, fontError] = useAppFonts();
  const i18nReady = useI18nReady();

  const ready = themeReady && i18nReady && (fontsLoaded || fontError != null);

  useEffect(() => {
    if (ready) {
      SplashScreen.hideAsync();
    }
  }, [ready]);

  if (!ready) return null;

  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <RootNavigator />
    </>
  );
}
