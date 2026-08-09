# @vultra/tokens

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
