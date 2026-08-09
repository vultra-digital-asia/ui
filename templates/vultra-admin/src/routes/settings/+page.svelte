<script lang="ts">
	import { Card, CardContent, CardDescription, CardHeader, CardTitle, Input, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Switch } from '@vultra/ui';
	import { Button } from '@vultra/ui';

	let profile = $state({
		name: 'Ava Thompson',
		email: 'ava.thompson@example.com',
		role: 'admin',
		timezone: 'utc'
	});

	let notifications = $state({
		productUpdates: true,
		securityAlerts: true,
		weeklyDigest: false,
		orderActivity: true
	});

	let saved = $state(false);

	function saveProfile() {
		// Mock save — no backend in this template.
		saved = true;
		setTimeout(() => (saved = false), 2500);
	}
</script>

<div class="space-y-6">
	<div>
		<h1 class="text-2xl font-bold tracking-tight text-[var(--ui-foreground)]">Settings</h1>
		<p class="text-sm text-[var(--ui-muted-foreground)]">
			Manage your profile and notification preferences.
		</p>
	</div>

	<form
		class="space-y-6"
		onsubmit={(e) => {
			e.preventDefault();
			saveProfile();
		}}
	>
		<Card>
			<CardHeader>
				<CardTitle>Profile</CardTitle>
				<CardDescription>This is how others will see you.</CardDescription>
			</CardHeader>
			<CardContent class="space-y-4">
				<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
					<div class="space-y-2">
						<Label for="full-name">Full name</Label>
						<Input id="full-name" bind:value={profile.name} placeholder="Your name" />
					</div>
					<div class="space-y-2">
						<Label for="email">Email</Label>
						<Input id="email" type="email" bind:value={profile.email} placeholder="you@example.com" />
					</div>
				</div>
				<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
					<div class="space-y-2">
						<Label>Role</Label>
						<Select bind:value={profile.role}>
							<SelectTrigger class="w-full">
								<SelectValue placeholder="Select a role" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="admin">Administrator</SelectItem>
								<SelectItem value="editor">Editor</SelectItem>
								<SelectItem value="viewer">Viewer</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div class="space-y-2">
						<Label>Timezone</Label>
						<Select bind:value={profile.timezone}>
							<SelectTrigger class="w-full">
								<SelectValue placeholder="Select a timezone" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="utc">UTC</SelectItem>
								<SelectItem value="pst">Pacific (PST)</SelectItem>
								<SelectItem value="est">Eastern (EST)</SelectItem>
								<SelectItem value="cet">Central Europe (CET)</SelectItem>
								<SelectItem value="jst">Japan (JST)</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>
				<Button type="submit">{saved ? 'Saved!' : 'Save changes'}</Button>
			</CardContent>
		</Card>

		<Card>
			<CardHeader>
				<CardTitle>Notifications</CardTitle>
				<CardDescription>Choose what you want to be notified about.</CardDescription>
			</CardHeader>
			<CardContent class="space-y-4">
				<div class="flex items-center justify-between gap-4">
					<div>
						<p class="text-sm font-medium text-[var(--ui-foreground)]">Product updates</p>
						<p class="text-xs text-[var(--ui-muted-foreground)]">
							News about new features and improvements.
						</p>
					</div>
					<Switch bind:checked={notifications.productUpdates} aria-label="Product updates" />
				</div>
				<div class="flex items-center justify-between gap-4">
					<div>
						<p class="text-sm font-medium text-[var(--ui-foreground)]">Security alerts</p>
						<p class="text-xs text-[var(--ui-muted-foreground)]">
							Important account security notifications.
						</p>
					</div>
					<Switch bind:checked={notifications.securityAlerts} aria-label="Security alerts" />
				</div>
				<div class="flex items-center justify-between gap-4">
					<div>
						<p class="text-sm font-medium text-[var(--ui-foreground)]">Weekly digest</p>
						<p class="text-xs text-[var(--ui-muted-foreground)]">
							A summary of activity every Monday.
						</p>
					</div>
					<Switch bind:checked={notifications.weeklyDigest} aria-label="Weekly digest" />
				</div>
				<div class="flex items-center justify-between gap-4">
					<div>
						<p class="text-sm font-medium text-[var(--ui-foreground)]">Order activity</p>
						<p class="text-xs text-[var(--ui-muted-foreground)]">
							Updates about new and changed orders.
						</p>
					</div>
					<Switch bind:checked={notifications.orderActivity} aria-label="Order activity" />
				</div>
			</CardContent>
		</Card>
	</form>
</div>
