import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

import { useTheme } from '@/theme/useTheme';

type ShortcutId = 'newArrivals' | 'trendingNow' | 'bestSellers' | 'recentlyViewed';

interface Shortcut {
  id: ShortcutId;
  labelKey: string;
  icon: React.ReactNode;
  activeIconColor: string;
  inactiveIconColor: string;
}

interface ShoppingShortcutsProps {
  onShortcutPress?: (id: ShortcutId) => void;
}

export function ShoppingShortcuts({ onShortcutPress }: ShoppingShortcutsProps) {
  const { colors, fonts, spacing, radius } = useTheme();
  const { t } = useTranslation();

  const [activeId, setActiveId] = useState<ShortcutId>('newArrivals');

  const handlePress = (id: ShortcutId) => {
    setActiveId(id);
    onShortcutPress?.(id);
  };

  const SHORTCUTS: Shortcut[] = [
    {
      id: 'newArrivals',
      labelKey: 'mainTabs.home.shortcuts.new-arrivals',
      icon: (
        <View
          style={[
            styles.dotIcon,
            {
              borderRadius: radius.sm,
              backgroundColor: colors.secondaryContainer,
              marginHorizontal: spacing.xs,
            },
          ]}
        />
      ),
      activeIconColor: colors.primary,
      inactiveIconColor: colors.primary,
    },
    {
      id: 'trendingNow',
      labelKey: 'mainTabs.home.shortcuts.trending-now',
      icon: <MaterialCommunityIcons name="fire" size={16} />,
      activeIconColor: colors.onPrimary,
      inactiveIconColor: colors.secondary,
    },
    {
      id: 'bestSellers',
      labelKey: 'mainTabs.home.shortcuts.best-sellers',
      icon: <MaterialCommunityIcons name="medal-outline" size={16} />,
      activeIconColor: colors.onPrimary,
      inactiveIconColor: colors.tertiary,
    },
    {
      id: 'recentlyViewed',
      labelKey: 'mainTabs.home.shortcuts.recently-viewed',
      icon: <Feather name="clock" size={16} />,
      activeIconColor: colors.onPrimary,
      inactiveIconColor: colors.onSurfaceVariant,
    },
  ];

  return (
    <View style={{ marginTop: spacing.lg }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {SHORTCUTS.map((shortcut) => {
          const isActive = activeId === shortcut.id;

          return (
            <TouchableOpacity
              key={shortcut.id}
              style={[
                styles.pill,
                { paddingHorizontal: spacing.gutter, borderRadius: radius.full },
                isActive ? { backgroundColor: colors.primary } : styles.pillInactive,
                {
                  backgroundColor: colors.surfaceContainerHigh,
                  borderColor: colors.surfaceVariant,
                },
              ]}
              activeOpacity={0.7}
              onPress={() => handlePress(shortcut.id)}
              accessibilityRole="button"
            >
              {/* Clone and icon element to pass dynamic color */}
              {React.cloneElement(shortcut.icon as React.ReactElement, {
                color: isActive ? shortcut.activeIconColor : shortcut.inactiveIconColor,
              })}

              <Text
                style={[styles.label, { fontFamily: fonts.inter.medium, color: colors.onSurface }]}
              >
                {t(shortcut.labelKey)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  dotIcon: { width: 8, height: 8 },
  scrollContent: { paddingHorizontal: 20, gap: 10 },
  pill: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, gap: 6 },
  pillInactive: { borderWidth: 1 },
  label: { fontSize: 12, lineHeight: 16, letterSpacing: 0.6 },
});
