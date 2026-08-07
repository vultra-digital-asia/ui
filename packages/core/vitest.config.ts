import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import path from 'path';
import os from 'os';

const threads = Math.max(2, os.availableParallelism?.() ?? 4);

export default defineConfig({
	plugins: [svelte({
		hot: !process.env.VITEST,
		// Pre-compile svelte for tests — skip per-test transform overhead
		compilerOptions: {
			dev: false
		}
	})],
	test: {
		globals: true,
		environment: 'jsdom',
		include: ['src/**/*.{test,spec}.{js,ts}'],
		setupFiles: ['./src/test-setup.ts'],
		// Performance: cache compiled transforms across runs
		cache: {
			dir: path.resolve('./node_modules/.vitest')
		},
		pool: 'threads',
		poolOptions: {
			threads: {
				maxThreads: threads,
				minThreads: 1,
				singleThread: false,
				isolate: true
			}
		},
		testTimeout: 15000,
		hookTimeout: 15000,
		sequence: {
			concurrent: false
		}
	},
	resolve: {
		alias: {
			'$lib': path.resolve('./src/lib')
		},
		conditions: ['browser', 'import', 'module'],
		mainFields: ['svelte', 'browser', 'module', 'main'],
	},
	ssr: {
		noExternal: ['@testing-library/svelte-core', '@testing-library/svelte'],
	},
});
