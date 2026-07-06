import { SafeAreaProvider } from 'react-native-safe-area-context';

import ThemeProvider from './src/theme/provider/ThemeProvider';
import RootNavigation from './src/navigation/RootNavigation';

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <RootNavigation />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
