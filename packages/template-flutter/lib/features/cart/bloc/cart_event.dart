import 'package:freezed_annotation/freezed_annotation.dart';

part 'cart_event.freezed.dart';

/// BLoC events for Cart feature using Freezed unions.
@freezed
class CartEvent with _$CartEvent {
  const factory CartEvent.load() = _Load;
  const factory CartEvent.refresh() = _Refresh;
  const factory CartEvent.searchChanged(String query) = _SearchChanged;
  const factory CartEvent.filterChanged(String status) = _FilterChanged;
  const factory CartEvent.deleteRequested(String id) = _DeleteRequested;
}
