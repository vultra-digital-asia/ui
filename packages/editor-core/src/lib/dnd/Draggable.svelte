<script lang="ts">
  import { useDraggable } from '@dnd-kit/core';
  import type { Snippet } from 'svelte';

  let {
    id,
    data,
    disabled = false,
    class: className,
    children
  }: {
    id: string;
    data?: any;
    disabled?: boolean;
    class?: string;
    children?: Snippet;
  } = $props();

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    data: { ...data, type: 'draggable' },
    disabled
  });

  const style = $derived(
    transform
      ? `transform: translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined
  );
</script>

<div
  bind:this={setNodeRef}
  {style}
  {...attributes}
  {...listeners}
  class={className}
>
  {@render children?.()}
</div>
