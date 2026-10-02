import type { GeneratorOptions, GeneratorResult } from "./types.js";
import { generateFlutterFeature } from "./flutter.js";
import { generateSvelteFeature } from "./svelte.js";

export * from "./types.js";
export * from "./flutter.js";
export * from "./svelte.js";
export * from "./ai.js";
export * from "./vision.js";

/**
 * Universal Benchmark UI Code Generator.
 * Compiles screen archetypes into production-ready Svelte 5 Runes or Flutter BLoC + Freezed code.
 */
export function generateScreen(options: GeneratorOptions): GeneratorResult {
	if (options.platform === "flutter") {
		return generateFlutterFeature(options);
	}
	return generateSvelteFeature(options);
}
