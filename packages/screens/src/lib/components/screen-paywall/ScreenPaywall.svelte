<script lang="ts">
  import { Check, X, ShieldCheck } from "lucide-svelte";
  import { cn } from "$lib/utils.js";

  export interface PaywallPlan {
    id: string;
    name: string;
    price: string;
    period: string;
    badge?: string;
    isPopular?: boolean;
    description?: string;
  }

  interface Props {
    title?: string;
    subtitle?: string;
    features?: string[];
    plans?: PaywallPlan[];
    selectedPlanId?: string;
    ctaText?: string;
    disclaimer?: string;
    showClose?: boolean;
    class?: string;
    onSelect?: (planId: string) => void;
    onRestore?: () => void;
    onClose?: () => void;
  }

  let {
    title = "Tingkatkan ke Akses Pro",
    subtitle = "Buka seluruh automasi faktur, laporan analitik, dan integrasi WhatsApp tanpa batas.",
    features = [
      "Otomatisasi pengiriman invoice & kwitansi instan",
      "Integrasi webhook multi-tenant (Midtrans, Xendit, Mayar)",
      "Multi-user permission & audit log lengkap",
      "Dukungan prioritas 24/7 dan export CSV/Excel",
    ],
    plans = [
      {
        id: "annual",
        name: "Paket Tahunan",
        price: "Rp 599.000",
        period: "per tahun",
        badge: "Hemat 40%",
        isPopular: true,
        description: "Ditagih tahunan. Akses tanpa batas selama 12 bulan.",
      },
      {
        id: "monthly",
        name: "Paket Bulanan",
        price: "Rp 79.000",
        period: "per bulan",
        isPopular: false,
        description: "Ditagih bulanan. Fleksibel, batalkan kapan saja.",
      },
    ],
    selectedPlanId = $bindable("annual"),
    ctaText = "Mulai 7 Hari Uji Coba Gratis",
    disclaimer = "Batal kapan saja. Dikenakan biaya setelah masa uji coba berakhir.",
    showClose = true,
    class: className,
    onSelect,
    onRestore,
    onClose,
  }: Props = $props();

  function handlePlanClick(id: string) {
    selectedPlanId = id;
    onSelect?.(id);
  }
</script>

<div
  class={cn(
    "relative mx-auto flex w-full max-w-lg flex-col rounded-3xl border border-border bg-card p-6 shadow-xl sm:p-8",
    className
  )}
>
  <!-- Top Navigation Controls -->
  <div class="flex items-center justify-between pb-4">
    {#if showClose}
      <button
        type="button"
        onclick={onClose}
        class="inline-flex size-9 items-center justify-center rounded-xl border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        aria-label="Tutup"
      >
        <X class="size-4" />
      </button>
    {:else}
      <div></div>
    {/if}

    <button
      type="button"
      onclick={onRestore}
      class="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground hover:underline"
    >
      Pulihkan Pembelian
    </button>
  </div>

  <!-- Hero Header -->
  <div class="mt-2 text-center">
    <div
      class="mx-auto inline-flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-xs"
    >
      <ShieldCheck class="size-7" />
    </div>
    <h2 class="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
      {title}
    </h2>
    <p class="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
      {subtitle}
    </p>
  </div>

  <!-- Benefit Checklist -->
  <ul class="my-6 space-y-3 rounded-2xl bg-muted/30 p-4 text-sm border border-border/50">
    {#each features as feature}
      <li class="flex items-start gap-3 text-foreground">
        <div class="mt-0.5 inline-flex size-4 shrink-0 items-center justify-center rounded-full bg-secondary/15 text-secondary">
          <Check class="size-3 stroke-[2.5]" />
        </div>
        <span class="text-xs sm:text-sm font-medium">{feature}</span>
      </li>
    {/each}
  </ul>

  <!-- Subscription Plan Cards -->
  <div class="space-y-3">
    {#each plans as plan (plan.id)}
      {@const isSelected = selectedPlanId === plan.id}
      <div
        role="button"
        tabindex="0"
        onclick={() => handlePlanClick(plan.id)}
        onkeydown={(e) => {
          if (e.key === "Enter" || e.key === " ") handlePlanClick(plan.id);
        }}
        class={cn(
          "relative flex cursor-pointer items-center justify-between rounded-2xl border p-4 transition-all duration-150 outline-none select-none",
          isSelected
            ? "border-primary bg-primary/5 ring-2 ring-primary/20 shadow-xs"
            : "border-border bg-card hover:border-border/80 hover:bg-muted/30"
        )}
      >
        <div class="flex items-center gap-3.5">
          <div
            class={cn(
              "flex size-5 shrink-0 items-center justify-center rounded-full border transition-colors",
              isSelected
                ? "border-primary bg-primary text-primary-foreground"
                : "border-muted-foreground/40 bg-transparent"
            )}
          >
            {#if isSelected}
              <div class="size-2 rounded-full bg-white"></div>
            {/if}
          </div>
          <div>
            <div class="flex items-center gap-2">
              <span class="text-sm font-semibold text-foreground">{plan.name}</span>
              {#if plan.badge}
                <span class="inline-flex items-center rounded-full bg-secondary/15 px-2 py-0.5 text-[10px] font-bold text-secondary">
                  {plan.badge}
                </span>
              {/if}
            </div>
            {#if plan.description}
              <p class="text-xs text-muted-foreground mt-0.5">{plan.description}</p>
            {/if}
          </div>
        </div>

        <div class="text-right">
          <div class="font-mono text-base font-bold tabular-nums text-foreground">
            {plan.price}
          </div>
          <div class="text-[11px] text-muted-foreground">{plan.period}</div>
        </div>
      </div>
    {/each}
  </div>

  <!-- Sticky Call-To-Action Button -->
  <div class="mt-6 pt-2">
    <button
      type="button"
      onclick={() => onSelect?.(selectedPlanId)}
      class="inline-flex h-12 w-full items-center justify-center rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
    >
      {ctaText}
    </button>
    {#if disclaimer}
      <p class="mt-3 text-center text-[11px] leading-tight text-muted-foreground">
        {disclaimer}
      </p>
    {/if}
  </div>
</div>
