# @vultra/data-table

[![npm version](https://img.shields.io/npm/v/@vultra/data-table?style=flat-square&color=7c3aed)](https://www.npmjs.com/package/@vultra/data-table)
[![Docs](https://img.shields.io/badge/docs-ui.vultra.id-7c3aed?style=flat-square&labelColor=1a1a1a)](https://ui.vultra.id)
[![License MIT](https://img.shields.io/npm/l/@vultra/data-table?style=flat-square&color=7c3aed)](https://github.com/vultra-digital-asia/ui/blob/main/LICENSE)


Enterprise DataTable component for Vultra UI, built on `@vultra/grid-core` — sorting, filtering, pagination, virtual scrolling, keyboard navigation, and clipboard support.

## Install

```bash
npm install @vultra/data-table
```

## Usage

```svelte
<script>
  import { DataTable } from '@vultra/data-table';

  const columns = [{ key: 'name', label: 'Name' }, { key: 'age', label: 'Age' }];
  const rows = [{ name: 'Ada', age: 36 }];
</script>

<DataTable {columns} {rows} />
```

## License

MIT
