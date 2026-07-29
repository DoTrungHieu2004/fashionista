import React, { createContext, ReactNode, useContext, useState } from 'react';
import { useColorScheme as useDeviceColorScheme } from 'react-native';

import { getThemeColors, NEUTRAL_COLOURS, SEMANTIC_COLOURS } from '../constants/theme/colours';
import { FONTS } from '../constants/theme/fonts';
import { ROUNDED } from '../constants/theme/rounded';
import { SPACING } from '../constants/theme/spacing';
import { ELEVATION } from '../constants/theme/elevation';
import { getThemeImages } from '../constants/theme/images';

export type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
  isDark: boolean;
  colours: ReturnType<typeof getThemeColors>;
  images: ReturnType<typeof getThemeImages>;
  semantics: typeof SEMANTIC_COLOURS;
  neutrals: typeof NEUTRAL_COLOURS;
  fonts: typeof FONTS;
  rounded: typeof ROUNDED;
  spacing: typeof SPACING;
  elevation: typeof ELEVATION;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  initialMode?: ThemeMode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, initialMode = 'system' }) => {
  const deviceColourScheme = useDeviceColorScheme();
  const [mode, setMode] = useState<ThemeMode>(initialMode);

  // Determine actual active color scheme (light vs dark)
  const activeScheme: 'light' | 'dark' = mode === 'system' ? (deviceColourScheme === 'dark' ? 'dark' : 'light') : mode;

  const isDark = activeScheme === 'dark';
  const colours = getThemeColors(activeScheme);
  const images = getThemeImages(activeScheme);

  // Quick toggle between light and dark
  const toggleTheme = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const value: ThemeContextType = {
    mode,
    setMode,
    toggleTheme,
    isDark,
    colours,
    images,
    semantics: SEMANTIC_COLOURS,
    neutrals: NEUTRAL_COLOURS,
    fonts: FONTS,
    rounded: ROUNDED,
    spacing: SPACING,
    elevation: ELEVATION,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

// Hook for accessing the full theme system
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeProvider;
