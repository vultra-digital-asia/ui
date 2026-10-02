import 'package:flutter_test/flutter_test.dart';
import 'package:bloc_test/bloc_test.dart';
import 'package:app/features/catalog/bloc/catalog_bloc.dart';
import 'package:app/features/catalog/bloc/catalog_event.dart';
import 'package:app/features/catalog/bloc/catalog_state.dart';

void main() {
  group('CatalogBloc Tests', () {
    late CatalogBloc bloc;

    setUp(() {
      bloc = CatalogBloc();
    });

    tearDown(() {
      bloc.close();
    });

    test('initial state is CatalogState.initial()', () {
      expect(bloc.state, const CatalogState.initial());
    });

    blocTest<CatalogBloc, CatalogState>(
      'emits [loading, loaded] when load event is dispatched',
      build: () => CatalogBloc(),
      act: (b) => b.add(const CatalogEvent.load()),
      expect: () => [
        const CatalogState.loading(),
        isA<CatalogState>().having(
          (s) => s.maybeWhen(loaded: (items, _) => items.length, orElse: () => -1),
          'items count',
          greaterThan(0),
        ),
      ],
    );

    blocTest<CatalogBloc, CatalogState>(
      'filters items when filterQueryChanged event is dispatched',
      build: () => CatalogBloc(),
      act: (b) async {
        b.add(const CatalogEvent.load());
        await Future.delayed(const Duration(milliseconds: 10));
        b.add(const CatalogEvent.filterQueryChanged('nonexistent_filter_query_xyz'));
      },
      skip: 2, // skip loading and initial loaded states
      expect: () => [
        isA<CatalogState>().having(
          (s) => s.maybeWhen(loaded: (items, _) => items.length, orElse: () => -1),
          'filtered items count',
          equals(0),
        ),
      ],
    );
  });
}
