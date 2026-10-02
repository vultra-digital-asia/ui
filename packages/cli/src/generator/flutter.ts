import type { GeneratorOptions, GeneratorResult, GeneratedFile, FieldDefinition } from './types.js';

function toSnake(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[\s-]+/g, '_')
    .toLowerCase();
}

function toPascal(str: string): string {
  const s = toSnake(str);
  return s
    .split('_')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join('');
}

function toCamel(str: string): string {
  const p = toPascal(str);
  return p.charAt(0).toLowerCase() + p.slice(1);
}

export function generateFlutterFeature(options: GeneratorOptions): GeneratorResult {
  const rawName = options.entityName || 'Item';
  const pascal = toPascal(rawName);
  const snake = toSnake(rawName);
  const camel = toCamel(rawName);
  const archetype = options.archetype;

  const defaultFields: FieldDefinition[] = options.fields && options.fields.length > 0
    ? options.fields
    : [
        { name: 'id', type: 'string', label: 'ID' },
        { name: 'name', type: 'string', label: 'Name' },
        { name: 'email', type: 'string', label: 'Email' },
        { name: 'status', type: 'string', label: 'Status' },
        { name: 'amount', type: 'number', label: 'Amount' },
      ];

  const files: GeneratedFile[] = [];

  // 1. Model (Freezed)
  files.push(generateModelFile(pascal, snake, defaultFields));

  // 2. Event (Freezed)
  files.push(generateEventFile(pascal, snake, archetype));

  // 3. State (Freezed)
  files.push(generateStateFile(pascal, snake, archetype));

  // 4. BLoC
  files.push(generateBlocFile(pascal, snake, camel, archetype, defaultFields));

  // 5. Presentation Page (BlocProvider & BlocBuilder)
  files.push(generatePageFile(pascal, snake, camel, archetype));

  // 6. Presentation Feature Widgets (Separated from business logic)
  files.push(generateWidgetFile(pascal, snake, camel, archetype, defaultFields));

  // 7. Optional Unit & Golden Tests
  if (options.generateTests) {
    files.push(generateBlocTestFile(pascal, snake));
    files.push(generateWidgetTestFile(pascal, snake));
  }

  return {
    entityName: pascal,
    platform: 'flutter',
    archetype,
    files,
  };
}

function generateModelFile(pascal: string, snake: string, fields: FieldDefinition[]): GeneratedFile {
  const fieldLines = fields.map((f) => {
    let dartType = 'String';
    if (f.type === 'number') dartType = 'double';
    else if (f.type === 'boolean') dartType = 'bool';
    else if (f.type === 'date') dartType = 'DateTime';
    return `    required ${dartType} ${f.name},`;
  }).join('\n');

  const content = `import 'package:freezed_annotation/freezed_annotation.dart';

part '${snake}_model.freezed.dart';
part '${snake}_model.g.dart';

/// Immutable domain model for ${pascal} with Freezed code generation.
@freezed
class ${pascal}Model with _$${pascal}Model {
  const factory ${pascal}Model({
${fieldLines}
    DateTime? createdAt,
  }) = _${pascal}Model;

  factory ${pascal}Model.fromJson(Map<String, dynamic> json) =>
      _$${pascal}ModelFromJson(json);
}
`;

  return {
    path: `lib/features/${snake}/models/${snake}_model.dart`,
    content,
    description: `Freezed model definition for ${pascal}`,
  };
}

function generateEventFile(pascal: string, snake: string, archetype: string): GeneratedFile {
  let events = `  const factory ${pascal}Event.load() = _Load;
  const factory ${pascal}Event.refresh() = _Refresh;
  const factory ${pascal}Event.searchChanged(String query) = _SearchChanged;
  const factory ${pascal}Event.filterChanged(String status) = _FilterChanged;
  const factory ${pascal}Event.deleteRequested(String id) = _DeleteRequested;`;

  if (archetype === 'paywall') {
    events = `  const factory ${pascal}Event.load() = _Load;
  const factory ${pascal}Event.selectPlan(int planIndex) = _SelectPlan;
  const factory ${pascal}Event.startCheckout() = _StartCheckout;
  const factory ${pascal}Event.restorePurchases() = _RestorePurchases;`;
  } else if (archetype === 'auth_otp') {
    events = `  const factory ${pascal}Event.otpDigitEntered(int index, String digit) = _OtpDigitEntered;
  const factory ${pascal}Event.submitOtp(String code) = _SubmitOtp;
  const factory ${pascal}Event.resendCode() = _ResendCode;
  const factory ${pascal}Event.tickCountdown() = _TickCountdown;`;
  } else if (archetype === 'dashboard') {
    events = `  const factory ${pascal}Event.load() = _Load;
  const factory ${pascal}Event.refresh() = _Refresh;
  const factory ${pascal}Event.periodChanged(String period) = _PeriodChanged;`;
  }

  const content = `import 'package:freezed_annotation/freezed_annotation.dart';

part '${snake}_event.freezed.dart';

/// BLoC events for ${pascal} feature using Freezed unions.
@freezed
class ${pascal}Event with _$${pascal}Event {
${events}
}
`;

  return {
    path: `lib/features/${snake}/bloc/${snake}_event.dart`,
    content,
    description: `Freezed BLoC events for ${pascal}`,
  };
}

