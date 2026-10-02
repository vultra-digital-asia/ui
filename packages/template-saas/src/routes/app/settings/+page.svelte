<script lang="ts">
  import { Shield, Key, Bell, User, Check } from 'lucide-svelte';
  import { createAuthFeature } from '$lib/features/auth/auth.svelte.js';

  const auth = createAuthFeature();
  let saved = $state(false);

  function handleSave() {
    saved = true;
    setTimeout(() => (saved = false), 2000);
  }
</script>

<div class="max-w-4xl space-y-8">
  <div>
    <h1 class="text-2xl font-bold tracking-tight">Organization & Settings</h1>
    <p class="text-sm text-[var(--ui-muted-foreground)]">Manage profile preferences, credentials, and API access.</p>
  </div>

  <div class="divide-y divide-[var(--ui-border)] rounded-xl border border-[var(--ui-border)] bg-[var(--ui-card)] shadow-xs">
    <!-- General Profile -->
    <div class="p-6 space-y-4">
      <h2 class="text-base font-semibold flex items-center gap-2">
        <User class="size-4 text-[var(--ui-muted-foreground)]" />
        Admin Profile
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label for="name" class="block text-xs font-medium text-[var(--ui-muted-foreground)]">Full Name</label>
          <input
            id="name"
            type="text"
            value={auth.user?.name ?? ''}
            class="mt-1 block w-full rounded-lg border border-[var(--ui-border)] bg-[var(--ui-background)] px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-[var(--ui-primary)]"
          />
        </div>
        <div>
          <label for="email" class="block text-xs font-medium text-[var(--ui-muted-foreground)]">Contact Email</label>
          <input
            id="email"
            type="email"
            value={auth.user?.email ?? ''}
            class="mt-1 block w-full rounded-lg border border-[var(--ui-border)] bg-[var(--ui-background)] px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-[var(--ui-primary)]"
          />
        </div>
      </div>
    </div>

    <!-- API Keys -->
    <div class="p-6 space-y-4">
      <h2 class="text-base font-semibold flex items-center gap-2">
        <Key class="size-4 text-[var(--ui-muted-foreground)]" />
        Secret API Keys
      </h2>
      <p class="text-xs text-[var(--ui-muted-foreground)]">Use this key to authenticate server-side requests via the Vultra SDK.</p>
      <div class="flex items-center gap-3">
        <input
          type="password"
          value="vultra_sec_live_99812498148912"
          readonly
          class="flex-1 rounded-lg border border-[var(--ui-border)] bg-[var(--ui-secondary)]/50 px-3 py-2 font-mono text-xs text-[var(--ui-muted-foreground)] outline-none"
        />
        <button
          type="button"
          class="rounded-lg border border-[var(--ui-border)] bg-[var(--ui-background)] px-3.5 py-2 text-xs font-medium hover:bg-[var(--ui-secondary)] transition-colors"
        >
          Roll Key
        </button>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex items-center justify-between p-6">
      <span class="text-xs text-[var(--ui-muted-foreground)]">All changes apply across production tenants immediately.</span>
      <button
        type="button"
        onclick={handleSave}
        class="inline-flex items-center gap-2 rounded-lg bg-[var(--ui-primary)] px-4 py-2 text-xs font-medium text-[var(--ui-primary-foreground)] shadow-xs transition-all hover:opacity-90"
      >
        {#if saved}
          <Check class="size-3.5" />
          Saved!
        {:else}
          Save Changes
        {/if}
      </button>
    </div>
  </div>
</div>
