import 'package:flutter_test/flutter_test.dart';
import 'package:bloc_test/bloc_test.dart';
import 'package:vultra_flutter_starter/features/subscription/bloc/subscription_bloc.dart';
import 'package:vultra_flutter_starter/features/subscription/bloc/subscription_event.dart';
import 'package:vultra_flutter_starter/features/subscription/bloc/subscription_state.dart';

void main() {
  group('SubscriptionBloc Unit Tests', () {
    late SubscriptionBloc bloc;

    setUp(() {
      bloc = SubscriptionBloc();
    });

    tearDown(() {
      bloc.close();
    });

    test('initial state is SubscriptionState.initial()', () {
      expect(bloc.state, const SubscriptionState.initial());
    });

    blocTest<SubscriptionBloc, SubscriptionState>(
      'emits [loading, loaded] when load event is dispatched',
      build: () => SubscriptionBloc(),
      act: (b) => b.add(const SubscriptionEvent.load()),
      expect: () => [
        const SubscriptionState.loading(),
        isA<SubscriptionState>().having(
          (s) => s.maybeWhen(loaded: (items, _) => items.length, orElse: () => -1),
          'items count',
          greaterThan(0),
        ),
      ],
    );

    blocTest<SubscriptionBloc, SubscriptionState>(
      'filters items when filterQueryChanged event is dispatched',
      build: () => SubscriptionBloc(),
      act: (b) async {
        b.add(const SubscriptionEvent.load());
        await Future.delayed(const Duration(milliseconds: 10));
        b.add(const SubscriptionEvent.filterQueryChanged('nonexistent_filter_query_xyz'));
      },
      skip: 2,
      expect: () => [
        isA<SubscriptionState>().having(
          (s) => s.maybeWhen(loaded: (items, _) => items.length, orElse: () => -1),
          'filtered items count',
          equals(0),
        ),
      ],
    );
  });
}
