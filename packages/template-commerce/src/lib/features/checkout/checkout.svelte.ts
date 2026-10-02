export type PaymentMethod = 'qris' | 'va_bca' | 'va_mandiri' | 'card';

export interface ShippingAddress {
  fullName: string;
  phone: string;
  street: string;
  city: string;
  postalCode: string;
}

export function createCheckoutFeature() {
  let address = $state<ShippingAddress>({
    fullName: 'Antonius Joshua',
    phone: '081234567890',
    street: 'Jl. Senopati No. 42',
    city: 'Jakarta Selatan',
    postalCode: '12190',
  });

  let selectedPayment = $state<PaymentMethod>('qris');
  let isSubmitting = $state(false);
  let orderNumber = $state<string | null>(null);

  async function submitOrder(grandTotal: number) {
    isSubmitting = true;
    // Simulate payment intent creation
    await new Promise((r) => setTimeout(r, 600));
    orderNumber = `VLT-${Math.floor(100000 + Math.random() * 900000)}`;
    isSubmitting = false;
    return {
      success: true,
      orderNumber,
      amount: grandTotal,
      paymentMethod: selectedPayment,
    };
  }

  return {
    get address() { return address; },
    get selectedPayment() { return selectedPayment; },
    set selectedPayment(v: PaymentMethod) { selectedPayment = v; },
    get isSubmitting() { return isSubmitting; },
    get orderNumber() { return orderNumber; },
    submitOrder,
  };
}

export const checkoutFeature = createCheckoutFeature();
