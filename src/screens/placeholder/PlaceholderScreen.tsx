import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from '../../theme/provider/ThemeProvider';

interface PlaceholderScreenProps {
  title: string;
  iconName: string;
}

const PlaceholderScreen: React.FC<PlaceholderScreenProps> = ({ title }) => {
  const { colors, typography } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[typography.headlineLg, { color: colors.primary }]}>{title}</Text>
      <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant, marginTop: 8 }]}>
        Editorial Content Coming Soon
      </Text>
    </SafeAreaView>
  );
};

export default PlaceholderScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
