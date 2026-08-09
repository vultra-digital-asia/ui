# @vultra/book-writer

Book writer with multi-chapter editing, live preview, and PDF export — built on the Vultra editor and rich-text packages.

## Install

```bash
npm install @vultra/book-writer
```

## Usage

```svelte
<script>
  import { BookWriter } from '@vultra/book-writer';
</script>

<BookWriter chapters={[{ title: 'Chapter 1', content: '…' }]} />
```

## License

MIT
