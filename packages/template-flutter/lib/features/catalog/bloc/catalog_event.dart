import 'package:freezed_annotation/freezed_annotation.dart';

part 'catalog_event.freezed.dart';

/// BLoC events for Catalog feature using Freezed unions.
@freezed
class CatalogEvent with _$CatalogEvent {
  const factory CatalogEvent.load() = _Load;
  const factory CatalogEvent.refresh() = _Refresh;
  const factory CatalogEvent.searchChanged(String query) = _SearchChanged;
  const factory CatalogEvent.filterChanged(String status) = _FilterChanged;
  const factory CatalogEvent.deleteRequested(String id) = _DeleteRequested;
}
