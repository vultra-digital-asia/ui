# Screen Onboarding

Mobile-first onboarding carousel with value-proposition vector artwork, animated smooth progress dots, skip action, and high-conversion primary action button.

## CLI Installation

```bash
npx @vultra/cli add screen-onboarding
```

## Usage

```svelte
<script>
  import { ScreenOnboarding } from '$lib/components/screen-onboarding';
  import { Zap, ShieldCheck, Sparkles } from 'lucide-svelte';

  const steps = [
    { id: '1', title: 'Automasi Faktur', description: 'Kirim invoice otomatis via WhatsApp.', icon: Zap },
    { id: '2', title: 'Multi-Gateway', description: 'Terima QRIS & VA tanpa rekonsiliasi manual.', icon: Sparkles },
    { id: '3', title: 'Audit Finansial', description: 'Log transaksi aman dan terenkripsi.', icon: ShieldCheck }
  ];
</script>

<ScreenOnboarding
  {steps}
  onFinish={() => console.log('Onboarding complete')}
  onSkip={() => console.log('Onboarding skipped')}
/>
```

## Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `steps` | `OnboardingStep[]` | `[...]` | Carousel steps list with title, description, and icon |
| `onFinish` | `() => void` | `undefined` | Callback when user finishes last step |
| `onSkip` | `() => void` | `undefined` | Callback when user skips onboarding |
