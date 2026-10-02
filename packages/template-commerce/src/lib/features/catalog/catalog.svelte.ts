export interface Product {
  id: string;
  name: string;
  category: 'leather' | 'ceramics' | 'apparel' | 'objects';
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  image: string;
  badge?: string;
  stock: number;
  rating: number;
  reviewsCount: number;
  description: string;
  materials: string[];
}

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-01',
    name: 'Atelier Vegetable-Tanned Cardholder',
    category: 'leather',
    categoryLabel: 'Leather Goods',
    price: 480000,
    originalPrice: 550000,
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80',
    badge: 'Best Craft',
    stock: 12,
    rating: 4.9,
    reviewsCount: 38,
    description: 'Handcrafted from full-grain Tuscan vegetable-tanned leather. Features 4 exterior card slots and a lined central cash compartment. Burnished edges with beeswax.',
    materials: ['Full-Grain Buttero Leather', 'Waxed Linen Thread', 'Hand-Polished Edges'],
  },
  {
    id: 'prod-02',
    name: 'Terracotta Matte Pour-Over Dripper',
    category: 'ceramics',
    categoryLabel: 'Ceramics',
    price: 360000,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    badge: 'Artisan',
    stock: 8,
    rating: 4.8,
    reviewsCount: 24,
    description: 'Wheel-thrown stoneware dripper with an unglazed terracotta exterior and food-safe satin porcelain interior. Calibrated for 02 filter extraction.',
    materials: ['High-Fire Terracotta Stoneware', 'Food-Safe Satin Glaze'],
  },
  {
    id: 'prod-03',
    name: 'Raw Heavy Linen Overshirt',
    category: 'apparel',
    categoryLabel: 'Apparel',
    price: 890000,
    originalPrice: 1100000,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
    badge: 'Limited',
    stock: 5,
    rating: 5.0,
    reviewsCount: 16,
    description: 'Relaxed fit overshirt crafted from 280 GSM European pre-washed flax linen. Corozo nut buttons, drop shoulders, and reinforced utility pockets.',
    materials: ['100% Normandy Flax Linen', 'Natural Corozo Nut Buttons'],
  },
  {
    id: 'prod-04',
    name: 'Brushed Brass Desk Vessel',
    category: 'objects',
    categoryLabel: 'Objects',
    price: 420000,
    image: 'https://images.unsplash.com/photo-1584589167171-541ce45f1eea?auto=format&fit=crop&w=800&q=80',
    stock: 14,
    rating: 4.7,
    reviewsCount: 19,
    description: 'CNC-machined solid brass cylinder with a circular chamfered base. Uncoated to allow a natural warm patina over time.',
    materials: ['Solid C360 Brass', 'Hand-Turned Finish'],
  },
  {
    id: 'prod-05',
    name: 'Minimalist Sand Canvas Tote',
    category: 'leather',
    categoryLabel: 'Leather Goods',
    price: 650000,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    stock: 9,
    rating: 4.9,
    reviewsCount: 42,
    description: 'Heavyweight 18oz duck canvas combined with 3mm bridle leather straps. Features an interior 14-inch laptop sleeve and brass key clip.',
    materials: ['18oz Duck Canvas', 'Bridle Leather Straps', 'Solid Brass Rivets'],
  },
  {
    id: 'prod-06',
    name: 'Stoneware Espresso Cup Pair',
    category: 'ceramics',
    categoryLabel: 'Ceramics',
    price: 280000,
    image: 'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?auto=format&fit=crop&w=800&q=80',
    stock: 20,
    rating: 4.8,
    reviewsCount: 31,
    description: 'Set of two 90ml cups thrown with grogged clay for a tactile textured grip. Stackable silhouette with unglazed footing.',
    materials: ['Grogged Stoneware', 'Matte Cream Glaze'],
  },
];

export function createCatalogFeature() {
  let products = $state<Product[]>(INITIAL_PRODUCTS);
  let searchQuery = $state('');
  let activeCategory = $state<string>('all');
  let sortBy = $state<'featured' | 'price-asc' | 'price-desc'>('featured');

  const filteredProducts = $derived.by(() => {
    let list = products.slice();

    if (activeCategory !== 'all') {
      list = list.filter((p) => p.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }

    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    }

    return list;
  });

  return {
    get products() { return products; },
    get searchQuery() { return searchQuery; },
    set searchQuery(v: string) { searchQuery = v; },
    get activeCategory() { return activeCategory; },
    set activeCategory(v: string) { activeCategory = v; },
    get sortBy() { return sortBy; },
    set sortBy(v: 'featured' | 'price-asc' | 'price-desc') { sortBy = v; },
    get filteredProducts() { return filteredProducts; },
    getProductById(id: string) {
      return products.find((p) => p.id === id);
    },
  };
}

export const catalogFeature = createCatalogFeature();
