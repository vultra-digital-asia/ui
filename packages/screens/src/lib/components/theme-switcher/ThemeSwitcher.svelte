<script lang="ts">
  import { onMount } from 'svelte';
  import { Palette, Check } from 'lucide-svelte';

  export interface ThemePreset {
    id: string;
    label: string;
    bg: string;
    ink: string;
    accent: string;
    border: string;
    muted: string;
  }

  export const THEME_PRESETS: ThemePreset[] = [
    {
      id: 'ethereal-sand',
      label: 'Ethereal Sand',
      bg: '#FBF9F9',
      ink: '#1B1C1C',
      accent: '#A13F20',
      border: '#E8E4E1',
      muted: '#F5F2F0',
    },
    {
      id: 'atelier-zinc',
      label: 'Atelier Zinc',
      bg: '#FAFAFA',
      ink: '#18181B',
      accent: '#27272A',
      border: '#E4E4E7',
      muted: '#F4F4F5',
    },
    {
      id: 'emerald-luxury',
      label: 'Emerald Luxury',
      bg: '#F7FAF8',
      ink: '#111C15',
      accent: '#2F6B57',
      border: '#E1E8E3',
      muted: '#EDF2EE',
    },
    {
      id: 'warm-parchment',
      label: 'Warm Parchment',
      bg: '#F9F7F1',
      ink: '#23201B',
      accent: '#9E5D2A',
      border: '#E7E2D6',
      muted: '#EFECE2',
    },
  ];

  let currentTheme = $state('ethereal-sand');
  let open = $state(false);

  function applyTheme(preset: ThemePreset) {
    currentTheme = preset.id;
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      root.style.setProperty('--ui-background', preset.bg);
      root.style.setProperty('--ui-foreground', preset.ink);
      root.style.setProperty('--ui-primary', preset.accent);
      root.style.setProperty('--ui-border', preset.border);
      root.style.setProperty('--ui-muted', preset.muted);
      root.style.setProperty('--ui-accent', preset.accent);
      root.style.setProperty('--ui-card', '#FFFFFF');
      localStorage.setItem('vultra_active_theme', preset.id);
    }
    open = false;
  }

  onMount(() => {
    const saved = localStorage.getItem('vultra_active_theme');
    if (saved) {
      const target = THEME_PRESETS.find((p) => p.id === saved);
      if (target) applyTheme(target);
    }
  });
</script>

<div class="relative inline-block text-left">
  <button
    type="button"
    onclick={() => (open = !open)}
    class="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[var(--ui-border)] bg-white shadow-xs text-xs font-semibold text-[#1B1C1C] hover:border-[#1B1C1C]/40 transition-all"
    aria-label="Toggle Theme Selector"
  >
    <div
      class="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
      style="background-color: {THEME_PRESETS.find(p => p.id === currentTheme)?.accent || '#A13F20'}"
    ></div>
    <span class="hidden sm:inline">{THEME_PRESETS.find(p => p.id === currentTheme)?.label || 'Theme'}</span>
    <Palette class="w-3.5 h-3.5 text-[#767575]" />
  </button>

  {#if open}
    <!-- Backdrop to close -->
    <div
      class="fixed inset-0 z-40"
      role="button"
      tabindex="0"
      aria-label="Close"
      onclick={() => (open = false)}
      onkeydown={(e) => e.key === 'Escape' && (open = false)}
    ></div>

    <div class="absolute right-0 mt-2 w-48 rounded-xl bg-white border border-[var(--ui-border)] shadow-xl z-50 p-1.5 space-y-1">
      {#each THEME_PRESETS as preset}
        <button
          type="button"
          onclick={() => applyTheme(preset)}
          class="w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-semibold text-left transition-colors {currentTheme === preset.id ? 'bg-[#F5F2F0] text-[#1B1C1C]' : 'hover:bg-[#FBF9F9] text-[#767575] hover:text-[#1B1C1C]'}"
        >
          <div class="flex items-center gap-2.5">
            <div
              class="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0 shadow-2xs"
              style="background-color: {preset.accent}"
            ></div>
            <span>{preset.label}</span>
          </div>
          {#if currentTheme === preset.id}
            <Check class="w-3.5 h-3.5 text-[#A13F20]" />
          {/if}
        </button>
      {/each}
    </div>
  {/if}
</div>
