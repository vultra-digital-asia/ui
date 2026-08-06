import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

export interface RegistryProp {
	name: string;
	type?: string;
	default?: string | number | boolean;
	values?: string[];
	description?: string;
}

export interface RegistryComponent {
	name: string;
	description?: string;
	category?: string;
	tags?: string[];
	files: string[];
	deps: string[];
	main?: string;
	mainTs?: string;
	isComponent: boolean;
	entry?: string;
	props?: RegistryProp[];
}

export interface Registry {
	schema: string;
	generatedAt: string;
	components: RegistryComponent[];
}

const DEFAULT_LOCAL_REGISTRY = fileURLToPath(
	new URL('../registry/index.json', import.meta.url),
);

/**
 * Load the component registry.
 *
 * Resolution order:
 *   1. $VULTRA_REGISTRY env — path to a local JSON file, or a URL.
 *   2. Local registry shipped with the CLI (packages/cli/registry/index.json).
 */
export async function loadRegistry(): Promise<Registry> {
	const override = process.env.VULTRA_REGISTRY;
	if (override) {
		if (/^https?:\/\//.test(override)) {
			const res = await fetch(override);
			if (!res.ok) {
				throw new Error(
					`Failed to fetch registry from ${override}: ${res.status} ${res.statusText}`,
				);
			}
			return (await res.json()) as Registry;
		}
		if (existsSync(override)) {
			return JSON.parse(readFileSync(override, 'utf8')) as Registry;
		}
		throw new Error(`VULTRA_REGISTRY points to a missing file: ${override}`);
	}

	if (!existsSync(DEFAULT_LOCAL_REGISTRY)) {
		throw new Error(
			'Registry not found. Run the generator: pnpm --filter @vultra/cli generate:registry',
		);
	}
	return JSON.parse(readFileSync(DEFAULT_LOCAL_REGISTRY, 'utf8')) as Registry;
}

/** Resolve a component and its transitive dependency closure (BFS). */
export function resolveWithDeps(
	registry: Registry,
	root: string,
): RegistryComponent[] {
	const byName = new Map(registry.components.map((c) => [c.name, c]));
	const seen = new Set<string>();
	const out: RegistryComponent[] = [];
	const queue = [root];
	while (queue.length > 0) {
		const name = queue.shift()!;
		if (seen.has(name)) continue;
		const comp = byName.get(name);
		if (!comp) {
			throw new Error(`Unknown component: ${name}`);
		}
		seen.add(name);
		out.push(comp);
		// utils is a shared file, not a registry component
		for (const dep of comp.deps) {
			if (dep !== 'utils' && !seen.has(dep)) queue.push(dep);
		}
	}
	return out;
}
