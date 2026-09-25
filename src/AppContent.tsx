import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';

import { useAppFonts } from './hooks/useAppFonts';
import { useTheme } from './theme/useTheme';

/**
 * Everything under the ThemeProvider. Gates on both font + theme
 * hydration, then hides the splash and renders the app.
 */
export function AppContent() {
  const { isDark, isReady } = useTheme();
  const [fontsLoaded, fontError] = useAppFonts();

  const ready = isReady && (fontsLoaded || fontError != null);

  useEffect(() => {
    if (ready) {
      SplashScreen.hideAsync();
    }
  }, [ready]);

  if (!ready) return null;

  return (
    <>
      <View style={styles.container}>
        <Text>Open up App.tsx to start working on your app!</Text>
        <StatusBar style={isDark ? 'light' : 'dark'} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
