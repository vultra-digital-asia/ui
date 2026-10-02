<script lang="ts">
  import { goto } from '$app/navigation';
  import { cartFeature } from '$lib/features/cart/cart.svelte';
  import { checkoutFeature, type PaymentMethod } from '$lib/features/checkout/checkout.svelte';
  import { ArrowLeft, ShieldCheck, QrCode, CreditCard, Building2, CheckCircle2 } from 'lucide-svelte';

  function formatIdr(amount: number) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(amount);
  }

  const paymentOptions: Array<{ id: PaymentMethod; label: string; desc: string; icon: any }> = [
    { id: 'qris', label: 'QRIS Instant', desc: 'GoPay, OVO, ShopeePay, Dana, BCA QR', icon: QrCode },
    { id: 'va_bca', label: 'BCA Virtual Account', desc: 'Realtime automated verification', icon: Building2 },
    { id: 'va_mandiri', label: 'Mandiri Livin VA', desc: 'Instant confirmation without proof upload', icon: Building2 },
    { id: 'card', label: 'Credit / Debit Card', desc: 'Visa, Mastercard, JCB (3DS Secured)', icon: CreditCard },
  ];

  async function handleOrder() {
    const res = await checkoutFeature.submitOrder(cartFeature.grandTotal);
    if (res.success) {
      goto('/order-confirmed');
    }
  }
</script>

