<script lang="ts">
  import {
    Palette,
    Copy,
    Check,
    Download,
    RefreshCw,
    Sparkles,
    Smartphone,
    Globe,
    FileCode,
    Sliders,
    Layers,
    ShieldCheck
  } from 'lucide-svelte';

  interface TokenPreset {
    id: string;
    name: string;
    description: string;
    colors: Record<string, string>;
    radii: Record<string, string>;
  }

  const PRESETS: Record<string, TokenPreset> = {
    'ethereal-sand': {
      id: 'ethereal-sand',
      name: 'Ethereal Sand',
      description: 'Digital Atelier light luxury. 60% warm sand canvas, 30% structural ink, 10% terracotta accent.',
      colors: {
        background: '#FBF9F9',
        foreground: '#1B1C1C',
        primary: '#A13F20',
        'primary-foreground': '#FFFFFF',
        card: '#FFFFFF',
        'card-foreground': '#1B1C1C',
        muted: '#F5F2F0',
        'muted-foreground': '#6E6B68',
        border: '#E8E4E1',
        accent: '#E97451',
        destructive: '#BA1A1A',
      },
      radii: {
        sm: '12px',
        base: '16px',
        lg: '20px',
      },
    },
    'atelier-zinc': {
      id: 'atelier-zinc',
      name: 'Atelier Zinc',
      description: 'Ultra-minimalist modern monochrome with subtle zinc neutral borders.',
      colors: {
        background: '#FAFAFA',
        foreground: '#18181B',
        primary: '#18181B',
        'primary-foreground': '#FAFAFA',
        card: '#FFFFFF',
        'card-foreground': '#18181B',
        muted: '#F4F4F5',
        'muted-foreground': '#71717A',
        border: '#E4E4E7',
        accent: '#27272A',
        destructive: '#EF4444',
      },
      radii: {
        sm: '8px',
        base: '12px',
        lg: '16px',
      },
    },
    'emerald-luxury': {
      id: 'emerald-luxury',
      name: 'Emerald Luxury',
      description: 'High-trust fintech and sustainable commerce with deep forest greens.',
      colors: {
        background: '#F7FAF8',
        foreground: '#0D1F17',
        primary: '#137547',
        'primary-foreground': '#FFFFFF',
        card: '#FFFFFF',
        'card-foreground': '#0D1F17',
        muted: '#EDF5F0',
        'muted-foreground': '#527362',
        border: '#D8E8DF',
        accent: '#2A9D6A',
        destructive: '#C92A2A',
      },
      radii: {
        sm: '12px',
        base: '16px',
        lg: '24px',
      },
    },
    'warm-parchment': {
      id: 'warm-parchment',
      name: 'Warm Parchment',
      description: 'Editorial reading and beauty aesthetic inspired by Japanese tactile paper.',
      colors: {
        background: '#F9F6F0',
        foreground: '#2C2621',
        primary: '#C25E00',
        'primary-foreground': '#FFFFFF',
        card: '#FFFFFF',
        'card-foreground': '#2C2621',
        muted: '#F0ECE1',
        'muted-foreground': '#7A7265',
        border: '#E3DDD0',
        accent: '#D97706',
        destructive: '#B91C1C',
      },
      radii: {
        sm: '10px',
        base: '14px',
        lg: '18px',
      },
    },
  };

  let activePresetKey = $state('ethereal-sand');
  let currentColors = $state<Record<string, string>>({ ...PRESETS['ethereal-sand'].colors });
  let currentRadii = $state<Record<string, string>>({ ...PRESETS['ethereal-sand'].radii });
  let activeTab = $state<'preview' | 'css' | 'dart' | 'figma'>('preview');
  let copied = $state(false);

  function applyPreset(key: string) {
    activePresetKey = key;
    currentColors = { ...PRESETS[key].colors };
    currentRadii = { ...PRESETS[key].radii };
  }

  function handleColorChange(key: string, val: string) {
    currentColors[key] = val;
  }

  function handleRadiusChange(key: string, val: string) {
    currentRadii[key] = `${val}px`;
  }

  const generatedCss = $derived(`@import "tailwindcss";

@theme inline {
  --font-sans: "Plus Jakarta Sans, sans-serif";
  --font-mono: "JetBrains Mono, monospace";

  /* Brand Colors */
  --color-background: ${currentColors['background']};
  --color-foreground: ${currentColors['foreground']};
  --color-card: ${currentColors['card']};
  --color-card-foreground: ${currentColors['card-foreground']};
  --color-primary: ${currentColors['primary']};
  --color-primary-foreground: ${currentColors['primary-foreground']};
  --color-muted: ${currentColors['muted']};
  --color-muted-foreground: ${currentColors['muted-foreground']};
  --color-border: ${currentColors['border']};
  --color-accent: ${currentColors['accent']};
  --color-destructive: ${currentColors['destructive']};

  /* Squircle Corner Radii */
  --radius-sm: ${currentRadii['sm']};
  --radius-base: ${currentRadii['base']};
  --radius-lg: ${currentRadii['lg']};
}
`);

  const generatedDart = $derived(`import 'package:flutter/material.dart';

/// Design tokens compiled for Flutter (Apple HIG Squircle + 60-30-10 palette)
class AppColors {
  AppColors._();

  static const Color background = Color(0xFF${currentColors['background'].replace('#', '').toUpperCase()});
  static const Color foreground = Color(0xFF${currentColors['foreground'].replace('#', '').toUpperCase()});
  static const Color card = Color(0xFF${currentColors['card'].replace('#', '').toUpperCase()});
  static const Color cardForeground = Color(0xFF${currentColors['card-foreground'].replace('#', '').toUpperCase()});
  static const Color primary = Color(0xFF${currentColors['primary'].replace('#', '').toUpperCase()});
  static const Color primaryForeground = Color(0xFF${currentColors['primary-foreground'].replace('#', '').toUpperCase()});
  static const Color muted = Color(0xFF${currentColors['muted'].replace('#', '').toUpperCase()});
  static const Color mutedForeground = Color(0xFF${currentColors['muted-foreground'].replace('#', '').toUpperCase()});
  static const Color border = Color(0xFF${currentColors['border'].replace('#', '').toUpperCase()});
  static const Color accent = Color(0xFF${currentColors['accent'].replace('#', '').toUpperCase()});
  static const Color destructive = Color(0xFF${currentColors['destructive'].replace('#', '').toUpperCase()});
}

class AppRadii {
  AppRadii._();

  static const double sm = ${parseFloat(currentRadii['sm']) || 12};
  static const double base = ${parseFloat(currentRadii['base']) || 16};
  static const double lg = ${parseFloat(currentRadii['lg']) || 20};

  static BorderRadius get smBorderRadius => BorderRadius.circular(sm);
  static BorderRadius get baseBorderRadius => BorderRadius.circular(base);
  static BorderRadius get lgBorderRadius => BorderRadius.circular(lg);
}
`);

  const generatedFigmaJson = $derived(JSON.stringify({
    global: {
      color: Object.fromEntries(
        Object.entries(currentColors).map(([k, v]) => [k, { $value: v, $type: 'color' }])
      ),
      borderRadius: Object.fromEntries(
        Object.entries(currentRadii).map(([k, v]) => [k, { $value: v, $type: 'borderRadius' }])
      )
    },
    $themes: [
      {
        id: activePresetKey,
        name: PRESETS[activePresetKey]?.name || 'Custom Theme',
        selectedTokenSets: { global: 'enabled' }
      }
    ],
    $metadata: {
      tokenSetOrder: ['global']
    }
  }, null, 2));

  async function copyActiveCode() {
    let text = generatedCss;
    if (activeTab === 'dart') text = generatedDart;
    if (activeTab === 'figma') text = generatedFigmaJson;
    await navigator.clipboard.writeText(text);
    copied = true;
    setTimeout(() => { copied = false; }, 2000);
  }

  function downloadFile() {
    let content = generatedCss;
    let filename = 'app.css';
    let mime = 'text/css';

    if (activeTab === 'dart') {
      content = generatedDart;
      filename = 'app_colors.dart';
      mime = 'text/plain';
    } else if (activeTab === 'figma') {
      content = generatedFigmaJson;
      filename = 'tokens.json';
      mime = 'application/json';
    }

    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }
