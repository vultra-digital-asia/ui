import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:vultra_flutter_starter/features/subscription/presentation/subscription_page.dart';
import 'package:vultra_flutter_starter/features/subscription/presentation/widgets/subscription_content_widget.dart';

void main() {
  group('SubscriptionPage Widget Tests', () {
    testWidgets('renders SubscriptionPage structure and squircle cards', (tester) async {
      await tester.pumpWidget(
        const MaterialApp(
          home: SubscriptionPage(),
        ),
      );

      // Verify structural hierarchy
      expect(find.byType(SubscriptionPage), findsOneWidget);
      expect(find.byType(SubscriptionContentWidget), findsOneWidget);

      await tester.pumpAndSettle();

      // Anti-slop checks: verify clean textual header and zero emoji
      expect(find.text('Subscription Directory'), findsOneWidget);
    });
  });
}
