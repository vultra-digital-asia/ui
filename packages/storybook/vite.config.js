import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [svelte()],
  optimizeDeps: {
    exclude: ['@storybook/svelte', 'storybook']
  }
});