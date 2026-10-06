import { type ImageSourcePropType } from 'react-native';

/**
 * Image assets that render identically in light and dark mode — product
 * photos, category illustrations, brand marks that already work on both
 * surfaces. For anything that must swap by theme, use `themed-images.ts`.
 *
 * @example
 * import { images } from '@/constants/images';
 * <Image source={images.placeholder} style={{ width: 80, height: 80 }} />
 */
export const images = {
  googleIcon: require('@/src-assets/icons/google.png') as ImageSourcePropType,
  facebookIcon: require('@/src-assets/icons/facebook.png') as ImageSourcePropType,
  appleIcon: require('@/src-assets/icons/apple.png') as ImageSourcePropType,
  heroForgotPassImage: require('@/src-assets/heroes/forgot_pass_hero.png') as ImageSourcePropType,
  heroResetPassImage: require('@/src-assets/heroes/reset_pass_hero.png') as ImageSourcePropType,
  defaultAvatar: require('@/src-assets/default_avatar.png') as ImageSourcePropType,
} as const;

export type Images = { [K in keyof typeof images]: ImageSourcePropType };

export type AppImages = typeof images;
