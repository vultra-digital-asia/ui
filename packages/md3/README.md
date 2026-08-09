# @vultra/md3

Material Design 3 components for Vultra UI — FAB, Chip, Snackbar, BottomSheet, TopAppBar, NavigationRail, NavigationBar, SearchBar, Ripple, Badge, and more. Self-contained components styled by the MD3 token theme.

## Install

```bash
npm install @vultra/md3
```

## Usage

```svelte
<script>
  import { FAB, Chip, Snackbar } from '@vultra/md3';
</script>

<FAB variant="tertiary">+</FAB>
<Chip type="filter" selected>Filter</Chip>
```

Import the MD3 theme to match the Material look:

```css
@import "@vultra/tokens/md3.css";
```

## License

MIT
