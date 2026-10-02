<script lang="ts">
  import { TrendingUp, Users, CreditCard, Activity, ArrowUpRight } from 'lucide-svelte';
  import { createCustomersFeature } from '$lib/features/customers/customers.svelte.js';

  const customersFeature = createCustomersFeature();
</script>

<div class="space-y-8">
  <!-- Header -->
  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    <div>
      <h1 class="text-2xl font-bold tracking-tight">Executive Overview</h1>
      <p class="text-sm text-[var(--ui-muted-foreground)]">Key metrics and active workspace status.</p>
    </div>
    <div class="flex items-center gap-3">
      <a
        href="/app/billing"
        class="inline-flex items-center gap-2 rounded-lg bg-[var(--ui-primary)] px-4 py-2 text-sm font-medium text-[var(--ui-primary-foreground)] shadow-xs transition-opacity hover:opacity-90"
      >
        <CreditCard class="size-4" />
        Manage Subscription
      </a>
    </div>
  </div>

  <!-- Metric KPI Cards -->
  <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
    <div class="rounded-xl border border-[var(--ui-border)] bg-[var(--ui-card)] p-6 shadow-xs">
      <div class="flex items-center justify-between">
        <span class="text-xs font-medium uppercase tracking-wider text-[var(--ui-muted-foreground)]">Total MRR</span>
        <span class="inline-flex items-center text-xs font-medium text-emerald-600">
          +12.4% <ArrowUpRight class="size-3.5" />
        </span>
      </div>
      <div class="mt-4 text-3xl font-extrabold tracking-tight">
        ${customersFeature.totalMrr.toLocaleString()}
      </div>
      <p class="mt-1 text-xs text-[var(--ui-muted-foreground)]">Across active recurring subscriptions</p>
    </div>

    <div class="rounded-xl border border-[var(--ui-border)] bg-[var(--ui-card)] p-6 shadow-xs">
      <div class="flex items-center justify-between">
        <span class="text-xs font-medium uppercase tracking-wider text-[var(--ui-muted-foreground)]">Active Tenants</span>
        <span class="inline-flex items-center text-xs font-medium text-emerald-600">
          +4 <ArrowUpRight class="size-3.5" />
        </span>
      </div>
      <div class="mt-4 text-3xl font-extrabold tracking-tight">
        {customersFeature.customers.length}
      </div>
      <p class="mt-1 text-xs text-[var(--ui-muted-foreground)]">Enterprise and Pro accounts</p>
    </div>

    <div class="rounded-xl border border-[var(--ui-border)] bg-[var(--ui-card)] p-6 shadow-xs">
      <div class="flex items-center justify-between">
        <span class="text-xs font-medium uppercase tracking-wider text-[var(--ui-muted-foreground)]">Active Sessions</span>
        <Activity class="size-4 text-[var(--ui-muted-foreground)]" />
      </div>
      <div class="mt-4 text-3xl font-extrabold tracking-tight">1,248</div>
      <p class="mt-1 text-xs text-[var(--ui-muted-foreground)]">Live across Web & Mobile</p>
    </div>

    <div class="rounded-xl border border-[var(--ui-border)] bg-[var(--ui-card)] p-6 shadow-xs">
      <div class="flex items-center justify-between">
        <span class="text-xs font-medium uppercase tracking-wider text-[var(--ui-muted-foreground)]">Net Uptime</span>
        <span class="rounded bg-emerald-50 px-1.5 py-0.5 text-xs font-semibold text-emerald-700">99.98%</span>
      </div>
      <div class="mt-4 text-3xl font-extrabold tracking-tight">28d 4h</div>
      <p class="mt-1 text-xs text-[var(--ui-muted-foreground)]">Zero critical incidents</p>
    </div>
  </div>

  <!-- Recent Tenants Quick Table -->
  <div class="rounded-xl border border-[var(--ui-border)] bg-[var(--ui-card)] shadow-xs">
    <div class="flex items-center justify-between border-b border-[var(--ui-border)] px-6 py-4">
      <div>
        <h2 class="text-base font-semibold">Active Customers</h2>
        <p class="text-xs text-[var(--ui-muted-foreground)]">Real-time status of top accounts</p>
      </div>
      <a href="/app/customers" class="text-xs font-medium text-[var(--ui-primary)] hover:underline">
        View all &rarr;
      </a>
    </div>
    <div class="overflow-x-auto">
      <table class="w-full text-left text-sm">
        <thead class="bg-[var(--ui-secondary)]/50 text-xs uppercase tracking-wider text-[var(--ui-muted-foreground)]">
          <tr>
            <th class="px-6 py-3">Tenant Name</th>
            <th class="px-6 py-3">Plan</th>
            <th class="px-6 py-3">Status</th>
            <th class="px-6 py-3 text-right">MRR</th>
          </tr>
        </thead>
        <tbody class="divide-y border-t border-[var(--ui-border)] text-sm">
          {#each customersFeature.customers.slice(0, 4) as customer (customer.id)}
            <tr class="hover:bg-[var(--ui-secondary)]/30 transition-colors">
              <td class="px-6 py-4 font-medium">{customer.name}</td>
              <td class="px-6 py-4 text-[var(--ui-muted-foreground)]">{customer.plan}</td>
              <td class="px-6 py-4">
                <span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-emerald-50 text-emerald-700">
                  {customer.status}
                </span>
              </td>
              <td class="px-6 py-4 text-right tabular-nums font-semibold">${customer.mrr}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>
