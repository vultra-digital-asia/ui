<script lang="ts">
  import type { Snippet } from "svelte";
  import {
    Menu,
    X,
    LayoutDashboard,
    Receipt,
    Users,
    Settings,
    CreditCard,
    LogOut,
    Bell,
  } from "lucide-svelte";
  import { cn } from "$lib/utils.js";

  export interface NavItem {
    label: string;
    href: string;
    icon: any;
    badge?: string;
  }

  interface Props {
    appName?: string;
    appLogoText?: string;
    userName?: string;
    userRole?: string;
    activeHref?: string;
    navItems?: NavItem[];
    children?: Snippet;
    class?: string;
    onLogout?: () => void;
  }

  let {
    appName = "Vultra Platform",
    appLogoText = "VP",
    userName = "Antonius Joshua",
    userRole = "Administrator",
    activeHref = $bindable("/dashboard"),
    navItems = [
      { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { label: "Transaksi", href: "/transactions", icon: Receipt, badge: "12" },
      { label: "Pelanggan", href: "/customers", icon: Users },
      { label: "Penagihan", href: "/billing", icon: CreditCard },
      { label: "Pengaturan", href: "/settings", icon: Settings },
    ],
    children,
    class: className,
    onLogout,
  }: Props = $props();

  let isMobileOpen = $state(false);

  // Lock body scroll when mobile drawer is open
  $effect(() => {
    if (typeof document !== "undefined") {
      document.body.style.overflow = isMobileOpen ? "hidden" : "";
      return () => {
        document.body.style.overflow = "";
      };
    }
  });

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === "Escape" && isMobileOpen) {
      isMobileOpen = false;
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<div class={cn("min-h-screen bg-background text-foreground antialiased", className)}>
  <!-- Mobile Scrim Backdrop -->
  {#if isMobileOpen}
    <div
      class="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs transition-opacity lg:hidden"
      role="presentation"
      onclick={() => (isMobileOpen = false)}
    ></div>
  {/if}

  <!-- Sidebar Container (Desktop static + Mobile Drawer) -->
  <aside
    class={cn(
      "fixed bottom-0 top-0 left-0 z-50 flex w-64 flex-col border-r border-border bg-card transition-transform duration-200 lg:translate-x-0",
      isMobileOpen ? "translate-x-0" : "-translate-x-full"
    )}
  >
    <!-- Brand Header -->
    <div class="flex h-16 shrink-0 items-center justify-between border-b border-border px-5">
      <div class="flex items-center gap-3">
        <div class="flex size-9 items-center justify-center rounded-xl bg-primary font-bold text-sm text-primary-foreground shadow-xs">
          {appLogoText}
        </div>
        <span class="font-bold tracking-tight text-foreground text-sm">
          {appName}
        </span>
      </div>
      <button
        type="button"
        onclick={() => (isMobileOpen = false)}
        class="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground lg:hidden"
        aria-label="Tutup menu"
      >
        <X class="size-5" />
      </button>
    </div>

    <!-- Navigation List -->
    <nav class="flex-1 space-y-1 overflow-y-auto p-3">
      {#each navItems as item}
        {@const isActive = activeHref === item.href}
        {@const IconComp = item.icon}
        <a
          href={item.href}
          onclick={(e) => {
            e.preventDefault();
            activeHref = item.href;
            isMobileOpen = false;
          }}
          class={cn(
            "flex items-center justify-between rounded-xl px-3 py-2.5 text-xs sm:text-sm font-medium transition-colors",
            isActive
              ? "bg-primary text-primary-foreground shadow-xs font-semibold"
              : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
          )}
        >
          <div class="flex items-center gap-3">
            <IconComp class={cn("size-4", isActive ? "text-primary-foreground" : "text-muted-foreground")} />
            <span>{item.label}</span>
          </div>
          {#if item.badge}
            <span
              class={cn(
                "rounded-full px-2 py-0.5 text-[10px] font-bold font-mono tabular-nums",
                isActive ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"
              )}
            >
              {item.badge}
            </span>
          {/if}
        </a>
      {/each}
    </nav>

    <!-- User Profile & Session Footer -->
    <div class="border-t border-border p-3.5">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2.5 overflow-hidden">
          <div class="flex size-8 shrink-0 items-center justify-center rounded-lg bg-secondary/15 font-semibold text-xs text-secondary">
            {userName.charAt(0)}
          </div>
          <div class="truncate">
            <div class="truncate text-xs font-semibold text-foreground">{userName}</div>
            <div class="truncate text-[10px] text-muted-foreground">{userRole}</div>
          </div>
        </div>
        <button
          type="button"
          onclick={onLogout}
          class="rounded-lg p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
          title="Keluar"
        >
          <LogOut class="size-4" />
        </button>
      </div>
    </div>
  </aside>

  <!-- Main Viewport Area -->
  <div class="flex flex-1 flex-col lg:pl-64">
    <!-- Topbar Header -->
    <header class="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-card/80 px-4 backdrop-blur-md sm:px-6">
      <div class="flex items-center gap-3">
        <button
          type="button"
          onclick={() => (isMobileOpen = true)}
          class="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground lg:hidden"
          aria-label="Buka menu"
        >
          <Menu class="size-5" />
        </button>
        <span class="text-xs font-medium text-muted-foreground">
          {navItems.find((n) => n.href === activeHref)?.label || "Dashboard"}
        </span>
      </div>

      <div class="flex items-center gap-2">
        <button
          type="button"
          class="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
          aria-label="Notifikasi"
        >
          <Bell class="size-4" />
        </button>
      </div>
    </header>

    <!-- Main Content Slot -->
    <main class="flex-1 p-4 sm:p-6 lg:p-8">
      {@render children?.()}
    </main>
  </div>
</div>
