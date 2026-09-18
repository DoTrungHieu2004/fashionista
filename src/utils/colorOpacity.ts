/**
 * Adds an opacity value to a hexadecimal color.
 *
 * @param hex - A 3, 4, 6, or 8-digit hexadecimal color.
 * @param opacity - Opacity between 0 and 1.
 *
 * @returns An 8-digit hexadecimal color containing the alpha channel.
 *
 * @example
 * hexWithOpacity('#8B5CF6', 0.2);
 * // '#8B5CF633'
 *
 * @example
 * hexWithOpacity('#FFFFFF', 0.1);
 * // '#FFFFFF1A'
 */
export function hexWithOpacity(hex: string, opacity: number): string {
  if (!/^#([A-Fa-f0-9]{3,4}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/.test(hex)) {
    throw new Error(`Invalid hexadecimal color: ${hex}`);
  }

  if (opacity < 0 || opacity > 1) {
    throw new Error(`Opacity must be between 0 and 1. Received: ${opacity}`);
  }

  const normalizedHex = normalizeHex(hex);

  // Preserve an existing RGB value and replace its alpha.
  const alpha = Math.round(opacity * 255)
    .toString(16)
    .padStart(2, '0')
    .toUpperCase();

  return `${normalizedHex.slice(0, 7)}${alpha}`;
}

function normalizeHex(hex: string): string {
  const value = hex.slice(1);

  if (value.length === 3 || value.length === 4) {
    return `#${value
      .slice(0, 3)
      .split('')
      .map((char) => char + char)
      .join('')}`;
  }

  return `#${value.slice(0, 6)}`;
}
