import { useEffect } from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { type TabDefinition } from '@/constants/tabs';
import { useTheme } from '@/theme/useTheme';
import { withOpacity } from '@/utils/color';

interface Props {
  tab: TabDefinition;
  focused: boolean;
  onPress: () => void;
}

/**
 * A single tab item. Animates on focus change:
 *
 * - Icon scales 1 → 1.15 with a spring (damping 16, stiffness 200).
 * - Label + icon color crossfade between `onSurfaceVariant` and `primary`
 *   via `interpolateColor` (GPU-driven, no JS re-render per frame).
 * - Label weight snaps (fontFamily isn't interpolatable) — a deliberate
 *   hard cut so the animated color stays smooth.
 *
 * All animation values live in shared values; React only re-renders on
 * `focused` flips, never per frame.
 */
export function AnimatedTabItem({ tab, focused, onPress }: Props) {
  const { colors, fonts, radius } = useTheme();
  const { t } = useTranslation();

  // 0 = inactive, 1 = focused. Spring eases between them.
  const progress = useSharedValue(focused ? 1 : 0);

  useEffect(() => {
    progress.value = withSpring(focused ? 1 : 0, {
      damping: 16,
      stiffness: 200,
      mass: 0.8,
      reduceMotion: ReduceMotion.System,
    });
  }, [focused, progress]);

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: interpolate(progress.value, [0, 1], [1, 1.15], Extrapolation.CLAMP) }],
  }));

  const tintStyle = useAnimatedStyle(() => ({
    color: interpolateColor(progress.value, [0, 1], [colors.onSurfaceVariant, colors.primary]),
  }));

  return (
    <Pressable
      onPress={onPress}
      style={styles.item}
      accessibilityRole="tab"
      accessibilityState={{ selected: focused }}
      accessibilityLabel={t(tab.labelKey)}
      hitSlop={{ top: 8, bottom: 8, left: 4, right: 4 }}
      android_ripple={{
        color: withOpacity(colors.primary, 0.12),
        borderless: true,
        radius: 40,
      }}
    >
      <Animated.View style={iconStyle}>
        <Animated.Text style={tintStyle}>
          <Ionicons name={focused ? tab.iconFocused : tab.icon} size={22} />
        </Animated.Text>
      </Animated.View>

      <Animated.Text
        numberOfLines={1}
        style={[
          styles.label,
          { fontFamily: focused ? fonts.inter.semibold : fonts.inter.medium },
          tintStyle,
        ]}
      >
        {t(tab.labelKey)}
      </Animated.Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 4 },
  label: { fontSize: 10, lineHeight: 14, letterSpacing: 0.4, marginTop: 2 },
});
