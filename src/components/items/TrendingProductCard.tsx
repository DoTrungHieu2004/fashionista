import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { useTheme } from '../../theme/provider/ThemeProvider';
import { mallTrendingNow } from '../../data/sampleData';

const TrendingProductCard = ({ item }: { item: (typeof mallTrendingNow)[0] }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.trendingCard}>
      <View style={styles.trendingImageWrapper}>
        <Image source={{ uri: item.imageUrl }} style={styles.trendingImage} resizeMode="cover" />
        <TouchableOpacity style={styles.heartButton}>
          <Feather name="heart" size={18} color={colors.onSurface} />
        </TouchableOpacity>
      </View>
      <Text style={[styles.trendingBrand, { color: colors.onSurfaceVariant }]}>{item.brand}</Text>
      <Text style={[styles.trendingName, { color: colors.onSurface }]} numberOfLines={1}>
        {item.name}
      </Text>
      <Text style={[styles.trendingPrice, { color: colors.primary }]}>{item.price}</Text>
    </View>
  );
};

export default TrendingProductCard;

const styles = StyleSheet.create({
  trendingCard: { width: 180, marginRight: 16 },
  trendingImageWrapper: { position: 'relative', marginBottom: 12 },
  trendingImage: { width: '100%', height: 220, borderRadius: 16 },
  heartButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trendingBrand: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Inter',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  trendingName: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter',
    marginBottom: 4,
  },
  trendingPrice: { fontSize: 16, fontWeight: '500', fontFamily: 'Inter' },
});
