# Table

A semantic HTML table with full styling.

## Preview

```svelte
<script>
  import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@vultra/ui';
</script>

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Vultra UI</TableCell>
      <TableCell>Active</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Vultra CLI</TableCell>
      <TableCell>Active</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

## Structure

- `Table` — `<table>` wrapper
- `TableHeader` — `<thead>`
- `TableBody` — `<tbody>`
- `TableRow` — `<tr>`
- `TableHead` — `<th>`
- `TableCell` — `<td>`
- `TableCaption` / `TableFooter` — optional

## Install

```bash
npx @vultra/cli add table
```
