import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../../bloc/subscription_bloc.dart';
import '../../bloc/subscription_event.dart';
import '../../models/subscription_model.dart';

/// Pure Presentational Widget for Subscription.
/// Receives immutable data, dispatches BLoC events, zero local business state.
class SubscriptionContentWidget extends StatelessWidget {
  final List<SubscriptionModel> items;
  final String searchQuery;
  final String statusFilter;

  const SubscriptionContentWidget({
    super.key,
    required this.items,
    required this.searchQuery,
    required this.statusFilter,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final primaryColor = theme.colorScheme.primary;

    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          const SizedBox(height: 8),
          // Search & Filter Bar
          _buildSearchAndFilters(context, primaryColor),
          const SizedBox(height: 16),
          // List / Cards
          Expanded(
            child: items.isEmpty
                ? const _EmptyStateView()
                : ListView.separated(
                    itemCount: items.length,
                    separatorBuilder: (_, __) => const SizedBox(height: 10),
                    itemBuilder: (context, index) {
                      final item = items[index];
                      return _buildItemCard(context, item, primaryColor);
                    },
                  ),
          ),
          const SizedBox(height: 12),
        ],
      ),
    );
  }

  Widget _buildSearchAndFilters(BuildContext context, Color primaryColor) {
    return Column(
      children: [
        Container(
          height: 44,
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(12),
            border: Border.all(color: const Color(0xFFE8E4DF)),
          ),
          padding: const EdgeInsets.symmetric(horizontal: 12),
          child: Row(
            children: [
              const Icon(Icons.search, size: 20, color: Color(0xFF6B6761)),
              const SizedBox(width: 8),
              Expanded(
                child: TextField(
                  onChanged: (val) {
                    context.read<SubscriptionBloc>().add(SubscriptionEvent.searchChanged(val));
                  },
                  decoration: const InputDecoration(
                    hintText: 'Search by keyword...',
                    hintStyle: TextStyle(fontSize: 13, color: Color(0xFF8E8E93)),
                    border: InputBorder.none,
                    isDense: true,
                  ),
                ),
              ),
            ],
          ),
        ),
        const SizedBox(height: 10),
        // Filter pills
        SingleChildScrollView(
          scrollDirection: Axis.horizontal,
          child: Row(
            children: [
              _buildFilterPill(context, 'all', 'All Status', primaryColor),
              const SizedBox(width: 8),
              _buildFilterPill(context, 'active', 'Active', primaryColor),
              const SizedBox(width: 8),
              _buildFilterPill(context, 'trial', 'Trial', primaryColor),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildFilterPill(
    BuildContext context,
    String value,
    String label,
    Color primaryColor,
  ) {
    final isSelected = statusFilter.toLowerCase() == value.toLowerCase();
    return GestureDetector(
      onTap: () {
        HapticFeedback.selectionClick();
        context.read<SubscriptionBloc>().add(SubscriptionEvent.filterChanged(value));
      },
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 150),
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
        decoration: BoxDecoration(
          color: isSelected ? primaryColor : Colors.white,
          borderRadius: BorderRadius.circular(20),
          border: Border.all(
            color: isSelected ? primaryColor : const Color(0xFFE8E4DF),
          ),
        ),
        child: Text(
          label,
          style: TextStyle(
            fontSize: 12,
            fontWeight: isSelected ? FontWeight.w600 : FontWeight.w500,
            color: isSelected ? Colors.white : const Color(0xFF6B6761),
          ),
        ),
      ),
    );
  }

  Widget _buildItemCard(
    BuildContext context,
    SubscriptionModel item,
    Color primaryColor,
  ) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16), // Apple HIG continuous squircle standard
        border: Border.all(color: const Color(0xFFE8E4DF)),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.02),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Row(
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  item.name,
                  style: const TextStyle(
                    fontSize: 15,
                    fontWeight: FontWeight.w600,
                    color: Color(0xFF1B1C1C),
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  item.email,
                  style: const TextStyle(
                    fontSize: 12,
                    color: Color(0xFF6B6761),
                  ),
                ),
              ],
            ),
          ),
          Column(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              Text(
                '\$${item.amount.toStringAsFixed(0)}',
                style: const TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.w700,
                  fontFeatures: [FontFeature.tabularFigures()],
                  color: Color(0xFF1B1C1C),
                ),
              ),
              const SizedBox(height: 4),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                decoration: BoxDecoration(
                  color: item.status.toLowerCase() == 'active'
                      ? const Color(0xFF2F6B57).withOpacity(0.12)
                      : Colors.orange.withOpacity(0.12),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Text(
                  item.status,
                  style: TextStyle(
                    fontSize: 11,
                    fontWeight: FontWeight.w600,
                    color: item.status.toLowerCase() == 'active'
                        ? const Color(0xFF2F6B57)
                        : Colors.orange.shade800,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(width: 8),
          IconButton(
            icon: const Icon(Icons.delete_outline, size: 18, color: Color(0xFF8E8E93)),
            onPressed: () {
              HapticFeedback.lightImpact();
              context.read<SubscriptionBloc>().add(SubscriptionEvent.deleteRequested(item.id));
            },
          ),
        ],
      ),
    );
  }
}

class _EmptyStateView extends StatelessWidget {
  const _EmptyStateView();

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: const [
          Icon(Icons.inbox_outlined, size: 48, color: Color(0xFF8E8E93)),
          SizedBox(height: 12),
          Text(
            'No records match your criteria',
            style: TextStyle(fontSize: 14, color: Color(0xFF6B6761), fontWeight: FontWeight.w500),
          ),
        ],
      ),
    );
  }
}
