export interface User {
  id: string;
  name: string;
  avatarUrl: string;
  status: 'active' | 'inactive';
}

export interface FeaturedCampaign {
  id: string;
  tag: string;
  headline: string;
  supportingText: string;
  ctaLabel: string;
  secondaryLabel?: string;
  imageUrl: string;
}

export interface Category {
  id: string;
  name: string;
  imageUrl: string;
}

export interface Product {
  id: string;
  brand: string;
  name: string;
  price: number;
  originalPrice?: number;
  salePercentage?: number;
  imageUrl: string;
  badge?: string; // e.g., 'New', 'Bespoke'
  isWishlisted: boolean;
}

export interface TrendingProduct {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  isWishlisted: boolean;
}
