<script lang="ts">
  import { catalogFeature } from '$lib/features/catalog/catalog.svelte';
  import { cartFeature } from '$lib/features/cart/cart.svelte';
  import { ShoppingBag, Search, Sparkles, Star, ArrowUpRight } from 'lucide-svelte';

  function formatIdr(amount: number) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(amount);
  }

  const categories = [
    { id: 'all', label: 'All Curations' },
    { id: 'leather', label: 'Leather Goods' },
    { id: 'ceramics', label: 'Ceramics' },
    { id: 'apparel', label: 'Linen Apparel' },
    { id: 'objects', label: 'Brass Objects' },
  ];
</script>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
  <!-- Editorial Hero Banner -->
  <section class="relative rounded-2xl bg-white border border-[var(--ui-border)] p-8 sm:p-12 overflow-hidden shadow-xs">
    <div class="max-w-2xl space-y-4">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5F2F0] text-xs font-semibold uppercase tracking-wider text-[#A13F20]">
        <Sparkles class="w-3.5 h-3.5" />
        <span>Autumn 2026 Collection</span>
      </div>
      <h1 class="text-3xl sm:text-5xl font-bold tracking-tight text-[#1B1C1C] leading-[1.15]">
        Tangible objects crafted with human patience.
      </h1>
      <p class="text-base text-[#767575] leading-relaxed">
        Vegetable-tanned leathers, unglazed architectural ceramics, and Normandy flax linens made to endure everyday life.
      </p>
    </div>
  </section>

  <!-- Filter & Search Toolbar -->
  <section class="space-y-4">
    <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
      <!-- Category Pills -->
      <div class="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
        {#each categories as cat}
          <button
            type="button"
            onclick={() => (catalogFeature.activeCategory = cat.id)}
            class="px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all {catalogFeature.activeCategory === cat.id ? 'bg-[#1B1C1C] text-white shadow-xs' : 'bg-white border border-[var(--ui-border)] text-[#767575] hover:text-[#1B1C1C] hover:border-[#1B1C1C]/40'}"
          >
            {cat.label}
          </button>
        {/each}
      </div>

      <!-- Search Input -->
      <div class="relative w-full sm:w-72">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#767575]" />
        <input
          type="text"
          bind:value={catalogFeature.searchQuery}
          placeholder="Search goods..."
          class="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-[var(--ui-border)] text-xs text-[#1B1C1C] placeholder:text-[#767575] focus:outline-none focus:ring-1 focus:ring-[#A13F20] transition-shadow"
        />
      </div>
    </div>
  </section>

  <!-- Product Grid -->
  <section>
    {#if catalogFeature.filteredProducts.length === 0}
      <div class="rounded-2xl border border-[var(--ui-border)] bg-white p-12 text-center">
        <p class="text-sm font-semibold text-[#1B1C1C]">No pieces found</p>
        <p class="text-xs text-[#767575] mt-1">Try resetting search filters</p>
      </div>
    {:else}
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each catalogFeature.filteredProducts as product (product.id)}
          <article class="group relative rounded-2xl bg-white border border-[var(--ui-border)] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <!-- Product Image Frame -->
              <div class="relative aspect-4/3 bg-[#FBF9F9] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  class="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
                />
                {#if product.badge}
                  <span class="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#1B1C1C]/85 backdrop-blur-xs text-[10px] font-bold uppercase tracking-wider text-white">
                    {product.badge}
                  </span>
                {/if}
              </div>

              <!-- Content Meta -->
              <div class="p-5 space-y-2">
                <div class="flex items-center justify-between text-xs text-[#767575]">
                  <span>{product.categoryLabel}</span>
                  <div class="flex items-center gap-1 font-mono text-[11px] text-[#1B1C1C]">
                    <Star class="w-3.5 h-3.5 fill-[#E97451] text-[#E97451]" />
                    <span class="tabular-nums font-semibold">{product.rating}</span>
                    <span class="text-[#767575]">({product.reviewsCount})</span>
                  </div>
                </div>

                <a href="/product/{product.id}" class="block group-hover:text-[#A13F20] transition-colors">
                  <h3 class="text-base font-bold text-[#1B1C1C] leading-snug">{product.name}</h3>
                </a>

                <p class="text-xs text-[#767575] line-clamp-2 leading-relaxed">
                  {product.description}
                </p>
              </div>
            </div>

            <!-- Price & Add Button -->
            <div class="p-5 pt-0 border-t border-[var(--ui-border)]/50 mt-4 flex items-center justify-between">
              <div>
                <p class="text-xs text-[#767575]">Price</p>
                <div class="flex items-baseline gap-2">
                  <span class="font-mono text-sm font-bold text-[#1B1C1C] tabular-nums">
                    {formatIdr(product.price)}
                  </span>
                  {#if product.originalPrice}
                    <span class="font-mono text-xs text-[#767575] line-through tabular-nums">
                      {formatIdr(product.originalPrice)}
                    </span>
                  {/if}
                </div>
              </div>

              <div class="flex items-center gap-2">
                <a
                  href="/product/{product.id}"
                  class="p-2.5 rounded-xl border border-[var(--ui-border)] text-[#1B1C1C] hover:bg-[#F5F2F0] transition-colors"
                  aria-label="View product details"
                >
                  <ArrowUpRight class="w-4 h-4" />
                </a>
                <button
                  type="button"
                  onclick={() => cartFeature.addItem(product, 1)}
                  class="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#A13F20] text-white text-xs font-semibold hover:bg-[#8B3419] transition-colors shadow-xs"
                >
                  <ShoppingBag class="w-3.5 h-3.5" />
                  <span>Add to Bag</span>
                </button>
              </div>
            </div>
          </article>
        {/each}
      </div>
    {/if}
  </section>
</div>