</script>

<svelte:head>
  <title>Token Studio & Compiler | Vultra UI</title>
  <meta name="description" content="Visual design token studio and multiplatform code compiler for Tailwind v4 and Flutter HIG." />
</svelte:head>

<div class="min-h-screen bg-[var(--ui-background,#FBF9F9)] text-[var(--ui-foreground,#1B1C1C)] font-sans antialiased">
  <!-- Top Banner -->
  <div class="border-b border-[var(--ui-border,#E8E4E1)] bg-white/70 backdrop-blur-md px-6 py-8">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div>
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#A13F20]/10 text-[#A13F20] mb-3">
          <Palette class="size-3.5" />
          Interactive Studio
        </div>
        <h1 class="text-3xl font-extrabold tracking-tight text-[#1B1C1C]">
          Design Token Studio & Compiler
        </h1>
        <p class="text-sm text-[#6E6B68] mt-1 max-w-2xl">
          Visual palette editor and dual-code compiler. Customize 60-30-10 colors and Apple squircle radii, then export instantly to Tailwind v4 CSS, Flutter Dart, or Figma Tokens Studio.
        </p>
      </div>

      <div class="flex items-center gap-3">
        <button
          onclick={copyActiveCode}
          class="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-[#1B1C1C] text-white hover:bg-black transition-all shadow-sm"
        >
          {#if copied}
            <Check class="size-4 text-emerald-400" />
            <span>Copied!</span>
          {:else}
            <Copy class="size-4" />
            <span>Copy Active Code</span>
          {/if}
        </button>
        <button
          onclick={downloadFile}
          class="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border border-[#E8E4E1] bg-white hover:bg-[#F5F2F0] transition-colors"
        >
          <Download class="size-4 text-[#A13F20]" />
          <span>Download</span>
        </button>
      </div>
    </div>
  </div>

  <div class="max-w-7xl mx-auto px-6 py-8">
    <!-- Presets Selector Grid -->
    <div class="mb-8">
      <div class="text-xs font-bold uppercase tracking-wider text-[#6E6B68] mb-3 flex items-center gap-2">
        <Sparkles class="size-3.5 text-[#A13F20]" />
        Choose Benchmark Design System Preset
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {#each Object.entries(PRESETS) as [key, preset]}
          <button
            onclick={() => applyPreset(key)}
            class="text-left p-4 rounded-2xl border transition-all text-sm {activePresetKey === key ? 'border-[#A13F20] bg-[#A13F20]/5 shadow-sm' : 'border-[#E8E4E1] bg-white hover:border-neutral-400'}"
          >
            <div class="flex items-center justify-between mb-2">
              <span class="font-bold text-[#1B1C1C]">{preset.name}</span>
              {#if activePresetKey === key}
                <span class="size-2 rounded-full bg-[#A13F20]"></span>
              {/if}
            </div>
            <p class="text-xs text-[#6E6B68] line-clamp-2 mb-3 leading-relaxed">
              {preset.description}
            </p>
            <!-- Palette Bar -->
            <div class="flex h-3 rounded-full overflow-hidden border border-black/5">
              <div class="w-2/5" style="background-color: {preset.colors.background}"></div>
              <div class="w-2/5" style="background-color: {preset.colors.foreground}"></div>
              <div class="w-1/5" style="background-color: {preset.colors.primary}"></div>
            </div>
          </button>
        {/each}
      </div>
    </div>

    <!-- Main Studio Layout: 2 Columns -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <!-- Left Controls: 5 Cols -->
      <div class="lg:col-span-5 space-y-6">
        <!-- Color Palette Editor Card -->
        <div class="bg-white rounded-2xl border border-[#E8E4E1] p-5 shadow-sm">
          <div class="flex items-center justify-between border-b border-[#E8E4E1] pb-3 mb-4">
            <h3 class="font-bold text-sm text-[#1B1C1C] flex items-center gap-2">
              <Sliders class="size-4 text-[#A13F20]" />
              Color Tokens (60-30-10 Ratio)
            </h3>
            <button
              onclick={() => applyPreset(activePresetKey)}
              class="text-xs text-[#6E6B68] hover:text-[#A13F20] inline-flex items-center gap-1"
            >
              <RefreshCw class="size-3" />
              Reset
            </button>
          </div>

          <div class="space-y-3.5">
            {#each Object.entries(currentColors) as [tokenKey, hexVal]}
              <div class="flex items-center justify-between gap-3">
                <div class="flex items-center gap-2 min-w-0">
                  <div
                    class="size-6 rounded-lg border border-black/10 shrink-0 shadow-inner"
                    style="background-color: {hexVal}"
                  ></div>
                  <span class="text-xs font-mono font-medium text-[#1B1C1C] truncate">{tokenKey}</span>
                </div>
                <div class="flex items-center gap-2 shrink-0">
                  <input
                    type="color"
                    value={hexVal}
                    oninput={(e) => handleColorChange(tokenKey, (e.target as HTMLInputElement).value)}
                    class="size-7 rounded cursor-pointer border border-[#E8E4E1] bg-transparent p-0"
                  />
                  <input
                    type="text"
                    value={hexVal}
                    oninput={(e) => handleColorChange(tokenKey, (e.target as HTMLInputElement).value)}
                    class="w-20 px-2 py-1 text-xs font-mono font-bold rounded-lg border border-[#E8E4E1] bg-[#F5F2F0] text-center uppercase focus:outline-[#A13F20]"
                  />
                </div>
              </div>
            {/each}
          </div>
        </div>

        <!-- Corner Radii Editor Card -->
        <div class="bg-white rounded-2xl border border-[#E8E4E1] p-5 shadow-sm">
          <h3 class="font-bold text-sm text-[#1B1C1C] flex items-center gap-2 border-b border-[#E8E4E1] pb-3 mb-4">
            <Layers class="size-4 text-[#A13F20]" />
            Apple HIG Continuous Radii
          </h3>
          <div class="space-y-4">
            {#each Object.entries(currentRadii) as [radKey, radVal]}
              <div>
                <div class="flex justify-between text-xs font-medium mb-1.5">
                  <span class="font-mono text-[#1B1C1C]">radius-{radKey}</span>
                  <span class="font-mono font-bold text-[#A13F20]">{radVal}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="32"
                  step="2"
                  value={parseFloat(radVal) || 16}
                  oninput={(e) => handleRadiusChange(radKey, (e.target as HTMLInputElement).value)}
                  class="w-full accent-[#A13F20] cursor-pointer"
                />
              </div>
            {/each}
          </div>
        </div>
      </div>

      <!-- Right View: Preview & Code (7 Cols) -->
      <div class="lg:col-span-7 space-y-6">
        <!-- Navigation View Tabs -->
        <div class="flex items-center gap-2 border-b border-[#E8E4E1] pb-3">
          <button
            onclick={() => activeTab = 'preview'}
            class="px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all {activeTab === 'preview' ? 'bg-[#1B1C1C] text-white shadow-sm' : 'text-[#6E6B68] hover:bg-[#F5F2F0]'}"
          >
            <Smartphone class="size-3.5" />
            Live Preview Canvas
          </button>
          <button
            onclick={() => activeTab = 'css'}
            class="px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all {activeTab === 'css' ? 'bg-[#1B1C1C] text-white shadow-sm' : 'text-[#6E6B68] hover:bg-[#F5F2F0]'}"
          >
            <Globe class="size-3.5" />
            Tailwind v4 CSS
          </button>
          <button
            onclick={() => activeTab = 'dart'}
            class="px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all {activeTab === 'dart' ? 'bg-[#1B1C1C] text-white shadow-sm' : 'text-[#6E6B68] hover:bg-[#F5F2F0]'}"
          >
            <FileCode class="size-3.5" />
            Flutter Dart
          </button>
          <button
            onclick={() => activeTab = 'figma'}
            class="px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all {activeTab === 'figma' ? 'bg-[#1B1C1C] text-white shadow-sm' : 'text-[#6E6B68] hover:bg-[#F5F2F0]'}"
          >
            <Palette class="size-3.5" />
            Figma JSON
          </button>
        </div>

        {#if activeTab === 'preview'}
          <!-- Live Interactive Sandbox Rendering with Custom Dynamic Colors -->
          <div
            class="p-8 border shadow-sm transition-all"
            style="
              background-color: {currentColors['background']};
              color: {currentColors['foreground']};
              border-color: {currentColors['border']};
              border-radius: {currentRadii['lg']};
            "
          >
            <div class="flex items-center justify-between mb-6">
              <div>
                <span
                  class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5"
                  style="
                    background-color: {currentColors['muted']};
                    color: {currentColors['primary']};
                    border-radius: {currentRadii['sm']};
                  "
                >
                  Live Theme Rendering
                </span>
                <h4 class="text-xl font-bold mt-1.5">Interactive Component Showcase</h4>
              </div>
              <div
                class="size-10 flex items-center justify-center font-bold text-sm shadow-sm"
                style="
                  background-color: {currentColors['primary']};
                  color: {currentColors['primary-foreground']};
                  border-radius: {currentRadii['base']};
                "
              >
                V
              </div>
            </div>

            <!-- Sample Card inside canvas -->
            <div
              class="p-5 border mb-6 shadow-sm"
              style="
                background-color: {currentColors['card']};
                color: {currentColors['card-foreground']};
                border-color: {currentColors['border']};
                border-radius: {currentRadii['base']};
              "
            >
              <div class="flex items-center justify-between mb-4">
                <div>
                  <div class="font-bold text-sm">Monthly Subscription</div>
                  <div class="text-xs" style="color: {currentColors['muted-foreground']}">Active until Dec 2026</div>
                </div>
                <div class="text-right">
                  <div class="text-lg font-black" style="color: {currentColors['primary']}">$49.00</div>
                  <div class="text-[10px]" style="color: {currentColors['muted-foreground']}">per seat / mo</div>
                </div>
              </div>

              <!-- Button actions -->
              <div class="flex items-center gap-3">
                <button
                  class="flex-1 py-2 text-xs font-bold transition-all shadow-sm hover:opacity-90"
                  style="
                    background-color: {currentColors['primary']};
                    color: {currentColors['primary-foreground']};
                    border-radius: {currentRadii['sm']};
                  "
                >
                  Confirm & Upgrade
                </button>
                <button
                  class="px-4 py-2 text-xs font-semibold border transition-all hover:opacity-80"
                  style="
                    background-color: {currentColors['muted']};
                    color: {currentColors['foreground']};
                    border-color: {currentColors['border']};
                    border-radius: {currentRadii['sm']};
                  "
                >
                  Manage
                </button>
              </div>
            </div>

            <!-- Stats & Feedback Badges -->
            <div class="grid grid-cols-2 gap-4 mb-4">
              <div
                class="p-4 border"
                style="
                  background-color: {currentColors['muted']};
                  border-color: {currentColors['border']};
                  border-radius: {currentRadii['sm']};
                "
              >
                <div class="text-[10px] font-bold uppercase tracking-wider" style="color: {currentColors['muted-foreground']}">
                  Anti-Slop Score
                </div>
                <div class="text-xl font-extrabold mt-1 flex items-center gap-1.5" style="color: {currentColors['accent']}">
                  <ShieldCheck class="size-5" />
                  100% Clean
                </div>
              </div>
              <div
                class="p-4 border"
                style="
                  background-color: {currentColors['muted']};
                  border-color: {currentColors['border']};
                  border-radius: {currentRadii['sm']};
                "
              >
                <div class="text-[10px] font-bold uppercase tracking-wider" style="color: {currentColors['muted-foreground']}">
                  Platform Parity
                </div>
                <div class="text-xl font-extrabold mt-1 text-[#1B1C1C]">
                  Web + Mobile
                </div>
              </div>
            </div>
          </div>
        {:else if activeTab === 'css'}
          <div class="bg-[#18181B] rounded-2xl p-5 border border-neutral-800 text-neutral-200">
            <div class="flex items-center justify-between text-xs text-neutral-400 border-b border-neutral-800 pb-3 mb-3">
              <span class="font-mono">src/app.css</span>
              <button onclick={copyActiveCode} class="hover:text-white flex items-center gap-1">
                <Copy class="size-3" />
                Copy
              </button>
            </div>
            <pre class="font-mono text-xs overflow-x-auto text-emerald-400 leading-relaxed max-h-[500px]"><code>{generatedCss}</code></pre>
          </div>
        {:else if activeTab === 'dart'}
          <div class="bg-[#18181B] rounded-2xl p-5 border border-neutral-800 text-neutral-200">
            <div class="flex items-center justify-between text-xs text-neutral-400 border-b border-neutral-800 pb-3 mb-3">
              <span class="font-mono">lib/core/theme/app_colors.dart</span>
              <button onclick={copyActiveCode} class="hover:text-white flex items-center gap-1">
                <Copy class="size-3" />
                Copy
              </button>
            </div>
            <pre class="font-mono text-xs overflow-x-auto text-sky-400 leading-relaxed max-h-[500px]"><code>{generatedDart}</code></pre>
          </div>
        {:else if activeTab === 'figma'}
          <div class="bg-[#18181B] rounded-2xl p-5 border border-neutral-800 text-neutral-200">
            <div class="flex items-center justify-between text-xs text-neutral-400 border-b border-neutral-800 pb-3 mb-3">
              <span class="font-mono">tokens.json (Figma Tokens Studio / W3C DTCG)</span>
              <button onclick={copyActiveCode} class="hover:text-white flex items-center gap-1">
                <Copy class="size-3" />
                Copy
              </button>
            </div>
            <pre class="font-mono text-xs overflow-x-auto text-amber-300 leading-relaxed max-h-[500px]"><code>{generatedFigmaJson}</code></pre>
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>
