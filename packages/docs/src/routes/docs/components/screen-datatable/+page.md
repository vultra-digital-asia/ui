# Screen Datatable

Enterprise data table screen standard with sticky faceted search, status pills, density switcher, checkbox bulk selection, tabular numerals, and pagination controls.

## CLI Installation

```bash
npx @vultra/cli add screen-datatable
```

## Usage

```svelte
<script>
  import { ScreenDatatable } from '$lib/components/screen-datatable';

  const items = [
    { id: "INV-001", customer: "PT Nusantara", amount: "Rp 10.000.000", channel: "QRIS", status: "Lunas", date: "2026-10-01" },
    { id: "INV-002", customer: "CV Sinar", amount: "Rp 5.000.000", channel: "BCA VA", status: "Pending", date: "2026-10-01" }
  ];
</script>

<ScreenDatatable
  title="Semua Transaksi"
  description="Audit dan rekonsiliasi pembayaran secara real-time."
  {items}
  onExport={() => alert('Exporting CSV')}
  onRowClick={(row) => console.log('Row clicked:', row)}
/>
```

## Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `title` | `string` | `"Semua Transaksi"` | Screen heading |
| `description` | `string` | `...` | Sub-headline description |
| `items` | `Record<string, any>[]` | `[...]` | Raw data rows |
| `columns` | `TableColumn[]` | `[...]` | Columns configuration with alignment and mono font flags |
| `statusOptions` | `string[]` | `["Semua", "Lunas", ...]` | Faceted status pills |
| `searchPlaceholder` | `string` | `...` | Search input placeholder |
| `onExport` | `() => void` | `undefined` | Callback for export button |
| `onRowClick` | `(row: any) => void` | `undefined` | Callback when row is clicked |
