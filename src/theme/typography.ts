import { TextStyle } from 'react-native';

export const families = {
  headings: 'Montserrat',
  body: 'Inter',
};

export const typography = {
  displayLg: {
    fontFamily: `${families.headings}_700Bold`,
    fontSize: 48,
    lineHeight: 56,
    letterSpacing: 48 * -0.02,
  },
  headlineLg: {
    fontFamily: `${families.headings}_600SemiBold`,
    fontSize: 32,
    lineHeight: 40,
  },
  headlineLgMobile: {
    fontFamily: `${families.headings}_600SemiBold`,
    fontSize: 28,
    lineHeight: 36,
  },
  headlineMd: {
    fontFamily: `${families.headings}_600SemiBold`,
    fontSize: 24,
    lineHeight: 32,
  },
  titleLg: {
    fontFamily: `${families.body}_600SemiBold`,
    fontSize: 20,
    lineHeight: 28,
  },
  bodyLg: {
    fontFamily: `${families.body}_400Regular`,
    fontSize: 18,
    lineHeight: 28,
  },
  bodyMd: {
    fontFamily: `${families.body}_400Regular`,
    fontSize: 16,
    lineHeight: 24,
  },
  bodySm: {
    fontFamily: `${families.body}_400Regular`,
    fontSize: 14,
    lineHeight: 20,
  },
  labelMd: {
    fontFamily: `${families.body}_500Medium`,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 12 * 0.05,
  },
  labelSm: {
    fontFamily: `${families.body}_600SemiBold`,
    fontSize: 10,
    lineHeight: 14,
    letterSpacing: 10 * 0.08,
  },
} as const satisfies Record<string, TextStyle>;

export type TypographyType = typeof typography;
