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
import { Feather } from '@expo/vector-icons';

import { useTheme } from '../../theme/provider/ThemeProvider';
import {
  mallCategories,
  mallNewArrivals,
  mallPopularBrands,
  mallTrendingNow,
} from '../../data/sampleData';
import CategoryCircle from '../../components/items/CategoryCircle';
import BrandBox from '../../components/items/BrandBox';
import TrendingProductCard from '../../components/items/TrendingProductCard';
import NewArrivalCard from '../../components/items/NewArrivalCard';

const MallScreen = () => {
  const { colors, images } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      {/* 1. Header bar */}
      <View style={styles.header}>
        <View style={styles.brandRow}>
          <Image style={styles.brandLogo} source={images.logo} />
          <Text style={[styles.brandText, { color: colors.primary }]}>Fashionista</Text>
        </View>
        <TouchableOpacity style={{ padding: 4 }}>
          <Feather name="shopping-bag" size={22} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* 2. Search bar */}
      <View style={[styles.searchContainer, { backgroundColor: colors.surfaceContainer }]}>
        <Feather
          name="search"
          size={18}
          color={colors.onSurfaceVariant}
          style={{ marginRight: 10 }}
        />
        <TextInput
          placeholder="Search brands, styles, or items..."
          placeholderTextColor={colors.outlineVariant}
          style={styles.searchInput}
        />
        <TouchableOpacity>
          <Feather name="sliders" size={18} color={colors.primary} style={{ marginLeft: 10 }} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* 3. Hero banner */}
        <View style={styles.heroContainer}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80',
            }}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.heroOverlay} />
          <View style={styles.heroContent}>
            <Text style={styles.heroLabel}>SEASONAL EXCLUSIVE</Text>
            <Text style={styles.heroTitle}>Summer Collection{'\n'}Up to 30% Off</Text>
            <TouchableOpacity style={styles.heroButton}>
              <Text style={[styles.heroButtonText, { color: colors.primary }]}>Shop Now</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Pagination dots below the image */}
        <View style={styles.paginationDots}>
          <View
            style={[
              styles.dot,
              { backgroundColor: colors.outlineVariant },
              styles.activeDot,
              { backgroundColor: colors.primary },
            ]}
          />
          <View style={[styles.dot, { backgroundColor: colors.outlineVariant }]} />
          <View style={[styles.dot, { backgroundColor: colors.outlineVariant }]} />
        </View>

        {/* 4. Categories */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeaderRow}>
            <Text style={[styles.sectionTitle, { color: colors.onSurface }]}>Categories</Text>
            <TouchableOpacity>
              <Text style={[styles.seeAllText, { color: colors.primary }]}>View all</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={mallCategories}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <CategoryCircle name={item.name} iconUrl={item.iconUrl} />}
            contentContainerStyle={styles.horizontalListContent}
          />
        </View>

        {/* 5. Popular brands */}
        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, { color: colors.onSurface, marginBottom: 16 }]}>
            Popular brands
          </Text>
          <FlatList
            data={mallPopularBrands}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <BrandBox name={item.name} logoUrl={item.logoUrl} />}
            contentContainerStyle={styles.horizontalListContent}
          />
        </View>

        {/* 6. Trending now */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeaderRow}>
            <Text style={[styles.sectionTitle, { color: colors.onSurface }]}>Trending now</Text>
            <TouchableOpacity>
              <Text style={[styles.seeAllText, { color: colors.primary }]}>View all</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={mallTrendingNow}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <TrendingProductCard item={item} />}
            contentContainerStyle={styles.horizontalListContent}
          />
        </View>

        {/* 7. New arrivals */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeaderRow}>
            <Text style={[styles.sectionTitle, { color: colors.onSurface }]}>New arrivals</Text>
            <TouchableOpacity>
              <Text style={[styles.seeAllText, { color: colors.primary }]}>View all</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={mallNewArrivals}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            renderItem={({ item, index }) => <NewArrivalCard item={item} isLarge={index === 0} />}
            contentContainerStyle={styles.horizontalListContent}
          />
        </View>

        {/* 8. For you */}
        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, { color: colors.onSurface, marginBottom: 16 }]}>
            For you
          </Text>
          <View style={[styles.forYouCard, { backgroundColor: colors.surfaceContainerLow }]}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&q=80',
              }}
              style={styles.forYouImage}
              resizeMode="contain"
            />
            <Text style={[styles.forYouTitle, { color: colors.onBackground }]}>
              Based on your style preferences
            </Text>
            <Text style={[styles.forYouContent, { color: colors.onSurfaceVariant }]}>
              We've curated a special selection of items we think you'll love from our latest
              collections.
            </Text>
            <TouchableOpacity style={[styles.forYouButton, { backgroundColor: colors.primary }]}>
              <Text style={styles.forYouButtonText}>Show recommendations</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Padding for bottom tab bar */}
        <View style={{ height: 90 }} />
      </ScrollView>

      {/* 9. Floating action button (FAB) - Scanner */}
      <TouchableOpacity style={[styles.fab, { backgroundColor: colors.primary }]}>
        <Feather name="maximize" size={24} color="#ffffff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default MallScreen;

const styles = StyleSheet.create({
  // Header
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
  brandText: { fontSize: 16, fontWeight: '400', fontFamily: 'Montserrat' },

  // Search bar
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
    marginHorizontal: 20,
    marginBottom: 24,
  },
  searchInput: { flex: 1, fontSize: 16, fontWeight: '500', fontFamily: 'Inter' },

  // Scroll content
  scrollContent: { paddingHorizontal: 20, paddingBottom: 20 },

  // Hero banner
  heroContainer: { height: 200, borderRadius: 20, overflow: 'hidden', position: 'relative' },
  heroImage: { width: '100%', height: '100%' },
  heroOverlay: { ...StyleSheet.absoluteFill, backgroundColor: 'rgba(0, 0, 0, 0.4)' },
  heroContent: { position: 'absolute', top: 30, left: 24, right: 24 },
  heroLabel: {
    color: '#ffffff',
    opacity: 0.8,
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Inter',
    letterSpacing: 1,
    marginBottom: 4,
  },
  heroTitle: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '600',
    fontFamily: 'Montserrat',
    marginBottom: 12,
  },
  heroButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignSelf: 'flex-start',
  },
  heroButtonText: { fontSize: 16, fontWeight: '500', fontFamily: 'Inter' },
  paginationDots: { flexDirection: 'row', justifyContent: 'center', gap: 6, marginTop: 12 },
  dot: { width: 6, height: 6, borderRadius: 3 },
  activeDot: { width: 18 },

  // Sections
  sectionContainer: { marginBottom: 24 },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  sectionTitle: { fontWeight: '600', fontSize: 24, fontFamily: 'Montserrat' },
  seeAllText: { fontWeight: '500', fontSize: 16, fontFamily: 'Inter' },
  horizontalListContent: { paddingRight: 20 },

  // For you section
  forYouCard: {
    borderRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  forYouImage: { width: 80, height: 80, marginBottom: 16 },
  forYouTitle: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Inter',
    marginBottom: 20,
    lineHeight: 24,
  },
  forYouContent: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Inter',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  forYouButton: { paddingVertical: 14, paddingHorizontal: 24, borderRadius: 30 },
  forYouButtonText: { color: '#ffffff', fontSize: 16, fontWeight: '500', fontFamily: 'Inter' },

  // FAB
  fab: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
});
