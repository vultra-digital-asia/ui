# Components

Every component is a standalone source file you can copy into your project — either with the CLI or manually from the source on GitHub.

## Using the CLI

```bash
npx @vultra/cli add <component-name>
```

The CLI resolves transitive dependencies automatically. For example, `pagination` pulls in `button`.

## Base Components

| Component | Description | Install |
|-----------|-------------|---------|
| [Accordion](/docs/components/accordion) | Collapsible content sections | `npx @vultra/cli add accordion` |
| [Alert](/docs/components/alert) | Feedback messages | `npx @vultra/cli add alert` |
| [Badge](/docs/components/badge) | Status labels | `npx @vultra/cli add badge` |
| [Button](/docs/components/button) | Actions and links | `npx @vultra/cli add button` |
| [Card](/docs/components/card) | Content containers | `npx @vultra/cli add card` |
| [Dialog](/docs/components/dialog) | Modal overlays | `npx @vultra/cli add dialog` |
| [Dropdown Menu](/docs/components/dropdown-menu) | Context actions | `npx @vultra/cli add dropdown-menu` |
| [Input](/docs/components/input) | Text fields | `npx @vultra/cli add input` |
| [Tabs](/docs/components/tabs) | Tabbed content | `npx @vultra/cli add tabs` |
| [Toast](/docs/components/toast) | Notifications | `npx @vultra/cli add toast` |

## Composite Components (from ui.live)

| Component | Description | Status |
|-----------|-------------|--------|
| [Carousel](/docs/components/carousel) | Swipeable carousel | Planned |
| [Hero](/docs/components/hero) | Landing hero section | Planned |
