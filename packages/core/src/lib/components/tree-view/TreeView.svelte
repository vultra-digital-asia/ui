<script lang="ts">
  import { ChevronRight, ChevronDown, Folder, File, GripVertical } from 'lucide-svelte';
  import { cn } from '../../utils.js';

  type TreeNode = {
    id: string;
    label: string;
    icon?: any;
    children?: TreeNode[];
    data?: any;
  };

  let {
    nodes = [],
    selectedId = null,
    onSelect,
    onDragStart,
    onDrop,
    class: className,
  }: {
    nodes: TreeNode[];
    selectedId?: string | null;
    onSelect?: (node: TreeNode) => void;
    onDragStart?: (node: TreeNode, e: DragEvent) => void;
    onDrop?: (node: TreeNode, e: DragEvent) => void;
    class?: string;
  } = $props();

  let expandedIds = $state<Set<string>>(new Set(nodes.map((n) => n.id)));

  function toggleExpand(id: string) {
    const next = new Set(expandedIds);
    if (next.has(id)) next.delete(id); else next.add(id);
    expandedIds = next;
  }

  function isExpanded(id: string): boolean {
    return expandedIds.has(id);
  }
</script>

<div class={cn('text-sm', className)}>
  {#each nodes as node (node.id)}
    <div
      draggable="true"
      ondragstart={(e) => onDragStart?.(node, e)}
      ondragover={(e) => e.preventDefault()}
      ondrop={(e) => onDrop?.(node, e)}
    >
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <div
        class={cn(
          'flex items-center gap-1.5 px-2 py-1.5 rounded-md cursor-pointer transition-colors',
          selectedId === node.id
            ? 'bg-[var(--ui-primary)]/10 text-[var(--ui-primary)]'
            : 'hover:bg-[var(--ui-secondary)] text-[var(--ui-foreground)]'
        )}
        onclick={() => onSelect?.(node)}
      >
        {#if node.children?.length}
          <button
            onclick|stopPropagation={() => toggleExpand(node.id)}
            class="p-0.5 rounded hover:bg-[var(--ui-secondary)] cursor-pointer"
          >
            {#if isExpanded(node.id)}
              <ChevronDown class="size-3" />
            {:else}
              <ChevronRight class="size-3" />
            {/if}
          </button>
        {:else}
          <span class="w-4"></span>
        {/if}

        {#if node.icon}
          <svelte:component this={node.icon} class="size-4 text-[var(--ui-muted-foreground)] shrink-0" />
        {:else}
          <Folder class="size-4 text-[var(--ui-muted-foreground)] shrink-0" />
        {/if}

        <span class="truncate">{node.label}</span>
      </div>

      {#if node.children?.length && isExpanded(node.id)}
        <div class="ml-4">
          {#each node.children as child (child.id)}
            {@const isSelected = selectedId === child.id}
            <div
              draggable="true"
              ondragstart={(e) => onDragStart?.(child, e)}
              ondragover={(e) => e.preventDefault()}
              ondrop={(e) => onDrop?.(child, e)}
            >
              <!-- svelte-ignore a11y_no_static_element_interactions -->
              <div
                class={cn(
                  'flex items-center gap-1.5 px-2 py-1 rounded-md cursor-pointer transition-colors',
                  isSelected
                    ? 'bg-[var(--ui-primary)]/10 text-[var(--ui-primary)]'
                    : 'hover:bg-[var(--ui-secondary)] text-[var(--ui-foreground)]'
                )}
                onclick={() => onSelect?.(child)}
              >
                {#if child.children?.length}
                  <button
                    onclick|stopPropagation={() => toggleExpand(child.id)}
                    class="p-0.5 rounded hover:bg-[var(--ui-secondary)] cursor-pointer"
                  >
                    {#if isExpanded(child.id)}
                      <ChevronDown class="size-3" />
                    {:else}
                      <ChevronRight class="size-3" />
                    {/if}
                  </button>
                {:else}
                  <span class="w-4"></span>
                {/if}

                {#if child.icon}
                  <svelte:component this={child.icon} class="size-3.5 text-[var(--ui-muted-foreground)] shrink-0" />
                {:else}
                  <File class="size-3.5 text-[var(--ui-muted-foreground)] shrink-0" />
                {/if}

                <span class="truncate text-xs">{child.label}</span>
              </div>

              {#if child.children?.length && isExpanded(child.id)}
                <div class="ml-4">
                  {#each child.children as grandchild (grandchild.id)}
                    <div
                      class="flex items-center gap-1.5 px-2 py-1 rounded-md cursor-pointer hover:bg-[var(--ui-secondary)] text-xs"
                      onclick={() => onSelect?.(grandchild)}
                    >
                      <span class="w-3"></span>
                      <File class="size-3 text-[var(--ui-muted-foreground)] shrink-0" />
                      <span class="truncate">{grandchild.label}</span>
                    </div>
                  {/each}
                </div>
              {/if}
            </div>
          {/each}
        </div>
      {/if}
    </div>
  {/each}
</div>
