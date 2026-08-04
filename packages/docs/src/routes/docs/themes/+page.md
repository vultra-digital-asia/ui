---
title: Themes
description: Choose a visual direction for your app
---

# Themes

Vultra UI offers multiple design directions. Swap one import to change your entire app's personality.

## Available Themes

| Theme | Import | Personality |
|-------|--------|-------------|
| **shadcn** | `@vultra/tokens/base` | Clean, muted, safe — great for dashboards |
| [**Material Design 3**](/docs/themes/md3) | `@vultra/tokens/md3` | Elevated, stateful, Google-flavored |
| [**Flat**](/docs/themes/flat) | `@vultra/tokens/flat` | Bold colors, sharp corners, geometric shapes |
| [**Glass**](/docs/themes/glass) | `@vultra/tokens/glass` | Translucent, blur, depth |
| [**Brutalist**](/docs/themes/brutalist) | `@vultra/tokens/brutalist` | Raw, heavy type, no softness |

## How It Works

Each theme redefines the same CSS custom properties with different values. Your components don't change — only the tokens do.

```svelte
<script>
  // Swap this one line to change your entire app
  import '@vultra/tokens/flat.css';
</script>
```

## Theme Tokens

All themes share the same token names:

```css
/* Colors */
--ui-primary, --ui-secondary, --ui-muted, --ui-accent, --ui-destructive
--ui-background, --ui-foreground, --ui-card, --ui-border

/* Typography */
--ui-font-sans, --ui-font-mono

/* Spacing */
--ui-space-1 through --ui-space-16

/* Shadows */
--ui-shadow-xs through --ui-shadow-xl

/* Transitions */
--ui-transition-fast, --ui-transition-base, --ui-transition-slow
```

## Combining with Components

Base components from `@vultra/ui` work with ANY theme:

```svelte
<script>
  import '@vultra/tokens/flat.css'; // flat theme
  import { Button, Card, Input } from '@vultra/ui'; // works with flat tokens
</script>
```

Theme-specific components (MD3, Flat composites) need their own packages:

```svelte
<script>
  import '@vultra/tokens/md3.css';
  import { FAB, Chip, Snackbar } from '@vultra/md3';
</script>
```
