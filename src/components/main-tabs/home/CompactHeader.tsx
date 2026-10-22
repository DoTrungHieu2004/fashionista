import { useMemo } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Feather } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

import { useTheme } from '@/theme/useTheme';
import { type User } from '@/types';

const TITLE_KEYS = [
  'mainTabs.home.titles.curated-for-you',
  'mainTabs.home.titles.just-for-you',
  'mainTabs.home.titles.your-personal-edit',
  'mainTabs.home.titles.style-inspiration',
  'mainTabs.home.titles.trending-picks',
];

const getGreetingKey = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return 'mainTabs.home.greetings.morning';
  if (hour >= 12 && hour < 17) return 'mainTabs.home.greetings.afternoon';
  return 'mainTabs.home.greetings.evening';
};

interface CompactHeaderProps {
  user: User;
  onAvatarPress?: () => void;
  onSearchPress?: () => void;
  onVisualSearchPress?: () => void;
  onFilterPress?: () => void;
}

export function CompactHeader({
  user,
  onAvatarPress,
  onSearchPress,
  onVisualSearchPress,
  onFilterPress,
}: CompactHeaderProps) {
  const { colors, neutral, semantic, fonts, spacing, radius } = useTheme();
  const { t } = useTranslation();

  // Picked one per mount (i.e., per app open). Stable for the session.
  const titleKey = useMemo(() => TITLE_KEYS[Math.floor(Math.random() * TITLE_KEYS.length)], []);
  const greetingKey = useMemo(() => getGreetingKey(), []);

  const statusColor = user.status === 'active' ? semantic.success : neutral[800];

  return (
    <View style={[styles.container, { paddingTop: spacing.sm, paddingBottom: spacing.md }]}>
      {/* Greeting row */}
      <View style={[styles.greetingRow, { marginBottom: spacing.md }]}>
        <TouchableOpacity
          onPress={onAvatarPress}
          accessibilityLabel={t('accessibilityLabels.profile-avatar')}
          accessibilityRole="button"
          style={styles.avatarWrapper}
        >
          <Image
            source={{ uri: user.avatarUrl }}
            style={[
              styles.avatar,
              { borderRadius: radius.full, backgroundColor: colors.surfaceContainerHigh },
            ]}
          />
          <View
            style={[
              styles.statusDot,
              {
                borderRadius: radius.full,
                backgroundColor: statusColor,
                borderColor: colors.background,
              },
            ]}
          />
        </TouchableOpacity>

        <View style={styles.greetingTextContainer}>
          <Text
            style={[
              styles.greetingText,
              { color: colors.onSurfaceVariant, fontFamily: fonts.inter.medium },
            ]}
            numberOfLines={1}
          >
            {t(greetingKey)}, {user.name}
          </Text>
          <Text
            style={[
              styles.titleText,
              { color: colors.onSurface, fontFamily: fonts.montserrat.semibold },
            ]}
            numberOfLines={1}
          >
            {t(titleKey)}
          </Text>
        </View>
      </View>

      {/* Search bar */}
      <TouchableOpacity
        style={[
          styles.searchBar,
          { borderRadius: radius.md, backgroundColor: colors.surfaceContainerLow },
        ]}
        activeOpacity={0.8}
        onPress={onSearchPress}
        accessibilityRole="search"
      >
        <Feather name="search" size={18} color={colors.outline} />
        <Text
          style={[
            styles.searchPlaceholder,
            { color: colors.outline, fontFamily: fonts.inter.regular },
          ]}
        >
          {t('placeholders.search')}
        </Text>

        <TouchableOpacity
          onPress={onVisualSearchPress}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          accessibilityLabel={t('accessibilityLabels.visual-search')}
        >
          <Feather name="camera" size={18} color={colors.onSurfaceVariant} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onFilterPress}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          accessibilityLabel={t('accessibilityLabels.filter')}
        >
          <Feather name="sliders" size={18} color={colors.onSurfaceVariant} />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20 },
  greetingRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatarWrapper: { position: 'relative' },
  avatar: { width: 48, height: 48 },
  statusDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 13,
    height: 13,
    borderWidth: 2,
  },
  greetingTextContainer: { flex: 1 },
  greetingText: { fontSize: 12, lineHeight: 16, letterSpacing: 0.8 },
  titleText: { fontSize: 20, lineHeight: 24, letterSpacing: -0.6 },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 10,
  },
  searchPlaceholder: { flex: 1, fontSize: 14 },
});
