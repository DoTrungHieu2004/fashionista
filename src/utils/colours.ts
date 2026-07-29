export type OpacityPercentage = 100 | 90 | 80 | 70 | 60 | 50 | 40 | 30 | 20 | 15 | 10 | 5 | 0;

const OPACITY_MAP: Record<OpacityPercentage, string> = {
  100: 'FF',
  90: 'E6',
  80: 'CC',
  70: 'B3',
  60: '99',
  50: '80',
  40: '66',
  30: '4D',
  20: '33',
  15: '26',
  10: '1A',
  5: '0D',
  0: '00',
};

/**
 * Appends an opacity value to a 6-digit hex colour.
 *
 * @param hexColor - Base hex colour (e.g. '#3498db').
 * @param percentage - Opacity percentage.
 * @returns An 8-digit hex colour (e.g. '#3498db33').
 *
 * @example
 * // React Native
 * <View
 *   style={{
 *     backgroundColor: addOpacity('#3498db', 20),
 *   }}
 * />
 *
 * @example
 * // With a theme colour
 * const styles = StyleSheet.create({
 *   card: {
 *     backgroundColor: addOpacity(colors.primary, 10),
 *     borderColor: addOpacity(colors.primary, 30),
 *     borderWidth: 1,
 *   },
 * });
 */
export const addOpacity = (hexColor: string, percentage: OpacityPercentage): string => {
  const cleanHex = hexColor.startsWith('#') ? hexColor.slice(1) : hexColor;
  const opacityHex = OPACITY_MAP[percentage];
  return `#${cleanHex}${opacityHex}`;
};
