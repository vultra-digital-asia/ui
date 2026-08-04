# Getting Started

Vultra UI is a Svelte 5 component library built on shadcn-svelte primitives with a full design token system.

## Installation

```bash
# via pnpm
pnpm add @vultra/ui @vultra/tokens

# via npm
npm install @vultra/ui @vultra/tokens
```

## Add a component

```bash
npx @vultra/cli add button card dialog
```

The CLI copies the component source into `src/lib/components/`, rewrites imports to your `$lib` aliases, and adds any missing package dependencies.

## Import tokens

In your root layout:

```svelte
<script>
  import '@vultra/tokens/base.css';
</script>
```

## Use a component

```svelte
<script>
  import { Button } from '@vultra/ui';
</script>

<Button>Click me</Button>
```

## Theming

Override the CSS custom properties in your root CSS to theme the library:

```css
:root {
  --ui-primary: oklch(0.45 0.24 277);
  --ui-background: oklch(0.985 0.003 247.858);
  --ui-radius: 0.5rem;
}
```

Available themes: `neutral` (default), `warm`, `dark`, `ocean`, `forest`.
