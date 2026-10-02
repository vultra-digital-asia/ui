export interface Plan {
  id: string;
  name: string;
  priceMonthly: number;
  priceAnnual: number;
  features: string[];
  popular?: boolean;
}

export function createBillingFeature() {
  let isAnnual = $state(true);
  let selectedPlanId = $state<string>('pro');
  let checkoutOpen = $state(false);

  const plans: Plan[] = [
    {
      id: 'starter',
      name: 'Starter',
      priceMonthly: 29,
      priceAnnual: 24,
      features: ['Up to 5 team members', '10,000 monthly events', 'Standard email support', 'Community access']
    },
    {
      id: 'pro',
      name: 'Professional',
      priceMonthly: 79,
      priceAnnual: 64,
      popular: true,
      features: ['Unlimited team members', '250,000 monthly events', 'Priority 24/7 support', 'Custom domain & SSO', 'Advanced analytics']
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      priceMonthly: 299,
      priceAnnual: 249,
      features: ['Unlimited capacity', 'Dedicated account manager', '99.99% uptime SLA', 'Custom contract & invoicing', 'Self-hosted option']
    }
  ];

  const selectedPlan = $derived(
    plans.find(p => p.id === selectedPlanId) ?? plans[1]
  );

  function startCheckout(planId: string) {
    selectedPlanId = planId;
    checkoutOpen = true;
  }

  function closeCheckout() {
    checkoutOpen = false;
  }

  return {
    get isAnnual() { return isAnnual; },
    set isAnnual(v: boolean) { isAnnual = v; },
    get selectedPlanId() { return selectedPlanId; },
    set selectedPlanId(v: string) { selectedPlanId = v; },
    get checkoutOpen() { return checkoutOpen; },
    set checkoutOpen(v: boolean) { checkoutOpen = v; },
    get plans() { return plans; },
    get selectedPlan() { return selectedPlan; },
    startCheckout,
    closeCheckout
  };
}
