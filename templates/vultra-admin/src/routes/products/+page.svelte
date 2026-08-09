<script lang="ts">
	import { DataTable, type DataTableColumnDef } from '@vultra/data-table';

	interface Product {
		id: string;
		name: string;
		price: number;
		stock: number;
		category: string;
	}

	const products: Product[] = [
		{ id: 'p-1', name: 'Aurora Wireless Headphones', price: 129.0, stock: 84, category: 'Audio' },
		{ id: 'p-2', name: 'Pulse Smart Watch', price: 249.0, stock: 32, category: 'Wearables' },
		{ id: 'p-3', name: 'Nimbus Mechanical Keyboard', price: 89.0, stock: 0, category: 'Accessories' },
		{ id: 'p-4', name: 'Drift USB-C Hub', price: 59.0, stock: 142, category: 'Accessories' },
		{ id: 'p-5', name: 'Echo Bluetooth Speaker', price: 99.0, stock: 21, category: 'Audio' },
		{ id: 'p-6', name: 'Vertex 4K Monitor', price: 429.0, stock: 8, category: 'Displays' },
		{ id: 'p-7', name: 'Comet Portable SSD 1TB', price: 149.0, stock: 67, category: 'Storage' },
		{ id: 'p-8', name: 'Orbit Webcam 1080p', price: 69.0, stock: 55, category: 'Accessories' },
		{ id: 'p-9', name: 'Flux USB-C Charger 65W', price: 39.0, stock: 0, category: 'Accessories' },
		{ id: 'p-10', name: 'Titan Ergonomic Chair', price: 549.0, stock: 12, category: 'Furniture' },
		{ id: 'p-11', name: 'Halo Smart Lamp', price: 79.0, stock: 48, category: 'Smart Home' },
		{ id: 'p-12', name: 'Prism Desk Mat XL', price: 29.0, stock: 210, category: 'Accessories' }
	];

	const formatCurrency = (n: number) =>
		new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);

	const columns: DataTableColumnDef<Product, unknown>[] = [
		{ id: 'name', header: 'Product', accessorKey: 'name' },
		{ id: 'price', header: 'Price', accessorKey: 'price', meta: { align: 'right' } },
		{ id: 'stock', header: 'Stock', accessorKey: 'stock', meta: { align: 'right' } },
		{ id: 'category', header: 'Category', accessorKey: 'category' }
	];

	const categories = [...new Set(products.map((p) => p.category))];

	let activeCategory = $state('All');
	const filteredProducts = $derived(
		activeCategory === 'All' ? products : products.filter((p) => p.category === activeCategory)
	);
</script>

<div class="space-y-6">
	<div>
		<h1 class="text-2xl font-bold tracking-tight text-[var(--ui-foreground)]">Products</h1>
		<p class="text-sm text-[var(--ui-muted-foreground)]">
			Browse and filter your catalog. Click a column header to sort.
		</p>
	</div>

	{#if categories.length}
		<div class="flex flex-wrap gap-2">
			{#each ['All', ...categories] as category (category)}
				<button
					type="button"
					class="cursor-pointer rounded-full border px-3 py-1 text-xs font-medium transition-colors {activeCategory === category
						? 'border-transparent bg-[var(--ui-primary)] text-[var(--ui-primary-foreground)]'
						: 'border-[var(--ui-border)] bg-[var(--ui-card)] text-[var(--ui-muted-foreground)] hover:bg-[var(--ui-secondary)]'}"
					onclick={() => (activeCategory = category)}
				>
					{category}
				</button>
			{/each}
		</div>
	{/if}

	<DataTable
		data={filteredProducts}
		{columns}
		title="Catalog"
		description="Search by name, sort by price or stock"
		tableId="vultra-admin-products"
		exportable={false}
	>
		{#snippet cell({ row, columnId })}
			{@const value = (row as never as Record<string, unknown>)[columnId]}
			{#if columnId === 'price'}
				<span class="tabular-nums">{formatCurrency(row.price)}</span>
			{:else if columnId === 'stock'}
				<span
					class="tabular-nums font-medium {row.stock === 0
						? 'text-[var(--ui-destructive)]'
						: row.stock < 15
							? 'text-[var(--ui-warning)]'
							: 'text-[var(--ui-foreground)]'}"
				>
					{row.stock}
				</span>
			{:else}
				{value ?? '-'}
			{/if}
		{/snippet}
	</DataTable>
</div>