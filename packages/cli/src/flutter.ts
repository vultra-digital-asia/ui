import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

export interface FlutterScreenTemplate {
	name: string;
	filename: string;
	description: string;
	pattern: string;
	code: string;
}

export const FLUTTER_SCREENS: Record<string, FlutterScreenTemplate> = {
	'mob-paywall-wise-01': {
		name: 'mob-paywall-wise-01',
		filename: 'subscription_paywall_screen.dart',
		description: 'Dual-Plan Comparison Paywall with Annual Discount Badge and Continuous Squircles',
		pattern: 'Dual-Plan Comparison Paywall',
		code: `import "package:flutter/material.dart";

class SubscriptionPaywallScreen extends StatefulWidget {
  const SubscriptionPaywallScreen({super.key});

  @override
  State<SubscriptionPaywallScreen> createState() => _SubscriptionPaywallScreenState();
}

class _SubscriptionPaywallScreenState extends State<SubscriptionPaywallScreen> {
  int _selectedPlanIndex = 0; // 0 = Tahunan, 1 = Bulanan

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final primaryColor = theme.colorScheme.primary;

    return Scaffold(
      backgroundColor: const Color(0xFFFBF9F9),
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.close, color: Colors.black87),
          onPressed: () => Navigator.of(context).pop(),
        ),
        actions: [
          TextButton(
            onPressed: () {},
            child: const Text("Pulihkan", style: TextStyle(color: Colors.black54, fontSize: 13)),
          ),
        ],
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const SizedBox(height: 12),
              const Center(
                child: Text(
                  "Tingkatkan ke Pro",
                  style: TextStyle(fontSize: 26, fontWeight: FontWeight.bold, color: Color(0xFF1B1C1C)),
                ),
              ),
              const SizedBox(height: 8),
              const Center(
                child: Text(
                  "Nikmati automasi faktur tanpa batas dan integrasi instan.",
                  textAlign: TextAlign.center,
                  style: TextStyle(fontSize: 14, color: Color(0xFF6B6761)),
                ),
              ),
              const SizedBox(height: 32),
              _buildPlanCard(
                index: 0,
                title: "Paket Tahunan",
                price: "Rp 599.000 / tahun",
                badgeText: "Hemat 40%",
                isSelected: _selectedPlanIndex == 0,
                primaryColor: primaryColor,
              ),
              const SizedBox(height: 12),
              _buildPlanCard(
                index: 1,
                title: "Paket Bulanan",
                price: "Rp 79.000 / bulan",
                badgeText: null,
                isSelected: _selectedPlanIndex == 1,
                primaryColor: primaryColor,
              ),
              const Spacer(),
              SizedBox(
                height: 52,
                child: ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: primaryColor,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                    elevation: 0,
                  ),
                  onPressed: () {},
                  child: const Text(
                    "Mulai 7 Hari Uji Coba Gratis",
                    style: TextStyle(fontSize: 15, fontWeight: FontWeight.w600, color: Colors.white),
                  ),
                ),
              ),
              const SizedBox(height: 8),
              const Center(
                child: Text(
                  "Batal kapan saja. Dikenakan biaya setelah masa uji coba berakhir.",
                  style: TextStyle(fontSize: 11, color: Color(0xFF8E8E93)),
                ),
              ),
              const SizedBox(height: 12),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildPlanCard({
    required int index,
    required String title,
    required String price,
    required String? badgeText,
    required bool isSelected,
    required Color primaryColor,
  }) {
    return GestureDetector(
      onTap: () => setState(() => _selectedPlanIndex = index),
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 180),
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(
            color: isSelected ? primaryColor : const Color(0xFFE8E4DF),
            width: isSelected ? 2 : 1,
          ),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.03),
              blurRadius: 10,
              offset: const Offset(0, 4),
            ),
          ],
        ),
        child: Row(
          children: [
            Icon(
              isSelected ? Icons.check_circle : Icons.radio_button_unchecked,
              color: isSelected ? primaryColor : const Color(0xFF8E8E93),
              size: 22,
            ),
            const SizedBox(width: 14),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(title, style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 15)),
                  Text(price, style: const TextStyle(color: Color(0xFF6B6761), fontSize: 13)),
                ],
              ),
            ),
            if (badgeText != null)
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                decoration: BoxDecoration(
                  color: const Color(0xFF2F6B57).withOpacity(0.12),
                  borderRadius: BorderRadius.circular(20),
                ),
                child: Text(
                  badgeText,
                  style: const TextStyle(color: Color(0xFF2F6B57), fontSize: 11, fontWeight: FontWeight.bold),
                ),
              ),
          ],
        ),
      ),
    );
  }
}
`,
	},
	'mob-bottom-nav-shell-01': {
		name: 'mob-bottom-nav-shell-01',
		filename: 'bottom_nav_shell.dart',
		description: 'Material 3 Bottom Navigation Shell with Active Pill Indicator & Safe Area Insets',
		pattern: 'Tabbed Navigation Shell',
		code: `import "package:flutter/material.dart";
import "package:flutter/services.dart";

class AppBottomNavShell extends StatefulWidget {
  const AppBottomNavShell({super.key});

  @override
  State<AppBottomNavShell> createState() => _AppBottomNavShellState();
}

class _AppBottomNavShellState extends State<AppBottomNavShell> {
  int _currentIndex = 0;

  final List<Widget> _screens = const [
    Center(child: Text("Beranda")),
    Center(child: Text("Transaksi")),
    Center(child: Text("Faktur")),
    Center(child: Text("Pengaturan")),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: IndexedStack(
        index: _currentIndex,
        children: _screens,
      ),
      bottomNavigationBar: NavigationBar(
        selectedIndex: _currentIndex,
        onDestinationSelected: (int index) {
          HapticFeedback.selectionClick();
          setState(() => _currentIndex = index);
        },
        height: 64,
        destinations: const [
          NavigationDestination(icon: Icon(Icons.home_outlined), selectedIcon: Icon(Icons.home), label: "Beranda"),
          NavigationDestination(icon: Icon(Icons.receipt_long_outlined), selectedIcon: Icon(Icons.receipt_long), label: "Transaksi"),
          NavigationDestination(icon: Icon(Icons.insert_drive_file_outlined), selectedIcon: Icon(Icons.insert_drive_file), label: "Faktur"),
          NavigationDestination(icon: Icon(Icons.person_outline), selectedIcon: Icon(Icons.person), label: "Profil"),
        ],
      ),
    );
  }
}
`,
	},
	'mob-onboarding-step1-intro': {
		name: 'mob-onboarding-step1-intro',
		filename: 'onboarding_carousel_screen.dart',
		description: 'Engaging Onboarding Welcome Carousel with Vector Artwork & Dynamic Progress Dots',
		pattern: 'Value Prop Onboarding Screen',
		code: `import "package:flutter/material.dart";

class OnboardingCarouselStep extends StatelessWidget {
  final VoidCallback onNext;
  final VoidCallback onSkip;

  const OnboardingCarouselStep({super.key, required this.onNext, required this.onSkip});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFFBF9F9),
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        actions: [
          TextButton(
            onPressed: onSkip,
            child: const Text("Lewati", style: TextStyle(color: Color(0xFF6B6761), fontSize: 13)),
          ),
        ],
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24.0),
          child: Column(
            children: [
              const Spacer(),
              Container(
                width: 160,
                height: 160,
                decoration: BoxDecoration(
                  color: const Color(0xFFA13F20).withOpacity(0.08),
                  borderRadius: BorderRadius.circular(32),
                ),
                child: const Icon(Icons.bolt_rounded, size: 72, color: Color(0xFFA13F20)),
              ),
              const SizedBox(height: 32),
              const Text(
                "Automasi Keuangan Bisnis",
                textAlign: TextAlign.center,
                style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: Color(0xFF1B1C1C)),
              ),
              const SizedBox(height: 12),
              const Text(
                "Terbitkan invoice, rekonsiliasi pembayaran via QRIS dan Virtual Account secara instan.",
                textAlign: TextAlign.center,
                style: TextStyle(fontSize: 14, color: Color(0xFF6B6761), height: 1.4),
              ),
              const Spacer(),
              SizedBox(
                width: double.infinity,
                height: 52,
                child: ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFFA13F20),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                    elevation: 0,
                  ),
                  onPressed: onNext,
                  child: const Text("Lanjutkan", style: TextStyle(fontSize: 15, fontWeight: FontWeight.w600, color: Colors.white)),
                ),
              ),
              const SizedBox(height: 16),
            ],
          ),
        ),
      ),
    );
  }
}
`,
	},
	'mob-auth-step2-otp': {
		name: 'mob-auth-step2-otp',
		filename: 'otp_verification_screen.dart',
		description: '6-Digit Auto-Focusing OTP Keypad Screen with Resend Cooldown Timer',
		pattern: 'OTP Verification Screen',
		code: `import "package:flutter/material.dart";
import "package:flutter/services.dart";

class OtpVerificationScreen extends StatefulWidget {
  final String phoneNumber;
  final VoidCallback onVerified;

  const OtpVerificationScreen({super.key, required this.phoneNumber, required this.onVerified});

  @override
  State<OtpVerificationScreen> createState() => _OtpVerificationScreenState();
}

class _OtpVerificationScreenState extends State<OtpVerificationScreen> {
  final List<TextEditingController> _controllers = List.generate(6, (_) => TextEditingController());
  final List<FocusNode> _focusNodes = List.generate(6, (_) => FocusNode());

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFFBF9F9),
      appBar: AppBar(backgroundColor: Colors.transparent, elevation: 0),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              const Text("Masukkan Kode OTP", style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
              const SizedBox(height: 8),
              Text("Kode 6 digit telah dikirim ke \${widget.phoneNumber}", style: const TextStyle(fontSize: 13, color: Color(0xFF6B6761))),
              const SizedBox(height: 36),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: List.generate(6, (i) => SizedBox(
                  width: 44,
                  height: 52,
                  child: TextField(
                    controller: _controllers[i],
                    focusNode: _focusNodes[i],
                    textAlign: TextAlign.center,
                    keyboardType: TextInputType.number,
                    maxLength: 1,
                    style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                    decoration: InputDecoration(
                      counterText: "",
                      border: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: const BorderSide(color: Color(0xFFE8E4DF))),
                      focusedBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: const BorderSide(color: Color(0xFFA13F20), width: 2)),
                    ),
                    onChanged: (v) {
                      if (v.isNotEmpty && i < 5) _focusNodes[i + 1].requestFocus();
                      if (v.isEmpty && i > 0) _focusNodes[i - 1].requestFocus();
                      HapticFeedback.selectionClick();
                    },
                  ),
                )),
              ),
              const SizedBox(height: 28),
              TextButton(
                onPressed: () {},
                child: const Text("Kirim ulang kode dalam 45s", style: TextStyle(color: Color(0xFF6B6761), fontSize: 13)),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
`,
	},
	'mob-home-feed': {
		name: 'mob-home-feed',
		filename: 'home_feed_screen.dart',
		description: 'Financial Home Feed (Wise style) with total balance card and quick action pills',
		pattern: 'Financial Dashboard Feed',
		code: `import "package:flutter/material.dart";
import "package:flutter/services.dart";

class HomeFeedScreen extends StatefulWidget {
  const HomeFeedScreen({super.key});

  @override
  State<HomeFeedScreen> createState() => _HomeFeedScreenState();
}

class _HomeFeedScreenState extends State<HomeFeedScreen> {
  bool _hideBalance = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFFBF9F9),
      body: SafeArea(
        child: CustomScrollView(
          physics: const BouncingScrollPhysics(),
          slivers: [
            SliverToBoxAdapter(
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 20.0, vertical: 16.0),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.between,
                  children: [
                    Row(
                      children: [
                        CircleAvatar(
                          radius: 20,
                          backgroundColor: const Color(0xFFA13F20).withOpacity(0.12),
                          child: const Text('AJ', style: TextStyle(color: Color(0xFFA13F20), fontWeight: FontWeight.bold, fontSize: 14)),
                        ),
                        const SizedBox(width: 12),
                        const Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text('Selamat Datang,', style: TextStyle(fontSize: 12, color: Color(0xFF6B6761))),
                            Text('Ant Joshua', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700, color: Color(0xFF1B1C1C))),
                          ],
                        ),
                      ],
                    ),
                    IconButton(
                      icon: const Icon(Icons.notifications_none_rounded, color: Color(0xFF1B1C1C)),
                      onPressed: () {},
                    ),
                  ],
                ),
              ),
            ),
            SliverToBoxAdapter(
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 20.0, vertical: 8.0),
                child: Container(
                  padding: const EdgeInsets.all(22.0),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(16),
                    border: Border.all(color: const Color(0xFFE8E4DF)),
                    boxShadow: [
                      BoxShadow(color: Colors.black.withOpacity(0.02), blurRadius: 10, offset: const Offset(0, 4)),
                    ],
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.between,
                        children: [
                          const Text('Total Saldo Aktif', style: TextStyle(fontSize: 13, color: Color(0xFF6B6761), fontWeight: FontWeight.w500)),
                          GestureDetector(
                            onTap: () {
                              HapticFeedback.selectionClick();
                              setState(() => _hideBalance = !_hideBalance);
                            },
                            child: Icon(_hideBalance ? Icons.visibility_off_outlined : Icons.visibility_outlined, size: 18, color: const Color(0xFF6B6761)),
                          ),
                        ],
                      ),
                      const SizedBox(height: 10),
                      Text(
                        _hideBalance ? '••••••••' : 'Rp 148.520.000',
                        style: const TextStyle(fontSize: 28, fontWeight: FontWeight.w800, color: Color(0xFF1B1C1C), letterSpacing: -0.5),
                      ),
                      const SizedBox(height: 20),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceAround,
                        children: [
                          _buildActionBtn(Icons.arrow_upward_rounded, 'Kirim'),
                          _buildActionBtn(Icons.arrow_downward_rounded, 'Terima'),
                          _buildActionBtn(Icons.qr_code_scanner_rounded, 'Bayar'),
                          _buildActionBtn(Icons.more_horiz_rounded, 'Lainnya'),
                        ],
                      ),
                    ],
                  ),
                ),
              ),
            ),
            const SliverToBoxAdapter(
              child: Padding(
                padding: EdgeInsets.fromLTRB(20, 24, 20, 12),
                child: Text('Aktivitas Terbaru', style: TextStyle(fontSize: 15, fontWeight: FontWeight.w700, color: Color(0xFF1B1C1C))),
              ),
            ),
            SliverPadding(
              padding: const EdgeInsets.symmetric(horizontal: 20.0),
              child: SliverList(
                delegate: SliverChildListDelegate([
                  _buildTxItem('Supabase Database Pro', 'Langganan Cloud', '-Rp 390.000', true),
                  _buildTxItem('Pembayaran Klien SPP', 'Transfer Masuk', '+Rp 12.500.000', false),
                  _buildTxItem('Figma Organization', 'Design Tools', '-Rp 720.000', true),
                  _buildTxItem('Cloudflare Pro Gateway', 'Infrastruktur DNS', '-Rp 320.000', true),
                ]),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildActionBtn(IconData icon, String label) {
    return Column(
      children: [
        Container(
          width: 44,
          height: 44,
          decoration: BoxDecoration(
            color: const Color(0xFFFBF9F9),
            borderRadius: BorderRadius.circular(12),
            border: Border.all(color: const Color(0xFFE8E4DF)),
          ),
          child: Icon(icon, color: const Color(0xFF1B1C1C), size: 20),
        ),
        const SizedBox(height: 6),
        Text(label, style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w600, color: Color(0xFF1B1C1C))),
      ],
    );
  }

  Widget _buildTxItem(String title, String subtitle, String amount, bool isExpense) {
    return Container(
      margin: const EdgeInsets.only(bottom: 10),
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: const Color(0xFFE8E4DF)),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.between,
        children: [
          Row(
            children: [
              Container(
                width: 38,
                height: 38,
                decoration: BoxDecoration(
                  color: isExpense ? Colors.rose.withOpacity(0.08) : Colors.emerald.withOpacity(0.08),
                  borderRadius: BorderRadius.circular(10),
                ),
                child: Icon(isExpense ? Icons.arrow_outward_rounded : Icons.arrow_downward_rounded, color: isExpense ? Colors.rose : Colors.emerald, size: 18),
              ),
              const SizedBox(width: 12),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(title, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: Color(0xFF1B1C1C))),
                  Text(subtitle, style: const TextStyle(fontSize: 11, color: Color(0xFF6B6761))),
                ],
              ),
            ],
          ),
          Text(amount, style: TextStyle(fontSize: 13, fontWeight: FontWeight.w700, fontFamily: 'monospace', color: isExpense ? const Color(0xFF1B1C1C) : Colors.emerald.shade700)),
        ],
      ),
    );
  }
}
`,
	},
	'mob-grouped-settings': {
		name: 'mob-grouped-settings',
		filename: 'grouped_settings_screen.dart',
		description: 'Grouped Card Settings (Apple iOS HIG) with Cupertino switches and profile badge',
		pattern: 'Settings / Profile Screen',
		code: `import "package:flutter/cupertino.dart";
import "package:flutter/material.dart";
import "package:flutter/services.dart";

class GroupedSettingsScreen extends StatefulWidget {
  const GroupedSettingsScreen({super.key});

  @override
  State<GroupedSettingsScreen> createState() => _GroupedSettingsScreenState();
}

class _GroupedSettingsScreenState extends State<GroupedSettingsScreen> {
  bool _pushNotifications = true;
  bool _biometricAuth = true;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF2F1F0),
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        title: const Text('Pengaturan', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w700, color: Color(0xFF1B1C1C))),
        centerTitle: true,
      ),
      body: SafeArea(
        child: ListView(
          physics: const BouncingScrollPhysics(),
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
          children: [
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(16)),
              child: Row(
                children: [
                  CircleAvatar(
                    radius: 26,
                    backgroundColor: const Color(0xFFA13F20).withOpacity(0.12),
                    child: const Text('AJ', style: TextStyle(color: Color(0xFFA13F20), fontWeight: FontWeight.bold, fontSize: 18)),
                  ),
                  const SizedBox(width: 14),
                  const Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text('Ant Joshua', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700, color: Color(0xFF1B1C1C))),
                        Text('antoniusjoshua47@gmail.com', style: TextStyle(fontSize: 12, color: Color(0xFF6B6761))),
                      ],
                    ),
                  ),
                  const Icon(Icons.chevron_right_rounded, color: Color(0xFFB0ACA6)),
                ],
              ),
            ),
            const SizedBox(height: 20),
            _buildGroupHeader('PREFERENSI'),
            Container(
              decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(16)),
              child: Column(
                children: [
                  _buildSwitchTile('Notifikasi Push', _pushNotifications, (v) => setState(() => _pushNotifications = v)),
                  const Divider(height: 1, indent: 52, color: Color(0xFFF2F1F0)),
                  _buildSwitchTile('Autentikasi Biometrik', _biometricAuth, (v) => setState(() => _biometricAuth = v)),
                ],
              ),
            ),
            const SizedBox(height: 20),
            _buildGroupHeader('AKUN & KEAMANAN'),
            Container(
              decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(16)),
              child: Column(
                children: [
                  _buildNavTile(Icons.vpn_key_outlined, 'Ubah Kata Sandi'),
                  const Divider(height: 1, indent: 52, color: Color(0xFFF2F1F0)),
                  _buildNavTile(Icons.credit_card_outlined, 'Metode Pembayaran'),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildGroupHeader(String title) {
    return Padding(
      padding: const EdgeInsets.only(left: 12, bottom: 6),
      child: Text(title, style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w600, color: Color(0xFF8C8881), letterSpacing: 0.5)),
    );
  }

  Widget _buildSwitchTile(String title, bool val, ValueChanged<bool> onChanged) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.between,
        children: [
          Text(title, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w500, color: Color(0xFF1B1C1C))),
          CupertinoSwitch(
            value: val,
            activeColor: const Color(0xFFA13F20),
            onChanged: (newVal) {
              HapticFeedback.selectionClick();
              onChanged(newVal);
            },
          ),
        ],
      ),
    );
  }

  Widget _buildNavTile(IconData icon, String title) {
    return ListTile(
      leading: Icon(icon, size: 20, color: const Color(0xFF6B6761)),
      title: Text(title, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w500, color: Color(0xFF1B1C1C))),
      trailing: const Icon(Icons.chevron_right_rounded, size: 20, color: Color(0xFFB0ACA6)),
      onTap: () {},
    );
  }
}
`,
	},
	'mob-bottom-sheet-detents': {
		name: 'mob-bottom-sheet-detents',
		filename: 'detent_sheet_screen.dart',
		description: 'Interactive Modal Bottom Sheet with 25%, 50%, 90% Snap Detents',
		pattern: 'Modal Bottom Sheet',
		code: `import "package:flutter/material.dart";
import "package:flutter/services.dart";

class DetentSheetScreen extends StatelessWidget {
  const DetentSheetScreen({super.key});

  void _showSnapSheet(BuildContext context) {
    HapticFeedback.mediumImpact();
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (ctx) {
        return DraggableScrollableSheet(
          initialChildSize: 0.5,
          minChildSize: 0.25,
          maxChildSize: 0.9,
          snap: true,
          snapSizes: const [0.25, 0.5, 0.9],
          builder: (context, scrollController) {
            return Container(
              decoration: const BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
              ),
              child: Column(
                children: [
                  const SizedBox(height: 10),
                  Container(
                    width: 36,
                    height: 4,
                    decoration: BoxDecoration(color: Color(0xFFD6D1CA), borderRadius: BorderRadius.circular(2)),
                  ),
                  const SizedBox(height: 16),
                  const Padding(
                    padding: EdgeInsets.symmetric(horizontal: 20),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.between,
                      children: [
                        Text('Pilih Rekening Tujuan', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700, color: Color(0xFF1B1C1C))),
                        Text('3 Tersimpan', style: TextStyle(fontSize: 12, color: Color(0xFF6B6761))),
                      ],
                    ),
                  ),
                  const SizedBox(height: 12),
                  const Divider(height: 1, color: Color(0xFFE8E4DF)),
                  Expanded(
                    child: ListView.separated(
                      controller: scrollController,
                      padding: const EdgeInsets.all(20),
                      itemCount: 8,
                      separatorBuilder: (_, __) => const SizedBox(height: 10),
                      itemBuilder: (context, index) {
                        return Container(
                          padding: const EdgeInsets.all(14),
                          decoration: BoxDecoration(
                            color: const Color(0xFFFBF9F9),
                            borderRadius: BorderRadius.circular(14),
                            border: Border.all(color: const Color(0xFFE8E4DF)),
                          ),
                          child: Row(
                            children: [
                              Container(
                                width: 40,
                                height: 40,
                                decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(10), border: Border.all(color: const Color(0xFFE8E4DF))),
                                child: const Icon(Icons.account_balance_wallet_outlined, size: 20, color: Color(0xFFA13F20)),
                              ),
                              const SizedBox(width: 12),
                              Expanded(
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text('BCA Virtual Account \${index + 1}', style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: Color(0xFF1B1C1C))),
                                    const Text('8088 1234 5678', style: TextStyle(fontSize: 11, fontFamily: 'monospace', color: Color(0xFF6B6761))),
                                  ],
                                ),
                              ),
                              const Icon(Icons.chevron_right_rounded, size: 18, color: Color(0xFFB0ACA6)),
                            ],
                          ),
                        );
                      },
                    ),
                  ),
                ],
              ),
            );
          },
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFFBF9F9),
      appBar: AppBar(title: const Text('Interactive Snap Modal'), backgroundColor: Colors.transparent, elevation: 0),
      body: Center(
        child: ElevatedButton.icon(
          onPressed: () => _showSnapSheet(context),
          icon: const Icon(Icons.vertical_align_top_rounded, size: 18),
          label: const Text('Buka Modal Snap Detent'),
          style: ElevatedButton.styleFrom(
            backgroundColor: const Color(0xFFA13F20),
            foregroundColor: Colors.white,
            padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
            elevation: 0,
          ),
        ),
      ),
    );
  }
}
`,
	},
};

export function copyFlutterScreen(
	targetDir: string,
	screenKey: string,
	options: { overwrite?: boolean } = {},
): { success: boolean; path: string; error?: string } {
	const template = FLUTTER_SCREENS[screenKey];
	if (!template) {
		return {
			success: false,
			path: '',
			error: `Unknown Flutter screen: ${screenKey}. Available: ${Object.keys(FLUTTER_SCREENS).join(', ')}`,
		};
	}

	const destDir = join(targetDir, 'lib', 'screens');
	if (!existsSync(destDir)) {
		mkdirSync(destDir, { recursive: true });
	}

	const filePath = join(destDir, template.filename);
	if (existsSync(filePath) && !options.overwrite) {
		return {
			success: false,
			path: filePath,
			error: `File already exists at ${filePath}. Pass --overwrite to replace it.`,
		};
	}

	writeFileSync(filePath, template.code, 'utf8');
	return { success: true, path: filePath };
}
