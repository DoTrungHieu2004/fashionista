import React, { createContext, ReactNode, useContext, useState } from 'react';
import { ColorSchemeName, useColorScheme } from 'react-native';

import { getThemeColors, NEUTRAL_COLOURS, SEMANTIC_COLOURS } from '../constants/theme/colours';
import { FONTS } from '../constants/theme/fonts';
import { ROUNDED } from '../constants/theme/rounded';
import { SPACING } from '../constants/theme/spacing';
import { ELEVATION } from '../constants/theme/elevation';

export type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  isDark: boolean;
  colours: ReturnType<typeof getThemeColors>;
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
  const deviceColourScheme = useColorScheme();
  const [mode, setMode] = useState<ThemeMode>(initialMode);

  // Determine actual active color scheme (light vs dark)
  const activeScheme: ColorSchemeName = mode === 'system' ? (deviceColourScheme ?? 'light') : mode;

  const isDark = activeScheme === 'dark';
  const colours = getThemeColors(activeScheme);

  const value: ThemeContextType = {
    mode,
    setMode,
    isDark,
    colours,
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
