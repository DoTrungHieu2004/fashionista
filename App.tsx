import * as SplashScreen from 'expo-splash-screen';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AppContent } from '@/AppContent';
import { I18nProvider } from '@/i18n/I18nProvider';
import { ThemeProvider } from '@/theme/ThemeProvider';

import 'react-native-reanimated';

// Must be called at module scope, before the first render.
SplashScreen.preventAutoHideAsync();

export default function App() {
  return (
    <SafeAreaProvider>
      <I18nProvider>
        <ThemeProvider>
          <AppContent />
        </ThemeProvider>
      </I18nProvider>
    </SafeAreaProvider>
  );
}
