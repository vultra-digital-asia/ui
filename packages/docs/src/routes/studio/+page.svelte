<script lang="ts">
  import {
    ScreenKanban,
    ScreenAnalytics,
    ScreenPaywall,
    ScreenDatatable,
    ScreenTeamSettings,
  } from '@vultra/screens';
  import {
    Sparkles,
    Play,
    Copy,
    Check,
    Download,
    Terminal,
    Monitor,
    Smartphone,
    Code2,
    Layers,
    FileText,
    Wand2,
  } from 'lucide-svelte';

  let promptInput = $state('Sprint Kanban board with urgent priority badges and assignee avatars');
  let selectedPlatform = $state<'svelte5' | 'flutter'>('svelte5');
  let activeTab = $state<'simulator' | 'code'>('simulator');
  let simulatorFrame = $state<'desktop' | 'mobile'>('desktop');
  let isGenerating = $state(false);
  let activeCodeFile = $state(0);
  let copiedCode = $state(false);

  const presets = [
    {
      title: 'Linear Sprint Kanban',
      prompt: 'Linear-inspired task management board with priority tags, avatars, and Lucide icons',
      screenId: 'kanban',
      platform: 'svelte5' as const,
    },
    {
      title: 'Plausible Analytics',
      prompt: 'Privacy-first telemetry overview with 4 KPI cards and referrer breakdowns',
      screenId: 'analytics',
      platform: 'svelte5' as const,
    },
    {
      title: 'Wise Balance Feed',
      prompt: 'Financial home feed with total balance card, eye privacy toggle, and quick actions',
      screenId: 'feed',
      platform: 'flutter' as const,
    },
    {
      title: 'Stripe Team Settings',
      prompt: 'Team members management with role hierarchy selector and collaborator invitations',
      screenId: 'team',
      platform: 'svelte5' as const,
    },
  ];

  let currentScreenId = $state('kanban');

  const filesMap: Record<string, Array<{ name: string; lang: string; code: string }>> = {
    kanban: [
      {
        name: 'src/routes/kanban/+page.svelte',
        lang: 'svelte',
        code: `<` + `!-- Thin-Page View: Pure markup & bindings --` + `>\n<` + `script lang="ts">\n  import { kanbanFeature } from '$lib/features/kanban/kanban.svelte';\n  import { ScreenKanban } from '@vultra/screens';\n<` + `/script>\n\n<div class="h-screen w-full bg-[#FBF9F9]">\n  <ScreenKanban\n    bind:columns={kanbanFeature.columns}\n    onTaskClick={kanbanFeature.selectTask}\n    onAddTask={kanbanFeature.addTask}\n  />\n</div>`,
      },
      {
        name: 'src/lib/features/kanban/kanban.svelte.ts',
        lang: 'typescript',
        code: `// Domain Logic Composable with Svelte 5 Runes\nexport function createKanbanFeature() {\n  let columns = $state([...]);\n  let selectedTask = $state(null);\n\n  function addTask(colId: string) { /* business logic */ }\n  function selectTask(task: any) { selectedTask = task; }\n\n  return {\n    get columns() { return columns; },\n    set columns(v) { columns = v; },\n    addTask,\n    selectTask,\n  };\n}\nexport const kanbanFeature = createKanbanFeature();`,
      },
    ],
    feed: [
      {
        name: 'lib/features/feed/presentation/feed_page.dart',
        lang: 'dart',
        code: `import 'package:flutter/material.dart';\nimport 'package:flutter_bloc/flutter_bloc.dart';\nimport '../bloc/feed_bloc.dart';\nimport 'widgets/feed_content_widget.dart';\n\nclass FeedPage extends StatelessWidget {\n  const FeedPage({super.key});\n\n  @override\n  Widget build(BuildContext context) {\n    return BlocProvider(\n      create: (_) => FeedBloc()..add(const FeedEvent.load()),\n      child: const Scaffold(\n        backgroundColor: Color(0xFFFBF9F9),\n        body: SafeArea(child: FeedContentWidget()),\n      ),\n    );\n  }\n}`,
      },
      {
        name: 'lib/features/feed/bloc/feed_bloc.dart',
        lang: 'dart',
        code: `import 'package:flutter_bloc/flutter_bloc.dart';\nimport 'feed_event.dart';\nimport 'feed_state.dart';\n\nclass FeedBloc extends Bloc<FeedEvent, FeedState> {\n  FeedBloc() : super(const FeedState.initial()) {\n    on<_Load>((event, emit) async {\n      emit(const FeedState.loading());\n      emit(FeedState.loaded(balance: 148520000, items: []));\n    });\n  }\n}`,
      },
    ],
  };

  function applyPreset(preset: (typeof presets)[0]) {
    promptInput = preset.prompt;
    selectedPlatform = preset.platform;
    currentScreenId = preset.screenId;
    simulatorFrame = preset.platform === 'flutter' ? 'mobile' : 'desktop';
  }

  function handleGenerate() {
    isGenerating = true;
    setTimeout(() => {
      isGenerating = false;
      if (promptInput.toLowerCase().includes('feed') || promptInput.toLowerCase().includes('balance')) {
        currentScreenId = 'feed';
        selectedPlatform = 'flutter';
        simulatorFrame = 'mobile';
      } else if (promptInput.toLowerCase().includes('analytics')) {
        currentScreenId = 'analytics';
        selectedPlatform = 'svelte5';
      } else if (promptInput.toLowerCase().includes('team')) {
        currentScreenId = 'team';
        selectedPlatform = 'svelte5';
      } else {
        currentScreenId = 'kanban';
        selectedPlatform = 'svelte5';
      }
    }, 600);
  }

  function copyCode() {
    const list = filesMap[currentScreenId] || filesMap.kanban;
    navigator.clipboard?.writeText(list[activeCodeFile]?.code || '');
    copiedCode = true;
    setTimeout(() => (copiedCode = false), 2000);
  }
