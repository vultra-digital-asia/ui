import 'package:freezed_annotation/freezed_annotation.dart';
import '../models/subscription_model.dart';

part 'subscription_state.freezed.dart';

/// BLoC state for Subscription feature with Freezed unions and copyWith.
@freezed
class SubscriptionState with _$SubscriptionState {
  const factory SubscriptionState.initial() = _Initial;
  const factory SubscriptionState.loading() = _Loading;
  const factory SubscriptionState.loaded({
    required List<SubscriptionModel> items,
    required List<SubscriptionModel> filteredItems,
    @Default('') String searchQuery,
    @Default('all') String statusFilter,
  }) = _Loaded;
  const factory SubscriptionState.error(String message) = _Error;
}
