<script lang="ts">
	import { Mail, Lock, Zap } from 'lucide-svelte';
	import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input, Label } from '@vultra/ui';

	let email = $state('');
	let password = $state('');
	let error = $state('');

	function submit() {
		if (!email || !password) {
			error = 'Please enter your email and password.';
			return;
		}
		// Mock login — redirect to the dashboard.
		window.location.href = '/dashboard';
	}
</script>

<div class="flex min-h-dvh items-center justify-center bg-[var(--ui-background)] px-4 py-10">
	<Card class="w-full max-w-sm">
		<CardHeader class="items-center text-center">
			<span class="mb-2 flex size-11 items-center justify-center rounded-xl bg-[var(--ui-primary)] text-[var(--ui-primary-foreground)]">
				<Zap class="size-5" />
			</span>
			<CardTitle class="text-xl">Welcome back</CardTitle>
			<CardDescription>Sign in to your Vultra Admin account.</CardDescription>
		</CardHeader>
		<CardContent>
			<form
				class="space-y-4"
				onsubmit={(e) => {
					e.preventDefault();
					submit();
				}}
			>
				<div class="space-y-2">
					<Label for="login-email">Email</Label>
					<div class="relative">
						<Mail class="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--ui-muted-foreground)]" />
						<Input id="login-email" type="email" class="pl-9" placeholder="you@example.com" bind:value={email} />
					</div>
				</div>
				<div class="space-y-2">
					<Label for="login-password">Password</Label>
					<div class="relative">
						<Lock class="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--ui-muted-foreground)]" />
						<Input id="login-password" type="password" class="pl-9" placeholder="••••••••" bind:value={password} />
					</div>
				</div>
				{#if error}
					<p class="text-sm font-medium text-[var(--ui-destructive)]" role="alert">{error}</p>
				{/if}
				<Button type="submit" class="w-full">Sign in</Button>
			</form>
			<p class="mt-4 text-center text-xs text-[var(--ui-muted-foreground)]">
				Demo template — any email and password will work.
			</p>
		</CardContent>
	</Card>
</div>
