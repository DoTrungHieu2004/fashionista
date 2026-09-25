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
export const images = {} as const;

export type Images = { [K in keyof typeof images]: ImageSourcePropType };

export type AppImages = typeof images;
