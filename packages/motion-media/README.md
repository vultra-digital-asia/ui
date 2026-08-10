# @vultra/motion-media

[![npm version](https://img.shields.io/npm/v/@vultra/motion-media?style=flat-square&color=7c3aed)](https://www.npmjs.com/package/@vultra/motion-media)
[![Docs](https://img.shields.io/badge/docs-ui.vultra.id-7c3aed?style=flat-square&labelColor=1a1a1a)](https://ui.vultra.id)
[![License MIT](https://img.shields.io/npm/l/@vultra/motion-media?style=flat-square&color=7c3aed)](https://github.com/vultra-digital-asia/ui/blob/main/LICENSE)


Media utilities, recorder, and upload for @vultra/motion — media source handling for video composition.

## Install

```bash
npm install @vultra/motion-media
```

## Usage

```ts
import { loadMedia, createRecorder } from '@vultra/motion-media';

const source = await loadMedia('/clip.mp4');
const recorder = await createRecorder();
```

## License

MIT
