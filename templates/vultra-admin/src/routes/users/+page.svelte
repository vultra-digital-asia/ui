<script lang="ts">
	import { DataTable, type ColumnDef } from '@vultra/data-table';
	import { Badge } from '@vultra/ui';

	interface User {
		id: string;
		name: string;
		email: string;
		role: string;
		status: 'Active' | 'Invited' | 'Suspended';
	}

	const users: User[] = [
		{ id: 'u-1', name: 'Ava Thompson', email: 'ava.thompson@example.com', role: 'Admin', status: 'Active' },
		{ id: 'u-2', name: 'Liam Chen', email: 'liam.chen@example.com', role: 'Editor', status: 'Active' },
		{ id: 'u-3', name: 'Maya Patel', email: 'maya.patel@example.com', role: 'Viewer', status: 'Invited' },
		{ id: 'u-4', name: 'Noah Kim', email: 'noah.kim@example.com', role: 'Editor', status: 'Suspended' },
		{ id: 'u-5', name: 'Zoe Nguyen', email: 'zoe.nguyen@example.com', role: 'Admin', status: 'Active' },
		{ id: 'u-6', name: 'Ethan Brooks', email: 'ethan.brooks@example.com', role: 'Viewer', status: 'Active' },
		{ id: 'u-7', name: 'Sofia Rossi', email: 'sofia.rossi@example.com', role: 'Editor', status: 'Invited' },
		{ id: 'u-8', name: 'Lucas Meyer', email: 'lucas.meyer@example.com', role: 'Viewer', status: 'Suspended' },
		{ id: 'u-9', name: 'Isla Fraser', email: 'isla.fraser@example.com', role: 'Editor', status: 'Active' },
		{ id: 'u-10', name: 'Omar Haddad', email: 'omar.haddad@example.com', role: 'Viewer', status: 'Active' },
		{ id: 'u-11', name: 'Chloe Dubois', email: 'chloe.dubois@example.com', role: 'Editor', status: 'Invited' },
		{ id: 'u-12', name: 'Felix Novak', email: 'felix.novak@example.com', role: 'Admin', status: 'Active' }
	];

	const statusVariant = {
		Active: 'default',
		Invited: 'secondary',
		Suspended: 'destructive'
	} as const;

	const columns: ColumnDef<User, unknown>[] = [
		{ id: 'name', header: 'Name', accessorKey: 'name' },
		{ id: 'email', header: 'Email', accessorKey: 'email' },
		{ id: 'role', header: 'Role', accessorKey: 'role' },
		{ id: 'status', header: 'Status', accessorKey: 'status' }
	];
</script>

<div class="space-y-6">
	<div>
		<h1 class="text-2xl font-bold tracking-tight text-[var(--ui-foreground)]">Users</h1>
		<p class="text-sm text-[var(--ui-muted-foreground)]">
			Manage team members, roles and access.
		</p>
	</div>

	<DataTable
		{users}
		{columns}
		title="Team members"
		description="Search, sort and paginate through your users"
		tableId="vultra-admin-users"
		exportable={false}
	>
		{#snippet cell({ row, columnId })}
			{@const value = (row as never as Record<string, unknown>)[columnId]}
			{#if columnId === 'name'}
				<div class="flex items-center gap-3">
					<span
						class="flex size-8 items-center justify-center rounded-full bg-[var(--ui-primary)]/10 text-xs font-semibold text-[var(--ui-primary)]"
					>
						{row.name.split(' ').map((p) => p[0]).join('').slice(0, 2)}
					</span>
					<span>{row.name}</span>
				</div>
			{:else if columnId === 'status'}
				<Badge variant={statusVariant[row.status]}>{row.status}</Badge>
			{:else}
				{value ?? '-'}
			{/if}
		{/snippet}
	</DataTable>
</div>
