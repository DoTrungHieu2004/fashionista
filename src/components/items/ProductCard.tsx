import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { useTheme } from '../../theme/provider/ThemeProvider';

const ProductCard = ({
  name,
  price,
  imageUrl,
}: {
  name: string;
  price: string;
  imageUrl: string;
}) => {
  const { colors } = useTheme();

  return (
    <View style={styles.productCard}>
      <Image
        source={{ uri: imageUrl }}
        style={[styles.productImage, { backgroundColor: colors.surfaceContainer }]}
        resizeMode="cover"
      />
      <Text style={[styles.productName, { color: colors.onSurface }]} numberOfLines={1}>
        {name}
      </Text>
      <Text style={[styles.productPrice, { color: colors.primary }]}>{price}</Text>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  productCard: { width: 150, marginRight: 16 },
  productImage: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    marginBottom: 10,
  },
  productName: { fontSize: 16, fontWeight: '600', fontFamily: 'InterSemiBold', marginBottom: 4 },
  productPrice: { fontSize: 14, fontWeight: '700', fontFamily: 'InterBold' },
});
