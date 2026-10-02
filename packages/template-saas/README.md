# @vultra/template-saas

Full-stack SaaS starter kit powered by **SvelteKit 5 (Runes)**, **Tailwind CSS v4**, and **@vultra/screens**.

## Features

- **Pure Svelte 5**: 100% runes (`$state`, `$derived`, `$props`), zero React dependencies.
- **Pre-integrated Benchmark Screens**:
  - `ScreenSidebarShell`: Collapsible sidebar, mobile drawer overlay, scrim.
  - `ScreenDatatable`: High-density enterprise data table with facet filters and selection.
  - `ScreenPaywall`: Conversion-focused pricing matrix with annual/monthly toggle.
  - `ScreenCheckoutModal`: Multi-step payment modal (QRIS, Virtual Account, Credit Card).
  - `ScreenOnboarding`: Multi-step onboarding carousel with dot indicators.
- **Thin-Page Composable Architecture**:
  - State and operations live in `src/lib/features/` composables (`auth`, `billing`, `customers`).
  - Route files stay thin, readable, and focused purely on view bindings.
- **Tailwind CSS v4**: Built with native `@theme` CSS variable tokens.

## Getting Started

```bash
# Run local dev server
pnpm --filter @vultra/template-saas dev

# Build for production (adapter-static)
pnpm --filter @vultra/template-saas build
```
