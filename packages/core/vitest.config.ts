import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import path from 'path';

export default defineConfig({
	plugins: [svelte({
		hot: !process.env.VITEST,
	})],
	test: {
		globals: true,
		environment: 'jsdom',
		include: ['src/**/*.{test,spec}.{js,ts}'],
		setupFiles: ['./src/test-setup.ts']
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
