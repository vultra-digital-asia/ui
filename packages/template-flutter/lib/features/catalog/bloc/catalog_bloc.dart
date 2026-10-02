import 'package:flutter_bloc/flutter_bloc.dart';
import 'catalog_event.dart';
import 'catalog_state.dart';
import '../models/catalog_model.dart';

/// Business logic controller for Catalog feature.
/// Handles pure domain operations, state transitions, and repository interaction.
class CatalogBloc extends Bloc<CatalogEvent, CatalogState> {
  CatalogBloc() : super(const CatalogState.initial()) {
    on<CatalogEvent>((event, emit) async {
      await event.map(
        load: (e) async => _onLoad(e, emit),
        refresh: (e) async => _onRefresh(e, emit),
        searchChanged: (e) async => _onSearchChanged(e, emit),
        filterChanged: (e) async => _onFilterChanged(e, emit),
        deleteRequested: (e) async => _onDeleteRequested(e, emit),
      );
    });
  }

  Future<void> _onLoad(dynamic event, Emitter<CatalogState> emit) async {
    emit(const CatalogState.loading());
    try {
      // Simulate fetch or call domain repository
      await Future<void>.delayed(const Duration(milliseconds: 300));
      final mockData = _getMockData();
      emit(CatalogState.loaded(
        items: mockData,
        filteredItems: mockData,
      ));
    } catch (e) {
      emit(CatalogState.error(e.toString()));
    }
  }

  Future<void> _onRefresh(dynamic event, Emitter<CatalogState> emit) async {
    final currentState = state;
    if (currentState is! _Loaded) return;
    try {
      final mockData = _getMockData();
      emit(currentState.copyWith(
        items: mockData,
        filteredItems: _applyFilters(mockData, currentState.searchQuery, currentState.statusFilter),
      ));
    } catch (e) {
      emit(CatalogState.error(e.toString()));
    }
  }

  void _onSearchChanged(dynamic event, Emitter<CatalogState> emit) {
    final currentState = state;
    if (currentState is! _Loaded) return;
    final query = event.query as String;
    emit(currentState.copyWith(
      searchQuery: query,
      filteredItems: _applyFilters(currentState.items, query, currentState.statusFilter),
    ));
  }

  void _onFilterChanged(dynamic event, Emitter<CatalogState> emit) {
    final currentState = state;
    if (currentState is! _Loaded) return;
    final filter = event.status as String;
    emit(currentState.copyWith(
      statusFilter: filter,
      filteredItems: _applyFilters(currentState.items, currentState.searchQuery, filter),
    ));
  }

  Future<void> _onDeleteRequested(dynamic event, Emitter<CatalogState> emit) async {
    final currentState = state;
    if (currentState is! _Loaded) return;
    final id = event.id as String;
    final updated = currentState.items.where((i) => i.id != id).toList();
    emit(currentState.copyWith(
      items: updated,
      filteredItems: _applyFilters(updated, currentState.searchQuery, currentState.statusFilter),
    ));
  }

  List<CatalogModel> _applyFilters(List<CatalogModel> list, String query, String filter) {
    return list.where((item) {
      final matchesQuery = query.isEmpty ||
          item.name.toLowerCase().contains(query.toLowerCase());
      final matchesFilter = filter == 'all' || item.status.toLowerCase() == filter.toLowerCase();
      return matchesQuery && matchesFilter;
    }).toList();
  }

  List<CatalogModel> _getMockData() {
    return [
      const CatalogModel(
        id: '1',
        name: 'Enterprise Subscription',
        email: 'billing@enterprise.corp',
        status: 'Active',
        amount: 1450.0,
      ),
      const CatalogModel(
        id: '2',
        name: 'Pro Tier User',
        email: 'dev@innovate.io',
        status: 'Active',
        amount: 450.0,
      ),
      const CatalogModel(
        id: '3',
        name: 'Starter Account',
        email: 'founder@startup.co',
        status: 'Trial',
        amount: 99.0,
      ),
    ];
  }
}
