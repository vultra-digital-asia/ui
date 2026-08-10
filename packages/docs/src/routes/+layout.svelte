<script lang="ts">
	import '../app.css';
	import { Search } from 'lucide-svelte';
	import SearchDialog from '$lib/components/SearchDialog.svelte';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';

	let { children } = $props();
	let theme = $state<'light' | 'dark'>('light');
	let searchOpen = $state(false);

	$effect(() => {
		// Load saved theme on mount, falling back to the system preference
		const saved = localStorage.getItem('ui-theme');
		if (saved === 'dark' || saved === 'light') {
			theme = saved;
		} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
			theme = 'dark';
		}
	});

	$effect(() => {
		document.documentElement.dataset.uiTheme = theme;
		localStorage.setItem('ui-theme', theme);
	});
</script>

<svelte:head>
	<title>Vultra UI — Svelte 5 Component Library</title>
	<meta name="description" content="Vultra UI component library — 100+ Svelte 5 components, 9 themes, CLI installer, mobile + native." />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<link rel="canonical" href="https://ui.vultra.id/" />
	<meta property="og:title" content="Vultra UI — Svelte 5 Component Library" />
	<meta property="og:description" content="100+ Svelte 5 components, 9 themes, CLI installer. Mobile-first + native device features." />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://ui.vultra.id/" />
	<meta property="og:image" content="https://ui.vultra.id/og.png" />
	<meta property="og:site_name" content="Vultra UI" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Vultra UI — Svelte 5 Component Library" />
	<meta name="twitter:description" content="100+ Svelte 5 components, 9 themes, CLI installer." />
	<meta name="twitter:image" content="https://ui.vultra.id/og.png" />
	<link rel="sitemap" type="application/xml" href="https://ui.vultra.id/sitemap.xml" />
	<meta name="robots" content="index, follow" />
</svelte:head>

<div class="min-h-screen">
	<header class="sticky top-0 z-40 border-b border-[var(--ui-border)] bg-[var(--ui-background)]/80 backdrop-blur">
		<div class="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
			<a href="/" class="flex items-center gap-2 font-semibold">
				<span class="flex size-6 items-center justify-center rounded-md bg-[var(--ui-primary)] text-[var(--ui-primary-foreground)] text-xs font-bold">V</span>
				Vultra UI
			</a>
			<nav class="hidden items-center gap-1 md:flex">
				<a href="/docs" class="rounded-md px-3 py-1.5 text-sm hover:bg-[var(--ui-muted)]">Docs</a>
				<a href="/docs/components" class="rounded-md px-3 py-1.5 text-sm hover:bg-[var(--ui-muted)]">Components</a>
				<a href="https://github.com/vultra-digital-asia/ui" target="_blank" class="rounded-md px-3 py-1.5 text-sm hover:bg-[var(--ui-muted)]">GitHub</a>
			</nav>
			<div class="flex items-center gap-2">
				<button
					onclick={() => (searchOpen = true)}
					class="flex items-center gap-2 rounded-md border border-[var(--ui-border)] px-3 py-1.5 text-sm text-[var(--ui-muted-foreground)] hover:bg-[var(--ui-muted)]"
				>
					<Search class="size-3.5" />
					<span class="hidden sm:inline">Search</span>
					<kbd class="hidden rounded border border-[var(--ui-border)] bg-[var(--ui-muted)] px-1.5 py-0.5 text-[10px] font-mono sm:inline">⌘K</kbd>
				</button>
				<ThemeToggle bind:theme />
			</div>
		</div>
	</header>

	{@render children?.()}
</div>

<SearchDialog bind:open={searchOpen} />