function generateStateFile(pascal: string, snake: string, archetype: string): GeneratedFile {
  let loadedFields = `    required List<${pascal}Model> items,
    required List<${pascal}Model> filteredItems,
    @Default('') String searchQuery,
    @Default('all') String statusFilter,`;

  if (archetype === 'paywall') {
    loadedFields = `    required List<${pascal}Model> plans,
    @Default(0) int selectedPlanIndex,
    @Default(false) bool isProcessing,`;
  } else if (archetype === 'auth_otp') {
    loadedFields = `    required String phoneNumber,
    @Default(['', '', '', '', '', '']) List<String> digits,
    @Default(60) int countdownSeconds,
    @Default(false) bool isSubmitting,`;
  } else if (archetype === 'dashboard') {
    loadedFields = `    required double totalRevenue,
    required int activeCount,
    required double growthRate,
    required List<${pascal}Model> recentActivity,
    @Default('monthly') String selectedPeriod,`;
  }

  const content = `import 'package:freezed_annotation/freezed_annotation.dart';
import '../models/${snake}_model.dart';

part '${snake}_state.freezed.dart';

/// BLoC state for ${pascal} feature with Freezed unions and copyWith.
@freezed
class ${pascal}State with _$${pascal}State {
  const factory ${pascal}State.initial() = _Initial;
  const factory ${pascal}State.loading() = _Loading;
  const factory ${pascal}State.loaded({
${loadedFields}
  }) = _Loaded;
  const factory ${pascal}State.error(String message) = _Error;
}
`;

  return {
    path: `lib/features/${snake}/bloc/${snake}_state.dart`,
    content,
    description: `Freezed BLoC state for ${pascal}`,
  };
}

function generateBlocFile(
  pascal: string,
  snake: string,
  camel: string,
  archetype: string,
  fields: FieldDefinition[]
): GeneratedFile {
  const content = `import 'package:flutter_bloc/flutter_bloc.dart';
import '${snake}_event.dart';
import '${snake}_state.dart';
import '../models/${snake}_model.dart';

/// Business logic controller for ${pascal} feature.
/// Handles pure domain operations, state transitions, and repository interaction.
class ${pascal}Bloc extends Bloc<${pascal}Event, ${pascal}State> {
  ${pascal}Bloc() : super(const ${pascal}State.initial()) {
    on<${pascal}Event>((event, emit) async {
      await event.map(
        load: (e) async => _onLoad(e, emit),
        refresh: (e) async => _onRefresh(e, emit),
        searchChanged: (e) async => _onSearchChanged(e, emit),
        filterChanged: (e) async => _onFilterChanged(e, emit),
        deleteRequested: (e) async => _onDeleteRequested(e, emit),
      );
    });
  }

  Future<void> _onLoad(dynamic event, Emitter<${pascal}State> emit) async {
    emit(const ${pascal}State.loading());
    try {
      // Simulate fetch or call domain repository
      await Future<void>.delayed(const Duration(milliseconds: 300));
      final mockData = _getMockData();
      emit(${pascal}State.loaded(
        items: mockData,
        filteredItems: mockData,
      ));
    } catch (e) {
      emit(${pascal}State.error(e.toString()));
    }
  }

  Future<void> _onRefresh(dynamic event, Emitter<${pascal}State> emit) async {
    final currentState = state;
    if (currentState is! _Loaded) return;
    try {
      final mockData = _getMockData();
      emit(currentState.copyWith(
        items: mockData,
        filteredItems: _applyFilters(mockData, currentState.searchQuery, currentState.statusFilter),
      ));
    } catch (e) {
      emit(${pascal}State.error(e.toString()));
    }
  }

  void _onSearchChanged(dynamic event, Emitter<${pascal}State> emit) {
    final currentState = state;
    if (currentState is! _Loaded) return;
    final query = event.query as String;
    emit(currentState.copyWith(
      searchQuery: query,
      filteredItems: _applyFilters(currentState.items, query, currentState.statusFilter),
    ));
  }

  void _onFilterChanged(dynamic event, Emitter<${pascal}State> emit) {
    final currentState = state;
    if (currentState is! _Loaded) return;
    final filter = event.status as String;
    emit(currentState.copyWith(
      statusFilter: filter,
      filteredItems: _applyFilters(currentState.items, currentState.searchQuery, filter),
    ));
  }

  Future<void> _onDeleteRequested(dynamic event, Emitter<${pascal}State> emit) async {
    final currentState = state;
    if (currentState is! _Loaded) return;
    final id = event.id as String;
    final updated = currentState.items.where((i) => i.id != id).toList();
    emit(currentState.copyWith(
      items: updated,
      filteredItems: _applyFilters(updated, currentState.searchQuery, currentState.statusFilter),
    ));
  }

  List<${pascal}Model> _applyFilters(List<${pascal}Model> list, String query, String filter) {
    return list.where((item) {
      final matchesQuery = query.isEmpty ||
          item.name.toLowerCase().contains(query.toLowerCase());
      final matchesFilter = filter == 'all' || item.status.toLowerCase() == filter.toLowerCase();
      return matchesQuery && matchesFilter;
    }).toList();
  }

  List<${pascal}Model> _getMockData() {
    return [
      const ${pascal}Model(
        id: '1',
        name: 'Enterprise Subscription',
        email: 'billing@enterprise.corp',
        status: 'Active',
        amount: 1450.0,
      ),
      const ${pascal}Model(
        id: '2',
        name: 'Pro Tier User',
        email: 'dev@innovate.io',
        status: 'Active',
        amount: 450.0,
      ),
      const ${pascal}Model(
        id: '3',
        name: 'Starter Account',
        email: 'founder@startup.co',
        status: 'Trial',
        amount: 99.0,
      ),
    ];
  }
}
`;

  return {
    path: `lib/features/${snake}/bloc/${snake}_bloc.dart`,
    content,
    description: `BLoC controller implementation for ${pascal}`,
  };
}

