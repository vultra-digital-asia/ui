# @vultra/cli

[![npm version](https://img.shields.io/npm/v/@vultra/cli?style=flat-square&color=7c3aed)](https://www.npmjs.com/package/@vultra/cli)
[![Docs](https://img.shields.io/badge/docs-ui.vultra.id-7c3aed?style=flat-square&labelColor=1a1a1a)](https://ui.vultra.id)
[![License MIT](https://img.shields.io/npm/l/@vultra/cli?style=flat-square&color=7c3aed)](https://github.com/vultra-digital-asia/ui/blob/main/LICENSE)


CLI to add Vultra UI components to your Svelte project — `add`, `init`, `update`, `doctor`, and `list` commands.

## Install

```bash
npm install -g @vultra/cli
# or run without installing:
npx @vultra/cli
```

## Usage

```bash
npx @vultra/cli init        # Setup project (tokens, cn(), components.json)
npx @vultra/cli add button  # Copy component (or --mode npm)
npx @vultra/cli update      # Update installed components
npx @vultra/cli doctor      # Check setup health
npx @vultra/cli list        # Browse components by category
```

## License

MIT
