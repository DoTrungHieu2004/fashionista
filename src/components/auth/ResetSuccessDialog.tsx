import { useEffect, useState } from 'react';
import { Animated, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Feather } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

import { useTheme } from '@/theme/useTheme';
import { withOpacity } from '@/utils/color';

interface Props {
  visible: boolean;
  onGoToLogin: () => void;
}

export function ResetSuccessDialog({ visible, onGoToLogin }: Props) {
  const { colors, neutral, fonts, spacing, radius } = useTheme();
  const { t } = useTranslation();

  const [scaleAnim] = useState(() => new Animated.Value(0));
  const [fadeAnim] = useState(() => new Animated.Value(0));

  useEffect(() => {
    if (visible) {
      scaleAnim.setValue(0);
      fadeAnim.setValue(0);
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 4,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, scaleAnim, fadeAnim]);

  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={() => {}}>
      <View style={[styles.overlay, { padding: spacing.gutterDesktop }]}>
        <Animated.View
          style={[
            styles.dialog,
            {
              backgroundColor: colors.surfaceContainerLowest,
              borderRadius: radius.xl,
              padding: spacing.marginTablet,
            },
          ]}
        >
          {/* Blooming tick circle */}
          <View style={[styles.iconContainer, { marginBottom: spacing.lg }]}>
            <Animated.View
              style={[
                styles.iconOuterCircle,
                {
                  backgroundColor: withOpacity(colors.primary, 0.2),
                  transform: [{ scale: scaleAnim }],
                },
              ]}
            />
            <View
              style={[
                styles.iconInnerCircle,
                { borderRadius: radius.xl, backgroundColor: colors.primary },
              ]}
            >
              <Feather name="check" size={32} color={neutral[50]} />
            </View>
          </View>

          <Text
            style={[
              styles.title,
              { color: colors.onSurface, fontFamily: fonts.montserrat.semibold },
            ]}
          >
            {t('dialogs.passwordResetSuccess.title')}
          </Text>
          <Text
            style={[
              styles.message,
              {
                color: colors.onSurfaceVariant,
                fontFamily: fonts.inter.regular,
                marginBottom: spacing.marginTablet,
              },
            ]}
          >
            {t('dialogs.passwordResetSuccess.message')}
          </Text>

          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor: colors.primary,
                paddingHorizontal: spacing.lg,
                borderRadius: spacing.sm,
                gap: spacing.sm,
              },
            ]}
            onPress={onGoToLogin}
          >
            <Text
              style={[styles.buttonText, { color: neutral[50], fontFamily: fonts.inter.semibold }]}
            >
              {t('buttons.go-to-login')}
            </Text>
            <Feather name="arrow-right" size={18} color={neutral[50]} />
          </TouchableOpacity>
        </Animated.View>
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
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  iconContainer: { width: 80, height: 80, justifyContent: 'center', alignItems: 'center' },
  iconOuterCircle: { position: 'absolute', width: 80, height: 80, borderRadius: 40 },
  iconInnerCircle: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  title: {
    fontSize: 28,
    lineHeight: 36,
    letterSpacing: -0.7,
    marginBottom: 12,
    textAlign: 'center',
  },
  message: { fontSize: 16, lineHeight: 26, textAlign: 'center' },
  button: {
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  buttonText: { fontSize: 20, lineHeight: 28 },
});
