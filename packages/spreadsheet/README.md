# @vultra/spreadsheet

[![npm version](https://img.shields.io/npm/v/@vultra/spreadsheet?style=flat-square&color=7c3aed)](https://www.npmjs.com/package/@vultra/spreadsheet)
[![Docs](https://img.shields.io/badge/docs-ui.vultra.id-7c3aed?style=flat-square&labelColor=1a1a1a)](https://ui.vultra.id)
[![License MIT](https://img.shields.io/npm/l/@vultra/spreadsheet?style=flat-square&color=7c3aed)](https://github.com/vultra-digital-asia/ui/blob/main/LICENSE)


Spreadsheet component with cell editing, range selection, and multi-sheet support for Vultra UI.

## Install

```bash
npm install @vultra/spreadsheet
```

## Usage

```svelte
<script>
  import { Spreadsheet } from '@vultra/spreadsheet';
</script>

<Spreadsheet sheets={[{ name: 'Sheet 1', rows: [['A1', 'B1']] }]} />
```

## License

MIT
