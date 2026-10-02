# Screen Checkout Modal

Two-step checkout flow modal: Step 1 (Plan selection with monthly/annual period toggle) and Step 2 (QRIS & Virtual Account payment channel selector with live tax & fee breakdown).

## CLI Installation

```bash
npx @vultra/cli add screen-checkout-modal
```

## Usage

```svelte
<script>
  import { ScreenCheckoutModal } from '$lib/components/screen-checkout-modal';

  let open = $state(false);

  function handleSuccess(paymentDetails) {
    console.log('Payment initiated:', paymentDetails);
  }
</script>

<button onclick={() => (open = true)} class="px-4 py-2 bg-primary text-white rounded-xl">
  Buka Checkout
</button>

<ScreenCheckoutModal
  bind:open
  onClose={() => (open = false)}
  onSuccess={handleSuccess}
/>
```

## Features

- **Step 1:** Select between Starter and Pro plans with instant discount badges on annual billing.
- **Step 2:** Select payment gateway (QRIS, BCA VA, Mandiri VA) with transparent PPN 11% and gateway fee calculation.
- **Backdrop Scrim:** Closes on outside click, locks backdrop blur, dismisses on `Escape` key.
