const HEX_RE = /^#?([0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i;

/**
 * Attach an alpha channel to a hex color, returning an 8-digit hex string.
 *
 * Accepts `#RGB`, `#RGBA`, `#RRGGBB`, or `#RRGGBBAA` — with or without the
 * leading `#`. Any pre-existing alpha channel is **overwritten**, not
 * multiplied.
 *
 * @param hex      Hex color, e.g. `'#5300b7'`, `'#fff'`, `'5300b7'`.
 * @param opacity  Alpha in `[0, 1]`. `0` = fully transparent, `1` = opaque.
 * @returns        Lowercase 8-digit hex, e.g. `'#5300b780'`.
 * @throws         If `hex` is malformed or `opacity` is outside `[0, 1]`.
 *
 * @example
 * withOpacity('#5300b7', 0.5);          // '#5300b780'
 * withOpacity('#fff', 0.1);             // '#ffffff1a'
 * withOpacity('5300b7', 1);             // '#5300b7ff'
 * withOpacity('#5300b7ff', 0.25);       // '#5300b740'  (alpha replaced)
 *
 * @example
 * // Tinting a theme color for hover / pressed states:
 * import { lightColors } from '@/constants/colors';
 * withOpacity(lightColors.primary, 0.08); // '#5300b714'
 */
export function withOpacity(hex: string, opacity: number): string {
  if (typeof hex !== 'string' || !HEX_RE.test(hex)) {
    throw new Error(`withOpacity: invalid hex color "${hex}"`);
  }
  if (Number.isNaN(opacity) || opacity < 0 || opacity > 1) {
    throw new Error(`withOpacity: opacity must be within [0, 1], got ${opacity}`);
  }

  const raw = hex.startsWith('#') ? hex.slice(1) : hex;
  const rgb =
    raw.length === 3 || raw.length === 4
      ? raw
          .slice(0, 3)
          .split('')
          .map((c) => c + c)
          .join('')
      : raw.slice(0, 6);

  const alpha = Math.round(opacity * 255)
    .toString(16)
    .padStart(2, '0');

  return `#${rgb.toLowerCase()}${alpha}`;
}
