<script lang="ts">
  import {
    X,
    Check,
    QrCode,
    Building2,
    CreditCard,
    ShieldCheck,
    ArrowLeft,
    Clock,
  } from "lucide-svelte";
  import { cn } from "$lib/utils.js";

  interface Props {
    open?: boolean;
    class?: string;
    onClose?: () => void;
    onSuccess?: (details: any) => void;
  }

  let {
    open = $bindable(true),
    class: className,
    onClose,
    onSuccess,
  }: Props = $props();

  let step = $state<1 | 2>(1);
  let isAnnual = $state(true);
  let selectedPlan = $state<"starter" | "pro">("pro");
  let selectedChannel = $state<"qris" | "bca_va" | "mandiri_va">("qris");

  const plans = {
    starter: {
      name: "Starter Business",
      monthly: 99000,
      annual: 79000,
      features: ["500 faktur / bulan", "QRIS & VA standard", "Export CSV"],
    },
    pro: {
      name: "Enterprise Pro",
      monthly: 249000,
      annual: 199000,
      features: [
        "Faktur & kwitansi tanpa batas",
        "Otomasi webhook & multi-gateway",
        "Multi-cabang & peran pengguna",
      ],
    },
  };

  let activePlan = $derived(plans[selectedPlan]);
  let subtotal = $derived(isAnnual ? activePlan.annual * 12 : activePlan.monthly);
  let ppn = $derived(Math.round(subtotal * 0.11));
  let adminFee = $derived(selectedChannel === "qris" ? 1500 : 2500);
  let total = $derived(subtotal + ppn + adminFee);

  function formatRupiah(num: number) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(num);
  }

  function handleCompletePayment() {
    onSuccess?.({
      plan: selectedPlan,
      isAnnual,
      channel: selectedChannel,
      total,
    });
    open = false;
  }
</script>

