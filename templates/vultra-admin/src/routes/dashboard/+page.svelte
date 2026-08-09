<script lang="ts">
	import {
		ArrowDownRight,
		ArrowUpRight,
		DollarSign,
		ShoppingCart,
		TrendingUp,
		Users
	} from 'lucide-svelte';
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '@vultra/ui';

	interface Stat {
		label: string;
		value: string;
		delta: string;
		positive: boolean;
		icon: typeof DollarSign;
		accent: string;
	}

	const stats: Stat[] = [
		{
			label: 'Revenue',
			value: '$128,430',
			delta: '+12.4%',
			positive: true,
			icon: DollarSign,
			accent: '#22c55e'
		},
		{
			label: 'Users',
			value: '8,492',
			delta: '+3.1%',
			positive: true,
			icon: Users,
			accent: '#3b82f6'
		},
		{
			label: 'Orders',
			value: '1,204',
			delta: '+8.7%',
			positive: true,
			icon: ShoppingCart,
			accent: '#a855f7'
		},
		{
			label: 'Growth',
			value: '23.9%',
			delta: '-1.2%',
			positive: false,
			icon: TrendingUp,
			accent: '#f97316'
		}
	];

	const chart = [
		{ label: 'Jan', value: 42 },
		{ label: 'Feb', value: 55 },
		{ label: 'Mar', value: 48 },
		{ label: 'Apr', value: 70 },
		{ label: 'May', value: 62 },
		{ label: 'Jun', value: 85 },
		{ label: 'Jul', value: 78 },
		{ label: 'Aug', value: 96 }
	];

	const chartMax = Math.max(...chart.map((d) => d.value));
</script>

<div class="space-y-6">
	<div>
		<h1 class="text-2xl font-bold tracking-tight text-[var(--ui-foreground)]">Dashboard</h1>
		<p class="text-sm text-[var(--ui-muted-foreground)]">
			Welcome back — here's what's happening with your store today.
		</p>
	</div>

	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
		{#each stats as stat (stat.label)}
			<Card>
				<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle class="text-sm font-medium text-[var(--ui-muted-foreground)]">
						{stat.label}
					</CardTitle>
					<span
						class="flex size-9 items-center justify-center rounded-lg"
						style={`background:${stat.accent}1a;color:${stat.accent}`}
					>
						<stat.icon class="size-4.5" />
					</span>
				</CardHeader>
				<CardContent>
					<div class="text-2xl font-bold text-[var(--ui-foreground)]">{stat.value}</div>
					<p
						class="mt-1 flex items-center gap-1 text-xs font-medium {stat.positive
							? 'text-[var(--ui-success)]'
							: 'text-[var(--ui-destructive)]'}"
					>
						{#if stat.positive}
							<ArrowUpRight class="size-3.5" />
						{:else}
							<ArrowDownRight class="size-3.5" />
						{/if}
						{stat.delta}
						<span class="text-[var(--ui-muted-foreground)]">vs last month</span>
					</p>
				</CardContent>
			</Card>
		{/each}
	</div>

	<Card>
		<CardHeader>
			<CardTitle>Revenue overview</CardTitle>
			<CardDescription>Monthly revenue in thousands (USD)</CardDescription>
		</CardHeader>
		<CardContent>
			<div class="flex h-64 items-end gap-2 sm:gap-3">
				{#each chart as bar (bar.label)}
					<div class="group flex flex-1 flex-col items-center gap-2">
						<div class="relative flex w-full flex-1 items-end">
							<div
								class="w-full rounded-t-md bg-[var(--ui-primary)] opacity-80 transition-all group-hover:opacity-100"
								style={`height:${Math.max((bar.value / chartMax) * 100, 4)}%`}
								title={`${bar.label}: $${bar.value}k`}
							></div>
						</div>
						<span class="text-[11px] text-[var(--ui-muted-foreground)]">{bar.label}</span>
					</div>
				{/each}
			</div>
		</CardContent>
	</Card>
</div>
