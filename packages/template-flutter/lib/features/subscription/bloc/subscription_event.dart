import 'package:freezed_annotation/freezed_annotation.dart';

part 'subscription_event.freezed.dart';

/// BLoC events for Subscription feature using Freezed unions.
@freezed
class SubscriptionEvent with _$SubscriptionEvent {
  const factory SubscriptionEvent.load() = _Load;
  const factory SubscriptionEvent.refresh() = _Refresh;
  const factory SubscriptionEvent.searchChanged(String query) = _SearchChanged;
  const factory SubscriptionEvent.filterChanged(String status) = _FilterChanged;
  const factory SubscriptionEvent.deleteRequested(String id) = _DeleteRequested;
}
