import type {
	GeneratorOptions,
	GeneratorResult,
	GeneratedFile,
	FieldDefinition,
} from "./types.js";

function toKebab(str: string): string {
	return str
		.replace(/([a-z])([A-Z])/g, "$1-$2")
		.replace(/[\s_]+/g, "-")
		.toLowerCase();
}

function toPascal(str: string): string {
	const k = toKebab(str);
	return k
		.split("-")
		.map((w) => w.charAt(0).toUpperCase() + w.slice(1))
		.join("");
}

function toCamel(str: string): string {
	const p = toPascal(str);
	return p.charAt(0).toLowerCase() + p.slice(1);
}

export function generateSvelteFeature(
	options: GeneratorOptions,
): GeneratorResult {
	const rawName = options.entityName || "Item";
	const pascal = toPascal(rawName);
	const kebab = toKebab(rawName);
	const camel = toCamel(rawName);
	const archetype = options.archetype;

	const defaultFields: FieldDefinition[] =
		options.fields && options.fields.length > 0
			? options.fields
			: [
					{ name: "id", type: "string", label: "ID" },
					{ name: "name", type: "string", label: "Name" },
					{ name: "email", type: "string", label: "Email" },
					{ name: "status", type: "string", label: "Status" },
					{ name: "amount", type: "number", label: "Amount" },
				];

	const files: GeneratedFile[] = [];

	// 1. Feature Composable (Svelte 5 Runes)
	files.push(
		generateFeatureComposable(pascal, kebab, camel, archetype, defaultFields),
	);

	// 2. Thin Page Component (+page.svelte)
	files.push(generateThinPageComponent(pascal, kebab, camel, archetype));

	return {
		entityName: pascal,
		platform: "svelte5",
		archetype,
		files,
	};
}

function generateFeatureComposable(
	pascal: string,
	kebab: string,
	camel: string,
	archetype: string,
	fields: FieldDefinition[],
): GeneratedFile {
	const interfaceFields = fields
		.map((f) => {
			let tsType = "string";
			if (f.type === "number") tsType = "number";
			else if (f.type === "boolean") tsType = "boolean";
			else if (f.type === "date") tsType = "string";
			return `  ${f.name}: ${tsType};`;
		})
		.join("\n");

	const content = `export interface ${pascal} {
${interfaceFields}
  createdAt?: string;
}

/**
 * Svelte 5 Feature Composable for ${pascal}.
 * Encapsulates reactive state via Runes ($state, $derived) and business operations.
 */
export function create${pascal}Feature() {
  let search = $state('');
  let statusFilter = $state<string>('all');
  let isLoading = $state(false);

  const initialItems: ${pascal}[] = [
    { id: '1', name: 'Acme Enterprise', email: 'billing@acme.corp', status: 'Active', amount: 1450 },
    { id: '2', name: 'Linear Design Labs', email: 'team@linearlabs.dev', status: 'Active', amount: 450 },
    { id: '3', name: 'Vultra Systems', email: 'finance@vultra.id', status: 'Active', amount: 2400 },
    { id: '4', name: 'Parchment Studio', email: 'hello@parchment.io', status: 'Trial', amount: 99 },
    { id: '5', name: 'Svelte Masters', email: 'contact@sveltemasters.tech', status: 'Active', amount: 450 }
  ];

  let items = $state<${pascal}[]>(initialItems);

  const filteredItems = $derived(
    items.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'all' || item.status.toLowerCase() === statusFilter.toLowerCase();
      return matchesSearch && matchesStatus;
    })
  );

  const totalAmount = $derived(
    filteredItems.reduce((acc, curr) => acc + (curr.amount || 0), 0)
  );

  function removeItem(id: string) {
    items = items.filter((i) => i.id !== id);
  }

  function addItem(item: ${pascal}) {
    items = [item, ...items];
  }

  return {
    get search() { return search; },
    set search(v: string) { search = v; },
    get statusFilter() { return statusFilter; },
    set statusFilter(v: string) { statusFilter = v; },
    get isLoading() { return isLoading; },
    get items() { return filteredItems; },
    get totalAmount() { return totalAmount; },
    removeItem,
    addItem
  };
}
`;

	return {
		path: `src/lib/features/${kebab}/${kebab}.svelte.ts`,
		content,
		description: `Svelte 5 Runes feature composable for ${pascal}`,
	};
}

