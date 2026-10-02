<script lang="ts">
  import { ExternalLink, ChevronDown, Sparkles, Building2, ShoppingBag, BookOpen } from 'lucide-svelte';

  let open = $state(false);

  const demos = [
    {
      title: 'B2B SaaS Starter',
      desc: 'Thin-page runes, audit logs, paywall, data table',
      url: 'https://saas.vultra.id',
      icon: Building2,
      badge: 'Production',
    },
    {
      title: 'Consumer Commerce',
      desc: 'Editorial storefront, bag drawer, QRIS/VA checkout',
      url: 'https://shop.vultra.id',
      icon: ShoppingBag,
      badge: 'New',
    },
    {
      title: 'Storybook Component Lab',
      desc: 'Interactive component states & design tokens',
      url: 'https://stories.vultra.id',
      icon: BookOpen,
      badge: '170+ UI',
    },
  ];
</script>

<div class="relative inline-block text-left">
  <button
    type="button"
    onclick={() => (open = !open)}
    class="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-semibold text-[#A13F20] hover:bg-[var(--ui-muted)] transition-colors"
    aria-label="Live Demo Starters"
  >
    <Sparkles class="size-3.5 text-[#A13F20]" />
    <span>Live Demos</span>
    <ChevronDown class="size-3 transition-transform {open ? 'rotate-180' : ''}" />
  </button>

  {#if open}
    <div
      class="fixed inset-0 z-40"
      role="button"
      tabindex="0"
      aria-label="Close"
      onclick={() => (open = false)}
      onkeydown={(e) => e.key === 'Escape' && (open = false)}
    ></div>

    <div class="absolute right-0 sm:left-0 sm:right-auto mt-2 w-72 rounded-xl bg-white border border-[var(--ui-border)] shadow-xl z-50 p-2 space-y-1">
      <div class="px-2 py-1.5 text-[11px] font-bold text-[#767575] uppercase tracking-wider">
        Production Starters
      </div>
      {#each demos as demo}
        <a
          href={demo.url}
          target="_blank"
          rel="noopener noreferrer"
          onclick={() => (open = false)}
          class="flex items-start gap-3 p-2.5 rounded-lg hover:bg-[#FBF9F9] transition-colors group"
        >
          <div class="p-2 rounded-lg bg-[#F5F2F0] text-[#A13F20] group-hover:bg-[#A13F20] group-hover:text-white transition-colors shrink-0 mt-0.5">
            <svelte:component this={demo.icon} class="size-4" />
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between gap-1">
              <span class="text-xs font-bold text-[#1B1C1C] group-hover:text-[#A13F20] transition-colors">{demo.title}</span>
              <span class="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#F5F2F0] text-[#A13F20] uppercase font-mono">{demo.badge}</span>
            </div>
            <p class="text-[11px] text-[#767575] line-clamp-1 mt-0.5">{demo.desc}</p>
          </div>
          <ExternalLink class="size-3 text-[#A8A29E] group-hover:text-[#1B1C1C] shrink-0 mt-1" />
        </a>
      {/each}
    </div>
  {/if}
</div>
