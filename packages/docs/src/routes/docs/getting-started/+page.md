# Getting Started

Vultra UI is a Svelte 5 component library with 120+ components, 9 themes, and a CLI installer.

## Installation

```bash
# Core packages
npm install @vultra/ui @vultra/tokens

# Or with pnpm
pnpm add @vultra/ui @vultra/tokens
```

## Add Components

```bash
npx @vultra/cli add button card dialog
```

The CLI copies components into your project and rewrites imports automatically.

## Import Tokens

In your root layout:

```svelte
<script>
  import '@vultra/tokens/base.css';
</script>
```

## Choose a Theme

```svelte
<script>
  // One import changes your entire app
  import '@vultra/tokens/cyberpunk.css';
</script>
```

### Available Themes

| Theme | Import | Style |
|-------|--------|-------|
| shadcn | `@vultra/tokens/base` | Clean, muted |
| MD3 | `@vultra/tokens/md3` | Material Design 3 |
| Flat | `@vultra/tokens/flat` | Bold, geometric |
| Glass | `@vultra/tokens/glass` | Translucent blur |
| Brutalist | `@vultra/tokens/brutalist` | Raw, heavy |
| Neumorphism | `@vultra/tokens/neumorphism` | Soft UI |
| Retro | `@vultra/tokens/retro` | Vintage |
| Cyberpunk | `@vultra/tokens/cyberpunk` | Neon futuristic |
| Minimalist | `@vultra/tokens/minimalist` | Black/white |

## Use Components

```svelte
<script>
  import { Button, Card, Input } from '@vultra/ui';
</script>

<Card>
  <h2>Hello World</h2>
  <Input placeholder="Enter text..." />
  <Button>Click me</Button>
</Card>
```

## MD3 Components

```svelte
<script>
  import { FAB, Chip, Snackbar } from '@vultra/md3';
</script>

<FAB onclick={() => alert('Clicked!')}>+</FAB>
```

## Flat Geometric Components

```svelte
<script>
  import { HexagonGrid, OctagonCard, DiamondBadge } from '@vultra/flat';
</script>

<HexagonGrid columns={3}>
  <OctagonCard color="blue" title="Feature 1" />
  <OctagonCard color="green" title="Feature 2" />
  <OctagonCard color="purple" title="Feature 3" />
</HexagonGrid>
```

## More Packages

| Package | Install |
|---------|---------|
| CLI | `npx @vultra/cli` |
| Editor Core | `npm install @vultra/editor-core` |
| Image Editor | `npm install @vultra/image-editor` |

## Next Steps

- [Components](/docs/components) — Browse all 120+ components
- [Themes](/docs/themes) — Explore 9 theme directions
