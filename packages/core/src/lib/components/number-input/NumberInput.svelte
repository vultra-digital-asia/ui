<script lang="ts">
  import { Minus, Plus } from 'lucide-svelte';
  import { cn } from '../../utils.js';

  let {
    value = $bindable(0),
    min = -Infinity,
    max = Infinity,
    step = 1,
    disabled = false,
    class: className,
  }: {
    value?: number;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    class?: string;
  } = $props();

  function decrement() { value = Math.max(min, value - step); }
  function increment() { value = Math.min(max, value + step); }
</script>

<div class={cn('flex items-center', className)}>
  <button onclick={decrement} {disabled} class="h-10 px-2 rounded-l-lg border border-r-0 border-[var(--ui-input)] bg-[var(--ui-secondary)] hover:bg-[var(--ui-secondary)]/80 disabled:opacity-50 cursor-pointer">
    <Minus class="size-3" />
  </button>
  <input
    type="number"
    bind:value
    {min}
    {max}
    {step}
    {disabled}
    class="h-10 w-16 px-2 text-center border-y border-[var(--ui-input)] bg-[var(--ui-background)] text-sm outline-none"
  />
  <button onclick={increment} {disabled} class="h-10 px-2 rounded-r-lg border border-l-0 border-[var(--ui-input)] bg-[var(--ui-secondary)] hover:bg-[var(--ui-secondary)]/80 disabled:opacity-50 cursor-pointer">
    <Plus class="size-3" />
  </button>
</div>
