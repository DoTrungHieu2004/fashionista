/* -------------------------------------------------------------------------- */
/*  Thematic palettes (Light / Dark)                                          */
/*  Same key shape on both — enforced below.                                  */
/* -------------------------------------------------------------------------- */

export const lightColors = {
  // Surfaces
  surface: '#fef7ff',
  surfaceDim: '#dfd7e5',
  surfaceBright: '#fef7ff',
  surfaceContainerLowest: '#ffffff',
  surfaceContainerLow: '#f9f1ff',
  surfaceContainer: '#f3ebf9',
  surfaceContainerHigh: '#ede5f3',
  surfaceContainerHighest: '#e8e0ee',
  surfaceVariant: '#e8e0ee',
  surfaceTint: '#7331df',

  // On-surface / inverse
  onSurface: '#1d1a24',
  onSurfaceVariant: '#4a4455',
  inverseSurface: '#332f39',
  inverseOnSurface: '#f6eefc',

  // Outline
  outline: '#7b7486',
  outlineVariant: '#ccc3d7',

  // Primary
  primary: '#5300b7',
  onPrimary: '#ffffff',
  primaryContainer: '#6d28d9',
  onPrimaryContainer: '#dac5ff',
  inversePrimary: '#d3bbff',

  // Secondary
  secondary: '#a43073',
  onSecondary: '#ffffff',
  secondaryContainer: '#fc79bd',
  onSecondaryContainer: '#76014e',

  // Tertiary
  tertiary: '#5b3912',
  onTertiary: '#ffffff',
  tertiaryContainer: '#765027',
  onTertiaryContainer: '#f9c592',

  // Error
  error: '#EF4444',
  onError: '#ffffff',
  errorContainer: '#ffdad6',
  onErrorContainer: '#93000a',

  // Fixed variants
  primaryFixed: '#ebddff',
  primaryFixedDim: '#d3bbff',
  onPrimaryFixed: '#250059',
  onPrimaryFixedVariant: '#5b00c5',
  secondaryFixed: '#ffd8e7',
  secondaryFixedDim: '#ffafd3',
  onSecondaryFixed: '#3d0026',
  onSecondaryFixedVariant: '#85145a',
  tertiaryFixed: '#ffdcbd',
  tertiaryFixedDim: '#f0bd8b',
  onTertiaryFixed: '#2c1600',
  onTertiaryFixedVariant: '#623f18',

  // Background
  background: '#fef7ff',
  onBackground: '#1d1a24',
} as const;

/** Shape shared by every thematic palette. */
export type ThemeColors = { [K in keyof typeof lightColors]: string };

export const darkColors = {
  // Surfaces
  surface: '#161121',
  surfaceDim: '#161121',
  surfaceBright: '#3c3648',
  surfaceContainerLowest: '#100b1b',
  surfaceContainerLow: '#1e1929',
  surfaceContainer: '#221d2e',
  surfaceContainerHigh: '#2d2739',
  surfaceContainerHighest: '#383244',
  surfaceVariant: '#383244',
  surfaceTint: '#d0bcff',

  // On-surface / inverse
  onSurface: '#e9def6',
  onSurfaceVariant: '#cbc3d7',
  inverseSurface: '#e9def6',
  inverseOnSurface: '#332e3f',

  // Outline
  outline: '#958ea0',
  outlineVariant: '#494454',

  // Primary
  primary: '#d0bcff',
  onPrimary: '#3c0091',
  primaryContainer: '#a078ff',
  onPrimaryContainer: '#340080',
  inversePrimary: '#6d3bd7',

  // Secondary
  secondary: '#ffaeda',
  onSecondary: '#5a1143',
  secondaryContainer: '#792c5d',
  onSecondaryContainer: '#fb9ad1',

  // Tertiary
  tertiary: '#ebbe93',
  onTertiary: '#452a0b',
  tertiaryContainer: '#b18962',
  onTertiaryContainer: '#3e2405',

  // Error
  error: '#ffb4ab',
  onError: '#690005',
  errorContainer: '#93000a',
  onErrorContainer: '#ffdad6',

  // Fixed variants
  primaryFixed: '#e9ddff',
  primaryFixedDim: '#d0bcff',
  onPrimaryFixed: '#23005c',
  onPrimaryFixedVariant: '#5516be',
  secondaryFixed: '#ffd8ea',
  secondaryFixedDim: '#ffaeda',
  onSecondaryFixed: '#3c002b',
  onSecondaryFixedVariant: '#762a5b',
  tertiaryFixed: '#ffdcbd',
  tertiaryFixedDim: '#ebbe93',
  onTertiaryFixed: '#2c1600',
  onTertiaryFixedVariant: '#5f401f',

  // Background
  background: '#161121',
  onBackground: '#e9def6',
} as const satisfies ThemeColors;

/* -------------------------------------------------------------------------- */
/*  Semantic palette — theme-independent                                      */
/* -------------------------------------------------------------------------- */

export const semanticColors = {
  hover: '#5b21b6',
  success: '#22c55e',
  warning: '#f59e0b',
  info: '#3b82f6',
} as const;

export type SemanticColors = typeof semanticColors;

/* -------------------------------------------------------------------------- */
/*  Neutral palette — theme-independent, 11-step scale                        */
/* -------------------------------------------------------------------------- */

export const neutralColors = {
  50: '#fafafa',
  100: '#f4f4f5',
  200: '#e4e4e7',
  300: '#d4d4d8',
  400: '#a1a1aa',
  500: '#71717a',
  600: '#52525b',
  700: '#3f3f46',
  800: '#27272a',
  900: '#18181b',
  950: '#09090b',
} as const;

export type NeutralColors = typeof neutralColors;
