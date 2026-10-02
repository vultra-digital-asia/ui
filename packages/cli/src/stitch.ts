export function generateStitchSpec(themeName: string = 'neutral'): string {
  const themeSpecs: Record<string, {
    atmosphere: string;
    canvas: string;
    card: string;
    ink: string;
    muted: string;
    border: string;
    primary: string;
    secondary: string;
    fontDisplay: string;
    fontBody: string;
  }> = {
    neutral: {
      atmosphere: 'Clean, gallery-airy and restrained enterprise dashboard. Tactile, crisp 1px borders, subtle ambient elevation, no oversaturated AI glows.',
      canvas: '#F9FAFB',
      card: '#FFFFFF',
      ink: '#0F172A',
      muted: '#64748B',
      border: '#E2E8F0',
      primary: '#0F172A',
      secondary: '#0D9488',
      fontDisplay: 'Inter, -apple-system, sans-serif',
      fontBody: 'Inter, -apple-system, sans-serif',
    },
    'ethereal-sand': {
      atmosphere: 'Restrained, warm paper-like canvas for high-trust business and lifestyle apps. Digital Atelier aesthetic with 60-30-10 palette balance. Zero AI slop.',
      canvas: '#FBF9F9',
      card: '#FFFFFF',
      ink: '#1B1C1C',
      muted: '#6B6761',
      border: '#E8E4DF',
      primary: '#A13F20',
      secondary: '#2F6B57',
      fontDisplay: 'Inter, sans-serif',
      fontBody: 'Inter, sans-serif',
    },
    md3: {
      atmosphere: 'Material Design 3 expressive surfaces, tonal palettes, squircle containers with emphasized ease curves.',
      canvas: '#FEF7FF',
      card: '#F7F2FA',
      ink: '#1D1B20',
      muted: '#49454F',
      border: '#CAC4D0',
      primary: '#6750A4',
      secondary: '#625B71',
      fontDisplay: 'Roboto, Inter, sans-serif',
      fontBody: 'Roboto, Inter, sans-serif',
    },
    cyberpunk: {
      atmosphere: 'Dark high-contrast neon grid, angular silhouettes, glowing hairline accents against pitch void.',
      canvas: '#0D0E15',
      card: '#161926',
      ink: '#F0F6FC',
      muted: '#8B949E',
      border: '#2A3048',
      primary: '#00F0FF',
      secondary: '#FF0055',
      fontDisplay: 'Space Grotesk, sans-serif',
      fontBody: 'Inter, sans-serif',
    },
  };

  const spec = themeSpecs[themeName] || themeSpecs['neutral'];

  return `# Design System: @vultra/ui (${themeName} Google Stitch Spec)

## 1. Visual Theme & Atmosphere
${spec.atmosphere}
- Density: Balanced (5/10)
- Variance: Structured Asymmetric (6/10)
- Motion: Fluid Spring (6/10)

## 2. Color Palette & Functional Roles
- **Canvas** (${spec.canvas}) — Primary background canvas.
- **Card Surface** (${spec.card}) — Elevated surface containers, modals, table wrappers.
- **Ink Primary** (${spec.ink}) — Headings, high-contrast labels, metric numbers.
- **Muted Text** (${spec.muted}) — Secondary descriptions, table header labels, timestamps.
- **Border / Outline** (${spec.border}) — 1px structural hair-lines and dividers.
- **Brand Accent** (${spec.primary}) — Primary action buttons, active pills, selection rings. Max 1 primary accent.
- **Secondary Accent** (${spec.secondary}) — Badges, verification indicators, success alerts.

## 3. Typographic Architecture
- **Font Stack:** ${spec.fontDisplay}
- **Headlines:** Tracking tight (-0.02em), scale driven by font-weight rather than oversized text.
- **Body:** 14px / 1.5 leading, max 65ch width for readable prose.
- **Numbers / Currencies:** Tabular Monospace (\`tabular-nums\`, monospace font) for all financial numbers and IDs.
- **Banned Typography:** Generic AI serif fonts (Times New Roman, Georgia) in dashboards or software UI.

## 4. Component Stylings (Vultra Standards)
* **Buttons:** 12px continuous squircle radius (\`rounded-xl\`). Tactile active scale(0.98) press. NO neon outer glows.
* **Cards:** 16px corner radius (\`rounded-2xl\`). Hairline 1px border (\`border-[${spec.border}]\`). Subtle diffused shadow (\`box-shadow: 0 1px 3px rgba(0,0,0,0.04)\`).
* **Inputs & Form Controls:** Height 40px (\`h-10\`), 12px radius, subtle border. Focus ring in brand accent.
* **DataTables:** Sticky faceted search and filter bar, striped/bordered rows with tabular numerals, checkbox bulk actions, bottom pagination.
* **Sheets & Drawers:** Slide-out drawer with backdrop scrim (40% black + subtle blur), body scroll lock, Escape key dismiss.

## 5. Layout Principles
- CSS Grid with 16px/24px base rhythm.
- Strict single-column collapse below 768px on mobile.
- Zero horizontal overflow on mobile viewports.
- Safe area awareness: padding-bottom env(safe-area-inset-bottom).

## 6. Anti-Patterns (Explicit Bans)
- NO emoji in headers, sidebar navigation, buttons, or status badges (use Lucide icons exclusively).
- NO purple/indigo gradient primary buttons with high-glow shadows.
- NO gratuitous glassmorphism across every card.
- NO pure black (\`#000000\`).
- NO ungrounded placeholder names (use real contextual domain terms).
`;
}
