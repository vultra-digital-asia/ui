<script lang="ts">
	import { setContext, type Snippet } from "svelte";

	type DrawerDirection = "top" | "right" | "bottom" | "left";

	let {
		open = $bindable(false),
		direction = "bottom",
		class: className,
		children
	}: {
		open?: boolean;
		direction?: DrawerDirection;
		class?: string;
		children?: Snippet;
	} = $props();

	setContext("drawer-state", {
		get open() { return open; },
		set open(v) { open = v; },
		direction
	});

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === "Escape" && open) {
			open = false;
		}
	}

	// Lock body scroll when drawer is open
	$effect(() => {
		if (open) {
			const original = document.body.style.overflow;
			document.body.style.overflow = "hidden";
			return () => {
				document.body.style.overflow = original;
			};
		}
	});
</script>

<svelte:window onkeydown={handleKeydown} />

<div class={className}>
	{@render children?.()}
</div>
