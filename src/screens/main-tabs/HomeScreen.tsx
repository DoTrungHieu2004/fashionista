import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { CompactHeader } from '@/components/main-tabs/home/CompactHeader';
import { FeaturedCampaign } from '@/components/main-tabs/home/FeaturedCampaign';
import { PickedForYou } from '@/components/main-tabs/home/PickedForYou';
import { QuickCategories } from '@/components/main-tabs/home/QuickCategories';
import { ShoppingShortcuts } from '@/components/main-tabs/home/ShoppingShortcuts';
import { TopBar } from '@/components/main-tabs/home/TopBar';
import { TrendingNow } from '@/components/main-tabs/home/TrendingNow';
import {
  sampleCategories,
  sampleFeaturedCampaign,
  samplePickedForYou,
  sampleTrendingNow,
  sampleUser,
} from '@/data/sample/sampleUser';
import { useTheme } from '@/theme/useTheme';
import { type Product, type TrendingProduct } from '@/types';

export function HomeScreen() {
  const { colors, spacing } = useTheme();

  const [pickedProducts, setPickedProducts] = useState<Product[]>(samplePickedForYou);
  const [trendingProducts, setTrendingProducts] = useState<TrendingProduct[]>(sampleTrendingNow);

  const handleAiAssistantPress = () => {
    // TODO: navigate to AI assistant
  };

  const handleNotificationsPress = () => {
    // TODO: navigate to notifications
  };

  const handleAvatarPress = () => {
    // TODO: navigate to profile tab
  };

  const handleSearchPress = () => {
    // TODO: navigate to search screen
  };

  const handleVisualSearchPress = () => {
    // TODO: open camera / visual search
  };

  const handleFilterPress = () => {
    // TODO: open filter sheet
  };

  const handleCampaignCtaPress = (campaignId: string) => {
    // TODO: navigate to campaign collection screen
    console.log('campaign pressed:', campaignId);
  };

  const handleCategoryPress = (categoryId: string) => {
    // TODO: navigate to category detail
    console.log('category pressed:', categoryId);
  };

  const handleCategoriesViewAll = () => {
    // TODO: navigate to categories screen
  };

  const handleShortcutPress = (id: string) => {
    // TODO: navigate based on the shortcut id
    console.log('shortcut pressed:', id);
  };

  const handleProductPress = (productId: string) => {
    // TODO: navigate to product details
    console.log('product pressed:', productId);
  };

  const handleWishlistToggle = (productId: string) => {
    // Toggle in Picked for You
    setPickedProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, isWishlisted: !p.isWishlisted } : p)),
    );

    // Toggle in Trending Now (in case the item exists in both lists)
    setTrendingProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, isWishlisted: !p.isWishlisted } : p)),
    );

    // TODO: Sync the toggle with your backend API here
  };

  const handlePickedViewAll = () => {
    // TODO: navigate to full recommendations list
  };

  const handleTrendingProductPress = (productId: string) => {
    // TODO: navigate to product details
    console.log('trending product pressed:', productId);
  };

  const handleTrendingExplore = () => {
    // TODO: navigate to explore/trending screen
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]} edges={['top']}>
      {/* Fixed top bar */}
      <TopBar
        hasUnreadNotifications
        onAiAssistantPress={handleAiAssistantPress}
        onNotificationsPress={handleNotificationsPress}
      />

      {/* Scrollable content starts at CompactHeader */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: spacing.marginTablet }}
        showsVerticalScrollIndicator={false}
      >
        <CompactHeader
          user={sampleUser}
          onAvatarPress={handleAvatarPress}
          onSearchPress={handleSearchPress}
          onVisualSearchPress={handleVisualSearchPress}
          onFilterPress={handleFilterPress}
        />

        <FeaturedCampaign campaign={sampleFeaturedCampaign} onCtaPress={handleCampaignCtaPress} />

        <QuickCategories
          categories={sampleCategories}
          onCategoryPress={handleCategoryPress}
          onViewAllPress={handleCategoriesViewAll}
        />

        <ShoppingShortcuts onShortcutPress={handleShortcutPress} />

        <PickedForYou
          products={samplePickedForYou}
          onProductPress={handleProductPress}
          onWishlistToggle={handleWishlistToggle}
          onViewAllPress={handlePickedViewAll}
        />

        <TrendingNow
          products={sampleTrendingNow}
          onProductPress={handleTrendingProductPress}
          onWishlistToggle={handleWishlistToggle} // Reusing the same handler
          onExplorePress={handleTrendingExplore}
        />

        {/* Extra padding at the bottom so the last section isn't flush against the screen edge */}
        <View style={{ height: spacing.lg }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  scrollView: { flex: 1 },
});
