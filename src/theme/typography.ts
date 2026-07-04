import { families } from '../constants/theme/fontFamilies';
import { sizes } from '../constants/theme/sizes';

export const typography = {
  displayLg: {
    fontFamily: `${families.headings}_700Bold`,
    fontSize: sizes.displayLg.size,
    lineHeight: sizes.displayLg.height,
    letterSpacing: -0.96,
  },
  headlineLg: {
    fontFamily: `${families.headings}_600SemiBold`,
    fontSize: sizes.headlineLg.size,
    lineHeight: sizes.headlineLg.height,
  },
  headlineLgMobile: {
    fontFamily: `${families.headings}_600SemiBold`,
    fontSize: sizes.headlineLgMobile.size,
    lineHeight: sizes.headlineLgMobile.height,
  },
  titleLg: {
    fontFamily: `${families.body}_600SemiBold`,
    fontSize: sizes.xxl.size,
    lineHeight: sizes.xxl.height,
  },
  bodyMd: {
    fontFamily: `${families.body}_400Regular`,
    fontSize: sizes.lg.size,
    lineHeight: sizes.lg.height,
  },
  labelMd: {
    fontFamily: `${families.body}_500Medium`,
    fontSize: sizes.sm.size,
    lineHeight: sizes.sm.height,
    letterSpacing: 0.6,
  },
};

export type TypographyType = typeof typography;
