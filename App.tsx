import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { Montserrat_600SemiBold, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold } from '@expo-google-fonts/inter';

import ThemeProvider from './src/theme/provider/ThemeProvider';
import RootNavigation from './src/navigation/RootNavigation';

interface TextWithDefaultProps extends React.ComponentProps<typeof Text> {
  defaultProps?: { style?: object };
}

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    MontserratBold: Montserrat_700Bold,
    MontserratSemiNold: Montserrat_600SemiBold,
    InterSemiBold: Inter_600SemiBold,
    InterMedium: Inter_500Medium,
    InterRegular: Inter_400Regular,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      const TextComponent = Text as unknown as TextWithDefaultProps;
      TextComponent.defaultProps = TextComponent.defaultProps || {};
      TextComponent.defaultProps.style = {
        fontFamily: 'InterRegular',
      };
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <RootNavigation />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
