<script lang="ts">
  import { cn } from '../../utils.js';

  let {
    value = $bindable(0),
    max = 5,
    size = 'md',
    readonly = false,
    class: className,
    onChange,
  }: {
    value?: number;
    max?: number;
    size?: 'sm' | 'md' | 'lg';
    readonly?: boolean;
    class?: string;
    onChange?: (value: number) => void;
  } = $props();

  let hoverValue = $state(0);

  const sizeClasses = { sm: 'size-4', md: 'size-5', lg: 'size-6' };

  function handleClick(star: number) {
    if (readonly) return;
    value = star;
    onChange?.(star);
  }
</script>

<div class={cn('flex items-center gap-0.5', className)}>
  {#each Array.from({ length: max }, (_, i) => i + 1) as star}
    <button
      onclick={() => handleClick(star)}
      onmouseenter={() => { if (!readonly) hoverValue = star; }}
      onmouseleave={() => { hoverValue = 0; }}
      {readonly}
      class={cn(
        'cursor-pointer transition-colors',
        readonly ? 'cursor-default' : '',
        (hoverValue >= star || value >= star)
          ? 'text-yellow-400'
          : 'text-[var(--ui-muted-foreground)]/30'
      )}
    >
      <svg class={cn(sizeClasses[size])} viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    </button>
  {/each}
</div>
