import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../bloc/cart_bloc.dart';
import '../bloc/cart_event.dart';
import '../bloc/cart_state.dart';
import 'widgets/cart_content_widget.dart';

/// Top-level view container for Cart.
/// Injects BlocProvider and isolates Presentation from Business Logic.
class CartPage extends StatelessWidget {
  const CartPage({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (_) => CartBloc()..add(const CartEvent.load()),
      child: const _CartView(),
    );
  }
}

class _CartView extends StatelessWidget {
  const _CartView();

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final primaryColor = theme.colorScheme.primary;

    return Scaffold(
      backgroundColor: const Color(0xFFFBF9F9), // Ethereal Sand Canvas
      appBar: AppBar(
        title: const Text(
          'Cart',
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
            onPressed: () => context.read<CartBloc>().add(const CartEvent.refresh()),
          ),
        ],
      ),
      body: SafeArea(
        child: BlocBuilder<CartBloc, CartState>(
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
              loaded: (loaded) => CartContentWidget(
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
