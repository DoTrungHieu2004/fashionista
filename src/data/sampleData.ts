export interface Category {
  id: string;
  name: string;
  iconUrl: string;
}

export interface Brand {
  id: string;
  name: string;
  logoUrl: string;
}

export interface StyleInspiration {
  id: string;
  imageUrl: string;
  title: string;
  subtitle: string;
}

export interface Product {
  id: string;
  name: string;
  price: string;
  imageUrl: string;
  category?: string; // For New Arrivals
}

export interface RecentlyViewed {
  id: string;
  imageUrl: string;
}

export const categories: Category[] = [
  { id: '1', name: 'Women', iconUrl: 'https://cdn-icons-png.flaticon.com/512/2928/2928906.png' },
  { id: '2', name: 'Men', iconUrl: 'https://cdn-icons-png.flaticon.com/512/2928/2928906.png' },
  { id: '3', name: 'Kids', iconUrl: 'https://cdn-icons-png.flaticon.com/512/2928/2928906.png' },
  { id: '4', name: 'Shoes', iconUrl: 'https://cdn-icons-png.flaticon.com/512/2928/2928906.png' },
  { id: '5', name: 'Acc', iconUrl: 'https://cdn-icons-png.flaticon.com/512/2928/2928906.png' },
];

export const featuredBrands: Brand[] = [
  { id: '1', name: 'VOGUE', logoUrl: 'https://placehold.co/100x48/f3f3f3/333?text=VOGUE' },
  { id: '2', name: 'ZARA-ish', logoUrl: 'https://placehold.co/100x48/f3f3f3/333?text=ZARA-ish' },
  { id: '3', name: 'URB', logoUrl: 'https://placehold.co/100x48/f3f3f3/333?text=URB' },
];

export const styleInspirations: StyleInspiration[] = [
  {
    id: '1',
    imageUrl: 'https://images.unsplash.com/photo-1529139574466-a30327c06d0b?w=800&q=80',
    title: 'Summer Getaway',
    subtitle: 'Elevated resort wear for your next event.',
  },
  {
    id: '2',
    imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80',
    title: 'Modern Power Suits',
    subtitle: 'Command the room with precision tailoring.',
  },
];

export const trendingProducts: Product[] = [
  {
    id: '1',
    name: 'Minimalist Loafers',
    price: '$210',
    imageUrl: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&q=80',
  },
  {
    id: '2',
    name: 'Pleated Midi Skirt',
    price: '$145',
    imageUrl: 'https://images.unsplash.com/photo-1582142337725-b852fcb628c7?w=400&q=80',
  },
];

export const newArrivals: Product[] = [
  {
    id: '1',
    name: 'Chunky Cashmere Sweater',
    category: 'KNITWEAR',
    price: '$289',
    imageUrl: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&q=80',
  },
  {
    id: '2',
    name: 'Square Toe Chelsea Boots',
    category: 'FOOTWEAR',
    price: '$320',
    imageUrl: 'https://images.unsplash.com/photo-1542834282-eac9b0df7125?w=400&q=80',
  },
  {
    id: '3',
    name: 'Wide Brim Felt Hat',
    category: 'ACCESSORIES',
    price: '$115',
    imageUrl: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89d?w=400&q=80',
  },
  {
    id: '4',
    name: 'Geometric Gold Pendant',
    category: 'JEWELRY',
    price: '$75',
    imageUrl: 'https://images.unsplash.com/photo-1599643478518-a55e0d1a4209?w=400&q=80',
  },
];

export const recentlyViewed: RecentlyViewed[] = [
  { id: '1', imageUrl: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=200&q=80' }, // loafers
  { id: '2', imageUrl: 'https://images.unsplash.com/photo-1542834282-eac9b0df7125?w=200&q=80' }, // boots
  { id: '3', imageUrl: 'https://images.unsplash.com/photo-1599643478518-a55e0d1a4209?w=200&q=80' }, // pendant
  { id: '4', imageUrl: 'https://images.unsplash.com/photo-1582142337725-b852fcb628c7?w=200&q=80' }, // skirt
];
