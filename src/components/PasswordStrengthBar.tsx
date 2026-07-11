import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { useTheme } from '../theme/provider/ThemeProvider';

interface Props {
  password: string;
}

const PasswordStrengthBar: React.FC<Props> = ({ password }) => {
  const { colors } = useTheme();

  // Calculate strength (0-4)
  let strength = 0;
  if (password.length >= 8) strength += 1;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) strength += 1;
  if (/\d/.test(password)) strength += 1;
  if (/[^A-Za-z0-9]/.test(password)) strength += 1;

  const strengthLabels = ['NONE', 'WEAK', 'FAIR', 'GOOD', 'STRONG'];
  const strengthColors = ['#E5E7EB', '#EF4444', '#F59E0B', '#3B82F6', '#10B981'];

  // Strength for the bar
  const segments = [1, 2, 3, 4];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.label, { color: colors.outlineVariant }]}>
          STRENGTH: {strengthLabels[strength]}
        </Text>
        <Feather name="shield" size={16} color={colors.outlineVariant} />
      </View>
      <View style={styles.barContainer}>
        {segments.map((_, index) => (
          <View
            key={index}
            style={[
              styles.segment,
              { backgroundColor: colors.surfaceVariant },
              index < strength && { backgroundColor: strengthColors[strength] },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default PasswordStrengthBar;

const styles = StyleSheet.create({
  container: { marginTop: 8, marginBottom: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  label: { fontSize: 10, fontWeight: '700', fontFamily: 'InterSemiBold', letterSpacing: 1 },
  barContainer: { flexDirection: 'row', gap: 4, height: 4 },
  segment: { flex: 1, borderRadius: 2 },
});
