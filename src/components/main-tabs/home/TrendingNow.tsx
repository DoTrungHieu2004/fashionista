import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Feather } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

import { useTheme } from '@/theme/useTheme';
import { type TrendingProduct } from '@/types';
import { withOpacity } from '@/utils/color';

interface TrendingNowProps {
  products: TrendingProduct[];
  onProductPress?: (id: string) => void;
  onWishlistToggle?: (id: string) => void;
  onExplorePress?: () => void;
}

export function TrendingNow({
  products,
  onProductPress,
  onWishlistToggle,
  onExplorePress,
}: TrendingNowProps) {
  const { colors, neutral, fonts, radius, spacing } = useTheme();
  const { t } = useTranslation();

  // If no products, hide the section entirely
  if (!products || products.length === 0) {
    return null;
  }

  // Maximum 3 products shown
  const displayProducts = products.slice(0, 3);

  return (
    <View style={{ marginBottom: spacing.md }}>
      {/* Section header */}
      <View style={[styles.headerRow, { marginBottom: spacing.md }]}>
        <View style={styles.titleContainer}>
          <Feather
            name="trending-up"
            size={20}
            color={colors.secondary}
            style={{ marginRight: spacing.unit }}
          />
          <Text
            style={[
              styles.title,
              { color: colors.onSurface, fontFamily: fonts.montserrat.semibold },
            ]}
          >
            {t('mainTabs.home.sectionTitles.trending-now')}
          </Text>
        </View>
        <TouchableOpacity onPress={onExplorePress} accessibilityRole="button">
          <Text
            style={[styles.exploreText, { color: colors.primary, fontFamily: fonts.inter.medium }]}
          >
            {t('buttons.explore')}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Horizontal list */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { gap: spacing.md }]}
      >
        {displayProducts.map((product) => (
          <TouchableOpacity
            key={product.id}
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => onProductPress?.(product.id)}
            accessibilityRole="button"
          >
            {/* Image area */}
            <View
              style={[
                styles.imageContainer,
                { borderRadius: radius.md, backgroundColor: colors.surfaceContainer },
              ]}
            >
              <Image source={{ uri: product.imageUrl }} style={styles.image} />

              {/* Wishlist button */}
              <TouchableOpacity
                style={[
                  styles.wishlistButton,
                  {
                    borderRadius: radius.full,
                    backgroundColor: withOpacity(neutral[50], 0.8),
                    shadowRadius: radius.sm,
                  },
                ]}
                onPress={(e) => {
                  e.stopPropagation();
                  onWishlistToggle?.(product.id);
                }}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
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
            <View style={[styles.infoContainer, { paddingHorizontal: spacing.xs }]}>
              <Text
                style={[
                  styles.nameText,
                  {
                    color: colors.onSurface,
                    fontFamily: fonts.inter.medium,
                    marginBottom: spacing.sm,
                  },
                ]}
                numberOfLines={1}
              >
                {product.name}
              </Text>
              <Text
                style={[
                  styles.priceText,
                  { color: colors.primary, fontFamily: fonts.inter.semibold },
                ]}
              >
                ${product.price}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  titleContainer: { flexDirection: 'row', alignItems: 'center' },
  title: { fontSize: 24, lineHeight: 32, letterSpacing: -0.6 },
  exploreText: { fontSize: 12, lineHeight: 16, letterSpacing: 0.6 },
  scrollContent: { paddingHorizontal: 20 },
  card: { width: 260 },
  imageContainer: {
    width: '100%',
    aspectRatio: 1.3, // Wider than the 3:4 Picked for You cards
    overflow: 'hidden',
    marginBottom: 10,
    position: 'relative',
  },
  image: { width: '100%', height: '100%', resizeMode: 'cover' },
  wishlistButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 2,
  },
  infoContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  nameText: { fontSize: 14, lineHeight: 20, flex: 1 },
  priceText: { fontSize: 20, lineHeight: 28 },
});
