import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../bloc/catalog_bloc.dart';
import '../bloc/catalog_event.dart';
import '../bloc/catalog_state.dart';
import 'widgets/catalog_content_widget.dart';

/// Top-level view container for Catalog.
/// Injects BlocProvider and isolates Presentation from Business Logic.
class CatalogPage extends StatelessWidget {
  const CatalogPage({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (_) => CatalogBloc()..add(const CatalogEvent.load()),
      child: const _CatalogView(),
    );
  }
}

class _CatalogView extends StatelessWidget {
  const _CatalogView();

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final primaryColor = theme.colorScheme.primary;

    return Scaffold(
      backgroundColor: const Color(0xFFFBF9F9), // Ethereal Sand Canvas
      appBar: AppBar(
        title: const Text(
          'Catalog',
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
            onPressed: () => context.read<CatalogBloc>().add(const CatalogEvent.refresh()),
          ),
        ],
      ),
      body: SafeArea(
        child: BlocBuilder<CatalogBloc, CatalogState>(
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
              loaded: (loaded) => CatalogContentWidget(
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
