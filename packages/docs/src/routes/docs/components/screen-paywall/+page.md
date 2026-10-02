# Screen Paywall

High-converting mobile and web subscription paywall with monthly/annual period selection, squircle continuous corners, feature checkmarks, and restore purchase action.

## CLI Installation

```bash
npx @vultra/cli add screen-paywall
```

## Usage

```svelte
<script>
  import { ScreenPaywall } from '$lib/components/screen-paywall';

  function handleSelect(planId) {
    console.log('Selected plan:', planId);
  }

  function handleRestore() {
    console.log('Restoring purchases...');
  }
</script>

<ScreenPaywall
  title="Tingkatkan ke Akses Pro"
  subtitle="Buka seluruh automasi faktur dan integrasi WhatsApp."
  onSelect={handleSelect}
  onRestore={handleRestore}
/>
```

## Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `title` | `string` | `"Tingkatkan ke Akses Pro"` | Paywall headline |
| `subtitle` | `string` | `...` | Sub-headline value proposition |
| `features` | `string[]` | `[...]` | List of bullet points with checkmarks |
| `plans` | `PaywallPlan[]` | `[...]` | Plan options with price, billing period, badge |
| `selectedPlanId` | `string` | `"annual"` | Bound selected plan ID |
| `ctaText` | `string` | `"Mulai 7 Hari Uji Coba Gratis"` | Primary action text |
| `disclaimer` | `string` | `...` | Legal/refund disclaimer at bottom |
| `showClose` | `boolean` | `true` | Show close button at top-left |
| `onSelect` | `(id: string) => void` | `undefined` | Callback when plan or CTA is clicked |
| `onRestore` | `() => void` | `undefined` | Callback for Apple/Google restore purchases |
| `onClose` | `() => void` | `undefined` | Callback when close button is clicked |
