<script lang="ts">
  import {
    Sparkles,
    Zap,
    ShieldCheck,
    ArrowRight,
    Check,
  } from "lucide-svelte";
  import { cn } from "$lib/utils.js";

  export interface OnboardingStep {
    id: string;
    title: string;
    description: string;
    icon: any;
    accentColor?: string;
  }

  interface Props {
    steps?: OnboardingStep[];
    class?: string;
    onFinish?: () => void;
    onSkip?: () => void;
  }

  let {
    steps = [
      {
        id: "step-1",
        title: "Penerbitan Faktur Cepat & Otomatis",
        description:
          "Kirim invoice profesional ke pelanggan secara instan via WhatsApp dan Email dengan sekali klik.",
        icon: Zap,
      },
      {
        id: "step-2",
        title: "Multi-Gateway Terintegrasi",
        description:
          "Terima pembayaran via QRIS dan Virtual Account tanpa pusing rekonsiliasi manual setiap hari.",
        icon: Sparkles,
      },
      {
        id: "step-3",
        title: "Keamanan Finansial Terverifikasi",
        description:
          "Semua log transaksi tervalidasi dengan tanda tangan HMAC dan enkripsi standar perbankan.",
        icon: ShieldCheck,
      },
    ],
    class: className,
    onFinish,
    onSkip,
  }: Props = $props();

  let currentIndex = $state(0);
  let isLastStep = $derived(currentIndex === steps.length - 1);
  let currentStep = $derived(steps[currentIndex]);

  function handleNext() {
    if (isLastStep) {
      onFinish?.();
    } else {
      currentIndex += 1;
    }
  }

  function handlePrev() {
    if (currentIndex > 0) {
      currentIndex -= 1;
    }
  }
</script>

<div
  class={cn(
    "relative mx-auto flex min-h-[580px] w-full max-w-sm flex-col justify-between rounded-3xl border border-border bg-card p-6 shadow-xl sm:p-8",
    className
  )}
>
  <!-- Top Navigation (Skip Button) -->
  <div class="flex items-center justify-between">
    <div class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
      Langkah {currentIndex + 1} dari {steps.length}
    </div>
    {#if !isLastStep}
      <button
        type="button"
        onclick={onSkip}
        class="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        Lewati
      </button>
    {:else}
      <div></div>
    {/if}
  </div>

  <!-- Center Carousel Item -->
  <div class="my-auto flex flex-col items-center text-center">
    <!-- Icon Container -->
    <div
      class="flex size-24 items-center justify-center rounded-3xl bg-primary/10 text-primary shadow-xs transition-transform duration-300"
    >
      {#if currentStep.icon}
        {@const Icon = currentStep.icon}
        <Icon class="size-12 stroke-[1.75]" />
      {/if}
    </div>

    <!-- Title & Description -->
    <h3 class="mt-8 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
      {currentStep.title}
    </h3>
    <p class="mt-3 text-xs sm:text-sm leading-relaxed text-muted-foreground">
      {currentStep.description}
    </p>
  </div>

  <!-- Bottom Navigation & Action Strip -->
  <div class="space-y-6 pt-4">
    <!-- Smooth Animated Progress Indicator Dots -->
    <div class="flex justify-center items-center gap-2">
      {#each steps as _, idx}
        <button
          type="button"
          onclick={() => (currentIndex = idx)}
          class={cn(
            "h-1.5 rounded-full transition-all duration-300",
            idx === currentIndex
              ? "w-6 bg-primary"
              : "w-2 bg-muted hover:bg-muted-foreground/30"
          )}
          aria-label={`Buka langkah ${idx + 1}`}
        ></button>
      {/each}
    </div>

    <!-- Primary CTA Button -->
    <button
      type="button"
      onclick={handleNext}
      class="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
    >
      <span>{isLastStep ? "Mulai Sekarang" : "Lanjutkan"}</span>
      {#if isLastStep}
        <Check class="size-4" />
      {:else}
        <ArrowRight class="size-4" />
      {/if}
    </button>
  </div>
</div>
