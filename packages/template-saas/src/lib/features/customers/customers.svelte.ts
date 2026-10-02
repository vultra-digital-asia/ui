export interface Customer {
  id: string;
  name: string;
  email: string;
  plan: 'Starter' | 'Pro' | 'Enterprise';
  status: 'Active' | 'Trial' | 'Churned';
  mrr: number;
  joinDate: string;
}

export function createCustomersFeature() {
  let search = $state('');
  let statusFilter = $state<string>('all');
  
  const initialCustomers: Customer[] = [
    { id: 'cust_1', name: 'Acme Corp', email: 'billing@acme.com', plan: 'Enterprise', status: 'Active', mrr: 1250, joinDate: '2026-01-15' },
    { id: 'cust_2', name: 'Linear Labs', email: 'ops@linearlabs.dev', plan: 'Pro', status: 'Active', mrr: 450, joinDate: '2026-02-01' },
    { id: 'cust_3', name: 'Vultra Systems', email: 'finance@vultra.id', plan: 'Enterprise', status: 'Active', mrr: 2400, joinDate: '2026-02-14' },
    { id: 'cust_4', name: 'CloudScale', email: 'hello@cloudscale.net', plan: 'Starter', status: 'Trial', mrr: 99, joinDate: '2026-03-01' },
    { id: 'cust_5', name: 'Sandpaper Studio', email: 'art@sandpaper.io', plan: 'Pro', status: 'Churned', mrr: 0, joinDate: '2026-01-20' },
    { id: 'cust_6', name: 'Svelte Masters', email: 'hi@sveltemasters.tech', plan: 'Pro', status: 'Active', mrr: 450, joinDate: '2026-03-10' }
  ];

  let customers = $state<Customer[]>(initialCustomers);

  const filteredCustomers = $derived(
    customers.filter((c) => {
      const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'all' || c.status.toLowerCase() === statusFilter.toLowerCase();
      return matchesSearch && matchesStatus;
    })
  );

  const totalMrr = $derived(
    customers.reduce((acc, c) => acc + (c.status === 'Active' ? c.mrr : 0), 0)
  );

  return {
    get search() { return search; },
    set search(v: string) { search = v; },
    get statusFilter() { return statusFilter; },
    set statusFilter(v: string) { statusFilter = v; },
    get customers() { return filteredCustomers; },
    get totalMrr() { return totalMrr; },
    removeCustomer: (id: string) => {
      customers = customers.filter(c => c.id !== id);
    }
  };
}
