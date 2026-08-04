import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Feather } from '@expo/vector-icons';

import { useTheme } from '../theme/ThemeProvider';

interface Props {
  hasLength: boolean;
  hasSpecialChar: boolean;
  passwordsMatch: boolean;
}

const PasswordConditions: React.FC<Props> = ({ hasLength, hasSpecialChar, passwordsMatch }) => {
  const { colours, spacing, rounded, fonts } = useTheme();
  const { t } = useTranslation();

  const conditions = [
    { id: 1, label: t('text.passwordConditions.hasLength'), met: hasLength },
    { id: 2, label: t('text.passwordConditions.hasSpecialChar'), met: hasSpecialChar },
    { id: 3, label: t('text.passwordConditions.passwordsMatch'), met: passwordsMatch },
  ];

  return (
    <View
      style={{
        backgroundColor: colours.surfaceContainerLow,
        padding: spacing.gutter,
        borderRadius: rounded.lg,
        marginBottom: spacing.stackLg,
      }}
    >
      {conditions.map((item) => (
        <View key={item.id} style={styles.row}>
          <View style={[styles.circle, { borderColor: colours.outlineVariant }]}>
            {item.met && <Feather name="check" size={14} color={colours.primary} />}
          </View>
          <Text style={[styles.text, { color: colours.onSurfaceVariant, fontFamily: fonts.body }]}>{item.label}</Text>
        </View>
      ))}
    </View>
  );
};

export default PasswordConditions;

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  text: { fontSize: 14, fontWeight: 'regular', lineHeight: 20 },
});
