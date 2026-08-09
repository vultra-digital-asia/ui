# @vultra/data-table

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
