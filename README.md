# @vultra/ui

Svelte 5 component library with design tokens, CLI installer, and 50+ components.

## Installation

```bash
npm install @vultra/ui
```

## Setup

Import the base tokens in your app's CSS:

```css
@import "@vultra/tokens/base";
```

Or choose a theme:

```css
@import "@vultra/tokens/md3";     /* Material Design 3 */
@import "@vultra/tokens/flat";    /* Flat & geometric */
@import "@vultra/tokens/glass";   /* Glassmorphism */
@import "@vultra/tokens/brutalist"; /* Brutalist */
```

Set a theme on your root element:

```html
<html data-ui-theme="neutral">
```

## Usage

```svelte
<script>
  import { Button, Card, CardHeader, CardTitle, CardContent } from '@vultra/ui';
</script>

<Card>
  <CardHeader>
    <CardTitle>Hello World</CardTitle>
  </CardHeader>
  <CardContent>
    <Button variant="primary">Click me</Button>
  </CardContent>
</Card>
```

## CLI Installer

```bash
npx @vultra/cli add button card badge
```

Components are copied into your project with rewritten imports.

## Theming

Override CSS custom properties in your project:

```css
:root {
  --ui-primary: oklch(0.216 0.006 56.043);
  --ui-accent: oklch(0.553 0.013 58.071);
  --ui-radius: 0.625rem;
}
```

## Available Themes

| Theme | Import | Style |
|-------|--------|-------|
| shadcn | `@vultra/tokens/base` | Clean & muted |
| MD3 | `@vultra/tokens/md3` | Material Design 3 |
| Flat | `@vultra/tokens/flat` | Bold & geometric |
| Glass | `@vultra/tokens/glass` | Translucent blur |
| Brutalist | `@vultra/tokens/brutalist` | Raw & heavy |

## Development

```bash
pnpm install
pnpm dev           # Start dev server
pnpm build         # Build library
pnpm check         # Type check
```

## Versioning

This project uses [Changesets](https://github.com/changesets/changesets) for version management.

```bash
npx changeset      # Add a changeset
npx changeset version  # Bump versions
npx changeset publish  # Publish to npm
```

## License

MIT
