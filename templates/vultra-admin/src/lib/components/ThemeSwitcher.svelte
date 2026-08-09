<script lang="ts">
	import { Check, Palette } from 'lucide-svelte';
	import {
		THEMES,
		THEME_STORAGE_KEY,
		SIGNATURE_THEMES,
		applyTheme,
		getStoredTheme,
		isThemeId
	} from '$lib/theme';

	let {
		theme = $bindable('neutral'),
		align = 'right'
	}: {
		theme?: string;
		align?: 'left' | 'right';
	} = $props();

	let open = $state(false);

	$effect(() => {
		if (!isThemeId(theme)) {
			theme = getStoredTheme() ?? 'neutral';
		}
	});

	$effect(() => {
		if (isThemeId(theme)) applyTheme(theme);
	});

	const current = $derived(SIGNATURE_THEMES.find((t) => t.id === theme));
	const currentEntry = $derived(THEMES.find((t) => t.id === theme));

	function select(id: string) {
		theme = id;
		open = false;
	}
</script>

<div class="theme-switcher relative">
	<button
		type="button"
		class="flex cursor-pointer items-center gap-2 rounded-full border border-[var(--ui-border)] bg-[var(--ui-card)] px-3 py-1.5 text-sm font-medium text-[var(--ui-foreground)] shadow-sm transition-colors hover:bg-[var(--ui-secondary)]"
		aria-haspopup="listbox"
		aria-expanded={open}
		onclick={() => (open = !open)}
	>
		<Palette class="size-4 text-[var(--ui-muted-foreground)]" />
		<span class="hidden sm:inline">{current?.name ?? 'Theme'}</span>
		{#if currentEntry}
			<span class="flex -space-x-1" aria-hidden="true">
				<span class="inline-block size-3 rounded-full border border-black/10" style={`background:${currentEntry.bg}`}></span>
				<span class="inline-block size-3 rounded-full border border-black/10" style={`background:${currentEntry.fg}`}></span>
			</span>
		{/if}
	</button>

	{#if open}
		<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
		<div
			class="absolute top-full z-50 mt-2 w-72 overflow-hidden rounded-xl border border-[var(--ui-border)] bg-[var(--ui-popover)] shadow-lg {align === 'right' ? 'right-0' : 'left-0'}"
			role="listbox"
			aria-label="Select theme"
		onclick={(e) => e.stopPropagation()}
		>
			<p class="border-b border-[var(--ui-border)] px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[var(--ui-muted-foreground)]">
				Vultra Themes
			</p>
			<ul class="max-h-80 overflow-y-auto p-1.5">
				{#each SIGNATURE_THEMES as sig (sig.id)}
					{@const entry = THEMES.find((t) => t.id === sig.id)}
					{#if entry}
						<li>
							<button
								type="button"
								class="flex w-full cursor-pointer items-center gap-3 rounded-lg px-2.5 py-2 text-left text-sm transition-colors hover:bg-[var(--ui-secondary)]"
								role="option"
								aria-selected={theme === sig.id}
								onclick={() => select(sig.id)}
							>
								<span class="flex -space-x-1.5" aria-hidden="true">
									<span class="inline-block size-5 rounded-full border-2 border-[var(--ui-popover)]" style={`background:${entry.bg}`}></span>
									<span class="inline-block size-5 rounded-full border-2 border-[var(--ui-popover)]" style={`background:${entry.fg}`}></span>
								</span>
								<span class="flex-1">{sig.name}</span>
								{#if theme === sig.id}
									<Check class="size-4 text-[var(--ui-primary)]" />
								{/if}
							</button>
						</li>
					{/if}
				{/each}
			</ul>
			<p class="border-t border-[var(--ui-border)] px-4 py-2 text-[11px] text-[var(--ui-muted-foreground)]">
				Saved to localStorage ({THEME_STORAGE_KEY})
			</p>
		</div>
	{/if}
</div>