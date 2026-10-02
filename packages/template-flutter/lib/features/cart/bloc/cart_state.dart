import 'package:freezed_annotation/freezed_annotation.dart';
import '../models/cart_model.dart';

part 'cart_state.freezed.dart';

/// BLoC state for Cart feature with Freezed unions and copyWith.
@freezed
class CartState with _$CartState {
  const factory CartState.initial() = _Initial;
  const factory CartState.loading() = _Loading;
  const factory CartState.loaded({
    required List<CartModel> items,
    required List<CartModel> filteredItems,
    @Default('') String searchQuery,
    @Default('all') String statusFilter,
  }) = _Loaded;
  const factory CartState.error(String message) = _Error;
}
