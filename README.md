# Vultra UI

**Svelte 5 component library — 100+ components, 9 themes, mobile + native.**

[![npm version](https://img.shields.io/npm/v/@vultra/ui?style=flat-square&color=7c3aed)](https://www.npmjs.com/package/@vultra/ui)
[![npm downloads](https://img.shields.io/npm/dm/@vultra/ui?style=flat-square&color=7c3aed)](https://www.npmjs.com/package/@vultra/ui)
[![Docs](https://img.shields.io/badge/docs-ui.vultra.id-7c3aed?style=flat-square&labelColor=1a1a1a)](https://ui.vultra.id)
[![License MIT](https://img.shields.io/npm/l/@vultra/ui?style=flat-square&color=7c3aed)](https://github.com/vultra-digital-asia/ui/blob/main/LICENSE)
[![CI](https://img.shields.io/github/actions/workflow/status/vultra-digital-asia/ui/ci.yml?style=flat-square&color=7c3aed)](https://github.com/vultra-digital-asia/ui/actions)
[![GitHub Release](https://img.shields.io/github/v/release/vultra-digital-asia/ui?style=flat-square&color=7c3aed)](https://github.com/vultra-digital-asia/ui/releases)

Vultra UI is a complete Svelte 5 component ecosystem: shadcn-style components, Material Design 3, flat/geometric shapes, mobile-first touch components, and native device capabilities — all tree-shakeable from one install.

**📚 Live docs: [ui.vultra.id](https://ui.vultra.id)**

## Packages

| Package | Description |
|---------|-------------|
| [`@vultra/ui`](https://www.npmjs.com/package/@vultra/ui) | 100+ components (web + mobile + device) |
| [`@vultra/tokens`](https://www.npmjs.com/package/@vultra/tokens) | 9 design themes (CSS variables) |
| [`@vultra/cli`](https://www.npmjs.com/package/@vultra/cli) | Component installer (`add`/`init`/`update`/`doctor`) |
| [`@vultra/md3`](https://www.npmjs.com/package/@vultra/md3) | Material Design 3 components |
| [`@vultra/flat`](https://www.npmjs.com/package/@vultra/flat) | Geometric / clip-path components |
| [`@vultra/native`](https://www.npmjs.com/package/@vultra/native) | Native device services (Capacitor) |
| [`@vultra/data-table`](https://www.npmjs.com/package/@vultra/data-table) | Enterprise data grid |
| [`@vultra/editor-core`](https://www.npmjs.com/package/@vultra/editor-core) | Visual editor engine (Svelte-native DnD) |
| [`@vultra/image-editor`](https://www.npmjs.com/package/@vultra/image-editor) | Image filters & effects |
| [`@vultra/rich-text`](https://www.npmjs.com/package/@vultra/rich-text) | Tiptap editor wrapper |

## Installation

### Option A — npm package (library model)

```bash
npm install @vultra/ui @vultra/tokens
```

### Option B — CLI copy (shadcn model)

```bash
npx @vultra/cli add button card badge
```

Components are copied into your project with rewritten imports.

### Option C — CLI npm mode

```bash
npx @vultra/cli add button --mode npm
```

Adds `@vultra/ui` + deps to package.json and prints import snippets.

## Setup

Import tokens in your app's CSS:

```css
@import "@vultra/tokens/base";
```

Set a theme on your root element:

```html
<html data-ui-theme="neutral">
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

## 9 Themes

| Theme | Import | Style |
|-------|--------|-------|
| shadcn | `@vultra/tokens/base` | Clean & muted |
| MD3 | `@vultra/tokens/md3` | Material Design 3 |
| Flat | `@vultra/tokens/flat` | Bold & geometric |
| Glass | `@vultra/tokens/glass` | Translucent blur |
| Brutalist | `@vultra/tokens/brutalist` | Raw & heavy |
| Neumorphism | `@vultra/tokens/neumorphism` | Soft UI |
| Retro | `@vultra/tokens/retro` | Vintage |
| Cyberpunk | `@vultra/tokens/cyberpunk` | Neon futuristic |
| Minimalist | `@vultra/tokens/minimalist` | Black & white |

```svelte
<script>
  import '@vultra/tokens/cyberpunk.css'; // one import = whole app theme
</script>
```

## Mobile Components

Touch-optimized, safe-area aware, no hover-dependent features:

```svelte
<script>
  import { TabBar, TabBarItem, PullToRefresh, ActionSheet, FabMenu } from '@vultra/ui';
</script>

<TabBar bind:value={tab}>
  <TabBarItem value="home" label="Home" />
  <TabBarItem value="cart" label="Cart" badge={3} />
</TabBar>
```

## Native Device Features

```ts
import { getDeviceInfo, takePhoto, localNotify, watchMotion } from '@vultra/native';

const info = await getDeviceInfo(); // { platform, isNative, ... }
await localNotify('Hello', 'Push notification body');
```

## Component Categories

Actions, Layout, Navigation, Forms (with validation + Zod), Feedback, Data Display, Marketing, Composite, Social, Mobile, Device, Utility — 100+ components.

## CLI

```bash
npx @vultra/cli init        # Setup project (tokens, cn(), components.json)
npx @vultra/cli add button  # Copy component (or --mode npm)
npx @vultra/cli update      # Update installed components
npx @vultra/cli doctor      # Check setup health
npx @vultra/cli list        # Browse components by category
```

## PWA / Capacitor

Build responsive web → PWA → native app from one codebase. See `templates/pwa-starter/` for a ready-to-run starter (SvelteKit + Capacitor 7 + @vultra/ui).

## Documentation

- **Live docs: [ui.vultra.id](https://ui.vultra.id)** — components, themes, getting started, search (⌘K)
- Source: [`packages/docs/`](https://github.com/vultra-digital-asia/ui/tree/main/packages/docs)
- All 26 packages published to npm

## Development

```bash
pnpm install
pnpm dev           # Start dev server
pnpm build         # Build library
pnpm test          # Run tests (230+)
pnpm check         # Type check
```

## CI/CD

GitHub Actions:
- `ci.yml` — build + test on push/PR
- `publish.yml` — release to npm (alpha/beta/stable) + GitHub Release + tag
- `deploy-docs.yml` — auto-deploy docs to [ui.vultra.id](https://ui.vultra.id)

## Versioning & Publishing

All 26 packages versioned together and released as one unit.

### Release types

| Type | Command | npm tag |
|------|---------|---------|
| Alpha | `gh workflow run publish.yml -f release-type=alpha` | `alpha` |
| Beta | `gh workflow run publish.yml -f release-type=beta` | `beta` |
| Stable | `gh workflow run publish.yml -f release-type=stable -f version=patch\|minor\|major` | `latest` |

The workflow bumps versions, commits, builds, publishes in dependency order, tags (`v<version>`) and creates a GitHub Release with auto-generated notes.

> **Why the rewrite step?** npm does **not** resolve pnpm-style `workspace:*` dependency specifiers when packing/publishing (verified empirically with `npm pack`). Without the rewrite, published packages ship a dependency range of `workspace:*`, which fails on install. `scripts/stage-publish.sh` rewrites every `workspace:*` to the current workspace version before publishing.

## License

MIT