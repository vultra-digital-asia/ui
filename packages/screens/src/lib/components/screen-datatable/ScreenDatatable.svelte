<script lang="ts">
  import {
    Search,
    Filter,
    Download,
    ChevronLeft,
    ChevronRight,
    SlidersHorizontal,
    X,
    Check,
  } from "lucide-svelte";
  import { cn } from "$lib/utils.js";

  export interface TableColumn {
    key: string;
    label: string;
    align?: "left" | "center" | "right";
    isMono?: boolean;
    sortable?: boolean;
  }

  interface Props {
    title?: string;
    description?: string;
    items?: Record<string, any>[];
    columns?: TableColumn[];
    statusOptions?: string[];
    searchPlaceholder?: string;
    class?: string;
    onExport?: () => void;
    onRowClick?: (row: any) => void;
  }

  let {
    title = "Semua Transaksi",
    description = "Kelola dan audit rekonsiliasi pembayaran tagihan secara real-time.",
    items = [
      {
        id: "INV-2026-001",
        customer: "PT Nusantara Digital",
        amount: "Rp 12.500.000",
        channel: "QRIS",
        status: "Lunas",
        date: "2026-10-01",
      },
      {
        id: "INV-2026-002",
        customer: "CV Sinar Mandiri",
        amount: "Rp 4.750.000",
        channel: "BCA VA",
        status: "Pending",
        date: "2026-10-01",
      },
      {
        id: "INV-2026-003",
        customer: "Akademi Prestasi",
        amount: "Rp 8.900.000",
        channel: "Mandiri VA",
        status: "Lunas",
        date: "2026-09-30",
      },
      {
        id: "INV-2026-004",
        customer: "Klinik Pratama Sehat",
        amount: "Rp 2.100.000",
        channel: "QRIS",
        status: "Gagal",
        date: "2026-09-29",
      },
    ],
    columns = [
      { key: "id", label: "No. Faktur", align: "left", isMono: true },
      { key: "customer", label: "Pelanggan", align: "left" },
      { key: "amount", label: "Nominal", align: "right", isMono: true },
      { key: "channel", label: "Metode", align: "center" },
      { key: "status", label: "Status", align: "center" },
      { key: "date", label: "Tanggal", align: "right", isMono: true },
    ],
    statusOptions = ["Semua", "Lunas", "Pending", "Gagal"],
    searchPlaceholder = "Cari nomor faktur atau pelanggan...",
    class: className,
    onExport,
    onRowClick,
  }: Props = $props();

  let searchQuery = $state("");
  let selectedStatus = $state("Semua");
  let selectedRowIds = $state<string[]>([]);
  let density = $state<"compact" | "normal" | "relaxed">("normal");

  let filtered = $derived(
    items.filter((item) => {
      const matchSearch =
        searchQuery === "" ||
        item.id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.customer?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchStatus =
        selectedStatus === "Semua" || item.status === selectedStatus;
      return matchSearch && matchStatus;
    })
  );

  let isAllSelected = $derived(
    filtered.length > 0 && selectedRowIds.length === filtered.length
  );

  function toggleSelectAll() {
    if (isAllSelected) {
      selectedRowIds = [];
    } else {
      selectedRowIds = filtered.map((item) => item.id);
    }
  }

  function toggleRow(id: string) {
    if (selectedRowIds.includes(id)) {
      selectedRowIds = selectedRowIds.filter((rowId) => rowId !== id);
    } else {
      selectedRowIds = [...selectedRowIds, id];
    }
  }

  function getStatusStyle(status: string) {
    switch (status) {
      case "Lunas":
        return "bg-secondary/15 text-secondary border-secondary/20";
      case "Pending":
        return "bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/20";
      case "Gagal":
        return "bg-destructive/15 text-destructive border-destructive/20";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  }

  const paddingMap = {
    compact: "py-2 px-3",
    normal: "py-3.5 px-4",
    relaxed: "py-5 px-4",
  };
</script>

<div class={cn("w-full space-y-4", className)}>
  <!-- Title & Metadata Bar -->
  <div class="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
    <div>
      <h3 class="text-lg font-bold tracking-tight text-foreground sm:text-xl">
        {title}
      </h3>
      {#if description}
        <p class="text-xs sm:text-sm text-muted-foreground">{description}</p>
      {/if}
    </div>

    <div class="flex items-center gap-2">
      <!-- Density Toggle Button -->
      <div class="inline-flex rounded-lg border border-border bg-card p-0.5 text-xs">
        <button
          type="button"
          class={cn("px-2 py-1 rounded-md transition-colors", density === "compact" && "bg-muted font-medium text-foreground")}
          onclick={() => (density = "compact")}
          title="Kompak"
        >
          Kompak
        </button>
        <button
          type="button"
          class={cn("px-2 py-1 rounded-md transition-colors", density === "normal" && "bg-muted font-medium text-foreground")}
          onclick={() => (density = "normal")}
          title="Normal"
        >
          Normal
        </button>
      </div>

      <!-- Export Action -->
      <button
        type="button"
        onclick={onExport}
        class="inline-flex h-9 items-center gap-1.5 rounded-xl border border-border bg-card px-3 text-xs font-medium text-foreground shadow-xs transition-colors hover:bg-muted"
      >
        <Download class="size-3.5 text-muted-foreground" />
        <span>Ekspor</span>
      </button>
    </div>
  </div>

  <!-- Search & Faceted Filter Bar -->
  <div class="flex flex-col gap-3 rounded-2xl border border-border bg-card p-3 shadow-xs sm:flex-row sm:items-center sm:justify-between">
    <div class="relative w-full max-w-sm">
      <Search class="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <input
        type="search"
        placeholder={searchPlaceholder}
        bind:value={searchQuery}
        class="h-9 w-full rounded-xl border border-border bg-background pl-9 pr-8 text-xs text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary"
      />
      {#if searchQuery}
        <button
          type="button"
          onclick={() => (searchQuery = "")}
          class="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        >
          <X class="size-3.5" />
        </button>
      {/if}
    </div>

    <!-- Status Facet Pills -->
    <div class="flex flex-wrap items-center gap-1.5">
      {#each statusOptions as opt}
        <button
          type="button"
          onclick={() => (selectedStatus = opt)}
          class={cn(
            "rounded-lg px-2.5 py-1 text-xs font-medium transition-colors",
            selectedStatus === opt
              ? "bg-primary text-primary-foreground shadow-xs"
              : "border border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
        >
          {opt}
        </button>
      {/each}
    </div>
  </div>

  <!-- Bulk Selection Indicator (Sticky Toolbar) -->
  {#if selectedRowIds.length > 0}
    <div class="flex items-center justify-between rounded-xl border border-primary/20 bg-primary/5 px-4 py-2.5 text-xs text-primary font-medium transition-all">
      <span>{selectedRowIds.length} baris terpilih</span>
      <button
        type="button"
        onclick={() => (selectedRowIds = [])}
        class="text-xs hover:underline text-muted-foreground hover:text-foreground"
      >
        Batalkan pilihan
      </button>
    </div>
  {/if}

  <!-- Main Table Container -->
  <div class="overflow-hidden rounded-2xl border border-border bg-card shadow-xs">
    <div class="overflow-x-auto">
      <table class="w-full border-collapse text-left text-xs sm:text-sm">
        <thead class="border-b border-border bg-muted/40 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          <tr>
            <th class="w-10 p-3 text-center">
              <input
                type="checkbox"
                checked={isAllSelected}
                onchange={toggleSelectAll}
                class="size-4 rounded border-border accent-primary cursor-pointer"
              />
            </th>
            {#each columns as col}
              <th
                class={cn(
                  "p-3 font-semibold",
                  col.align === "right" && "text-right",
                  col.align === "center" && "text-center",
                  col.align === "left" && "text-left"
                )}
              >
                {col.label}
              </th>
            {/each}
          </tr>
        </thead>
        <tbody class="divide-y divide-border">
          {#if filtered.length === 0}
            <tr>
              <td colspan={columns.length + 1} class="py-12 text-center text-muted-foreground">
                Tidak ada data transaksi yang sesuai filter.
              </td>
            </tr>
          {:else}
            {#each filtered as row (row.id)}
              {@const isChecked = selectedRowIds.includes(row.id)}
              <tr
                onclick={() => onRowClick?.(row)}
                class={cn(
                  "transition-colors hover:bg-muted/40 cursor-pointer",
                  isChecked && "bg-primary/5 hover:bg-primary/10"
                )}
              >
                <td class="p-3 text-center" onclick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onchange={() => toggleRow(row.id)}
                    class="size-4 rounded border-border accent-primary cursor-pointer"
                  />
                </td>
                {#each columns as col}
                  <td
                    class={cn(
                      paddingMap[density],
                      col.align === "right" && "text-right",
                      col.align === "center" && "text-center",
                      col.align === "left" && "text-left",
                      col.isMono && "font-mono tabular-nums text-xs"
                    )}
                  >
                    {#if col.key === "status"}
                      <span
                        class={cn(
                          "inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold",
                          getStatusStyle(row.status)
                        )}
                      >
                        {row.status}
                      </span>
                    {:else}
                      <span class="text-foreground">{row[col.key]}</span>
                    {/if}
                  </td>
                {/each}
              </tr>
            {/each}
          {/if}
        </tbody>
      </table>
    </div>

    <!-- Table Footer Pagination -->
    <div class="flex items-center justify-between border-t border-border px-4 py-3 text-xs text-muted-foreground">
      <span>Menampilkan {filtered.length} transaksi</span>
      <div class="flex items-center gap-1.5">
        <button
          type="button"
          class="inline-flex size-8 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-40"
          disabled
        >
          <ChevronLeft class="size-4" />
        </button>
        <span class="px-2 font-mono tabular-nums text-foreground">1 / 1</span>
        <button
          type="button"
          class="inline-flex size-8 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-40"
          disabled
        >
          <ChevronRight class="size-4" />
        </button>
      </div>
    </div>
  </div>
</div>
