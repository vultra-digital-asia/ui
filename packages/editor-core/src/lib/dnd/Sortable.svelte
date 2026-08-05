<script lang="ts">
  import { useSortable } from '@dnd-kit/sortable';
  import { CSS } from '@dnd-kit/utilities';
  import type { Snippet } from 'svelte';

  let {
    id,
    index,
    class: className,
    children
  }: {
    id: string;
    index: number;
    class?: string;
    children?: Snippet;
  } = $props();

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  const style = $derived(`
    transform: ${CSS.Transform.toString(transform)};
    transition: ${transition};
    opacity: ${isDragging ? 0.5 : 1};
  `);
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
