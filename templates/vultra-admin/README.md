# Vultra Admin

A SvelteKit admin dashboard template built on [@vultra/ui](https://github.com/vultra-digital-asia/ui) with a 9-theme switcher powered by `@vultra/tokens`.

## Features

- **9 switchable themes** — Neutral, Warm, Dark, MD3, Flat, Glass, Brutalist, Cyberpunk, Retro, Neumorphism and Minimalist signatures, each with a dark variant. Switch at runtime from the header or sidebar; the choice persists in `localStorage` (`vultra-theme`) and is applied via the `data-ui-theme` attribute.
- **Responsive sidebar** — fixed on desktop, slide-in drawer with overlay on mobile.
- **Dashboard** — revenue, users, orders and growth stat cards plus a CSS bar chart (no chart library required).
- **Data tables** — searchable, sortable, paginated tables for Users, Products and Orders built on `@vultra/data-table` (TanStack Table core).
- **Orders status badges** — Pending / Shipped / Delivered / Cancelled.
- **Products category filter** — one-click chip filtering by category.
- **Settings form** — inputs, selects and switches with mock persistence.
- **Login page** — mock auth that redirects to the dashboard.
- **All data is mock** — no backend needed.

## Getting started

```bash
pnpm install
pnpm dev
```

Open http://localhost:5180. You'll land on `/dashboard` (the root route redirects there).

## Theme switcher

The switcher shows the 9 theme signatures. Each signature is a distinct visual direction defined in `@vultra/tokens`:

| Theme | Personality |
| --- | --- |
| Neutral | Default shadcn-style slate (base.css) |
| MD3 | Material Design 3 — rounded, elevation shadows |
| Flat | Sharp corners, saturated palette, no shadows |
| Glass | Translucent cards, backdrop blur |
| Brutalist | 2px black borders, monospace, no radius |
| Cyberpunk | Neon glow, monospace, dark |
| Retro | Cream paper, serif, warm |
| Neumorphism | Soft dual-shadow raised surfaces |
| Minimalist | Clean monochrome, hairline borders |

Themes are applied by setting `data-ui-theme` on `<body>` (see `src/lib/theme.ts`). All theme palettes are registered in one place, so a theme file can be swapped by changing the import in `src/app.css`:

```css
@import '@vultra/tokens/flat.css';
```

## Project structure

```
src/
├── app.css                    # token theme import (base.css registers all 9 signatures)
├── app.html
├── lib/
│   ├── theme.ts               # theme registry + localStorage persistence
│   └── components/
│       └── ThemeSwitcher.svelte
└── routes/
    ├── +layout.svelte         # app shell: sidebar + header + theme switcher
    ├── +page.svelte           # redirects to /dashboard
    ├── dashboard/             # stat cards + revenue bar chart
    ├── users/                 # DataTable (search/sort/paginate)
    ├── products/              # DataTable + category chips
    ├── orders/                # DataTable + status badges
    ├── settings/              # form: Input, Select, Switch
    └── login/                 # mock login form
```

## Stack

- SvelteKit 2 + Svelte 5 (runes)
- Tailwind CSS v4 (via `@tailwindcss/vite`)
- `@vultra/ui` components (`Card`, `Input`, `Select`, `Switch`, `Badge`, `Button`, `Label`)
- `@vultra/data-table` enterprise data grid
- `@vultra/tokens` theme CSS
- `lucide-svelte` icons
