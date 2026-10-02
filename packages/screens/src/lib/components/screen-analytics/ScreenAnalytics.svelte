<script lang="ts">
  import {
    Calendar,
    TrendingUp,
    TrendingDown,
    Users,
    Eye,
    Clock,
    ArrowUpRight,
    Globe,
    Laptop,
    Smartphone,
    Download,
    Share2,
  } from 'lucide-svelte';

  interface Metric {
    label: string;
    value: string;
    change: number;
    trend: 'up' | 'down';
  }

  let {
    timeRange = $bindable('30d'),
    metrics = [
      { label: 'Unique Visitors', value: '128,420', change: 14.8, trend: 'up' },
      { label: 'Total Pageviews', value: '492,108', change: 8.2, trend: 'up' },
      { label: 'Avg Session Duration', value: '3m 42s', change: -2.1, trend: 'down' },
      { label: 'Bounce Rate', value: '41.2%', change: -4.5, trend: 'up' },
    ] as Metric[],
    topPages = [
      { path: '/pricing', visitors: '42,109', percentage: 78 },
      { path: '/docs/components/screen-paywall', visitors: '28,490', percentage: 54 },
      { path: '/templates/saas', visitors: '19,230', percentage: 38 },
      { path: '/blog/anti-slop-ui-principles', visitors: '14,810', percentage: 29 },
      { path: '/login', visitors: '11,402', percentage: 21 },
    ],
    topReferrers = [
      { source: 'Google Organic', count: '68,200', pct: '53.1%' },
      { source: 'GitHub / vultra-ui', count: '31,400', pct: '24.4%' },
      { source: 'Twitter / X', count: '14,100', pct: '11.0%' },
      { source: 'Direct / Bookmarks', count: '9,800', pct: '7.6%' },
      { source: 'Hacker News', count: '4,920', pct: '3.9%' },
    ],
  } = $props();

  const timeOptions = [
    { id: '7d', label: '7 Days' },
    { id: '30d', label: '30 Days' },
    { id: '90d', label: '90 Days' },
    { id: '12m', label: '12 Months' },
  ];
</script>

<div class="flex h-full w-full flex-col bg-[#FBF9F9] text-[#1B1C1C]">
  <!-- Header Bar -->
  <header class="flex flex-wrap items-center justify-between gap-4 border-b border-[#E8E4DF] bg-white px-6 py-4">
    <div>
      <h1 class="text-xl font-bold tracking-tight text-[#1B1C1C]">Analytics Overview</h1>
      <p class="mt-0.5 text-xs text-[#6B6761]">Privacy-first traffic and conversion telemetry</p>
    </div>

    <div class="flex items-center gap-3">
      <!-- Time Selector -->
      <div class="inline-flex rounded-xl border border-[#E8E4DF] bg-[#FBF9F9] p-0.5">
        {#each timeOptions as opt}
          <button
            onclick={() => (timeRange = opt.id)}
            class="rounded-lg px-3 py-1.5 text-xs font-semibold transition-all {timeRange === opt.id ? 'bg-white text-[#1B1C1C] shadow-xs' : 'text-[#6B6761] hover:text-[#1B1C1C]'}"
          >
            {opt.label}
          </button>
        {/each}
      </div>

      <button class="inline-flex h-9 items-center gap-1.5 rounded-xl border border-[#E8E4DF] bg-white px-3 text-xs font-semibold text-[#1B1C1C] hover:bg-stone-50">
        <Download class="h-3.5 w-3.5 text-stone-500" />
        Export
      </button>
    </div>
  </header>

  <div class="flex flex-1 flex-col gap-6 p-6">
    <!-- Top 4 Metrics -->
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {#each metrics as m}
        <div class="flex flex-col justify-between rounded-2xl border border-[#E8E4DF] bg-white p-5 shadow-xs">
          <span class="text-xs font-semibold text-[#6B6761]">{m.label}</span>
          <div class="mt-3 flex items-baseline justify-between">
            <span class="font-mono text-2xl font-bold tracking-tight text-[#1B1C1C] tabular-nums">
              {m.value}
            </span>
            <span
              class="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-bold {m.change >= 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}"
            >
              {#if m.change >= 0}
                <TrendingUp class="h-3 w-3" />
                +{m.change}%
              {:else}
                <TrendingDown class="h-3 w-3" />
                {m.change}%
              {/if}
            </span>
          </div>
        </div>
      {/each}
    </div>

    <!-- Breakdown Grid -->
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <!-- Top Visited Pages -->
      <div class="flex flex-col rounded-2xl border border-[#E8E4DF] bg-white p-6 shadow-xs">
        <div class="mb-4 flex items-center justify-between">
          <div>
            <h2 class="text-sm font-bold text-[#1B1C1C]">Top Pages</h2>
            <p class="text-xs text-[#6B6761]">Ranked by total page visitors</p>
          </div>
          <span class="text-xs font-semibold text-stone-400">Visitors</span>
        </div>

        <div class="flex flex-col gap-3">
          {#each topPages as page}
            <div class="flex flex-col gap-1.5">
              <div class="flex items-center justify-between text-xs">
                <span class="font-mono font-medium text-[#1B1C1C]">{page.path}</span>
                <span class="font-mono font-bold text-stone-600 tabular-nums">{page.visitors}</span>
              </div>
              <div class="h-2 w-full overflow-hidden rounded-full bg-stone-100">
                <div
                  class="h-full rounded-full bg-[#A13F20]"
                  style="width: {page.percentage}%;"
                ></div>
              </div>
            </div>
          {/each}
        </div>
      </div>

      <!-- Top Referrers -->
      <div class="flex flex-col rounded-2xl border border-[#E8E4DF] bg-white p-6 shadow-xs">
        <div class="mb-4 flex items-center justify-between">
          <div>
            <h2 class="text-sm font-bold text-[#1B1C1C]">Top Referrers</h2>
            <p class="text-xs text-[#6B6761]">Acquisition sources by inbound traffic</p>
          </div>
          <span class="text-xs font-semibold text-stone-400">Share</span>
        </div>

        <div class="flex flex-col divide-y divide-[#E8E4DF]">
          {#each topReferrers as ref}
            <div class="flex items-center justify-between py-3 first:pt-0 last:pb-0">
              <div class="flex items-center gap-2.5">
                <div class="flex h-7 w-7 items-center justify-center rounded-lg bg-stone-100 text-stone-600">
                  <Globe class="h-3.5 w-3.5" />
                </div>
                <span class="text-xs font-semibold text-[#1B1C1C]">{ref.source}</span>
              </div>

              <div class="flex items-center gap-3">
                <span class="font-mono text-xs text-stone-600 tabular-nums">{ref.count}</span>
                <span class="w-12 text-right font-mono text-xs font-bold text-[#A13F20] tabular-nums">
                  {ref.pct}
                </span>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</div>
