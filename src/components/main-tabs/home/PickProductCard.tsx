import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Feather } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

import { useTheme } from '@/theme/useTheme';
import { type Product } from '@/types';
import { withOpacity } from '@/utils/color';

interface PickproductCardProps {
  product: Product;
  onPress?: (id: string) => void;
  onWishlistToggle?: (id: string) => void;
}

export function PickProductCard({ product, onPress, onWishlistToggle }: PickproductCardProps) {
  const { colors, neutral, fonts, spacing, radius } = useTheme();
  const { t } = useTranslation();

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={() => onPress?.(product.id)}
      accessibilityRole="button"
      accessibilityLabel={product.name}
    >
      {/* Image area */}
      <View
        style={[
          styles.imageContainer,
          { borderRadius: radius.md, backgroundColor: colors.surfaceContainer },
        ]}
      >
        <Image source={{ uri: product.imageUrl }} style={styles.image} />

        {/* Sale badge */}
        {product.salePercentage && (
          <View
            style={[
              styles.saleBadge,
              { backgroundColor: colors.secondaryContainer, borderRadius: radius.sm },
            ]}
          >
            <Text
              style={[
                styles.saleBadgeText,
                { color: neutral[50], fontFamily: fonts.inter.semibold },
              ]}
            >
              -{product.salePercentage}%
            </Text>
          </View>
        )}

        {/* Wishlist button */}
        <TouchableOpacity
          style={[
            styles.wishlistButton,
            {
              borderRadius: radius.full,
              backgroundColor: withOpacity(colors.surfaceContainerLowest, 0.8),
              shadowRadius: radius.sm,
            },
          ]}
          onPress={(e) => {
            e.stopPropagation(); // Prevent card press
            onWishlistToggle?.(product.id);
          }}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          accessibilityLabel={
            product.isWishlisted
              ? t('accessibilityLabels.add-to-wishlist')
              : t('accessibilityLabels.remove-from-wishlist')
          }
        >
          <Feather
            name="heart"
            size={16}
            color={product.isWishlisted ? colors.secondary : colors.onSurface}
            fill={product.isWishlisted ? colors.secondary : 'transparent'}
          />
        </TouchableOpacity>
      </View>

      {/* Info area */}
      <View style={{ paddingHorizontal: spacing.xs }}>
        <Text
          style={[
            styles.brandText,
            {
              color: colors.onSurfaceVariant,
              fontFamily: fonts.inter.semibold,
              marginBottom: spacing.xs,
            },
          ]}
          numberOfLines={1}
        >
          {product.brand}
        </Text>
        <Text
          style={[styles.nameText, { color: colors.onSurface, fontFamily: fonts.inter.semibold }]}
          numberOfLines={2}
        >
          {product.name}
        </Text>

        {/* Price row */}
        <View style={styles.priceRow}>
          <Text
            style={[styles.priceText, { color: colors.primary, fontFamily: fonts.inter.semibold }]}
          >
            ${product.price}
          </Text>

          {product.originalPrice && (
            <Text
              style={[
                styles.originalPriceText,
                { color: colors.outline, fontFamily: fonts.inter.regular },
              ]}
            >
              ${product.originalPrice}
            </Text>
          )}

          {product.badge && (
            <View
              style={[
                styles.tagBadge,
                {
                  backgroundColor: colors.surfaceContainerHigh,
                  paddingHorizontal: spacing.sm,
                  borderRadius: radius.md,
                },
              ]}
            >
              <Text
                style={[
                  styles.tagBadgeText,
                  { color: colors.onSurfaceVariant, fontFamily: fonts.inter.semibold },
                ]}
              >
                {product.badge}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { width: '48%', marginBottom: 20 },
  imageContainer: {
    width: '100%',
    aspectRatio: 3 / 4,
    overflow: 'hidden',
    marginBottom: 12,
    position: 'relative',
  },
  image: { width: '100%', height: '100%', resizeMode: 'cover' },
  saleBadge: { position: 'absolute', top: 8, left: 8, paddingHorizontal: 6, paddingVertical: 2 },
  saleBadgeText: { fontSize: 10, lineHeight: 14, letterSpacing: 0.8 },
  wishlistButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 2,
  },
  brandText: { fontSize: 10, lineHeight: 14, letterSpacing: 0.5 },
  nameText: { fontSize: 16, lineHeight: 24, marginBottom: 6 },
  priceRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 6 },
  priceText: { fontSize: 20, lineHeight: 28 },
  originalPriceText: { fontSize: 14, lineHeight: 20, textDecorationLine: 'line-through' },
  tagBadge: { paddingVertical: 3 },
  tagBadgeText: { fontSize: 10, lineHeight: 14, letterSpacing: 0.8 },
});
