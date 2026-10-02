<script lang="ts">
  import {
    ScreenPaywall,
    ScreenDatatable,
    ScreenCheckoutModal,
    ScreenKanban,
    ScreenAnalytics,
    ScreenTeamSettings,
    ScreenOnboarding,
  } from '@vultra/screens';
  import {
    Monitor,
    Smartphone,
    Copy,
    Check,
    ExternalLink,
    Code,
    Sparkles,
    Sliders,
    Layers,
    Terminal,
  } from 'lucide-svelte';

  type PlatformFilter = 'all' | 'web' | 'mobile';

  let activePlatform = $state<PlatformFilter>('all');
  let selectedScreenId = $state('screen-kanban');
  let simulatorMode = $state<'desktop' | 'mobile'>('desktop');
  let copiedCommand = $state(false);

  const screensCatalog = [
    {
      id: 'screen-kanban',
      title: 'Sprint Task Board',
      platform: 'web',
      category: 'Productivity',
      badge: 'Svelte 5 Runes',
      cliCommand: 'vultra add screen-kanban',
      desc: 'Linear-inspired task management board with priority tags, avatars, and Lucide icons',
    },
    {
      id: 'screen-analytics',
      title: 'Analytics Telemetry',
      platform: 'web',
      category: 'Analytics',
      badge: 'Svelte 5 Runes',
      cliCommand: 'vultra add screen-analytics',
      desc: 'PostHog / Plausible privacy-first telemetry with 4 KPIs and referrer breakdowns',
    },
    {
      id: 'screen-team-settings',
      title: 'Team & Permissions',
      platform: 'web',
      category: 'Backoffice',
      badge: 'Svelte 5 Runes',
      cliCommand: 'vultra add screen-team-settings',
      desc: 'Stripe-style collaborator invites, role hierarchy selector, and active member list',
    },
    {
      id: 'screen-paywall',
      title: 'Comparison Paywall',
      platform: 'web',
      category: 'Monetization',
      badge: 'Svelte 5 Runes',
      cliCommand: 'vultra add screen-paywall',
      desc: 'Dual-plan annual/monthly pricing tier comparison with feature checklist and CTA',
    },
    {
      id: 'screen-datatable',
      title: 'Enterprise DataTable',
      platform: 'web',
      category: 'Data Management',
      badge: 'Svelte 5 Runes',
      cliCommand: 'vultra add screen-datatable',
      desc: 'High-density table with faceted filters, search, bulk actions, and pagination',
    },
    {
      id: 'mob-home-feed',
      title: 'Financial Feed (Wise)',
      platform: 'mobile',
      category: 'Fintech',
      badge: 'Flutter BLoC + Freezed',
      cliCommand: 'vultra flutter add mob-home-feed',
      desc: 'Balance card with privacy toggle, quick actions strip, and grouped transactions',
    },
    {
      id: 'mob-grouped-settings',
      title: 'iOS Grouped Settings',
      platform: 'mobile',
      category: 'System',
      badge: 'Flutter BLoC + Freezed',
      cliCommand: 'vultra flutter add mob-grouped-settings',
      desc: 'Apple iOS HIG grouped settings with Cupertino switches and squircle cards',
    },
    {
      id: 'mob-bottom-sheet-detents',
      title: 'Snap Detent Sheet',
      platform: 'mobile',
      category: 'Navigation',
      badge: 'Flutter BLoC + Freezed',
      cliCommand: 'vultra flutter add mob-bottom-sheet-detents',
      desc: 'Smooth modal sheet with 25%, 50%, 90% snap detents and spring physics',
    },
    {
      id: 'mob-auth-step2-otp',
      title: 'OTP 6-Box Keypad',
      platform: 'mobile',
      category: 'Authentication',
      badge: 'Flutter BLoC + Freezed',
      cliCommand: 'vultra flutter add mob-auth-step2-otp',
      desc: 'Auto-focusing numeric input with 60-second cooldown timer and haptics',
    },
  ];

  let filteredScreens = $derived(
    screensCatalog.filter((s) => (activePlatform === 'all' ? true : s.platform === activePlatform))
  );

  let currentScreen = $derived(
    screensCatalog.find((s) => s.id === selectedScreenId) ?? screensCatalog[0]
  );

  function copyCli() {
    navigator.clipboard?.writeText(currentScreen.cliCommand);
    copiedCommand = true;
    setTimeout(() => (copiedCommand = false), 2000);
  }

  $effect(() => {
    if (currentScreen.platform === 'mobile') {
      simulatorMode = 'mobile';
    } else {
      simulatorMode = 'desktop';
    }
  });
