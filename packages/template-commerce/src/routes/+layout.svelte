<script lang="ts">
  import '../app.css';
  import { cartFeature } from '$lib/features/cart/cart.svelte';
  import { ShoppingBag, Search, X, Plus, Minus, ArrowRight, ShieldCheck } from 'lucide-svelte';

  let { children } = $props();

  function formatIdr(amount: number) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(amount);
  }
</script>

<div class="min-h-screen bg-[var(--ui-background)] text-[var(--ui-foreground)] flex flex-col font-sans">
  <!-- Top Global Announcement -->
  <aside class="bg-[#1B1C1C] text-[#FBF9F9] py-2 px-4 text-center text-xs tracking-wider uppercase font-medium">
    Complimentary Climate-Neutral Delivery on Orders Above Rp 500.000
  </aside>

  <!-- Main Navbar -->
  <header class="sticky top-0 z-40 bg-[var(--ui-background)]/85 backdrop-blur-md border-b border-[var(--ui-border)] transition-colors">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
      <!-- Brand -->
      <a href="/" class="flex items-center gap-2 group">
        <div class="w-8 h-8 rounded-lg bg-[#A13F20] text-white flex items-center justify-center font-bold text-base shadow-sm">
          V
        </div>
        <span class="font-bold tracking-tight text-lg text-[#1B1C1C] group-hover:text-[#A13F20] transition-colors">
          ATELIER COMMERCE
        </span>
      </a>

      <!-- Desktop Nav -->
      <nav class="hidden md:flex items-center gap-6 text-sm font-medium text-[#767575]">
        <a href="/" class="hover:text-[#1B1C1C] transition-colors text-[#1B1C1C]">Curated Goods</a>
        <a href="/#leather" class="hover:text-[#1B1C1C] transition-colors">Leather</a>
        <a href="/#ceramics" class="hover:text-[#1B1C1C] transition-colors">Ceramics</a>
        <a href="/#apparel" class="hover:text-[#1B1C1C] transition-colors">Linen Apparel</a>
      </nav>

      <!-- Cart Button & Trigger -->
      <div class="flex items-center gap-3">
        <button
          type="button"
          onclick={() => (cartFeature.isDrawerOpen = true)}
          class="relative flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[var(--ui-border)] shadow-xs hover:border-[#A13F20]/40 transition-all text-sm font-medium"
          aria-label="Open Shopping Bag"
        >
          <ShoppingBag class="w-4 h-4 text-[#A13F20]" />
          <span class="hidden sm:inline text-xs font-semibold uppercase tracking-wider text-[#1B1C1C]">Bag</span>
          {#if cartFeature.totalQuantity > 0}
            <span class="inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold bg-[#A13F20] text-white rounded-full min-w-5 h-5 tabular-nums">
              {cartFeature.totalQuantity}
            </span>
          {/if}
        </button>
      </div>
    </div>
  </header>

  <!-- Main Content Slot -->
  <main class="flex-1">
    {@render children()}
  </main>

  <!-- Slide-Over Cart Drawer -->
  {#if cartFeature.isDrawerOpen}
    <div class="fixed inset-0 z-50 overflow-hidden">
      <!-- Backdrop -->
      <div
        class="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        role="button"
        tabindex="0"
        aria-label="Close Bag"
        onclick={() => (cartFeature.isDrawerOpen = false)}
        onkeydown={(e) => e.key === 'Escape' && (cartFeature.isDrawerOpen = false)}
      ></div>

      <div class="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div class="w-screen max-w-md bg-white border-l border-[var(--ui-border)] shadow-2xl flex flex-col">
          <!-- Drawer Header -->
          <div class="p-6 border-b border-[var(--ui-border)] flex items-center justify-between">
            <div class="flex items-center gap-2">
              <ShoppingBag class="w-5 h-5 text-[#A13F20]" />
              <h2 class="text-base font-bold text-[#1B1C1C]">Shopping Bag ({cartFeature.totalQuantity})</h2>
            </div>
            <button
              type="button"
              onclick={() => (cartFeature.isDrawerOpen = false)}
              class="p-2 rounded-lg text-[#767575] hover:text-[#1B1C1C] hover:bg-[#F5F2F0] transition-colors"
              aria-label="Close"
            >
              <X class="w-5 h-5" />
            </button>
          </div>

          <!-- Drawer Body (Items List) -->
          <div class="flex-1 overflow-y-auto p-6 divide-y divide-[var(--ui-border)]">
            {#if cartFeature.items.length === 0}
              <div class="h-full flex flex-col items-center justify-center text-center py-12">
                <ShoppingBag class="w-12 h-12 text-[#A8A29E] mb-3 stroke-1" />
                <p class="text-sm font-semibold text-[#1B1C1C]">Your bag is currently empty</p>
                <p class="text-xs text-[#767575] mt-1">Explore our handcrafted pieces to begin</p>
              </div>
            {:else}
              {#each cartFeature.items as item (item.product.id + (item.selectedVariant || ''))}
                <div class="py-4 first:pt-0 last:pb-0 flex gap-4">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    class="w-20 h-20 object-cover rounded-xl border border-[var(--ui-border)] bg-[#FBF9F9] shrink-0"
                  />
                  <div class="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <h4 class="text-sm font-semibold text-[#1B1C1C] truncate">{item.product.name}</h4>
                      {#if item.selectedVariant}
                        <p class="text-xs text-[#767575] mt-0.5">{item.selectedVariant}</p>
                      {/if}
                      <p class="text-xs font-mono font-medium text-[#A13F20] mt-1 tabular-nums">
                        {formatIdr(item.product.price)}
                      </p>
                    </div>

                    <div class="flex items-center justify-between mt-3">
                      <div class="flex items-center border border-[var(--ui-border)] rounded-lg bg-[#FBF9F9] overflow-hidden">
                        <button
                          type="button"
                          onclick={() => cartFeature.updateQuantity(item.product.id, item.quantity - 1, item.selectedVariant)}
                          class="p-1 hover:bg-white text-[#767575] hover:text-[#1B1C1C] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus class="w-3.5 h-3.5" />
                        </button>
                        <span class="px-2.5 text-xs font-semibold tabular-nums text-[#1B1C1C]">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onclick={() => cartFeature.updateQuantity(item.product.id, item.quantity + 1, item.selectedVariant)}
                          class="p-1 hover:bg-white text-[#767575] hover:text-[#1B1C1C] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus class="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onclick={() => cartFeature.removeItem(item.product.id, item.selectedVariant)}
                        class="text-xs text-[#BA1A1A] hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              {/each}
            {/if}
          </div>

          <!-- Drawer Footer (Subtotal & Checkout CTA) -->
          {#if cartFeature.items.length > 0}
            <div class="p-6 border-t border-[var(--ui-border)] bg-[#FBF9F9] space-y-3">
              <div class="flex justify-between text-xs text-[#767575]">
                <span>Subtotal</span>
                <span class="font-mono text-[#1B1C1C] tabular-nums">{formatIdr(cartFeature.subtotal)}</span>
              </div>
              <div class="flex justify-between text-xs text-[#767575]">
                <span>Member Discount (10%)</span>
                <span class="font-mono text-[#2F6B57] tabular-nums">-{formatIdr(cartFeature.discountAmount)}</span>
              </div>
              <div class="flex justify-between text-xs text-[#767575]">
                <span>Shipping</span>
                <span class="font-mono text-[#1B1C1C] tabular-nums">
                  {cartFeature.shippingCost === 0 ? 'Free' : formatIdr(cartFeature.shippingCost)}
                </span>
              </div>
              <div class="border-t border-[var(--ui-border)] pt-2 flex justify-between text-sm font-bold text-[#1B1C1C]">
                <span>Estimated Total</span>
                <span class="font-mono text-[#A13F20] tabular-nums">{formatIdr(cartFeature.grandTotal)}</span>
              </div>

              <a
                href="/checkout"
                onclick={() => (cartFeature.isDrawerOpen = false)}
                class="w-full mt-4 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#A13F20] text-white font-semibold text-sm shadow-md hover:bg-[#8B3419] transition-colors"
              >
                Proceed to Checkout
                <ArrowRight class="w-4 h-4" />
              </a>

              <div class="flex items-center justify-center gap-1.5 text-[11px] text-[#767575] pt-1">
                <ShieldCheck class="w-3.5 h-3.5 text-[#2F6B57]" />
                <span>Encrypted 256-bit checkout • 14-day atelier guarantee</span>
              </div>
            </div>
          {/if}
        </div>
      </div>
    </div>
  {/if}

  <!-- Footer -->
  <footer class="border-t border-[var(--ui-border)] bg-white py-12 px-4 sm:px-6 lg:px-8 mt-20">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#767575]">
      <div class="flex items-center gap-3">
        <span class="font-bold text-[#1B1C1C]">ATELIER COMMERCE</span>
        <span>•</span>
        <span>Crafted for high-end digital lifestyle</span>
      </div>
      <div>
        <span>Built with Vultra UI • Svelte 5 Thin-Page Architecture</span>
      </div>
    </div>
  </footer>
</div>
