<script lang="ts">
  import { DragOverlay as DndKitOverlay } from '@dnd-kit/core';
  import type { Snippet } from 'svelte';

  let {
    children
  }: {
    children?: Snippet;
  } = $props();
</script>

<DndKitOverlay>
  <div class="opacity-80 shadow-lg">
    {@render children?.()}
  </div>
</DndKitOverlay>
