# @vultra/spreadsheet

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
