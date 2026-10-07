import { type ComponentProps } from 'react';

import { type Ionicons } from '@expo/vector-icons';

import { type MainTabKey } from '@/navigation/types';

/** Union of every valid Ionicons glyph name. */
export type IoniconName = ComponentProps<(typeof Ionicons)['name']>;

export interface TabDefinition {
  /** Route key — also the value held by `activeTab`. */
  key: MainTabKey;
  /** i18n key under the `tabs.*` namespace. */
  labelKey: `common.navs.${Lowercase<MainTabKey>}`;
  icon: IoniconName;
  iconFocused: IoniconName;
}

/**
 * Tab order is literal — reorder this array to reorder the bar.
 * Icons use the Ionicons "outline / filled" pairing: outline for
 * inactive, filled for active. This is a widely-recognised pattern
 * for mobile tab bars.
 */
export const TABS: readonly TabDefinition[] = [
  { key: 'Home', labelKey: 'common.navs.home', icon: 'home-outline', iconFocused: 'home' },
  {
    key: 'Mall',
    labelKey: 'common.navs.mall',
    icon: 'storefront-outline',
    iconFocused: 'storefront',
  },
  {
    key: 'Wishlist',
    labelKey: 'common.navs.wishlist',
    icon: 'heart-outline',
    iconFocused: 'heart',
  },
  {
    key: 'Orders',
    labelKey: 'common.navs.orders',
    icon: 'receipt-outline',
    iconFocused: 'receipt',
  },
  {
    key: 'Profile',
    labelKey: 'common.navs.profile',
    icon: 'person-outline',
    iconFocused: 'person',
  },
] as const;

/** App launch tab. */
export const DEFAULT_TAB: MainTabKey = 'Home';
