// Theme registry — single source of truth for the @vultra/tokens themes.
// Importing base.css registers all of them; the data-ui-theme attribute on
// <body> selects which palette/radius/shadow set is active at runtime.

export const THEMES = [
	{ id: 'neutral', name: 'Neutral', bg: '#ffffff', fg: '#232323' },
	{ id: 'warm', name: 'Warm', bg: '#ffffff', fg: '#3a2f27' },
	{ id: 'dark', name: 'Dark', bg: '#232323', fg: '#fafafa' },
	{ id: 'md3', name: 'MD3', bg: '#fdfcff', fg: '#352e3d' },
	{ id: 'md3-dark', name: 'MD3 Dark', bg: '#262030', fg: '#ede9f1' },
	{ id: 'flat', name: 'Flat', bg: '#ffffff', fg: '#262b3d' },
	{ id: 'flat-dark', name: 'Flat Dark', bg: '#20222e', fg: '#f3f4f8' },
	{ id: 'glass', name: 'Glass', bg: '#e8f0ff', fg: '#262b3d' },
	{ id: 'glass-dark', name: 'Glass Dark', bg: '#232a3a', fg: '#eef2fa' },
	{ id: 'brutalist', name: 'Brutalist', bg: '#fafafa', fg: '#1a1a1a' },
	{ id: 'brutalist-dark', name: 'Brutalist Dark', bg: '#1a1a1a', fg: '#f2f2f2' },
	{ id: 'cyberpunk', name: 'Cyberpunk', bg: '#f2f0fc', fg: '#26202e' },
	{ id: 'cyberpunk-dark', name: 'Cyberpunk Dark', bg: '#1a1626', fg: '#e6f2ff' },
	{ id: 'retro', name: 'Retro', bg: '#f4f0e2', fg: '#3d3020' },
	{ id: 'retro-dark', name: 'Retro Dark', bg: '#3d3020', fg: '#f0ead8' },
	{ id: 'neumorphism', name: 'Neumorphism', bg: '#e0e4ea', fg: '#4a4f57' },
	{ id: 'neumorphism-dark', name: 'Neumorphism Dark', bg: '#3f4249', fg: '#d9dce2' },
	{ id: 'minimalist', name: 'Minimalist', bg: '#ffffff', fg: '#1a1a1a' },
	{ id: 'minimalist-dark', name: 'Minimalist Dark', bg: '#ffffff', fg: '#1a1a1a' }
] as const;

export type ThemeId = (typeof THEMES)[number]['id'];

/** 9 signatures users pick from — the light variant when available, else the only variant. */
export const SIGNATURE_THEMES: readonly { id: ThemeId; name: string }[] = [
	{ id: 'neutral', name: 'Neutral' },
	{ id: 'md3', name: 'MD3' },
	{ id: 'flat', name: 'Flat' },
	{ id: 'glass', name: 'Glass' },
	{ id: 'brutalist', name: 'Brutalist' },
	{ id: 'cyberpunk', name: 'Cyberpunk' },
	{ id: 'retro', name: 'Retro' },
	{ id: 'neumorphism', name: 'Neumorphism' },
	{ id: 'minimalist', name: 'Minimalist' }
];

export const THEME_STORAGE_KEY = 'vultra-theme';

export function isThemeId(value: string | null | undefined): value is ThemeId {
	return !!value && THEMES.some((t) => t.id === value);
}

export function applyTheme(theme: ThemeId) {
	document.body.setAttribute('data-ui-theme', theme);
	window.localStorage.setItem(THEME_STORAGE_KEY, theme);
}

export function getStoredTheme(): ThemeId | null {
	if (typeof window === 'undefined') return null;
	const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
	return isThemeId(stored) ? stored : null;
}
