<script lang="ts" module>
	import { tv } from 'tailwind-variants';

	export const tabBarVariants = tv({
		base: 'fixed inset-x-0 bottom-0 z-40 flex items-stretch border-t border-[var(--ui-border)] bg-[var(--ui-background)]',
		variants: {
			blur: {
				true: 'supports-[backdrop-filter]:bg-[color-mix(in_oklab,var(--ui-background)_88%,transparent)] supports-[backdrop-filter]:backdrop-blur-xl',
				false: ''
			}
		},
		defaultVariants: {
			blur: true
		}
	});
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils.js';

	let {
		value,
		blur = true,
		class: className,
		children
	}: {
		value: string | number;
		blur?: boolean;
		class?: string;
		children: Snippet;
	} = $props();

	let isPressed = $state(false);
</script>

<nav
	class={cn(tabBarVariants({ blur }), 'pb-[env(safe-area-inset-bottom)]', className)}
	aria-label="Primary navigation"
>
	<div class="flex h-14 w-full items-stretch" role="tablist" aria-label="Primary">
		{@render children()}
	</div>
</nav>
