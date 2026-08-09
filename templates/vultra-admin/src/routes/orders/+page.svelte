<script lang="ts">
	import { DataTable, type DataTableColumnDef } from '@vultra/data-table';
	import { Badge } from '@vultra/ui';

	interface Order {
		id: string;
		customer: string;
		total: number;
		status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
		date: string;
	}

	const orders: Order[] = [
		{ id: 'ORD-1001', customer: 'Ava Thompson', total: 129.0, status: 'Delivered', date: '2026-07-28' },
		{ id: 'ORD-1002', customer: 'Liam Chen', total: 249.0, status: 'Shipped', date: '2026-07-29' },
		{ id: 'ORD-1003', customer: 'Maya Patel', total: 59.0, status: 'Pending', date: '2026-07-30' },
		{ id: 'ORD-1004', customer: 'Noah Kim', total: 89.0, status: 'Delivered', date: '2026-07-30' },
		{ id: 'ORD-1005', customer: 'Zoe Nguyen', total: 549.0, status: 'Pending', date: '2026-07-31' },
		{ id: 'ORD-1006', customer: 'Ethan Brooks', total: 99.0, status: 'Shipped', date: '2026-08-01' },
		{ id: 'ORD-1007', customer: 'Sofia Rossi', total: 149.0, status: 'Delivered', date: '2026-08-02' },
		{ id: 'ORD-1008', customer: 'Lucas Meyer', total: 39.0, status: 'Cancelled', date: '2026-08-03' },
		{ id: 'ORD-1009', customer: 'Isla Fraser', total: 429.0, status: 'Shipped', date: '2026-08-04' },
		{ id: 'ORD-1010', customer: 'Omar Haddad', total: 69.0, status: 'Pending', date: '2026-08-05' },
		{ id: 'ORD-1011', customer: 'Chloe Dubois', total: 79.0, status: 'Delivered', date: '2026-08-06' },
		{ id: 'ORD-1012', customer: 'Felix Novak', total: 29.0, status: 'Shipped', date: '2026-08-07' }
	];

	const statusVariant = {
		Delivered: 'default',
		Shipped: 'secondary',
		Pending: 'secondary',
		Cancelled: 'destructive'
	} as const;

	const formatCurrency = (n: number) =>
		new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);

	const columns: DataTableColumnDef<Order, unknown>[] = [
		{ id: 'id', header: 'Order', accessorKey: 'id' },
		{ id: 'customer', header: 'Customer', accessorKey: 'customer' },
		{ id: 'total', header: 'Total', accessorKey: 'total', meta: { align: 'right' } },
		{ id: 'status', header: 'Status', accessorKey: 'status' },
		{ id: 'date', header: 'Date', accessorKey: 'date' }
	];
</script>

<div class="space-y-6">
	<div>
		<h1 class="text-2xl font-bold tracking-tight text-[var(--ui-foreground)]">Orders</h1>
		<p class="text-sm text-[var(--ui-muted-foreground)]">
			Track fulfillment status across all orders.
		</p>
	</div>

	<DataTable
		{data}
		{columns}
		title="Recent orders"
		description="Search by order ID or customer name"
		tableId="vultra-admin-orders"
		exportable={false}
	>
		{#snippet cell({ row, columnId })}
			{@const value = (row as never as Record<string, unknown>)[columnId]}
			{#if columnId === 'total'}
				<span class="tabular-nums font-semibold">{formatCurrency(row.total)}</span>
			{:else if columnId === 'status'}
				<Badge variant={statusVariant[row.status]}>{row.status}</Badge>
			{:else}
				{value ?? '-'}
			{/if}
		{/snippet}
	</DataTable>
</div>