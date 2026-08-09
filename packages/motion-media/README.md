# @vultra/motion-media

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
