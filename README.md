# Vultra UI

**Svelte 5 component library — 100+ components, 9 themes, mobile + native.**

Vultra UI is a complete Svelte 5 component ecosystem: shadcn-style components, Material Design 3, flat/geometric shapes, mobile-first touch components, and native device capabilities — all tree-shakeable from one install.

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

- Component docs: [vultra docs](https://github.com/vultra-digital-asia/ui/tree/main/packages/docs)
- Examples & playground
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

GitHub Actions: `ci.yml` (build + test on push/PR), `publish.yml` (manual stage publish to npm).

## Versioning

All packages use [Changesets](https://github.com/changesets/changesets) for versioning and changelogs:

```bash
pnpm changeset        # add a changeset
pnpm version          # bump versions + update changelogs (changeset version)
pnpm publish          # publish via changeset
```

Packages currently ship as `0.1.0-alpha.x` (alpha).

### Publishing flow

The repo uses **npm staged publishing** — `npm stage publish` uploads packages to your npm account's Staged Packages queue instead of publishing immediately, so you can review before approving.

```bash
./scripts/stage-publish.sh          # rewrite workspace deps + stage all packages (tag: alpha)
./scripts/stage-publish.sh beta     # stage with a different dist-tag
./scripts/stage-publish.sh --rewrite-only   # CI: only rewrite deps, no publish
```

Then approve the queue at [npmjs.com/settings/vultra/packages](https://www.npmjs.com/settings/vultra/packages) (Staged Packages) and apply the release with `npm run stage:apply`.

> **Why the rewrite step?** npm does **not** resolve pnpm-style `workspace:*` dependency specifiers when packing/publishing (verified empirically with `npm pack`). Without the rewrite, published packages ship a dependency range of `workspace:*`, which fails on install with `Could not resolve dependency: workspace:* not found in registry`. `scripts/stage-publish.sh` rewrites every `workspace:*` to the current workspace version of that package before staging.

Brand-new packages (never published) can't be created via staged publishing — they require `npm publish` with login + 2FA (`./scripts/publish-new.sh`).

GitHub Actions: `ci.yml` (build + test on push/PR), `publish.yml` (manual stage publish to npm).

## License

MIT
