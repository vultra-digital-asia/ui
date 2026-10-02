<script lang="ts">
  import { checkoutFeature } from '$lib/features/checkout/checkout.svelte';
  import { cartFeature } from '$lib/features/cart/cart.svelte';
  import { CheckCircle2, ArrowRight, Package, Truck, Check, Home } from 'lucide-svelte';

  const orderNum = $derived(checkoutFeature.orderNumber || 'VLT-839201');

  function formatIdr(amount: number) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(amount);
  }

  const steps = [
    { label: 'Payment Confirmed', desc: 'Instant via QRIS/VA', done: true },
    { label: 'Crafting & Inspection', desc: 'Atelier Workshop Jakarta', current: true },
    { label: 'Courier Handover', desc: 'JNE / SiCepat Cargo', done: false },
    { label: 'Delivered', desc: 'Direct to recipient', done: false },
  ];
</script>

<div class="max-w-2xl mx-auto px-4 sm:px-6 py-12 space-y-8">
  <div class="rounded-2xl border border-[var(--ui-border)] bg-white p-8 sm:p-10 text-center space-y-4 shadow-xs">
    <div class="w-14 h-14 rounded-full bg-[#2F6B57]/10 text-[#2F6B57] flex items-center justify-center mx-auto">
      <CheckCircle2 class="w-8 h-8" />
    </div>

    <div class="space-y-1">
      <h1 class="text-2xl font-bold tracking-tight text-[#1B1C1C]">Payment Verified Successfully</h1>
      <p class="text-xs text-[#767575]">Order reference <span class="font-mono font-semibold text-[#1B1C1C]">{orderNum}</span></p>
    </div>

    <div class="border-t border-b border-[var(--ui-border)] py-4 my-6 text-xs grid grid-cols-2 gap-4 text-left">
      <div>
        <span class="text-[#767575] block">Recipient</span>
        <span class="font-semibold text-[#1B1C1C]">{checkoutFeature.address.fullName}</span>
      </div>
      <div>
        <span class="text-[#767575] block">Total Paid</span>
        <span class="font-mono font-bold text-[#A13F20] tabular-nums">{formatIdr(cartFeature.grandTotal || 457000)}</span>
      </div>
    </div>

    <!-- Stepper Status -->
    <div class="text-left space-y-4 pt-2">
      <h3 class="text-xs font-bold text-[#1B1C1C] uppercase tracking-wider">Fulfillment Lifecycle</h3>
      <div class="space-y-4">
        {#each steps as step, i}
          <div class="flex items-start gap-3">
            <div class="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 {step.done ? 'bg-[#2F6B57] text-white' : step.current ? 'bg-[#A13F20] text-white ring-4 ring-[#A13F20]/20' : 'bg-[#E8E4E1] text-[#767575]'}">
              {#if step.done}
                <Check class="w-3 h-3" />
              {:else}
                {i + 1}
              {/if}
            </div>
            <div>
              <p class="text-xs font-semibold text-[#1B1C1C]">{step.label}</p>
              <p class="text-[11px] text-[#767575]">{step.desc}</p>
            </div>
          </div>
        {/each}
      </div>
    </div>

    <div class="pt-6">
      <a
        href="/"
        class="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-[#1B1C1C] text-white text-xs font-semibold hover:bg-black transition-colors"
      >
        <Home class="w-4 h-4" />
        <span>Return to Atelier Storefront</span>
      </a>
    </div>
  </div>
</div>
