import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

import { useTheme } from '@/theme/useTheme';

interface TopBarProps {
  hasUnreadNotifications?: boolean;
  onAiAssistantPress?: () => void;
  onNotificationsPress?: () => void;
}

export function TopBar({
  hasUnreadNotifications = true,
  onAiAssistantPress,
  onNotificationsPress,
}: TopBarProps) {
  const { colors, fonts, spacing, radius } = useTheme();
  const { t } = useTranslation();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.brandContainer}>
        <Text
          style={[
            styles.brandText,
            { color: colors.primaryContainer, fontFamily: fonts.montserrat.semibold },
          ]}
        >
          FASHIONISTA
        </Text>
      </View>

      <View style={[styles.actionsContainer, { gap: spacing.gutter }]}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={onAiAssistantPress}
          accessibilityLabel={t('accessibilityLabels.ai-assistant')}
          accessibilityRole="button"
        >
          <MaterialCommunityIcons name="creation" size={22} color={colors.onSurfaceVariant} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconButton}
          onPress={onNotificationsPress}
          accessibilityLabel={
            hasUnreadNotifications
              ? t('accessibilityLabels.unread-notifications')
              : t('accessibilityLabels.notifications')
          }
          accessibilityRole="button"
        >
          <Feather name="bell" size={22} color={colors.onSurfaceVariant} />
          {hasUnreadNotifications && (
            <View
              style={[
                styles.unreadDot,
                {
                  borderRadius: radius.full,
                  backgroundColor: colors.error,
                  borderColor: colors.background,
                },
              ]}
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  brandContainer: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  brandText: { fontSize: 18, letterSpacing: 3.6 },
  actionsContainer: { flexDirection: 'row', alignItems: 'center' },
  iconButton: { position: 'relative' },
  unreadDot: {
    position: 'absolute',
    top: -1,
    right: -1,
    width: 9,
    height: 9,
    borderWidth: 1.5,
  },
});
