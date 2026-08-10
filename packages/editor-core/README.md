# @vultra/editor-core

[![npm version](https://img.shields.io/npm/v/@vultra/editor-core?style=flat-square&color=7c3aed)](https://www.npmjs.com/package/@vultra/editor-core)
[![Docs](https://img.shields.io/badge/docs-ui.vultra.id-7c3aed?style=flat-square&labelColor=1a1a1a)](https://ui.vultra.id)
[![License MIT](https://img.shields.io/npm/l/@vultra/editor-core?style=flat-square&color=7c3aed)](https://github.com/vultra-digital-asia/ui/blob/main/LICENSE)


Visual editor engine for Vultra UI — drag-drop, canvas, and state management primitives for building block-based editors.

## Install

```bash
npm install @vultra/editor-core
```

## Usage

```svelte
<script>
  import { EditorCanvas, EditorBlock } from '@vultra/editor-core';
</script>

<EditorCanvas>
  <EditorBlock type="text" />
</EditorCanvas>
```

## License

MIT
