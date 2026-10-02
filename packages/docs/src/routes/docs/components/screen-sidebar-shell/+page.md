# Screen Sidebar Shell

Dual-viewport responsive application shell featuring a desktop collapsible sidebar and mobile slide-out drawer with 100% backdrop scrim, body scroll lock, and Escape key dismissal.

## CLI Installation

```bash
npx @vultra/cli add screen-sidebar-shell
```

## Usage

```svelte
<script>
  import { ScreenSidebarShell } from '$lib/components/screen-sidebar-shell';
  import { LayoutDashboard, Receipt, Settings } from 'lucide-svelte';

  const navItems = [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Faktur', href: '/invoices', icon: Receipt, badge: '5' },
    { label: 'Pengaturan', href: '/settings', icon: Settings }
  ];
</script>

<ScreenSidebarShell appName="Vultra SaaS" {navItems}>
  <div class="p-6">
    <h1 class="text-2xl font-bold">Konten Halaman</h1>
  </div>
</ScreenSidebarShell>
```

## Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `appName` | `string` | `"Vultra Platform"` | Application brand title |
| `appLogoText` | `string` | `"VP"` | 2-letter logo badge |
| `userName` | `string` | `"Antonius Joshua"` | User profile name |
| `userRole` | `string` | `"Administrator"` | User profile role |
| `activeHref` | `string` | `"/dashboard"` | Active route path |
| `navItems` | `NavItem[]` | `[...]` | Navigation items array with icons |
| `onLogout` | `() => void` | `undefined` | Callback when logout button is tapped |
