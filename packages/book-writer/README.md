# @vultra/book-writer

[![npm version](https://img.shields.io/npm/v/@vultra/book-writer?style=flat-square&color=7c3aed)](https://www.npmjs.com/package/@vultra/book-writer)
[![Docs](https://img.shields.io/badge/docs-ui.vultra.id-7c3aed?style=flat-square&labelColor=1a1a1a)](https://ui.vultra.id)
[![License MIT](https://img.shields.io/npm/l/@vultra/book-writer?style=flat-square&color=7c3aed)](https://github.com/vultra-digital-asia/ui/blob/main/LICENSE)


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