function generateThinPageComponent(
	pascal: string,
	kebab: string,
	camel: string,
	archetype: string,
): GeneratedFile {
	const content = `<script lang="ts">
  import { Search, Plus, Trash2, ArrowUpDown, Filter, Download } from 'lucide-svelte';
  import { create${pascal}Feature } from '$lib/features/${kebab}/${kebab}.svelte.js';

  const ${camel} = create${pascal}Feature();
</script>

<div class="space-y-6">
  <!-- Page Header -->
  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    <div>
      <h1 class="text-2xl font-bold tracking-tight text-[var(--ui-foreground)]">${pascal} Directory</h1>
      <p class="text-sm text-[var(--ui-muted-foreground)]">Manage and monitor ${kebab} records across all workspaces.</p>
    </div>

    <div class="flex items-center gap-3">
      <button
        type="button"
        class="inline-flex items-center gap-2 rounded-lg border border-[var(--ui-border)] bg-[var(--ui-card)] px-3.5 py-2 text-sm font-medium hover:bg-[var(--ui-secondary)] transition-colors"
      >
        <Download class="size-4" />
        Export
      </button>
      <button
        type="button"
        class="inline-flex items-center gap-2 rounded-lg bg-[var(--ui-primary)] px-3.5 py-2 text-sm font-medium text-[var(--ui-primary-foreground)] shadow-xs hover:opacity-90 transition-opacity"
      >
        <Plus class="size-4" />
        New ${pascal}
      </button>
    </div>
  </div>

  <!-- Search & Faceted Filter Bar -->
  <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
    <div class="relative flex-1 max-w-sm">
      <Search class="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[var(--ui-muted-foreground)]" />
      <input
        type="text"
        bind:value={${camel}.search}
        placeholder="Search ${kebab}..."
        class="h-10 w-full rounded-lg border border-[var(--ui-border)] bg-[var(--ui-background)] pl-9 pr-3 text-sm outline-none focus:ring-1 focus:ring-[var(--ui-primary)]"
      />
    </div>

    <div class="inline-flex items-center gap-1 rounded-lg border border-[var(--ui-border)] bg-[var(--ui-secondary)]/50 p-1 text-xs">
      <button
        type="button"
        onclick={() => (${camel}.statusFilter = 'all')}
        class="rounded-md px-3 py-1.5 font-medium transition-all {${camel}.statusFilter === 'all' ? 'bg-[var(--ui-card)] text-[var(--ui-foreground)] shadow-xs' : 'text-[var(--ui-muted-foreground)]'}"
      >
        All
      </button>
      <button
        type="button"
        onclick={() => (${camel}.statusFilter = 'active')}
        class="rounded-md px-3 py-1.5 font-medium transition-all {${camel}.statusFilter === 'active' ? 'bg-[var(--ui-card)] text-[var(--ui-foreground)] shadow-xs' : 'text-[var(--ui-muted-foreground)]'}"
      >
        Active
      </button>
      <button
        type="button"
        onclick={() => (${camel}.statusFilter = 'trial')}
        class="rounded-md px-3 py-1.5 font-medium transition-all {${camel}.statusFilter === 'trial' ? 'bg-[var(--ui-card)] text-[var(--ui-foreground)] shadow-xs' : 'text-[var(--ui-muted-foreground)]'}"
      >
        Trial
      </button>
    </div>
  </div>

  <!-- Data Table Container (Apple HIG continuous squircle radius & border) -->
  <div class="overflow-hidden rounded-xl border border-[var(--ui-border)] bg-[var(--ui-card)] shadow-xs">
    <table class="w-full text-left text-sm">
      <thead class="bg-[var(--ui-secondary)]/40 text-xs uppercase tracking-wider text-[var(--ui-muted-foreground)]">
        <tr>
          <th class="px-6 py-3 font-medium">Name</th>
          <th class="px-6 py-3 font-medium">Email</th>
          <th class="px-6 py-3 font-medium">Status</th>
          <th class="px-6 py-3 font-medium text-right">Amount</th>
          <th class="px-6 py-3 font-medium text-right">Actions</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-[var(--ui-border)] border-t border-[var(--ui-border)]">
        {#each ${camel}.items as item (item.id)}
          <tr class="hover:bg-[var(--ui-secondary)]/20 transition-colors">
            <td class="px-6 py-4 font-medium text-[var(--ui-foreground)]">{item.name}</td>
            <td class="px-6 py-4 text-[var(--ui-muted-foreground)]">{item.email}</td>
            <td class="px-6 py-4">
              <span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold {item.status.toLowerCase() === 'active' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}">
                {item.status}
              </span>
            </td>
            <td class="px-6 py-4 text-right font-semibold tabular-nums text-[var(--ui-foreground)]">
              \${item.amount.toLocaleString()}
            </td>
            <td class="px-6 py-4 text-right">
              <button
                type="button"
                onclick={() => ${camel}.removeItem(item.id)}
                class="rounded p-1 text-[var(--ui-muted-foreground)] hover:text-red-600 transition-colors"
                title="Delete"
              >
                <Trash2 class="size-4" />
              </button>
            </td>
          </tr>
        {:else}
          <tr>
            <td colspan="5" class="py-12 text-center text-sm text-[var(--ui-muted-foreground)]">
              No matching ${kebab} records found.
            </td>
          </tr>
        {/each}
      </tbody>
    </table>

    <div class="flex items-center justify-between border-t border-[var(--ui-border)] px-6 py-3 text-xs text-[var(--ui-muted-foreground)]">
      <div>Showing {${camel}.items.length} records</div>
      <div class="font-medium text-[var(--ui-foreground)]">Total Volume: \${${camel}.totalAmount.toLocaleString()}</div>
    </div>
  </div>
</div>
`;

	return {
		path: `src/routes/${kebab}/+page.svelte`,
		content,
		description: `Thin-page Svelte 5 view component for ${pascal}`,
	};
}
