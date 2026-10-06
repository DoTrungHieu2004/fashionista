import { StyleSheet, Text, View } from 'react-native';

import { Feather } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

import { useTheme } from '@/theme/useTheme';

interface Props {
  password: string;
  confirmPassword: string;
}

export function PasswordConditionsBox({ password, confirmPassword }: Props) {
  const { colors, fonts, spacing } = useTheme();
  const { t } = useTranslation();

  const hasMinLength = password.length >= 8;
  const hasSpecialOrNum = /[0-9!@#$%^&*]/.test(password);
  const passwordsMatch = password === confirmPassword && password.length > 0;

  const ConditionItem = ({ met, text }: { met: boolean; text: string }) => {
    return (
      <View style={styles.item}>
        <Feather
          name={met ? 'check-circle' : 'circle'}
          size={16}
          color={met ? colors.primary : colors.outline}
        />
        <Text
          style={[
            styles.text,
            { color: colors.onSurfaceVariant, fontFamily: fonts.inter.regular },
            met && { color: colors.primary, fontFamily: fonts.inter.medium },
          ]}
        >
          {text}
        </Text>
      </View>
    );
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.surfaceContainerLow,
          padding: spacing.gutter,
          marginBottom: spacing.lg,
        },
      ]}
    >
      <ConditionItem met={hasMinLength} text={t('common.passwordConditions.8-chars')} />
      <ConditionItem met={hasSpecialOrNum} text={t('common.passwordConditions.1-num-or-spec')} />
      <ConditionItem met={passwordsMatch} text={t('common.passwordConditions.match')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { borderRadius: 12, gap: 12 },
  item: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  text: { fontSize: 14, lineHeight: 20 },
});
