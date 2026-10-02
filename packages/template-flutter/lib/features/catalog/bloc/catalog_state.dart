import 'package:freezed_annotation/freezed_annotation.dart';
import '../models/catalog_model.dart';

part 'catalog_state.freezed.dart';

/// BLoC state for Catalog feature with Freezed unions and copyWith.
@freezed
class CatalogState with _$CatalogState {
  const factory CatalogState.initial() = _Initial;
  const factory CatalogState.loading() = _Loading;
  const factory CatalogState.loaded({
    required List<CatalogModel> items,
    required List<CatalogModel> filteredItems,
    @Default('') String searchQuery,
    @Default('all') String statusFilter,
  }) = _Loaded;
  const factory CatalogState.error(String message) = _Error;
}
