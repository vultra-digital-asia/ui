import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  sourcemap: true,
  external: [
    "react",
    "react-dom",
    "@ark-ui/react",
    "@vultra/react",
    "@vultra/tokens",
    "@tanstack/react-table",
  ],
});
