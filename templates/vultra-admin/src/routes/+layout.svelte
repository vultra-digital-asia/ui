<script lang="ts">
	import '../app.css';
	import {
		LayoutDashboard,
		LogOut,
		Menu,
		Package,
		ShoppingCart,
		Settings,
		Users,
		X,
		Zap
	} from 'lucide-svelte';
	import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';
	import { applyTheme, getStoredTheme, isThemeId } from '$lib/theme';
	import { page } from '$app/state';

	interface NavItem {
		href: string;
		label: string;
		icon: typeof LayoutDashboard;
	}

	const navItems: NavItem[] = [
		{ href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
		{ href: '/users', label: 'Users', icon: Users },
		{ href: '/products', label: 'Products', icon: Package },
		{ href: '/orders', label: 'Orders', icon: ShoppingCart },
		{ href: '/settings', label: 'Settings', icon: Settings }
	];

	let mobileOpen = $state(false);
	let activeTheme = $state('neutral');
	let applied = $state(false);

	$effect(() => {
		// Apply the persisted theme once on the client; later changes flow
		// through the ThemeSwitcher bind.
		if (!applied && typeof window !== 'undefined') {
			applied = true;
			const stored = getStoredTheme();
			if (stored) activeTheme = stored;
			else applyTheme('neutral');
		}
	});

	$effect(() => {
		// Close the mobile drawer on navigation.
		mobileOpen = false;
	});
</script>

<svelte:head>
	<title>Vultra Admin</title>
</svelte:head>

<div class="min-h-dvh">
	<!-- Mobile top bar -->
	<header
		class="sticky top-0 z-40 flex items-center justify-between gap-3 border-b border-[var(--ui-border)] bg-[var(--ui-background)]/90 px-4 py-3 backdrop-blur md:hidden"
	>
		<div class="flex items-center gap-2">
			<button
				type="button"
				class="flex size-9 cursor-pointer items-center justify-center rounded-lg border border-[var(--ui-border)] bg-[var(--ui-card)] text-[var(--ui-foreground)]"
				aria-label="Open navigation"
				onclick={() => (mobileOpen = true)}
			>
				<Menu class="size-5" />
			</button>
			<a href="/dashboard" class="flex items-center gap-2 font-bold text-[var(--ui-foreground)]">
				<span class="flex size-7 items-center justify-center rounded-lg bg-[var(--ui-primary)] text-[var(--ui-primary-foreground)]">
					<Zap class="size-4" />
				</span>
				Vultra Admin
			</a>
		</div>
		<ThemeSwitcher bind:theme={activeTheme} />
	</header>

	<!-- Mobile drawer overlay -->
	{#if mobileOpen}
		<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
		<div
			class="fixed inset-0 z-50 bg-black/50 md:hidden"
			role="presentation"
			onclick={() => (mobileOpen = false)}
		></div>
	{/if}

	<!-- Sidebar -->
	<aside
		class="fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-[var(--ui-border)] bg-[var(--ui-card)] transition-transform duration-200 md:translate-x-0 {mobileOpen
			? 'translate-x-0'
			: '-translate-x-full'}"
		aria-label="Sidebar navigation"
	>
		<div class="flex h-16 items-center justify-between border-b border-[var(--ui-border)] px-5">
			<a href="/dashboard" class="flex items-center gap-2 font-bold text-[var(--ui-foreground)]">
				<span class="flex size-8 items-center justify-center rounded-lg bg-[var(--ui-primary)] text-[var(--ui-primary-foreground)]">
					<Zap class="size-4" />
				</span>
				Vultra Admin
			</a>
			<button
				type="button"
				class="flex size-8 cursor-pointer items-center justify-center rounded-lg text-[var(--ui-muted-foreground)] hover:bg-[var(--ui-secondary)] md:hidden"
				aria-label="Close navigation"
				onclick={() => (mobileOpen = false)}
			>
				<X class="size-4" />
			</button>
		</div>

		<nav class="flex-1 space-y-1 overflow-y-auto p-3">
			{#each navItems as item (item.href)}
				<a
					href={item.href}
					class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors {page.url.pathname === item.href
						? 'bg-[var(--ui-primary)]/10 text-[var(--ui-primary)]'
						: 'text-[var(--ui-muted-foreground)] hover:bg-[var(--ui-secondary)] hover:text-[var(--ui-foreground)]'}"
				>
					<item.icon class="size-4.5" />
					{item.label}
				</a>
			{/each}
		</nav>

		<div class="space-y-3 border-t border-[var(--ui-border)] p-4">
			<ThemeSwitcher bind:theme={activeTheme} />
			<a
				href="/login"
				class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--ui-muted-foreground)] transition-colors hover:bg-[var(--ui-secondary)] hover:text-[var(--ui-foreground)]"
			>
				<LogOut class="size-4.5" />
				Log out
			</a>
		</div>
	</aside>

	<!-- Main content -->
	<div class="md:pl-64">
		<main class="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
			{@render children?.()}
		</main>
	</div>
</div>
