export const LIGHT_IMAGES = {
  logo: require('../../../assets/logos/fashionista-logo-light.png'),
} as const;

export const DARK_IMAGES = {
  logo: require('../../../assets/logos/fashionista-logo-light.png'),
} as const;

export const getThemeImages = (scheme: 'light' | 'dark') => {
  return scheme === 'dark' ? DARK_IMAGES : LIGHT_IMAGES;
};
