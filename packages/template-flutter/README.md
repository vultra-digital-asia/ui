# @vultra/template-flutter

Production Flutter starter kit implementing Clean Architecture, BLoC (`flutter_bloc`), Freezed immutability, and the Vultra Anti-Slop Design System (Digital Atelier / Ethereal Sand).

---

## Architecture Principles

1. **Separation of Domain & Presentation**:
   - `features/<feature>/models/`: Freezed immutable data models with JSON serialization.
   - `features/<feature>/bloc/`: Pure business logic controllers (`Bloc`, Freezed `Event` and `State` unions). Zero UI imports.
   - `features/<feature>/presentation/`: Screen pages wrapping `BlocProvider` and routing state builders.
   - `features/<feature>/presentation/widgets/`: Isolated, stateless presentational widgets receiving immutable state and dispatching actions.
2. **Anti-Slop Visual Standards**:
   - **Canvas**: Sand paper `#FBF9F9` canvas, Ink `#1B1C1C` foreground, single locked accent Terracotta `#A13F20`.
   - **Continuous Squircles**: `BorderRadius.circular(16)` on all cards, sheets, and dialogs.
   - **Icons**: SF Symbols / Material Symbols only. Zero emoji in UI chrome.
   - **Typography**: Inter with tabular figures (`monospace`) for currencies and IDs.

---

## Quickstart

```bash
# 1. Install dependencies
flutter pub get

# 2. Run code generation for Freezed & JSON serializable
flutter pub run build_runner build --delete-conflicting-outputs

# 3. Run application
flutter run
```

---

## Adding New Features with Vultra CLI

Generate complete BLoC + Freezed features instantly:

```bash
# Data Table / List view
vultra gen -p flutter -a datatable -e Customer

# Dashboard overview
vultra gen -p flutter -a dashboard -e Analytics

# Pricing / Paywall
vultra gen -p flutter -a paywall -e ProPlan

# Auth OTP Verification
vultra gen -p flutter -a auth_otp -e Auth
```
