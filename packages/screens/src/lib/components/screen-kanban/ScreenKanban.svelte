<script lang="ts">
  import {
    Plus,
    MoreHorizontal,
    Search,
    Filter,
    Calendar,
    MessageSquare,
    AlertCircle,
    CheckCircle2,
    Clock,
    Circle,
    ChevronDown,
  } from 'lucide-svelte';

  interface Task {
    id: string;
    title: string;
    description?: string;
    tag: string;
    priority: 'urgent' | 'high' | 'medium' | 'low';
    assignee: { name: string; avatar: string };
    commentsCount: number;
    dueDate?: string;
  }

  interface Column {
    id: string;
    title: string;
    tasks: Task[];
  }

  let {
    columns = $bindable([
      {
        id: 'backlog',
        title: 'Backlog',
        tasks: [
          {
            id: 'TASK-101',
            title: 'Design token export format for Google Stitch',
            tag: 'Design System',
            priority: 'high',
            assignee: { name: 'Alex M', avatar: 'AM' },
            commentsCount: 3,
            dueDate: 'Oct 12',
          },
          {
            id: 'TASK-102',
            title: 'Audit accessibility of continuous squircle cards',
            tag: 'A11y',
            priority: 'low',
            assignee: { name: 'Sarah K', avatar: 'SK' },
            commentsCount: 0,
          },
        ],
      },
      {
        id: 'in_progress',
        title: 'In Progress',
        tasks: [
          {
            id: 'TASK-103',
            title: 'Refactor BLoC Freezed generators for Flutter mobile',
            tag: 'Mobile Architecture',
            priority: 'urgent',
            assignee: { name: 'Ant J', avatar: 'AJ' },
            commentsCount: 7,
            dueDate: 'Tomorrow',
          },
          {
            id: 'TASK-104',
            title: 'Migrate Tailwind v4 @theme CSS variable bindings',
            tag: 'Frontend',
            priority: 'medium',
            assignee: { name: 'Davin W', avatar: 'DW' },
            commentsCount: 2,
            dueDate: 'Oct 8',
          },
        ],
      },
      {
        id: 'review',
        title: 'In Review',
        tasks: [
          {
            id: 'TASK-105',
            title: 'PR #142: Zero-emoji icon policy enforcement in CI',
            tag: 'DevOps',
            priority: 'high',
            assignee: { name: 'Alex M', avatar: 'AM' },
            commentsCount: 5,
            dueDate: 'Today',
          },
        ],
      },
      {
        id: 'done',
        title: 'Done',
        tasks: [
          {
            id: 'TASK-106',
            title: 'Postgres MCP Server for UI Vault retrieval',
            tag: 'Backend',
            priority: 'medium',
            assignee: { name: 'Ant J', avatar: 'AJ' },
            commentsCount: 11,
          },
        ],
      },
    ] as Column[]),
    onTaskClick = (task: Task) => {},
    onAddTask = (columnId: string) => {},
  } = $props();

  let searchQuery = $state('');
  let selectedTag = $state('all');

  function getPriorityColor(priority: Task['priority']) {
    switch (priority) {
      case 'urgent':
        return 'text-rose-600 bg-rose-50 border-rose-200';
      case 'high':
        return 'text-amber-700 bg-amber-50 border-amber-200';
      case 'medium':
        return 'text-sky-700 bg-sky-50 border-sky-200';
      case 'low':
        return 'text-stone-600 bg-stone-100 border-stone-200';
    }
  }
</script>

