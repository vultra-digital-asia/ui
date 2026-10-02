<script lang="ts">
  import {
    Users,
    UserPlus,
    Mail,
    Shield,
    MoreHorizontal,
    Trash2,
    Check,
    Copy,
    AlertTriangle,
  } from 'lucide-svelte';

  interface TeamMember {
    id: string;
    name: string;
    email: string;
    role: 'Owner' | 'Admin' | 'Developer' | 'Member';
    avatar: string;
    joinedAt: string;
  }

  let {
    members = $bindable([
      {
        id: 'mem_1',
        name: 'Ant Joshua',
        email: 'antoniusjoshua47@gmail.com',
        role: 'Owner',
        avatar: 'AJ',
        joinedAt: 'Jan 2026',
      },
      {
        id: 'mem_2',
        name: 'Sarah Connor',
        email: 'sarah.c@vultra.id',
        role: 'Admin',
        avatar: 'SC',
        joinedAt: 'Mar 2026',
      },
      {
        id: 'mem_3',
        name: 'Davin W',
        email: 'davin@vultra.id',
        role: 'Developer',
        avatar: 'DW',
        joinedAt: 'Aug 2026',
      },
    ] as TeamMember[]),
    onInvite = (email: string, role: string) => {},
    onRemove = (memberId: string) => {},
  } = $props();

  let inviteEmail = $state('');
  let inviteRole = $state('Developer');
  let copiedLink = $state(false);

  function copyInviteLink() {
    navigator.clipboard?.writeText('https://ui.vultra.id/join/team-vultra-asia');
    copiedLink = true;
    setTimeout(() => (copiedLink = false), 2000);
  }
</script>

<div class="flex h-full w-full flex-col bg-[#FBF9F9] text-[#1B1C1C]">
  <!-- Header Bar -->
  <header class="flex flex-wrap items-center justify-between gap-4 border-b border-[#E8E4DF] bg-white px-6 py-4">
    <div>
      <h1 class="text-xl font-bold tracking-tight text-[#1B1C1C]">Team & Permissions</h1>
      <p class="mt-0.5 text-xs text-[#6B6761]">Manage workspace members, role hierarchy, and access keys</p>
    </div>

    <div class="flex items-center gap-3">
      <button
        onclick={copyInviteLink}
        class="inline-flex h-9 items-center gap-1.5 rounded-xl border border-[#E8E4DF] bg-white px-3.5 text-xs font-semibold text-[#1B1C1C] hover:bg-stone-50"
      >
        {#if copiedLink}
          <Check class="h-3.5 w-3.5 text-emerald-600" />
          <span class="text-emerald-700">Link Copied</span>
        {:else}
          <Copy class="h-3.5 w-3.5 text-stone-500" />
          Copy Invite Link
        {/if}
      </button>
    </div>
  </header>

  <div class="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 p-6">
    <!-- Invite Box -->
    <div class="flex flex-col gap-4 rounded-2xl border border-[#E8E4DF] bg-white p-6 shadow-xs">
      <div>
        <h2 class="text-sm font-bold text-[#1B1C1C]">Invite new collaborator</h2>
        <p class="text-xs text-[#6B6761]">Send invitation email with pre-configured workspace permissions</p>
      </div>

      <div class="flex flex-wrap items-center gap-3">
        <div class="relative min-w-[260px] flex-1">
          <Mail class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
          <input
            type="email"
            placeholder="colleague@company.com"
            bind:value={inviteEmail}
            class="h-10 w-full rounded-xl border border-[#E8E4DF] bg-[#FBF9F9] pl-9 pr-3 text-xs text-[#1B1C1C] placeholder:text-stone-400 focus:border-[#A13F20] focus:outline-none"
          />
        </div>

        <select
          bind:value={inviteRole}
          class="h-10 rounded-xl border border-[#E8E4DF] bg-[#FBF9F9] px-3 text-xs font-semibold text-[#1B1C1C] focus:border-[#A13F20] focus:outline-none"
        >
          <option value="Admin">Admin</option>
          <option value="Developer">Developer</option>
          <option value="Member">Member</option>
        </select>

        <button
          onclick={() => {
            if (inviteEmail) {
              onInvite(inviteEmail, inviteRole);
              inviteEmail = '';
            }
          }}
          class="inline-flex h-10 items-center gap-1.5 rounded-xl bg-[#A13F20] px-4 text-xs font-semibold text-white shadow-xs hover:bg-[#8B3519]"
        >
          <UserPlus class="h-3.5 w-3.5" />
          Send Invite
        </button>
      </div>
    </div>

    <!-- Active Members Table -->
    <div class="flex flex-col overflow-hidden rounded-2xl border border-[#E8E4DF] bg-white shadow-xs">
      <div class="border-b border-[#E8E4DF] px-6 py-4">
        <div class="flex items-center justify-between">
          <h2 class="text-sm font-bold text-[#1B1C1C]">Active Workspace Members ({members.length})</h2>
          <span class="text-xs text-[#6B6761]">3 seats used of 10</span>
        </div>
      </div>

      <div class="divide-y divide-[#E8E4DF]">
        {#each members as m (m.id)}
          <div class="flex items-center justify-between px-6 py-4 hover:bg-[#FBF9F9]">
            <div class="flex items-center gap-3.5">
              <div class="flex h-9 w-9 items-center justify-center rounded-full bg-stone-100 text-xs font-bold text-[#1B1C1C]">
                {m.avatar}
              </div>
              <div class="flex flex-col">
                <span class="text-xs font-bold text-[#1B1C1C]">{m.name}</span>
                <span class="font-mono text-[11px] text-[#6B6761]">{m.email}</span>
              </div>
            </div>

            <div class="flex items-center gap-4">
              <span class="hidden font-mono text-xs text-stone-400 sm:inline-block">Joined {m.joinedAt}</span>

              {#if m.role === 'Owner'}
                <span class="rounded-full bg-stone-100 px-3 py-1 text-xs font-bold text-stone-700">Owner</span>
              {:else}
                <select
                  bind:value={m.role}
                  class="rounded-lg border border-[#E8E4DF] bg-white px-2.5 py-1 text-xs font-semibold text-[#1B1C1C]"
                >
                  <option value="Admin">Admin</option>
                  <option value="Developer">Developer</option>
                  <option value="Member">Member</option>
                </select>

                <button
                  onclick={() => onRemove(m.id)}
                  class="rounded-lg p-1.5 text-stone-400 hover:bg-rose-50 hover:text-rose-600"
                >
                  <Trash2 class="h-4 w-4" />
                </button>
              {/if}
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>
