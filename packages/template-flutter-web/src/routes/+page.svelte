<script lang="ts">
  import {
    Smartphone,
    CreditCard,
    ShoppingBag,
    Layers,
    Code,
    Activity,
    Check,
    ChevronRight,
    Search,
    Plus,
    Minus,
    ArrowUpRight,
    Terminal,
    Sparkles,
    ShieldCheck
  } from 'lucide-svelte';

  // Active simulated mobile screen
  let activeScreen = $state<'subscription' | 'catalog' | 'cart'>('subscription');
  let annualBilling = $state(false);
  let selectedPlan = $state<'starter' | 'pro' | 'enterprise'>('pro');
  let isUpgrading = $state(false);

  // Cart state
  interface CartItem {
    id: string;
    name: string;
    price: number;
    qty: number;
    category: string;
  }

  let cart = $state<CartItem[]>([
    { id: '1', name: 'Terracotta Overshirt', price: 185, qty: 1, category: 'Outerwear' },
    { id: '2', name: 'Minimalist Minimal Derby', price: 290, qty: 1, category: 'Footwear' },
  ]);

  let catalogCategory = $state('all');

  const catalogItems = [
    { id: '1', name: 'Terracotta Overshirt', price: 185, category: 'outerwear', stock: 12 },
    { id: '2', name: 'Minimalist Minimal Derby', price: 290, category: 'footwear', stock: 5 },
    { id: '3', name: 'Tactile Sand Tote', price: 140, category: 'accessories', stock: 8 },
    { id: '4', name: 'Pleated Raw Chino', price: 165, category: 'bottoms', stock: 15 },
  ];

  // BLoC Event Stream Log
  interface BlocLog {
    time: string;
    bloc: string;
    type: 'EVENT' | 'STATE';
    name: string;
    payload: string;
  }

  let blocLogs = $state<BlocLog[]>([
    { time: '12:00:01', bloc: 'SubscriptionBloc', type: 'EVENT', name: 'SubscriptionEvent.started()', payload: '{}' },
    { time: '12:00:02', bloc: 'SubscriptionBloc', type: 'STATE', name: 'SubscriptionState.loaded()', payload: '{ currentPlan: "starter", isAnnual: false }' },
  ]);

  function logBloc(bloc: string, type: 'EVENT' | 'STATE', name: string, payload: string) {
    const time = new Date().toTimeString().split(' ')[0];
    blocLogs = [{ time, bloc, type, name, payload }, ...blocLogs.slice(0, 19)];
  }

  function handleSelectPlan(plan: 'starter' | 'pro' | 'enterprise') {
    selectedPlan = plan;
    logBloc('SubscriptionBloc', 'EVENT', `SubscriptionEvent.planSelected("${plan}")`, JSON.stringify({ plan }));
  }

  function handleToggleBilling() {
    annualBilling = !annualBilling;
    logBloc('SubscriptionBloc', 'EVENT', `SubscriptionEvent.billingToggled(${annualBilling})`, JSON.stringify({ isAnnual: annualBilling }));
  }

  function handleUpgrade() {
    isUpgrading = true;
    logBloc('SubscriptionBloc', 'EVENT', `SubscriptionEvent.upgradeRequested("${selectedPlan}")`, JSON.stringify({ plan: selectedPlan, annual: annualBilling }));
    setTimeout(() => {
      isUpgrading = false;
      logBloc('SubscriptionBloc', 'STATE', `SubscriptionState.upgradeSuccess("${selectedPlan}")`, JSON.stringify({ activePlan: selectedPlan, status: 'active' }));
    }, 800);
  }

  function addToCart(item: typeof catalogItems[0]) {
    const existing = cart.find((c) => c.id === item.id);
    if (existing) {
      existing.qty++;
    } else {
      cart.push({ id: item.id, name: item.name, price: item.price, qty: 1, category: item.category });
    }
    logBloc('CartBloc', 'EVENT', `CartEvent.itemAdded("${item.id}")`, JSON.stringify(item));
  }

  const subtotal = $derived(cart.reduce((sum, item) => sum + item.price * item.qty, 0));

  // Active Code Snippet Tab
  let activeCodeTab = $state<'bloc' | 'event' | 'state' | 'widget'>('bloc');

  const DART_BLOC_CODE = `import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:freezed_annotation/freezed_annotation.dart';

part 'subscription_bloc.freezed.dart';
part 'subscription_event.dart';
part 'subscription_state.dart';

class SubscriptionBloc extends Bloc<SubscriptionEvent, SubscriptionState> {
  SubscriptionBloc() : super(const SubscriptionState.initial()) {
    on<_Started>((event, emit) async {
      emit(const SubscriptionState.loading());
      // Pure domain logic: zero UI dependencies
      emit(const SubscriptionState.loaded(currentPlan: 'starter'));
    });

    on<_UpgradeRequested>((event, emit) async {
      emit(const SubscriptionState.upgrading());
      await Future.delayed(const Duration(milliseconds: 600));
      emit(SubscriptionState.upgradeSuccess(plan: event.plan));
    });
  }
}`;

  const DART_EVENT_CODE = `part of 'subscription_bloc.dart';

@freezed
class SubscriptionEvent with _$SubscriptionEvent {
  const factory SubscriptionEvent.started() = _Started;
  const factory SubscriptionEvent.planSelected(String plan) = _PlanSelected;
  const factory SubscriptionEvent.billingToggled(bool isAnnual) = _BillingToggled;
  const factory SubscriptionEvent.upgradeRequested(String plan) = _UpgradeRequested;
}`;

  const DART_STATE_CODE = `part of 'subscription_bloc.dart';

@freezed
class SubscriptionState with _$SubscriptionState {
  const factory SubscriptionState.initial() = _Initial;
  const factory SubscriptionState.loading() = _Loading;
  const factory SubscriptionState.loaded({
    required String currentPlan,
    @Default(false) bool isAnnual,
  }) = _Loaded;
  const factory SubscriptionState.upgrading() = _Upgrading;
  const factory SubscriptionState.upgradeSuccess({required String plan}) = _UpgradeSuccess;
  const factory SubscriptionState.error({required String message}) = _Error;
}`;
</script>

