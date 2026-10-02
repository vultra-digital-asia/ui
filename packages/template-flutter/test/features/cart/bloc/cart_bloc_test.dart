import 'package:flutter_test/flutter_test.dart';
import 'package:bloc_test/bloc_test.dart';
import 'package:app/features/cart/bloc/cart_bloc.dart';
import 'package:app/features/cart/bloc/cart_event.dart';
import 'package:app/features/cart/bloc/cart_state.dart';

void main() {
  group('CartBloc Tests', () {
    late CartBloc bloc;

    setUp(() {
      bloc = CartBloc();
    });

    tearDown(() {
      bloc.close();
    });

    test('initial state is CartState.initial()', () {
      expect(bloc.state, const CartState.initial());
    });

    blocTest<CartBloc, CartState>(
      'emits [loading, loaded] when load event is dispatched',
      build: () => CartBloc(),
      act: (b) => b.add(const CartEvent.load()),
      expect: () => [
        const CartState.loading(),
        isA<CartState>().having(
          (s) => s.maybeWhen(loaded: (items, _) => items.length, orElse: () => -1),
          'items count',
          greaterThan(0),
        ),
      ],
    );

    blocTest<CartBloc, CartState>(
      'filters items when filterQueryChanged event is dispatched',
      build: () => CartBloc(),
      act: (b) async {
        b.add(const CartEvent.load());
        await Future.delayed(const Duration(milliseconds: 10));
        b.add(const CartEvent.filterQueryChanged('nonexistent_filter_query_xyz'));
      },
      skip: 2, // skip loading and initial loaded states
      expect: () => [
        isA<CartState>().having(
          (s) => s.maybeWhen(loaded: (items, _) => items.length, orElse: () => -1),
          'filtered items count',
          equals(0),
        ),
      ],
    );
  });
}
