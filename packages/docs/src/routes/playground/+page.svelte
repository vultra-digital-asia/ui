<script lang="ts">
	import Playground from '$lib/components/Playground.svelte';
	import type { PlaygroundProp } from '$lib/components/Playground.svelte';

	import { Button } from '@vultra/ui/components/button';
	import { Badge } from '@vultra/ui/components/badge';
	import { Input } from '@vultra/ui/components/input';
	import {
		Card,
		CardHeader,
		CardTitle,
		CardDescription,
		CardContent,
		CardFooter
	} from '@vultra/ui/components/card';
	import { Alert, AlertTitle, AlertDescription } from '@vultra/ui/components/alert';
	const buttonProps: PlaygroundProp[] = [
		{
			name: 'variant',
			label: 'Variant',
			type: 'enum',
			default: 'default',
			values: ['default', 'secondary', 'outline', 'ghost', 'destructive', 'link']
		},
		{
			name: 'size',
			label: 'Size',
			type: 'enum',
			default: 'default',
			values: ['xs', 'sm', 'default', 'lg', 'icon']
		},
		{ name: 'disabled', label: 'Disabled', type: 'boolean', default: false },
		{ name: 'label', label: 'Label', type: 'string', default: 'Click me' }
	];

	const badgeProps: PlaygroundProp[] = [
		{
			name: 'variant',
			label: 'Variant',
			type: 'enum',
			default: 'default',
			values: ['default', 'secondary', 'destructive', 'outline', 'ghost', 'link']
		},
		{ name: 'label', label: 'Label', type: 'string', default: 'Badge' }
	];

	const inputProps: PlaygroundProp[] = [
		{
			name: 'type',
			label: 'Type',
			type: 'enum',
			default: 'text',
			values: ['text', 'email', 'password', 'number', 'tel', 'url']
		},
		{ name: 'placeholder', label: 'Placeholder', type: 'string', default: 'Enter text…' },
		{ name: 'disabled', label: 'Disabled', type: 'boolean', default: false },
		{ name: 'value', label: 'Value', type: 'string', default: '' }
	];

	const cardProps: PlaygroundProp[] = [
		{ name: 'title', label: 'Title', type: 'string', default: 'Project Card' },
		{
			name: 'description',
			label: 'Description',
			type: 'string',
			default: 'A short description of the project goes here.'
		},
		{ name: 'footer', label: 'Show footer', type: 'boolean', default: true }
	];

	const alertProps: PlaygroundProp[] = [
		{
			name: 'variant',
			label: 'Variant',
			type: 'enum',
			default: 'default',
			values: ['default', 'destructive']
		},
		{ name: 'title', label: 'Title', type: 'string', default: 'Heads up!' },
		{
			name: 'description',
			label: 'Description',
			type: 'string',
			default: 'You can add content to the alert.'
		}
	];
</script>

<svelte:head>
	<title>Playground — Vultra UI</title>
	<meta name="description" content="Live interactive component playgrounds for Vultra UI" />
</svelte:head>

<section class="mx-auto max-w-5xl px-4 py-12">
	<div class="mb-10">
		<h1 class="text-3xl font-bold tracking-tight">Playground</h1>
		<p class="mt-2 text-[var(--ui-muted-foreground)]">
			Tweak props on the right and watch the preview update live. Switch to the
			<strong class="font-medium text-[var(--ui-foreground)]">Code</strong> tab to copy the generated
			snippet.
		</p>
	</div>

	<div class="space-y-8">
		<Playground
			title="Button"
			description="Variants, sizes, disabled state"
			props={buttonProps}
			getCode={(v) =>
				`<Button variant="${v.variant}" size="${v.size}"${v.disabled ? ' disabled' : ''}>${v.label}</Button>`}
		>
			{#snippet render(v)}
				<Button variant={v.variant} size={v.size} disabled={v.disabled}>{v.label}</Button>
			{/snippet}
		</Playground>

		<Playground
			title="Badge"
			description="Status and label badges"
			props={badgeProps}
			getCode={(v) => `<Badge variant="${v.variant}">${v.label}</Badge>`}
		>
			{#snippet render(v)}
				<Badge variant={v.variant}>{v.label}</Badge>
			{/snippet}
		</Playground>

		<Playground
			title="Input"
			description="Input types, placeholder, disabled"
			props={inputProps}
			getCode={(v) =>
				`<Input type="${v.type}" placeholder="${v.placeholder}"${v.disabled ? ' disabled' : ''}${v.value ? ` value="${v.value}"` : ''} />`}
		>
			{#snippet render(v)}
				<div class="w-64">
					<Input type={v.type} placeholder={v.placeholder} disabled={v.disabled} value={v.value} />
				</div>
			{/snippet}
		</Playground>

		<Playground
			title="Card"
			description="Content container with header and footer"
			props={cardProps}
			getCode={(v) =>
				`<Card>
  <CardHeader>
    <CardTitle>${v.title}</CardTitle>
    <CardDescription>${v.description}</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Some body content lives here.</p>
  </CardContent>${v.footer
					? `
  <CardFooter class="flex justify-end gap-2">
    <Button variant="outline" size="sm">Cancel</Button>
    <Button size="sm">Save</Button>
  </CardFooter>`
					: ''}
</Card>`}
		>
			{#snippet render(v)}
				<Card class="w-72">
					<CardHeader>
						<CardTitle>{v.title}</CardTitle>
						<CardDescription>{v.description}</CardDescription>
					</CardHeader>
					<CardContent>
						<p class="text-sm text-[var(--ui-muted-foreground)]">Some body content lives here.</p>
					</CardContent>
					{#if v.footer}
						<CardFooter class="flex justify-end gap-2">
							<Button variant="outline" size="sm">Cancel</Button>
							<Button size="sm">Save</Button>
						</CardFooter>
					{/if}
				</Card>
			{/snippet}
		</Playground>

		<Playground
			title="Alert"
			description="Feedback messages"
			props={alertProps}
			getCode={(v) =>
				`<Alert variant="${v.variant}">
  <AlertTitle>${v.title}</AlertTitle>
  <AlertDescription>${v.description}</AlertDescription>
</Alert>`}
		>
			{#snippet render(v)}
				<Alert variant={v.variant} class="w-72">
					<AlertTitle>{v.title}</AlertTitle>
					<AlertDescription>{v.description}</AlertDescription>
				</Alert>
			{/snippet}
		</Playground>
	</div>
</section>