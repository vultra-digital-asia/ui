<script lang="ts">
  import { useDroppable } from '@dnd-kit/core';
  import type { Snippet } from 'svelte';

  let {
    id,
    class: className,
    children
  }: {
    id: string;
    class?: string;
    children?: Snippet;
  } = $props();

  const { isOver, setNodeRef } = useDroppable({ id });
</script>

<div
  bind:this={setNodeRef}
  class={className}
  class:ring-2={$isOver}
  class:ring-[var(--ui-primary)]={$isOver}
  class:ring-opacity-50={$isOver}
>
  {@render children?.()}
</div>
