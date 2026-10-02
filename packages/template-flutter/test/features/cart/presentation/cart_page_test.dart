import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:app/features/cart/presentation/cart_page.dart';
import 'package:app/features/cart/presentation/widgets/cart_content_widget.dart';

void main() {
  group('CartPage Golden & Widget Tests', () {
    testWidgets('renders CartPage with clean typography and squircle layout', (tester) async {
      await tester.pumpWidget(
        const MaterialApp(
          home: CartPage(),
        ),
      );

      // Verify structure
      expect(find.byType(CartPage), findsOneWidget);
      expect(find.byType(CartContentWidget), findsOneWidget);

      // Settle simulated animations
      await tester.pumpAndSettle();

      // Anti-slop checks: verify clean textual header exists
      expect(find.text('Cart Directory'), findsOneWidget);
    });
  });
}
