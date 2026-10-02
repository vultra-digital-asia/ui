import { defineConfig } from "vitest/config";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import path from "path";

export default defineConfig({
  plugins: [svelte()],
  test: {
    include: ["src/**/*.test.ts"],
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest-setup.ts"],
    fsModuleCache: true,
    pool: "vmThreads",
    testTimeout: 15_000,
    server: {
      deps: {
        inline: [/svelte/],
      },
    },
  },
  resolve: {
    conditions: ["browser"],
    alias: {
      "@vultra/tokens": path.resolve(
        import.meta.dirname,
        "../tokens/src/base.css",
      ),
      "@vultra/grid-core/utils": path.resolve(
        import.meta.dirname,
        "../grid-core/dist/utils.js",
      ),
      "@vultra/grid-core": path.resolve(import.meta.dirname, "../grid-core/dist"),
      "@vultra/ui/utils": path.resolve(
        import.meta.dirname,
        "../core/dist/utils.js",
      ),
      "@vultra/ui": path.resolve(import.meta.dirname, "../core/dist"),
      $lib: path.resolve(import.meta.dirname, "./src/lib"),
    },
  },
});