{#if open}
  <!-- Backdrop Scrim -->
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs transition-opacity"
    role="presentation"
    onclick={onClose}
  >
    <!-- Modal Card (Stop propagation on click) -->
    <div
      role="dialog"
      aria-modal="true"
      tabindex="-1"
      onclick={(e) => e.stopPropagation()}
      onkeydown={(e) => {
        if (e.key === "Escape") onClose?.();
      }}
      class={cn(
        "relative w-full max-w-lg overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-2xl transition-all sm:p-7",
        className
      )}
    >
      <!-- Modal Header -->
      <div class="flex items-center justify-between border-b border-border pb-4">
        <div class="flex items-center gap-2">
          {#if step === 2}
            <button
              type="button"
              onclick={() => (step = 1)}
              class="inline-flex size-8 items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <ArrowLeft class="size-4" />
            </button>
          {/if}
          <div>
            <h3 class="text-base font-bold text-foreground sm:text-lg">
              {step === 1 ? "Pilih Paket Berlangganan" : "Selesaikan Pembayaran"}
            </h3>
            <p class="text-xs text-muted-foreground">Langkah {step} dari 2</p>
          </div>
        </div>

        <button
          type="button"
          onclick={onClose}
          class="inline-flex size-8 items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <X class="size-4" />
        </button>
      </div>

      <!-- Step 1: Pilih Paket -->
      {#if step === 1}
        <div class="mt-5 space-y-4">
          <!-- Billing Cycle Switcher -->
          <div class="flex justify-center">
            <div class="inline-flex items-center rounded-xl border border-border bg-muted p-1">
              <button
                type="button"
                class={cn(
                  "rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
                  !isAnnual && "bg-card text-foreground shadow-xs"
                )}
                onclick={() => (isAnnual = false)}
              >
                Bulanan
              </button>
              <button
                type="button"
                class={cn(
                  "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
                  isAnnual && "bg-card text-foreground shadow-xs"
                )}
                onclick={() => (isAnnual = true)}
              >
                <span>Tahunan</span>
                <span class="rounded-full bg-secondary/15 px-1.5 py-0.5 text-[10px] font-bold text-secondary">
                  Hemat 20%
                </span>
              </button>
            </div>
          </div>

          <!-- Plan Options -->
          <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {#each (["starter", "pro"] as const) as key}
              {@const p = plans[key]}
              {@const isSelected = selectedPlan === key}
              <div
                role="button"
                tabindex="0"
                onclick={() => (selectedPlan = key)}
                onkeydown={(e) => {
                  if (e.key === "Enter" || e.key === " ") selectedPlan = key;
                }}
                class={cn(
                  "relative flex cursor-pointer flex-col justify-between rounded-2xl border p-4 transition-all outline-none",
                  isSelected
                    ? "border-primary bg-primary/5 ring-2 ring-primary/20 shadow-xs"
                    : "border-border bg-card hover:bg-muted/30"
                )}
              >
                <div>
                  <div class="text-sm font-semibold text-foreground">{p.name}</div>
                  <div class="mt-2 font-mono text-xl font-bold tabular-nums text-foreground">
                    {formatRupiah(isAnnual ? p.annual : p.monthly)}
                    <span class="text-xs font-normal text-muted-foreground">/bln</span>
                  </div>
                  <ul class="mt-3 space-y-1.5 text-xs text-muted-foreground">
                    {#each p.features as f}
                      <li class="flex items-center gap-2">
                        <Check class="size-3.5 text-primary shrink-0" />
                        <span>{f}</span>
                      </li>
                    {/each}
                  </ul>
                </div>
              </div>
            {/each}
          </div>

          <!-- Next Button -->
          <div class="pt-2">
            <button
              type="button"
              onclick={() => (step = 2)}
              class="inline-flex h-11 w-full items-center justify-center rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-xs transition-colors hover:bg-primary/90"
            >
              Lanjut ke Pembayaran ({formatRupiah(total)})
            </button>
          </div>
        </div>
      {:else}
        <!-- Step 2: Gateway & Summary -->
        <div class="mt-5 space-y-4">
          <!-- Gateway Selector -->
          <div class="space-y-2">
            <span class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Metode Pembayaran
            </span>
            <div class="grid grid-cols-1 gap-2">
              <label
                class={cn(
                  "flex cursor-pointer items-center justify-between rounded-xl border p-3 transition-colors",
                  selectedChannel === "qris"
                    ? "border-primary bg-primary/5 ring-1 ring-primary/30"
                    : "border-border bg-card hover:bg-muted/20"
                )}
              >
                <div class="flex items-center gap-3">
                  <input
                    type="radio"
                    name="gateway"
                    value="qris"
                    bind:group={selectedChannel}
                    class="accent-primary"
                  />
                  <div class="flex items-center gap-2 text-sm font-medium text-foreground">
                    <QrCode class="size-4 text-primary" />
                    <span>QRIS (GoPay, OVO, ShopeePay, BCA)</span>
                  </div>
                </div>
                <span class="text-[11px] text-muted-foreground">Instan</span>
              </label>

              <label
                class={cn(
                  "flex cursor-pointer items-center justify-between rounded-xl border p-3 transition-colors",
                  selectedChannel === "bca_va"
                    ? "border-primary bg-primary/5 ring-1 ring-primary/30"
                    : "border-border bg-card hover:bg-muted/20"
                )}
              >
                <div class="flex items-center gap-3">
                  <input
                    type="radio"
                    name="gateway"
                    value="bca_va"
                    bind:group={selectedChannel}
                    class="accent-primary"
                  />
                  <div class="flex items-center gap-2 text-sm font-medium text-foreground">
                    <Building2 class="size-4 text-foreground" />
                    <span>BCA Virtual Account</span>
                  </div>
                </div>
                <span class="text-[11px] text-muted-foreground">Auto-verifikasi</span>
              </label>

              <label
                class={cn(
                  "flex cursor-pointer items-center justify-between rounded-xl border p-3 transition-colors",
                  selectedChannel === "mandiri_va"
                    ? "border-primary bg-primary/5 ring-1 ring-primary/30"
                    : "border-border bg-card hover:bg-muted/20"
                )}
              >
                <div class="flex items-center gap-3">
                  <input
                    type="radio"
                    name="gateway"
                    value="mandiri_va"
                    bind:group={selectedChannel}
                    class="accent-primary"
                  />
                  <div class="flex items-center gap-2 text-sm font-medium text-foreground">
                    <Building2 class="size-4 text-foreground" />
                    <span>Mandiri Virtual Account</span>
                  </div>
                </div>
                <span class="text-[11px] text-muted-foreground">Auto-verifikasi</span>
              </label>
            </div>
          </div>

          <!-- Price Breakdown Summary -->
          <div class="rounded-2xl border border-border bg-muted/30 p-3.5 space-y-2 text-xs">
            <div class="flex justify-between text-muted-foreground">
              <span>Langganan {activePlan.name} ({isAnnual ? "12 Bulan" : "1 Bulan"})</span>
              <span class="font-mono tabular-nums text-foreground">{formatRupiah(subtotal)}</span>
            </div>
            <div class="flex justify-between text-muted-foreground">
              <span>PPN 11%</span>
              <span class="font-mono tabular-nums text-foreground">{formatRupiah(ppn)}</span>
            </div>
            <div class="flex justify-between text-muted-foreground">
              <span>Biaya Transaksi Gateway</span>
              <span class="font-mono tabular-nums text-foreground">{formatRupiah(adminFee)}</span>
            </div>
            <div class="border-t border-border/80 pt-2 flex justify-between font-semibold text-sm">
              <span class="text-foreground">Total Pembayaran</span>
              <span class="font-mono tabular-nums text-primary">{formatRupiah(total)}</span>
            </div>
          </div>

          <!-- Action Button -->
          <button
            type="button"
            onclick={handleCompletePayment}
            class="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-xs transition-colors hover:bg-primary/90"
          >
            <ShieldCheck class="size-4" />
            <span>Bayar Sekarang ({formatRupiah(total)})</span>
          </button>
        </div>
      {/if}
    </div>
  </div>
{/if}
