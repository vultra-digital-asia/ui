# @vultra/motion-captions

[![npm version](https://img.shields.io/npm/v/@vultra/motion-captions?style=flat-square&color=7c3aed)](https://www.npmjs.com/package/@vultra/motion-captions)
[![Docs](https://img.shields.io/badge/docs-ui.vultra.id-7c3aed?style=flat-square&labelColor=1a1a1a)](https://ui.vultra.id)
[![License MIT](https://img.shields.io/npm/l/@vultra/motion-captions?style=flat-square&color=7c3aed)](https://github.com/vultra-digital-asia/ui/blob/main/LICENSE)


Animated captions for @vultra/motion — subtitle rendering with per-line animations.

## Install

```bash
npm install @vultra/motion-captions
```

## Usage

```svelte
<script>
  import { Captions } from '@vultra/motion-captions';
</script>

<Captions cues={[{ start: 0, end: 2, text: 'Hello' }]} />
```

## License

MIT