</script>

<svelte:head>
  <title>Vultra UI Studio — Interactive Code & Screen Generator</title>
</svelte:head>

<div class="flex h-screen w-full flex-col overflow-hidden bg-[#FBF9F9] text-[#1B1C1C]">
  <!-- Studio Navbar -->
  <header class="flex h-14 shrink-0 items-center justify-between border-b border-[#E8E4DF] bg-white px-6">
    <div class="flex items-center gap-3">
      <a href="/" class="flex items-center gap-2 font-bold text-[#1B1C1C]">
        <span class="rounded-lg bg-[#A13F20] px-2 py-1 text-xs text-white">STUDIO</span>
        Vultra AI Generator
      </a>
      <span class="rounded-full bg-stone-100 px-2.5 py-0.5 text-[11px] font-semibold text-stone-600">
        Local 9Router Connected
      </span>
    </div>

    <!-- Mode & Simulator Switcher -->
    <div class="flex items-center gap-3">
      <div class="inline-flex rounded-xl border border-[#E8E4DF] bg-[#FBF9F9] p-0.5">
        <button
          onclick={() => (activeTab = 'simulator')}
          class="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold {activeTab === 'simulator' ? 'bg-white text-[#1B1C1C] shadow-xs' : 'text-stone-500'}"
        >
          <Layers class="h-3.5 w-3.5" />
          Live Preview
        </button>
        <button
          onclick={() => (activeTab = 'code')}
          class="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold {activeTab === 'code' ? 'bg-white text-[#1B1C1C] shadow-xs' : 'text-stone-500'}"
        >
          <Code2 class="h-3.5 w-3.5" />
          Source Code
        </button>
      </div>

      {#if activeTab === 'simulator'}
        <div class="inline-flex rounded-xl border border-[#E8E4DF] bg-[#FBF9F9] p-0.5">
          <button
            onclick={() => (simulatorFrame = 'desktop')}
            class="rounded-lg p-1.5 {simulatorFrame === 'desktop' ? 'bg-white text-[#1B1C1C] shadow-xs' : 'text-stone-400'}"
          >
            <Monitor class="h-3.5 w-3.5" />
          </button>
          <button
            onclick={() => (simulatorFrame = 'mobile')}
            class="rounded-lg p-1.5 {simulatorFrame === 'mobile' ? 'bg-white text-[#1B1C1C] shadow-xs' : 'text-stone-400'}"
          >
            <Smartphone class="h-3.5 w-3.5" />
          </button>
        </div>
      {/if}
    </div>
  </header>

  <!-- Studio Workspace Grid: Prompt Input Panel + Viewport Stage -->
  <div class="flex flex-1 overflow-hidden">
    <!-- Left Panel: Prompt & Controls -->
    <div class="flex w-96 shrink-0 flex-col justify-between border-r border-[#E8E4DF] bg-white p-5">
      <div class="flex flex-col gap-4">
        <div>
          <label for="studio-prompt-input" class="text-xs font-bold uppercase tracking-wider text-[#6B6761]">Describe Screen or Flow</label>
          <p class="mt-0.5 text-[11px] text-stone-400">Natural language prompt processed with anti-slop rules</p>
        </div>

        <textarea
          id="studio-prompt-input"
          bind:value={promptInput}
          rows="4"
          class="w-full resize-none rounded-xl border border-[#E8E4DF] bg-[#FBF9F9] p-3 text-xs text-[#1B1C1C] placeholder:text-stone-400 focus:border-[#A13F20] focus:outline-none"
          placeholder="e.g. Audit log security table with severity pills and JSON diff modal..."
        ></textarea>

        <!-- Platform Toggle -->
        <div>
          <span class="text-xs font-bold uppercase tracking-wider text-[#6B6761]">Target Platform</span>
          <div class="mt-1.5 flex gap-2">
            <button
              onclick={() => (selectedPlatform = 'svelte5')}
              class="flex-1 rounded-xl border p-2.5 text-center text-xs font-semibold transition-all {selectedPlatform === 'svelte5' ? 'border-[#A13F20] bg-[#A13F20]/5 text-[#A13F20]' : 'border-[#E8E4DF] text-stone-600'}"
            >
              Svelte 5 (Runes)
            </button>
            <button
              onclick={() => {
                selectedPlatform = 'flutter';
                simulatorFrame = 'mobile';
              }}
              class="flex-1 rounded-xl border p-2.5 text-center text-xs font-semibold transition-all {selectedPlatform === 'flutter' ? 'border-[#A13F20] bg-[#A13F20]/5 text-[#A13F20]' : 'border-[#E8E4DF] text-stone-600'}"
            >
              Flutter (BLoC)
            </button>
          </div>
        </div>

        <!-- Presets -->
        <div>
          <span class="text-xs font-bold uppercase tracking-wider text-[#6B6761]">Benchmark Presets</span>
          <div class="mt-2 flex flex-col gap-1.5">
            {#each presets as pr}
              <button
                onclick={() => applyPreset(pr)}
                class="flex items-center justify-between rounded-lg border border-[#E8E4DF] px-3 py-2 text-left text-xs font-medium text-stone-700 hover:bg-[#FBF9F9]"
              >
                <span>{pr.title}</span>
                <span class="text-[10px] text-stone-400">{pr.platform}</span>
              </button>
            {/each}
          </div>
        </div>
      </div>

      <!-- Action Button -->
      <div class="border-t border-[#E8E4DF] pt-4">
        <button
          onclick={handleGenerate}
          disabled={isGenerating}
          class="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#A13F20] font-semibold text-white shadow-xs transition-colors hover:bg-[#8B3519] disabled:opacity-50"
        >
          <Wand2 class="h-4 w-4" />
          {isGenerating ? 'Synthesizing...' : 'Generate Screen Code'}
        </button>
      </div>
    </div>

    <!-- Right Panel: Viewport / Code Inspector -->
    <div class="flex flex-1 flex-col overflow-auto bg-stone-100/70 p-6">
      {#if activeTab === 'simulator'}
        <!-- Simulator Stage -->
        <div class="flex flex-1 items-center justify-center">
          {#if simulatorFrame === 'desktop'}
            <div class="flex h-[750px] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-[#E8E4DF] bg-white shadow-xl">
              <div class="flex items-center gap-2 border-b border-[#E8E4DF] bg-[#FBF9F9] px-4 py-2.5">
                <div class="flex gap-1.5">
                  <div class="h-3 w-3 rounded-full bg-rose-400"></div>
                  <div class="h-3 w-3 rounded-full bg-amber-400"></div>
                  <div class="h-3 w-3 rounded-full bg-emerald-400"></div>
                </div>
                <span class="ml-4 font-mono text-[11px] text-[#6B6761]">vultra://studio/preview</span>
              </div>
              <div class="flex-1 overflow-auto">
                {#if currentScreenId === 'kanban'}
                  <ScreenKanban />
                {:else if currentScreenId === 'analytics'}
                  <ScreenAnalytics />
                {:else if currentScreenId === 'team'}
                  <ScreenTeamSettings />
                {:else}
                  <ScreenPaywall />
                {/if}
              </div>
            </div>
          {:else}
            <!-- iPhone 16 Frame -->
            <div class="relative flex h-[780px] w-[375px] flex-col overflow-hidden rounded-[48px] border-[9px] border-stone-900 bg-[#FBF9F9] shadow-2xl">
              <div class="absolute left-1/2 top-2.5 z-50 h-6 w-24 -translate-x-1/2 rounded-full bg-black"></div>
              <div class="flex h-10 w-full items-center justify-between px-7 pt-2 text-[10px] font-bold">
                <span>9:41</span>
                <span>5G</span>
              </div>
              <div class="flex-1 overflow-y-auto p-3">
                <div class="rounded-2xl border border-[#E8E4DF] bg-white p-4 shadow-xs">
                  <div class="text-[11px] text-[#6B6761]">Total Saldo Aktif</div>
                  <div class="mt-1 font-mono text-xl font-bold">Rp 148.520.000</div>
                  <div class="mt-3 flex justify-around border-t border-stone-100 pt-2 text-[10px] font-semibold">
                    <span>Kirim</span>
                    <span>Terima</span>
                    <span>Bayar</span>
                  </div>
                </div>
              </div>
              <div class="flex h-5 w-full items-center justify-center pb-1">
                <div class="h-1 w-28 rounded-full bg-stone-900"></div>
              </div>
            </div>
          {/if}
        </div>
      {:else}
        <!-- Source Code Inspector -->
        {@const fileList = filesMap[currentScreenId] || filesMap.kanban}
        <div class="flex h-[750px] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-[#E8E4DF] bg-stone-900 text-stone-100 shadow-xl">
          <div class="flex items-center justify-between border-b border-stone-800 bg-stone-950 px-4 py-2">
            <div class="flex items-center gap-2">
              {#each fileList as file, idx}
                <button
                  onclick={() => (activeCodeFile = idx)}
                  class="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-mono {activeCodeFile === idx ? 'bg-stone-800 text-white' : 'text-stone-400 hover:text-white'}"
                >
                  <FileText class="h-3 w-3" />
                  {file.name}
                </button>
              {/each}
            </div>

            <button
              onclick={copyCode}
              class="inline-flex items-center gap-1.5 rounded-lg bg-stone-800 px-3 py-1 text-xs font-semibold text-stone-200 hover:bg-stone-700"
            >
              {#if copiedCode}
                <Check class="h-3.5 w-3.5 text-emerald-400" />
                Copied
              {:else}
                <Copy class="h-3.5 w-3.5" />
                Copy Code
              {/if}
            </button>
          </div>

          <pre class="flex-1 overflow-auto p-5 font-mono text-xs leading-relaxed text-stone-200">
            <code>{fileList[activeCodeFile]?.code}</code>
          </pre>
        </div>
      {/if}
    </div>
  </div>
</div>
