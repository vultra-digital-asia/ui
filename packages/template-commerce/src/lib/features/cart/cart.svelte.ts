import type { Product } from '../catalog/catalog.svelte.js';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: string;
}

export function createCartFeature() {
  let items = $state<CartItem[]>([
    {
      product: {
        id: 'prod-01',
        name: 'Atelier Vegetable-Tanned Cardholder',
        category: 'leather',
        categoryLabel: 'Leather Goods',
        price: 480000,
        image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80',
        stock: 12,
        rating: 4.9,
        reviewsCount: 38,
        description: '',
        materials: [],
      },
      quantity: 1,
      selectedVariant: 'Natural Tan',
    },
  ]);
  let isDrawerOpen = $state(false);
  let couponCode = $state('VULTRA10');
  let discountPercentage = $state(10); // 10%

  const totalQuantity = $derived(
    items.reduce((sum, item) => sum + item.quantity, 0)
  );

  const subtotal = $derived(
    items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  );

  const discountAmount = $derived(
    Math.round(subtotal * (discountPercentage / 100))
  );

  const shippingCost = $derived(
    subtotal > 500000 ? 0 : 25000
  );

  const grandTotal = $derived(
    Math.max(0, subtotal - discountAmount + shippingCost)
  );

  function addItem(product: Product, quantity = 1, selectedVariant?: string) {
    const existingIndex = items.findIndex(
      (it) => it.product.id === product.id && it.selectedVariant === selectedVariant
    );
    if (existingIndex > -1) {
      items[existingIndex].quantity += quantity;
    } else {
      items.push({ product, quantity, selectedVariant });
    }
    isDrawerOpen = true;
  }

  function updateQuantity(productId: string, quantity: number, variant?: string) {
    if (quantity <= 0) {
      removeItem(productId, variant);
      return;
    }
    const target = items.find(
      (it) => it.product.id === productId && it.selectedVariant === variant
    );
    if (target) {
      target.quantity = quantity;
    }
  }

  function removeItem(productId: string, variant?: string) {
    items = items.filter(
      (it) => !(it.product.id === productId && it.selectedVariant === variant)
    );
  }

  function applyCoupon(code: string) {
    if (code.trim().toUpperCase() === 'VULTRA10') {
      couponCode = 'VULTRA10';
      discountPercentage = 10;
      return { success: true, message: 'Diskon 10% berhasil diterapkan' };
    }
    return { success: false, message: 'Kode voucher tidak valid' };
  }

  return {
    get items() { return items; },
    get isDrawerOpen() { return isDrawerOpen; },
    set isDrawerOpen(v: boolean) { isDrawerOpen = v; },
    get totalQuantity() { return totalQuantity; },
    get subtotal() { return subtotal; },
    get discountPercentage() { return discountPercentage; },
    get discountAmount() { return discountAmount; },
    get shippingCost() { return shippingCost; },
    get grandTotal() { return grandTotal; },
    get couponCode() { return couponCode; },
    set couponCode(v: string) { couponCode = v; },
    addItem,
    updateQuantity,
    removeItem,
    applyCoupon,
  };
}

export const cartFeature = createCartFeature();
