import 'package:flutter/material.dart';

/// Vultra Digital Atelier / Ethereal Sand Design System Palette
/// Strict 60-30-10 distribution:
/// 60% Canvas (#FBF9F9) / 30% Structural Ink (#1B1C1C) / 10% Terracotta Accent (#A13F20)
class AppColors {
  AppColors._();

  // Canvas & Backgrounds
  static const Color canvas = Color(0xFFFBF9F9);
  static const Color surface = Colors.white;
  static const Color surfaceMuted = Color(0xFFF2F1F0);

  // Borders & Dividers
  static const Color border = Color(0xFFE8E4DF);
  static const Color borderLight = Color(0xFFF2F1F0);

  // Typography
  static const Color textPrimary = Color(0xFF1B1C1C);
  static const Color textMuted = Color(0xFF6B6761);
  static const Color textSubtle = Color(0xFFB0ACA6);

  // Brand Accent (Single locked accent)
  static const Color primary = Color(0xFFA13F20); // Terracotta
  static const Color primaryDark = Color(0xFF8B3519);
  static const Color primaryLight = Color(0xFFF5EAE6);

  // Semantic Status
  static const Color success = Color(0xFF2F6B57); // Sage Green
  static const Color successBg = Color(0xFFEBF3F0);
  static const Color warning = Color(0xFFB45309);
  static const Color warningBg = Color(0xFFFEF3C7);
  static const Color error = Color(0xFFBE123C);
  static const Color errorBg = Color(0xFFFFE4E6);
}
