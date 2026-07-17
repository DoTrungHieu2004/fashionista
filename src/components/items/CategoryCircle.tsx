import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { useTheme } from '../../theme/provider/ThemeProvider';

const CategoryCircle = ({ name, iconUrl }: { name: string; iconUrl: string }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.categoryItem}>
      <View style={[styles.circleWrapper, { backgroundColor: colors.surfaceContainerHigh }]}>
        <Image source={{ uri: iconUrl }} style={{ width: 28, height: 28 }} resizeMode="contain" />
      </View>
      <Text style={[styles.categoryName, { color: colors.onSurfaceVariant }]}>{name}</Text>
    </View>
  );
};

export default CategoryCircle;

const styles = StyleSheet.create({
  categoryItem: { alignItems: 'center', marginRight: 24 },
  circleWrapper: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: { fontSize: 12, fontWeight: '400', fontFamily: 'InterMedium' },
});
