<script lang="ts">
  import { ScreenSidebarShell } from '@vultra/screens';
  import { LayoutDashboard, Users, CreditCard, Settings, LogOut } from 'lucide-svelte';
  import { createAuthFeature } from '$lib/features/auth/auth.svelte.js';

  let { children } = $props();
  const auth = createAuthFeature();

  const navigationItems = [
    { label: 'Overview', href: '/app', icon: LayoutDashboard },
    { label: 'Customers', href: '/app/customers', icon: Users },
    { label: 'Billing & Plans', href: '/app/billing', icon: CreditCard },
    { label: 'Settings', href: '/app/settings', icon: Settings }
  ];
</script>

<div class="flex h-screen w-full overflow-hidden bg-[var(--ui-background)]">
  <ScreenSidebarShell items={navigationItems} user={auth.user}>
    <main class="flex-1 overflow-y-auto p-6 md:p-8">
      {@render children()}
    </main>
  </ScreenSidebarShell>
</div>
