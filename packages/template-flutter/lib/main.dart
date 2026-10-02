import 'package:flutter/material.dart';
import 'core/theme/app_theme.dart';
import 'features/subscription/presentation/subscription_page.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const VultraFlutterApp());
}

class VultraFlutterApp extends StatelessWidget {
  const VultraFlutterApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Vultra Flutter App',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.lightTheme,
      home: const SubscriptionPage(),
    );
  }
}
