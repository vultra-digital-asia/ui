<script lang="ts">
  import { ScreenCheckoutModal } from '@vultra/screens';
  import { Check, ShieldCheck, Zap, ArrowRight } from 'lucide-svelte';
  import { createBillingFeature } from '$lib/features/billing/billing.svelte.js';

  const billing = createBillingFeature();
</script>

<div class="space-y-8">
  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    <div>
      <h1 class="text-2xl font-bold tracking-tight">Billing & Plans</h1>
      <p class="text-sm text-[var(--ui-muted-foreground)]">Change subscription tiers or manage payment methods.</p>
    </div>

    <!-- Monthly / Annual Toggle -->
    <div class="inline-flex items-center rounded-lg border border-[var(--ui-border)] bg-[var(--ui-secondary)]/50 p-1 text-xs font-medium">
      <button
        type="button"
        onclick={() => (billing.isAnnual = false)}
        class="rounded-md px-3 py-1.5 transition-all {!billing.isAnnual ? 'bg-[var(--ui-background)] text-[var(--ui-foreground)] shadow-xs' : 'text-[var(--ui-muted-foreground)]'}"
      >
        Monthly
      </button>
      <button
        type="button"
        onclick={() => (billing.isAnnual = true)}
        class="rounded-md px-3 py-1.5 transition-all {billing.isAnnual ? 'bg-[var(--ui-background)] text-[var(--ui-foreground)] shadow-xs' : 'text-[var(--ui-muted-foreground)]'}"
      >
        Annual <span class="text-emerald-600 font-semibold">(Save 20%)</span>
      </button>
    </div>
  </div>

  <!-- Plans Grid -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    {#each billing.plans as plan (plan.id)}
      <div
        class="relative flex flex-col justify-between rounded-xl border p-6 transition-all {plan.popular ? 'border-[var(--ui-primary)] bg-[var(--ui-background)] shadow-md ring-1 ring-[var(--ui-primary)]' : 'border-[var(--ui-border)] bg-[var(--ui-card)] shadow-xs'}"
      >
        {#if plan.popular}
          <div class="absolute -top-3 right-6 rounded-full bg-[var(--ui-primary)] px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[var(--ui-primary-foreground)]">
            Popular Choice
          </div>
        {/if}

        <div>
          <h3 class="text-lg font-bold">{plan.name}</h3>
          <div class="mt-4 flex items-baseline gap-1">
            <span class="text-3xl font-extrabold tracking-tight">${billing.isAnnual ? plan.priceAnnual : plan.priceMonthly}</span>
            <span class="text-xs text-[var(--ui-muted-foreground)]">/ user / mo</span>
          </div>

          <ul class="mt-6 space-y-3 text-xs text-[var(--ui-muted-foreground)]">
            {#each plan.features as feature}
              <li class="flex items-center gap-2">
                <Check class="size-4 shrink-0 text-emerald-600" />
                <span>{feature}</span>
              </li>
            {/each}
          </ul>
        </div>

        <button
          type="button"
          onclick={() => billing.startCheckout(plan.id)}
          class="mt-8 flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-medium transition-all {plan.popular ? 'bg-[var(--ui-primary)] text-[var(--ui-primary-foreground)] hover:opacity-90' : 'border border-[var(--ui-border)] bg-[var(--ui-background)] hover:bg-[var(--ui-secondary)]'}"
        >
          Select {plan.name}
          <ArrowRight class="size-3.5" />
        </button>
      </div>
    {/each}
  </div>

  <!-- Multi-step Checkout Modal -->
  {#if billing.checkoutOpen}
    <ScreenCheckoutModal
      isOpen={billing.checkoutOpen}
      planName={billing.selectedPlan.name}
      amount={billing.isAnnual ? billing.selectedPlan.priceAnnual * 12 : billing.selectedPlan.priceMonthly}
      onClose={billing.closeCheckout}
      onSuccess={billing.closeCheckout}
    />
  {/if}
</div>
