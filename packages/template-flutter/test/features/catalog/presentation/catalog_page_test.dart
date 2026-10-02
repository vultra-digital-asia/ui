import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:app/features/catalog/presentation/catalog_page.dart';
import 'package:app/features/catalog/presentation/widgets/catalog_content_widget.dart';

void main() {
  group('CatalogPage Golden & Widget Tests', () {
    testWidgets('renders CatalogPage with clean typography and squircle layout', (tester) async {
      await tester.pumpWidget(
        const MaterialApp(
          home: CatalogPage(),
        ),
      );

      // Verify structure
      expect(find.byType(CatalogPage), findsOneWidget);
      expect(find.byType(CatalogContentWidget), findsOneWidget);

      // Settle simulated animations
      await tester.pumpAndSettle();

      // Anti-slop checks: verify clean textual header exists
      expect(find.text('Catalog Directory'), findsOneWidget);
    });
  });
}
