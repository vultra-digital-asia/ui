<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		class: className,
		children,
		...restProps
	}: HTMLAttributes<HTMLDivElement> & {
		class?: string;
		children?: Snippet;
	} = $props();
</script>

<div
	data-slot="sidebar-header"
	class={cn("flex flex-col gap-2 p-2", className)}
	{...restProps}
>
	{@render children?.()}
</div>
