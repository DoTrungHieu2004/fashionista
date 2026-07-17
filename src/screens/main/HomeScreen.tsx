import React from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, Ionicons } from '@expo/vector-icons';

import { useTheme } from '../../theme/provider/ThemeProvider';
import {
  categories,
  featuredBrands,
  newArrivals,
  recentlyViewed,
  styleInspirations,
  trendingProducts,
} from '../../data/sampleData';
import CategoryCircle from '../../components/items/CategoryCircle';
import BrandBox from '../../components/items/BrandBox';
import StyleInspirationCard from '../../components/items/StyleInspirationCard';
import ProductCard from '../../components/items/ProductCard';

const HomeScreen = () => {
  const { colors, images } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      {/* 1. Header bar */}
      <View style={styles.header}>
        <View style={styles.brandRow}>
          <Image style={styles.brandLogo} source={images.logo} />
          <Text style={[styles.brandText, { color: colors.primary }]}>Fashionista</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={{ padding: 4 }}>
            <Ionicons name="sparkles-outline" size={22} color={colors.onSurfaceVariant} />
          </TouchableOpacity>
          <TouchableOpacity style={{ padding: 4 }}>
            <Feather name="bell" size={22} color={colors.onSurfaceVariant} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}>
        {/* 2. Header bar */}
        <View style={[styles.searchContainer, { backgroundColor: colors.surfaceContainer }]}>
          <Feather name="search" size={18} color={colors.outline} style={{ marginRight: 10 }} />
          <TextInput
            placeholder="Search clothes, brands, categories..."
            placeholderTextColor={colors.outlineVariant}
            style={[styles.searchInput, { color: colors.onSurface }]}
          />
        </View>

        {/* 3. Hero carousel */}
        <View style={styles.heroContainer}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1596765048617-6e55871da9d3?w=800&q=80',
            }}
            style={{ width: '100%', height: '100%' }}
            resizeMode="cover"
          />
          <View style={styles.heroOverlay} />
          <View style={styles.heroContent}>
            <Text style={styles.heroLabel}>Spring Collection</Text>
            <Text style={styles.heroYear}>2024</Text>
            <TouchableOpacity style={[styles.heroButton, { backgroundColor: colors.primary }]}>
              <Text style={styles.heroButtonText}>Shop Now</Text>
            </TouchableOpacity>
          </View>
          {/* Pagination dots */}
          <View style={styles.paginationDots}>
            <View style={[styles.dot, styles.activeDot]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </View>

        {/* 4. Categories */}
        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, { color: colors.onSurface }]}>Categories</Text>
          <FlatList
            data={categories}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <CategoryCircle name={item.name} iconUrl={item.iconUrl} />}
            contentContainerStyle={styles.horizontalListContent}
          />
        </View>

        {/* 5. Featured brands */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Featured brands</Text>
          <FlatList
            data={featuredBrands}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <BrandBox name={item.name} logoUrl={item.logoUrl} />}
            contentContainerStyle={styles.horizontalListContent}
          />
        </View>

        {/* 6. Style inspiration */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Style inspiration</Text>
          <View style={{ gap: 16 }}>
            {styleInspirations.map(item => (
              <StyleInspirationCard key={item.id} item={item} />
            ))}
          </View>
        </View>

        {/* 7. Trending now */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Trending now</Text>
          <FlatList
            data={trendingProducts}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <ProductCard {...item} />}
            contentContainerStyle={styles.horizontalListContent}
          />
        </View>

        {/* 8. New arrivals */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>New Arrivals</Text>
            <TouchableOpacity>
              <Text style={[styles.seeAllText, { color: colors.primary }]}>See all</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={newArrivals}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <ProductCard {...item} />}
            contentContainerStyle={styles.horizontalListContent}
          />
        </View>

        {/* 9. Recently viewed */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Recently Viewed</Text>
          <FlatList
            data={recentlyViewed}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <Image
                source={{ uri: item.imageUrl }}
                style={styles.recentlyViewedImage}
                resizeMode="cover"
              />
            )}
            contentContainerStyle={styles.horizontalListContent}
          />
        </View>

        {/* Padding for bottom tab bar */}
        <View style={{ height: 80 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  // Header & search
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 16,
  },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  brandLogo: { width: 24, height: 24, marginRight: 6 },
  brandText: { fontSize: 16, fontWeight: '300', fontFamily: 'MontserratRegular' },
  headerActions: { flexDirection: 'row', gap: 16 },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
    marginBottom: 24,
  },
  searchInput: { flex: 1, fontSize: 15, fontFamily: 'InterRegular' },

  // Hero
  heroContainer: {
    height: 380,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 24,
  },
  heroOverlay: { ...StyleSheet.absoluteFill, backgroundColor: 'rgba(0, 0, 0, 0.3)' },
  heroContent: { position: 'absolute', bottom: 30, left: 24, right: 24 },
  heroLabel: {
    fontSize: 28,
    fontWeight: '500',
    fontFamily: 'MontserratSemiBold',
    color: '#ffffff',
  },
  heroYear: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '700',
    fontFamily: 'MontserratSemiBold',
    marginTop: 4,
    marginBottom: 16,
  },
  heroButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignSelf: 'flex-start',
  },
  heroButtonText: { color: '#ffffff', fontSize: 14, fontWeight: '200', fontFamily: 'InterRegular' },
  paginationDots: {
    position: 'absolute',
    bottom: 16,
    right: 24,
    flexDirection: 'row',
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  activeDot: { width: 18, backgroundColor: '#ffffff' },

  // Sections
  sectionContainer: { marginBottom: 24 },
  sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sectionTitle: { fontSize: 18, fontWeight: '700', fontFamily: 'InterSemiBold', marginBottom: 16 },
  horizontalListContent: { paddingRight: 20 },
  seeAllText: { fontWeight: '500', fontSize: 12, fontFamily: 'InterMedium' },
  recentlyViewedImage: { width: 72, height: 72, borderRadius: 12, marginRight: 12 },
});
