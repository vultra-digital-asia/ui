# @vultra/template-commerce

Production-grade E-Commerce & Consumer storefront starter kit built with **Svelte 5 Runes**, **Tailwind CSS v4**, and the **Vultra Anti-Slop Design System**.

## Key Design Principles
- **Aesthetic**: Digital Atelier / Warm Sand palette (`#FBF9F9` canvas, `#1B1C1C` ink, `#A13F20` terracotta accent).
- **Anti-Slop**: Zero decorative emoji (pure Lucide icons), 16px continuous squircles, tabular numbers on all financial metrics.
- **Architecture**: Thin-page pattern (`src/routes/` are purely presentational; domain state and mutations reside in `src/lib/features/`).

## Feature Composable Modules
- `catalog.svelte.ts`: Product categorization, client-side facet search, sorting, inventory state.
- `cart.svelte.ts`: Slide-over bag drawer, quantity mutations, promotional vouchers, subtotal/tax/shipping calculations.
- `checkout.svelte.ts`: Multi-payment orchestration (QRIS Instant, BCA Virtual Account, Mandiri Livin VA, Credit Card), order generation.

## Development

```bash
pnpm install
pnpm dev
```

Build for static host:
```bash
pnpm build
```
