import {
  type Category,
  type FeaturedCampaign,
  type Product,
  type TrendingProduct,
  type User,
} from '@/types';

export const sampleUser: User = {
  id: 'usr_001',
  name: 'User',
  avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
  status: 'active',
};

export const sampleFeaturedCampaign: FeaturedCampaign = {
  id: 'campaign_autumn_24',
  tag: 'AUTUMN CAPSULE \u201924',
  headline: 'Find Your Next Favorite',
  supportingText:
    'Pure cashmere and tailored silhouettes curated for seamless seasonal transitions.',
  ctaLabel: 'Explore collection',
  secondaryLabel: 'Limited Release',
  imageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&h=1400&fit=crop',
};

export const sampleCategories: Category[] = [
  {
    id: 'cat_clothing',
    name: 'Clothing',
    imageUrl: 'https://images.unsplash.com/photo-1434389670869-9a84492b9a63?w=200&h=200&fit=crop',
  },
  {
    id: 'cat_shoes',
    name: 'Shoes',
    imageUrl: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=200&h=200&fit=crop',
  },
  {
    id: 'cat_bags',
    name: 'Bags',
    imageUrl: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=200&h=200&fit=crop',
  },
  {
    id: 'cat_accessories',
    name: 'Accessories',
    imageUrl: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=200&h=200&fit=crop',
  },
  {
    id: 'cat_knitwear',
    name: 'Knitwear',
    imageUrl: 'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?w=200&h=200&fit=crop',
  },
];

export const samplePickedForYou: Product[] = [
  {
    id: 'prod_01',
    brand: 'MAISON STUDIO',
    name: 'Minimalist Wool Blend Coat',
    price: 380,
    imageUrl: 'https://images.unsplash.com/photo-1539533018447-63fcce26515f?w=600&h=800&fit=crop',
    badge: 'New',
    isWishlisted: false,
  },
  {
    id: 'prod_02',
    brand: 'ATELIER NOIR',
    name: 'Pleated Silk Midi Dress',
    price: 210,
    originalPrice: 260,
    salePercentage: 20,
    imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop',
    isWishlisted: true,
  },
  {
    id: 'prod_03',
    brand: 'CÉLINE & CO',
    name: 'Structured Leather Handbag',
    price: 420,
    imageUrl: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=600&h=800&fit=crop',
    isWishlisted: false,
  },
  {
    id: 'prod_04',
    brand: 'VELOUR PARIS',
    name: 'Suede Chelsea Boots',
    price: 245,
    imageUrl: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=600&h=800&fit=crop',
    badge: 'Bespoke',
    isWishlisted: false,
  },
];

export const sampleTrendingNow: TrendingProduct[] = [
  {
    id: 'trend_01',
    name: 'Cashmere Turtleneck',
    price: 195,
    imageUrl: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=600&fit=crop',
    isWishlisted: false,
  },
  {
    id: 'trend_02',
    name: 'Wide-Leg Trousers',
    price: 175,
    imageUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=600&fit=crop',
    isWishlisted: true,
  },
  {
    id: 'trend_03',
    name: 'Oversized Trench Coat',
    price: 320,
    imageUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=600&fit=crop',
    isWishlisted: false,
  },
  // Add a 4th item to prove the slice logic works and only 3 show
  {
    id: 'trend_04',
    name: 'Leather Loafers',
    price: 150,
    imageUrl: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=600&h=600&fit=crop',
    isWishlisted: false,
  },
];
