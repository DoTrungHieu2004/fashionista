import { darkThemePalette, lightThemePalette } from '../constants/theme/colors';

export const themeColors = {
  light: {
    primary: lightThemePalette.primary,
    onPrimary: lightThemePalette.onPrimary,
    primaryContainer: lightThemePalette.primaryContainer,
    onPrimaryContainer: lightThemePalette.onPrimaryContainer,
    inversePrimary: lightThemePalette.inversePrimary,

    primaryFixed: lightThemePalette.primaryFixed,
    primaryFixedDim: lightThemePalette.primaryFixedDim,
    onPrimaryFixed: lightThemePalette.onPrimaryFixed,
    onPrimaryFixedVariant: lightThemePalette.onPrimaryFixedVariant,

    secondary: lightThemePalette.secondary,
    onSecondary: lightThemePalette.onSecondary,
    secondaryContainer: lightThemePalette.secondaryContainer,
    onSecondaryContainer: lightThemePalette.onSecondaryContainer,

    secondaryFixed: lightThemePalette.secondaryFixed,
    secondaryFixedDim: lightThemePalette.secondaryFixedDim,
    onSecondaryFixed: lightThemePalette.onSecondaryFixed,
    onSecondaryFixedVariant: lightThemePalette.onSecondaryFixedVariant,

    tertiary: lightThemePalette.tertiary,
    onTertiary: lightThemePalette.onTertiary,
    tertiaryContainer: lightThemePalette.tertiaryContainer,
    onTertiaryContainer: lightThemePalette.onTertiaryContainer,

    tertiaryFixed: lightThemePalette.tertiaryFixed,
    tertiaryFixedDim: lightThemePalette.tertiaryFixedDim,
    onTertiaryFixed: lightThemePalette.onTertiaryFixed,
    onTertiaryFixedVariant: lightThemePalette.onTertiaryFixedVariant,

    error: lightThemePalette.error,
    onError: lightThemePalette.onError,
    errorContainer: lightThemePalette.errorContainer,
    onErrorContainer: lightThemePalette.onErrorContainer,

    surface: lightThemePalette.surface,
    surfaceDim: lightThemePalette.surfaceDim,
    surfaceBright: lightThemePalette.surfaceBright,
    surfaceTint: lightThemePalette.surfaceTint,
    surfaceVariant: lightThemePalette.surfaceVariant,
    surfaceContainer: lightThemePalette.surfaceContainer,
    surfaceContainerLowest: lightThemePalette.surfaceContainerLowest,
    surfaceContainerLow: lightThemePalette.surfaceContainerLow,
    surfaceContainerHigh: lightThemePalette.surfaceContainerHigh,
    surfaceContainerHighest: lightThemePalette.surfaceContainerHighest,
    onSurface: lightThemePalette.onSurface,
    onSurfaceVariant: lightThemePalette.onSurfaceVariant,
    inverseSurface: lightThemePalette.inverseSurface,
    inverseOnSurface: lightThemePalette.inverseOnSurface,

    outline: lightThemePalette.outline,
    outlineVariant: lightThemePalette.outlineVariant,

    background: lightThemePalette.background,
    onBackground: lightThemePalette.onBackground,
  },
  dark: {
    primary: darkThemePalette.primary,
    onPrimary: darkThemePalette.onPrimary,
    primaryContainer: darkThemePalette.primaryContainer,
    onPrimaryContainer: darkThemePalette.onPrimaryContainer,
    inversePrimary: darkThemePalette.inversePrimary,

    primaryFixed: darkThemePalette.primaryFixed,
    primaryFixedDim: darkThemePalette.primaryFixedDim,
    onPrimaryFixed: darkThemePalette.onPrimaryFixed,
    onPrimaryFixedVariant: darkThemePalette.onPrimaryFixedVariant,

    secondary: darkThemePalette.secondary,
    onSecondary: darkThemePalette.onSecondary,
    secondaryContainer: darkThemePalette.secondaryContainer,
    onSecondaryContainer: darkThemePalette.onSecondaryContainer,

    secondaryFixed: darkThemePalette.secondaryFixed,
    secondaryFixedDim: darkThemePalette.secondaryFixedDim,
    onSecondaryFixed: darkThemePalette.onSecondaryFixed,
    onSecondaryFixedVariant: darkThemePalette.onSecondaryFixedVariant,

    tertiary: darkThemePalette.tertiary,
    onTertiary: darkThemePalette.onTertiary,
    tertiaryContainer: darkThemePalette.tertiaryContainer,
    onTertiaryContainer: darkThemePalette.onTertiaryContainer,

    tertiaryFixed: darkThemePalette.tertiaryFixed,
    tertiaryFixedDim: darkThemePalette.tertiaryFixedDim,
    onTertiaryFixed: darkThemePalette.onTertiaryFixed,
    onTertiaryFixedVariant: darkThemePalette.onTertiaryFixedVariant,

    error: darkThemePalette.error,
    onError: darkThemePalette.onError,
    errorContainer: darkThemePalette.errorContainer,
    onErrorContainer: darkThemePalette.onErrorContainer,

    surface: darkThemePalette.surface,
    surfaceDim: darkThemePalette.surfaceDim,
    surfaceBright: darkThemePalette.surfaceBright,
    surfaceTint: darkThemePalette.surfaceTint,
    surfaceVariant: darkThemePalette.surfaceVariant,
    surfaceContainer: darkThemePalette.surfaceContainer,
    surfaceContainerLowest: darkThemePalette.surfaceContainerLowest,
    surfaceContainerLow: darkThemePalette.surfaceContainerLow,
    surfaceContainerHigh: darkThemePalette.surfaceContainerHigh,
    surfaceContainerHighest: darkThemePalette.surfaceContainerHighest,
    onSurface: darkThemePalette.onSurface,
    onSurfaceVariant: darkThemePalette.onSurfaceVariant,
    inverseSurface: darkThemePalette.inverseSurface,
    inverseOnSurface: darkThemePalette.inverseOnSurface,

    outline: darkThemePalette.outline,
    outlineVariant: darkThemePalette.outlineVariant,

    background: darkThemePalette.background,
    onBackground: darkThemePalette.onBackground,
  },
};

export type ThemeColorsType = typeof themeColors.light;