<svelte:head>
  <title>Flutter BLoC Starter Kit Live | Vultra</title>
  <meta name="description" content="Clean Architecture Flutter BLoC + Freezed mobile template simulator." />
</svelte:head>

<div class="min-h-screen bg-[#FBF9F9] text-[#1B1C1C] font-sans antialiased">
  <!-- Header -->
  <header class="border-b border-[#E8E4E1] bg-white/80 backdrop-blur-md px-6 py-4 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      <div class="flex items-center gap-3">
        <a href="https://ui.vultra.id" class="flex items-center gap-2.5 font-black text-lg tracking-tight">
          <span class="size-7 rounded-lg bg-[#A13F20] text-white flex items-center justify-center text-xs font-bold shadow-sm">V</span>
          <span>Vultra UI</span>
        </a>
        <span class="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#A13F20]/10 text-[#A13F20]">Flutter BLoC Starter</span>
      </div>

      <div class="flex items-center gap-3">
        <a
          href="https://ui.vultra.id/screens"
          class="text-xs font-semibold px-3 py-1.5 rounded-lg border border-[#E8E4E1] bg-white hover:bg-[#F5F2F0] transition-colors"
        >
          Web Benchmark Screens
        </a>
        <a
          href="https://github.com/vultra-digital-asia/ui/tree/main/packages/template-flutter"
          target="_blank"
          class="text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#1B1C1C] text-white hover:bg-black transition-colors"
        >
          View Flutter Repo
        </a>
      </div>
    </div>
  </header>

  <main class="max-w-7xl mx-auto px-6 py-8">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <!-- Left Column: Interactive Mobile Simulator (5 Cols) -->
      <div class="lg:col-span-5 flex flex-col items-center">
        <!-- Screen Selector Tabs -->
        <div class="inline-flex items-center gap-1 p-1 bg-[#F5F2F0] rounded-xl border border-[#E8E4E1] mb-6">
          <button
            onclick={() => activeScreen = 'subscription'}
            class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all {activeScreen === 'subscription' ? 'bg-[#1B1C1C] text-white shadow-sm' : 'text-[#6E6B68] hover:text-[#1B1C1C]'}"
          >
            Subscription BLoC
          </button>
          <button
            onclick={() => activeScreen = 'catalog'}
            class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all {activeScreen === 'catalog' ? 'bg-[#1B1C1C] text-white shadow-sm' : 'text-[#6E6B68] hover:text-[#1B1C1C]'}"
          >
            Catalog BLoC
          </button>
          <button
            onclick={() => activeScreen = 'cart'}
            class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all {activeScreen === 'cart' ? 'bg-[#1B1C1C] text-white shadow-sm' : 'text-[#6E6B68] hover:text-[#1B1C1C]'}"
          >
            Cart BLoC ({cart.length})
          </button>
        </div>

        <!-- iPhone 16 Pro Frame Shell -->
        <div class="relative w-[340px] h-[690px] bg-black rounded-[48px] p-3 shadow-2xl ring-1 ring-black/20 border-4 border-[#27272A]">
          <!-- Dynamic Island -->
          <div class="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-30 flex items-center justify-between px-2">
            <div class="size-2 rounded-full bg-neutral-800"></div>
            <div class="size-2.5 rounded-full bg-neutral-900 border border-neutral-700"></div>
          </div>

          <!-- Screen Display -->
          <div class="w-full h-full bg-[#FBF9F9] text-[#1B1C1C] rounded-[38px] overflow-hidden flex flex-col relative select-none">
            <!-- iOS Status Bar -->
            <div class="pt-3 px-6 pb-2 flex items-center justify-between text-[11px] font-semibold tracking-tight text-[#1B1C1C]">
              <span>9:41</span>
              <div class="flex items-center gap-1.5">
                <span class="text-[9px] font-bold">5G</span>
                <div class="w-4 h-2 border border-[#1B1C1C] rounded-sm p-0.5 flex items-center">
                  <div class="w-full h-full bg-[#1B1C1C] rounded-2xs"></div>
                </div>
              </div>
            </div>

            <!-- Mobile Screen Content -->
            <div class="flex-1 overflow-y-auto px-4 py-3">
              {#if activeScreen === 'subscription'}
                <!-- Subscription Feature View -->
                <div class="space-y-4">
                  <div>
                    <span class="text-[10px] font-bold tracking-wider uppercase text-[#A13F20]">Premium Tier</span>
                    <h2 class="text-xl font-black tracking-tight text-[#1B1C1C]">Upgrade Plan</h2>
                    <p class="text-xs text-[#6E6B68] mt-0.5">Scale your engineering workflow with Clean Architecture BLoC.</p>
                  </div>

                  <!-- Annual Billing Pill -->
                  <div class="flex items-center justify-between p-2.5 rounded-2xl bg-white border border-[#E8E4E1]">
                    <span class="text-xs font-semibold text-[#1B1C1C]">Annual Billing (Save 20%)</span>
                    <button
                      onclick={handleToggleBilling}
                      class="w-10 h-5 rounded-full p-0.5 transition-colors {annualBilling ? 'bg-[#A13F20]' : 'bg-[#E8E4E1]'}"
                    >
                      <div class="size-4 rounded-full bg-white transition-transform {annualBilling ? 'translate-x-5' : 'translate-x-0'}"></div>
                    </button>
                  </div>

                  <!-- Plan Cards -->
                  <div class="space-y-2.5">
                    <button
                      onclick={() => handleSelectPlan('starter')}
                      class="w-full text-left p-3.5 rounded-2xl border transition-all {selectedPlan === 'starter' ? 'border-[#A13F20] bg-[#A13F20]/5' : 'border-[#E8E4E1] bg-white'}"
                    >
                      <div class="flex justify-between items-center mb-1">
                        <span class="font-bold text-xs">Starter Developer</span>
                        <span class="font-mono text-xs font-bold">$0</span>
                      </div>
                      <p class="text-[10px] text-[#6E6B68]">Individual sandbox & basic CLI generators</p>
                    </button>

                    <button
                      onclick={() => handleSelectPlan('pro')}
                      class="w-full text-left p-3.5 rounded-2xl border transition-all {selectedPlan === 'pro' ? 'border-[#A13F20] bg-[#A13F20]/5' : 'border-[#E8E4E1] bg-white'}"
                    >
                      <div class="flex justify-between items-center mb-1">
                        <span class="font-bold text-xs flex items-center gap-1.5">
                          Pro Studio
                          <span class="text-[9px] px-1.5 py-0.2 rounded-full bg-[#A13F20] text-white">Popular</span>
                        </span>
                        <span class="font-mono text-xs font-bold">{annualBilling ? '$39' : '$49'} / mo</span>
                      </div>
                      <p class="text-[10px] text-[#6E6B68]">Unlimited BLoC generation, Figma token sync & AI vision</p>
                    </button>

                    <button
                      onclick={() => handleSelectPlan('enterprise')}
                      class="w-full text-left p-3.5 rounded-2xl border transition-all {selectedPlan === 'enterprise' ? 'border-[#A13F20] bg-[#A13F20]/5' : 'border-[#E8E4E1] bg-white'}"
                    >
                      <div class="flex justify-between items-center mb-1">
                        <span class="font-bold text-xs">Enterprise Grid</span>
                        <span class="font-mono text-xs font-bold">$199 / mo</span>
                      </div>
                      <p class="text-[10px] text-[#6E6B68]">Private MCP servers, custom tokens & dedicated registry</p>
                    </button>
                  </div>

                  <!-- CTA Button -->
                  <button
                    onclick={handleUpgrade}
                    disabled={isUpgrading}
                    class="w-full py-3 rounded-2xl text-xs font-bold bg-[#A13F20] text-white hover:bg-[#8D351A] transition-all shadow-md active:scale-98 flex items-center justify-center gap-2"
                  >
                    {#if isUpgrading}
                      <span>Dispatching BLoC Event...</span>
                    {:else}
                      <span>Confirm Upgrade to {selectedPlan.toUpperCase()}</span>
                      <ArrowUpRight class="size-3.5" />
                    {/if}
                  </button>
                </div>
              {:else if activeScreen === 'catalog'}
                <!-- Catalog Feature View -->
                <div class="space-y-3">
                  <div class="flex items-center justify-between">
                    <h2 class="text-lg font-black tracking-tight">Atelier Store</h2>
                    <span class="text-[10px] font-mono font-bold text-[#A13F20]">4 items</span>
                  </div>

                  <div class="grid grid-cols-2 gap-2.5">
                    {#each catalogItems as item}
                      <div class="p-2.5 rounded-2xl bg-white border border-[#E8E4E1] flex flex-col justify-between">
                        <div class="w-full h-20 rounded-xl bg-[#F5F2F0] mb-2 flex items-center justify-center font-bold text-xs text-[#A13F20]">
                          {item.name.slice(0, 2)}
                        </div>
                        <div class="text-[11px] font-bold text-[#1B1C1C] truncate">{item.name}</div>
                        <div class="flex items-center justify-between mt-2">
                          <span class="text-xs font-mono font-bold">${item.price}</span>
                          <button
                            onclick={() => addToCart(item)}
                            class="size-6 rounded-lg bg-[#1B1C1C] text-white flex items-center justify-center text-xs hover:bg-[#A13F20] transition-colors"
                          >
                            <Plus class="size-3.5" />
                          </button>
                        </div>
                      </div>
                    {/each}
                  </div>
                </div>
              {:else if activeScreen === 'cart'}
                <!-- Cart Feature View -->
                <div class="space-y-3">
                  <h2 class="text-lg font-black tracking-tight">Your Cart</h2>
                  <div class="space-y-2">
                    {#each cart as item}
                      <div class="p-2.5 rounded-xl bg-white border border-[#E8E4E1] flex items-center justify-between">
                        <div class="min-w-0">
                          <div class="text-xs font-bold text-[#1B1C1C] truncate">{item.name}</div>
                          <div class="text-[10px] text-[#6E6B68] font-mono">${item.price} x {item.qty}</div>
                        </div>
                        <div class="font-mono text-xs font-bold text-[#A13F20]">
                          ${item.price * item.qty}
                        </div>
                      </div>
                    {/each}
                  </div>

                  <div class="pt-3 border-t border-[#E8E4E1] flex justify-between items-center text-xs font-bold">
                    <span>Total Amount</span>
                    <span class="font-mono text-sm text-[#A13F20]">${subtotal}</span>
                  </div>

                  <button
                    class="w-full py-2.5 rounded-xl bg-[#1B1C1C] text-white text-xs font-bold hover:bg-black transition-colors"
                  >
                    Proceed to Apple Pay
                  </button>
                </div>
              {/if}
            </div>

            <!-- iOS Home Indicator -->
            <div class="h-5 flex items-center justify-center">
              <div class="w-32 h-1 bg-black/30 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: BLoC Inspector & Code Explorer (7 Cols) -->
      <div class="lg:col-span-7 space-y-6">
        <!-- BLoC Architecture Banner -->
        <div class="p-5 rounded-2xl border border-[#E8E4E1] bg-white shadow-sm flex items-start gap-4">
          <div class="p-3 rounded-xl bg-[#A13F20]/10 text-[#A13F20] shrink-0">
            <ShieldCheck class="size-6" />
          </div>
          <div>
            <h3 class="font-extrabold text-sm text-[#1B1C1C]">Clean Architecture + Freezed Separation</h3>
            <p class="text-xs text-[#6E6B68] mt-1 leading-relaxed">
              Every Flutter feature strictly decouples business logic from presentation widgets. State models use <code>@freezed</code> for pattern matching and immutability, while <code>BlocBuilder</code> ensures atomic UI rebuilds.
            </p>
          </div>
        </div>

        <!-- BLoC Stream Inspector Console -->
        <div class="rounded-2xl border border-[#E8E4E1] bg-white overflow-hidden shadow-sm">
          <div class="bg-[#18181B] px-4 py-3 border-b border-neutral-800 flex items-center justify-between text-xs text-neutral-300">
            <div class="flex items-center gap-2">
              <Terminal class="size-4 text-emerald-400" />
              <span class="font-mono font-semibold">Live BLoC Stream Inspector</span>
            </div>
            <span class="text-[10px] text-neutral-400 font-mono">Stream&lt;State&gt;</span>
          </div>
          <div class="p-4 bg-[#09090B] font-mono text-[11px] space-y-2 max-h-48 overflow-y-auto">
            {#each blocLogs as log}
              <div class="flex items-start gap-2 leading-relaxed">
                <span class="text-neutral-500 shrink-0">{log.time}</span>
                <span class="px-1.5 py-0.2 rounded text-[9px] font-bold {log.type === 'EVENT' ? 'bg-amber-950 text-amber-300' : 'bg-emerald-950 text-emerald-300'}">
                  {log.type}
                </span>
                <span class="text-neutral-300 shrink-0 font-semibold">{log.bloc}:</span>
                <span class="text-neutral-100 font-bold">{log.name}</span>
                <span class="text-neutral-400 truncate">{log.payload}</span>
              </div>
            {/each}
          </div>
        </div>

        <!-- Dart Code Explorer Tabs -->
        <div class="rounded-2xl border border-[#E8E4E1] bg-white overflow-hidden shadow-sm">
          <div class="flex items-center justify-between border-b border-[#E8E4E1] px-4 bg-[#F5F2F0]">
            <div class="flex items-center gap-1">
              <button
                onclick={() => activeCodeTab = 'bloc'}
                class="px-3 py-2.5 text-xs font-semibold border-b-2 transition-all {activeCodeTab === 'bloc' ? 'border-[#A13F20] text-[#A13F20]' : 'border-transparent text-[#6E6B68] hover:text-[#1B1C1C]'}"
              >
                subscription_bloc.dart
              </button>
              <button
                onclick={() => activeCodeTab = 'event'}
                class="px-3 py-2.5 text-xs font-semibold border-b-2 transition-all {activeCodeTab === 'event' ? 'border-[#A13F20] text-[#A13F20]' : 'border-transparent text-[#6E6B68] hover:text-[#1B1C1C]'}"
              >
                subscription_event.dart
              </button>
              <button
                onclick={() => activeCodeTab = 'state'}
                class="px-3 py-2.5 text-xs font-semibold border-b-2 transition-all {activeCodeTab === 'state' ? 'border-[#A13F20] text-[#A13F20]' : 'border-transparent text-[#6E6B68] hover:text-[#1B1C1C]'}"
              >
                subscription_state.dart
              </button>
            </div>
          </div>

          <div class="p-4 bg-[#18181B] text-neutral-200">
            <pre class="font-mono text-xs overflow-x-auto text-sky-300 leading-relaxed max-h-72"><code>{#if activeCodeTab === 'bloc'}{DART_BLOC_CODE}{:else if activeCodeTab === 'event'}{DART_EVENT_CODE}{:else}{DART_STATE_CODE}{/if}</code></pre>
          </div>
        </div>
      </div>
    </div>
  </main>
</div>