<div class="flex h-full w-full flex-col bg-[#FBF9F9] text-[#1B1C1C]">
  <!-- Header Bar -->
  <header class="flex flex-wrap items-center justify-between gap-4 border-b border-[#E8E4DF] bg-white px-6 py-4">
    <div>
      <div class="flex items-center gap-2">
        <h1 class="text-xl font-bold tracking-tight text-[#1B1C1C]">Sprint Board</h1>
        <span class="rounded-full bg-stone-100 px-2.5 py-0.5 text-xs font-semibold text-stone-600">Sprint 14</span>
      </div>
      <p class="mt-0.5 text-xs text-[#6B6761]">Linear-style high-craft task tracking with priority badges</p>
    </div>

    <div class="flex items-center gap-3">
      <!-- Search -->
      <div class="relative">
        <Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
        <input
          type="text"
          placeholder="Filter tasks..."
          bind:value={searchQuery}
          class="h-9 w-52 rounded-xl border border-[#E8E4DF] bg-[#FBF9F9] pl-9 pr-3 text-xs text-[#1B1C1C] placeholder:text-stone-400 focus:border-[#A13F20] focus:outline-none"
        />
      </div>

      <!-- Action -->
      <button
        onclick={() => onAddTask('backlog')}
        class="inline-flex h-9 items-center gap-1.5 rounded-xl bg-[#A13F20] px-3.5 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-[#8B3519]"
      >
        <Plus class="h-3.5 w-3.5" />
        New Task
      </button>
    </div>
  </header>

  <!-- Columns Canvas -->
  <div class="flex flex-1 gap-6 overflow-x-auto p-6">
    {#each columns as col (col.id)}
      <div class="flex w-80 shrink-0 flex-col rounded-2xl border border-[#E8E4DF] bg-stone-50/70 p-3">
        <!-- Column Header -->
        <div class="mb-3 flex items-center justify-between px-2">
          <div class="flex items-center gap-2">
            <span class="text-xs font-bold uppercase tracking-wider text-[#6B6761]">{col.title}</span>
            <span class="flex h-5 w-5 items-center justify-center rounded-full bg-[#E8E4DF] text-[11px] font-bold text-[#1B1C1C]">
              {col.tasks.length}
            </span>
          </div>
          <button
            onclick={() => onAddTask(col.id)}
            class="rounded-lg p-1 text-stone-400 hover:bg-stone-200/60 hover:text-stone-700"
          >
            <Plus class="h-4 w-4" />
          </button>
        </div>

        <!-- Task List -->
        <div class="flex flex-1 flex-col gap-2.5 overflow-y-auto pr-0.5">
          {#each col.tasks as task (task.id)}
            <div
              role="button"
              tabindex="0"
              onclick={() => onTaskClick(task)}
              onkeydown={(e) => e.key === 'Enter' && onTaskClick(task)}
              class="group relative flex cursor-pointer flex-col gap-2.5 rounded-xl border border-[#E8E4DF] bg-white p-3.5 shadow-xs transition-all hover:border-[#A13F20]/40 hover:shadow-sm"
            >
              <!-- Card Top -->
              <div class="flex items-start justify-between gap-2">
                <span class="font-mono text-[11px] font-bold text-stone-400">{task.id}</span>
                <span class="rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider {getPriorityColor(task.priority)}">
                  {task.priority}
                </span>
              </div>

              <!-- Title -->
              <h2 class="text-xs font-medium leading-snug text-[#1B1C1C] group-hover:text-[#A13F20]">
                {task.title}
              </h2>

              <!-- Tag -->
              <div>
                <span class="rounded-md bg-stone-100 px-2 py-0.5 text-[10px] font-semibold text-stone-600">
                  {task.tag}
                </span>
              </div>

              <!-- Card Footer -->
              <div class="mt-1 flex items-center justify-between border-t border-stone-100 pt-2 text-[11px] text-stone-400">
                <div class="flex items-center gap-3">
                  {#if task.dueDate}
                    <span class="flex items-center gap-1 font-mono text-[10px] text-stone-600">
                      <Calendar class="h-3 w-3 text-stone-400" />
                      {task.dueDate}
                    </span>
                  {/if}
                  {#if task.commentsCount > 0}
                    <span class="flex items-center gap-1 text-[10px]">
                      <MessageSquare class="h-3 w-3" />
                      {task.commentsCount}
                    </span>
                  {/if}
                </div>

                <div class="flex h-6 w-6 items-center justify-center rounded-full bg-[#A13F20]/10 text-[10px] font-bold text-[#A13F20]">
                  {task.assignee.avatar}
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    {/each}
  </div>
</div>
