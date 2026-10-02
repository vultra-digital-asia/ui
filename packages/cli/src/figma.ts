export interface FigmaImportOptions {
  fileKey: string;
  token?: string;
  outWeb?: string;
  outFlutter?: string;
}

export interface ExtractedTokens {
  colors: Record<string, string>;
  radii: Record<string, string>;
  fonts: Record<string, string>;
}

function rgbaToHex(r: number, g: number, b: number, a: number = 1): string {
  const toHex = (n: number) => {
    const val = Math.round(n * 255);
    return Math.max(0, Math.min(255, val)).toString(16).padStart(2, '0').toUpperCase();
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export async function fetchFigmaTokens(fileKey: string, token: string): Promise<ExtractedTokens> {
  const headers = {
    'X-Figma-Token': token,
  };

  const tokens: ExtractedTokens = {
    colors: {
      background: '#FBF9F9',
      foreground: '#1B1C1C',
      primary: '#A13F20',
      'primary-foreground': '#FFFFFF',
      muted: '#F5F2F0',
      'muted-foreground': '#6E6B68',
      border: '#E8E4E1',
      card: '#FFFFFF',
      'card-foreground': '#1B1C1C',
      accent: '#E97451',
      destructive: '#BA1A1A',
    },
    radii: {
      sm: '12px',
      base: '16px',
      lg: '20px',
    },
    fonts: {
      sans: 'Plus Jakarta Sans, sans-serif',
      mono: 'JetBrains Mono, monospace',
    },
  };

  // 1. Try Variables API (modern Figma)
  try {
    const varRes = await fetch(`https://api.figma.com/v1/files/${fileKey}/variables/local`, { headers });
    if (varRes.ok) {
      const data = await varRes.json() as any;
      if (data?.meta?.variables) {
        const vars = Object.values(data.meta.variables) as any[];
        for (const v of vars) {
          const name = String(v.name || '').toLowerCase().replace(/[\/\s_]+/g, '-');
          if (v.resolvedType === 'COLOR' && v.valuesByMode) {
            const firstVal = Object.values(v.valuesByMode)[0] as any;
            if (firstVal && typeof firstVal.r === 'number') {
              tokens.colors[name] = rgbaToHex(firstVal.r, firstVal.g, firstVal.b, firstVal.a ?? 1);
            }
          } else if (v.resolvedType === 'FLOAT' && name.includes('radius')) {
            const firstVal = Object.values(v.valuesByMode)[0] as any;
            if (typeof firstVal === 'number') {
              tokens.radii[name] = `${firstVal}px`;
            }
          }
        }
        return tokens;
      }
    }
  } catch (err) {
    // continue to fallback
  }

  // 2. Fallback: Try File Styles API
  try {
    const fileRes = await fetch(`https://api.figma.com/v1/files/${fileKey}?depth=2`, { headers });
    if (!fileRes.ok) {
      throw new Error(`Figma API returned HTTP ${fileRes.status}: ${fileRes.statusText}`);
    }
    const fileData = await fileRes.json() as any;
    // Walk canvas children to find colored components
    function walk(node: any) {
      if (node.fills && Array.isArray(node.fills)) {
        for (const fill of node.fills) {
          if (fill.type === 'SOLID' && fill.color) {
            const cleanName = String(node.name || 'color').toLowerCase().replace(/[^a-z0-9-]/g, '-');
            if (cleanName.includes('primary') || cleanName.includes('bg') || cleanName.includes('accent')) {
              tokens.colors[cleanName] = rgbaToHex(fill.color.r, fill.color.g, fill.color.b, fill.color.a ?? 1);
            }
          }
        }
      }
      if (node.cornerRadius && typeof node.cornerRadius === 'number') {
        tokens.radii['base'] = `${node.cornerRadius}px`;
      }
      if (node.children && Array.isArray(node.children)) {
        node.children.slice(0, 20).forEach(walk);
      }
    }
    if (fileData.document?.children) {
      fileData.document.children.forEach(walk);
    }
  } catch (err) {
    throw new Error(`Failed to extract tokens from Figma file ${fileKey}: ${err instanceof Error ? err.message : String(err)}`);
  }

  return tokens;
}

export function compileFigmaTokensToWebCss(tokens: ExtractedTokens): string {
  const colorLines = Object.entries(tokens.colors)
    .map(([k, v]) => `  --color-${k}: ${v};`)
    .join('\n');
  const radiusLines = Object.entries(tokens.radii)
    .map(([k, v]) => `  --radius-${k}: ${v};`)
    .join('\n');

  return `@import "tailwindcss";

@theme inline {
  --font-sans: "${tokens.fonts.sans || 'Plus Jakarta Sans, sans-serif'}";
  --font-mono: "${tokens.fonts.mono || 'JetBrains Mono, monospace'}";

  /* Colors extracted from Figma */
${colorLines}

  /* Squircle Radii extracted from Figma */
${radiusLines}
}
`;
}

export function compileFigmaTokensToDart(tokens: ExtractedTokens): string {
  const toPascal = (s: string) => s.replace(/(?:^|[-_])(\w)/g, (_, c) => c.toUpperCase());
  const toCamel = (s: string) => {
    const p = toPascal(s);
    return p.charAt(0).toLowerCase() + p.slice(1);
  };

  const colorFields = Object.entries(tokens.colors)
    .map(([k, v]) => {
      const hexClean = v.replace('#', '').toUpperCase();
      return `  static const Color ${toCamel(k)} = Color(0xFF${hexClean});`;
    })
    .join('\n');

  return `import 'package:flutter/material.dart';

/// Design tokens imported from Figma
class AppColors {
  AppColors._();

${colorFields}
}
`;
}
