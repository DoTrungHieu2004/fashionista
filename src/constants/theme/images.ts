export const LIGHT_IMAGES = {
  logo: require('../../../assets/logos/fashionista-logo-light.png'),
  gradientBackground: require('../../../assets/backgrounds/gradient-light.png'),
} as const;

export const DARK_IMAGES = {
  logo: require('../../../assets/logos/fashionista-logo-light.png'),
  gradientBackground: require('../../../assets/backgrounds/gradient-dark.png'),
} as const;

// Individual images
export const GOOGLE_ICON = require('../../../assets/icons/google.png');
export const FACEBOOK_ICON = require('../../../assets/icons/facebook.png');
export const APPLE_ICON = require('../../../assets/icons/apple.png');

export const getThemeImages = (scheme: 'light' | 'dark') => {
  return scheme === 'dark' ? DARK_IMAGES : LIGHT_IMAGES;
};
