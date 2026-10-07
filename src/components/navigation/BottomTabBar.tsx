import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { BlurView } from 'expo-blur';

import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TABS } from '@/constants/tabs';
import { type MainTabKey } from '@/navigation/types';
import { useTheme } from '@/theme/useTheme';
import { withOpacity } from '@/utils/color';

import { AnimatedTabItem } from './AnimatedTabItem';

interface Props {
  activeTab: MainTabKey;
  onTabPress: (key: MainTabKey) => void;
}

/**
 * Fully custom bottom navigation. No library navigator — parent holds
 * `activeTab` state and passes it down.
 *
 * Visuals per the design system:
 * - Dark mode: frosted glass — semi-transparent surface + 60-intensity blur,
 *   1px top border at 8% white.
 * - Light mode: soft surface + diffused plum-tinted shadow (blur 20, y -4).
 */
export function BottomTabBar({ activeTab, onTabPress }: Props) {
  const { colors, isDark, radius, spacing } = useTheme();
  const insets = useSafeAreaInsets();

  const [rowWidth, setRowWidth] = useState(0);
  const itemWidth = rowWidth / TABS.length;

  const activeIndex = TABS.findIndex((tab) => tab.key === activeTab);
  const animatedIndex = useSharedValue(activeIndex);

  useEffect(() => {
    animatedIndex.value = withSpring(activeIndex, {
      damping: 18,
      stiffness: 180,
      mass: 0.9,
    });
  }, [activeIndex, animatedIndex]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: animatedIndex.value * itemWidth }],
    width: itemWidth,
  }));

  const bottomPadding = Math.max(insets.bottom, spacing.sm);

  return (
    <BlurView
      intensity={isDark ? 60 : 30}
      tint={isDark ? 'dark' : 'light'}
      style={[
        styles.container,
        {
          paddingBottom: bottomPadding,
          borderTopColor: isDark ? withOpacity('#ffffff', 0.08) : colors.outlineVariant,
          backgroundColor: isDark
            ? withOpacity(colors.surfaceContainerHigh, 0.72)
            : withOpacity(colors.surface, 0.9),
        },
        !isDark && {
          shadowColor: colors.primary,
        },
      ]}
    >
      <View
        style={[styles.row, { paddingTop: spacing.sm, paddingHorizontal: spacing.gutter }]}
        onLayout={(e) => setRowWidth(e.nativeEvent.layout.width)}
      >
        {rowWidth > 0 ? (
          <Animated.View style={[styles.indicatorTrack, indicatorStyle]} pointerEvents="none">
            <View
              style={[
                styles.rowWidth,
                {
                  borderRadius: radius.full,
                  backgroundColor: colors.primary,
                },
              ]}
            />
          </Animated.View>
        ) : null}

        {TABS.map((tab) => (
          <AnimatedTabItem
            key={tab.key}
            tab={tab}
            focused={tab.key === activeTab}
            onPress={() => onTabPress(tab.key)}
          />
        ))}
      </View>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: StyleSheet.hairlineWidth,
    shadowOpacity: 0.06,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: -4 },
    elevation: 8,
  },
  row: { flexDirection: 'row' },
  rowWidth: { width: 24, height: 2 },
  indicatorTrack: { position: 'absolute', top: 0, left: 0, alignItems: 'center' },
});
