# @vultra/motion

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