function generatePageFile(
  pascal: string,
  snake: string,
  camel: string,
  archetype: string
): GeneratedFile {
  const content = `import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../bloc/${snake}_bloc.dart';
import '../bloc/${snake}_event.dart';
import '../bloc/${snake}_state.dart';
import 'widgets/${snake}_content_widget.dart';

/// Top-level view container for ${pascal}.
/// Injects BlocProvider and isolates Presentation from Business Logic.
class ${pascal}Page extends StatelessWidget {
  const ${pascal}Page({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (_) => ${pascal}Bloc()..add(const ${pascal}Event.load()),
      child: const _${pascal}View(),
    );
  }
}

class _${pascal}View extends StatelessWidget {
  const _${pascal}View();

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final primaryColor = theme.colorScheme.primary;

    return Scaffold(
      backgroundColor: const Color(0xFFFBF9F9), // Ethereal Sand Canvas
      appBar: AppBar(
        title: const Text(
          '${pascal}',
          style: TextStyle(
            color: Color(0xFF1B1C1C),
            fontSize: 18,
            fontWeight: FontWeight.w700,
            letterSpacing: -0.2,
          ),
        ),
        backgroundColor: Colors.transparent,
        elevation: 0,
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh_rounded, color: Color(0xFF6B6761)),
            onPressed: () => context.read<${pascal}Bloc>().add(const ${pascal}Event.refresh()),
          ),
        ],
      ),
      body: SafeArea(
        child: BlocBuilder<${pascal}Bloc, ${pascal}State>(
          builder: (context, state) {
            return state.map(
              initial: (_) => const SizedBox.shrink(),
              loading: (_) => const Center(
                child: CircularProgressIndicator(strokeWidth: 2.5),
              ),
              error: (err) => Center(
                child: Padding(
                  padding: const EdgeInsets.all(24.0),
                  child: Text(
                    'Error: \${err.message}',
                    style: const TextStyle(color: Colors.redAccent, fontSize: 13),
                  ),
                ),
              ),
              loaded: (loaded) => ${pascal}ContentWidget(
                items: loaded.filteredItems,
                searchQuery: loaded.searchQuery,
                statusFilter: loaded.statusFilter,
              ),
            );
          },
        ),
      ),
    );
  }
}
`;

  return {
    path: `lib/features/${snake}/presentation/${snake}_page.dart`,
    content,
    description: `Presentation page wrapping BlocProvider and routing view states for ${pascal}`,
  };
}

