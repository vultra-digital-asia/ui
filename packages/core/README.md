# @vultra/ui

Svelte 5 component library with design tokens and CLI installer — 100+ components (web + mobile + device) that are tree-shakeable from one install.

## Install

```bash
npm install @vultra/ui @vultra/tokens
```

## Usage

```svelte
<script>
  import { Button, Card } from '@vultra/ui';
</script>

<Card>
  <h2>Hello World</h2>
  <Button>Click me</Button>
</Card>
```

Import tokens in your app's CSS:

```css
@import "@vultra/tokens/base";
```

## CLI

Copy components into your project instead of installing the library:

```bash
npx @vultra/cli add button card badge
```

## License

MIT
