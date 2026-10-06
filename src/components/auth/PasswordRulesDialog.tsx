import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Feather } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

import { authStyles } from '@/screens/auth/authStyles';
import { useTheme } from '@/theme/useTheme';

interface Props {
  visible: boolean;
  onClose: () => void;
}

export function PasswordRulesDialog({ visible, onClose }: Props) {
  const { colors, neutral, fonts, spacing, radius } = useTheme();
  const { t } = useTranslation();

  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <View style={[styles.overlay, { padding: spacing.gutterDesktop }]}>
        <View
          style={[
            styles.dialog,
            {
              backgroundColor: colors.surfaceContainerLowest,
              borderRadius: radius.xl,
              padding: spacing.lg,
            },
          ]}
        >
          <View style={[styles.header, { marginBottom: spacing.md }]}>
            <Feather name="lock" size={24} color={colors.primary} />
            <Text
              style={[styles.title, { color: colors.onSurface, fontFamily: fonts.montserrat.bold }]}
            >
              {t('dialogs.passwordRules.title')}
            </Text>
          </View>

          <Text
            style={[
              styles.message,
              {
                color: colors.onSurfaceVariant,
                fontFamily: fonts.inter.medium,
                marginBottom: spacing.md,
              },
            ]}
          >
            {t('dialogs.passwordRules.message')}
          </Text>

          <View style={{ marginBottom: spacing.gutterDesktop, gap: spacing.sm }}>
            <Text
              style={[
                styles.ruleItem,
                { color: colors.onSurface, fontFamily: fonts.inter.regular },
              ]}
            >
              {t('dialogs.passwordRules.rule-1')}
            </Text>
            <Text
              style={[
                styles.ruleItem,
                { color: colors.onSurface, fontFamily: fonts.inter.regular },
              ]}
            >
              {t('dialogs.passwordRules.rule-2')}
            </Text>
            <Text
              style={[
                styles.ruleItem,
                { color: colors.onSurface, fontFamily: fonts.inter.regular },
              ]}
            >
              {t('dialogs.passwordRules.rule-3')}
            </Text>
          </View>

          <TouchableOpacity
            style={[
              authStyles.primaryButton,
              { backgroundColor: colors.primary, marginTop: spacing.sm, gap: spacing.sm },
            ]}
          >
            <Text
              style={[
                authStyles.primaryButtonText,
                { color: neutral[50], fontFamily: fonts.inter.semibold },
              ]}
              onPress={onClose}
            >
              {t('buttons.got-it')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialog: {
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  header: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  title: { fontSize: 20 },
  message: { fontSize: 15, lineHeight: 22 },
  ruleItem: { fontSize: 14, lineHeight: 20 },
});
