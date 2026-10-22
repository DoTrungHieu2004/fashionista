import { type ComponentType } from 'react';

import { HomeScreen } from '@/screens';
import { PlaceholderScreen } from '@/screens/placeholder/PlaceholderScreen';

import { type MainTabKey } from './types';

/**
 * Maps every tab key to its screen component.
 *
 * The map is total (`Record<MainTabKey, …>`) — adding a new tab to
 * `MainTabParamList` without registering a screen here is a compile error.
 */
export const TAB_REGISTRY: Record<MainTabKey, ComponentType> = {
  Home: HomeScreen,
  Mall: () => <PlaceholderScreen tabKey="Mall" />,
  Wishlist: () => <PlaceholderScreen tabKey="Wishlist" />,
  Orders: () => <PlaceholderScreen tabKey="Orders" />,
  Profile: () => <PlaceholderScreen tabKey="Profile" />,
};
