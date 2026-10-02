<script lang="ts">
  import { Layers, ArrowRight } from 'lucide-svelte';
  import { createAuthFeature } from '$lib/features/auth/auth.svelte.js';

  const auth = createAuthFeature();
  let email = $state('');
  let password = $state('');

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    auth.login(email);
    window.location.href = '/app';
  }
</script>

<div class="flex min-h-screen items-center justify-center bg-[var(--ui-secondary)]/30 px-6 py-12">
  <div class="w-full max-w-sm rounded-xl border border-[var(--ui-border)] bg-[var(--ui-card)] p-8 shadow-sm">
    <div class="mb-8 text-center">
      <div class="mx-auto flex size-10 items-center justify-center rounded-lg bg-[var(--ui-primary)] text-[var(--ui-primary-foreground)] shadow-xs mb-3">
        <Layers class="size-5" />
      </div>
      <h1 class="text-xl font-bold tracking-tight">Welcome Back</h1>
      <p class="text-xs text-[var(--ui-muted-foreground)] mt-1">Sign in to your Vultra account to continue.</p>
    </div>

    <form onsubmit={handleSubmit} class="space-y-4">
      <div>
        <label for="login-email" class="block text-xs font-medium text-[var(--ui-muted-foreground)]">Email address</label>
        <input
          id="login-email"
          type="email"
          bind:value={email}
          required
          placeholder="name@company.com"
          class="mt-1 block w-full rounded-lg border border-[var(--ui-border)] bg-[var(--ui-background)] px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-[var(--ui-primary)]"
        />
      </div>

      <div>
        <label for="login-password" class="block text-xs font-medium text-[var(--ui-muted-foreground)]">Password</label>
        <input
          id="login-password"
          type="password"
          bind:value={password}
          required
          placeholder="••••••••"
          class="mt-1 block w-full rounded-lg border border-[var(--ui-border)] bg-[var(--ui-background)] px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-[var(--ui-primary)]"
        />
      </div>

      <button
        type="submit"
        class="flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--ui-primary)] py-2.5 text-xs font-medium text-[var(--ui-primary-foreground)] shadow-xs transition-opacity hover:opacity-90 active:scale-[0.99]"
      >
        Sign In
        <ArrowRight class="size-3.5" />
      </button>
    </form>

    <div class="mt-6 text-center text-xs text-[var(--ui-muted-foreground)]">
      Don't have an account? <a href="/onboarding" class="font-medium text-[var(--ui-foreground)] hover:underline">Start onboarding</a>
    </div>
  </div>
</div>
