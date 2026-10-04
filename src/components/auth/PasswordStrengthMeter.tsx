import { StyleSheet, Text, View } from 'react-native';

import { Feather } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

import { useTheme } from '@/theme/useTheme';

interface Props {
  password: string;
}

export function PasswordStrengthMeter({ password }: Props) {
  const { colors, semantic, fonts, radius } = useTheme();
  const { t } = useTranslation();

  let strength = t('enum.passwordStrength.none');
  let color = colors.outlineVariant;
  let icon = 'shield';

  const hasMinLength = password.length >= 8;
  const hasSpecialOrNum = /[0-9!@#$%^&*]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);

  // Strength rules
  const meetsBasic = hasMinLength && hasSpecialOrNum;
  const meetsMedium =
    password.length >= 10 &&
    password.length <= 13 &&
    hasUppercase &&
    hasLowercase &&
    hasSpecialOrNum;
  const meetsStrong = password.length >= 14 && hasUppercase && hasLowercase && hasSpecialOrNum;

  if (password.length > 0) {
    if (meetsStrong) {
      strength = t('enum.passwordStrength.strong');
      color = semantic.success;
      icon = 'shield';
    } else if (meetsMedium) {
      strength = t('enum.passwordStrength.medium');
      color = semantic.warning;
      icon = 'shield';
    } else if (meetsBasic) {
      strength = t('enum.passwordStrength.weak');
      color = colors.error;
      icon = 'shield-off';
    } else {
      strength = t('enum.passwordStrength.weak');
      color = colors.error;
      icon = 'shield-off';
    }
  }

  const width =
    strength === t('enum.passwordStrength.none')
      ? '0%'
      : strength === t('enum.passwordStrength.weak')
        ? '33%'
        : strength === t('enum.passwordStrength.medium')
          ? '66%'
          : '100%';

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.label, { color, fontFamily: fonts.inter.semibold }]}>
          {t('common.passwordStrength', { strength })}
        </Text>
        <Feather name={icon as any} size={14} color={color} />
      </View>
      <View
        style={[
          styles.track,
          { backgroundColor: colors.surfaceVariant, borderRadius: radius.full },
        ]}
      >
        <View style={[styles.fill, { width, borderRadius: radius.full, backgroundColor: color }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 20, marginTop: -8 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  label: { fontSize: 10, lineHeight: 14, letterSpacing: 0.8 },
  track: { height: 6, overflow: 'hidden' },
  fill: { height: '100%' },
});
