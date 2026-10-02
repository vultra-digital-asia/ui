import 'package:flutter_bloc/flutter_bloc.dart';
import 'cart_event.dart';
import 'cart_state.dart';
import '../models/cart_model.dart';

/// Business logic controller for Cart feature.
/// Handles pure domain operations, state transitions, and repository interaction.
class CartBloc extends Bloc<CartEvent, CartState> {
  CartBloc() : super(const CartState.initial()) {
    on<CartEvent>((event, emit) async {
      await event.map(
        load: (e) async => _onLoad(e, emit),
        refresh: (e) async => _onRefresh(e, emit),
        searchChanged: (e) async => _onSearchChanged(e, emit),
        filterChanged: (e) async => _onFilterChanged(e, emit),
        deleteRequested: (e) async => _onDeleteRequested(e, emit),
      );
    });
  }

  Future<void> _onLoad(dynamic event, Emitter<CartState> emit) async {
    emit(const CartState.loading());
    try {
      // Simulate fetch or call domain repository
      await Future<void>.delayed(const Duration(milliseconds: 300));
      final mockData = _getMockData();
      emit(CartState.loaded(
        items: mockData,
        filteredItems: mockData,
      ));
    } catch (e) {
      emit(CartState.error(e.toString()));
    }
  }

  Future<void> _onRefresh(dynamic event, Emitter<CartState> emit) async {
    final currentState = state;
    if (currentState is! _Loaded) return;
    try {
      final mockData = _getMockData();
      emit(currentState.copyWith(
        items: mockData,
        filteredItems: _applyFilters(mockData, currentState.searchQuery, currentState.statusFilter),
      ));
    } catch (e) {
      emit(CartState.error(e.toString()));
    }
  }

  void _onSearchChanged(dynamic event, Emitter<CartState> emit) {
    final currentState = state;
    if (currentState is! _Loaded) return;
    final query = event.query as String;
    emit(currentState.copyWith(
      searchQuery: query,
      filteredItems: _applyFilters(currentState.items, query, currentState.statusFilter),
    ));
  }

  void _onFilterChanged(dynamic event, Emitter<CartState> emit) {
    final currentState = state;
    if (currentState is! _Loaded) return;
    final filter = event.status as String;
    emit(currentState.copyWith(
      statusFilter: filter,
      filteredItems: _applyFilters(currentState.items, currentState.searchQuery, filter),
    ));
  }

  Future<void> _onDeleteRequested(dynamic event, Emitter<CartState> emit) async {
    final currentState = state;
    if (currentState is! _Loaded) return;
    final id = event.id as String;
    final updated = currentState.items.where((i) => i.id != id).toList();
    emit(currentState.copyWith(
      items: updated,
      filteredItems: _applyFilters(updated, currentState.searchQuery, currentState.statusFilter),
    ));
  }

  List<CartModel> _applyFilters(List<CartModel> list, String query, String filter) {
    return list.where((item) {
      final matchesQuery = query.isEmpty ||
          item.name.toLowerCase().contains(query.toLowerCase());
      final matchesFilter = filter == 'all' || item.status.toLowerCase() == filter.toLowerCase();
      return matchesQuery && matchesFilter;
    }).toList();
  }

  List<CartModel> _getMockData() {
    return [
      const CartModel(
        id: '1',
        name: 'Enterprise Subscription',
        email: 'billing@enterprise.corp',
        status: 'Active',
        amount: 1450.0,
      ),
      const CartModel(
        id: '2',
        name: 'Pro Tier User',
        email: 'dev@innovate.io',
        status: 'Active',
        amount: 450.0,
      ),
      const CartModel(
        id: '3',
        name: 'Starter Account',
        email: 'founder@startup.co',
        status: 'Trial',
        amount: 99.0,
      ),
    ];
  }
}
