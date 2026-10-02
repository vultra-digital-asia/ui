# @vultra/screens

Full-page benchmark screens, onboarding flows, subscription paywalls, and enterprise data tables for Vultra UI.

- Built for **Svelte 5** runes & **Tailwind CSS v4**.
- Headless interactions powered by `@ark-ui/svelte`.
- Zero AI-slop: strict spacing, clean tokens, tabular numerals, Lucide icons only.
- Responsive by default: desktop-first data tables and mobile-first touch surfaces.

## Screens Included

- `ScreenPaywall` (`screen-paywall`): High-converting subscription paywall with plan selection and HIG squircle cards.
- `ScreenDatatable` (`screen-datatable`): Enterprise data grid with faceted search, bulk selection, density switcher, and pagination.
- `ScreenCheckoutModal` (`screen-checkout-modal`): 2-step checkout with plan selection and QRIS / Virtual Account gateway selector.
- `ScreenSidebarShell` (`screen-sidebar-shell`): Dual-viewport shell with desktop collapsible sidebar, mobile drawer with backdrop scrim, and Escape key listener.
- `ScreenOnboarding` (`screen-onboarding`): Mobile-first carousel with smooth animated progress dots and skip action.

## CLI Usage (Copy Model)

```bash
npx @vultra/cli add screen-paywall
npx @vultra/cli add screen-datatable
npx @vultra/cli add screen-checkout-modal
npx @vultra/cli add screen-sidebar-shell
npx @vultra/cli add screen-onboarding
```