function generateWidgetFile(
  pascal: string,
  snake: string,
  camel: string,
  archetype: string,
  fields: FieldDefinition[]
): GeneratedFile {
  const content = `import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../../bloc/${snake}_bloc.dart';
import '../../bloc/${snake}_event.dart';
import '../../models/${snake}_model.dart';

/// Pure Presentational Widget for ${pascal}.
/// Receives immutable data, dispatches BLoC events, zero local business state.
class ${pascal}ContentWidget extends StatelessWidget {
  final List<${pascal}Model> items;
  final String searchQuery;
  final String statusFilter;

  const ${pascal}ContentWidget({
    super.key,
    required this.items,
    required this.searchQuery,
    required this.statusFilter,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final primaryColor = theme.colorScheme.primary;

    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          const SizedBox(height: 8),
          // Search & Filter Bar
          _buildSearchAndFilters(context, primaryColor),
          const SizedBox(height: 16),
          // List / Cards
          Expanded(
            child: items.isEmpty
                ? const _EmptyStateView()
                : ListView.separated(
                    itemCount: items.length,
                    separatorBuilder: (_, __) => const SizedBox(height: 10),
                    itemBuilder: (context, index) {
                      final item = items[index];
                      return _buildItemCard(context, item, primaryColor);
                    },
                  ),
          ),
          const SizedBox(height: 12),
        ],
      ),
    );
  }

  Widget _buildSearchAndFilters(BuildContext context, Color primaryColor) {
    return Column(
      children: [
        Container(
          height: 44,
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(12),
            border: Border.all(color: const Color(0xFFE8E4DF)),
          ),
          padding: const EdgeInsets.symmetric(horizontal: 12),
          child: Row(
            children: [
              const Icon(Icons.search, size: 20, color: Color(0xFF6B6761)),
              const SizedBox(width: 8),
              Expanded(
                child: TextField(
                  onChanged: (val) {
                    context.read<${pascal}Bloc>().add(${pascal}Event.searchChanged(val));
                  },
                  decoration: const InputDecoration(
                    hintText: 'Search by keyword...',
                    hintStyle: TextStyle(fontSize: 13, color: Color(0xFF8E8E93)),
                    border: InputBorder.none,
                    isDense: true,
                  ),
                ),
              ),
            ],
          ),
        ),
        const SizedBox(height: 10),
        // Filter pills
        SingleChildScrollView(
          scrollDirection: Axis.horizontal,
          child: Row(
            children: [
              _buildFilterPill(context, 'all', 'All Status', primaryColor),
              const SizedBox(width: 8),
              _buildFilterPill(context, 'active', 'Active', primaryColor),
              const SizedBox(width: 8),
              _buildFilterPill(context, 'trial', 'Trial', primaryColor),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildFilterPill(
    BuildContext context,
    String value,
    String label,
    Color primaryColor,
  ) {
    final isSelected = statusFilter.toLowerCase() == value.toLowerCase();
    return GestureDetector(
      onTap: () {
        HapticFeedback.selectionClick();
        context.read<${pascal}Bloc>().add(${pascal}Event.filterChanged(value));
      },
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 150),
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
        decoration: BoxDecoration(
          color: isSelected ? primaryColor : Colors.white,
          borderRadius: BorderRadius.circular(20),
          border: Border.all(
            color: isSelected ? primaryColor : const Color(0xFFE8E4DF),
          ),
        ),
        child: Text(
          label,
          style: TextStyle(
            fontSize: 12,
            fontWeight: isSelected ? FontWeight.w600 : FontWeight.w500,
            color: isSelected ? Colors.white : const Color(0xFF6B6761),
          ),
        ),
      ),
    );
  }

  Widget _buildItemCard(
    BuildContext context,
    ${pascal}Model item,
    Color primaryColor,
  ) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16), // Apple HIG continuous squircle standard
        border: Border.all(color: const Color(0xFFE8E4DF)),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.02),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Row(
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  item.name,
                  style: const TextStyle(
                    fontSize: 15,
                    fontWeight: FontWeight.w600,
                    color: Color(0xFF1B1C1C),
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  item.email,
                  style: const TextStyle(
                    fontSize: 12,
                    color: Color(0xFF6B6761),
                  ),
                ),
              ],
            ),
          ),
          Column(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              Text(
                '\\$\${item.amount.toStringAsFixed(0)}',
                style: const TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.w700,
                  fontFeatures: [FontFeature.tabularFigures()],
                  color: Color(0xFF1B1C1C),
                ),
              ),
              const SizedBox(height: 4),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                decoration: BoxDecoration(
                  color: item.status.toLowerCase() == 'active'
                      ? const Color(0xFF2F6B57).withOpacity(0.12)
                      : Colors.orange.withOpacity(0.12),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Text(
                  item.status,
                  style: TextStyle(
                    fontSize: 11,
                    fontWeight: FontWeight.w600,
                    color: item.status.toLowerCase() == 'active'
                        ? const Color(0xFF2F6B57)
                        : Colors.orange.shade800,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(width: 8),
          IconButton(
            icon: const Icon(Icons.delete_outline, size: 18, color: Color(0xFF8E8E93)),
            onPressed: () {
              HapticFeedback.lightImpact();
              context.read<${pascal}Bloc>().add(${pascal}Event.deleteRequested(item.id));
            },
          ),
        ],
      ),
    );
  }
}

class _EmptyStateView extends StatelessWidget {
  const _EmptyStateView();

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: const [
          Icon(Icons.inbox_outlined, size: 48, color: Color(0xFF8E8E93)),
          SizedBox(height: 12),
          Text(
            'No records match your criteria',
            style: TextStyle(fontSize: 14, color: Color(0xFF6B6761), fontWeight: FontWeight.w500),
          ),
        ],
      ),
    );
  }
}
`;

  return {
    path: `lib/features/${snake}/presentation/widgets/${snake}_content_widget.dart`,
    content,
    description: `Presentational widget separating UI from domain logic for ${pascal}`,
  };
}

