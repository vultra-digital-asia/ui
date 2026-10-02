<script lang="ts">
  import { page } from '$app/state';
  import { catalogFeature } from '$lib/features/catalog/catalog.svelte';
  import { cartFeature } from '$lib/features/cart/cart.svelte';
  import { ShoppingBag, ArrowLeft, Star, ShieldCheck, Truck, RefreshCw, Check } from 'lucide-svelte';

  const productId = $derived(page.params.id);
  const product = $derived(catalogFeature.getProductById(productId) || catalogFeature.products[0]);

  let selectedVariant = $state('Standard Edition');
  let quantity = $state(1);

  const variants = ['Natural Tan', 'Espresso Dark', 'Olive Patina'];

  function formatIdr(amount: number) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(amount);
  }
</script>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
  <!-- Back Breadcrumb -->
  <div>
    <a
      href="/"
      class="inline-flex items-center gap-2 text-xs font-semibold text-[#767575] hover:text-[#1B1C1C] transition-colors"
    >
      <ArrowLeft class="w-3.5 h-3.5" />
      <span>Back to Curated Collection</span>
    </a>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
    <!-- Image Preview Showcase -->
    <div class="space-y-4">
      <div class="rounded-2xl border border-[var(--ui-border)] overflow-hidden bg-white aspect-4/3 shadow-xs">
        <img
          src={product.image}
          alt={product.name}
          class="w-full h-full object-cover"
        />
      </div>

      <div class="grid grid-cols-3 gap-3">
        <div class="aspect-square rounded-xl border-2 border-[#A13F20] overflow-hidden bg-white p-1">
          <img src={product.image} alt="Thumbnail 1" class="w-full h-full object-cover rounded-lg" />
        </div>
        <div class="aspect-square rounded-xl border border-[var(--ui-border)] overflow-hidden bg-white p-1 opacity-70 hover:opacity-100 transition-opacity">
          <img src={product.image} alt="Thumbnail 2" class="w-full h-full object-cover rounded-lg filter saturate-150" />
        </div>
        <div class="aspect-square rounded-xl border border-[var(--ui-border)] overflow-hidden bg-white p-1 opacity-70 hover:opacity-100 transition-opacity">
          <img src={product.image} alt="Thumbnail 3" class="w-full h-full object-cover rounded-lg filter contrast-125" />
        </div>
      </div>
    </div>

    <!-- Product Purchasing Options -->
    <div class="space-y-8 bg-white border border-[var(--ui-border)] rounded-2xl p-8 sm:p-10 shadow-xs">
      <div class="space-y-3">
        <div class="flex items-center justify-between text-xs text-[#767575]">
          <span class="uppercase tracking-wider font-semibold text-[#A13F20]">{product.categoryLabel}</span>
          <div class="flex items-center gap-1 font-mono text-[11px] text-[#1B1C1C]">
            <Star class="w-3.5 h-3.5 fill-[#E97451] text-[#E97451]" />
            <span class="tabular-nums font-bold">{product.rating}</span>
            <span class="text-[#767575]">({product.reviewsCount} reviews)</span>
          </div>
        </div>

        <h1 class="text-2xl sm:text-3xl font-bold tracking-tight text-[#1B1C1C]">
          {product.name}
        </h1>

        <div class="flex items-baseline gap-3 pt-1">
          <span class="font-mono text-2xl font-bold text-[#1B1C1C] tabular-nums">
            {formatIdr(product.price)}
          </span>
          {#if product.originalPrice}
            <span class="font-mono text-sm text-[#767575] line-through tabular-nums">
              {formatIdr(product.originalPrice)}
            </span>
          {/if}
        </div>
      </div>

      <p class="text-xs text-[#767575] leading-relaxed border-t border-[var(--ui-border)] pt-4">
        {product.description}
      </p>

      <!-- Variant Selector -->
      <div class="space-y-3">
        <div class="flex justify-between text-xs font-semibold text-[#1B1C1C]">
          <span>Material & Colorway</span>
          <span class="text-[#A13F20]">{selectedVariant}</span>
        </div>
        <div class="grid grid-cols-3 gap-2">
          {#each variants as variant}
            <button
              type="button"
              onclick={() => (selectedVariant = variant)}
              class="py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all text-center {selectedVariant === variant ? 'border-[#A13F20] bg-[#F5F2F0] text-[#A13F20] shadow-xs' : 'border-[var(--ui-border)] bg-white text-[#767575] hover:border-[#1B1C1C]'}"
            >
              {variant}
            </button>
          {/each}
        </div>
      </div>

      <!-- Quantity & Add Action -->
      <div class="space-y-4 pt-2">
        <div class="flex items-center gap-3">
          <div class="flex items-center border border-[var(--ui-border)] rounded-xl bg-[#FBF9F9] p-1">
            <button
              type="button"
              onclick={() => (quantity = Math.max(1, quantity - 1))}
              class="px-3 py-1.5 text-sm font-semibold hover:bg-white rounded-lg text-[#767575] hover:text-[#1B1C1C]"
              aria-label="Decrease"
            >
              -
            </button>
            <span class="px-4 text-xs font-mono font-bold tabular-nums text-[#1B1C1C]">{quantity}</span>
            <button
              type="button"
              onclick={() => (quantity += 1)}
              class="px-3 py-1.5 text-sm font-semibold hover:bg-white rounded-lg text-[#767575] hover:text-[#1B1C1C]"
              aria-label="Increase"
            >
              +
            </button>
          </div>

          <button
            type="button"
            onclick={() => cartFeature.addItem(product, quantity, selectedVariant)}
            class="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-[#A13F20] text-white font-semibold text-sm hover:bg-[#8B3419] transition-colors shadow-md"
          >
            <ShoppingBag class="w-4 h-4" />
            <span>Add to Bag • {formatIdr(product.price * quantity)}</span>
          </button>
        </div>

        <div class="grid grid-cols-3 gap-2 pt-4 border-t border-[var(--ui-border)] text-[11px] text-[#767575]">
          <div class="flex items-center gap-1.5">
            <Truck class="w-3.5 h-3.5 text-[#2F6B57]" />
            <span>Fast Dispatch</span>
          </div>
          <div class="flex items-center gap-1.5">
            <ShieldCheck class="w-3.5 h-3.5 text-[#2F6B57]" />
            <span>Authentic Craft</span>
          </div>
          <div class="flex items-center gap-1.5">
            <RefreshCw class="w-3.5 h-3.5 text-[#2F6B57]" />
            <span>14-Day Return</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
