export const themeImages = {
  light: {
    logo: require('../../assets/images/logos/fashionista-logo-light.png'),
    gradientBackground: require('../../assets/images/backgrounds/gradient-light.png'),
  },
  dark: {
    logo: require('../../assets/images/logos/fashionista-logo-dark.png'),
    gradientBackground: require('../../assets/images/backgrounds/gradient-dark.png'),
  },
};

export type ThemeImagesType = typeof themeImages.light;
