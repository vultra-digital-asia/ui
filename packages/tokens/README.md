# @vultra/tokens

[![npm version](https://img.shields.io/npm/v/@vultra/tokens?style=flat-square&color=7c3aed)](https://www.npmjs.com/package/@vultra/tokens)
[![Docs](https://img.shields.io/badge/docs-ui.vultra.id-7c3aed?style=flat-square&labelColor=1a1a1a)](https://ui.vultra.id)
[![License MIT](https://img.shields.io/npm/l/@vultra/tokens?style=flat-square&color=7c3aed)](https://github.com/vultra-digital-asia/ui/blob/main/LICENSE)


Design tokens for Vultra UI — 9 CSS-variable themes (shadcn base, MD3, Flat, Glass, Brutalist, Neumorphism, Retro, Cyberpunk, Minimalist) that restyle the entire library with one import.

## Install

```bash
npm install @vultra/tokens
```

## Usage

```css
/* pick a theme: base | md3 | flat | glass | brutalist | neumorphism | retro | cyberpunk | minimalist */
@import "@vultra/tokens/flat.css";
```

```svelte
<script>
  import '@vultra/tokens/cyberpunk.css'; // one import = whole app theme
</script>
```

Set a theme on your root element:

```html
<html data-ui-theme="neutral">
```

## License

MIT
