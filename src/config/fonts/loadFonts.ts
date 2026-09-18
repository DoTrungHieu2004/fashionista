import { useFonts } from 'expo-font';

import { fontAssets } from './fonts';

export function useAppFonts() {
  return useFonts(fontAssets);
}
