# @vultra/rich-text

[![npm version](https://img.shields.io/npm/v/@vultra/rich-text?style=flat-square&color=7c3aed)](https://www.npmjs.com/package/@vultra/rich-text)
[![Docs](https://img.shields.io/badge/docs-ui.vultra.id-7c3aed?style=flat-square&labelColor=1a1a1a)](https://ui.vultra.id)
[![License MIT](https://img.shields.io/npm/l/@vultra/rich-text?style=flat-square&color=7c3aed)](https://github.com/vultra-digital-asia/ui/blob/main/LICENSE)


Rich text editor component powered by TipTap for Vultra UI.

## Install

```bash
npm install @vultra/rich-text
```

## Usage

```svelte
<script>
  import { RichTextEditor } from '@vultra/rich-text';
  import { ref } from 'svelte';

  let content = $state('<p>Hello</p>');
</script>

<RichTextEditor bind:content />
```

## License

MIT
