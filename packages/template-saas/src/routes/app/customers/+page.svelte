<script lang="ts">
  import { ScreenDatatable } from '@vultra/screens';
  import { Users, Plus, Download } from 'lucide-svelte';
  import { createCustomersFeature } from '$lib/features/customers/customers.svelte.js';

  const customersFeature = createCustomersFeature();
</script>

<div class="space-y-6">
  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    <div>
      <h1 class="text-2xl font-bold tracking-tight">Customer Directory</h1>
      <p class="text-sm text-[var(--ui-muted-foreground)]">Manage multi-tenant accounts, subscriptions, and usage.</p>
    </div>
    <div class="flex items-center gap-3">
      <button
        type="button"
        class="inline-flex items-center gap-2 rounded-lg border border-[var(--ui-border)] bg-[var(--ui-background)] px-3.5 py-2 text-sm font-medium hover:bg-[var(--ui-secondary)] transition-colors"
      >
        <Download class="size-4" />
        Export CSV
      </button>
      <button
        type="button"
        class="inline-flex items-center gap-2 rounded-lg bg-[var(--ui-primary)] px-3.5 py-2 text-sm font-medium text-[var(--ui-primary-foreground)] hover:opacity-90 transition-opacity"
      >
        <Plus class="size-4" />
        Add Customer
      </button>
    </div>
  </div>

  <!-- Benchmark ScreenDatatable Integration -->
  <div class="rounded-xl border border-[var(--ui-border)] bg-[var(--ui-card)] p-4 shadow-xs">
    <ScreenDatatable />
  </div>
</div>
