# @vultra/motion

[![npm version](https://img.shields.io/npm/v/@vultra/motion?style=flat-square&color=7c3aed)](https://www.npmjs.com/package/@vultra/motion)
[![Docs](https://img.shields.io/badge/docs-ui.vultra.id-7c3aed?style=flat-square&labelColor=1a1a1a)](https://ui.vultra.id)
[![License MIT](https://img.shields.io/npm/l/@vultra/motion?style=flat-square&color=7c3aed)](https://github.com/vultra-digital-asia/ui/blob/main/LICENSE)


Core types, easings, and interpolation for video composition — the foundation of the Vultra motion ecosystem (player, studio, effects, captions, media, three).

## Install

```bash
npm install @vultra/motion
```

## Usage

```ts
import { Easing, interpolate } from '@vultra/motion';

const value = interpolate(0, 100, 50, Easing.outCubic); // eased value at t=50
```

## License

MIT