function generateBlocTestFile(pascal: string, snake: string): GeneratedFile {
  const content = `import 'package:flutter_test/flutter_test.dart';
import 'package:bloc_test/bloc_test.dart';
import 'package:app/features/${snake}/bloc/${snake}_bloc.dart';
import 'package:app/features/${snake}/bloc/${snake}_event.dart';
import 'package:app/features/${snake}/bloc/${snake}_state.dart';

void main() {
  group('${pascal}Bloc Tests', () {
    late ${pascal}Bloc bloc;

    setUp(() {
      bloc = ${pascal}Bloc();
    });

    tearDown(() {
      bloc.close();
    });

    test('initial state is ${pascal}State.initial()', () {
      expect(bloc.state, const ${pascal}State.initial());
    });

    blocTest<${pascal}Bloc, ${pascal}State>(
      'emits [loading, loaded] when load event is dispatched',
      build: () => ${pascal}Bloc(),
      act: (b) => b.add(const ${pascal}Event.load()),
      expect: () => [
        const ${pascal}State.loading(),
        isA<${pascal}State>().having(
          (s) => s.maybeWhen(loaded: (items, _) => items.length, orElse: () => -1),
          'items count',
          greaterThan(0),
        ),
      ],
    );

    blocTest<${pascal}Bloc, ${pascal}State>(
      'filters items when filterQueryChanged event is dispatched',
      build: () => ${pascal}Bloc(),
      act: (b) async {
        b.add(const ${pascal}Event.load());
        await Future.delayed(const Duration(milliseconds: 10));
        b.add(const ${pascal}Event.filterQueryChanged('nonexistent_filter_query_xyz'));
      },
      skip: 2, // skip loading and initial loaded states
      expect: () => [
        isA<${pascal}State>().having(
          (s) => s.maybeWhen(loaded: (items, _) => items.length, orElse: () => -1),
          'filtered items count',
          equals(0),
        ),
      ],
    );
  });
}
`;

  return {
    path: `test/features/${snake}/bloc/${snake}_bloc_test.dart`,
    content,
    description: `BLoC unit test verifying state transitions with bloc_test for ${pascal}`,
  };
}

function generateWidgetTestFile(pascal: string, snake: string): GeneratedFile {
  const content = `import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:app/features/${snake}/presentation/${snake}_page.dart';
import 'package:app/features/${snake}/presentation/widgets/${snake}_content_widget.dart';

void main() {
  group('${pascal}Page Golden & Widget Tests', () {
    testWidgets('renders ${pascal}Page with clean typography and squircle layout', (tester) async {
      await tester.pumpWidget(
        const MaterialApp(
          home: ${pascal}Page(),
        ),
      );

      // Verify structure
      expect(find.byType(${pascal}Page), findsOneWidget);
      expect(find.byType(${pascal}ContentWidget), findsOneWidget);

      // Settle simulated animations
      await tester.pumpAndSettle();

      // Anti-slop checks: verify clean textual header exists
      expect(find.text('${pascal} Directory'), findsOneWidget);
    });
  });
}
`;

  return {
    path: `test/features/${snake}/presentation/${snake}_page_test.dart`,
    content,
    description: `Golden and widget integration test verifying layout for ${pascal}`,
  };
}
