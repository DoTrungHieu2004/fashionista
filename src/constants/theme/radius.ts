/**
 * Corner radii in dp. `rem` values from the spec are converted at 16px/rem.
 */
export const radius = {
  /** 0.25rem → 4  — small inputs, tags. */
  sm: 4,
  /** 0.5rem  → 8  — DEFAULT: buttons, inputs, standard elements. */
  base: 8,
  /** 0.75rem → 12 — medium containers. */
  md: 12,
  /** 1rem    → 16 — product cards, banners, large containers. */
  lg: 16,
  /** 1.5rem  → 24 — bottom sheets, modals. */
  xl: 24,
  /** Pill — chips, search bars, avatars. */
  full: 9999,
} as const;

export type Radius = typeof radius;
