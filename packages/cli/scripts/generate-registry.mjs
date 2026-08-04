#!/usr/bin/env node
/**
 * Registry generator.
 *
 * Scans packages/core/src/lib/components/* and emits
 * packages/cli/registry/index.json — one entry per component with its
 * source files and transitive $lib dependencies.
 *
 * Usage: node scripts/generate-registry.mjs
 *        (run from packages/cli, or pass repo root as argv[2])
 */
import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, relative, sep, basename, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = process.argv[2] ?? join(here, '..', '..', '..');
const coreDir = join(repoRoot, 'packages', 'core', 'src', 'lib', 'components');
const outPath = join(repoRoot, 'packages', 'cli', 'registry', 'index.json');

const SVELTE_RE = /<script[^>]*>[\s\S]*?<\/script>/g;
const IMPORT_RE = /import\s+(?:[\w$*{},\s]+?\s+from\s+)?['"]([^'"]+)['"]/g;
const KNOWN_RE =
	/^svelte(?:\/|$)|^bits-ui(?:\/|$)|^lucide-svelte(?:\/|$)|^@lucide\/svelte(?:\/|$)|^tailwind-merge|^clsx|^tailwind-variants|^sveltekit-superforms|^formsnap|^@internationalized\/date|^chart\.js|^@tanstack\/table-core|^@tanstack\/svelte-virtual|^\.\/|^\.\.\//;
const IGNORE_SET = new Set([
	'svelte/elements',
	'svelte/transition',
	'svelte/animate',
	'svelte/motion',
	'svelte/store',
	'svelte/events',
	'svelte/legacy',
]);

function collectScripts(code) {
	const out = [];
	let m;
	while ((m = SVELTE_RE.exec(code)) !== null) out.push(m[0]);
	return out;
}

function walkFiles(dir) {
	const results = [];
	for (const entry of readdirSync(dir, { withFileTypes: true })) {
		const full = join(dir, entry.name);
		if (entry.isDirectory()) results.push(...walkFiles(full));
		else if (/\.(svelte|ts)$/.test(entry.name)) results.push(full);
	}
	return results;
}

function isComponentFile(file) {
	const name = basename(file);
	if (!/\.svelte$/.test(name)) return false;
	const ext = name.slice(0, -7);
	if (ext === 'svelte' || ext === 'index') return false;
	return true;
}

function depsOf(file) {
	const code = readFileSync(file, 'utf8');
	const deps = new Set();
	const scripts = /\.svelte$/.test(file) ? collectScripts(code) : [code];
	for (const script of scripts) {
		let m;
		while ((m = IMPORT_RE.exec(script)) !== null) {
			const spec = m[1];
			if (IGNORE_SET.has(spec)) continue;
			if (spec.startsWith('$lib/')) {
				const rel = spec.slice('$lib/'.length);
				if (rel.startsWith('components/')) {
					const seg = rel.split('/');
					const last = seg.at(-1);
					const isIndexFile = last === 'index.js' || last === 'index.ts';
					// "$lib/components/<name>/index.js" → dep <name>  (3+ segments)
					// "$lib/components/<name>.js"       → dep <name>  (2 segments)
					// "$lib/components/index.js"         → skip barrel
					if (isIndexFile && seg.length >= 3) {
						const name = seg.at(-2);
						if (name !== 'index' && name) deps.add(name);
					} else if (seg.length === 2 && !isIndexFile) {
						const name = seg[0];
						if (name !== 'index' && name) deps.add(name);
					}
				} else if (rel === 'utils.js' || rel === 'utils.ts' || rel === 'utils') {
					deps.add('utils');
				}
				continue;
			}
			if (KNOWN_RE.test(spec)) continue;
			if (spec.startsWith('./') || spec.startsWith('../')) continue;
		}
	}
	return [...deps];
}

if (!existsSync(coreDir)) {
	console.error(`Registry: core components dir not found: ${coreDir}`);
	process.exit(1);
}

const components = [];
for (const dir of readdirSync(coreDir, { withFileTypes: true })) {
	if (!dir.isDirectory()) continue;
	const name = dir.name;
	const abs = join(coreDir, name);
	const files = walkFiles(abs);
	if (files.length === 0) continue;
	const main = files.find(
		(f) => basename(f) === 'index.svelte' || basename(f) === `${name}.svelte`,
	);
	const mainTs = files.find((f) => basename(f) === 'index.ts');
	const fileList = files.map((f) => relative(coreDir, f).split(sep).join('/'));
	const deps = new Set();
	for (const f of files) for (const d of depsOf(f)) deps.add(d);
	deps.delete(name);
	components.push({
		name,
		files: fileList,
		deps: [...deps].sort(),
		main: main ? relative(coreDir, main).split(sep).join('/') : undefined,
		mainTs: mainTs ? relative(coreDir, mainTs).split(sep).join('/') : undefined,
		isComponent: isComponentFile(main ?? files[0]),
		entry: fileList.find((f) => f === `${name}/index.ts`),
	});
}

components.sort((a, b) => a.name.localeCompare(b.name));
const payload = {
	schema: 'v1',
	generatedAt: new Date().toISOString(),
	components,
};
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, JSON.stringify(payload, null, 2) + '\n');
console.log(`Registry: ${components.length} components -> ${outPath}`);
