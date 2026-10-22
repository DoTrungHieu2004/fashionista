import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useTranslation } from 'react-i18next';

import { useTheme } from '@/theme/useTheme';
import { type Product } from '@/types';

import { PickProductCard } from './PickProductCard';

interface PickedForYouProps {
  products: Product[];
  onProductPress?: (id: string) => void;
  onWishlistToggle?: (id: string) => void;
  onViewAllPress?: () => void;
}

export function PickedForYou({
  products,
  onProductPress,
  onWishlistToggle,
  onViewAllPress,
}: PickedForYouProps) {
  const { colors, fonts, spacing } = useTheme();
  const { t } = useTranslation();

  // Do not render the section if there is no algorithmic data
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <View style={[styles.container, { paddingTop: spacing.lg, marginBottom: spacing.lg }]}>
      {/* Section header */}
      <View style={[styles.headerRow, { marginBottom: spacing.md }]}>
        <View>
          <Text
            style={[
              styles.title,
              { color: colors.onSurface, fontFamily: fonts.montserrat.semibold },
            ]}
          >
            {t('mainTabs.home.sectionTitles.picked-for-you')}
          </Text>
          <Text
            style={[
              styles.subtitle,
              { color: colors.onSurfaceVariant, fontFamily: fonts.inter.regular },
            ]}
          >
            {t('mainTabs.home.subtitles.picked-for-you')}
          </Text>
        </View>
        <TouchableOpacity onPress={onViewAllPress} accessibilityRole="button">
          <Text
            style={[styles.viewAllText, { color: colors.primary, fontFamily: fonts.inter.medium }]}
          >
            {t('buttons.view-all')} &gt;
          </Text>
        </TouchableOpacity>
      </View>

      {/* 2-column grid */}
      <View style={styles.gridContainer}>
        {products.map((product) => (
          <PickProductCard
            key={product.id}
            product={product}
            onPress={onProductPress}
            onWishlistToggle={onWishlistToggle}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20 },
  headerRow: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' },
  title: { fontSize: 24, lineHeight: 32, letterSpacing: -0.6 },
  subtitle: { fontSize: 14, lineHeight: 20, marginTop: 2 },
  viewAllText: { fontSize: 12, lineHeight: 16, letterSpacing: 0.6 },
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
});
