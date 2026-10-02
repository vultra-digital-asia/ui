import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../bloc/subscription_bloc.dart';
import '../bloc/subscription_event.dart';
import '../bloc/subscription_state.dart';
import 'widgets/subscription_content_widget.dart';

/// Top-level view container for Subscription.
/// Injects BlocProvider and isolates Presentation from Business Logic.
class SubscriptionPage extends StatelessWidget {
  const SubscriptionPage({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (_) => SubscriptionBloc()..add(const SubscriptionEvent.load()),
      child: const _SubscriptionView(),
    );
  }
}

class _SubscriptionView extends StatelessWidget {
  const _SubscriptionView();

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final primaryColor = theme.colorScheme.primary;

    return Scaffold(
      backgroundColor: const Color(0xFFFBF9F9), // Ethereal Sand Canvas
      appBar: AppBar(
        title: const Text(
          'Subscription',
          style: TextStyle(
            color: Color(0xFF1B1C1C),
            fontSize: 18,
            fontWeight: FontWeight.w700,
            letterSpacing: -0.2,
          ),
        ),
        backgroundColor: Colors.transparent,
        elevation: 0,
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh_rounded, color: Color(0xFF6B6761)),
            onPressed: () => context.read<SubscriptionBloc>().add(const SubscriptionEvent.refresh()),
          ),
        ],
      ),
      body: SafeArea(
        child: BlocBuilder<SubscriptionBloc, SubscriptionState>(
          builder: (context, state) {
            return state.map(
              initial: (_) => const SizedBox.shrink(),
              loading: (_) => const Center(
                child: CircularProgressIndicator(strokeWidth: 2.5),
              ),
              error: (err) => Center(
                child: Padding(
                  padding: const EdgeInsets.all(24.0),
                  child: Text(
                    'Error: ${err.message}',
                    style: const TextStyle(color: Colors.redAccent, fontSize: 13),
                  ),
                ),
              ),
              loaded: (loaded) => SubscriptionContentWidget(
                items: loaded.filteredItems,
                searchQuery: loaded.searchQuery,
                statusFilter: loaded.statusFilter,
              ),
            );
          },
        ),
      ),
    );
  }
}