<div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
  <div>
    <a
      href="/"
      class="inline-flex items-center gap-2 text-xs font-semibold text-[#767575] hover:text-[#1B1C1C] transition-colors"
    >
      <ArrowLeft class="w-3.5 h-3.5" />
      <span>Continue Shopping</span>
    </a>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
    <!-- Left Column: Shipping & Payment Method (7 cols) -->
    <div class="lg:col-span-7 space-y-6">
      <!-- Shipping Destination -->
      <section class="rounded-2xl border border-[var(--ui-border)] bg-white p-6 sm:p-8 space-y-4 shadow-xs">
        <h2 class="text-base font-bold text-[#1B1C1C]">1. Shipping Destination</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label for="checkout-name" class="block font-semibold text-[#767575] mb-1">Full Name</label>
            <input
              id="checkout-name"
              type="text"
              bind:value={checkoutFeature.address.fullName}
              class="w-full px-3.5 py-2.5 rounded-xl border border-[var(--ui-border)] bg-[#FBF9F9] text-[#1B1C1C] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#A13F20]"
            />
          </div>
          <div>
            <label for="checkout-phone" class="block font-semibold text-[#767575] mb-1">Phone Number</label>
            <input
              id="checkout-phone"
              type="tel"
              bind:value={checkoutFeature.address.phone}
              class="w-full px-3.5 py-2.5 rounded-xl border border-[var(--ui-border)] bg-[#FBF9F9] text-[#1B1C1C] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#A13F20]"
            />
          </div>
          <div class="sm:col-span-2">
            <label for="checkout-street" class="block font-semibold text-[#767575] mb-1">Delivery Address</label>
            <input
              id="checkout-street"
              type="text"
              bind:value={checkoutFeature.address.street}
              class="w-full px-3.5 py-2.5 rounded-xl border border-[var(--ui-border)] bg-[#FBF9F9] text-[#1B1C1C] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#A13F20]"
            />
          </div>
          <div>
            <label for="checkout-city" class="block font-semibold text-[#767575] mb-1">City / District</label>
            <input
              id="checkout-city"
              type="text"
              bind:value={checkoutFeature.address.city}
              class="w-full px-3.5 py-2.5 rounded-xl border border-[var(--ui-border)] bg-[#FBF9F9] text-[#1B1C1C] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#A13F20]"
            />
          </div>
          <div>
            <label for="checkout-postal" class="block font-semibold text-[#767575] mb-1">Postal Code</label>
            <input
              id="checkout-postal"
              type="text"
              bind:value={checkoutFeature.address.postalCode}
              class="w-full px-3.5 py-2.5 rounded-xl border border-[var(--ui-border)] bg-[#FBF9F9] text-[#1B1C1C] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#A13F20]"
            />
          </div>
        </div>
      </section>

      <!-- Payment Method -->
      <section class="rounded-2xl border border-[var(--ui-border)] bg-white p-6 sm:p-8 space-y-4 shadow-xs">
        <h2 class="text-base font-bold text-[#1B1C1C]">2. Payment Method</h2>
        <div class="space-y-3">
          {#each paymentOptions as opt}
            <button
              type="button"
              onclick={() => (checkoutFeature.selectedPayment = opt.id)}
              class="w-full text-left p-4 rounded-xl border flex items-center justify-between transition-all {checkoutFeature.selectedPayment === opt.id ? 'border-[#A13F20] bg-[#F5F2F0]/60 ring-1 ring-[#A13F20]' : 'border-[var(--ui-border)] bg-white hover:border-[#1B1C1C]'}"
            >
              <div class="flex items-center gap-3">
                <div class="p-2 rounded-lg bg-[#FBF9F9] border border-[var(--ui-border)] text-[#A13F20]">
                  <svelte:component this={opt.icon} class="w-4 h-4" />
                </div>
                <div>
                  <h4 class="text-xs font-bold text-[#1B1C1C]">{opt.label}</h4>
                  <p class="text-[11px] text-[#767575]">{opt.desc}</p>
                </div>
              </div>
              {#if checkoutFeature.selectedPayment === opt.id}
                <CheckCircle2 class="w-4 h-4 text-[#A13F20]" />
              {/if}
            </button>
          {/each}
        </div>
      </section>
    </div>

    <!-- Right Column: Order Summary (5 cols) -->
    <div class="lg:col-span-5 space-y-6">
      <section class="rounded-2xl border border-[var(--ui-border)] bg-white p-6 sm:p-8 space-y-6 shadow-xs sticky top-24">
        <h3 class="text-base font-bold text-[#1B1C1C]">Order Review ({cartFeature.totalQuantity} items)</h3>

        <div class="space-y-3 max-h-60 overflow-y-auto divide-y divide-[var(--ui-border)] pr-1">
          {#each cartFeature.items as item}
            <div class="pt-3 first:pt-0 flex gap-3 text-xs">
              <img
                src={item.product.image}
                alt={item.product.name}
                class="w-14 h-14 object-cover rounded-lg border border-[var(--ui-border)] shrink-0"
              />
              <div class="flex-1 min-w-0">
                <p class="font-semibold text-[#1B1C1C] truncate">{item.product.name}</p>
                <p class="text-[11px] text-[#767575]">Qty: {item.quantity}</p>
                <p class="font-mono text-[#A13F20] font-medium tabular-nums mt-0.5">
                  {formatIdr(item.product.price * item.quantity)}
                </p>
              </div>
            </div>
          {/each}
        </div>

        <div class="border-t border-[var(--ui-border)] pt-4 space-y-2 text-xs">
          <div class="flex justify-between text-[#767575]">
            <span>Subtotal</span>
            <span class="font-mono text-[#1B1C1C] tabular-nums">{formatIdr(cartFeature.subtotal)}</span>
          </div>
          <div class="flex justify-between text-[#767575]">
            <span>Member Privilege Voucher</span>
            <span class="font-mono text-[#2F6B57] tabular-nums">-{formatIdr(cartFeature.discountAmount)}</span>
          </div>
          <div class="flex justify-between text-[#767575]">
            <span>Climate-Neutral Shipping</span>
            <span class="font-mono text-[#1B1C1C] tabular-nums">
              {cartFeature.shippingCost === 0 ? 'Complimentary' : formatIdr(cartFeature.shippingCost)}
            </span>
          </div>
          <div class="border-t border-[var(--ui-border)] pt-3 flex justify-between text-sm font-bold text-[#1B1C1C]">
            <span>Grand Total</span>
            <span class="font-mono text-[#A13F20] tabular-nums">{formatIdr(cartFeature.grandTotal)}</span>
          </div>
        </div>

        <button
          type="button"
          disabled={checkoutFeature.isSubmitting || cartFeature.items.length === 0}
          onclick={handleOrder}
          class="w-full py-3.5 px-4 rounded-xl bg-[#A13F20] text-white font-semibold text-sm hover:bg-[#8B3419] transition-colors shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {#if checkoutFeature.isSubmitting}
            <span>Processing Order...</span>
          {:else}
            <span>Complete Payment • {formatIdr(cartFeature.grandTotal)}</span>
          {/if}
        </button>

        <div class="flex items-center justify-center gap-2 text-[11px] text-[#767575]">
          <ShieldCheck class="w-3.5 h-3.5 text-[#2F6B57]" />
          <span>PCI-DSS Level 1 & Bank Grade Encryption</span>
        </div>
      </section>
    </div>
  </div>
</div>
