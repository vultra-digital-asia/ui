<script lang="ts">
  import { ScreenPaywall } from '@vultra/screens';
  import { Shield, Zap, Sparkles, Layers, ArrowRight } from 'lucide-svelte';
  import { createBillingFeature } from '$lib/features/billing/billing.svelte.js';

  const billing = createBillingFeature();
</script>

<div class="min-h-screen bg-[var(--ui-background)] text-[var(--ui-foreground)] selection:bg-[var(--ui-primary)] selection:text-[var(--ui-primary-foreground)]">
  <!-- Top Navigation -->
  <header class="sticky top-0 z-40 border-b border-[var(--ui-border)]/60 bg-[var(--ui-background)]/80 backdrop-blur-md">
    <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
      <div class="flex items-center gap-3">
        <div class="flex size-9 items-center justify-center rounded-lg bg-[var(--ui-primary)] text-[var(--ui-primary-foreground)] shadow-sm">
          <Layers class="size-5" />
        </div>
        <span class="font-semibold tracking-tight text-lg">Vultra SaaS</span>
      </div>

      <nav class="hidden md:flex items-center gap-8 text-sm font-medium text-[var(--ui-muted-foreground)]">
        <a href="#features" class="transition-colors hover:text-[var(--ui-foreground)]">Features</a>
        <a href="#pricing" class="transition-colors hover:text-[var(--ui-foreground)]">Pricing</a>
        <a href="/onboarding" class="transition-colors hover:text-[var(--ui-foreground)]">Demo Flow</a>
      </nav>

      <div class="flex items-center gap-3">
        <a
          href="/auth/login"
          class="rounded-lg px-4 py-2 text-sm font-medium text-[var(--ui-foreground)] transition-colors hover:bg-[var(--ui-secondary)]"
        >
          Sign In
        </a>
        <a
          href="/app"
          class="inline-flex items-center gap-2 rounded-lg bg-[var(--ui-primary)] px-4 py-2 text-sm font-medium text-[var(--ui-primary-foreground)] shadow-sm transition-all hover:opacity-90 active:scale-[0.98]"
        >
          Open App
          <ArrowRight class="size-4" />
        </a>
      </div>
    </div>
  </header>

  <!-- Hero Section -->
  <section class="relative overflow-hidden pt-24 pb-20 md:pt-32 md:pb-28">
    <div class="mx-auto max-w-7xl px-6 text-center">
      <div class="inline-flex items-center gap-2 rounded-full border border-[var(--ui-border)] bg-[var(--ui-secondary)]/50 px-3.5 py-1 text-xs font-medium text-[var(--ui-muted-foreground)] mb-8">
        <Sparkles class="size-3.5 text-[var(--ui-primary)]" />
        <span>Svelte 5 Runes &bull; Tailwind v4 &bull; Zero React</span>
      </div>

      <h1 class="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl leading-[1.1]">
        Production-grade SaaS <br />
        <span class="text-[var(--ui-muted-foreground)] font-serif italic">crafted with high-fidelity.</span>
      </h1>

      <p class="mx-auto mt-6 max-w-2xl text-base text-[var(--ui-muted-foreground)] sm:text-lg">
        Scaffolded directly with benchmark screens: copy-paste shadcn workflow, native continuous squircles, enterprise data tables, and multi-tenant billing engine.
      </p>

      <div class="mt-10 flex flex-wrap items-center justify-center gap-4">
        <a
          href="/app"
          class="inline-flex h-11 items-center justify-center rounded-lg bg-[var(--ui-primary)] px-6 text-sm font-medium text-[var(--ui-primary-foreground)] shadow-md transition-all hover:opacity-95"
        >
          Launch Backoffice
        </a>
        <a
          href="#pricing"
          class="inline-flex h-11 items-center justify-center rounded-lg border border-[var(--ui-border)] bg-[var(--ui-background)] px-6 text-sm font-medium text-[var(--ui-foreground)] shadow-xs transition-colors hover:bg-[var(--ui-secondary)]"
        >
          View Pricing
        </a>
      </div>
    </div>
  </section>

  <!-- Features Grid -->
  <section id="features" class="border-t border-[var(--ui-border)] bg-[var(--ui-secondary)]/30 py-24">
    <div class="mx-auto max-w-7xl px-6">
      <div class="mb-16 text-center">
        <h2 class="text-3xl font-bold tracking-tight">Core Architecture Pillars</h2>
        <p class="mt-2 text-sm text-[var(--ui-muted-foreground)]">Built for extreme craft, real-time interactivity, and enterprise speed.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="rounded-xl border border-[var(--ui-border)] bg-[var(--ui-background)] p-8 shadow-xs">
          <div class="flex size-10 items-center justify-center rounded-lg bg-[var(--ui-secondary)] text-[var(--ui-primary)] mb-5">
            <Zap class="size-5" />
          </div>
          <h3 class="text-lg font-semibold">Svelte 5 Runes</h3>
          <p class="mt-2 text-sm text-[var(--ui-muted-foreground)] leading-relaxed">
            Ultra-fine reactive state updates with zero virtual DOM overhead and minimal client bundle size.
          </p>
        </div>

        <div class="rounded-xl border border-[var(--ui-border)] bg-[var(--ui-background)] p-8 shadow-xs">
          <div class="flex size-10 items-center justify-center rounded-lg bg-[var(--ui-secondary)] text-[var(--ui-primary)] mb-5">
            <Shield class="size-5" />
          </div>
          <h3 class="text-lg font-semibold">Anti-Slop Visual Standards</h3>
          <p class="mt-2 text-sm text-[var(--ui-muted-foreground)] leading-relaxed">
            No tacky purple gradients, zero icon emojis, clean single-accent harmony, and Apple HIG squircle geometry.
          </p>
        </div>

        <div class="rounded-xl border border-[var(--ui-border)] bg-[var(--ui-background)] p-8 shadow-xs">
          <div class="flex size-10 items-center justify-center rounded-lg bg-[var(--ui-secondary)] text-[var(--ui-primary)] mb-5">
            <Layers class="size-5" />
          </div>
          <h3 class="text-lg font-semibold">Copy-Paste Screen Library</h3>
          <p class="mt-2 text-sm text-[var(--ui-muted-foreground)] leading-relaxed">
            Full control of your codebase. Screens live in your source directory with zero black-box dependencies.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Pricing with Benchmark ScreenPaywall -->
  <section id="pricing" class="py-24">
    <div class="mx-auto max-w-7xl px-6">
      <ScreenPaywall onSelectPlan={(plan) => window.location.href = `/app/billing?plan=${plan}`} />
    </div>
  </section>

  <!-- Footer -->
  <footer class="border-t border-[var(--ui-border)] py-12 text-center text-xs text-[var(--ui-muted-foreground)]">
    <div class="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-4">
      <div class="flex items-center gap-2">
        <Layers class="size-4" />
        <span class="font-medium text-[var(--ui-foreground)]">Vultra SaaS Starter</span> &bull; 2026
      </div>
      <div>Designed with Vultra UI &bull; Pure Svelte 5</div>
    </div>
  </footer>
</div>
