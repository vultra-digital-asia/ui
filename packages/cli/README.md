# @vultra/cli

[![npm version](https://img.shields.io/npm/v/@vultra/cli?style=flat-square&color=A13F20)](https://www.npmjs.com/package/@vultra/cli)
[![Docs](https://img.shields.io/badge/docs-ui.vultra.id-A13F20?style=flat-square&labelColor=1a1a1a)](https://ui.vultra.id)
[![License MIT](https://img.shields.io/npm/l/@vultra/cli?style=flat-square&color=A13F20)](https://github.com/vultra-digital-asia/ui/blob/main/LICENSE)

Universal CLI toolchain for **Vultra UI** — multiplatform screen generator (Svelte 5 Runes & Flutter BLoC + Freezed), design token compiler & Figma importer, anti-slop linter with auto-fix, and shadcn-style component installer.

---

## Installation

```bash
npm install -g @vultra/cli
# or run directly with npx / bunx:
npx @vultra/cli
```

---

## Commands & Capabilities

### 1. Universal Screen Generator (`vultra gen`)
Scaffold complete production features with domain models, business logic controllers, and views:

```bash
# Svelte 5 Runes (Thin-page + feature composable)
vultra gen -p svelte5 -a datatable -e Customer
vultra gen -p svelte5 -a dashboard -e Analytics
vultra gen -p svelte5 -a paywall -e ProPlan

# Flutter Clean Architecture (BLoC + Freezed + Tests)
vultra gen -p flutter -a datatable -e Customer -t
vultra gen -p flutter -a paywall -e Subscription -t

# AI Screen Generation via local 9Router
vultra gen -p svelte5 -e AuditLog --ai "Audit log page with severity filters"
```

### 2. Multiplatform Design Token Sync (`vultra tokens`)
Compile W3C DTCG / flat JSON tokens to Tailwind v4 CSS and Flutter Dart `AppColors`:

```bash
# Sync once
vultra tokens sync [tokens.json] --web src/app.css --flutter lib/core/theme/app_colors.dart

# Watch mode (recompiles on save with 150ms debounce)
vultra tokens watch [tokens.json] --web src/app.css --flutter lib/core/theme/app_colors.dart

# Export to Figma Tokens Studio schema
vultra tokens export --preset ethereal-sand -o tokens.json
```

### 3. Figma REST API Importer (`vultra figma`)
Extract variables and style nodes directly from your Figma design files:

```bash
vultra figma <fileKey> --token <FIGMA_PAT> --web src/app.css --flutter lib/core/theme/app_colors.dart
```

### 4. Anti-Slop Linter & Auto-Fixer (`vultra lint`)
Scan your codebase to ban AI slop (emoji in UI chrome, generic purple gradients, sharp radii, mixed greys):

```bash
# Scan codebase
vultra lint

# Auto-fix safe violations (strips emoji chrome from text and buttons)
vultra lint -f
```

### 5. Vision-to-Code (`vultra vision`)
Convert screenshots directly into Svelte 5 Runes or Flutter BLoC:

```bash
vultra vision /path/to/screenshot.png -p svelte5 -e Invoice
```

### 6. Flutter Benchmark Screen Importer (`vultra flutter`)
Copy pre-built benchmark mobile screens directly into your Flutter workspace:

```bash
vultra flutter list
vultra flutter add mob-paywall
vultra flutter add mob-bottom-sheet-detents
```

### 7. Google Stitch Token Compiler (`vultra stitch`)
Export or compile Google's `DESIGN.md` specification:

```bash
vultra stitch ethereal-sand
vultra stitch compile DESIGN.md -p flutter -e PricingPlan
```

### 8. Component Copy Workflow (`vultra add`)
Interactive or direct copy-paste installer (shadcn model):

```bash
vultra add
vultra add button card badge -y
vultra add screen-paywall -y
```

### 9. IDE & Agent Pack (`vultra setup-agent`)
Bootstrap anti-slop rules for AI coding agents (`.cursorrules`, `.windsurfrules`, `.claude/mcp.json`).

---

## Live Deployments & Starters

- **Docs & Benchmarks**: [ui.vultra.id](https://ui.vultra.id)
- **Token Studio**: [ui.vultra.id/tokens](https://ui.vultra.id/tokens)
- **Studio Playground**: [ui.vultra.id/studio](https://ui.vultra.id/studio)
- **B2B SaaS Starter**: [saas.vultra.id](https://saas.vultra.id)
- **Commerce Starter**: [shop.vultra.id](https://shop.vultra.id)
- **Flutter BLoC Starter**: [flutter.vultra.id](https://flutter.vultra.id)
- **Storybook Lab**: [stories.vultra.id](https://stories.vultra.id)

---

## License

MIT © Vultra Digital Asia
