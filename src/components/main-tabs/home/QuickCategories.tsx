import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useTranslation } from 'react-i18next';

import { useTheme } from '@/theme/useTheme';
import { type Category } from '@/types';

interface QuickCategoriesProps {
  categories: Category[];
  onCategoryPress?: (categoryId: string) => void;
  onViewAllPress?: () => void;
}

export function QuickCategories({
  categories,
  onCategoryPress,
  onViewAllPress,
}: QuickCategoriesProps) {
  const { colors, fonts, spacing, radius } = useTheme();
  const { t } = useTranslation();

  return (
    <View style={{ paddingTop: spacing.sm }}>
      {/* Section header */}
      <View style={[styles.headerRow, { marginBottom: spacing.md }]}>
        <Text
          style={[styles.title, { color: colors.onSurface, fontFamily: fonts.montserrat.semibold }]}
        >
          {t('mainTabs.home.sectionTitles.categories')}
        </Text>
        <TouchableOpacity onPress={onViewAllPress} accessibilityRole="button">
          <Text
            style={[styles.viewAllText, { color: colors.primary, fontFamily: fonts.inter.medium }]}
          >
            {t('buttons.view-all')}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Horizontal list */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { gap: spacing.gutter }]}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={styles.categoryItem}
            activeOpacity={0.7}
            onPress={() => onCategoryPress?.(category.id)}
            accessibilityRole="button"
            accessibilityLabel={category.name}
          >
            <View
              style={[
                styles.imageWrapper,
                {
                  borderRadius: radius.full,
                  backgroundColor: colors.surfaceContainerHigh,
                  marginBottom: spacing.sm,
                  borderColor: colors.surfaceContainerHigh,
                },
              ]}
            >
              <Image source={{ uri: category.imageUrl }} style={styles.image} />
            </View>
            <Text
              style={[
                styles.categoryName,
                { color: colors.onSurface, fontFamily: fonts.inter.medium },
              ]}
              numberOfLines={1}
            >
              {category.name}
            </Text>
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
  title: { fontSize: 20, lineHeight: 28, letterSpacing: -0.5 },
  viewAllText: { fontSize: 12, lineHeight: 16, letterSpacing: 0.6 },
  scrollContent: { paddingHorizontal: 20 },
  categoryItem: { alignItems: 'center', width: 68 },
  imageWrapper: { width: 68, height: 68, overflow: 'hidden', borderWidth: 2 },
  image: { width: '100%', height: '100%', resizeMode: 'cover' },
  categoryName: { fontSize: 12, lineHeight: 16, letterSpacing: 0.6 },
});
