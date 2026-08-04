import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Feather } from '@expo/vector-icons';

import { useTheme } from '../theme/ThemeProvider';

interface Props {
  strength: 'none' | 'weak' | 'medium' | 'strong';
}

const PasswordStrengthBar: React.FC<Props> = ({ strength }) => {
  const { colours, fonts, spacing } = useTheme();
  const { t } = useTranslation();

  const getStrengthColor = () => {
    switch (strength) {
      case 'weak':
        return '#ef4444'; // Red
      case 'medium':
        return '#f59e0b'; // Orange
      case 'strong':
        return '#10b981'; // Green
      default:
        return colours.surfaceVariant;
    }
  };

  const getFillWidth = () => {
    switch (strength) {
      case 'weak':
        return '33%';
      case 'medium':
        return '66%';
      case 'strong':
        return '100%';
      default:
        return '0%';
    }
  };

  return (
    <View style={{ marginBottom: spacing.stackMd }}>
      <View style={[styles.row, { marginBottom: spacing.stackXs }]}>
        <Text style={[styles.label, { color: colours.outlineVariant, fontFamily: fonts.body }]}>
          {t('text.strength')}
          {strength.toUpperCase()}
        </Text>
        <Feather name="shield" size={16} color={colours.outlineVariant} />
      </View>

      <View style={[styles.track, { backgroundColor: colours.surfaceVariant }]}>
        <View style={[styles.fill, { width: getFillWidth(), backgroundColor: getStrengthColor() }]} />
      </View>
    </View>
  );
};

export default PasswordStrengthBar;

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  label: { fontSize: 10, fontWeight: 'bold', lineHeight: 14, letterSpacing: 0.8 },
  track: { height: 4, borderRadius: 2, width: '100%', overflow: 'hidden' },
  fill: { height: '100%', borderRadius: 2 },
});
