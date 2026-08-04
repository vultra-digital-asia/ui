<script lang="ts">
  import { cn } from '../../utils.js';

  let {
    length = 6,
    value = $bindable(''),
    disabled = false,
    class: className,
    onComplete,
  }: {
    length?: number;
    value?: string;
    disabled?: boolean;
    class?: string;
    onComplete?: (value: string) => void;
  } = $props();

  let inputs: HTMLInputElement[] = [];

  function handleInput(index: number, e: Event) {
    const input = e.target as HTMLInputElement;
    const val = input.value;

    if (val && index < length - 1) {
      inputs[index + 1]?.focus();
    }

    updateValue();
  }

  function handleKeydown(index: number, e: KeyboardEvent) {
    if (e.key === 'Backspace' && !inputs[index].value && index > 0) {
      inputs[index - 1]?.focus();
    }
  }

  function handlePaste(e: ClipboardEvent) {
    e.preventDefault();
    const pasted = e.clipboardData?.getData('text') ?? '';
    const chars = pasted.replace(/\D/g, '').slice(0, length);
    for (let i = 0; i < chars.length; i++) {
      if (inputs[i]) inputs[i].value = chars[i];
    }
    updateValue();
    if (chars.length > 0) inputs[Math.min(chars.length, length) - 1]?.focus();
  }

  function updateValue() {
    value = inputs.map((i) => i.value).join('');
    if (value.length === length) onComplete?.(value);
  }
</script>

<div class={cn('flex items-center gap-2', className)}>
  {#each Array.from({ length }, (_, i) => i) as index}
    <input
      bind:this={inputs[index]}
      type="text"
      maxlength={1}
      {disabled}
      class={cn(
        'w-10 h-12 text-center text-lg font-mono rounded-lg border border-[var(--ui-input)] bg-[var(--ui-background)] outline-none transition-colors',
        'focus:border-[var(--ui-primary)] focus:ring-2 focus:ring-[var(--ui-ring)]/20',
        disabled && 'opacity-50 cursor-not-allowed'
      )}
      oninput={(e) => handleInput(index, e)}
      onkeydown={(e) => handleKeydown(index, e)}
      onpaste={handlePaste}
    />
  {/each}
</div>
