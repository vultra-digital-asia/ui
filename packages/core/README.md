# @vultra/ui

[![npm version](https://img.shields.io/npm/v/@vultra/ui?style=flat-square&color=7c3aed)](https://www.npmjs.com/package/@vultra/ui)
[![Docs](https://img.shields.io/badge/docs-ui.vultra.id-7c3aed?style=flat-square&labelColor=1a1a1a)](https://ui.vultra.id)
[![License MIT](https://img.shields.io/npm/l/@vultra/ui?style=flat-square&color=7c3aed)](https://github.com/vultra-digital-asia/ui/blob/main/LICENSE)


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
