/**
 * 8px-based rhythm. All values are React Native density-independent
 * pixels (dp) — no unit suffixes.
 */
export const spacing = {
  /** Base unit — every other rhythm token is a multiple. */
  unit: 8,

  /* ---- Stack rhythm (vertical spacing between elements / sections) ---- */
  /** 4  — metadata pairs (title + price). */
  xs: 4,
  /** 8  — tightly-related siblings. */
  sm: 8,
  /** 16 — default gap between related blocks. */
  md: 16,
  /** 24 — between subsections. */
  lg: 24,
  /** 48 — between major content sections (e.g. "Recommended" vs "New In"). */
  xl: 48,

  /* ---- Container layout ---- */
  /** Screen edge padding — mobile (and fallback for all sizes). */
  containerMargin: 20,
  /** Screen edge padding — tablet (≥ 600px). */
  marginTablet: 32,
  /** Screen edge padding — desktop (≥ 1024px). */
  marginDesktop: 64,
  /** Column gap — mobile / tablet. */
  gutter: 16,
  /** Column gap — desktop. */
  gutterDesktop: 24,
  /** Max content width on wide viewports. */
  containerMax: 1280,
} as const;

export type Spacing = typeof spacing;