</script>

<svelte:head>
  <title>Benchmark Screens & Simulator | Vultra UI</title>
</svelte:head>

<div class="min-h-screen bg-[#FBF9F9] text-[#1B1C1C]">
  <!-- Top Banner / Navbar -->
  <header class="sticky top-0 z-30 border-b border-[#E8E4DF] bg-white/80 backdrop-blur-md">
    <div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
      <div class="flex items-center gap-3">
        <a href="/" class="flex items-center gap-2 text-sm font-bold text-[#1B1C1C] hover:text-[#A13F20]">
          <span class="rounded-lg bg-[#A13F20] px-2 py-1 text-xs text-white">VULTRA</span>
          Screens Gallery
        </a>
        <span class="rounded-full bg-stone-100 px-2.5 py-0.5 text-[11px] font-semibold text-stone-600">
          Anti-Slop Benchmark
        </span>
      </div>

      <!-- Simulator Mode Switcher -->
      <div class="flex items-center gap-2">
        <div class="inline-flex rounded-xl border border-[#E8E4DF] bg-[#FBF9F9] p-0.5">
          <button
            onclick={() => (simulatorMode = 'desktop')}
            class="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all {simulatorMode === 'desktop' ? 'bg-white text-[#1B1C1C] shadow-xs' : 'text-[#6B6761] hover:text-[#1B1C1C]'}"
          >
            <Monitor class="h-3.5 w-3.5" />
            Desktop View
          </button>
          <button
            onclick={() => (simulatorMode = 'mobile')}
            class="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all {simulatorMode === 'mobile' ? 'bg-white text-[#1B1C1C] shadow-xs' : 'text-[#6B6761] hover:text-[#1B1C1C]'}"
          >
            <Smartphone class="h-3.5 w-3.5" />
            iPhone 16 Frame
          </button>
        </div>

        <!-- Copy Command -->
        <button
          onclick={copyCli}
          class="inline-flex items-center gap-2 rounded-xl border border-[#E8E4DF] bg-white px-3.5 py-1.5 text-xs font-semibold text-[#1B1C1C] shadow-xs transition-colors hover:bg-stone-50"
        >
          {#if copiedCommand}
            <Check class="h-3.5 w-3.5 text-emerald-600" />
            <span class="text-emerald-700">Copied!</span>
          {:else}
            <Terminal class="h-3.5 w-3.5 text-[#A13F20]" />
            <code>{currentScreen.cliCommand}</code>
            <Copy class="h-3 w-3 text-stone-400" />
          {/if}
        </button>
      </div>
    </div>
  </header>

  <!-- Main Body Grid: Sidebar Selection + Preview Stage -->
  <div class="mx-auto flex max-w-7xl flex-col lg:flex-row">
    <!-- Sidebar: Screen Selector -->
    <aside class="w-full shrink-0 border-r border-[#E8E4DF] bg-white p-6 lg:w-80">
      <!-- Filter Tabs -->
      <div class="mb-4 flex gap-1 rounded-xl border border-[#E8E4DF] bg-[#FBF9F9] p-0.5">
        <button
          onclick={() => (activePlatform = 'all')}
          class="flex-1 rounded-lg py-1 text-xs font-semibold {activePlatform === 'all' ? 'bg-white text-[#1B1C1C] shadow-xs' : 'text-stone-500'}"
        >
          All ({screensCatalog.length})
        </button>
        <button
          onclick={() => (activePlatform = 'web')}
          class="flex-1 rounded-lg py-1 text-xs font-semibold {activePlatform === 'web' ? 'bg-white text-[#1B1C1C] shadow-xs' : 'text-stone-500'}"
        >
          Web ({screensCatalog.filter((s) => s.platform === 'web').length})
        </button>
        <button
          onclick={() => (activePlatform = 'mobile')}
          class="flex-1 rounded-lg py-1 text-xs font-semibold {activePlatform === 'mobile' ? 'bg-white text-[#1B1C1C] shadow-xs' : 'text-stone-500'}"
        >
          Mobile ({screensCatalog.filter((s) => s.platform === 'mobile').length})
        </button>
      </div>

      <!-- Screen List -->
      <div class="flex flex-col gap-2">
        {#each filteredScreens as scr (scr.id)}
          <button
            onclick={() => (selectedScreenId = scr.id)}
            class="flex flex-col rounded-xl border p-3 text-left transition-all {selectedScreenId === scr.id ? 'border-[#A13F20] bg-[#A13F20]/5 shadow-xs' : 'border-[#E8E4DF] bg-white hover:border-stone-300'}"
          >
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-[#1B1C1C]">{scr.title}</span>
              <span class="rounded-full bg-stone-100 px-2 py-0.5 text-[10px] font-semibold text-stone-600">
                {scr.badge}
              </span>
            </div>
            <p class="mt-1 line-clamp-2 text-[11px] text-[#6B6761]">{scr.desc}</p>
          </button>
        {/each}
      </div>

      <!-- Generator Helper Box -->
      <div class="mt-8 rounded-2xl border border-[#E8E4DF] bg-[#FBF9F9] p-4 text-xs">
        <span class="font-bold text-[#1B1C1C]">Universal Generator</span>
        <p class="mt-1 text-[11px] text-[#6B6761]">
          Generate bespoke screens with BLoC + Freezed or Svelte 5 Runes:
        </p>
        <div class="mt-2 rounded-lg bg-stone-900 p-2 font-mono text-[10px] text-stone-200">
          vultra gen -p flutter -a datatable -e Order
        </div>
      </div>
    </aside>

    <!-- Stage Area: Interactive Device Frame -->
    <main class="flex flex-1 flex-col items-center justify-start overflow-hidden bg-stone-100/60 p-6">
      {#if simulatorMode === 'desktop'}
        <!-- Desktop Window Frame -->
        <div class="flex h-[800px] w-full flex-col overflow-hidden rounded-2xl border border-[#E8E4DF] bg-white shadow-xl">
          <!-- Window Header / Browser Bar -->
          <div class="flex items-center gap-3 border-b border-[#E8E4DF] bg-[#FBF9F9] px-4 py-2.5">
            <div class="flex items-center gap-1.5">
              <div class="h-3 w-3 rounded-full bg-rose-400"></div>
              <div class="h-3 w-3 rounded-full bg-amber-400"></div>
              <div class="h-3 w-3 rounded-full bg-emerald-400"></div>
            </div>
            <div class="flex flex-1 items-center justify-center">
              <div class="flex h-6 w-96 items-center justify-center rounded-md border border-[#E8E4DF] bg-white px-3 font-mono text-[11px] text-[#6B6761]">
                https://app.vultra.id/{currentScreen.id}
              </div>
            </div>
          </div>

          <!-- Desktop Content Area -->
          <div class="relative flex-1 overflow-auto bg-white">
            {#if currentScreen.id === 'screen-kanban'}
              <ScreenKanban />
            {:else if currentScreen.id === 'screen-analytics'}
              <ScreenAnalytics />
            {:else if currentScreen.id === 'screen-team-settings'}
              <ScreenTeamSettings />
            {:else if currentScreen.id === 'screen-paywall'}
              <ScreenPaywall />
            {:else if currentScreen.id === 'screen-datatable'}
              <ScreenDatatable />
            {:else}
              <div class="flex h-full flex-col items-center justify-center p-12 text-center">
                <Smartphone class="h-12 w-12 text-[#A13F20]" />
                <h3 class="mt-3 text-base font-bold text-[#1B1C1C]">Mobile Screen Benchmark</h3>
                <p class="mt-1 max-w-sm text-xs text-[#6B6761]">
                  Layar ini didesain khusus untuk Flutter / Mobile. Beralihlah ke tab iPhone 16 Frame untuk melihat simulator interaktif.
                </p>
                <button
                  onclick={() => (simulatorMode = 'mobile')}
                  class="mt-4 rounded-xl bg-[#A13F20] px-4 py-2 text-xs font-semibold text-white shadow-xs"
                >
                  Beralih ke iPhone 16 Frame
                </button>
              </div>
            {/if}
          </div>
        </div>
      {:else}
        <!-- Mobile iPhone 16 Chassis -->
        <div class="relative flex h-[820px] w-[390px] flex-col overflow-hidden rounded-[50px] border-[10px] border-stone-900 bg-[#FBF9F9] shadow-2xl ring-1 ring-black/20">
          <!-- Dynamic Island -->
          <div class="absolute left-1/2 top-3 z-50 h-7 w-28 -translate-x-1/2 rounded-full bg-black"></div>

          <!-- Status Bar -->
          <div class="flex h-11 w-full items-center justify-between px-7 pt-2 text-[11px] font-bold text-[#1B1C1C]">
            <span>9:41</span>
            <div class="flex items-center gap-1.5 text-stone-800">
              <span class="text-[9px]">5G</span>
              <div class="h-2.5 w-5 rounded-xs border border-stone-800 p-0.5">
                <div class="h-full w-full rounded-xs bg-stone-800"></div>
              </div>
            </div>
          </div>

          <!-- Phone Screen Viewport -->
          <div class="relative flex-1 overflow-y-auto px-1">
            {#if currentScreen.id === 'mob-home-feed'}
              <!-- Mobile Feed Mock -->
              <div class="flex flex-col gap-4 p-4 text-[#1B1C1C]">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <div class="flex h-9 w-9 items-center justify-center rounded-full bg-[#A13F20]/15 text-xs font-bold text-[#A13F20]">
                      AJ
                    </div>
                    <div>
                      <div class="text-[10px] text-stone-500">Selamat Datang,</div>
                      <div class="text-xs font-bold">Ant Joshua</div>
                    </div>
                  </div>
                </div>

                <!-- Balance Card -->
                <div class="rounded-2xl border border-[#E8E4DF] bg-white p-4 shadow-xs">
                  <div class="text-[11px] text-[#6B6761]">Total Saldo Aktif</div>
                  <div class="mt-1 font-mono text-2xl font-bold tracking-tight text-[#1B1C1C]">
                    Rp 148.520.000
                  </div>
                  <div class="mt-4 flex justify-around border-t border-stone-100 pt-3 text-center text-[10px] font-semibold">
                    <div>Kirim</div>
                    <div>Terima</div>
                    <div>Bayar</div>
                    <div>Lainnya</div>
                  </div>
                </div>

                <!-- Transactions -->
                <div class="text-xs font-bold">Aktivitas Terbaru</div>
                <div class="flex flex-col gap-2">
                  <div class="flex items-center justify-between rounded-xl border border-[#E8E4DF] bg-white p-3 text-xs">
                    <div>
                      <div class="font-semibold">Supabase Pro</div>
                      <div class="text-[10px] text-stone-500">Langganan Cloud</div>
                    </div>
                    <span class="font-mono font-bold text-rose-600">-Rp 390.000</span>
                  </div>
                  <div class="flex items-center justify-between rounded-xl border border-[#E8E4DF] bg-white p-3 text-xs">
                    <div>
                      <div class="font-semibold">Pembayaran Klien</div>
                      <div class="text-[10px] text-stone-500">Transfer Masuk</div>
                    </div>
                    <span class="font-mono font-bold text-emerald-600">+Rp 12.500.000</span>
                  </div>
                </div>
              </div>
            {:else if currentScreen.id === 'mob-grouped-settings'}
              <!-- Grouped Settings Mock -->
              <div class="flex flex-col gap-4 p-4 text-[#1B1C1C]">
                <div class="text-center text-sm font-bold">Pengaturan</div>
                <div class="flex items-center gap-3 rounded-2xl bg-white p-3.5 shadow-xs">
                  <div class="flex h-11 w-11 items-center justify-center rounded-full bg-[#A13F20]/15 text-sm font-bold text-[#A13F20]">
                    AJ
                  </div>
                  <div>
                    <div class="text-xs font-bold">Ant Joshua</div>
                    <div class="text-[10px] text-stone-500">antoniusjoshua47@gmail.com</div>
                  </div>
                </div>

                <div class="text-[10px] font-bold uppercase text-stone-400">Preferensi</div>
                <div class="flex flex-col divide-y divide-stone-100 rounded-2xl bg-white p-3 shadow-xs text-xs">
                  <div class="flex items-center justify-between py-2">
                    <span>Notifikasi Push</span>
                    <span class="rounded-full bg-emerald-600 px-2 py-0.5 text-[9px] text-white">ON</span>
                  </div>
                  <div class="flex items-center justify-between py-2">
                    <span>Biometrik (Face ID)</span>
                    <span class="rounded-full bg-emerald-600 px-2 py-0.5 text-[9px] text-white">ON</span>
                  </div>
                </div>
              </div>
            {:else}
              <!-- Default Web preview in phone view -->
              <div class="scale-90 transform-origin-top">
                {#if currentScreen.id === 'screen-paywall'}
                  <ScreenPaywall />
                {:else if currentScreen.id === 'screen-onboarding'}
                  <ScreenOnboarding />
                {:else}
                  <div class="p-4 text-center">
                    <span class="text-xs text-stone-500">Preview Layar</span>
                  </div>
                {/if}
              </div>
            {/if}
          </div>

          <!-- Home Bar Indicator -->
          <div class="flex h-6 w-full items-center justify-center pb-1">
            <div class="h-1 w-32 rounded-full bg-stone-900"></div>
          </div>
        </div>
      {/if}
    </main>
  </div>
</div>
